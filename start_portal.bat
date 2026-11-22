@echo off
TITLE Student Placement Preparation Portal
COLOR 0B
echo ================================================================
echo    STUDENT PLACEMENT PREPARATION PORTAL - LAUNCHER
echo ================================================================
echo.

set "PATH=C:\Users\ANUSHA\nodejs;%PATH%"

echo [1/3] Checking Node.js runtime environment...
node -v
npm -v
echo.

echo [2/3] Launching Express.js API Server on http://localhost:5000 ...
start "SPP-Backend-API" cmd /k "cd server && npm run dev"

echo [3/3] Launching React Vite Frontend on http://localhost:5173 ...
start "SPP-Frontend-Client" cmd /k "cd client && npm run dev"

echo.
echo ================================================================
echo    PORTAL SERVERS LAUNCHED!
echo.
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo    Student Login: anusha@placementprep.edu / Password@123
echo    Admin Login:   admin@placementprep.edu  / Admin@123
echo ================================================================
pause
