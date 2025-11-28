# 🚀 START HERE

Welcome! Your DMIHER Complaint Portal is ready to use with MongoDB!

## Current Status: ✅ READY

Your server is running at: **http://localhost:3000**

## Quick Test (Do This Now!)

### Test Registration
1. Open http://localhost:3000 in your browser
2. Click the "Register" button
3. Fill in the form with:
   ```
   Name: testing bot
   Email: sc2024sa00087@dmiher.edu.in
   Password: test123
   Confirm Password: test123
   Phone: 7855858745
   Course: BCA - Bachelor of Computer Applications
   ```
4. Click "Register"
5. ✅ You should see success and be redirected to student portal!

**Important**: Email must follow format `scXXXXsaXXXXX@dmiher.edu.in`
- `sc` + 4 digits (year) + `sa` + 5 digits (ID) + `@dmiher.edu.in`
- Example: sc2024sa00087@dmiher.edu.in

### Test Login
Try logging in with default accounts:
- **Faculty**: sc2024sa99999@dmiher.edu.in / admin123
- **Student**: sc2023sa00001@dmiher.edu.in / bca123

## What's Working

✅ MongoDB Atlas connected
✅ Student registration
✅ Student login
✅ Faculty login
✅ Complaint submission
✅ Complaint management
✅ Faculty responses
✅ Email validation (@dmiher.edu.in)

## Project Structure

```
Your Project/
├── database/
│   └── mongodb.js          ← MongoDB connection & schemas
├── public/
│   ├── login.html          ← Login page
│   ├── student.html        ← Student portal
│   └── faculty.html        ← Faculty portal
├── server.js               ← Main server (MongoDB)
├── .env                    ← Your MongoDB credentials
├── package.json            ← Dependencies
└── Documentation files     ← Guides and help
```

## Important Files

- **server.js** - Main application server
- **database/mongodb.js** - Database connection and schemas
- **.env** - Your MongoDB connection string (NEVER commit to Git!)
- **package.json** - Project dependencies

## Documentation

- **QUICK_START.md** - Quick start guide
- **MONGODB_SETUP.md** - MongoDB details and operations
- **DEPLOYMENT.md** - How to deploy to production
- **GIT_SETUP.md** - How to push to GitHub
- **COMMANDS.md** - Useful commands reference
- **MIGRATION_COMPLETE.md** - What was changed

## Next Steps

### 1. Test Everything ✅
- Registration ← Do this now!
- Login
- Submit complaint
- Faculty response

### 2. Push to GitHub
```bash
git add .
git commit -m "DMIHER Complaint Portal with MongoDB"
git push origin main
```

### 3. Deploy to Production
Choose one:
- **Render** (recommended) - See DEPLOYMENT.md
- **Railway** - See DEPLOYMENT.md
- **Heroku** - See DEPLOYMENT.md

## Default Accounts

### Faculty
- Email: sc2024sa99999@dmiher.edu.in
- Password: admin123

### Students (12 accounts)
- BCA: sc2023sa00001@dmiher.edu.in / bca123
- BBA: sc2023sa00004@dmiher.edu.in / bba123
- MCA: sc2023sa00007@dmiher.edu.in / mca123
- BSc AIDS: sc2023sa00010@dmiher.edu.in / aids123

## MongoDB Access

### View Your Data
1. Go to https://cloud.mongodb.com
2. Login with your credentials
3. Click "Browse Collections"
4. See your students, faculty, and complaints

### Or Use MongoDB Compass
1. Download from: https://www.mongodb.com/try/download/compass
2. Connect with your connection string
3. Browse your database visually

## Common Commands

### Start Server
```bash
npm start
```

### Stop Server
Press `Ctrl + C` in terminal

### Install Dependencies
```bash
npm install
```

### Push to GitHub
```bash
git add .
git commit -m "Your message"
git push
```

## Need Help?

1. **Server won't start?** 
   - Check if port 3000 is free
   - Run `npm install`
   - Check `.env` file

2. **Registration fails?**
   - Check server console for errors
   - Verify MongoDB connection
   - Use @dmiher.edu.in email

3. **Can't connect to MongoDB?**
   - Check `.env` connection string
   - Verify MongoDB Atlas is running
   - Check IP whitelist in Atlas

4. **More help?**
   - Check QUICK_START.md
   - Review MONGODB_SETUP.md
   - Check server console logs

## What Changed from MySQL?

✅ Migrated from MySQL to MongoDB
✅ Using MongoDB Atlas (cloud database)
✅ All features working
✅ Faster and more scalable
✅ No local database installation needed

## Ready to Test?

**Go to http://localhost:3000 and try registering now!**

Your test data:
- Name: testing bot
- Email: sc2024sa00087@dmiher.edu.in
- Password: test123
- Phone: 7855858745
- Course: BCA

Good luck! 🎉
