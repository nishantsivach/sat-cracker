-- Migration: create_subscription_system
-- provider-agnostic subscription state. `provider` and
-- `provider_subscription_id` let this same table serve a stub checkout now
-- and a real Stripe/Razorpay integration later without a schema change.

create table if not exists subscription (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'premium_monthly', 'premium_yearly')),
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'expired')),
  cancel_at_period_end boolean not null default false,
  current_period_end timestamptz,
  provider text not null default 'stub' check (provider in ('stub', 'stripe', 'razorpay')),
  provider_customer_id text,
  provider_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Append-only audit trail. The stub checkout writes here today; a real
-- provider's webhooks will write the exact same shape later — event_type
-- and raw_payload are deliberately generic rather than provider-specific.
create table if not exists subscription_event (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (
    event_type in ('created', 'renewed', 'canceled', 'payment_failed', 'expired', 'reactivated')
  ),
  provider text not null default 'stub',
  raw_payload jsonb not null default '{}',
  created_at timestamptz default now()
);

-- Mirrors is_admin() — lets gating checks (in RLS policies or app code)
-- ask "does this user currently have premium access" in one place, rather
-- than every caller re-deriving it from plan/status/current_period_end.
create or replace function public.is_premium(check_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from subscription
    where user_id = check_user_id
      and plan <> 'free'
      and status in ('active', 'past_due')
      and (current_period_end is null or current_period_end > now())
  );
$$;

alter table subscription enable row level security;
alter table subscription_event enable row level security;


create policy "Users can view their own subscription"
  on subscription for select
  using (auth.uid() = user_id or is_admin());

create policy "Users can create their own subscription"
  on subscription for insert
  with check (auth.uid() = user_id or is_admin());

create policy "Users can update their own subscription"
  on subscription for update
  using (auth.uid() = user_id or is_admin());

create policy "Admins can delete subscriptions"
  on subscription for delete
  using (is_admin());

create policy "Users can view their own subscription events"
  on subscription_event for select
  using (auth.uid() = user_id or is_admin());

create policy "Users can log their own subscription events"
  on subscription_event for insert
  with check (auth.uid() = user_id or is_admin());

-- Mock tests: "selected tests remain free, premium unlocks all".
alter table mock_test add column if not exists is_premium boolean not null default false;