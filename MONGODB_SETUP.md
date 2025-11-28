# MongoDB Setup Guide

Your application is now using MongoDB Atlas (cloud database) instead of MySQL.

## Current Configuration

✅ **MongoDB Atlas Connection**: Already configured and working!

Your connection string in `.env`:
```
MONGODB_URI=mongodb+srv://anuraghingwe001:anuraghingwe%40001@cluster1.axcxah4.mongodb.net/dmiher_complaints?retryWrites=true&w=majority
```

## Database Structure

### Collections

1. **students** - Student accounts
2. **faculty** - Faculty accounts  
3. **complaints** - All complaints submitted

### Student Schema
```javascript
{
  id: String (unique),          // e.g., "BCA2025001"
  password: String,
  name: String,
  dept: String,                 // e.g., "BCA"
  email: String (unique),       // e.g., "sc2024sa00087@dmiher.edu.in"
  phone: String,
  year: String,
  course: String,               // e.g., "bca"
  registrationDate: Date
}
```

### Faculty Schema
```javascript
{
  name: String,
  email: String (unique),       // e.g., "faculty@dmiher.edu.in"
  password: String,
  department: String,
  createdAt: Date
}
```

### Complaint Schema
```javascript
{
  id: String (unique),          // e.g., "C1a2b3c4"
  student_id: String,
  student_name: String,
  student_email: String,
  department: String,
  year: String,
  complaint_type: String,
  subject: String,
  description: String,
  status: String,               // "Pending", "In Progress", "Resolved"
  faculty_response: String,
  created_at: Date,
  responded_at: Date
}
```

## Default Data

### Default Faculty Account
- **Email**: sc2024sa99999@dmiher.edu.in
- **Password**: admin123
- **Name**: Dr. Admin Faculty
- **Department**: Administration

### Default Student Accounts (12 students)

**BCA Students:**
- BCA2023001 / bca123 / sc2023sa00001@dmiher.edu.in
- BCA2023002 / bca123 / sc2023sa00002@dmiher.edu.in
- BCA2023003 / bca123 / sc2023sa00003@dmiher.edu.in

**BBA Students:**
- BBA2023001 / bba123 / sc2023sa00004@dmiher.edu.in
- BBA2023002 / bba123 / sc2023sa00005@dmiher.edu.in
- BBA2023003 / bba123 / sc2023sa00006@dmiher.edu.in

**MCA Students:**
- MCA2023001 / mca123 / sc2023sa00007@dmiher.edu.in
- MCA2023002 / mca123 / sc2023sa00008@dmiher.edu.in
- MCA2023003 / mca123 / sc2023sa00009@dmiher.edu.in

**BSc AIDS Students:**
- BSCAIDS2023001 / aids123 / sc2023sa00010@dmiher.edu.in
- BSCAIDS2023002 / aids123 / sc2023sa00011@dmiher.edu.in
- BSCAIDS2023003 / aids123 / sc2023sa00012@dmiher.edu.in

## Accessing Your Database

### Using MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Open Compass
3. Paste your connection string:
   ```
   mongodb+srv://anuraghingwe001:anuraghingwe@001@cluster1.axcxah4.mongodb.net/
   ```
4. Click "Connect"
5. Select database: `dmiher_complaints`

### Using MongoDB Atlas Web Interface

1. Go to https://cloud.mongodb.com
2. Login with your credentials
3. Select your cluster: `Cluster1`
4. Click "Browse Collections"
5. View your data

## Common Operations

### View All Students
In MongoDB Compass or Atlas:
```javascript
db.students.find()
```

### View All Complaints
```javascript
db.complaints.find()
```

### Count Students by Course
```javascript
db.students.aggregate([
  { $group: { _id: "$course", count: { $sum: 1 } } }
])
```

### Find Pending Complaints
```javascript
db.complaints.find({ status: "Pending" })
```

### Update Student Email
```javascript
db.students.updateOne(
  { id: "BCA2023001" },
  { $set: { email: "newemail@dmiher.edu.in" } }
)
```

## Backup and Restore

### Backup (using mongodump)
```bash
mongodump --uri="mongodb+srv://anuraghingwe001:anuraghingwe@001@cluster1.axcxah4.mongodb.net/dmiher_complaints"
```

### Restore (using mongorestore)
```bash
mongorestore --uri="mongodb+srv://anuraghingwe001:anuraghingwe@001@cluster1.axcxah4.mongodb.net/dmiher_complaints" dump/
```

### Export to JSON
```bash
mongoexport --uri="mongodb+srv://anuraghingwe001:anuraghingwe@001@cluster1.axcxah4.mongodb.net/dmiher_complaints" --collection=students --out=students.json
```

## Security Best Practices

1. **Never commit `.env` file** to Git (already in .gitignore)
2. **Use strong passwords** for database users
3. **Whitelist specific IPs** in MongoDB Atlas (currently set to allow all)
4. **Rotate credentials** regularly
5. **Enable MongoDB Atlas monitoring** and alerts
6. **Use read-only users** for reporting/analytics

## Troubleshooting

### Connection Failed
- Check if MongoDB Atlas cluster is running
- Verify IP whitelist in Atlas (Network Access)
- Ensure password is URL-encoded in connection string
- Check if database user exists and has permissions

### Slow Queries
- Add indexes to frequently queried fields
- Use MongoDB Atlas Performance Advisor
- Monitor query performance in Atlas

### Data Not Showing
- Verify you're connected to correct database
- Check collection names (case-sensitive)
- Ensure data was actually inserted (check server logs)

## Migration from MySQL

✅ **Already completed!** Your application has been successfully migrated from MySQL to MongoDB.

### What Changed:
- Removed MySQL dependencies
- Added MongoDB/Mongoose packages
- Updated all database queries to use MongoDB
- Converted SQL schemas to Mongoose schemas
- Updated connection configuration

### Files Removed:
- `database/db.js` (MySQL connection)
- `database/schema.sql` (SQL schema)
- `database/reset-database.sql` (SQL reset script)
- All MySQL-related documentation

### Files Added:
- `database/mongodb.js` (MongoDB connection and schemas)

## Monitoring

### MongoDB Atlas Dashboard
- View real-time metrics
- Monitor query performance
- Set up alerts for issues
- Track database size and usage

### Application Logs
Check server console for:
- Connection status
- Query errors
- Performance issues

## Scaling

MongoDB Atlas makes it easy to scale:
1. **Vertical Scaling**: Upgrade cluster tier
2. **Horizontal Scaling**: Add sharding
3. **Read Replicas**: Add read-only nodes
4. **Auto-scaling**: Enable in Atlas settings

## Support

- MongoDB Documentation: https://docs.mongodb.com
- MongoDB Atlas Support: https://support.mongodb.com
- Mongoose Documentation: https://mongoosejs.com/docs

Your database is ready to use! 🎉
