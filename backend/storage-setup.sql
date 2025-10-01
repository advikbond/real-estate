-- Supabase Storage Setup for File Uploads
-- Run these commands in your Supabase SQL Editor

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-files', 'media-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public access to media files
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'media-files');

-- Create policy for public upload (no authentication required)
CREATE POLICY "Public upload access" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'media-files');

-- Create policy for public update access
CREATE POLICY "Public update access" ON storage.objects 
FOR UPDATE USING (bucket_id = 'media-files');

-- Create policy for public delete access
CREATE POLICY "Public delete access" ON storage.objects 
FOR DELETE USING (bucket_id = 'media-files');
