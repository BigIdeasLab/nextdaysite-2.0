CREATE POLICY "Allow admins to select contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (is_admin());
