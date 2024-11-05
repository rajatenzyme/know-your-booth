'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VoterData {
  अ_क्र: string;
  यादीभाग: string;
  voterId: string;
  firstName: string;
  middleName :string;
  lastName: string;
  मतदान_केंद्र: string;
}

interface SmsSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  voterData?: VoterData | null;
}

const SmsSlipModal: React.FC<SmsSlipModalProps> = ({ 
  isOpen, 
  onClose, 
  voterData 
}) => {
  const [smsNumber, setSmsNumber] = useState('');

  const handleSendToSms = () => {
    // Validate phone number
    if (!smsNumber || smsNumber.length < 10) {
      alert('Please enter a valid SMS number');
      return;
    }
    
    // Here you would implement the SMS sending logic
    const smsText = encodeURIComponent(`
विधानसभा: 142 - कल्याण पूर्व
यादी क्र: ${voterData?.यादीभाग || '1002'}
अ.क्र: ${voterData?.अ_क्र || '1002'}
मतदान ओळखपत्र क्र: ${voterData?.voterId || 'YUH210475'}
नाव: ${voterData?.firstName} ${voterData?.middleName} ${voterData?.lastName}
Booth: ${voterData?.मतदान_केंद्र}

सौजन्य से:
महेश दशरथ गायकवाड
सर्वपक्षीय स्थानिक अपक्ष उमेदवार
निशाणी :- अंगठी 
बटण क्र :- 14 

विधानसभा 2024 च्या निवडणुकीत 142-कल्याण पूर्व मतदारसंघातील आपले नाव शोधण्यासाठी, महेश दशरथ गायकवाड ह्यांच्या माध्यमातून दिलेल्या Voter Search Link वर क्लिक करा, आपले आणि आपल्या परिचयातील लोकांचे नाव तपासा आणि त्यांच्या माहितीचे तपशील WhatsApp किंवा SMS द्वारे शेअर करा.

धन्यवाद!

https://know-your-booth.vercel.app/
            `);

    const smsUrl = `sms:+91${smsNumber}?body=${smsText}`;
    
    // Simulate sending SMS
    console.log('Sending to SMS:', smsUrl);
    window.open(smsUrl);
    
    onClose();
    setSmsNumber(''); // Reset the input
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Voter Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 px-4 text-gray-600 font-medium">Sr No.</td>
                  <td className="py-2 px-4">{voterData?.अ_क्र || '1002'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-gray-600 font-medium">Booth No</td>
                  <td className="py-2 px-4">{voterData?.यादीभाग || '9'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-gray-600 font-medium">CardNo</td>
                  <td className="py-2 px-4">{voterData?.voterId || 'YUH210475'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">
              {voterData?.firstName} {voterData?.middleName} {voterData?.lastName}
            </h3>
            
            <div className="space-y-2">
              <h4 className="font-medium">Booth :</h4>
              <p className="text-gray-600">{voterData?.मतदान_केंद्र}</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-red-500 font-medium mb-2">
              Enter SMS No:
            </label>
            <Input
              type="tel"
              value={smsNumber}
              onChange={(e) => setSmsNumber(e.target.value)}
              placeholder="Enter your SMS number"
              className="w-full"
              maxLength={10}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <div className="flex gap-4 w-full">
            <Button
              onClick={handleSendToSms}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Send To SMS
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SmsSlipModal;