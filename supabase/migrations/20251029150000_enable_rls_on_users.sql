-- Enable Row Level Security on the users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop all existing user policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can read users" ON public.users;
DROP POLICY IF EXISTS "Admins manage users" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
DROP POLICY IF EXISTS "Users can read their own user data" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users manageable by service role" ON public.users;
DROP POLICY IF EXISTS "Users readable to anon" ON public.users;
DROP POLICY IF EXISTS "Users can manage their own data" ON public.users;
DROP POLICY IF EXISTS "Allow service_role to do everything" ON public.users;


-- Create a new, comprehensive policy that allows users to manage their own data
CREATE POLICY "Users can manage their own data"
ON public.users
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add back a policy to allow service_role (backend) to do anything
CREATE POLICY "Allow service_role to do everything"
ON public.users
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
