CREATE TABLE IF NOT EXISTS verified_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  verified_at TIMESTAMP NOT NULL DEFAULT NOW(),
  verification_type TEXT NOT NULL CHECK (verification_type IN ('email', 'phone', 'id', 'model')),
  verified_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE verified_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view verified status" ON verified_users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage verifications" ON verified_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role IN ('super_admin', 'moderator')
    )
  );
