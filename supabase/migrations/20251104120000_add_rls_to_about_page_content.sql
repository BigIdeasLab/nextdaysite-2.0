-- Enable RLS on the about_page_content table
ALTER TABLE public.about_page_content ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to avoid conflicts
DROP POLICY IF EXISTS "Allow read access to all users" ON public.about_page_content;
DROP POLICY IF EXISTS "Allow admins to manage about page content" ON public.about_page_content;

-- Create a policy for admins to manage all about page content
CREATE POLICY "Allow admins to manage about page content"
ON public.about_page_content
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create a policy for users to read all about page content
CREATE POLICY "Allow read access to all users"
ON public.about_page_content
FOR SELECT
TO anon, authenticated
USING (true);
