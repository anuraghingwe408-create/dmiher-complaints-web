@echo off
echo ========================================
echo DMIHER Complaint Portal - Git Commit
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install with default settings
    echo 3. Restart this terminal
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo Git is installed! Proceeding...
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Configure git if not configured
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    set /p username="Enter your name: "
    set /p email="Enter your email: "
    git config --global user.name "%username%"
    git config --global user.email "%email%"
    echo Git configured!
    echo.
)

REM Add all files
echo Adding all files...
git add .
echo.

REM Commit
echo Committing changes...
git commit -m "Migrated to MongoDB with strict email validation (scXXXXsaXXXXX@dmiher.edu.in)"
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ========================================
    echo SETUP GITHUB REMOTE
    echo ========================================
    echo.
    echo Please create a repository on GitHub first:
    echo 1. Go to https://github.com
    echo 2. Click "New repository"
    echo 3. Name it: dmiher-complaint-portal
    echo 4. Don't initialize with README
    echo 5. Click "Create repository"
    echo.
    set /p github_url="Enter your GitHub repository URL (e.g., https://github.com/username/dmiher-complaint-portal.git): "
    git remote add origin %github_url%
    git branch -M main
    echo.
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 0 (
    echo ========================================
    echo SUCCESS! Code pushed to GitHub!
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo Next steps:
    echo 1. View your repository on GitHub
    echo 2. Deploy to production (see DEPLOYMENT.md)
    echo.
) else (
    echo ========================================
    echo PUSH FAILED
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Authentication failed - Use Personal Access Token
    echo 2. Remote URL incorrect - Check GitHub repository URL
    echo 3. Network issues - Check internet connection
    echo.
    echo See COMMIT_AND_PUSH.md for troubleshooting
    echo.
)

pause
