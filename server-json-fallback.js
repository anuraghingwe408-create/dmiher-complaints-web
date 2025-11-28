require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Data storage files
const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const FACULTY_FILE = path.join(DATA_DIR, 'faculty.json');
const COMPLAINTS_FILE = path.join(DATA_DIR, 'complaints.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files
function initializeDataFiles() {
    if (!fs.existsSync(STUDENTS_FILE)) {
        fs.writeFileSync(STUDENTS_FILE, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(FACULTY_FILE)) {
        const defaultFaculty = [
            { id: 1, name: 'Dr. Admin Faculty', email: 'admin@dmiher.edu.in', password: 'admin123', department: 'Administration' }
        ];
        fs.writeFileSync(FACULTY_FILE, JSON.stringify(defaultFaculty, null, 2));
    }
    
    if (!fs.existsSync(COMPLAINTS_FILE)) {
        fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify([], null, 2));
    }
    
    console.log('✅ JSON data files initialized');
}

// Email validation
function isValidDMIHEREmail(email) {
    return email.endsWith('@dmiher.edu.in');
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

app.get('/faculty', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'faculty.html'));
});

// Unified Login
app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!isValidDMIHEREmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please use your official DMIHER email address (@dmiher.edu.in)' 
            });
        }
        
        // Check faculty
        const faculty = JSON.parse(fs.readFileSync(FACULTY_FILE, 'utf8'));
        const facultyUser = faculty.find(f => f.email === email && f.password === password);
        
        if (facultyUser) {
            const { password, ...facultyData } = facultyUser;
            return res.json({ success: true, userType: 'faculty', user: facultyData });
        }
        
        // Check students
        const students = JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
        const student = students.find(s => s.email === email && s.password === password);
        
        if (student) {
            const { password, ...studentData } = student;
            return res.json({ success: true, userType: 'student', user: studentData });
        }
        
        res.status(401).json({ success: false, error: 'Invalid email or password' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Student Registration
app.post('/api/student/register', (req, res) => {
    try {
        const { name, email, password, phone, course } = req.body;
        
        if (!isValidDMIHEREmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please use your official DMIHER email address (@dmiher.edu.in)' 
            });
        }
        
        const students = JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
        
        // Check if email already exists
        if (students.find(s => s.email === email)) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }
        
        // Generate student ID
        const coursePrefix = { 'bca': 'BCA', 'bba': 'BBA', 'mca': 'MCA', 'bsc_aids': 'BSCAIDS' };
        const prefix = coursePrefix[course] || 'STU';
        const year = new Date().getFullYear();
        const courseStudents = students.filter(s => s.course === course);
        const nextSerial = courseStudents.length + 1;
        const studentId = `${prefix}${year}${String(nextSerial).padStart(3, '0')}`;
        
        // Create new student
        const newStudent = {
            id: studentId,
            password,
            name,
            dept: course.toUpperCase(),
            email,
            phone: phone || '',
            year: '',
            course,
            registration_date: new Date().toISOString()
        };
        
        students.push(newStudent);
        fs.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2));
        
        const { password: _, ...studentData } = newStudent;
        res.json({ success: true, student: studentData });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Get all complaints
app.get('/api/complaints', (req, res) => {
    try {
        const complaints = JSON.parse(fs.readFileSync(COMPLAINTS_FILE, 'utf8'));
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// Add complaint
app.post('/api/complaints', (req, res) => {
    try {
        const complaints = JSON.parse(fs.readFileSync(COMPLAINTS_FILE, 'utf8'));
        
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
            status: 'Pending',
            created_at: new Date().toISOString()
        };
        
        complaints.push(newComplaint);
        fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(complaints, null, 2));
        
        res.json({ success: true, complaint: newComplaint });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save complaint' });
    }
});

// Update complaint
app.put('/api/complaints/:id', (req, res) => {
    try {
        const complaints = JSON.parse(fs.readFileSync(COMPLAINTS_FILE, 'utf8'));
        const index = complaints.findIndex(c => c.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Complaint not found' });
        }
        
        complaints[index] = {
            ...complaints[index],
            ...req.body,
            responded_at: req.body.facultyResponse ? new Date().toISOString() : complaints[index].responded_at
        };
        
        fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(complaints, null, 2));
        res.json({ success: true, complaint: complaints[index] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

// Delete complaint
app.delete('/api/complaints/:id', (req, res) => {
    try {
        const complaints = JSON.parse(fs.readFileSync(COMPLAINTS_FILE, 'utf8'));
        const filtered = complaints.filter(c => c.id !== req.params.id);
        fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(filtered, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete complaint' });
    }
});

// Get all students
app.get('/api/students', (req, res) => {
    try {
        const students = JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
        const grouped = students.reduce((acc, student) => {
            if (!acc[student.course]) acc[student.course] = [];
            acc[student.course].push(student);
            return acc;
        }, {});
        res.json(grouped);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read students' });
    }
});

// Initialize and start
initializeDataFiles();

app.listen(PORT, () => {
    console.log('🚀 DMIHER Complaint Portal Server Started!');
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📚 Student Portal: http://localhost:${PORT}/student`);
    console.log(`👨‍🏫 Faculty Portal: http://localhost:${PORT}/faculty`);
    console.log(`🔑 Faculty: admin@dmiher.edu.in / admin123`);
    console.log('📁 Using JSON file storage (MySQL not required)');
    console.log('✅ Ready to accept registrations!');
});
