# Useful Commands

Quick reference for common commands.

## Development

### Start Server
```bash
npm start
```

### Install Dependencies
```bash
npm install
```

### Install New Package
```bash
npm install package-name
```

## Git Commands

### Initialize Repository
```bash
git init
```

### Check Status
```bash
git status
```

### Add Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your message"
```

### Push to GitHub
```bash
git push origin main
```

### Pull Latest Changes
```bash
git pull origin main
```

### View Commit History
```bash
git log
```

### Create New Branch
```bash
git checkout -b feature-name
```

### Switch Branch
```bash
git checkout main
```

## MongoDB Commands

### Connect to MongoDB (if using local)
```bash
mongosh "mongodb+srv://cluster1.axcxah4.mongodb.net/dmiher_complaints" --username anuraghingwe001
```

### View Collections
```javascript
show collections
```

### View Students
```javascript
db.students.find().pretty()
```

### View Complaints
```javascript
db.complaints.find().pretty()
```

### Count Documents
```javascript
db.students.countDocuments()
```

## Server Management

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :3000
```

### Kill Process on Port (Windows)
```bash
taskkill /F /PID <process_id>
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

## Testing

### Test API Endpoints (using curl)

#### Test Login
```bash
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"email\":\"sc2023sa00001@dmiher.edu.in\",\"password\":\"bca123\"}"
```

#### Test Registration
```bash
curl -X POST http://localhost:3000/api/student/register -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@dmiher.edu.in\",\"password\":\"test123\",\"phone\":\"1234567890\",\"course\":\"bca\"}"
```

#### Get All Complaints
```bash
curl http://localhost:3000/api/complaints
```

## Package Management

### Update All Packages
```bash
npm update
```

### Check for Outdated Packages
```bash
npm outdated
```

### Remove Package
```bash
npm uninstall package-name
```

### Clear npm Cache
```bash
npm cache clean --force
```

## Environment

### View Environment Variables (Windows)
```bash
echo %NODE_ENV%
```

### Set Environment Variable (Windows CMD)
```bash
set NODE_ENV=production
```

### Set Environment Variable (Windows PowerShell)
```bash
$env:NODE_ENV="production"
```

## Deployment

### Deploy to Heroku
```bash
git push heroku main
```

### View Heroku Logs
```bash
heroku logs --tail
```

### Restart Heroku App
```bash
heroku restart
```

## Troubleshooting

### Clear Node Modules and Reinstall
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Check for Syntax Errors
```bash
node --check server.js
```

### Run in Debug Mode
```bash
node --inspect server.js
```

## Quick Fixes

### Port Already in Use
```bash
# Find process
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /F /PID <PID>
```

### MongoDB Connection Issues
1. Check `.env` file for correct connection string
2. Verify MongoDB Atlas IP whitelist
3. Test connection string in MongoDB Compass

### Server Won't Start
1. Check for syntax errors: `node --check server.js`
2. Verify all dependencies: `npm install`
3. Check environment variables in `.env`
4. Review server logs for error messages
