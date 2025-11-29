const mongoose = require('mongoose');

// MongoDB Connection with event listeners
const connectDB = async () => {
    try {
        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('📡 Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Mongoose disconnected from MongoDB');
            console.log('🔄 Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ Mongoose reconnected to MongoDB');
        });

        // Connect to MongoDB with robust options
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds to select server
            socketTimeoutMS: 45000,           // 45 seconds for socket operations
            connectTimeoutMS: 30000,          // 30 seconds for initial connection
            heartbeatFrequencyMS: 10000,      // Check connection every 10 seconds
            retryWrites: true,                // Retry failed writes
            retryReads: true,                 // Retry failed reads
            maxPoolSize: 10,                  // Maximum connection pool size
            minPoolSize: 2,                   // Minimum connection pool size
            autoIndex: true,                  // Build indexes automatically
            family: 4                         // Use IPv4, skip trying IPv6
        });
        
        // Wait for connection to be ready
        if (mongoose.connection.readyState === 1) {
            console.log('✅ MongoDB connection ready');
            return true;
        } else {
            console.error('⚠️  MongoDB connection not ready');
            return false;
        }
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.error('⚠️  Please check your MongoDB connection string in .env file');
        console.error('⚠️  Expected format: MONGODB_URI=mongodb+srv://...');
        return false;
    }
};

// Faculty Schema
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: String,
    createdAt: { type: Date, default: Date.now }
});

// Student Schema
const studentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dept: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    year: String,
    course: String,
    registrationDate: { type: Date, default: Date.now }
});

// Complaint Schema
const complaintSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    student_id: { type: String, required: true },
    student_name: { type: String, required: true },
    student_email: { type: String, required: true },
    department: { type: String, required: true },
    year: String,
    complaint_type: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    faculty_response: String,
    created_at: { type: Date, default: Date.now },
    responded_at: Date,
    attachment: {
        filename: { type: String },
        mimetype: { type: String },
        data: { type: String },
        size: { type: Number },
        uploadedAt: { type: Date, default: Date.now }
    }
});

// Create Models
const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);

// Initialize default data
async function initializeDatabase() {
    try {
        // Insert default faculty if none exist
        const facultyCount = await Faculty.countDocuments();
        if (facultyCount === 0) {
            await Faculty.create({
                name: 'Dr. Admin Faculty',
                email: 'sc2024sa99999@dmiher.edu.in',
                password: 'admin123',
                department: 'Administration'
            });
            console.log('✅ Default faculty account created');
        }

        // Insert default students if none exist
        const studentCount = await Student.countDocuments();
        if (studentCount === 0) {
            const defaultStudents = [
                { id: 'BCA2023001', password: 'bca123', name: 'Aarav Sharma', dept: 'BCA', email: 'sc2023sa00001@dmiher.edu.in', year: '3rd Year', course: 'bca' },
                { id: 'BCA2023002', password: 'bca123', name: 'Isha Patel', dept: 'BCA', email: 'sc2023sa00002@dmiher.edu.in', year: '2nd Year', course: 'bca' },
                { id: 'BCA2023003', password: 'bca123', name: 'Rohan Verma', dept: 'BCA', email: 'sc2023sa00003@dmiher.edu.in', year: '1st Year', course: 'bca' },
                { id: 'BBA2023001', password: 'bba123', name: 'Neha Gupta', dept: 'BBA', email: 'sc2023sa00004@dmiher.edu.in', year: '3rd Year', course: 'bba' },
                { id: 'BBA2023002', password: 'bba123', name: 'Karan Singh', dept: 'BBA', email: 'sc2023sa00005@dmiher.edu.in', year: '2nd Year', course: 'bba' },
                { id: 'BBA2023003', password: 'bba123', name: 'Priya Reddy', dept: 'BBA', email: 'sc2023sa00006@dmiher.edu.in', year: '1st Year', course: 'bba' },
                { id: 'MCA2023001', password: 'mca123', name: 'Vikram Joshi', dept: 'MCA', email: 'sc2023sa00007@dmiher.edu.in', year: '2nd Year', course: 'mca' },
                { id: 'MCA2023002', password: 'mca123', name: 'Anjali Desai', dept: 'MCA', email: 'sc2023sa00008@dmiher.edu.in', year: '1st Year', course: 'mca' },
                { id: 'MCA2023003', password: 'mca123', name: 'Rajesh Kumar', dept: 'MCA', email: 'sc2023sa00009@dmiher.edu.in', year: '2nd Year', course: 'mca' },
                { id: 'BSCAIDS2023001', password: 'aids123', name: 'Sneha Iyer', dept: 'BSc AIDS', email: 'sc2023sa00010@dmiher.edu.in', year: '3rd Year', course: 'bsc_aids' },
                { id: 'BSCAIDS2023002', password: 'aids123', name: 'Arun Mehta', dept: 'BSc AIDS', email: 'sc2023sa00011@dmiher.edu.in', year: '2nd Year', course: 'bsc_aids' },
                { id: 'BSCAIDS2023003', password: 'aids123', name: 'Pooja Nair', dept: 'BSc AIDS', email: 'sc2023sa00012@dmiher.edu.in', year: '1st Year', course: 'bsc_aids' }
            ];
            await Student.insertMany(defaultStudents);
            console.log('✅ Default students created');
        }

        console.log('✅ Database initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
    }
}

module.exports = { connectDB, initializeDatabase, Faculty, Student, Complaint };
