DROP POLICY "Allow authenticated users to insert contact submissions" ON public.contact_submissions;

CREATE POLICY "Allow public users to insert contact submissions"
ON public.contact_submissions FOR INSERT
TO public
WITH CHECK (true);