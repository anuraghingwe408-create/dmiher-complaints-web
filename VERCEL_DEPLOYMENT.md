# 🚀 Vercel Deployment Guide

## Issue Fixed

The 404 error when clicking "Get Started" was caused by Vercel not knowing how to handle the `/login` route. This has been fixed with proper Vercel configuration.

## Files Added

1. ✅ `vercel.json` - Vercel configuration
2. ✅ `.vercelignore` - Files to exclude from deployment

## Deployment Steps

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `dmiher-complaints-web`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
MONGODB_URI = mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority

FACULTY_PASSWORD = admin123

NODE_ENV = production

PORT = 3000
```

**Important**: Make sure to add these for **Production**, **Preview**, and **Development** environments.

### Step 2: Push Changes to GitHub

```bash
git add .
git commit -m "Added Vercel configuration for deployment"
git push origin main
```

### Step 3: Redeploy on Vercel

Vercel will automatically redeploy when you push to GitHub. Or you can manually redeploy:

1. Go to your Vercel dashboard
2. Click on your project
3. Click **Deployments**
4. Click **Redeploy** on the latest deployment

### Step 4: Wait for Deployment

Wait for the deployment to complete (usually 1-2 minutes).

### Step 5: Test Your Site

Visit your Vercel URL and test:
- ✅ Landing page loads
- ✅ Click "Get Started" → Should go to login page
- ✅ Login works
- ✅ Student portal works
- ✅ Faculty portal works

## What the Configuration Does

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/login",
      "dest": "server.js"
    },
    {
      "src": "/student",
      "dest": "server.js"
    },
    {
      "src": "/faculty",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**Explanation**:
- `builds`: Tells Vercel to build server.js as a Node.js serverless function
- `routes`: Maps all routes to server.js so Express can handle them

### .vercelignore

Excludes unnecessary files from deployment:
- node_modules (Vercel installs these)
- .env (use environment variables instead)
- Documentation files
- Git files

## Troubleshooting

### Still Getting 404?

1. **Check Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify MONGODB_URI is set correctly
   - Make sure it's enabled for Production

2. **Check Deployment Logs**:
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Check **Build Logs** and **Function Logs** for errors

3. **Verify MongoDB Connection**:
   - Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Test connection string in MongoDB Compass

4. **Clear Vercel Cache**:
   - Go to Settings → General
   - Scroll to "Clear Cache"
   - Click "Clear Cache" and redeploy

### MongoDB Connection Issues?

1. **Whitelist All IPs in MongoDB Atlas**:
   - Go to MongoDB Atlas
   - Network Access
   - Add IP Address: `0.0.0.0/0` (Allow from anywhere)

2. **Check Connection String**:
   - Make sure password is URL-encoded
   - `@` should be `%40`
   - Your string: `mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1...`

### Routes Not Working?

1. **Check vercel.json** is in root directory
2. **Verify routes** are in correct order (most specific first)
3. **Redeploy** after making changes

## Testing Locally

Before deploying, test locally:

```bash
npm install
npm start
```

Then visit:
- http://localhost:3000 (landing page)
- http://localhost:3000/login (login page)
- http://localhost:3000/student (student portal)
- http://localhost:3000/faculty (faculty portal)

## Vercel CLI (Optional)

You can also deploy using Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables Reference

| Variable | Value | Description |
|----------|-------|-------------|
| MONGODB_URI | mongodb+srv://... | MongoDB Atlas connection string |
| FACULTY_PASSWORD | admin123 | Faculty login password |
| NODE_ENV | production | Environment mode |
| PORT | 3000 | Server port (optional) |

## Important Notes

1. **Never commit .env file** - It's in .gitignore
2. **Use Vercel environment variables** - Set them in dashboard
3. **MongoDB Atlas IP whitelist** - Must allow Vercel's IPs (0.0.0.0/0)
4. **Serverless functions** - Vercel runs your app as serverless functions
5. **Cold starts** - First request might be slow (serverless nature)

## Deployment Checklist

- ✅ vercel.json created
- ✅ .vercelignore created
- ✅ Environment variables set in Vercel
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Code pushed to GitHub
- ✅ Vercel auto-deployed
- ✅ Test all routes
- ✅ Test login functionality
- ✅ Test complaint submission
- ✅ Test faculty dashboard

## Support

If you still have issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas connection
3. Verify environment variables
4. Test locally first
5. Contact Vercel support if needed

---

**Your app should now work perfectly on Vercel!** 🎉

After pushing these changes and redeploying, the 404 error will be fixed!
