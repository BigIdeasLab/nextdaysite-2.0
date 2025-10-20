ALTER TYPE public.project_status RENAME TO old_project_status;

CREATE TYPE public.project_status AS ENUM (
  'active',
  'inactive',
  'in_progress',
  'review',
  'completed',
  'paused',
  'cancelled'
);

ALTER TABLE public.projects
ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.projects
ALTER COLUMN status TYPE public.project_status
USING CASE
  WHEN status::text = 'start' THEN 'inactive'::public.project_status
  WHEN status::text = 'ready_to_ship' THEN 'completed'::public.project_status
  WHEN status::text = 'shipped' THEN 'completed'::public.project_status
  ELSE status::text::public.project_status
END;

ALTER TABLE public.projects
ALTER COLUMN status SET DEFAULT 'inactive';

DROP TYPE public.old_project_status;
