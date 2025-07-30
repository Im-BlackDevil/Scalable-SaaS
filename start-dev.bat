@echo off
echo Starting LinkManager Development Server...
echo.
cd frontend
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
call npm run dev
pause 