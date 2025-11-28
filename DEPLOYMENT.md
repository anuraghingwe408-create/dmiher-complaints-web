# Deployment Guide - MySQL Version

## Environment Setup

1. **Copy the environment template:**
   ```bash
   copy .env.example .env
   ```

2. **Configure your environment variables in `.env`:**
   - `PORT`: Server port (default: 3000)
   - `FACULTY_PASSWORD`: Password for faculty login
   - `NODE_ENV`: Set to `production` for deployment
   - `DB_HOST`: MySQL server host
   - `DB_USER`: MySQL username
   - `DB_PASSWORD`: MySQL password
   - `DB_NAME`: Database name (dmiher_complaints)

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)

### Setup Steps

1. **Install MySQL** (if not already installed)
   - Windows: Download from https://dev.mysql.com/downloads/installer/
   - Mac: `brew install mysql`
   - Linux: `sudo apt install mysql-server`

2. **Create Database**
   ```bash
   mysql -u root -p
   ```
   ```sql
   CREATE DATABASE dmiher_complaints;
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Configure `.env` file:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=dmiher_complaints
   FACULTY_PASSWORD=admin123
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   The application will automatically create tables and insert default data.

6. **Access the application:**
   - Student Portal: http://localhost:3000/
   - Faculty Portal: http://localhost:3000/faculty

## Production Deployment

### Option 1: Railway (Recommended - Free MySQL Included)

**Why Railway?**
- Free MySQL database (500MB)
- Easy deployment from GitHub
- Automatic HTTPS
- No credit card required

**Steps:**

1. **Create Railway Account**: https://railway.app

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add MySQL Database**:
   - In your project, click "New"
   - Select "Database" → "Add MySQL"
   - Railway will automatically create the database

4. **Configure Environment Variables**:
   - Go to your web service
   - Click "Variables"
   - Add these variables (Railway will auto-fill MySQL variables):
     ```
     FACULTY_PASSWORD=your_secure_password
     NODE_ENV=production
     ```
   - MySQL variables are automatically set by Railway

5. **Deploy**:
   - Railway automatically deploys on git push
   - Your app will be live at: `your-app.railway.app`

### Option 2: Render (Free Tier Available)

1. **Create Render Account**: https://render.com

2. **Create MySQL Database**:
   - Dashboard → New → MySQL
   - Select free tier
   - Note the connection details

3. **Create Web Service**:
   - New → Web Service
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**:
   ```
   DB_HOST=<from Render MySQL>
   DB_USER=<from Render MySQL>
   DB_PASSWORD=<from Render MySQL>
   DB_NAME=<from Render MySQL>
   FACULTY_PASSWORD=your_secure_password
   NODE_ENV=production
   ```

5. **Deploy**: Render will build and deploy automatically

### Option 3: Heroku with ClearDB MySQL

1. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

2. **Add ClearDB MySQL Add-on**:
   ```bash
   heroku addons:create cleardb:ignite
   ```

3. **Get Database Credentials**:
   ```bash
   heroku config:get CLEARDB_DATABASE_URL
   ```
   Format: `mysql://username:password@host/database`

4. **Set Environment Variables**:
   ```bash
   heroku config:set DB_HOST=<host-from-cleardb>
   heroku config:set DB_USER=<user-from-cleardb>
   heroku config:set DB_PASSWORD=<password-from-cleardb>
   heroku config:set DB_NAME=<database-from-cleardb>
   heroku config:set FACULTY_PASSWORD=your_secure_password
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account**: https://digitalocean.com

2. **Create Managed MySQL Database**:
   - Databases → Create Database Cluster
   - Select MySQL
   - Choose plan (starts at $15/month)

3. **Create App**:
   - Apps → Create App
   - Connect GitHub repository
   - Add environment variables from MySQL cluster

4. **Deploy**: DigitalOcean will handle deployment

### Option 5: AWS (EC2 + RDS)

1. **Create RDS MySQL Instance**:
   - AWS Console → RDS → Create Database
   - Select MySQL
   - Choose Free Tier eligible
   - Note endpoint and credentials

2. **Create EC2 Instance**:
   - Launch Ubuntu 22.04 instance
   - Install Node.js:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

3. **Deploy Application**:
   ```bash
   git clone your-repo-url
   cd your-repo
   npm install --production
   
   # Create .env file
   nano .env
   # Add your RDS connection details
   
   # Use PM2 for process management
   sudo npm install -g pm2
   pm2 start server.js --name "complaint-portal"
   pm2 startup
   pm2 save
   ```

### Option 6: VPS (Ubuntu/Debian) with MySQL

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL
sudo apt update
sudo apt install mysql-server

# Secure MySQL
sudo mysql_secure_installation

# Create database
sudo mysql
CREATE DATABASE dmiher_complaints;
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON dmiher_complaints.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Clone and setup application
git clone your-repo-url
cd your-repo
npm install --production

# Configure environment
nano .env
# Add database credentials

# Use PM2
sudo npm install -g pm2
pm2 start server.js --name "complaint-portal"
pm2 startup
pm2 save

# Setup Nginx (optional)
sudo apt install nginx
# Configure reverse proxy
```

