@echo off
TITLE Deploy to Vercel - Student Placement Preparation Portal
COLOR 0B
echo ====================================================================
echo    DEPLOYING TO VERCEL: Student Placement Preparation Portal
echo ====================================================================
echo.

set "PATH=C:\Users\ANUSHA\nodejs;C:\Users\ANUSHA\mingit\cmd;%PATH%"

echo Deploying multi-service project to Vercel production...
echo.
call npx vercel --prod

echo.
pause
