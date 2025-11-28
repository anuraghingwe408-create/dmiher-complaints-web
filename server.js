require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { pool, testConnection, initializeDatabase } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes

// Serve main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve faculty page
app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faculty.html'));
});

// Get all complaints
app.get('/api/complaints', async (req, res) => {
    try {
        const [complaints] = await pool.query(
            'SELECT * FROM complaints ORDER BY created_at DESC'
        );
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Add new complaint
app.post('/api/complaints', async (req, res) => {
    try {
        const newComplaint = {
            id: 'C' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5).toUpperCase(),
            student_id: req.body.studentId,
            student_name: req.body.studentName,
            student_email: req.body.studentEmail,
            department: req.body.department,
            year: req.body.year,
            complaint_type: req.body.complaintType,
            subject: req.body.subject,
            description: req.body.description,
            status: 'Pending'
        };

        await pool.query(
            `INSERT INTO complaints (id, student_id, student_name, student_email, department, year, complaint_type, subject, description, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newComplaint.id,
                newComplaint.student_id,
                newComplaint.student_name,
                newComplaint.student_email,
                newComplaint.department,
                newComplaint.year,
                newComplaint.complaint_type,
                newComplaint.subject,
                newComplaint.description,
                newComplaint.status
            ]
        );

        res.json({ success: true, complaint: newComplaint });
    } catch (error) {
        console.error('Error saving complaint:', error);
        res.status(500).json({ error: 'Failed to save complaint' });
    }
});

// Update complaint (faculty response)
app.put('/api/complaints/:id', async (req, res) => {
    try {
        const { status, facultyResponse } = req.body;
        
        const updateFields = [];
        const values = [];

        if (status) {
            updateFields.push('status = ?');
            values.push(status);
        }

        if (facultyResponse) {
            updateFields.push('faculty_response = ?');
            values.push(facultyResponse);
            updateFields.push('responded_at = NOW()');
        }

        values.push(req.params.id);

        await pool.query(
            `UPDATE complaints SET ${updateFields.join(', ')} WHERE id = ?`,
            values
        );

        const [complaints] = await pool.query('SELECT * FROM complaints WHERE id = ?', [req.params.id]);
        
        if (complaints.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        res.json({ success: true, complaint: complaints[0] });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

// Delete complaint
app.delete('/api/complaints/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM complaints WHERE id = ?', [req.params.id]);
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
        
        const [students] = await pool.query(
            'SELECT * FROM students WHERE id = ? AND password = ? AND course = ?',
            [studentId, password, course]
        );

        if (students.length > 0) {
            // Verify email format for existing students
            if (!isValidDMIHEREmail(students[0].email)) {
                return res.status(401).json({ 
                    success: false, 
                    error: 'Invalid email format. Please contact administrator to update your email.' 
                });
            }
            
            const { password, ...studentData } = students[0];
            res.json({ success: true, student: studentData });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during student login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Faculty authentication
app.post('/api/faculty/login', (req, res) => {
    const { password } = req.body;
    const FACULTY_PASSWORD = process.env.FACULTY_PASSWORD || 'admin123';

    if (password === FACULTY_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

// Email validation function
function isValidDMIHEREmail(email) {
    // Check if email ends with @dmiher.edu.in
    if (!email.endsWith('@dmiher.edu.in')) {
        return false;
    }
    
    // Extract the local part (before @)
    const localPart = email.split('@')[0];
    
    // Check if it matches the pattern: scXXXXsaXXXX (where X is a digit)
    // sc followed by 4 digits, then sa, then 4 digits
    const pattern = /^sc\d{4}sa\d{4}$/;
    
    return pattern.test(localPart);
}

// Register new student
app.post('/api/student/register', async (req, res) => {
    try {
        const { name, course, email, phone } = req.body;

        // Validate DMIHER email format
        if (!isValidDMIHEREmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email format. Please use your official DMIHER email (format: scXXXXsaXXXX@dmiher.edu.in)' 
            });
        }

        // Generate student ID
        const coursePrefix = {
            'bca': 'BCA',
            'bba': 'BBA',
            'mca': 'MCA',
            'bsc_aids': 'BSCAIDS'
        };

        const prefix = coursePrefix[course] || 'STU';
        const year = new Date().getFullYear();
        
        const [rows] = await pool.query(
            'SELECT COUNT(*) as count FROM students WHERE course = ?',
            [course]
        );
        
        const nextSerial = rows[0].count + 1;
        const studentId = `${prefix}${year}${String(nextSerial).padStart(3, '0')}`;

        // Generate password
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Insert new student
        await pool.query(
            `INSERT INTO students (id, password, name, dept, email, phone, course)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [studentId, password, name, course.toUpperCase(), email, phone, course]
        );

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
        console.error('Error registering student:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Get all students (for admin)
app.get('/api/students', async (req, res) => {
    try {
        const [students] = await pool.query('SELECT * FROM students ORDER BY course, id');
        
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
        // Test database connection
        const connected = await testConnection();
        
        if (!connected) {
            console.error('⚠️  Starting without database connection. Please check your MySQL configuration.');
        } else {
            // Initialize database tables
            await initializeDatabase();
        }

        // Start server
        app.listen(PORT, () => {
            console.log('🚀 DMIHER Complaint Portal Server Started!');
            console.log(`📍 Server running on: http://localhost:${PORT}`);
            console.log(`📚 Student Portal: http://localhost:${PORT}/`);
            console.log(`👨‍🏫 Faculty Portal: http://localhost:${PORT}/faculty`);
            console.log(`🔑 Faculty Password: ${process.env.FACULTY_PASSWORD || 'admin123'}`);
            console.log('✅ MySQL Database connected');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
