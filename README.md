# Real Estate Project Management System

A full-stack web application for managing real estate projects with Supabase database integration, ready for hosting and deployment.

## Features

- **Project Creation**: Create and manage real estate projects
- **Partner Management**: Add and select project partners
- **Brokerage Management**: Add and select brokerages
- **Agent Management**: Add and select agents
- **Media Upload**: Upload photos and videos with preview functionality
- **Database Integration**: All data is saved to Supabase PostgreSQL database
- **File Management**: Secure file upload and storage
- **Production Ready**: Configured for hosting and deployment

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design with modern UI components
- File upload with preview functionality
- Canvas-based image marking tools

### Backend
- Node.js with Express.js
- Supabase (PostgreSQL database)
- Multer for file uploads
- RESTful API endpoints
- Production-ready configuration

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Supabase account (free at [supabase.com](https://supabase.com))
- npm (Node Package Manager)

### For Hosting Setup

**Follow the detailed setup guide**: See `SUPABASE_SETUP.md` for complete instructions.

### Quick Local Development

1. **Set up Supabase** (see SUPABASE_SETUP.md for details)
2. **Configure backend**
   ```bash
   cd backend
   npm install
   # Edit config.js with your Supabase credentials
   npm start
   ```
3. **Open frontend**
   - Open `index.html` in your web browser

### Running in Development Mode

```bash
cd backend
npm run dev
```

## API Endpoints

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID

### Partners
- `POST /api/projects/:projectId/partners` - Add partners to project

### Brokerages
- `POST /api/projects/:projectId/brokerages` - Add brokerages to project

### Agents
- `POST /api/projects/:projectId/agents` - Add agents to project

### Media Files
- `POST /api/projects/:projectId/media` - Upload media files

## Database Schema (Supabase PostgreSQL)

### Projects Table
- `id` (UUID PRIMARY KEY)
- `name` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

### Partners Table
- `id` (UUID PRIMARY KEY)
- `project_id` (UUID FOREIGN KEY)
- `name` (TEXT NOT NULL)
- `type` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)

### Brokerages Table
- `id` (UUID PRIMARY KEY)
- `project_id` (UUID FOREIGN KEY)
- `name` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)

### Agents Table
- `id` (UUID PRIMARY KEY)
- `project_id` (UUID FOREIGN KEY)
- `name` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)

### Media Files Table
- `id` (UUID PRIMARY KEY)
- `project_id` (UUID FOREIGN KEY)
- `filename` (TEXT NOT NULL)
- `original_name` (TEXT NOT NULL)
- `file_type` (TEXT NOT NULL)
- `file_size` (BIGINT)
- `file_path` (TEXT NOT NULL)
- `created_at` (TIMESTAMP WITH TIME ZONE)

## File Structure

```
Real-estate-2/
├── index.html              # Main frontend file
├── styles.css              # CSS styles
├── Assets/                 # Static assets (images, icons)
├── backend/
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Main server file
│   ├── config.js           # Supabase configuration
│   ├── database-setup.sql  # Database schema setup
│   ├── storage-setup.sql   # Storage configuration
│   └── uploads/            # File upload directory (created automatically)
├── SUPABASE_SETUP.md       # Detailed Supabase setup guide
└── README.md               # This file
```

## Usage Flow

1. **Create Project**: Enter project name
2. **Select Partners**: Choose from available partners
3. **Select Brokerages**: Choose from available brokerages
4. **Select Agents**: Choose from available agents
5. **Upload Media**: Upload photos and videos with preview
6. **Site Layout**: Upload and mark site layout (future feature)

## Data Persistence

All data is automatically saved to the Supabase PostgreSQL database:
- Project information is saved when created
- Partners are saved when moving to brokerage screen
- Brokerages are saved when moving to agent screen
- Agents are saved when moving to photos/videos screen
- Media files are uploaded and saved when selected

## Hosting & Deployment

This application is configured for production hosting:

### Backend Deployment Options:
- **Railway**: Easy deployment with automatic scaling
- **Heroku**: Popular platform with add-ons
- **Vercel**: Serverless functions support
- **DigitalOcean**: Full control VPS deployment

### Frontend Deployment Options:
- **Netlify**: Drag-and-drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting for static sites

### Database:
- **Supabase**: Managed PostgreSQL with real-time features
- **Automatic backups** and scaling
- **Built-in authentication** (ready for future use)

## Error Handling

The application includes comprehensive error handling:
- Database connection errors
- File upload errors
- API request failures
- User input validation

## Future Enhancements

- Site layout marking functionality
- Project listing and management
- User authentication
- Advanced file management
- Export functionality
- Mobile app integration

## Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if Node.js is installed
   - Run `npm install` in backend directory
   - Check if port 3001 is available

2. **File uploads failing**
   - Check uploads directory permissions
   - Verify file size limits (10MB max)
   - Check file type restrictions (images and videos only)

3. **Database errors**
   - Check if SQLite is properly installed
   - Verify database file permissions
   - Check for concurrent access issues

### Support

For issues or questions, check the console logs for detailed error messages and ensure all dependencies are properly installed.
