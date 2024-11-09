import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Voter from '@/models/Voter';

export async function GET(request: Request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);

        console.log("searchParams ", searchParams);
    
        const firstName = searchParams.get('firstName');
        const middleName = searchParams.get('middleName');
        const lastName = searchParams.get('lastName');
        const epicNo = searchParams.get('epicNo');
        
        // Add pagination parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = (page - 1) * limit;

        let query: any = {};

        // Search by EPIC number if provided
        if (epicNo) {
            query.voterId = new RegExp(epicNo, 'i');
        } 
        // Otherwise, search by name with first and last name being mandatory
        else {
            // Check if first and last name are provided
            if (!firstName || !lastName) {
                return NextResponse.json(
                    { 
                        success: false, 
                        error: 'First name and last name are required when not searching by EPIC number' 
                    },
                    { status: 400 }
                );
            }

            // Build the name search query
            query.$and = [
                {
                    $or: [
                        { firstName: new RegExp(firstName, 'i') },
                        { eFirstName: new RegExp(firstName, 'i') }
                    ]
                },
                {
                    $or: [
                        { lastName: new RegExp(lastName, 'i') },
                        { eLastName: new RegExp(lastName, 'i') }
                    ]
                }
            ];

            // Add middle name to search criteria if provided
            if (middleName) {
                query.$and.push({
                    $or: [
                        { middleName: new RegExp(middleName, 'i') },
                        { eMiddleName: new RegExp(middleName, 'i') }
                    ]
                });
            }
        }
        
        console.log("query ", query);
        
        const [results, total] = await Promise.all([
            Voter.find(query).skip(skip).limit(limit),
            Voter.countDocuments(query)
        ]);

        return NextResponse.json({ 
            success: true, 
            data: results,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: 'An error occurred while searching voters' 
            },
            { status: 500 }
        );
    }
}