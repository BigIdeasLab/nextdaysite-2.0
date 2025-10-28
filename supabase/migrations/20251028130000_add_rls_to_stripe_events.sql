ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admins to view stripe events" ON public.stripe_events
FOR SELECT
TO authenticated
USING (public.is_admin());
