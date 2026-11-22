@echo off
TITLE Push to GitHub - Student Placement Preparation Portal
COLOR 0A
echo ====================================================================
echo    PUSHING TO GITHUB: Student Placement Preparation Portal
echo    Repository: https://github.com/kanusha097/Student-Placement-Preparation-Portal.git
echo ====================================================================
echo.

set "PATH=C:\Users\ANUSHA\mingit\cmd;%PATH%"

echo [1/2] Verifying Git status and branch...
git status
echo.

echo [2/2] Pushing to GitHub (origin main)...
git push -u origin main

echo.
echo ====================================================================
echo If a GitHub login window opened:
echo   - Click "Sign in with your browser" to approve access.
echo If asked for credentials in the terminal:
echo   - Username: kanusha097
echo   - Password: Your GitHub Personal Access Token (PAT)
echo ====================================================================
echo.
pause
