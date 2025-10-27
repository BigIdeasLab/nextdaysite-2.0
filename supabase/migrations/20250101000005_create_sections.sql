-- Create sections table
create table if not exists public.sections (
  id uuid default gen_random_uuid() primary key,
  page_id uuid not null,
  name text not null,
  section_type text not null, -- 'hero', 'featured-works', 'services', 'testimonials', 'cta', 'custom'
  order_index integer default 0,
  content jsonb,
  settings jsonb, -- styling, layout options
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid,
  foreign key (page_id) references public.pages(id) on delete cascade,
  foreign key (created_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_sections_page_id on public.sections(page_id);
create index idx_sections_order on public.sections(order_index);
create index idx_sections_type on public.sections(section_type);

-- Enable RLS
alter table public.sections enable row level security;

-- Create policies
create policy "Sections are viewable by everyone when published" on public.sections
  for select using (published = true or auth.uid() is not null);

create policy "Only authenticated users can insert sections" on public.sections
  for insert with check (auth.uid() is not null);

create policy "Users can update their own sections" on public.sections
  for update using (auth.uid() = created_by or auth.uid() is not null);

create policy "Users can delete their own sections" on public.sections
  for delete using (auth.uid() = created_by or auth.uid() is not null);
