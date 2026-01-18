# Quick Setup Script for SQLite (No PostgreSQL Required)

Write-Host "Setting up SQLite database for quick testing..." -ForegroundColor Green

# Update .env file
$envContent = @"
# Database Configuration (SQLite for quick testing)
DATABASE_URL="file:./dev.db"

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
"@

$envPath = Join-Path $PSScriptRoot ".env"
$envContent | Out-File -FilePath $envPath -Encoding UTF8

Write-Host ".env file updated for SQLite" -ForegroundColor Green

# Update schema.prisma to use SQLite
$schemaPath = Join-Path $PSScriptRoot "prisma\schema.prisma"
$schemaContent = Get-Content $schemaPath -Raw

# Replace PostgreSQL with SQLite
$schemaContent = $schemaContent -replace 'provider = "postgresql"', 'provider = "sqlite"'

Set-Content -Path $schemaPath -Value $schemaContent -NoNewline

Write-Host "Schema updated to use SQLite" -ForegroundColor Green

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run prisma:generate" -ForegroundColor White
Write-Host "2. Run: npm run prisma:migrate" -ForegroundColor White
Write-Host "3. Run: npm run prisma:seed" -ForegroundColor White
Write-Host "4. Run: npm run start:dev" -ForegroundColor White
Write-Host ""
Write-Host "Database file will be created at: server\prisma\dev.db" -ForegroundColor Yellow
