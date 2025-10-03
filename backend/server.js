const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// Initialize Supabase client
const supabase = createClient(
    config.supabase.url,
    config.supabase.serviceRoleKey // Using service role key for server-side operations
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Allow images and videos
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'), false);
        }
    }
});

// Initialize database tables (run this once to create tables in Supabase)
async function initializeDatabase() {
    try {
        console.log('Checking Supabase connection...');
        
        // Test connection by creating a simple query
        const { data, error } = await supabase
            .from('projects')
            .select('count')
            .limit(1);
            
        if (error && error.code === 'PGRST116') {
            console.log('Tables do not exist yet. Please create them in Supabase dashboard.');
            console.log('Run the SQL commands from database-setup.sql file in your Supabase SQL editor.');
        } else if (error) {
            console.error('Supabase connection error:', error);
        } else {
            console.log('Supabase connected successfully!');
        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

// API Routes

app.get('/', (req, res) => {
    res.json({ 
        message: 'Real Estate Backend API is running!',
        endpoints: {
            health: '/api/health',
            projects: '/api/projects',
            createProject: 'POST /api/projects'
        }
    });
});

// Create new project
app.post('/api/projects', async (req, res) => {
    try {
        const { name } = req.body;
        const projectId = uuidv4();
        
        const { data, error } = await supabase
            .from('projects')
            .insert([
                {
                    id: projectId,
                    name: name,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ])
            .select();
            
        if (error) {
            throw error;
        }
        
        res.json({ 
            success: true, 
            projectId: projectId,
            data: data[0],
            message: 'Project created successfully' 
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add partners to project
app.post('/api/projects/:projectId/partners', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { partners, projectName } = req.body;
        
        const partnersData = partners.map(partner => ({
            id: uuidv4(),
            project_id: projectId,
            project_name: projectName || null,
            name: partner.name,
            type: partner.type,
            contact_number: partner.contact_number || null,
            email: partner.email || null,
            created_at: new Date().toISOString()
        }));
        
        console.log('Partners data being sent to Supabase:', JSON.stringify(partnersData, null, 2));
        
        const { data, error } = await supabase
            .from('partners')
            .insert(partnersData)
            .select();
            
        console.log('Supabase response:', { data, error });
            
        if (error) {
            throw error;
        }
        
        res.json({ 
            success: true, 
            data: data,
            message: 'Partners added successfully' 
        });
    } catch (error) {
        console.error('Error saving partners:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add brokerages to project
app.post('/api/projects/:projectId/brokerages', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { brokerages, projectName } = req.body;
        
        const brokeragesData = brokerages.map(brokerage => ({
            id: uuidv4(),
            project_id: projectId,
            project_name: projectName || null,
            name: brokerage.name,
            contact_number: brokerage.contact_number || null,
            email: brokerage.email || null,
            created_at: new Date().toISOString()
        }));
        
        const { data, error } = await supabase
            .from('brokerages')
            .insert(brokeragesData)
            .select();
            
        if (error) {
            throw error;
        }
        
        res.json({ 
            success: true, 
            data: data,
            message: 'Brokerages added successfully' 
        });
    } catch (error) {
        console.error('Error saving brokerages:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add agents to project
app.post('/api/projects/:projectId/agents', async (req, res) => {
    try {
        const { projectId } = req.params;
        const { agents, projectName } = req.body;
        
        const agentsData = agents.map(agent => ({
            id: uuidv4(),
            project_id: projectId,
            project_name: projectName || null,
            name: agent.name,
            contact_number: agent.contact_number || null,
            email: agent.email || null,
            created_at: new Date().toISOString()
        }));
        
        const { data, error } = await supabase
            .from('agents')
            .insert(agentsData)
            .select();
            
        if (error) {
            throw error;
        }
        
        res.json({ 
            success: true, 
            data: data,
            message: 'Agents added successfully' 
        });
    } catch (error) {
        console.error('Error saving agents:', error);
        res.status(500).json({ error: error.message });
    }
});

// Upload media files to Supabase Storage
app.post('/api/projects/:projectId/media', upload.array('files', 10), async (req, res) => {
    try {
        const { projectId } = req.params;
        const files = req.files;
        
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        
        const uploadedFiles = [];
        
        // Upload each file to Supabase Storage
        for (const file of files) {
            const fileName = `${projectId}/${file.filename}`;
            
            // Read file buffer
            const fileBuffer = fs.readFileSync(file.path);
            
            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('media-files')
                .upload(fileName, fileBuffer, {
                    contentType: file.mimetype,
                    upsert: false
                });
                
            if (uploadError) {
                console.error('Storage upload error:', uploadError);
                throw uploadError;
            }
            
            // Get public URL
            const { data: urlData } = supabase.storage
                .from('media-files')
                .getPublicUrl(fileName);
            
            // Save file info to database
            const mediaData = {
                id: uuidv4(),
                project_id: projectId,
                filename: file.filename,
                original_name: file.originalname,
                file_type: file.mimetype,
                file_size: file.size,
                file_path: uploadData.path,
                file_url: urlData.publicUrl,
                created_at: new Date().toISOString()
            };
            
            const { data: dbData, error: dbError } = await supabase
                .from('media_files')
                .insert([mediaData])
                .select();
                
            if (dbError) {
                throw dbError;
            }
            
            uploadedFiles.push({
                id: mediaData.id,
                filename: file.filename,
                originalName: file.originalname,
                type: file.mimetype,
                size: file.size,
                url: urlData.publicUrl
            });
            
            // Clean up local file
            fs.unlinkSync(file.path);
        }
        
        res.json({ 
            success: true, 
            message: 'Media files uploaded successfully',
            files: uploadedFiles
        });
    } catch (error) {
        console.error('Error uploading media files:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get project data
app.get('/api/projects/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        
        // Get project info
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
            
        if (projectError) {
            throw projectError;
        }
        
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // Get partners
        const { data: partners, error: partnersError } = await supabase
            .from('partners')
            .select('*')
            .eq('project_id', projectId);
            
        if (partnersError) {
            throw partnersError;
        }
        
        // Get brokerages
        const { data: brokerages, error: brokeragesError } = await supabase
            .from('brokerages')
            .select('*')
            .eq('project_id', projectId);
            
        if (brokeragesError) {
            throw brokeragesError;
        }
        
        // Get agents
        const { data: agents, error: agentsError } = await supabase
            .from('agents')
            .select('*')
            .eq('project_id', projectId);
            
        if (agentsError) {
            throw agentsError;
        }
        
        // Get media files
        const { data: mediaFiles, error: mediaError } = await supabase
            .from('media_files')
            .select('*')
            .eq('project_id', projectId);
            
        if (mediaError) {
            throw mediaError;
        }
        
        res.json({
            project,
            partners: partners || [],
            brokerages: brokerages || [],
            agents: agents || [],
            mediaFiles: mediaFiles || []
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) {
            throw error;
        }
        
        res.json(data || []);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        supabase: config.supabase.url !== 'your_supabase_project_url' ? 'configured' : 'not configured'
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large' });
        }
    }
    res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config.server.nodeEnv}`);
    console.log(`Supabase URL: ${config.supabase.url}`);
    
    // Initialize database
    await initializeDatabase();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit(0);
});
