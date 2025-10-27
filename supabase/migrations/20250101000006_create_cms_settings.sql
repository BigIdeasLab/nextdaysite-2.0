-- Create cms_settings table for global CMS configuration
create table if not exists public.cms_settings (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value jsonb not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by uuid,
  foreign key (updated_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_cms_settings_key on public.cms_settings(key);

-- Enable RLS
alter table public.cms_settings enable row level security;

-- Create policies
create policy "CMS settings are viewable by everyone" on public.cms_settings
  for select using (true);

create policy "Only authenticated users can update CMS settings" on public.cms_settings
  for update using (auth.uid() is not null);

-- Insert default settings
insert into public.cms_settings (key, value, description) values
  ('site_title', '"NextDaySite 2.0"', 'Main site title'),
  ('site_description', '"AI-powered website and brand creation delivered in 24–48 hours"', 'Main site description'),
  ('hero_title', '"Own a Stunning Website Without Lifting a Finger"', 'Homepage hero title'),
  ('hero_subtitle', '"Get a professional website built and designed specifically for you in 24-48 hours, powered by AI."', 'Homepage hero subtitle'),
  ('featured_works_title', '"Our Featured Work"', 'Featured works section title'),
  ('services_title', '"Our Services"', 'Services section title'),
  ('testimonials_title', '"What Our Clients Say"', 'Testimonials section title')
on conflict (key) do nothing;
