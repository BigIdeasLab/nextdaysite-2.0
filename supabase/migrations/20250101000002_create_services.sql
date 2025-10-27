-- Create services table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  slug text unique not null,
  image1_url text,
  image1_id uuid,
  image2_url text,
  image2_id uuid,
  icon text,
  order_index integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid,
  foreign key (image1_id) references public.files(id) on delete set null,
  foreign key (image2_id) references public.files(id) on delete set null,
  foreign key (created_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_services_published on public.services(published);
create index idx_services_order on public.services(order_index);
create index idx_services_slug on public.services(slug);

-- Enable RLS
alter table public.services enable row level security;

-- Create policies
create policy "Services are viewable by everyone" on public.services
  for select using (published = true or auth.uid() is not null);

create policy "Only authenticated users can insert services" on public.services
  for insert with check (auth.uid() is not null);

create policy "Users can update their own services" on public.services
  for update using (auth.uid() = created_by or auth.uid() is not null);

create policy "Users can delete their own services" on public.services
  for delete using (auth.uid() = created_by or auth.uid() is not null);
