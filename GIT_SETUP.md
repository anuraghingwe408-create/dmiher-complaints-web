# Git Setup and Repository Connection Guide

## Step 1: Verify Git Installation

After installing Git, **restart your terminal/PowerShell** and verify:

```bash
git --version
```

If Git is still not recognized, add it to PATH manually:

### Windows PATH Setup
1. Search for "Environment Variables" in Windows
2. Click "Environment Variables"
3. Under "System Variables", find "Path"
4. Click "Edit"
5. Add: `C:\Program Files\Git\cmd`
6. Click OK and restart terminal

## Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Local Repository

In your project directory:

```bash
# Initialize git repository
git init

# Check status
git status

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"
```

## Step 4: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to https://github.com
2. Click "+" → "New repository"
3. Repository name: `dmiher-complaint-portal` (or your choice)
4. Description: "Student complaint management system with MySQL"
5. Choose "Public" or "Private"
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Option B: Using GitHub CLI (if installed)

```bash
gh repo create dmiher-complaint-portal --public --source=. --remote=origin
```

## Step 5: Connect Local Repository to GitHub

After creating the GitHub repository, you'll see commands like:

```bash
# Add remote repository
git remote add origin https://github.com/yourusername/dmiher-complaint-portal.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `yourusername` with your actual GitHub username!**

## Step 6: Verify Upload

1. Go to your GitHub repository URL
2. You should see all your files (except those in .gitignore)
3. `.env` file should NOT be visible (it's in .gitignore)

## Common Git Commands

### Daily Workflow

```bash
# Check what changed
git status

# Add specific file
git add filename.js

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### Branch Management

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
```

### Undo Changes

```bash
# Discard changes in file
git checkout -- filename.js

# Unstage file
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## Important Files Already Configured

### .gitignore
Already configured to exclude:
- `node_modules/` - Dependencies
- `.env` - Sensitive environment variables
- `data/` - Local data files
- `*.log` - Log files

### Files That WILL Be Uploaded
- ✅ Source code (server.js, database files)
- ✅ Public files (HTML, CSS, JS)
- ✅ Configuration templates (.env.example)
- ✅ Documentation (README.md, DEPLOYMENT.md)
- ✅ package.json

### Files That WON'T Be Uploaded
- ❌ .env (contains passwords)
- ❌ node_modules/ (too large, installed via npm)
- ❌ data/ (local database files)

## Deployment from GitHub

Once your code is on GitHub, you can deploy to:

### Railway
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add MySQL database
5. Set environment variables
6. Deploy!

### Render
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub repository
4. Configure build and start commands
5. Add environment variables
6. Deploy!

### Heroku
```bash
heroku login
heroku create your-app-name
heroku addons:create cleardb:ignite
git push heroku main
```

## Troubleshooting

### Git Not Recognized After Installation
- **Solution**: Restart terminal/PowerShell
- If still not working, add Git to PATH manually (see above)

### Permission Denied (publickey)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub
# Copy the public key
cat ~/.ssh/id_ed25519.pub

# Go to GitHub → Settings → SSH Keys → Add
```

Or use HTTPS instead:
```bash
git remote set-url origin https://github.com/yourusername/repo.git
```

### Large Files Error
If you accidentally added large files:
```bash
# Remove from git but keep locally
git rm --cached filename

# Add to .gitignore
echo "filename" >> .gitignore

# Commit
git commit -m "Remove large file"
```

### Merge Conflicts
```bash
# Pull latest changes
git pull

# Fix conflicts in files (look for <<<<<<, ======, >>>>>>)
# Edit files to resolve conflicts

# Add resolved files
git add .

# Commit
git commit -m "Resolve merge conflicts"

# Push
git push
```

## Best Practices

1. **Commit Often**: Small, frequent commits are better
2. **Write Clear Messages**: Describe what changed and why
3. **Pull Before Push**: Always pull latest changes first
4. **Use Branches**: Create branches for new features
5. **Review Changes**: Use `git diff` before committing
6. **Never Commit Secrets**: Keep .env out of git
7. **Test Before Push**: Make sure code works locally

## Quick Reference

```bash
# Setup (one time)
git init
git add .
git commit -m "Initial commit"
git remote add origin <github-url>
git push -u origin main

# Daily workflow
git pull                    # Get latest changes
git add .                   # Stage changes
git commit -m "message"     # Commit changes
git push                    # Upload to GitHub

# Check status
git status                  # See what changed
git log                     # View commit history
git diff                    # See changes

# Branches
git checkout -b new-branch  # Create and switch
git checkout main           # Switch to main
git merge new-branch        # Merge branch
```

## Next Steps

After pushing to GitHub:

1. ✅ Verify all files are uploaded
2. ✅ Check that .env is NOT visible
3. ✅ Update README with your GitHub URL
4. ✅ Deploy to Railway or Render
5. ✅ Share repository link with team

## GitHub Repository URL

After setup, your repository will be at:
```
https://github.com/yourusername/dmiher-complaint-portal
```

Share this URL for:
- Collaboration
- Deployment
- Documentation
- Portfolio

---

Need help? Check:
- Git documentation: https://git-scm.com/doc
- GitHub guides: https://guides.github.com
- Git cheat sheet: https://education.github.com/git-cheat-sheet-education.pdf
