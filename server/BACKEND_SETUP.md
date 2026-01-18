# Backend Setup & Configuration

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Variables
Create a `.env` file in the `server` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/planet_nakshatra?schema=public"

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Email Configuration (Choose one option)

# Option 1: SMTP Server
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@planetnakshatra.com
SMTP_FROM_NAME=Planet Nakshatra

# Option 2: Gmail Direct (simpler)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Admin Email (required for booking notifications)
ADMIN_EMAIL=admin@planetnakshatra.com

# Google Calendar API (Optional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_CALENDAR_ID=primary
GOOGLE_MEET_ENABLED=false
```

### 3. Database Setup
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

### 4. Start Server

**Development:**
```bash
npm run start:dev
```

**Production:**
```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Server and database health status

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service (admin)
- `PATCH /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get booking by ID
- `GET /api/bookings/availability?date=YYYY-MM-DD&serviceId=uuid` - Get available time slots

### Contact
- `POST /api/contact` - Submit contact inquiry
- `GET /api/contact` - Get all inquiries (admin)

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Change PORT in .env
PORT=3001
```

### Database Connection Failed
1. Verify PostgreSQL is running
2. Check DATABASE_URL format
3. Ensure database exists
4. Check firewall/network settings

### CORS Issues
The backend allows these origins by default:
- http://localhost:5173
- http://localhost:5174
- http://localhost:3000
- http://localhost:8080
- http://127.0.0.1:5173

Add custom origins in `server/src/main.ts` or via `FRONTEND_URL` env variable.

### Google Calendar Not Working
1. Verify all Google credentials in `.env`
2. Check refresh token is valid
3. Ensure Calendar API is enabled in Google Cloud Console
4. Set `GOOGLE_MEET_ENABLED=true` to enable Meet links

## 📝 Logging

The backend uses NestJS Logger:
- Error logs: Red in console
- Warning logs: Yellow in console
- Info logs: White in console
- All API requests are logged

## 🔒 Security

- Input validation via `class-validator`
- CORS protection
- SQL injection protection via Prisma
- Error messages sanitized in production

## 🐛 Error Handling

All endpoints have:
- Try-catch error handling
- Proper HTTP status codes
- Detailed error logging
- User-friendly error messages

## 📦 Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Build the application: `npm run build`
3. Start with: `npm run start:prod`
4. Use PM2 or similar for process management
5. Configure reverse proxy (nginx) for HTTPS

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🔍 Health Check

Check server health:
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "database": "connected",
  "uptime": 123.45
}
```
