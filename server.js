require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { connectDB, initializeDatabase, Faculty, Student, Complaint } = require('./database/mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for Base64 files
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check database connection
const checkDBConnection = (req, res, next) => {
    if (require('mongoose').connection.readyState !== 1) {
        return res.status(503).json({ 
            success: false, 
            error: 'Database connection not ready. Please try again in a moment.' 
        });
    }
    next();
};

// File validation function
function validateAttachment(attachment) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(attachment.mimetype)) {
        throw new Error('Invalid file type. Only PNG, JPG, JPEG, and PDF files are allowed.');
    }
    
    if (attachment.size > maxSize) {
        throw new Error('File size exceeds 5MB limit.');
    }
    
    // Validate Base64 format
    if (!attachment.data || typeof attachment.data !== 'string') {
        throw new Error('Invalid file data.');
    }
    
    // Basic Base64 validation
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    if (!base64Pattern.test(attachment.data)) {
        throw new Error('Invalid Base64 format.');
    }
    
    return true;
}

// Routes

// Serve landing page as default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve student portal (requires login)
app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

// Serve faculty page (requires login)
app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faculty.html'));
});

// Get all complaints
app.get('/api/complaints', checkDBConnection, async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ created_at: -1 });
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Add new complaint
app.post('/api/complaints', checkDBConnection, async (req, res) => {
    try {
        console.log('📥 Received complaint submission');
        const { attachment, ...complaintData } = req.body;
        
        // Validate attachment if present
        if (attachment) {
            console.log('📎 Attachment detected:', attachment.filename, 'Size:', attachment.size);
            try {
                validateAttachment(attachment);
                console.log('✅ Attachment validation passed');
            } catch (validationError) {
                console.error('❌ Attachment validation failed:', validationError.message);
                return res.status(400).json({ 
                    success: false, 
                    error: validationError.message 
                });
            }
        }
        
        const newComplaint = {
            id: 'C' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5).toUpperCase(),
            student_id: complaintData.studentId,
            student_name: complaintData.studentName,
            student_email: complaintData.studentEmail,
            department: complaintData.department,
            year: complaintData.year,
            complaint_type: complaintData.complaintType,
            subject: complaintData.subject,
            description: complaintData.description,
            status: 'Pending',
            attachment: attachment || null
        };

        console.log('💾 Saving complaint to database...');
        const complaint = await Complaint.create(newComplaint);
        console.log('✅ Complaint saved successfully:', complaint.id);
        res.json({ success: true, complaint });
    } catch (error) {
        console.error('❌ Error saving complaint:', error);
        console.error('Error details:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Failed to save complaint' 
        });
    }
});

