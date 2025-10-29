
CREATE TABLE public.logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  width INTEGER,
  height INTEGER
);

ALTER TABLE public.logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to logos" ON public.logos
  FOR SELECT USING (true);

CREATE POLICY "Allow admin access to logos" ON public.logos
  FOR ALL USING (is_admin());
