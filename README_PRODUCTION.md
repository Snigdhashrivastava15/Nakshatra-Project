# 🚀 Planet Nakshatra - Production-Ready Application

A fully dynamic, production-ready astrology consultation platform with real-time booking, Google Calendar synchronization, and email notifications.

## ✨ Features

- ✅ **Dynamic Services** - All services loaded from backend API
- ✅ **Real-Time Booking** - Calendar-based booking system with time slot availability
- ✅ **Google Calendar Sync** - Automatic event creation and availability sync
- ✅ **Email Notifications** - Confirmation emails to clients and admin alerts
- ✅ **Double Booking Prevention** - Prevents conflicts in database and Google Calendar
- ✅ **Production Ready** - Fully configured for deployment on Vercel, Railway, Render, etc.

## 📋 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- Shadcn UI components

### Backend
- NestJS (Node.js framework)
- TypeScript
- Prisma ORM
- PostgreSQL
- Nodemailer (email notifications)
- Google Calendar API

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

5. **Start development server**
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Create `.env.local`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📧 Email Configuration

### Option 1: Gmail Direct (Simplest)

```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password  # Get from Google Account > Security > App Passwords
ADMIN_EMAIL=admin@planetnakshatra.com
```

### Option 2: SMTP Server

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@planetnakshatra.com
SMTP_FROM_NAME=Planet Nakshatra
ADMIN_EMAIL=admin@planetnakshatra.com
```

**Note:** Gmail requires App Passwords (not your regular password). Enable 2FA and generate an app password in Google Account settings.

## 📅 Google Calendar Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project
   - Enable Google Calendar API

2. **Create OAuth Credentials**
   - Go to Credentials > Create Credentials > OAuth 2.0 Client ID
   - Configure consent screen
   - Add redirect URI: `http://localhost:3000/auth/google/callback`

3. **Get Refresh Token**
   - Use OAuth 2.0 Playground or implement OAuth flow
   - Get refresh token for service account

4. **Configure Environment**
   ```env
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   GOOGLE_CALENDAR_ID=primary
   GOOGLE_MEET_ENABLED=true
   ```

## 🌐 Deployment

### Backend (Railway/Render/AWS)

1. **Push code to GitHub**

2. **Connect to Railway/Render**
   - Create new project
   - Connect GitHub repository
   - Set root directory: `server`
   - Add PostgreSQL database addon

3. **Configure environment variables**
   - Add all variables from `.env`
   - Set `NODE_ENV=production`
   - Set `DATABASE_URL` (auto-provided by Railway/Render)

4. **Set build and start commands**
   - Build: `npm install && npm run build && npx prisma generate`
   - Start: `npm run start:prod`

5. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

### Frontend (Vercel)

1. **Connect GitHub repository**

2. **Configure environment variables**
   ```
   VITE_API_URL=https://your-api-domain.railway.app
   ```

3. **Deploy**
   - Vercel auto-detects Vite
   - Build command: `npm run build`
   - Output directory: `dist`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Services
```
GET /api/services              # Get all active services
GET /api/services/:id          # Get service by ID
POST /api/services             # Create service (admin)
```

### Bookings
```
POST /api/bookings             # Create booking
GET /api/bookings              # Get all bookings (admin)
GET /api/bookings/:id          # Get booking by ID
GET /api/bookings/availability # Get available time slots
```

### Contact
```
POST /api/contact              # Submit contact inquiry
```

## 🔒 Security

- ✅ Input validation on all endpoints
- ✅ SQL injection protection (Prisma)
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ Error messages sanitized in production
- ✅ HTTPS support (via reverse proxy)

## 📝 Environment Variables Reference

See `server/BACKEND_SETUP.md` for complete list of environment variables.

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify `DATABASE_URL` is correct
- Check port 3000 is available

### Email not sending
- Verify SMTP credentials
- Check spam folder
- Ensure App Password is used (not regular password for Gmail)
- Check server logs: `pm2 logs` or check `./logs/`

### Google Calendar not working
- Verify OAuth credentials
- Check refresh token is valid
- Ensure Calendar API is enabled
- Check server logs for errors

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration
- Ensure backend is running
- Check browser console for errors

## 📚 Documentation

- `BACKEND_SETUP.md` - Backend setup instructions
- `DEPLOYMENT.md` - Detailed deployment guide
- `PRODUCTION_READY_SUMMARY.md` - Complete feature list

## 🎯 Production Checklist

- [ ] Database configured and migrated
- [ ] Environment variables set
- [ ] Email service configured and tested
- [ ] Google Calendar configured (optional)
- [ ] CORS configured for production domain
- [ ] Frontend API URL configured
- [ ] Health check endpoint working
- [ ] All tests passing
- [ ] PM2/systemd configured (if self-hosting)
- [ ] SSL/HTTPS configured
- [ ] Backup strategy in place

## 📞 Support

For issues:
1. Check server logs
2. Review `BACKEND_SETUP.md`
3. Check health endpoint: `curl https://your-api-domain.com/api/health`
4. Review error messages in browser console (frontend) and server logs (backend)

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ for Planet Nakshatra**
