-- Add hosting price columns to the plans table
ALTER TABLE public.plans
ADD COLUMN hosting_monthly_price NUMERIC DEFAULT 0,
ADD COLUMN hosting_yearly_price NUMERIC DEFAULT 0;

-- Add comments for clarity
COMMENT ON COLUMN public.plans.hosting_monthly_price IS 'The additional monthly price for hosting, if applicable.';
COMMENT ON COLUMN public.plans.hosting_yearly_price IS 'The additional yearly price for hosting, if applicable.';
