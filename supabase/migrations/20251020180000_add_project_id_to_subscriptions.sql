ALTER TABLE public.subscriptions
ADD COLUMN project_id uuid REFERENCES public.projects(id);
