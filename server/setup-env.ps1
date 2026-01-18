# PowerShell script to create .env file for Planet Nakshatra backend

Write-Host "Creating .env file for Planet Nakshatra backend..." -ForegroundColor Green

$envContent = @"
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/planet_nakshatra?schema=public"

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional - can use Gmail)
# GMAIL_USER=your-email@gmail.com
# GMAIL_PASSWORD=your-app-password
# ADMIN_EMAIL=admin@planetnakshatra.com

# Google Calendar API (Optional)
# GOOGLE_CLIENT_ID=your_client_id
# GOOGLE_CLIENT_SECRET=your_client_secret
# GOOGLE_REFRESH_TOKEN=your_refresh_token
# GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
# GOOGLE_CALENDAR_ID=primary
# GOOGLE_MEET_ENABLED=false
"@

$envPath = Join-Path $PSScriptRoot ".env"

if (Test-Path $envPath) {
    Write-Host ".env file already exists. Backing up to .env.backup..." -ForegroundColor Yellow
    Copy-Item $envPath "$envPath.backup" -Force
}

$envContent | Out-File -FilePath $envPath -Encoding UTF8

Write-Host ".env file created successfully at: $envPath" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Please update DATABASE_URL with your actual PostgreSQL credentials:" -ForegroundColor Yellow
Write-Host "   Format: postgresql://username:password@localhost:5432/database_name?schema=public" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update DATABASE_URL in .env file with your PostgreSQL credentials" -ForegroundColor White
Write-Host "2. Run: npm run prisma:generate" -ForegroundColor White
Write-Host "3. Run: npm run prisma:migrate" -ForegroundColor White
Write-Host "4. Run: npm run prisma:seed" -ForegroundColor White
Write-Host "5. Run: npm run start:dev" -ForegroundColor White
