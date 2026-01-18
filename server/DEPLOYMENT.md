# Production Deployment Guide

## 🚀 Deployment Checklist

### 1. Environment Variables

Create a `.env` file with all required variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

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

# Admin Email (required for notifications)
ADMIN_EMAIL=admin@planetnakshatra.com

# Google Calendar (Optional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
GOOGLE_REDIRECT_URI=https://yourdomain.com/auth/google/callback
GOOGLE_CALENDAR_ID=primary
GOOGLE_MEET_ENABLED=true
```

### 2. Database Setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations in production
npx prisma migrate deploy

# Seed database (if needed)
npm run prisma:seed
```

### 3. Build Application

```bash
npm run build
```

### 4. Start Production Server

#### Option A: Direct Node.js
```bash
npm run start:prod
```

#### Option B: PM2 (Recommended for production)
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Or start directly
pm2 start dist/main.js --name planet-nakshatra-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

#### Option C: Systemd Service
Create `/etc/systemd/system/planet-nakshatra.service`:

```ini
[Unit]
Description=Planet Nakshatra API
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/server
Environment=NODE_ENV=production
ExecStart=/usr/bin/node dist/main.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable planet-nakshatra
sudo systemctl start planet-nakshatra
```

## 🌐 Frontend Deployment (Vercel)

### 1. Environment Variables

In Vercel dashboard, add:
```
VITE_API_URL=https://your-api-domain.com
```

### 2. Build Command
```bash
npm run build
```

### 3. Output Directory
```
dist
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## 📦 Railway Deployment

1. Connect your GitHub repository
2. Select the `server` folder as root
3. Add all environment variables
4. Set build command: `npm install && npm run build && npx prisma generate`
5. Set start command: `npm run start:prod`
6. Railway will automatically deploy

## ☁️ Render Deployment

1. Create a new Web Service
2. Connect your repository
3. Root Directory: `server`
4. Build Command: `npm install && npm run build && npx prisma generate`
5. Start Command: `npm run start:prod`
6. Add PostgreSQL database addon
7. Add all environment variables
8. Deploy

## 🔒 Security Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use secure database connections (SSL)
- [ ] Enable HTTPS (use reverse proxy like nginx)
- [ ] Set strong database passwords
- [ ] Use app passwords for email (not regular passwords)
- [ ] Keep `.env` file secure (never commit to git)
- [ ] Enable CORS only for your frontend domain
- [ ] Use environment variables for all secrets

## 🔧 Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 Monitoring

### Health Check
```bash
curl https://your-api-domain.com/api/health
```

### PM2 Monitoring
```bash
pm2 status
pm2 logs
pm2 monit
```

## 🔄 Updates

```bash
# Pull latest code
git pull

# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Build
npm run build

# Restart
pm2 restart planet-nakshatra-api
# Or
sudo systemctl restart planet-nakshatra
```
