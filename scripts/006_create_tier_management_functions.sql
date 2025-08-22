-- Function to check if user's tier has expired
CREATE OR REPLACE FUNCTION check_tier_expiration()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update expired tiers back to Starter
  UPDATE profiles 
  SET tier = 'Starter', 
      tier_expires_at = NULL,
      updated_at = now()
  WHERE tier_expires_at IS NOT NULL 
    AND tier_expires_at < now()
    AND tier != 'Starter';
END;
$$;

-- Function to get tier permissions
CREATE OR REPLACE FUNCTION get_tier_permissions(user_tier text)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
  CASE user_tier
    WHEN 'Gold' THEN
      RETURN jsonb_build_object(
        'can_message', true,
        'can_view_premium_media', true,
        'can_voice_call', true,
        'can_video_call', true,
        'can_view_all_profiles', true
      );
    WHEN 'Silver' THEN
      RETURN jsonb_build_object(
        'can_message', true,
        'can_view_premium_media', true,
        'can_voice_call', true,
        'can_video_call', false,
        'can_view_all_profiles', true
      );
    WHEN 'Premium' THEN
      RETURN jsonb_build_object(
        'can_message', true,
        'can_view_premium_media', true,
        'can_voice_call', false,
        'can_video_call', false,
        'can_view_all_profiles', true
      );
    WHEN 'Advanced' THEN
      RETURN jsonb_build_object(
        'can_message', true,
        'can_view_premium_media', false,
        'can_voice_call', false,
        'can_video_call', false,
        'can_view_all_profiles', true
      );
    ELSE -- Starter
      RETURN jsonb_build_object(
        'can_message', false,
        'can_view_premium_media', false,
        'can_voice_call', false,
        'can_video_call', false,
        'can_view_all_profiles', false
      );
  END CASE;
END;
$$;
