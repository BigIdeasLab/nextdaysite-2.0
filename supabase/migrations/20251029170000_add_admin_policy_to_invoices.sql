CREATE POLICY "Allow admins to manage invoices"
ON public.invoices
FOR ALL
TO authenticated
USING (public.is_admin());
