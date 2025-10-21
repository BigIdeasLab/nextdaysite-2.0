ALTER TYPE public.project_status RENAME TO old_project_status;

CREATE TYPE public.project_status AS ENUM (
  'active',
  'inactive',
  'in_progress',
  'completed',
  'ready_to_ship',
  'shipped'
);

ALTER TABLE public.projects
ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.projects
ALTER COLUMN status TYPE public.project_status
USING CASE
  WHEN status::text = 'review' THEN 'active'::public.project_status
  WHEN status::text = 'paused' THEN 'inactive'::public.project_status
  WHEN status::text = 'cancelled' THEN 'inactive'::public.project_status
  ELSE status::text::public.project_status
END;

ALTER TABLE public.projects
ALTER COLUMN status SET DEFAULT 'inactive';

DROP TYPE public.old_project_status;
