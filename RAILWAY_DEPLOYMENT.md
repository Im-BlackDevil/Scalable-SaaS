# 🚀 Railway Deployment Guide

## Option 1: Add a Wrapper `package.json` in the Root

### 1. At the root of your project, add (or modify) a `package.json` like this:

```json
{
  "name": "scalable-saas-backend-wrapper",
  "private": true,
  "scripts": {
    "build": "cd apps/backend && npm install && npm run build",
    "start": "cd apps/backend && npm run start:prod"
  }
}
```

### 2. In Railway → Go to the Scalable-SaaS service:

- **Set Build Command:** `npm run build`
- **Set Start Command:** `npm start`

## Option 2: Use the Existing Root package.json

The main `package.json` already includes Railway-specific scripts:

```json
{
  "scripts": {
    "railway:build": "cd apps/backend && npm install && npm run build",
    "railway:start": "cd apps/backend && npm run start:prod"
  }
}
```

### Railway Configuration:
- **Build Command:** `npm run railway:build`
- **Start Command:** `npm run railway:start`

## Environment Variables

Make sure to set these environment variables in Railway:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Redis (if using)
REDIS_URL=your_redis_connection_string

# Email (if using)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# App
PORT=3001
NODE_ENV=production
```

## Deployment Steps

1. **Connect Repository:**
   - Connect your GitHub repository to Railway
   - Select the repository containing your Scalable SaaS project

2. **Configure Service:**
   - Create a new service in Railway
   - Name it "Scalable-SaaS" or "LinkManager-Backend"

3. **Set Build & Start Commands:**
   - Use the wrapper configuration above
   - Or use the existing scripts from the main package.json

4. **Add Environment Variables:**
   - Add all required environment variables
   - Make sure DATABASE_URL points to a PostgreSQL database

5. **Deploy:**
   - Railway will automatically build and deploy your backend
   - The API will be available at your Railway domain

## API Endpoints

Once deployed, your API will be available at:
- **Base URL:** `https://your-app-name.railway.app`
- **API Docs:** `https://your-app-name.railway.app/api/docs`
- **Health Check:** `https://your-app-name.railway.app/health`

## Frontend Configuration

Update your frontend's environment variables to point to the Railway backend:

```env
NEXT_PUBLIC_API_URL=https://your-app-name.railway.app/api/v1
```

## Monitoring

Railway provides:
- **Logs:** Real-time application logs
- **Metrics:** CPU, memory, and network usage
- **Deployments:** Automatic deployments on git push
- **Custom Domains:** Add your own domain

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is compatible

2. **Start Fails:**
   - Verify environment variables are set
   - Check database connection
   - Review application logs

3. **Database Issues:**
   - Ensure DATABASE_URL is correct
   - Run migrations if needed: `npm run db:push`

## Support

- **Railway Docs:** https://docs.railway.app
- **NestJS Docs:** https://docs.nestjs.com
- **Project Issues:** Check the GitHub repository

---

**🎉 Your Scalable SaaS backend is now ready for Railway deployment!** 