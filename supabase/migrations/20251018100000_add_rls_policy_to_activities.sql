-- Enable RLS on the activities table
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR ADMINS
CREATE POLICY "Allow admins to perform all actions on activities"
ON public.activities
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- POLICIES FOR AUTHENTICATED USERS
CREATE POLICY "Allow users to view activities for their own projects"
ON public.activities
FOR SELECT
TO authenticated
USING (project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid()));

CREATE POLICY "Allow users to insert activities for their own projects"
ON public.activities
FOR INSERT
TO authenticated
WITH CHECK (project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid()));
