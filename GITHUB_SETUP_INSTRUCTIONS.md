# GitHub Setup Instructions

## ✅ You Created: `dmiher-complaints-web` repository on GitHub

Great! Now let's connect your local project to GitHub.

## 🚨 Important: Git Not Recognized Issue

Git is installed but not recognized in your terminal. Here's how to fix it:

### Option 1: Restart Terminal (Quickest)

1. **Close PowerShell/Terminal completely**
2. **Open a NEW PowerShell/Terminal**
3. **Navigate back to your project:**
   ```bash
   cd "D:\SAS PROJECT\SAS PROJECT"
   ```
4. **Test Git:**
   ```bash
   git --version
   ```

### Option 2: Add Git to PATH (If restart doesn't work)

1. **Press Windows Key**
2. **Search for:** "Environment Variables"
3. **Click:** "Edit the system environment variables"
4. **Click:** "Environment Variables" button
5. **Under "System Variables", find "Path"**
6. **Click "Edit"**
7. **Click "New"**
8. **Add:** `C:\Program Files\Git\cmd`
9. **Click OK on all windows**
10. **Restart terminal**

### Option 3: Use the Batch Scripts (Easiest)

I've created helper scripts for you:

**Step 1:** Double-click `setup-git.bat`
- This will configure Git and initialize your repository
- Follow the prompts

**Step 2:** Double-click `push-to-github.bat`
- This will push your code to GitHub
- You may need to login to GitHub

## 📝 Manual Setup (If Git is Working)

Once Git is recognized, run these commands:

### 1. Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 2. Initialize Repository
```bash
git init
```

### 3. Add All Files
```bash
git add .
```

### 4. Create First Commit
```bash
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"
```

### 5. Connect to GitHub
**Replace YOUR_USERNAME with your actual GitHub username:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaints-web.git
```

### 6. Set Branch Name
```bash
git branch -M main
```

### 7. Push to GitHub
```bash
git push -u origin main
```

## 🔐 GitHub Authentication

When you push, GitHub will ask you to authenticate:

### Option A: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "DMIHER Portal"
4. Select scopes: `repo` (all)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use the token as your password

### Option B: GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in
3. File → Add Local Repository
4. Choose your project folder
5. Click "Publish repository"
6. Done!

## ✅ Verify Upload

After pushing, check your GitHub repository:

**URL:** `https://github.com/YOUR_USERNAME/dmiher-complaints-web`

You should see:
- ✅ All your code files
- ✅ README.md displayed
- ✅ Documentation files
- ❌ .env file (should NOT be visible - it's in .gitignore)
- ❌ node_modules folder (should NOT be visible)

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
   - (MySQL variables are auto-filled by Railway)
8. **Deploy!**

Your app will be live at: `your-app.railway.app`

## 🆘 Troubleshooting

### "Git is not recognized"
- **Solution:** Restart terminal or add to PATH (see above)

### "Permission denied"
- **Solution:** Use Personal Access Token or GitHub Desktop

### "Repository not found"
- **Solution:** Check the repository name is exactly `dmiher-complaints-web`
- **Solution:** Verify you're using the correct GitHub username

### "Failed to push"
- **Solution:** Make sure you created the repository on GitHub first
- **Solution:** Check your internet connection
- **Solution:** Try GitHub Desktop instead

### "Authentication failed"
- **Solution:** Use Personal Access Token instead of password
- **Solution:** Or use GitHub Desktop

## 📋 Quick Checklist

- [ ] Git is recognized in terminal (`git --version` works)
- [ ] Git is configured (name and email set)
- [ ] Repository initialized (`git init`)
- [ ] Files added (`git add .`)
- [ ] First commit created (`git commit`)
- [ ] Remote added (connected to GitHub)
- [ ] Code pushed (`git push`)
- [ ] Verified on GitHub website
- [ ] Ready to deploy to Railway!

## 🎯 Expected Result

After successful push, your GitHub repository will have:

```
dmiher-complaints-web/
├── database/
├── public/
├── .gitignore
├── COMMANDS.md
├── DATABASE_SETUP.md
├── DEPLOYMENT.md
├── GIT_SETUP.md
├── package.json
├── PROJECT_STATUS.md
├── QUICK_START.md
├── README.md
├── server.js
└── (other files)
```

**NOT included (in .gitignore):**
- .env
- node_modules/
- data/

## 📞 Need Help?

If you're stuck:

1. **Try the batch scripts:** `setup-git.bat` and `push-to-github.bat`
2. **Use GitHub Desktop:** Easiest option
3. **Check Git installation:** Make sure Git is in PATH
4. **Restart terminal:** Often fixes recognition issues

---

**Once your code is on GitHub, you're just 5 minutes away from a live app on Railway!** 🚀