// Update complaint (faculty response)
app.put('/api/complaints/:id', async (req, res) => {
    try {
        const { status, facultyResponse } = req.body;
        
        const updateData = {};
        if (status) updateData.status = status;
        if (facultyResponse) {
            updateData.faculty_response = facultyResponse;
            updateData.responded_at = new Date();
        }

        const complaint = await Complaint.findOneAndUpdate(
            { id: req.params.id },
            updateData,
            { new: true }
        );
        
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.json({ success: true, complaint });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

// Delete complaint
app.delete('/api/complaints/:id', async (req, res) => {
    try {
        await Complaint.findOneAndDelete({ id: req.params.id });
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        res.status(500).json({ error: 'Failed to delete complaint' });
    }
});

// Student authentication
app.post('/api/student/login', async (req, res) => {
    try {
        const { course, studentId, password } = req.body;
        
        const student = await Student.findOne({ id: studentId, password, course });

        if (student) {
            // Verify email format for existing students
            if (!isValidDMIHEREmail(student.email)) {
                return res.status(401).json({ 
                    success: false, 
                    error: 'Invalid email format. Please contact administrator to update your email.' 
                });
            }
            
            const studentData = student.toObject();
            delete studentData.password;
            res.json({ success: true, student: studentData });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during student login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Unified Login (Student & Faculty)
app.post('/api/login', checkDBConnection, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate DMIHER email format
        if (!isValidDMIHEREmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email format. Use: scXXXXsaXXXXX@dmiher.edu.in (e.g., sc2024sa00087@dmiher.edu.in)' 
            });
        }
        
        // Check if it's a faculty login (check faculty table first)
        const faculty = await Faculty.findOne({ email, password });
        
        if (faculty) {
            const facultyData = faculty.toObject();
            delete facultyData.password;
            return res.json({ 
                success: true, 
                userType: 'faculty',
                user: facultyData 
            });
        }
        
        // Check if it's a student login
        const student = await Student.findOne({ email, password });
        
        if (student) {
            const studentData = student.toObject();
            delete studentData.password;
            return res.json({ 
                success: true, 
                userType: 'student',
                user: studentData 
            });
        }
        
        // No match found
        res.status(401).json({ success: false, error: 'Invalid email or password' });
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ 
            success: false,
            error: 'Login failed. Please try again.' 
        });
    }
});

// Legacy faculty login endpoint (for backward compatibility)
app.post('/api/faculty/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // If email is provided, use new unified login
        if (email) {
            return res.redirect(307, '/api/login');
        }
        
        // Legacy password-only login (deprecated)
        const FACULTY_PASSWORD = process.env.FACULTY_PASSWORD || 'admin123';
        if (password === FACULTY_PASSWORD) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, error: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error during faculty login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Email validation function
function isValidDMIHEREmail(email) {
    // Only accept format: scXXXXsaXXXXX@dmiher.edu.in
    // Example: sc2024sa00087@dmiher.edu.in
    const emailPattern = /^sc\d{4}sa\d{5}@dmiher\.edu\.in$/;
    return emailPattern.test(email);
}

// Register new student
app.post('/api/student/register', checkDBConnection, async (req, res) => {
    try {
        console.log('📝 Student registration request received');
        const { name, course, email, password, phone } = req.body;

        // Validate required fields
        if (!name || !course || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required (name, course, email, password)' 
            });
        }

        // Validate DMIHER email format
        if (!isValidDMIHEREmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email format. Use: scXXXXsaXXXXX@dmiher.edu.in (e.g., sc2024sa00087@dmiher.edu.in)' 
            });
        }

        console.log('✅ Validation passed, checking for existing email...');
        
        // Check if email already exists first (faster query)
        const existing = await Student.findOne({ email }).maxTimeMS(5000);
        
        if (existing) {
            console.log('⚠️  Email already registered');
            return res.status(400).json({ 
                success: false, 
                error: 'Email already registered' 
            });
        }

        console.log('✅ Email available, generating student ID...');

        // Generate student ID
        const coursePrefix = {
            'bca': 'BCA',
            'bba': 'BBA',
            'mca': 'MCA',
            'bsc_aids': 'BSCAIDS'
        };

        const prefix = coursePrefix[course] || 'STU';
        const year = new Date().getFullYear();
        
        // Use estimatedDocumentCount for faster counting
        const count = await Student.countDocuments({ course }).maxTimeMS(5000);
        const nextSerial = count + 1;
        const studentId = `${prefix}${year}${String(nextSerial).padStart(3, '0')}`;

        console.log('✅ Generated student ID:', studentId);
        console.log('💾 Creating student record...');

        // Insert new student with provided password
        await Student.create({
            id: studentId,
            password,
            name,
            dept: course.toUpperCase(),
            email,
            phone,
            course
        });

        console.log('✅ Student registered successfully');

        res.json({
            success: true,
            student: {
                id: studentId,
                name,
                dept: course.toUpperCase(),
                email,
                phone,
                course
            }
        });
    } catch (error) {
        console.error('❌ Error registering student:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'MongooseError' && error.message.includes('buffering')) {
            return res.status(503).json({ 
                success: false,
                error: 'Database connection issue. Please try again in a moment.' 
            });
        }
        
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false,
                error: 'Email or Student ID already exists' 
            });
        }
        
        res.status(500).json({ 
            success: false,
            error: error.message || 'Registration failed. Please try again.' 
        });
    }
});

// Get all students (for admin)
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find().sort({ course: 1, id: 1 });
        
        // Group by course
        const groupedStudents = students.reduce((acc, student) => {
            if (!acc[student.course]) {
                acc[student.course] = [];
            }
            acc[student.course].push(student);
            return acc;
        }, {});

        res.json(groupedStudents);
    } catch (error) {
        console.error('Error reading students:', error);
        res.status(500).json({ error: 'Failed to read students data' });
    }
});

// Initialize database and start server
async function startServer() {
    try {
        // Connect to MongoDB
        const connected = await connectDB();
        
        if (!connected) {
            console.error('⚠️  Starting without database connection. Please check your MongoDB configuration.');
        } else {
            // Initialize database with default data
            await initializeDatabase();
        }

        // Start server only if not in Vercel environment
        if (process.env.VERCEL !== '1') {
            app.listen(PORT, () => {
                console.log('🚀 DMIHER Complaint Portal Server Started!');
                console.log(`📍 Server running on: http://localhost:${PORT}`);
                console.log(`📚 Student Portal: http://localhost:${PORT}/`);
                console.log(`👨‍🏫 Faculty Portal: http://localhost:${PORT}/faculty`);
                console.log(`🔑 Faculty Password: ${process.env.FACULTY_PASSWORD || 'admin123'}`);
                console.log('✅ MongoDB Database connected');
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        if (process.env.VERCEL !== '1') {
            process.exit(1);
        }
    }
}

// Initialize database
startServer();

// Export for Vercel
module.exports = app;
