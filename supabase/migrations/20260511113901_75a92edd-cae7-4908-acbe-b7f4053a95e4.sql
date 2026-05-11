-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  phone text,
  district text,
  village text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Products (farm produce posts)
create table public.products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  price_rwf integer,
  unit text default 'kg',
  image_url text,
  district text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are viewable by everyone"
  on public.products for select using (true);

create policy "Users can insert own products"
  on public.products for insert with check (auth.uid() = owner_id);

create policy "Users can update own products"
  on public.products for update using (auth.uid() = owner_id);

create policy "Users can delete own products"
  on public.products for delete using (auth.uid() = owner_id);

create index products_owner_idx on public.products(owner_id);
create index products_created_idx on public.products(created_at desc);

-- updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated before update on public.profiles
  for each row execute function public.update_updated_at_column();
create trigger products_updated before update on public.products
  for each row execute function public.update_updated_at_column();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  uname text;
begin
  uname := coalesce(
    new.raw_user_meta_data->>'username',
    'user_' || substr(new.id::text, 1, 8)
  );
  insert into public.profiles (id, username, display_name, phone, district, village)
  values (
    new.id,
    uname,
    coalesce(new.raw_user_meta_data->>'display_name', uname),
    new.phone,
    new.raw_user_meta_data->>'district',
    new.raw_user_meta_data->>'village'
  )
  on conflict (id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket for product photos
insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', true)
on conflict (id) do nothing;

create policy "Product photos are publicly viewable"
  on storage.objects for select using (bucket_id = 'product-photos');

create policy "Users can upload own product photos"
  on storage.objects for insert
  with check (bucket_id = 'product-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update own product photos"
  on storage.objects for update
  using (bucket_id = 'product-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own product photos"
  on storage.objects for delete
  using (bucket_id = 'product-photos' and auth.uid()::text = (storage.foldername(name))[1]);
