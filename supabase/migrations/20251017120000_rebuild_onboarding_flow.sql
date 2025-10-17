-- Alter the onboarding_steps table to match the new structure
ALTER TABLE public.onboarding_steps
  RENAME COLUMN step_name TO step_id;

ALTER TABLE public.onboarding_steps
  RENAME COLUMN question_key TO stored_key;

ALTER TABLE public.onboarding_steps
  DROP COLUMN responses;

ALTER TABLE public.onboarding_steps
  ADD COLUMN next_step_id TEXT,
  ADD COLUMN is_first_step BOOLEAN DEFAULT FALSE,
  ADD COLUMN is_last_step BOOLEAN DEFAULT FALSE;

-- Clear any old data
TRUNCATE public.onboarding_steps;

-- Insert the new, updated onboarding steps
INSERT INTO public.onboarding_steps (step_id, message, stored_key, next_step_id, is_first_step, is_last_step)
VALUES
  ('start', 'Welcome to NextDaySite! I can help you scope out your new website. To start, what should we call your project?', 'projectTitle', 'ask_type', TRUE, FALSE),
  ('ask_type', 'Got it. Now, what type of project do you need? A new website, a brand identity, or a complete package?', 'projectType', 'ask_hosting', FALSE, FALSE),
  ('ask_hosting', 'Great. Will you need hosting for your site? We offer a fully managed solution.', 'hosting', 'ask_brand_style', FALSE, FALSE),
  ('ask_brand_style', 'What style of branding or aesthetic are you looking for? (e.g., modern, minimalist, playful)', 'brandStyle', 'ask_goals', FALSE, FALSE),
  ('ask_goals', 'Understood. What are the main goals you want to achieve with this project?', 'projectGoals', 'ask_audience', FALSE, FALSE),
  ('ask_audience', 'Who is the target audience for this project?', 'targetAudience', 'ask_industry', FALSE, FALSE),
  ('ask_industry', 'What industry or niche will this project be for?', 'industry', 'ask_pages', FALSE, FALSE),
  ('ask_pages', 'Roughly how many pages do you estimate the site will need?', 'pageCount', 'ask_budget', FALSE, FALSE),
  ('ask_budget', 'What is your estimated budget for this project?', 'budget', 'review_summary', FALSE, FALSE),
  ('review_summary', 'Thanks! Here’s a summary of your project details. Does everything look correct?', NULL, 'ask_ready', FALSE, FALSE),
  ('ask_ready', 'Are you ready to proceed, or would you like some more guidance?', 'userIntent', 'finish', FALSE, FALSE),
  ('if_need_help', 'No problem. We can help with planning, design, and development. Our goal is to make this process as smooth as possible for you. When you are ready, just say so!', NULL, 'finish', FALSE, FALSE),
  ('finish', 'Excellent! To save your project and move to the next step, please sign up or log in.', 'confirmation', NULL, FALSE, TRUE);

-- Add new columns to the projects table for the updated onboarding flow
ALTER TABLE public.projects
  ADD COLUMN project_title TEXT,
  ADD COLUMN hosting TEXT,
  ADD COLUMN brand_style TEXT,
  ADD COLUMN project_goals TEXT,
  ADD COLUMN target_audience TEXT,
  ADD COLUMN industry TEXT,
  ADD COLUMN ai_inferred_plan TEXT,
  ADD COLUMN ai_inferred_payment_type TEXT;

-- Remove the old branding column
ALTER TABLE public.projects
  DROP COLUMN branding;
