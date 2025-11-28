# Push to GitHub - Step by Step Guide

## 🎯 Goal
Push your code to GitHub repository: `dmiher-complaints-web`

## ⚠️ Current Issue
Git is not recognized in your terminal. Here are your options:

---

## 🚀 Option 1: Use GitHub Desktop (EASIEST - RECOMMENDED) ⭐⭐⭐

This is the easiest way and doesn't require terminal commands!

### Steps:

1. **Download GitHub Desktop**
   - Go to: https://desktop.github.com
   - Download and install

2. **Sign in to GitHub**
   - Open GitHub Desktop
   - Sign in with your GitHub account

3. **Add Your Project**
   - Click: `File` → `Add Local Repository`
   - Click: `Choose...`
   - Navigate to: `D:\SAS PROJECT\SAS PROJECT`
   - Click: `Select Folder`

4. **Initialize Repository**
   - If prompted "This directory does not appear to be a Git repository"
   - Click: `create a repository`
   - Repository name: `dmiher-complaints-web`
   - Click: `Create Repository`

5. **Publish to GitHub**
   - Click: `Publish repository` button (top right)
   - Repository name: `dmiher-complaints-web`
   - Description: "DMIHER Student Complaint Portal with MySQL"
   - Uncheck "Keep this code private" (or keep checked if you want it private)
   - Click: `Publish Repository`

6. **Done!**
   - Your code is now on GitHub!
   - View at: `https://github.com/YOUR_USERNAME/dmiher-complaints-web`

---

## 🔧 Option 2: Fix Git in Terminal

### Method A: Restart PowerShell

1. **Close PowerShell completely**
2. **Open NEW PowerShell as Administrator**
   - Right-click PowerShell
   - Select "Run as Administrator"
3. **Navigate to your project:**
   ```powershell
   cd "D:\SAS PROJECT\SAS PROJECT"
   ```
4. **Test Git:**
   ```powershell
   git --version
   ```
5. **If it works, run the PowerShell script:**
   ```powershell
   .\setup-and-push.ps1
   ```

### Method B: Add Git to PATH

1. **Press Windows Key**
2. **Search:** "Environment Variables"
3. **Click:** "Edit the system environment variables"
4. **Click:** "Environment Variables" button
5. **Under "System Variables", find "Path"**
6. **Click:** "Edit"
7. **Click:** "New"
8. **Add:** `C:\Program Files\Git\cmd`
9. **Click OK on all windows**
10. **Restart PowerShell**
11. **Run:** `git --version`

### Method C: Run PowerShell Script

If Git is working:

1. **Open PowerShell in your project folder**
2. **Run:**
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\setup-and-push.ps1
   ```
3. **Follow the prompts**

---

## 📝 Option 3: Manual Commands (If Git Works)

Once Git is recognized, run these commands one by one:

```bash
# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL and Email Validation"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaints-web.git

# Set branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🔐 GitHub Authentication

When pushing, you'll need to authenticate:

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token (classic)"
3. Name: "DMIHER Portal"
4. Select scope: `repo` (all)
5. Click: "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use token as password

### Option B: GitHub Desktop

GitHub Desktop handles authentication automatically!

---

## ✅ Verify Upload

After pushing, check your repository:

**URL:** `https://github.com/YOUR_USERNAME/dmiher-complaints-web`

You should see:
- ✅ All code files
- ✅ README.md displayed
- ✅ Documentation files
- ❌ .env file (should NOT be visible)
- ❌ node_modules (should NOT be visible)

---

## 🚀 After GitHub Upload

### Deploy to Railway:

1. **Go to:** https://railway.app
2. **Sign in** with GitHub
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Choose:** `dmiher-complaints-web`
6. **Click:** "Add MySQL" database
7. **Add environment variables:**
   - `FACULTY_PASSWORD` = your_secure_password
   - `NODE_ENV` = production
8. **Deploy!**

Your app will be live at: `your-app.railway.app`

---

## 🆘 Troubleshooting

### "Git is not recognized"
**Solution:** Use GitHub Desktop (Option 1) - No terminal needed!

### "Permission denied"
**Solution:** Use Personal Access Token or GitHub Desktop

### "Repository not found"
**Solution:** 
- Make sure you created the repository on GitHub first
- Go to: https://github.com/new
- Name: `dmiher-complaints-web`
- Create repository

### "Failed to push"
**Solution:** Use GitHub Desktop - It's much easier!

---

## 📊 Progress Checklist

- [ ] Git is working OR GitHub Desktop installed
- [ ] Repository initialized
- [ ] Files committed
- [ ] Connected to GitHub
- [ ] Code pushed to GitHub
- [ ] Verified on GitHub website
- [ ] Ready to deploy to Railway

---

## 💡 Recommended Path

**For Everyone:**
1. ⭐ Download GitHub Desktop
2. ⭐ Add your project folder
3. ⭐ Publish to GitHub
4. ⭐ Deploy to Railway
5. ⭐ Done!

**Total time: ~10 minutes**

---

## 🎉 Success Criteria

You'll know you're successful when:

1. ✅ You can see your code on GitHub
2. ✅ .env file is NOT visible on GitHub
3. ✅ README.md is displayed nicely
4. ✅ You can share the GitHub URL

---

## 📞 Need Help?

**Easiest Solution:** Just use GitHub Desktop!
- Download: https://desktop.github.com
- No terminal commands needed
- Visual interface
- Handles authentication automatically

---

**Your GitHub Repository URL will be:**
```
https://github.com/YOUR_USERNAME/dmiher-complaints-web
```

**Replace YOUR_USERNAME with your actual GitHub username!**
