CREATE POLICY "Users can read their own user data" 
ON public.users FOR SELECT
USING (auth.uid() = id);
