-- Add author columns to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author_bio TEXT;

-- Create guest_requests table for guest post submissions
CREATE TABLE IF NOT EXISTS guest_requests (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  website TEXT,
  topic TEXT NOT NULL,
  outline TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on status for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_guest_requests_status ON guest_requests(status);
