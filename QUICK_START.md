# Quick Start Guide

## ✅ What You Have Now

Your project is ready with:
- ✅ MySQL database integration
- ✅ Environment configuration (.env)
- ✅ Git ignore rules (.gitignore)
- ✅ Complete documentation
- ✅ Deployment guides

## 🚀 Next Steps

### Step 1: Restart Your Terminal
After installing Git, **close and reopen** PowerShell/Terminal.

### Step 2: Verify Git Installation
```bash
git --version
```

Should show: `git version 2.x.x`

### Step 3: Configure Git (First Time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Initialize Git Repository
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"
```

### Step 5: Create GitHub Repository

**Option A: GitHub Website**
1. Go to https://github.com/new
2. Repository name: `dmiher-complaint-portal`
3. Make it Public or Private
4. **Don't** check "Initialize with README"
5. Click "Create repository"

**Option B: GitHub Desktop**
1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose your project folder
4. Publish to GitHub

### Step 6: Connect to GitHub

Copy the commands from GitHub (after creating repo):
```bash
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git branch -M main
git push -u origin main
```

**Replace YOUR_USERNAME with your actual GitHub username!**

### Step 7: Deploy to Railway (Recommended)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Click "Add MySQL" database
7. Your app will deploy automatically!

Railway will:
- ✅ Install dependencies
- ✅ Create MySQL database
- ✅ Set up environment variables
- ✅ Deploy your app
- ✅ Give you a live URL

## 📋 Checklist

Before deploying, make sure:

- [ ] Git is installed and recognized
- [ ] Repository is on GitHub
- [ ] .env file is NOT in GitHub (check .gitignore)
- [ ] README.md is updated with your repo URL
- [ ] MySQL credentials are in .env
- [ ] All files are committed

## 🎯 Testing Locally First

Before deploying, test locally:

```bash
# Install dependencies
npm install

# Start MySQL (if not running)
# Windows: Check Services
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql

# Start the server
npm start
```

Visit:
- Student Portal: http://localhost:3000
- Faculty Portal: http://localhost:3000/faculty

Test with default accounts:
- Student: BCA2023001 / bca123
- Faculty: admin123

## 🔧 If Git Still Not Working

### Windows
1. Open "Environment Variables"
2. Edit "Path" in System Variables
3. Add: `C:\Program Files\Git\cmd`
4. Restart terminal

### Verify Installation
```bash
where git
```

Should show: `C:\Program Files\Git\cmd\git.exe`

## 📱 After Deployment

Once deployed on Railway:

1. Get your app URL (e.g., `your-app.railway.app`)
2. Test student login
3. Test faculty portal
4. Submit a test complaint
5. Verify database is working

## 🆘 Common Issues

### "git not recognized"
- **Solution**: Restart terminal after Git installation

### "Permission denied"
- **Solution**: Use HTTPS URL instead of SSH

### "Port already in use"
- **Solution**: Change PORT in .env

### "Database connection failed"
- **Solution**: Check MySQL is running and credentials are correct

## 📚 Documentation Files

- `README.md` - Project overview
- `DEPLOYMENT.md` - Detailed deployment guide
- `DATABASE_SETUP.md` - MySQL setup instructions
- `GIT_SETUP.md` - Complete Git guide
- `QUICK_START.md` - This file

## 🎉 You're Ready!

Your project is fully configured and ready to deploy. Follow the steps above and you'll have a live application in minutes!

---

**Need Help?**
- Check GIT_SETUP.md for detailed Git instructions
- Check DEPLOYMENT.md for deployment options
- Check DATABASE_SETUP.md for MySQL help
