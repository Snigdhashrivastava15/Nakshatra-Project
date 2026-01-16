# Planet Nakshatra Backend Server

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the server directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/planet_nakshatra?schema=public"

# Server
PORT=3000
FRONTEND_URL=http://localhost:5173

# Google Calendar API
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_CALENDAR_ID=primary
```

### 3. Setup Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed
```

### 4. Google Calendar Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Get refresh token using OAuth 2.0 Playground
7. Add credentials to `.env` file

### 5. Run Server

**Development:**
```bash
npm run start:dev
```

**Production:**
```bash
# Build
npm run build

# Start with PM2
pm2 start ecosystem.config.js
# OR
npm run start:prod
```

## API Endpoints

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/bookings` - Create booking
- `GET /api/bookings/availability?date=YYYY-MM-DD&serviceId=uuid` - Get available time slots
- `POST /api/contact` - Submit contact inquiry

## Deployment

### Railway
1. Connect your repository
2. Add environment variables
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start:prod`

### Render
1. Create new Web Service
2. Connect repository
3. Add environment variables
4. Build: `npm install && npm run build`
5. Start: `npm run start:prod`
