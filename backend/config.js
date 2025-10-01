// Supabase Configuration
// Replace these with your actual Supabase project credentials
module.exports = {
    supabase: {
        url: process.env.SUPABASE_URL || 'https://bgjdwtuaeklpiczaevnq.supabase.co',
        anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnamR3dHVhZWtscGljemFldm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwODgyNjAsImV4cCI6MjA3NDY2NDI2MH0.tgl2sLqxKeeEO0QxOp7vU0rP4m5OIETA50NcVZtorVM',
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnamR3dHVhZWtscGljemFldm5xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA4ODI2MCwiZXhwIjoyMDc0NjY0MjYwfQ.Pm829jgRmbnde3jGjXG_0ZjjSdRVQG3XnupYgszQJfU'
    },
    server: {
        port: process.env.PORT || 3001,
        nodeEnv: process.env.NODE_ENV || 'development'
    }
};

