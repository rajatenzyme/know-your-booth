'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import WhatsAppSlipModal from '@/components/ui/WhatsAppSlipModal'; // Add this import
import SmsSlipModal from '@/components/ui/SMSSlipModal'; // Add this import


interface VoterRecord {
    यादीभाग: string;
    बूथ_नं: string;   
    अ_क्र: string;
    lastName: string;
    firstName: string;
    middleName: string;
    eLastName: string;
    eFirstName: string;
    eMiddleName: string;
    लिंग: string;
    वय: string;
    voterId: string;
    मतदान_केंद्र: string;
}

export default function VoterSearch() {
    const [searchType, setSearchType] = useState('name');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [epicNo, setEpicNo] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [results, setResults] = useState<VoterRecord[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Add these new state variables for the modal
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false); // New SMS modal state

    const [selectedVoter, setSelectedVoter] = useState<VoterRecord | null>(null);

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 5).toUpperCase();
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate CAPTCHA
        if (captchaInput !== captcha) {
            setError('CAPTCHA is incorrect. Please try again.');
            setLoading(false);
            return;
        }

        // Validate search criteria
        if (searchType === 'name' && (!firstName || !lastName)) {
            setError('Both First Name and Last Name are required for name-based search.');
            setLoading(false);
            return;
        }

        if (searchType === 'epic' && !epicNo) {
            setError('EPIC Number is required for EPIC-based search.');
            setLoading(false);
            return;
        }

        try {
            const searchParams = new URLSearchParams();
            if (searchType === 'name') {
                searchParams.append('firstName', firstName);
                searchParams.append('lastName', lastName);
                if (middleName) searchParams.append('middleName', middleName);
            } else {
                searchParams.append('epicNo', epicNo);
            }

            const response = await fetch(`/api/voters?${searchParams}`);
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch results');
            }

            setResults(data.data);
            setShowResults(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEpicNo('');
        setCaptchaInput('');
        setCaptcha(generateCaptcha());
        setResults([]);
        setShowResults(false);
        setError(null);
    };

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* /* Add Banner Image */}
            <div className="mb-6">
                <img 
                src="/Banner.jpg" 
                alt="Banner" 
                className="w-full h-full" 
                />
            </div>
            <div className='font-bold'>आपले नाव मतदान यादीत शोधण्यासाठी - 1. पहिल्या नावाची 3 अक्षरे - मधल्या नावाची 3 अक्षरे - आडनावाची 3 अक्षरे टाइप करा. 2. आपली मतदान स्लिप SMS किंवा WhatsApp द्वारे मिळवा.
            </div>
            <Card className="mb-6 p-6">
                <h1 className="text-2xl font-bold mb-6 text-center bg-yellow-400 text-white py-2">
                    कल्याण पूर्व
                </h1>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex items-center justify-center">
                        <div className="flex gap-4">
                            <label 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '10px 20px',
                                    border: '2px solid #007bff',
                                    borderRadius: '25px',
                                    backgroundColor: searchType === 'name' ? '#007bff' : 'transparent',
                                    color: searchType === 'name' ? '#fff' : '#007bff',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    position: 'relative',
                                }}
                            >
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="name"
                                    checked={searchType === 'name'}
                                    onChange={() => setSearchType('name')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ marginLeft: '10px', fontWeight: 500 }}>
                                    Search by Name
                                </span>
                            </label>
                            <label 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '10px 20px',
                                    border: '2px solid #007bff',
                                    borderRadius: '25px',
                                    backgroundColor: searchType === 'epic' ? '#007bff' : 'transparent',
                                    color: searchType === 'epic' ? '#fff' : '#007bff',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    position: 'relative',
                                }}
                            >
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="epic"
                                    checked={searchType === 'epic'}
                                    onChange={() => setSearchType('epic')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ marginLeft: '10px', fontWeight: 500 }}>
                                    Search by EPIC Number
                                </span>
                            </label>
                        </div>
                    </div>

                    {searchType === 'name' ? (
                        <>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Middle Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Middle Name"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium mb-1">Voter EPIC No</label>
                            <Input
                                type="text"
                                placeholder="Enter EPIC No"
                                value={epicNo}
                                onChange={(e) => setEpicNo(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="flex gap-4 items-center">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Captcha</label>
                            <Input
                                type="text"
                                placeholder="Enter Captcha"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div className="w-24 h-10 bg-gray-200 flex items-center justify-center font-bold text-lg">
                            {captcha}
                        </div>
                        <Button type="button" onClick={refreshCaptcha} className="text-sm">
                            Regenerate Captcha
                        </Button>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                </form>
            </Card>

            {showResults && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-red-400 text-white p-4">
                        <h2 className="text-lg font-medium">
                            Searched Voters ({results.length} results)
                        </h2>
                        <Button variant="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </div>

                    {results.map((voter, index) => (
                        <Card key={index} className="p-6 mb-4 border">
                            <div className="mb-2 text-sm">
                                <span className="font-bold">विधानसभा :</span> <span className="font-bold text-blue-600">142 - कल्याण पूर्व</span>
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="font-bold">मतदार क्र.:</span> <span className="font-bold text-blue-600">{voter.अ_क्र}</span>
                                </div>
                                <div>
                                    <span className="font-bold">यादी भाग क्र.:</span> <span className="text-blue-600">{voter.यादीभाग}</span>
                                </div>
                            </div>
                            
                            <div className="font-semibold text-lg mb-2">
                                {voter.firstName} {voter.middleName} {voter.lastName} 
                                {/* ({voter.वय} {voter.लिंग}) */}
                            </div>
                            
                            <div className="text-sm mb-2">
                                <span className="font-bold">मतदार ओळखपत्र क्र.:</span> <span className="font-bold text-blue-600">{voter.voterId}</span>
                            </div>
                            
                            <div className="text-sm mb-2">
                                <span className="font-bold">Booth :</span> {voter.मतदान_केंद्र}
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => {
                                        setSelectedVoter(voter);
                                        setIsWhatsAppModalOpen(true);
                                    }}
                                >
                                    Get Your Slip via WhatsApp
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => { 
                                setSelectedVoter(voter); 
                                setIsSmsModalOpen(true); // Open SMS modal
                                }}>
                                Get Your Slip via SMS
                                </Button>
                                {/* <Button variant="secondary" size="sm">
                                    Get Your Slip via SMS
                                </Button> */}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            

            {/* Add WhatsApp Modal */}
            <WhatsAppSlipModal
                isOpen={isWhatsAppModalOpen}
                onClose={() => {
                    setIsWhatsAppModalOpen(false);
                    setSelectedVoter(null);
                }}
                voterData={selectedVoter}

            />
            <SmsSlipModal // Add SMS Modal here
            isOpen={isSmsModalOpen}
            onClose={() => {
            setIsSmsModalOpen(false);
            setSelectedVoter(null);
            }}
            voterData={selectedVoter}
            />
            
        </div>
        
    );
}