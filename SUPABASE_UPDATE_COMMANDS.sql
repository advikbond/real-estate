-- Run these commands in your Supabase SQL Editor to add the new columns

-- Add new columns to existing tables
ALTER TABLE partners ADD COLUMN IF NOT EXISTS project_name TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS contact_number TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE brokerages ADD COLUMN IF NOT EXISTS project_name TEXT;
ALTER TABLE brokerages ADD COLUMN IF NOT EXISTS contact_number TEXT;
ALTER TABLE brokerages ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE agents ADD COLUMN IF NOT EXISTS project_name TEXT;
ALTER TABLE agents ADD COLUMN IF NOT EXISTS contact_number TEXT;
ALTER TABLE agents ADD COLUMN IF NOT EXISTS email TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'partners' 
ORDER BY ordinal_position;

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'brokerages' 
ORDER BY ordinal_position;

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agents' 
ORDER BY ordinal_position;
