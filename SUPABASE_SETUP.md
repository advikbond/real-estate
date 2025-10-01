# Supabase Setup Guide for Real Estate Project Management

This guide will help you set up your Real Estate Project Management system with Supabase for hosting.

## Prerequisites

- Supabase account (free at [supabase.com](https://supabase.com))
- Node.js installed on your system
- Git (for deployment)

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [app.supabase.com](https://app.supabase.com)
   - Sign up or log in to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - Name: `real-estate-management`
     - Database Password: (generate a strong password)
     - Region: Choose closest to your users
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 1-2 minutes
   - You'll see a progress indicator

## Step 2: Get Supabase Credentials

1. **Go to Project Settings**
   - In your Supabase dashboard, click the gear icon (Settings)
   - Go to "API" section

2. **Copy Credentials**
   - **Project URL**: Copy the URL (looks like `https://xxxxx.supabase.co`)
   - **Anon Key**: Copy the `anon` `public` key
   - **Service Role Key**: Copy the `service_role` `secret` key

## Step 3: Configure Backend

1. **Update Configuration**
   ```bash
   cd backend
   ```

2. **Edit `config.js`**
   Replace the placeholder values with your actual Supabase credentials:
   ```javascript
   module.exports = {
       supabase: {
           url: 'https://your-project-id.supabase.co',
           anonKey: 'your-anon-key-here',
           serviceRoleKey: 'your-service-role-key-here'
       },
       server: {
           port: process.env.PORT || 3001,
           nodeEnv: process.env.NODE_ENV || 'production'
       }
   };
   ```

## Step 4: Set Up Database Schema

1. **Go to SQL Editor**
   - In Supabase dashboard, click "SQL Editor" in the left sidebar

2. **Run Database Setup**
   - Copy the contents of `backend/database-setup.sql`
   - Paste into the SQL Editor
   - Click "Run" to execute

3. **Run Storage Setup**
   - Copy the contents of `backend/storage-setup.sql`
   - Paste into the SQL Editor
   - Click "Run" to execute

## Step 5: Install Dependencies

```bash
cd backend
npm install
```

## Step 6: Test Locally

1. **Start Backend Server**
   ```bash
   npm start
   ```

2. **Test Connection**
   - Open browser to `http://localhost:3001/api/health`
   - You should see: `{"status":"OK","timestamp":"...","supabase":"configured"}`

3. **Test Frontend**
   - Open `index.html` in your browser
   - Try creating a project to test the full flow

## Step 7: Deploy Backend

### Option A: Deploy to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set Environment Variables**
   - In Railway dashboard, go to your project
   - Add environment variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_ANON_KEY`: Your Supabase anon key
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key

### Option B: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set SUPABASE_URL=your_supabase_url
   heroku config:set SUPABASE_ANON_KEY=your_anon_key
   heroku config:set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Option C: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd backend
   vercel
   ```

3. **Set Environment Variables**
   - In Vercel dashboard, go to your project settings
   - Add environment variables in the "Environment Variables" section

## Step 8: Deploy Frontend

### Option A: Deploy to Netlify

1. **Build for Production**
   - Zip your frontend files (index.html, styles.css, Assets folder)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your zip file
   - Update the API URL in `index.html` to point to your deployed backend

### Option B: Deploy to Vercel

1. **Create vercel.json**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "index.html",
         "use": "@vercel/static"
       }
     ]
   }
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## Step 9: Update Frontend API URL

After deploying your backend, update the frontend:

1. **Edit `index.html`**
   - Find the `API_BASE_URL` configuration
   - Replace `https://your-backend-domain.com/api` with your actual backend URL

2. **Redeploy Frontend**
   - Upload the updated files to your hosting platform

## Step 10: Configure Supabase Storage (Optional)

If you want to use Supabase Storage instead of local file storage:

1. **Go to Storage in Supabase Dashboard**
2. **Create Bucket**
   - Name: `media-files`
   - Public: Yes
3. **Update Backend Code**
   - Modify the file upload logic to use Supabase Storage
   - Update the `uploadMediaFiles` function in `server.js`

## Environment Variables Summary

### Backend Environment Variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

### Frontend Configuration:
- Update `API_BASE_URL` in `index.html` to point to your deployed backend

## Testing Your Deployment

1. **Health Check**
   - Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"OK","timestamp":"...","supabase":"configured"}`

2. **Create Project**
   - Use your frontend to create a new project
   - Check Supabase dashboard to see if data appears in the `projects` table

3. **Upload Files**
   - Try uploading photos/videos
   - Check if files appear in the `media_files` table

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Make sure your frontend URL is allowed in Supabase CORS settings
   - Check that your backend is properly configured

2. **Database Connection Issues**
   - Verify your Supabase credentials are correct
   - Check if the database schema was created properly

3. **File Upload Issues**
   - Check file size limits (10MB max)
   - Verify file type restrictions
   - Check storage permissions

4. **Environment Variables**
   - Make sure all environment variables are set correctly
   - Check for typos in variable names

### Getting Help:

- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Check your deployment platform's documentation
- Review server logs for error messages

## Security Considerations

1. **Row Level Security**: The database setup includes RLS policies
2. **API Keys**: Never expose service role keys in frontend code
3. **File Uploads**: Consider implementing file type and size validation
4. **Authentication**: Consider adding user authentication for production use

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure SSL certificates
3. Set up monitoring and logging
4. Implement user authentication
5. Add backup strategies
6. Set up CI/CD pipeline

Your Real Estate Project Management system is now ready for production use with Supabase!
