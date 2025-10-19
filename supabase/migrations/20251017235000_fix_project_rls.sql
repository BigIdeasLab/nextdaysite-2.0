-- Enable RLS on the projects table if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Drop existing insert policy to recreate it with a more descriptive name
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;

-- POLICIES FOR AUTHENTICATED USERS
CREATE POLICY "Allow authenticated users to create projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Allow project owners to read their projects"
ON public.projects
FOR SELECT
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Allow project owners to update their projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- POLICIES FOR ADMINS
CREATE POLICY "Allow admins to read all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Allow admins to update all projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Allow admins to delete all projects"
ON public.projects
FOR DELETE
TO authenticated
USING (public.is_admin());
