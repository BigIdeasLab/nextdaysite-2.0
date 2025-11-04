CREATE POLICY "Allow admins to manage plans"
ON public.plans
FOR ALL
TO authenticated
USING (public.is_admin());