## Free MySQL Hosting Options

1. **Railway** - 500MB free, best for small projects
2. **PlanetScale** - 5GB free, serverless MySQL
3. **Aiven** - Free trial with 1GB
4. **Clever Cloud** - Free tier available
5. **FreeSQLDatabase** - 5MB free (testing only)

## Database Schema

The application automatically creates these tables:

### Students Table
- `id` (VARCHAR 50, PRIMARY KEY)
- `password` (VARCHAR 255)
- `name` (VARCHAR 100)
- `dept` (VARCHAR 50)
- `email` (VARCHAR 100, UNIQUE)
- `phone` (VARCHAR 20)
- `year` (VARCHAR 20)
- `course` (VARCHAR 50)
- `registration_date` (TIMESTAMP)

### Complaints Table
- `id` (VARCHAR 50, PRIMARY KEY)
- `student_id` (VARCHAR 50, FOREIGN KEY)
- `student_name` (VARCHAR 100)
- `student_email` (VARCHAR 100)
- `department` (VARCHAR 50)
- `year` (VARCHAR 20)
- `complaint_type` (VARCHAR 50)
- `subject` (VARCHAR 200)
- `description` (TEXT)
- `status` (VARCHAR 20)
- `faculty_response` (TEXT)
- `created_at` (TIMESTAMP)
- `responded_at` (TIMESTAMP)

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3000 | No |
| FACULTY_PASSWORD | Faculty login password | admin123 | Yes |
| NODE_ENV | Environment mode | development | No |
| DB_HOST | MySQL server host | localhost | Yes |
| DB_USER | MySQL username | root | Yes |
| DB_PASSWORD | MySQL password | - | Yes |
| DB_NAME | Database name | dmiher_complaints | Yes |
| ALLOWED_ORIGINS | CORS allowed origins | * | No |

## Security Considerations

1. **Change default passwords** in production
2. **Use HTTPS** in production (automatic on Railway/Render)
3. **Set strong `FACULTY_PASSWORD`**
4. **Use strong MySQL password**
5. **Configure CORS** for your domain
6. **Keep dependencies updated**: `npm audit fix`
7. **Backup database regularly**
8. **Use environment variables** - never hardcode credentials
9. **Enable MySQL SSL** in production
10. **Limit database user privileges**

## Backup and Restore

### Backup Database
```bash
mysqldump -u root -p dmiher_complaints > backup.sql
```

### Restore Database
```bash
mysql -u root -p dmiher_complaints < backup.sql
```

### Automated Backups (Railway)
Railway automatically backs up your database. You can restore from the dashboard.

## Troubleshooting

### Database Connection Failed
- Verify MySQL is running: `sudo systemctl status mysql`
- Check credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`
- Check firewall settings

### Port Already in Use
Change the PORT in `.env` file

### CORS Errors
Add your frontend domain to `ALLOWED_ORIGINS` in `.env`

### Tables Not Created
Check server logs. The app auto-creates tables on first run.

### Migration from JSON Files
See `DATABASE_SETUP.md` for migration script

## Performance Tips

1. **Connection Pooling** - Already implemented (10 connections)
2. **Indexes** - Already added on frequently queried columns
3. **Query Optimization** - Use EXPLAIN for slow queries
4. **Caching** - Consider Redis for session management
5. **CDN** - Use CDN for static assets in production

## Monitoring

### Railway
- Built-in metrics dashboard
- View logs in real-time
- Resource usage monitoring

### PM2 (VPS)
```bash
pm2 monit              # Real-time monitoring
pm2 logs               # View logs
pm2 restart all        # Restart app
```

## Support

For detailed database setup instructions, see `DATABASE_SETUP.md`

For issues:
1. Check server logs
2. Verify environment variables
3. Test database connection
4. Check MySQL error logs
