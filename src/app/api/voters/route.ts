import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Voter from '@/models/Voter';

export async function GET(request: Request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(request.url);

        // console.log("hi ", searchParams);
    
        const firstName = searchParams.get('firstName');
        const middleName = searchParams.get('middleName');
        const lastName = searchParams.get('lastName');
        const epicNo = searchParams.get('epicNo');
        
        // Add pagination parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const skip = (page - 1) * limit;

        let query: any = {};

        if (epicNo) {
            query.voterId = new RegExp(epicNo, 'i');
        } else {
            if (firstName) {
                query.$or = [
                    { firstName: new RegExp(firstName, 'i') },
                    { eFirstName: new RegExp(firstName, 'i') }
                ];
            }
            
            if (middleName) {
                const middleNameQuery = {
                    $or: [
                        { middleName: new RegExp(middleName, 'i') },
                        { eMiddleName: new RegExp(middleName, 'i') }
                    ]
                };
                query = query.$or ? { $and: [query, middleNameQuery] } : middleNameQuery;
            }
            
            if (lastName) {
                const lastNameQuery = {
                    $or: [
                        { lastName: new RegExp(lastName, 'i') },
                        { eLastName: new RegExp(lastName, 'i') }
                    ]
                };
                query = query.$or ? { $and: [query, lastNameQuery] } : lastNameQuery;
            }
        }
        
        // console.log("query ", query);
        
        const [results, total] = await Promise.all([
            Voter.find(query).skip(skip).limit(limit),
            Voter.countDocuments(query)
        ]);

        // console.log("results ", results);

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