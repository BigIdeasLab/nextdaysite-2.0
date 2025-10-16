-- Add hosting boolean to the plans table
ALTER TABLE public.plans
ADD COLUMN hosting BOOLEAN DEFAULT FALSE;

-- Add comment for clarity
COMMENT ON COLUMN public.plans.hosting IS 'Indicates if a hosting option is available for this plan.';
