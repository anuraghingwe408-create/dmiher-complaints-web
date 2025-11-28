# DMIHER Complaints Portal - Git Setup and Push Script
# Run this script in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DMIHER Complaints Portal - Git Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
$gitPath = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitPath) {
    Write-Host "[ERROR] Git is not found in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please choose an option:" -ForegroundColor Yellow
    Write-Host "1. Add Git to PATH manually" -ForegroundColor White
    Write-Host "   - Search 'Environment Variables' in Windows" -ForegroundColor Gray
    Write-Host "   - Edit 'Path' in System Variables" -ForegroundColor Gray
    Write-Host "   - Add: C:\Program Files\Git\cmd" -ForegroundColor Gray
    Write-Host "   - Restart PowerShell and run this script again" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Use GitHub Desktop (Easiest)" -ForegroundColor White
    Write-Host "   - Download from: https://desktop.github.com" -ForegroundColor Gray
    Write-Host "   - Install and sign in" -ForegroundColor Gray
    Write-Host "   - File -> Add Local Repository" -ForegroundColor Gray
    Write-Host "   - Choose this folder" -ForegroundColor Gray
    Write-Host "   - Click 'Publish repository'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Reinstall Git" -ForegroundColor White
    Write-Host "   - Download from: https://git-scm.com/download/win" -ForegroundColor Gray
    Write-Host "   - During installation, select 'Git from command line and 3rd-party software'" -ForegroundColor Gray
    Write-Host ""
    
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Git is installed!" -ForegroundColor Green
git --version
Write-Host ""

# Configure Git
Write-Host "Configuring Git..." -ForegroundColor Yellow
$userName = Read-Host "Enter your name"
$userEmail = Read-Host "Enter your email"

git config --global user.name "$userName"
git config --global user.email "$userEmail"

Write-Host "[OK] Git configured!" -ForegroundColor Green
Write-Host ""

# Initialize repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Repository initialized!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to initialize repository" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Files added!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to add files" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Create first commit
Write-Host "Creating first commit..." -ForegroundColor Yellow
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL and Email Validation"

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Commit created!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to create commit" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Add remote
Write-Host "Connecting to GitHub..." -ForegroundColor Yellow
$githubUsername = Read-Host "Enter your GitHub username"

git remote add origin "https://github.com/$githubUsername/dmiher-complaints-web.git"

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Remote added!" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Remote might already exist, continuing..." -ForegroundColor Yellow
}
Write-Host ""

# Set branch name
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "[OK] Branch set!" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready to push to GitHub!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository: https://github.com/$githubUsername/dmiher-complaints-web" -ForegroundColor White
Write-Host ""
$confirm = Read-Host "Push to GitHub now? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "You may be asked to authenticate with GitHub" -ForegroundColor Gray
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "SUCCESS!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your code is now on GitHub!" -ForegroundColor White
        Write-Host ""
        Write-Host "View your repository at:" -ForegroundColor Yellow
        Write-Host "https://github.com/$githubUsername/dmiher-complaints-web" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Go to https://railway.app" -ForegroundColor White
        Write-Host "2. Click 'New Project'" -ForegroundColor White
        Write-Host "3. Select 'Deploy from GitHub repo'" -ForegroundColor White
        Write-Host "4. Choose 'dmiher-complaints-web'" -ForegroundColor White
        Write-Host "5. Add MySQL database" -ForegroundColor White
        Write-Host "6. Your app will be live!" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "[ERROR] Push failed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "This might be because:" -ForegroundColor Yellow
        Write-Host "1. You need to authenticate with GitHub" -ForegroundColor White
        Write-Host "2. The repository doesn't exist on GitHub" -ForegroundColor White
        Write-Host "3. You don't have permission" -ForegroundColor White
        Write-Host ""
        Write-Host "Try using GitHub Desktop instead:" -ForegroundColor Yellow
        Write-Host "https://desktop.github.com" -ForegroundColor Cyan
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "Skipped push. You can push later with:" -ForegroundColor Yellow
    Write-Host "git push -u origin main" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Read-Host "Press Enter to exit"
