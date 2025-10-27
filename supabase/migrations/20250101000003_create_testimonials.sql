-- Create testimonials table
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  quote text not null,
  avatar_url text,
  avatar_id uuid,
  bg_color text default '#1A1A1A',
  border_color text default '#2B2B2B',
  text_color text default '#9A9EA2',
  rotate_class text default '-rotate-[6deg]',
  position_class text default 'left-0 top-[70px]',
  order_index integer default 0,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid,
  foreign key (avatar_id) references public.files(id) on delete set null,
  foreign key (created_by) references public.users(id) on delete set null
);

-- Create index for queries
create index idx_testimonials_published on public.testimonials(published);
create index idx_testimonials_order on public.testimonials(order_index);

-- Enable RLS
alter table public.testimonials enable row level security;

-- Create policies
create policy "Testimonials are viewable by everyone" on public.testimonials
  for select using (published = true or auth.uid() is not null);

create policy "Only authenticated users can insert testimonials" on public.testimonials
  for insert with check (auth.uid() is not null);

create policy "Users can update their own testimonials" on public.testimonials
  for update using (auth.uid() = created_by or auth.uid() is not null);

create policy "Users can delete their own testimonials" on public.testimonials
  for delete using (auth.uid() = created_by or auth.uid() is not null);
