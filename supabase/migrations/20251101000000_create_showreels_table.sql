CREATE TABLE public.showreels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at timestamp with time zone DEFAULT now(),
  title text,
  url text NOT NULL,
  is_active boolean DEFAULT TRUE
);

ALTER TABLE public.showreels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public showreels are viewable by everyone." ON public.showreels FOR SELECT USING (TRUE);

CREATE POLICY "Admins can insert showreels." ON public.showreels FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Admins can update showreels." ON public.showreels FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete showreels." ON public.showreels FOR DELETE USING (is_admin());
