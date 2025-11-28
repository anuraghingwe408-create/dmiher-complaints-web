# Deployment Guide

Deploy your DMIHER Complaint Portal to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (already configured)
- Deployment platform account (Render, Railway, or Heroku)

## Option 1: Deploy to Render (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment with MongoDB"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### Step 3: Configure Service

1. Connect your GitHub repository
2. Configure settings:
   - **Name**: dmiher-complaint-portal
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Add Environment Variables

Add these in Render dashboard:

```
MONGODB_URI=mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority
FACULTY_PASSWORD=admin123
NODE_ENV=production
PORT=3000
```

### Step 5: Deploy

Click "Create Web Service" and wait for deployment to complete!

## Option 2: Deploy to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Add Environment Variables

In Railway dashboard, add:

```
MONGODB_URI=mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority
FACULTY_PASSWORD=admin123
NODE_ENV=production
```

### Step 4: Deploy

Railway will automatically deploy your app!

## Option 3: Deploy to Heroku

### Step 1: Install Heroku CLI

```bash
npm install -g heroku
```

### Step 2: Login to Heroku

```bash
heroku login
```

### Step 3: Create Heroku App

```bash
heroku create dmiher-complaint-portal
```

### Step 4: Set Environment Variables

```bash
heroku config:set MONGODB_URI="mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority"
heroku config:set FACULTY_PASSWORD="admin123"
heroku config:set NODE_ENV="production"
```

### Step 5: Deploy

```bash
git push heroku main
```

## MongoDB Atlas Configuration

### Whitelist IP Addresses

1. Go to MongoDB Atlas dashboard
2. Navigate to Network Access
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0) for production
5. Click "Confirm"

### Database User

Make sure your database user has read/write permissions:
1. Go to Database Access
2. Verify user `anuraghingwe001` has "Atlas Admin" or "Read and write to any database" role

## Post-Deployment

### Test Your Deployment

1. Visit your deployed URL
2. Test registration with a new account
3. Test login with default accounts
4. Submit a test complaint
5. Login as faculty and respond to complaint

### Update Environment Variables

For production, consider:
- Changing `FACULTY_PASSWORD` to a strong password
- Setting up custom domain
- Enabling HTTPS (usually automatic on Render/Railway/Heroku)

## Monitoring

### Check Logs

**Render:**
```
View logs in Render dashboard → Logs tab
```

**Railway:**
```
View logs in Railway dashboard → Deployments → View Logs
```

**Heroku:**
```bash
heroku logs --tail
```

## Troubleshooting

### Deployment fails?
- Check build logs for errors
- Verify all environment variables are set
- Ensure package.json has correct start script

### Can't connect to MongoDB?
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string is correct
- Ensure password is URL-encoded (%40 for @)

### App crashes on startup?
- Check logs for error messages
- Verify PORT environment variable
- Ensure all dependencies are in package.json

## Security Recommendations

1. **Change default passwords** in production
2. **Use strong faculty password**
3. **Enable MongoDB Atlas IP whitelist** for specific IPs if possible
4. **Set up monitoring** and alerts
5. **Regular backups** of MongoDB database
6. **Use environment variables** for all sensitive data

## Custom Domain (Optional)

### Render
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### Railway
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records

### Heroku
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS records

## Support

If you encounter issues:
1. Check deployment platform documentation
2. Review MongoDB Atlas connection settings
3. Verify environment variables are correct
4. Check application logs for errors

Happy deploying! 🚀
