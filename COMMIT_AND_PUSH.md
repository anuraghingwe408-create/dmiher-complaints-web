# Commit and Push to GitHub

## Option 1: Install Git First (Recommended)

### Step 1: Install Git
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Use default settings
4. Restart your terminal/IDE after installation

### Step 2: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize Repository (If Not Done)
```bash
git init
```

### Step 4: Add All Files
```bash
git add .
```

### Step 5: Commit Changes
```bash
git commit -m "Migrated to MongoDB with strict email validation (scXXXXsaXXXXX@dmiher.edu.in)"
```

### Step 6: Create GitHub Repository
1. Go to https://github.com
2. Click "New repository"
3. Name: `dmiher-complaint-portal`
4. Don't initialize with README
5. Click "Create repository"

### Step 7: Connect and Push
Replace `YOUR_USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git branch -M main
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easiest)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com
2. Install and sign in with GitHub account

### Step 2: Add Repository
1. Click "File" → "Add Local Repository"
2. Select your project folder: `D:\SAS PROJECT\SAS PROJECT`
3. Click "Create Repository" if prompted

### Step 3: Commit
1. Review changed files in left panel
2. Add commit message: "Migrated to MongoDB with strict email validation"
3. Click "Commit to main"

### Step 4: Publish
1. Click "Publish repository"
2. Name: `dmiher-complaint-portal`
3. Uncheck "Keep this code private" (or keep checked)
4. Click "Publish repository"

Done! ✅

---

## Option 3: Manual Upload to GitHub

### Step 1: Create Repository
1. Go to https://github.com
2. Click "New repository"
3. Name: `dmiher-complaint-portal`
4. Click "Create repository"

### Step 2: Upload Files
1. Click "uploading an existing file"
2. Drag and drop all project files (except `.env` and `node_modules`)
3. Add commit message
4. Click "Commit changes"

**Important**: Don't upload:
- `.env` file (contains your MongoDB credentials)
- `node_modules` folder (too large)

---

## What Will Be Committed

### New Features
- ✅ MongoDB Atlas integration
- ✅ Strict email validation (scXXXXsaXXXXX@dmiher.edu.in)
- ✅ Student registration system
- ✅ Unified login for students and faculty
- ✅ Complaint management system

### Files to Commit
- ✅ `server.js` - Main server with MongoDB
- ✅ `database/mongodb.js` - Database connection
- ✅ `public/` - All frontend files
- ✅ `package.json` - Dependencies
- ✅ `.gitignore` - Excludes .env and node_modules
- ✅ All documentation files

### Files NOT Committed (Protected)
- ❌ `.env` - Your MongoDB credentials (in .gitignore)
- ❌ `node_modules/` - Dependencies (in .gitignore)
- ❌ `.vscode/` - Editor settings (in .gitignore)

---

## Commit Message

Use this commit message:
```
Migrated to MongoDB with strict email validation

- Converted from MySQL to MongoDB Atlas
- Implemented strict email format: scXXXXsaXXXXX@dmiher.edu.in
- Added comprehensive email validation
- Updated all documentation
- Cleaned up old MySQL files
- Ready for production deployment
```

---

## After Pushing

### Verify Upload
1. Go to your GitHub repository
2. Check all files are there
3. Verify `.env` is NOT uploaded (security)

### Deploy to Production
After pushing, you can deploy to:
- **Render**: See DEPLOYMENT.md
- **Railway**: See DEPLOYMENT.md
- **Heroku**: See DEPLOYMENT.md

---

## Troubleshooting

### Git Not Found?
- Install Git from: https://git-scm.com/download/win
- Restart terminal after installation
- Or use GitHub Desktop instead

### Authentication Failed?
- Use Personal Access Token instead of password
- Generate at: GitHub Settings → Developer settings → Personal access tokens
- Use token as password when pushing

### Repository Already Exists?
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git push -u origin main
```

### Large Files Error?
- Make sure `node_modules` is in `.gitignore`
- Don't commit large files
- Use Git LFS for large files if needed

---

## Quick Commands Reference

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main

# View remote
git remote -v

# View commit history
git log --oneline
```

---

## Need Help?

1. **Git Installation**: https://git-scm.com
2. **GitHub Desktop**: https://desktop.github.com
3. **GitHub Docs**: https://docs.github.com
4. **Git Tutorial**: https://www.atlassian.com/git

---

## Summary

Choose the easiest option for you:
1. **Install Git** - Most flexible, command-line based
2. **GitHub Desktop** - Easiest, visual interface
3. **Manual Upload** - Quick, but less features

All options will get your code on GitHub! 🚀
