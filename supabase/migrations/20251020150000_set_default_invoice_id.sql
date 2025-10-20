ALTER TABLE public.invoices
ALTER COLUMN id SET DEFAULT gen_random_uuid();
