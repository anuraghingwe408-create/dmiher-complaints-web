@echo off
echo ========================================
echo Git Setup for DMIHER Complaints Portal
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not found in PATH
    echo.
    echo Please do ONE of the following:
    echo.
    echo Option 1: Add Git to PATH manually
    echo   1. Search "Environment Variables" in Windows
    echo   2. Edit "Path" in System Variables
    echo   3. Add: C:\Program Files\Git\cmd
    echo   4. Click OK and restart this script
    echo.
    echo Option 2: Reinstall Git
    echo   1. Download from: https://git-scm.com/download/win
    echo   2. During installation, select "Git from the command line and also from 3rd-party software"
    echo   3. Restart this script after installation
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed!
git --version
echo.

REM Configure Git
echo Configuring Git...
echo.
set /p USERNAME="Enter your name: "
set /p EMAIL="Enter your email: "

git config --global user.name "%USERNAME%"
git config --global user.email "%EMAIL%"

echo.
echo [OK] Git configured!
echo.

REM Initialize repository
echo Initializing Git repository...
git init
echo.

REM Add all files
echo Adding files to Git...
git add .
echo.

REM Create first commit
echo Creating first commit...
git commit -m "Initial commit: DMIHER Complaint Portal with MySQL"
echo.

REM Add remote
echo.
echo Now, let's connect to your GitHub repository.
echo.
set /p GITHUB_USERNAME="Enter your GitHub username: "

git remote add origin https://github.com/%GITHUB_USERNAME%/dmiher-complaints-web.git
echo.

REM Set branch name
git branch -M main
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your repository is ready to push to GitHub.
echo.
echo To push your code, run:
echo   git push -u origin main
echo.
echo Or run: push-to-github.bat
echo.
pause
