-- Migration: create_free_subscription_trigger

-- Creates a default Free subscription for every newly created auth.users record.

create or replace function public.create_default_subscription()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.subscription (
    user_id,
    plan,
    status,
    provider,
    cancel_at_period_end,
    current_period_end
  )
  values (
    new.id,
    'free',
    'active',
    'stub',
    false,
    null
  )
  on conflict (user_id) do nothing;

  insert into public.subscription_event (
    user_id,
    event_type,
    provider,
    raw_payload
  )
  values (
    new.id,
    'created',
    'stub',
    jsonb_build_object(
      'source', 'signup',
      'plan', 'free'
    )
  );

  return new;
end;
$$;

drop trigger if exists create_default_subscription_trigger
on auth.users;

create trigger create_default_subscription_trigger
after insert on auth.users
for each row
execute function public.create_default_subscription();