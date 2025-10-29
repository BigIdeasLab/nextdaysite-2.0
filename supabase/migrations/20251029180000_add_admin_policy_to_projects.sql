CREATE POLICY "Allow admins to manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (public.is_admin());
