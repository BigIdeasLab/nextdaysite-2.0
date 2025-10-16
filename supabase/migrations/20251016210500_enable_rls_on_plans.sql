-- Enable RLS on the plans table
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users (anonymous and authenticated)
CREATE POLICY "Allow read access to all users"
ON public.plans
FOR SELECT
TO anon, authenticated
USING (true);
