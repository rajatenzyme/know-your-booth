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

interface WhatsAppSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  voterData?: VoterData | null;
}

const WhatsAppSlipModal: React.FC<WhatsAppSlipModalProps> = ({ 
  isOpen, 
  onClose, 
  voterData 
}) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleSendToWhatsapp = () => {
    // Validate phone number
    if (!whatsappNumber || whatsappNumber.length < 10) {
      alert('Please enter a valid WhatsApp number');
      return;
    }
    // Here you would implement the WhatsApp sending logic
    const smsText = encodeURIComponent(`
*विधानसभा: 142 - कल्याण पूर्व*
*यादी क्र: ${voterData?.यादीभाग || '1002'}*
*अ.क्र: ${voterData?.अ_क्र || '1002'}*
*मतदान ओळखपत्र क्र: ${voterData?.voterId || 'YUH210475'}*
*नाव: ${voterData?.firstName} ${voterData?.middleName} ${voterData?.lastName}*
*मतदान केन्द्र: ${voterData?.मतदान_केंद्र}*

*धन्यवाद*
*महेश दशरथ गायकवाड*
*सर्वपक्षीय स्थानिक अपक्ष उमेदवार*
*निशाणी :- अंगठी*
*बटण क्र :- 14*

विधानसभा 2024 च्या निवडणुकीत 142-कल्याण पूर्व मतदारसंघातील आपले नाव शोधण्यासाठी, महेश दशरथ गायकवाड ह्यांच्या माध्यमातून दिलेल्या Voter Search Link वर क्लिक करा, आपले आणि आपल्या परिचयातील लोकांचे नाव तपासा आणि त्यांच्या माहितीचे तपशील WhatsApp किंवा SMS द्वारे शेअर करा.

अधिक माहितीसाठी कृपया भेट द्या : *mahesh-gaikwad.in*

      `);
      
        
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+91${whatsappNumber}&text=${smsText}`;
    console.log('Sending to WhatsApp:', whatsappUrl);
    window.open(whatsappUrl);
    onClose();
    setWhatsappNumber(''); // Reset the input
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
                  <td className="py-2 px-4 text-gray-600 font-medium">अ क्र</td>
                  <td className="py-2 px-4">{voterData?.अ_क्र || '1002'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-gray-600 font-medium">यादीभाग</td>
                  <td className="py-2 px-4">{voterData?.यादीभाग || '9'}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-gray-600 font-medium">मतदान ओळखपत्र क्र</td>
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
              <h4 className="font-medium">मतदान केन्द्र :</h4>
              <p className="text-gray-600">{voterData?.मतदान_केंद्र}</p>
              
              {/* <h4 className="font-medium mt-4">Booth Name:</h4>
              <p className="text-gray-600">
                सेंट जुड्स इंग्लिश मीडियम स्कूल, खोली क्र. १, महापालिकेच्या जुन्या दवाखान्याजवळ नरहरी चौक,
                कोलसेवाडी कल्याण पूर्व
              </p> */}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-red-500 font-medium mb-2">
              Enter WhatsApp No:
            </label>
            <Input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Enter your WhatsApp number"
              className="w-full"
              maxLength={10}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <div className="flex gap-4 w-full">
            <Button
              onClick={handleSendToWhatsapp}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Send To Whatsapp
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

export default WhatsAppSlipModal;