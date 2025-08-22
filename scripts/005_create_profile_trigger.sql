-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    display_name, 
    age, 
    gender, 
    looking_for, 
    location, 
    bio,
    tier,
    tier_expires_at,
    is_verified,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'display_name', ''),
    COALESCE((new.raw_user_meta_data ->> 'age')::integer, 18),
    COALESCE(new.raw_user_meta_data ->> 'gender', ''),
    COALESCE(new.raw_user_meta_data ->> 'looking_for', ''),
    COALESCE(new.raw_user_meta_data ->> 'location', ''),
    COALESCE(new.raw_user_meta_data ->> 'bio', ''),
    'Starter',
    NULL,
    false,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
