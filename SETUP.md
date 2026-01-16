# Setup Guide - Local Development

This guide will help you set up the Planet Nakshatra application for local development.

## Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Step 2: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database:
```sql
CREATE DATABASE planet_nakshatra;
```

3. Update `server/.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/planet_nakshatra?schema=public"
```

### Option B: Cloud Database (Recommended)

1. Use [Supabase](https://supabase.com/) or [Railway](https://railway.app/)
2. Create a new PostgreSQL database
3. Copy the connection string to `server/.env`

## Step 3: Run Database Migrations

```bash
cd server
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

This will:
- Generate Prisma Client
- Create database tables
- Seed initial services

## Step 4: Google Calendar API Setup

### Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Calendar API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `Planet Nakshatra Local`
5. Authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback`
6. Save **Client ID** and **Client Secret**

### Get Refresh Token

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the gear icon (⚙️) → Check "Use your own OAuth credentials"
3. Enter your Client ID and Client Secret
4. In the left panel, find "Calendar API v3"
5. Select these scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
6. Click "Authorize APIs"
7. Sign in and grant permissions
8. Click "Exchange authorization code for tokens"
9. Copy the **Refresh Token**

## Step 5: Configure Environment Variables

### Backend (`server/.env`)

Create `server/.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/planet_nakshatra?schema=public"

# Server
PORT=3000
FRONTEND_URL=http://localhost:5173

# Google Calendar API
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
GOOGLE_CALENDAR_ID=primary
```

### Frontend (`.env` in root)

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:3000
```

## Step 6: Start Development Servers

### Terminal 1 - Backend

```bash
cd server
npm run start:dev
```

Backend will run on `http://localhost:3000`

### Terminal 2 - Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Step 7: Verify Setup

1. Open `http://localhost:5173`
2. Check that services load (should see 11 services)
3. Navigate to booking section
4. Try selecting a service, date, and time slot
5. Submit a test booking

## Troubleshooting

### Database Connection Failed

- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Check firewall/network settings

### Google Calendar Not Working

- Verify all credentials in `.env`
- Check refresh token is valid (not expired)
- Ensure Calendar API is enabled
- Try regenerating refresh token

### API Calls Failing

- Check backend is running on port 3000
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend
- Look at browser console for errors

### Services Not Loading

- Verify database migrations ran successfully
- Check `prisma:seed` completed
- Look at backend console for errors
- Try: `cd server && npm run prisma:seed`

## Next Steps

- Test the booking flow end-to-end
- Verify Google Calendar events are created
- Check availability sync works correctly
- Test contact form submission

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md).
