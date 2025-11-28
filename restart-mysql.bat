@echo off
echo ========================================
echo Restarting MySQL Server
echo ========================================
echo.

echo Stopping MySQL service...
net stop MySQL80 2>nul
if %ERRORLEVEL% EQU 0 (
    echo MySQL80 stopped successfully
) else (
    net stop MySQL 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo MySQL stopped successfully
    ) else (
        echo MySQL service not found or already stopped
    )
)

echo.
echo Starting MySQL service...
net start MySQL80 2>nul
if %ERRORLEVEL% EQU 0 (
    echo MySQL80 started successfully!
) else (
    net start MySQL 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo MySQL started successfully!
    ) else (
        echo.
        echo [ERROR] Could not start MySQL service
        echo.
        echo Please check:
        echo 1. Is MySQL installed?
        echo 2. Is XAMPP installed? (Start MySQL from XAMPP Control Panel)
        echo 3. Run this script as Administrator
        echo.
    )
)

echo.
echo ========================================
echo MySQL Restart Complete
echo ========================================
echo.
echo Next steps:
echo 1. Restart your Node.js server: npm start
echo 2. Check console for "MySQL Database connected"
echo 3. Try registration again
echo.
pause
