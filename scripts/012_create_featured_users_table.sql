-- scripts/012_create_featured_users_table.sql
CREATE TABLE featured_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    award_type VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_date TIMESTAMPTZ NOT NULL
);

-- Add RLS policy
ALTER TABLE featured_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view featured users"
ON featured_users
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage featured users"
ON featured_users
FOR ALL
USING ((
  SELECT
    EXISTS (
      SELECT
        1
      FROM
        admin_users
      WHERE
        admin_users.user_id = auth.uid ()
    )
) = TRUE)
WITH CHECK ((
  SELECT
    EXISTS (
      SELECT
        1
      FROM
        admin_users
      WHERE
        admin_users.user_id = auth.uid ()
    )
) = TRUE);