# DMIHER Complaint Portal

A comprehensive complaint management system for DMIHER (Datta Meghe Institute of Higher Education & Research) students and faculty.

## Features

- **Unified Login System**: Single login page for both students and faculty
- **Student Portal**: Submit and track complaints
- **Faculty Portal**: Review and respond to student complaints
- **Email Validation**: Accepts any @dmiher.edu.in email address
- **MongoDB Database**: Cloud-based database using MongoDB Atlas
- **Real-time Updates**: Instant complaint status updates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: Email-based authentication

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (free tier available)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd "SAS PROJECT"
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to:
   - Student/Faculty Login: http://localhost:3000
   - Faculty Portal: http://localhost:3000/faculty

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Faculty Authentication
FACULTY_PASSWORD=admin123

# Application Settings
NODE_ENV=development

# MongoDB Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmiher_complaints?retryWrites=true&w=majority
```

## Default Accounts

### Faculty Account
- Email: sc2024sa99999@dmiher.edu.in
- Password: admin123

### Student Accounts (Sample)
- **BCA Students**: 
  - ID: BCA2023001, Password: bca123
  - Email: sc2023sa00001@dmiher.edu.in
  
- **BBA Students**: 
  - ID: BBA2023001, Password: bba123
  - Email: sc2023sa00004@dmiher.edu.in
  
- **MCA Students**: 
  - ID: MCA2023001, Password: mca123
  - Email: sc2023sa00007@dmiher.edu.in
  
- **BSc AIDS Students**: 
  - ID: BSCAIDS2023001, Password: aids123
  - Email: sc2023sa00010@dmiher.edu.in

## API Endpoints

### Authentication
- `POST /api/login` - Unified login for students and faculty
- `POST /api/student/register` - Register new student

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Submit new complaint
- `PUT /api/complaints/:id` - Update complaint (faculty response)
- `DELETE /api/complaints/:id` - Delete complaint

### Students
- `GET /api/students` - Get all students (admin only)

## Project Structure

```
SAS PROJECT/
├── database/
│   └── mongodb.js          # MongoDB connection and schemas
├── public/
│   ├── login.html          # Unified login page
│   ├── student.html        # Student portal
│   └── faculty.html        # Faculty portal
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment template
└── README.md               # This file
```

## Email Format

The system **ONLY** accepts emails in this specific format:

**Format**: `scXXXXsaXXXXX@dmiher.edu.in`

Where:
- `sc` = Fixed prefix
- `XXXX` = 4 digits (year)
- `sa` = Fixed separator
- `XXXXX` = 5 digits (student ID)

**Valid Examples**:
- ✅ sc2024sa00087@dmiher.edu.in
- ✅ sc2023sa00001@dmiher.edu.in
- ✅ sc2024sa99999@dmiher.edu.in

**Invalid Examples**:
- ❌ student@dmiher.edu.in
- ❌ faculty@dmiher.edu.in
- ❌ sc2024@dmiher.edu.in

See `EMAIL_FORMAT.md` for complete details.

## Deployment

### Deploy to Render/Railway/Heroku

1. Create an account on your preferred platform
2. Connect your GitHub repository
3. Set environment variables in the platform dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `FACULTY_PASSWORD` - Faculty login password
- `NODE_ENV` - Set to "production"

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your administrator or create an issue in the repository.

## Acknowledgments

- DMIHER (Datta Meghe Institute of Higher Education & Research)
- All contributors and testers
