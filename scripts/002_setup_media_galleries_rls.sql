-- Enable RLS on media_galleries table and create policies
ALTER TABLE media_galleries ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own media
CREATE POLICY "media_galleries_select_own" ON media_galleries
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own media
CREATE POLICY "media_galleries_insert_own" ON media_galleries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own media
CREATE POLICY "media_galleries_update_own" ON media_galleries
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own media
CREATE POLICY "media_galleries_delete_own" ON media_galleries
  FOR DELETE USING (auth.uid() = user_id);

-- Allow users to view non-premium media from others
CREATE POLICY "media_galleries_select_public" ON media_galleries
  FOR SELECT USING (is_premium = false);
