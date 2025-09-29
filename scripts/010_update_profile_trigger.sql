-- Update the profile creation trigger to include new fields
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
    country,
    city,
    phone_number,
    date_of_birth,
    address,
    terms_accepted,
    terms_accepted_at,
    email_verified,
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
    COALESCE(new.raw_user_meta_data ->> 'country', ''),
    COALESCE(new.raw_user_meta_data ->> 'city', ''),
    COALESCE(new.raw_user_meta_data ->> 'phone_number', ''),
    COALESCE((new.raw_user_meta_data ->> 'date_of_birth')::date, NULL),
    COALESCE(new.raw_user_meta_data ->> 'address', ''),
    COALESCE((new.raw_user_meta_data ->> 'terms_accepted')::boolean, FALSE),
    COALESCE((new.raw_user_meta_data ->> 'terms_accepted_at')::timestamp with time zone, NULL),
    COALESCE(new.email_confirmed_at IS NOT NULL, FALSE),
    'Starter',
    NULL,
    false,
    now(),
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    email_verified = COALESCE(EXCLUDED.email_verified, profiles.email_verified),
    updated_at = now();

  RETURN new;
END;
$$;
