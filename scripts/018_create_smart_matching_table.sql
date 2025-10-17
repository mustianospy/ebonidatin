CREATE TABLE IF NOT EXISTS smart_matching_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  compatibility_score DECIMAL(5,2) NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  interests_match INT DEFAULT 0,
  location_distance INT,
  age_compatibility INT DEFAULT 0,
  calculated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, match_id)
);

ALTER TABLE smart_matching_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their matches" ON smart_matching_scores
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = match_id);
