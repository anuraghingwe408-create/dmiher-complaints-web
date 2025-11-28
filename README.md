# DMIHER Student Complaint Portal

A web-based complaint management system for DMIHER students and faculty with MySQL database integration.

## 🚀 Features

- **Student Portal**
  - Student login with course-specific credentials
  - Submit complaints with detailed descriptions
  - Track complaint status
  - View faculty responses

- **Faculty Portal**
  - Secure faculty login
  - View all student complaints
  - Respond to complaints
  - Update complaint status
  - Filter and search complaints

- **Database Integration**
  - MySQL database for persistent storage
  - Automatic table creation and initialization
  - Connection pooling for performance
  - Default student accounts pre-loaded

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sas-portal.git
cd sas-portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up MySQL Database

**Create database:**
```bash
mysql -u root -p
```

```sql
CREATE DATABASE dmiher_complaints;
EXIT;
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Edit `.env` with your MySQL credentials:
```env
PORT=3000
FACULTY_PASSWORD=admin123
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dmiher_complaints
```

### 5. Start the Server
```bash
npm start
```

The application will automatically:
- Create database tables
- Insert default student accounts
- Start the server on http://localhost:3000

## 🎯 Usage

### Student Portal
1. Navigate to http://localhost:3000
2. Select your course (BCA, BBA, MCA, BSc AIDS)
3. Login with default credentials:
   - **BCA Students**: BCA2023001 / bca123
   - **BBA Students**: BBA2023001 / bba123
   - **MCA Students**: MCA2023001 / mca123
   - **BSc AIDS Students**: BSCAIDS2023001 / aids123
4. Submit and track complaints

**Note**: Only students with official DMIHER email addresses (format: `scXXXXsaXXXX@dmiher.edu.in`) can register and login.

### Faculty Portal
1. Navigate to http://localhost:3000/faculty
2. Login with password: `admin123` (change in production!)
3. View, respond to, and manage complaints

## 📁 Project Structure

```
sas-portal/
├── database/
│   ├── db.js              # Database connection and initialization
│   └── schema.sql         # Database schema
├── public/
│   ├── index.html         # Student portal
│   ├── faculty.html       # Faculty portal
│   ├── script.js          # Frontend JavaScript
│   └── style.css          # Styles
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment template
├── .gitignore            # Git ignore rules
├── server.js             # Express server with MySQL
├── package.json          # Dependencies
├── DEPLOYMENT.md         # Deployment guide
├── DATABASE_SETUP.md     # Database setup guide
└── README.md             # This file
```

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Railway (Recommended - Free MySQL)
- Render
- Heroku with ClearDB
- AWS (EC2 + RDS)
- DigitalOcean
- VPS with MySQL

### Quick Deploy to Railway

1. Push to GitHub
2. Go to https://railway.app
3. Create new project from GitHub repo
4. Add MySQL database
5. Deploy automatically!

## 🗄️ Database Schema

### Students Table
- Student ID, Password, Name, Department
- Email, Phone, Year, Course
- Registration Date

### Complaints Table
- Complaint ID, Student Info
- Complaint Type, Subject, Description
- Status, Faculty Response
- Timestamps

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for complete schema.

## 🔒 Security

- Environment variables for sensitive data
- `.gitignore` configured to exclude `.env` and `node_modules`
- Password-protected faculty portal
- MySQL connection pooling
- Input validation on server side
- **Email validation**: Only official DMIHER emails allowed (format: `scXXXXsaXXXX@dmiher.edu.in`)

**⚠️ Important for Production:**
1. Change `FACULTY_PASSWORD` in `.env`
2. Use strong MySQL password
3. Enable HTTPS
4. Set `NODE_ENV=production`
5. Configure CORS for your domain

## 🛠️ Development

### Run in development mode
```bash
npm run dev
```

### Database Commands

**Backup database:**
```bash
mysqldump -u root -p dmiher_complaints > backup.sql
```

**Restore database:**
```bash
mysql -u root -p dmiher_complaints < backup.sql
```

**Reset database:**
```sql
DROP DATABASE dmiher_complaints;
CREATE DATABASE dmiher_complaints;
```
Then restart the server to recreate tables.

## 📝 API Endpoints

### Student Endpoints
- `POST /api/student/login` - Student authentication
- `POST /api/student/register` - Register new student
- `POST /api/complaints` - Submit complaint
- `GET /api/complaints` - Get all complaints

### Faculty Endpoints
- `POST /api/faculty/login` - Faculty authentication
- `PUT /api/complaints/:id` - Update complaint
- `DELETE /api/complaints/:id` - Delete complaint
- `GET /api/students` - Get all students

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if MySQL is running
# Windows:
services.msc  # Look for MySQL service

# Linux:
sudo systemctl status mysql
```

### Port Already in Use
Change `PORT` in `.env` to another port (e.g., 3001)

### Tables Not Created
Check server logs. The app auto-creates tables on first run.

### Git Not Recognized
Restart your terminal after installing Git, or add Git to PATH manually.

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Database setup and migration
- [.env.example](.env.example) - Environment variables template

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 DMIHER - Datta Meghe Institute of Higher Education & Research

## 👥 Default Test Accounts

### Students
| Course | Student ID | Password | Email |
|--------|-----------|----------|-------|
| BCA | BCA2023001 | bca123 | sc2023sa0001@dmiher.edu.in |
| BBA | BBA2023001 | bba123 | sc2023sa0004@dmiher.edu.in |
| MCA | MCA2023001 | mca123 | sc2023sa0007@dmiher.edu.in |
| BSc AIDS | BSCAIDS2023001 | aids123 | sc2023sa0010@dmiher.edu.in |

### Faculty
- Password: `admin123`

**⚠️ Change these in production!**

## 🆘 Support

For issues and questions:
1. Check the documentation files
2. Review server logs
3. Verify environment variables
4. Test database connection

## 🎓 About DMIHER

This portal is designed for Datta Meghe Institute of Higher Education & Research students and faculty to streamline the complaint management process.

---

Made with ❤️ for DMIHER Community
