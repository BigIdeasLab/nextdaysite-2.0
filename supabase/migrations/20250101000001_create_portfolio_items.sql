-- Create portfolio_items table for featured works
create table if not exists public.portfolio_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  slug text unique not null,
  image_url text,
  image_id uuid,
  color text default 'var(--placeholder-gray)',
  order_index integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid,
  foreign key (image_id) references public.files(id) on delete set null,
  foreign key (created_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_portfolio_items_published on public.portfolio_items(published);
create index idx_portfolio_items_order on public.portfolio_items(order_index);
create index idx_portfolio_items_slug on public.portfolio_items(slug);

-- Enable RLS
alter table public.portfolio_items enable row level security;

-- Create policies
create policy "Portfolio items are viewable by everyone" on public.portfolio_items
  for select using (published = true or auth.uid() is not null);

create policy "Only authenticated users can insert portfolio items" on public.portfolio_items
  for insert with check (auth.uid() is not null);

create policy "Users can update their own portfolio items" on public.portfolio_items
  for update using (auth.uid() = created_by or auth.uid() is not null);

create policy "Users can delete their own portfolio items" on public.portfolio_items
  for delete using (auth.uid() = created_by or auth.uid() is not null);
