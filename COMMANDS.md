# Command Reference Card

## 🚀 Quick Commands

### First Time Setup (Do Once)

```bash
# 1. Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Initialize Repository
git init
git add .
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"

# 3. Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git branch -M main
git push -u origin main
```

### Daily Development

```bash
# Start the server
npm start

# Check what changed
git status

# Save changes
git add .
git commit -m "Description of what you changed"
git push
```

### Database Commands

```bash
# Start MySQL
# Windows: Check Services (services.msc)
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql

# Access MySQL
mysql -u root -p

# Backup database
mysqldump -u root -p dmiher_complaints > backup.sql

# Restore database
mysql -u root -p dmiher_complaints < backup.sql
```

## 📋 Copy-Paste Commands

### Setup Git Repository

```bash
git init
git add .
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"
```

### Connect to GitHub
**⚠️ Replace YOUR_USERNAME with your actual GitHub username!**

```bash
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git branch -M main
git push -u origin main
```

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
npm start
```

### Check Git Status

```bash
git status
```

### Save and Push Changes

```bash
git add .
git commit -m "Your message here"
git push
```

## 🔧 Troubleshooting Commands

### Check Git Version

```bash
git --version
```

### Check Node Version

```bash
node --version
npm --version
```

### Check MySQL Status

```bash
# Windows
services.msc
# Look for MySQL service

# Mac
brew services list

# Linux
sudo systemctl status mysql
```

### Fix Git Not Recognized (Windows)

```bash
# Check where Git is installed
where git

# If not found, add to PATH:
# C:\Program Files\Git\cmd
```

### Reset Git Remote

```bash
git remote -v
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo.git
```

### View Logs

```bash
# View commit history
git log

# View recent commits
git log --oneline -5

# View file changes
git diff
```

## 🌐 URLs

### Local Development
- Student Portal: http://localhost:3000
- Faculty Portal: http://localhost:3000/faculty

### GitHub
- Create Repo: https://github.com/new
- Your Repos: https://github.com/YOUR_USERNAME?tab=repositories

### Deployment Platforms
- Railway: https://railway.app
- Render: https://render.com
- Heroku: https://heroku.com

## 🔑 Default Credentials

### Students
- BCA: BCA2023001 / bca123
- BBA: BBA2023001 / bba123
- MCA: MCA2023001 / mca123
- BSc AIDS: BSCAIDS2023001 / aids123

### Faculty
- Password: admin123

**⚠️ Change these in production!**

## 📦 NPM Commands

```bash
# Install dependencies
npm install

# Start server
npm start

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update

# List installed packages
npm list --depth=0
```

## 🗄️ MySQL Commands

```sql
-- Show databases
SHOW DATABASES;

-- Use database
USE dmiher_complaints;

-- Show tables
SHOW TABLES;

-- View students
SELECT * FROM students;

-- View complaints
SELECT * FROM complaints;

-- Count records
SELECT COUNT(*) FROM complaints;

-- Delete all complaints (careful!)
DELETE FROM complaints;

-- Drop database (careful!)
DROP DATABASE dmiher_complaints;

-- Create database
CREATE DATABASE dmiher_complaints;
```

## 🔄 Git Workflow

```bash
# 1. Check status
git status

# 2. Pull latest changes
git pull

# 3. Make your changes in code editor

# 4. Check what changed
git status
git diff

# 5. Stage changes
git add .

# 6. Commit changes
git commit -m "Description of changes"

# 7. Push to GitHub
git push
```

## 🌿 Branch Commands

```bash
# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# List branches
git branch

# Merge branch
git checkout main
git merge feature-name

# Delete branch
git branch -d feature-name

# Push branch to GitHub
git push -u origin feature-name
```

## 🚨 Emergency Commands

### Undo Last Commit (Keep Changes)

```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Discard Changes)

```bash
git reset --hard HEAD~1
```

### Discard All Local Changes

```bash
git reset --hard HEAD
```

### Remove File from Git (Keep Locally)

```bash
git rm --cached filename
```

### Fix Merge Conflicts

```bash
git pull
# Fix conflicts in files
git add .
git commit -m "Resolve merge conflicts"
git push
```

## 📱 Railway Deployment

```bash
# 1. Push to GitHub first
git push

# 2. Go to Railway
# https://railway.app

# 3. New Project → Deploy from GitHub

# 4. Select your repository

# 5. Add MySQL database

# 6. Done! Your app is live
```

## 🎯 Quick Test

```bash
# 1. Start server
npm start

# 2. Open browser
# http://localhost:3000

# 3. Login as student
# ID: BCA2023001
# Password: bca123

# 4. Submit test complaint

# 5. Open faculty portal
# http://localhost:3000/faculty
# Password: admin123

# 6. View and respond to complaint
```

## 📝 Notes

- Always `git pull` before making changes
- Commit often with clear messages
- Test locally before pushing
- Never commit .env file
- Backup database regularly

---

**Need more help?**
- Git: See GIT_SETUP.md
- Database: See DATABASE_SETUP.md
- Deployment: See DEPLOYMENT.md
