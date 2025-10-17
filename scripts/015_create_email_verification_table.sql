CREATE TABLE IF NOT EXISTS email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  verified_at TIMESTAMP,
  expires_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, email)
);

ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own verifications" ON email_verifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage verifications" ON email_verifications
  FOR ALL USING (auth.role() = 'service_role');
