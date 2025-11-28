@echo off
echo ========================================
echo Push to GitHub - dmiher-complaints-web
echo ========================================
echo.

set /p GITHUB_USERNAME="Enter your GitHub username: "

echo.
echo Connecting to GitHub repository...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/%GITHUB_USERNAME%/dmiher-complaints-web.git

echo.
echo Setting branch to main...
"C:\Program Files\Git\bin\git.exe" branch -M main

echo.
echo ========================================
echo Ready to push!
echo ========================================
echo.
echo Repository: https://github.com/%GITHUB_USERNAME%/dmiher-complaints-web
echo.
echo Pushing to GitHub...
echo You may be asked to authenticate.
echo.

"C:\Program Files\Git\bin\git.exe" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS!
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo.
    echo View at: https://github.com/%GITHUB_USERNAME%/dmiher-complaints-web
    echo.
    echo Next: Deploy to Railway
    echo 1. Go to https://railway.app
    echo 2. New Project - Deploy from GitHub
    echo 3. Select dmiher-complaints-web
    echo 4. Add MySQL database
    echo 5. Your app will be live!
    echo.
) else (
    echo.
    echo Push failed. This might be because:
    echo 1. You need to authenticate with GitHub
    echo 2. The repository doesn't exist yet
    echo 3. You don't have permission
    echo.
    echo Make sure you created the repository on GitHub first:
    echo https://github.com/new
    echo.
)

pause
