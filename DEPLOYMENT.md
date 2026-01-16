# Deployment Guide - Planet Nakshatra

This guide will help you deploy both the frontend and backend of the Planet Nakshatra application.

## Prerequisites

1. PostgreSQL database (can use Railway, Supabase, or any PostgreSQL provider)
2. Google Cloud Console account with Calendar API enabled
3. GitHub account for version control
4. Vercel account (for frontend)
5. Railway or Render account (for backend)

---

## Step 1: Database Setup

### Option A: Railway PostgreSQL
1. Go to [Railway](https://railway.app/)
2. Create new project → Add PostgreSQL
3. Copy the `DATABASE_URL` from the database service

### Option B: Supabase
1. Go to [Supabase](https://supabase.com/)
2. Create new project
3. Get connection string from Settings → Database

---

## Step 2: Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Calendar API**:
   - APIs & Services → Enable APIs and Services
   - Search for "Google Calendar API" → Enable
4. Create OAuth 2.0 credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
   - Save **Client ID** and **Client Secret**
5. Get Refresh Token:
   - Use [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
   - Select "Google Calendar API v3" scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Authorize and exchange for refresh token

---

## Step 3: Backend Deployment (Railway)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to [Railway](https://railway.app/)
   - New Project → Deploy from GitHub
   - Select your repository
   - Root Directory: `server`
   - Add environment variables:
     ```
     DATABASE_URL=postgresql://...
     PORT=3000
     FRONTEND_URL=https://your-frontend.vercel.app
     GOOGLE_CLIENT_ID=your_client_id
     GOOGLE_CLIENT_SECRET=your_client_secret
     GOOGLE_REFRESH_TOKEN=your_refresh_token
     GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
     GOOGLE_CALENDAR_ID=primary
     ```
   - Build Command: `npm install && npm run prisma:generate && npm run build`
   - Start Command: `npm run start:prod`
   - Railway will automatically detect and run migrations

3. **Run Database Migrations:**
   - Open Railway console
   - Run: `npm run prisma:migrate`
   - Run: `npm run prisma:seed` (optional, to seed services)

4. **Note the backend URL** (e.g., `https://your-app.railway.app`)

---

## Step 4: Frontend Deployment (Vercel)

1. **Update Environment Variables:**
   - Create `.env` file in root:
     ```
     VITE_API_URL=https://your-backend.railway.app
     ```

2. **Deploy on Vercel:**
   - Go to [Vercel](https://vercel.com/)
   - Import Project → Select your GitHub repository
   - Root Directory: `.` (root of repo)
   - Framework Preset: Vite
   - Add Environment Variable:
     - `VITE_API_URL` = `https://your-backend.railway.app`
   - Deploy

3. **Update Vercel Environment Variable:**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` for Production, Preview, and Development

---

## Step 5: Update Backend CORS

After frontend is deployed, update backend `FRONTEND_URL`:
```
FRONTEND_URL=https://your-frontend.vercel.app
```

Restart the backend service.

---

## Step 6: Production Scripts

### Backend (with PM2)
```bash
cd server
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions to auto-start on server reboot
```

### Backend (without PM2)
```bash
cd server
npm install
npm run build
npm run start:prod
```

---

## Step 7: Verify Deployment

1. **Frontend:**
   - Visit your Vercel URL
   - Check that services load from API
   - Test booking form

2. **Backend:**
   - Visit `https://your-backend.railway.app/api/services`
   - Should return JSON array of services

3. **Booking Flow:**
   - Select service
   - Choose date
   - Select time slot
   - Fill booking form
   - Submit and verify booking appears in Google Calendar

---

## Environment Variables Summary

### Backend (.env in server/)
```
DATABASE_URL=postgresql://...
PORT=3000
FRONTEND_URL=https://your-frontend.vercel.app
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_REDIRECT_URI=...
GOOGLE_CALENDAR_ID=primary
```

### Frontend (.env in root/)
```
VITE_API_URL=https://your-backend.railway.app
```

---

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is accessible
- Ensure migrations have run

### Google Calendar Not Working
- Verify credentials are correct
- Check refresh token is valid
- Ensure Calendar API is enabled
- Verify calendar ID is correct

### CORS Errors
- Update FRONTEND_URL in backend
- Restart backend service
- Clear browser cache

### Booking Not Appearing
- Check backend logs
- Verify Google Calendar API credentials
- Check database for booking record

---

## Maintenance

### Database Migrations
```bash
cd server
npm run prisma:migrate
```

### View Database
```bash
cd server
npm run prisma:studio
```

### Update Services
- Use admin panel (if built) or directly update database
- Or use API: `POST /api/services`

---

## Security Notes

- Never commit `.env` files
- Use environment variables in production
- Keep Google Calendar credentials secure
- Regularly rotate refresh tokens
- Enable HTTPS for both frontend and backend
