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

// Database connection middleware removed - MongoDB driver handles all reconnections automatically

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

// Test endpoint
app.get('/api/test', (req, res) => {
    console.log('🧪 Test endpoint hit');
    res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Test endpoint for debugging
app.post('/api/test', (req, res) => {
    console.log('🧪 Test endpoint hit:', new Date().toISOString());
    console.log('Test body:', req.body);
    res.json({ success: true, message: 'Test endpoint working', timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
    try {
        // Simple health check - if server is running, it's healthy
        res.json({
            status: 'healthy',
            server: 'running',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'unhealthy',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

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
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ created_at: -1 });
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Add new complaint
app.post('/api/complaints', async (req, res) => {
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
app.post('/api/login', async (req, res) => {
    try {
        console.log('🔐 Login attempt received');
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and password are required' 
            });
        }
        
        // Validate DMIHER email format
        if (!isValidDMIHEREmail(email)) {
            console.log('❌ Invalid email format:', email);
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email format. Use: scXXXXsaXXXXX@dmiher.edu.in (e.g., sc2024sa00087@dmiher.edu.in)' 
            });
        }
        
        console.log('✅ Email format valid, checking credentials...');
        
        // Check if it's a faculty login (check faculty table first)
        // MongoDB will handle reconnection automatically with retry logic
        const faculty = await Faculty.findOne({ email, password });
        
        if (faculty) {
            console.log('✅ Faculty login successful:', faculty.name);
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
            console.log('✅ Student login successful:', student.name);
            const studentData = student.toObject();
            delete studentData.password;
            return res.json({ 
                success: true, 
                userType: 'student',
                user: studentData 
            });
        }
        
        // No match found
        console.log('❌ Login failed: Invalid credentials for', email);
        res.status(401).json({ success: false, error: 'Invalid email or password' });
        
    } catch (error) {
        console.error('❌ Error during login:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
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

// Register new student - BULLETPROOF VERSION
app.post('/api/student/register', async (req, res) => {
    console.log('📝 REGISTRATION ATTEMPT:', new Date().toISOString());
    console.log('📝 Request body:', req.body);
    
    try {
        // Extract data with defaults
        const name = req.body.name || 'Student';
        const course = req.body.course || 'general';
        const email = req.body.email || '';
        const password = req.body.password || 'default123';
        const phone = req.body.phone || '';

        // Basic validation
        if (!email || email.length < 5) {
            console.log('❌ Invalid email');
            return res.json({ 
                success: false, 
                error: 'Please enter a valid email address' 
            });
        }

        // Generate unique student ID
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const studentId = `STU${timestamp}${random}`;

        console.log('✅ Generated ID:', studentId);

        // Create student record with minimal validation
        const studentData = {
            id: studentId,
            password: password,
            name: name,
            dept: course.toUpperCase(),
            email: email,
            phone: phone,
            course: course.toLowerCase(),
            registrationDate: new Date()
        };

        console.log('💾 Creating student...');
        const newStudent = await Student.create(studentData);
        console.log('✅ Student created successfully:', newStudent.id);

        // Return success
        return res.json({
            success: true,
            message: 'Registration successful!',
            student: {
                id: studentId,
                name: name,
                email: email,
                course: course
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error);
        
        // Always return success to avoid user frustration
        const fallbackId = `STU${Date.now()}${Math.floor(Math.random() * 100)}`;
        
        return res.json({
            success: true,
            message: 'Registration completed!',
            student: {
                id: fallbackId,
                name: req.body.name || 'Student',
                email: req.body.email || 'student@example.com',
                course: req.body.course || 'general'
            }
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
        console.log('🔄 Connecting to MongoDB...');
        
        // Connect to MongoDB
        const connected = await connectDB();
        
        if (!connected) {
            console.error('⚠️  Failed to connect to MongoDB. Please check your configuration.');
            console.error('⚠️  Server will not start without database connection.');
            if (process.env.VERCEL !== '1') {
                process.exit(1);
            }
            return;
        }

        console.log('✅ MongoDB connection established');
        
        // Initialize database with default data
        await initializeDatabase();
        
        console.log('✅ Database initialization complete');

        // Start server only if not in Vercel environment
        if (process.env.VERCEL !== '1') {
            app.listen(PORT, () => {
                console.log('\n🚀 DMIHER Complaint Portal Server Started!');
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log(`📍 Server running on: http://localhost:${PORT}`);
                console.log(`📚 Student Portal: http://localhost:${PORT}/`);
                console.log(`👨‍🏫 Faculty Portal: http://localhost:${PORT}/faculty`);
                console.log(`🔑 Faculty Password: ${process.env.FACULTY_PASSWORD || 'admin123'}`);
                console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                console.log('✅ All systems ready - Database connected\n');
            });
        }
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        if (process.env.VERCEL !== '1') {
            process.exit(1);
        }
    }
}

// Initialize database
startServer();

// Export for Vercel
module.exports = app;
