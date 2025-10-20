ALTER TABLE public.projects
ADD COLUMN plan_id uuid REFERENCES public.plans(id);
