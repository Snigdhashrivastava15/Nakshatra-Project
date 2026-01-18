# 🚨 Quick Fix: Database Connection Error

## Problem
```
ERROR [PrismaService] PrismaClientInitializationError: 
error: Environment variable not found: DATABASE_URL
```

## Solution

### Step 1: Create `.env` file

In the `server` directory, create a file named `.env` with this content:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/planet_nakshatra?schema=public"

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important:** Update `DATABASE_URL` with your actual PostgreSQL credentials:
- Replace `postgres:postgres` with your PostgreSQL username:password
- Replace `planet_nakshatra` with your database name (or create it)

### Step 2: Or Use Setup Script (Windows)

```powershell
cd server
.\setup-env.ps1
```

Then edit the `.env` file with your database credentials.

### Step 3: Setup Database

```bash
cd server

# Generate Prisma Client
npm run prisma:generate

# Create database (if it doesn't exist)
# Make sure PostgreSQL is running, then:

# Run migrations
npm run prisma:migrate

# Seed database with services
npm run prisma:seed
```

### Step 4: Start Server

```bash
npm run start:dev
```

## If You Don't Have PostgreSQL

### Option 1: Install PostgreSQL
1. Download from https://www.postgresql.org/download/
2. Install and start PostgreSQL service
3. Create database: `createdb planet_nakshatra`
4. Update `.env` with your credentials

### Option 2: Use SQLite (Quick Testing)

Edit `server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Then:
```bash
cd server
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

## Verify It Works

1. Check backend logs: Should see "🚀 Server running on http://localhost:3000"
2. Test API: Open `http://localhost:3000/api/services` in browser
3. Should return: `[]` or array of services

## Still Having Issues?

1. Check PostgreSQL is running: `pg_isready`
2. Test connection: `psql -U postgres -d planet_nakshatra`
3. Check `.env` file is in `server/` directory (not root)
4. Restart backend after creating `.env`
