-- Enable RLS on payments table and create policies
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own payments
CREATE POLICY "payments_select_own" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own payments
CREATE POLICY "payments_insert_own" ON payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own payments
CREATE POLICY "payments_update_own" ON payments
  FOR UPDATE USING (auth.uid() = user_id);
