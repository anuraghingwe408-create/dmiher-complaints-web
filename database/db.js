const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dmiher_complaints',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
        return false;
    }
}

// Initialize database tables
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Create students table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS students (
                id VARCHAR(50) PRIMARY KEY,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(100) NOT NULL,
                dept VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                phone VARCHAR(20),
                year VARCHAR(20),
                course VARCHAR(50),
                registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_dept (dept)
            )
        `);

        // Create complaints table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS complaints (
                id VARCHAR(50) PRIMARY KEY,
                student_id VARCHAR(50) NOT NULL,
                student_name VARCHAR(100) NOT NULL,
                student_email VARCHAR(100) NOT NULL,
                department VARCHAR(50) NOT NULL,
                year VARCHAR(20),
                complaint_type VARCHAR(50) NOT NULL,
                subject VARCHAR(200) NOT NULL,
                description TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'Pending',
                faculty_response TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                responded_at TIMESTAMP NULL,
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
                INDEX idx_student_id (student_id),
                INDEX idx_status (status),
                INDEX idx_created_at (created_at)
            )
        `);

        // Insert default students if table is empty
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM students');
        if (rows[0].count === 0) {
            await connection.query(`
                INSERT INTO students (id, password, name, dept, email, year, course) VALUES
                ('BCA2023001', 'bca123', 'Aarav Sharma', 'BCA', 'sc2023sa0001@dmiher.edu.in', '3rd Year', 'bca'),
                ('BCA2023002', 'bca123', 'Isha Patel', 'BCA', 'sc2023sa0002@dmiher.edu.in', '2nd Year', 'bca'),
                ('BCA2023003', 'bca123', 'Rohan Verma', 'BCA', 'sc2023sa0003@dmiher.edu.in', '1st Year', 'bca'),
                ('BBA2023001', 'bba123', 'Neha Gupta', 'BBA', 'sc2023sa0004@dmiher.edu.in', '3rd Year', 'bba'),
                ('BBA2023002', 'bba123', 'Karan Singh', 'BBA', 'sc2023sa0005@dmiher.edu.in', '2nd Year', 'bba'),
                ('BBA2023003', 'bba123', 'Priya Reddy', 'BBA', 'sc2023sa0006@dmiher.edu.in', '1st Year', 'bba'),
                ('MCA2023001', 'mca123', 'Vikram Joshi', 'MCA', 'sc2023sa0007@dmiher.edu.in', '2nd Year', 'mca'),
                ('MCA2023002', 'mca123', 'Anjali Desai', 'MCA', 'sc2023sa0008@dmiher.edu.in', '1st Year', 'mca'),
                ('MCA2023003', 'mca123', 'Rajesh Kumar', 'MCA', 'sc2023sa0009@dmiher.edu.in', '2nd Year', 'mca'),
                ('BSCAIDS2023001', 'aids123', 'Sneha Iyer', 'BSc AIDS', 'sc2023sa0010@dmiher.edu.in', '3rd Year', 'bsc_aids'),
                ('BSCAIDS2023002', 'aids123', 'Arun Mehta', 'BSc AIDS', 'sc2023sa0011@dmiher.edu.in', '2nd Year', 'bsc_aids'),
                ('BSCAIDS2023003', 'aids123', 'Pooja Nair', 'BSc AIDS', 'sc2023sa0012@dmiher.edu.in', '1st Year', 'bsc_aids')
            `);
            console.log('✅ Default students inserted with valid DMIHER email format');
        }

        connection.release();
        console.log('✅ Database tables initialized');
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        throw error;
    }
}

module.exports = { pool, testConnection, initializeDatabase };
