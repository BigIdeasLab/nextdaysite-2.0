-- USERS
-- Enable RLS on the users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to avoid conflicts
DROP POLICY IF EXISTS "Allow admins to manage users" ON public.users;

-- Create a policy for admins to manage all users
CREATE POLICY "Allow admins to manage users"
ON public.users
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- INVOICES
-- Enable RLS on the invoices table if not already enabled
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to avoid conflicts
DROP POLICY IF EXISTS "Allow admins to manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Allow users to read their own invoices" ON public.invoices;

-- Create a policy for admins to manage all invoices
CREATE POLICY "Allow admins to manage invoices"
ON public.invoices
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create a policy for users to read their own invoices
CREATE POLICY "Allow users to read their own invoices"
ON public.invoices
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


-- PLANS
-- RLS is already enabled on plans from 20251016210500_enable_rls_on_plans.sql

-- Drop existing policies if they exist, to avoid conflicts
DROP POLICY IF EXISTS "Allow admins to manage plans" ON public.plans;
DROP POLICY IF EXISTS "Allow read access to all users" ON public.plans;
DROP POLICY IF EXISTS "Allow users to read plans" ON public.plans; -- also drop this one to be safe


-- Create a policy for admins to manage all plans
CREATE POLICY "Allow admins to manage plans"
ON public.plans
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Recreate the policy for users to read all plans
CREATE POLICY "Allow read access to all users"
ON public.plans
FOR SELECT
TO anon, authenticated
USING (true);
