// app/api/voters/route.ts

import { NextResponse } from 'next/server';

import * as fs from 'fs';




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

// This function will read data from Excel file
const getVoterData = (): VoterRecord[] => {
    try {
        // const workbook = XLSX.readFile(filePath);
        // // const workbook = XLSX.readFile(path.join(process.cwd(), 'data', 'voters.xlsx'));
        // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // const data = XLSX.utils.sheet_to_json(worksheet);

        // data = [{
        //     यादीभाग: "1",
        //     बूथ_नं: "1",
        //     अ_क्र: "1",
        //     lastName: "हुमणे",
        //     firstName: "भाविका",
        //     middleName: "भगवान",
        //     eLastName: "Humane",
        //     eFirstName: "Bhavika",
        //     eMiddleName: "Bhagavan",
        //     लिंग: "F",
        //     वय: "40",
        //     voterId: "UMM7170087",
        //     epicNo : "UMM7170087",
        //     मतदान_केंद्र: "झुगरेवाडी रा. जि . प. प्राथमिक मराठी शाळा (नवीन इमारत ) खोली क्र. 1 झुगरेवाडी"
        // }];
        const data = JSON.parse(fs.readFileSync('/Users/rajat/Desktop/rohan-voter/my-voter-app/data/1.json', 'utf-8'));
        // console.log(data);

        

        // console.log(data);
        return data.map((record: any) => ({
            यादीभाग: record['यादीभाग']?.toString() || '',
            बूथ_नं: record['बूथ नं']?.toString() || '',
            अ_क्र: record['अ क्र']?.toString() || '',
            lastName: record['Last Name'] || '',
            firstName: record['First Name'] || '',
            middleName: record['Middle Name'] || '',
            eLastName: record['E Last Name'] || '',
            eFirstName: record['E First Name'] || '',
            eMiddleName: record['E Middle Name'] || '',
            लिंग: record['लिंग'] || '',
            वय: record['वय']?.toString() || '',
            voterId: record['मतदान कार्ड'] || '',
            मतदान_केंद्र: record['मतदान केंद्र'] || ''
        }));
    } catch (error) {
        console.error('Error reading Excel file:', error);
        return [];
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const firstName = searchParams.get('firstName');
    const middleName = searchParams.get('middleName');
    const lastName = searchParams.get('lastName');
    const epicNo = searchParams.get('epicNo');

    const voterData = getVoterData();
    let results = voterData;

    try {
        if (epicNo) {
            results = results.filter(voter => 
                voter.voterId.toLowerCase() === epicNo.toLowerCase()
            );
        } else {
            if (firstName) {
                results = results.filter(voter =>
                    voter.firstName.toLowerCase().includes(firstName.toLowerCase()) ||
                    voter.eFirstName.toLowerCase().includes(firstName.toLowerCase())
                );
            }
            
            if (middleName) {
                results = results.filter(voter =>
                    voter.middleName.toLowerCase().includes(middleName.toLowerCase()) ||
                    voter.eMiddleName.toLowerCase().includes(middleName.toLowerCase())
                );
            }
            
            if (lastName) {
                results = results.filter(voter =>
                    voter.lastName.toLowerCase().includes(lastName.toLowerCase()) ||
                    voter.eLastName.toLowerCase().includes(lastName.toLowerCase())
                );
            }
        }

        return NextResponse.json({ 
            success: true, 
            data: results,
            count: results.length 
        });

    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                error: 'An error occurred while searching voters' 
            },
            { status: 500 }
        );
    }
}