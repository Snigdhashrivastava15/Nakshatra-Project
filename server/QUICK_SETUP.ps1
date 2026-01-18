# Quick Database Setup Script for Planet Nakshatra Backend
# Run this script to set up SQLite database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Planet Nakshatra - Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    $envContent = @"
# Database Configuration (SQLite for quick testing)
DATABASE_URL="file:./prisma/dev.db"

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
"@
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ .env file created" -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "⚠️  IMPORTANT: Make sure the backend server is STOPPED (Ctrl+C)" -ForegroundColor Yellow
Write-Host "Press any key to continue after stopping the server..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Step 1: Generating Prisma Client..." -ForegroundColor Cyan
npm run prisma:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Prisma client generated" -ForegroundColor Green

Write-Host ""
Write-Host "Step 2: Creating database and running migrations..." -ForegroundColor Cyan
npm run prisma:migrate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database created and migrated" -ForegroundColor Green

Write-Host ""
Write-Host "Step 3: Seeding database with services..." -ForegroundColor Cyan
npm run prisma:seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Database seeded with services" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step: Start the backend server:" -ForegroundColor Yellow
Write-Host "  npm run start:dev" -ForegroundColor White
Write-Host ""
