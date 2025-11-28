@echo off
echo ========================================
echo Pushing to GitHub
echo ========================================
echo.

REM Check if Git is available
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not found in PATH
    echo Please run setup-git.bat first
    pause
    exit /b 1
)

echo Pushing your code to GitHub...
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Success!
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo.
    echo View your repository at:
    echo https://github.com/YOUR_USERNAME/dmiher-complaints-web
    echo.
    echo Next steps:
    echo 1. Go to https://railway.app
    echo 2. Click "New Project"
    echo 3. Select "Deploy from GitHub repo"
    echo 4. Choose "dmiher-complaints-web"
    echo 5. Add MySQL database
    echo 6. Your app will be live!
    echo.
) else (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo This might be because:
    echo 1. You need to authenticate with GitHub
    echo 2. The repository doesn't exist
    echo 3. You don't have permission
    echo.
    echo Try running this command manually:
    echo   git push -u origin main
    echo.
)

pause
