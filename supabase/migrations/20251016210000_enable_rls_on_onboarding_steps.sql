-- Enable RLS on the onboarding_steps table
ALTER TABLE public.onboarding_steps ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users (anonymous and authenticated)
CREATE POLICY "Allow read access to all users"
ON public.onboarding_steps
FOR SELECT
TO anon, authenticated
USING (true);
