
ALTER TABLE public.logos
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_logos_updated_at
BEFORE UPDATE ON public.logos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
