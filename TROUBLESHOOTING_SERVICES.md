# 🔧 Troubleshooting: Services Not Loading

## Quick Checks

### 1. **Backend Server Running?**
```bash
cd server
npm run start:dev
```

Check if server starts without errors on `http://localhost:3000`

### 2. **Test Backend API Directly**
```bash
curl http://localhost:3000/api/services
```

Or open in browser: `http://localhost:3000/api/services`

Expected: JSON array of services or empty array `[]`

### 3. **Check Database Connection**
```bash
cd server
npm run prisma:studio
```

This opens Prisma Studio. Check if `Service` table exists and has data.

### 4. **Seed Database**
```bash
cd server
npm run prisma:seed
```

This will populate services if database is empty.

### 5. **Check Frontend API URL**
Check browser console for:
```
API Client initialized with base URL: http://localhost:3000
API Request: GET http://localhost:3000/api/services
```

If URL is wrong, set in `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

## Common Issues

### Issue 1: "Unable to connect to server"
**Cause:** Backend not running or wrong URL

**Fix:**
1. Start backend: `cd server && npm run start:dev`
2. Check URL in browser console
3. Verify `VITE_API_URL` in frontend `.env.local`

### Issue 2: CORS Error
**Cause:** Backend CORS not configured for frontend origin

**Fix:**
1. Check `server/src/main.ts` CORS configuration
2. Add frontend URL to allowed origins
3. Restart backend server

### Issue 3: Empty Services Array
**Cause:** Database not seeded

**Fix:**
```bash
cd server
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Issue 4: Database Connection Error
**Cause:** DATABASE_URL not set or PostgreSQL not running

**Fix:**
1. Check `server/.env` has `DATABASE_URL`
2. Verify PostgreSQL is running
3. Test connection: `npm run prisma:studio`

## Debug Steps

1. **Check Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for API request logs
   - Check for CORS or network errors

2. **Check Network Tab**
   - Open DevTools (F12)
   - Go to Network tab
   - Click "Retry" in modal
   - Check `/api/services` request
   - See status code and response

3. **Check Backend Logs**
   - Look at terminal running `npm run start:dev`
   - Check for errors or warnings
   - Verify requests are reaching backend

4. **Test Health Endpoint**
   ```bash
   curl http://localhost:3000/api/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "database": "connected",
     ...
   }
   ```

## Environment Variables Checklist

### Backend (`server/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/planet_nakshatra?schema=public"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:3000
```

## Still Not Working?

1. **Clear browser cache** and hard refresh (Ctrl+Shift+R)
2. **Restart both frontend and backend**
3. **Check firewall** isn't blocking localhost:3000
4. **Try different browser** to rule out browser issues
5. **Check for port conflicts** - is something else using port 3000?
