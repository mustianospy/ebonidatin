-- Add new registration fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_country ON profiles(country);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_profiles_email_verified ON profiles(email_verified);

-- Add comment for documentation
COMMENT ON COLUMN profiles.country IS 'User country of residence';
COMMENT ON COLUMN profiles.city IS 'User city of residence';
COMMENT ON COLUMN profiles.phone_number IS 'User mobile/phone number';
COMMENT ON COLUMN profiles.date_of_birth IS 'User date of birth for age verification';
COMMENT ON COLUMN profiles.address IS 'User full address';
COMMENT ON COLUMN profiles.terms_accepted IS 'Whether user accepted terms and privacy policy';
COMMENT ON COLUMN profiles.terms_accepted_at IS 'Timestamp when user accepted terms';
COMMENT ON COLUMN profiles.email_verified IS 'Whether user email has been verified';
