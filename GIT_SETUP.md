# Git Setup Guide

Quick guide to set up Git and push your project to GitHub.

## Step 1: Initialize Git Repository

```bash
git init
```

## Step 2: Add All Files

```bash
git add .
```

## Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: DMIHER Complaint Portal with MongoDB"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository"
3. Name it: `dmiher-complaint-portal`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

## Step 5: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
git branch -M main
git push -u origin main
```

## Step 6: Verify

Go to your GitHub repository URL and verify all files are uploaded.

## Future Updates

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

## Important Notes

- `.env` file is NOT pushed to GitHub (it's in .gitignore)
- This protects your MongoDB credentials
- Always use environment variables for sensitive data

## Troubleshooting

### Git not recognized?
Install Git from: https://git-scm.com/download/win

### Authentication failed?
Use GitHub Personal Access Token instead of password:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with "repo" scope
3. Use token as password when pushing

### Already have a repository?
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/dmiher-complaint-portal.git
```

## Next Steps

After pushing to GitHub, you can:
1. Deploy to Render/Railway/Heroku (see DEPLOYMENT.md)
2. Set up GitHub Actions for CI/CD
3. Collaborate with team members
