// app/api/voters/route.ts

import { NextResponse } from 'next/server';

import * as fs from 'fs';
import path from 'path';




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
        
        // const data = JSON.parse(fs.readFileSync('public/1.json', 'utf-8'));

        const filePath = path.join(process.cwd(), 'public', '1.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


        // console.log("hi data",data);

        
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