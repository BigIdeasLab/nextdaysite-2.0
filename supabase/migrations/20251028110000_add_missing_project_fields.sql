ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_title TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS main_goal TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS target_audience TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS key_features TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS reference_websites TEXT;