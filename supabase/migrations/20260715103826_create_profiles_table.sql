-- Migration: create_profiles_table
-- Phase 2 (Auth) foundation. One profile row per Supabase auth user,
-- created automatically on signup via a trigger.

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- Users can read and update only their own profile row.
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- No insert/delete policy for regular users — profile rows are created only
-- by the trigger below, never directly by the client.

-- Auto-create a profile row whenever a new user signs up (email or Google
-- OAuth both land here, since both create a row in auth.users).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();