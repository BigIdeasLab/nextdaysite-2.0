-- Create pages table
create table if not exists public.pages (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  meta_title text,
  meta_description text,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  hero_image_id uuid,
  content jsonb,
  published boolean default true,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid,
  foreign key (hero_image_id) references public.files(id) on delete set null,
  foreign key (created_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_pages_slug on public.pages(slug);
create index idx_pages_published on public.pages(published);

-- Enable RLS
alter table public.pages enable row level security;

-- Create policies
create policy "Pages are viewable by everyone when published" on public.pages
  for select using (published = true or auth.uid() is not null);

create policy "Only authenticated users can insert pages" on public.pages
  for insert with check (auth.uid() is not null);

create policy "Users can update their own pages" on public.pages
  for update using (auth.uid() = created_by or auth.uid() is not null);

create policy "Users can delete their own pages" on public.pages
  for delete using (auth.uid() = created_by or auth.uid() is not null);
