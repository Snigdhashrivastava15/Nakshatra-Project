# 🚀 Quick Start: Backend Server

## Problem
Server is failing because `DATABASE_URL` environment variable is not found.

## Solution Options

### Option 1: Use SQLite (Easiest - No PostgreSQL Required)

**This is the fastest way to get started!**

```powershell
cd server

# Run the SQLite setup script
powershell -ExecutionPolicy Bypass -File setup-sqlite.ps1

# Generate Prisma Client
npm run prisma:generate

# Create database and migrations
npm run prisma:migrate

# Seed database with services
npm run prisma:seed

# Start server
npm run start:dev
```

The SQLite database file will be created at: `server\prisma\dev.db`

---

### Option 2: Use PostgreSQL (Production Ready)

**If you have PostgreSQL installed:**

1. **Update `.env` file** with your PostgreSQL credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/planet_nakshatra?schema=public"
   ```
   Replace `username:password` with your actual PostgreSQL credentials.

2. **Create database** (if it doesn't exist):
   ```sql
   CREATE DATABASE planet_nakshatra;
   ```

3. **Run setup commands:**
   ```powershell
   cd server
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   npm run start:dev
   ```

---

## Important: Restart Server After Creating .env

**If the server is already running, you MUST restart it** for the `.env` file to be loaded:

1. Stop the current server (Ctrl+C in the terminal running the server)
2. Start it again: `npm run start:dev`

The `.env` file is only read when the server starts!

---

## Verify It's Working

After restarting, you should see:
```
🚀 Server running on http://localhost:3000
📡 Environment: development
```

Then test in browser: `http://localhost:3000/api/services`

Should return: `[]` or an array of services.

---

## Quick SQLite Setup (Recommended for Testing)

The `.env` file exists, but if PostgreSQL isn't configured, switch to SQLite:

```powershell
cd server

# This script will:
# 1. Update .env to use SQLite
# 2. Update schema.prisma to use SQLite
powershell -ExecutionPolicy Bypass -File setup-sqlite.ps1

# Then continue with:
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```
