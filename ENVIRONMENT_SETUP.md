# Environment Setup Guide

## Overview
This guide explains how to set up environment variables for the Tanavi Properties application while keeping sensitive information secure.

## .env Files Configuration

### 🔒 **Security Notice**
All `.env` files are now properly ignored by git to prevent sensitive information from being committed to the repository.

### 📁 **File Structure**
```
Tanavi-Properties-main/
├── .gitignore                    # Root gitignore
├── admin-portal/
│   ├── .env.example             # Template for admin portal env
│   ├── .env                     # Your actual env (ignored by git)
│   └── .gitignore               # Admin portal gitignore
├── frontend/
│   ├── .env.example             # Template for frontend env
│   ├── .env                     # Your actual env (ignored by git)
│   └── .gitignore               # Frontend gitignore
└── backend/
    ├── .env.example             # Template for backend env
    ├── .env                     # Your actual env (ignored by git)
    └── .gitignore               # Backend gitignore
```

## Setup Instructions

### 1. **Admin Portal Environment**
Copy the example file and customize:
```bash
cp admin-portal/.env.example admin-portal/.env
```

**admin-portal/.env:**
```env
REACT_APP_API_URL=http://localhost:5000
PORT=3001
```

### 2. **Frontend Environment**
Copy the example file and customize:
```bash
cp frontend/.env.example frontend/.env
```

**frontend/.env:**
```env
REACT_APP_API_URL=http://localhost:5000
```

### 3. **Backend Environment**
Copy the example file and customize:
```bash
cp backend/.env.example backend/.env
```

**backend/.env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tanavi_properties_local
JWT_SECRET=your_jwt_secret_key_change_in_production
ADMIN_SECRET_KEY=tanavi-admin-2024

# For production, use your actual URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Cloudinary configuration (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email configuration (for OTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=Your App Name <your_email@gmail.com>
```

## Environment Configurations

### 🏠 **Local Development**
- **Database**: Use local MongoDB or separate dev database
- **API URLs**: http://localhost:5000
- **Ports**: Backend (5000), Frontend (3000), Admin (3001)

### 🚀 **Production**
- **Database**: Production MongoDB cluster
- **API URLs**: Your actual domain URLs
- **Ports**: As configured by hosting service
- **Security**: Strong JWT secrets, secure email credentials

## Database Setup Options

### Option 1: Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/tanavi_properties_local
```

### Option 2: Separate Development Database
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tanavi_properties_dev
```

### Option 3: Production Database (NOT RECOMMENDED for local dev)
```env
# DON'T USE THIS FOR LOCAL DEVELOPMENT
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tanavi_properties
```

## Security Best Practices

### ✅ **Do's**
- ✅ Use `.env.example` files as templates
- ✅ Keep actual `.env` files local only
- ✅ Use separate databases for dev/staging/production
- ✅ Use strong, unique JWT secrets
- ✅ Use app passwords for email (not regular passwords)
- ✅ Regularly rotate secrets and keys

### ❌ **Don'ts**
- ❌ Never commit `.env` files to git
- ❌ Don't use production database for local development
- ❌ Don't share `.env` files via email or chat
- ❌ Don't use weak or default secrets
- ❌ Don't hardcode sensitive values in source code

## Git Configuration

### .gitignore Files Updated
All `.gitignore` files have been updated to ignore:
- `.env`
- `.env.*` (all env variants)
- `!.env.example` (except example files)

### If .env Files Were Previously Tracked
If you're working with a git repository and `.env` files were previously committed:

```bash
# Remove from git tracking (keeps local files)
git rm --cached admin-portal/.env
git rm --cached frontend/.env
git rm --cached backend/.env

# Commit the removal
git add .gitignore
git commit -m "Remove .env files from tracking and update .gitignore"
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check if `REACT_APP_API_URL` matches backend port
   - Ensure backend server is running
   - Verify CORS settings in backend

2. **Database Connection Error**
   - Check MongoDB URI format
   - Ensure database server is running
   - Verify network connectivity

3. **Email OTP Not Working**
   - Check email credentials
   - Use app passwords for Gmail
   - Verify SMTP settings

4. **Image Upload Issues**
   - Check Cloudinary credentials
   - Verify API keys are correct
   - Ensure proper permissions

### Environment Validation
Add this to your application startup to validate environment variables:

```javascript
// backend/validateEnv.js
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'ADMIN_SECRET_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});
```

## Team Setup

### For New Team Members
1. Clone the repository
2. Copy all `.env.example` files to `.env`
3. Update with appropriate values for your environment
4. Install dependencies and start development

### For Production Deployment
1. Set up environment variables in hosting platform
2. Use production database and API URLs
3. Configure proper CORS origins
4. Set up monitoring and logging

## Support
If you encounter issues with environment setup:
1. Check this documentation first
2. Verify all required variables are set
3. Test with minimal configuration
4. Check application logs for specific errors