# Quick Database Setup

## Current Status
- ✅ `.env` file created with SQLite configuration
- ✅ Prisma schema updated to use SQLite

## Next Steps

Run these commands in the `server` directory:

```powershell
cd server

# 1. Generate Prisma Client
npm run prisma:generate

# 2. Create database and run migrations
npm run prisma:migrate

# 3. Seed database with services
npm run prisma:seed

# 4. Restart backend server
# (Stop current server with Ctrl+C, then:)
npm run start:dev
```

## Verify It Works

After setup, test the API:
```powershell
# Test health endpoint
Invoke-WebRequest -Uri http://localhost:3000/api/health

# Test services endpoint
Invoke-WebRequest -Uri http://localhost:3000/api/services
```

Should return JSON array of services (or empty array `[]` if not seeded yet).

## Database File Location

SQLite database will be created at:
```
server/prisma/dev.db
```

## If You Want PostgreSQL Instead

1. Update `server/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/planet_nakshatra?schema=public"
   ```

2. Update `server/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Then run the setup commands above.
