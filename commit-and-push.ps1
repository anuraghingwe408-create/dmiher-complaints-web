# DMIHER Complaint Portal - Git Commit and Push Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DMIHER Complaint Portal - Git Commit" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win"
    Write-Host "2. Install with default settings"
    Write-Host "3. Restart PowerShell"
    Write-Host "4. Run this script again"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# Configure git if not configured
$userName = git config user.name 2>$null
if (-not $userName) {
    Write-Host "Git configuration needed..." -ForegroundColor Yellow
    $name = Read-Host "Enter your name"
    $email = Read-Host "Enter your email"
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✅ Git configured!" -ForegroundColor Green
    Write-Host ""
}

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "Committing changes..." -ForegroundColor Yellow
$commitMessage = "Migrated to MongoDB with strict email validation (scXXXXsaXXXXX@dmiher.edu.in)"
git commit -m "$commitMessage"
Write-Host "✅ Changes committed" -ForegroundColor Green
Write-Host ""

# Check if remote exists
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "SETUP GITHUB REMOTE" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please create a repository on GitHub first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com"
    Write-Host "2. Click 'New repository'"
    Write-Host "3. Name it: dmiher-complaint-portal"
    Write-Host "4. Don't initialize with README"
    Write-Host "5. Click 'Create repository'"
    Write-Host ""
    $githubUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/dmiher-complaint-portal.git)"
    git remote add origin $githubUrl
    git branch -M main
    Write-Host "✅ Remote configured" -ForegroundColor Green
    Write-Host ""
}

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin main
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Your code is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. View your repository on GitHub"
    Write-Host "2. Deploy to production (see DEPLOYMENT.md)"
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "PUSH FAILED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "1. Authentication failed - Use Personal Access Token"
    Write-Host "2. Remote URL incorrect - Check GitHub repository URL"
    Write-Host "3. Network issues - Check internet connection"
    Write-Host ""
    Write-Host "See COMMIT_AND_PUSH.md for troubleshooting" -ForegroundColor Yellow
    Write-Host ""
}

Read-Host "Press Enter to exit"
