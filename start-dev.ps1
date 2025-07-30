Write-Host "Starting LinkManager Development Server..." -ForegroundColor Green
Write-Host ""

Set-Location frontend

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev 