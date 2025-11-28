# MySQL Database Setup Guide

## Local Development Setup

### 1. Install MySQL

**Windows:**
- Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- Run installer and select "MySQL Server"
- Set root password during installation

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Create Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE dmiher_complaints;
USE dmiher_complaints;
SOURCE database/schema.sql;
```

**Option B: Automatic Setup (Recommended)**
The application will automatically create tables and insert default data when you start the server for the first time.

### 3. Configure Environment Variables

Update your `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dmiher_complaints
```

### 4. Test Connection

```bash
npm start
```

You should see:
```
✅ MySQL Database connected successfully
✅ Database tables initialized
🚀 DMIHER Complaint Portal Server Started!
```

## Production Deployment

### Option 1: Railway (Recommended - Free MySQL)

1. **Create Railway Account**: https://railway.app

2. **Add MySQL Database**:
   - Click "New Project"
   - Select "Provision MySQL"
   - Railway will provide connection details

3. **Deploy Application**:
   - Connect your GitHub repository
   - Add environment variables:
     ```
     DB_HOST=<from Railway MySQL>
     DB_USER=<from Railway MySQL>
     DB_PASSWORD=<from Railway MySQL>
     DB_NAME=railway
     FACULTY_PASSWORD=your_secure_password
     NODE_ENV=production
     ```

4. **Deploy**: Railway will automatically deploy your app

### Option 2: Heroku with ClearDB

1. **Create Heroku App**:
```bash
heroku create your-app-name
```

2. **Add ClearDB MySQL**:
```bash
heroku addons:create cleardb:ignite
```

3. **Get Database URL**:
```bash
heroku config:get CLEARDB_DATABASE_URL
```

4. **Parse and Set Variables**:
```bash
# URL format: mysql://user:password@host/database
heroku config:set DB_HOST=your-host
heroku config:set DB_USER=your-user
heroku config:set DB_PASSWORD=your-password
heroku config:set DB_NAME=your-database
heroku config:set FACULTY_PASSWORD=your_secure_password
heroku config:set NODE_ENV=production
```

5. **Deploy**:
```bash
git push heroku main
```

### Option 3: Render with MySQL

1. **Create Render Account**: https://render.com

2. **Create MySQL Database**:
   - Go to Dashboard → New → MySQL
   - Note the connection details

3. **Create Web Service**:
   - Connect your GitHub repository
   - Add environment variables from MySQL connection

4. **Deploy**: Render will build and deploy automatically

### Option 4: AWS (EC2 + RDS)

1. **Create RDS MySQL Instance**:
   - Go to AWS RDS Console
   - Create MySQL database
   - Note endpoint, username, password

2. **Create EC2 Instance**:
   - Launch Ubuntu instance
   - Install Node.js and Git

3. **Deploy Application**:
```bash
git clone your-repo-url
cd your-repo
npm install --production

# Create .env file
nano .env
# Add your RDS connection details

# Use PM2 for process management
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

### Option 5: DigitalOcean (Droplet + Managed MySQL)

1. **Create Managed MySQL Database**:
   - Go to Databases → Create
   - Select MySQL
   - Note connection details

2. **Create Droplet**:
   - Ubuntu 22.04
   - Install Node.js

3. **Deploy**:
```bash
git clone your-repo-url
cd your-repo
npm install --production

# Configure environment
nano .env
# Add MySQL connection details

# Start with PM2
npm install -g pm2
pm2 start server.js --name complaint-portal
pm2 startup
pm2 save
```

## Database Migration from JSON

If you have existing JSON data, create a migration script:

```javascript
// migrate.js
const fs = require('fs');
const { pool } = require('./database/db');

async function migrate() {
    // Read JSON files
    const complaints = JSON.parse(fs.readFileSync('./data/complaints.json'));
    const students = JSON.parse(fs.readFileSync('./data/students.json'));
    
    // Migrate students
    for (const course in students) {
        for (const student of students[course]) {
            await pool.query(
                'INSERT INTO students (id, password, name, dept, email, phone, year, course) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [student.id, student.password, student.name, student.dept, student.email, student.phone, student.year, course]
            );
        }
    }
    
    // Migrate complaints
    for (const complaint of complaints) {
        await pool.query(
            'INSERT INTO complaints (id, student_id, student_name, student_email, department, year, complaint_type, subject, description, status, faculty_response, created_at, responded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [complaint.id, complaint.studentId, complaint.studentName, complaint.studentEmail, complaint.department, complaint.year, complaint.complaintType, complaint.subject, complaint.description, complaint.status, complaint.facultyResponse, complaint.createdAt, complaint.respondedAt]
        );
    }
    
    console.log('Migration completed!');
    process.exit(0);
}

migrate();
```

Run: `node migrate.js`

## Troubleshooting

### Connection Refused
- Check if MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `.env`
- Check firewall settings

### Access Denied
- Verify username and password
- Grant privileges: `GRANT ALL PRIVILEGES ON dmiher_complaints.* TO 'user'@'localhost';`

### Table Already Exists
- Drop and recreate: `DROP DATABASE dmiher_complaints; CREATE DATABASE dmiher_complaints;`

### Port Already in Use
- Change MySQL port in `.env`: `DB_PORT=3307`

## Backup and Restore

### Backup
```bash
mysqldump -u root -p dmiher_complaints > backup.sql
```

### Restore
```bash
mysql -u root -p dmiher_complaints < backup.sql
```

## Security Best Practices

1. **Never commit `.env` file** - Already in `.gitignore`
2. **Use strong passwords** for production
3. **Enable SSL** for database connections in production
4. **Regular backups** - Set up automated backups
5. **Limit database user privileges** - Create separate user for app
6. **Use connection pooling** - Already implemented

## Free MySQL Hosting Options

1. **Railway** - 500MB free (Recommended)
2. **PlanetScale** - 5GB free
3. **Aiven** - 1GB free trial
4. **FreeSQLDatabase** - 5MB free
5. **db4free.net** - Free MySQL hosting (for testing only)

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| DB_HOST | MySQL server host | localhost or mysql.railway.app |
| DB_USER | Database username | root or railway |
| DB_PASSWORD | Database password | your_password |
| DB_NAME | Database name | dmiher_complaints |
| DB_PORT | MySQL port (optional) | 3306 |
