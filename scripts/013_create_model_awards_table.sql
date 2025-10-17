-- Create model_awards table for tracking model achievements
CREATE TABLE IF NOT EXISTS model_awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  award_type TEXT NOT NULL, -- 'model_of_day', 'model_of_week', 'model_of_month', 'top_liked', 'rising_star'
  award_date DATE NOT NULL,
  total_likes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, award_type, award_date)
);

-- Enable Row Level Security
ALTER TABLE model_awards ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view awards
CREATE POLICY "Anyone can view model awards"
  ON model_awards FOR SELECT
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_model_awards_user_id ON model_awards(user_id);
CREATE INDEX IF NOT EXISTS idx_model_awards_award_type ON model_awards(award_type);
CREATE INDEX IF NOT EXISTS idx_model_awards_date ON model_awards(award_date DESC);
