# Quick Start Guide

Get your DMIHER Complaint Portal up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure MongoDB

Your MongoDB Atlas connection is already configured in `.env`:

```env
MONGODB_URI=mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority
```

✅ **MongoDB is ready to use!**

## Step 3: Start the Server

```bash
npm start
```

You should see:
```
✅ MongoDB connected successfully
✅ Default faculty account created
✅ Default students created
✅ Database initialized
🚀 DMIHER Complaint Portal Server Started!
📍 Server running on: http://localhost:3000
```

## Step 4: Test the Application

### Test Student Registration
1. Open http://localhost:3000
2. Click "Register" button
3. Fill in the form:
   - Name: testing bot
   - Email: sc2024sa00087@dmiher.edu.in *(Must follow format: scXXXXsaXXXXX@dmiher.edu.in)*
   - Password: (your choice)
   - Confirm Password: (same as above)
   - Phone: 7855858745
   - Course: BCA - Bachelor of Computer Applications
4. Click "Register"

**Note**: Email must be in format `scXXXXsaXXXXX@dmiher.edu.in` (e.g., sc2024sa00087@dmiher.edu.in)

### Test Login
1. Use the credentials you just created
2. Or use default accounts:
   - **Faculty**: sc2024sa99999@dmiher.edu.in / admin123
   - **Student**: sc2023sa00001@dmiher.edu.in / bca123

## Troubleshooting

### Server won't start?
- Make sure port 3000 is not in use
- Check if MongoDB connection string is correct in `.env`

### Can't connect to MongoDB?
- Verify your MongoDB Atlas cluster is running
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure the connection string password is URL-encoded

### Registration fails?
- Make sure you're using @dmiher.edu.in email
- Check server console for error messages
- Verify MongoDB connection is active

## Next Steps

- Customize the faculty password in `.env`
- Add more default students if needed
- Deploy to production (Render, Railway, or Heroku)
- Set up your custom domain

## Need Help?

Check the main README.md for detailed documentation or create an issue in the repository.
