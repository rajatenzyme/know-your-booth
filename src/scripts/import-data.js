// scripts/import-data.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

// Define Voter Schema
const voterSchema = new mongoose.Schema({
    यादीभाग: String,
    बूथ_नं: String,
    अ_क्र: String,
    lastName: String,
    firstName: String,
    middleName: String,
    eLastName: String,
    eFirstName: String,
    eMiddleName: String,
    लिंग: String,
    वय: String,
    voterId: { type: String, index: true },
    मतदान_केंद्र: String
});

// Create model
const Voter = mongoose.models.Voter || mongoose.model('Voter', voterSchema);

async function importData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Voter.deleteMany({});
        console.log('Cleared existing data');
        
        const filePath = path.join(process.cwd(), 'datas', 'final_data.json');
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        const formattedData = jsonData.map(record => ({
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

        // Use bulk operation for better performance
        const batchSize = 1000;
        for (let i = 0; i < formattedData.length; i += batchSize) {
            const batch = formattedData.slice(i, i + batchSize);
            await Voter.insertMany(batch);
            console.log(`Imported ${i + batch.length} records`);
        }

        console.log('Data import completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Import error:', error);
        process.exit(1);
    }
}

importData();