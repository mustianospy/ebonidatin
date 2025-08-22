-- Enable RLS on media_access table and create policies
ALTER TABLE media_access ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own media access records
CREATE POLICY "media_access_select_own" ON media_access
  FOR SELECT USING (auth.uid() = viewer_id OR auth.uid() = media_owner_id);

-- Allow users to insert media access records for their own content
CREATE POLICY "media_access_insert_own" ON media_access
  FOR INSERT WITH CHECK (auth.uid() = media_owner_id);

-- Allow users to update their own media access records
CREATE POLICY "media_access_update_own" ON media_access
  FOR UPDATE USING (auth.uid() = media_owner_id);

-- Allow users to delete their own media access records
CREATE POLICY "media_access_delete_own" ON media_access
  FOR DELETE USING (auth.uid() = media_owner_id);
