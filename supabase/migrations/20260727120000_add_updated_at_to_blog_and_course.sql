-- Add updated_at to blog_content
ALTER TABLE blog_content
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

UPDATE blog_content
SET updated_at = created_at
WHERE updated_at IS NULL;

-- Add updated_at to course
ALTER TABLE course
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

UPDATE course
SET updated_at = created_at
WHERE updated_at IS NULL;