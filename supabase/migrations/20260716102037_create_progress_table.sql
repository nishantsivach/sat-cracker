-- whenever a new attempt is recorded — the dashboard reads this table
-- directly instead of aggregating over all attempt rows on every load.

create table if not exists progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references topic(id) on delete cascade,
  attempts_count int not null default 0,
  correct_count int not null default 0,
  accuracy numeric(5,2) not null default 0,
  last_practiced_at timestamptz,
  unique (user_id, topic_id)
);

alter table progress enable row level security;

-- Users can only ever read their own progress. There is deliberately no
-- insert/update policy for the authenticated role — the only writer is the
-- trigger function below, which runs as security definer.
create policy "Users can view their own progress"
  on progress for select
  using (auth.uid() = user_id);

create or replace function public.handle_new_attempt()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_topic_id uuid;
begin
  select topic_id into v_topic_id from question where id = new.question_id;

  -- Some questions (e.g. ones not yet mapped to a lesson topic) have a null
  -- topic_id — skip progress tracking for those rather than erroring.
  if v_topic_id is null then
    return new;
  end if;

  insert into progress (user_id, topic_id, attempts_count, correct_count, accuracy, last_practiced_at)
  values (
    new.user_id,
    v_topic_id,
    1,
    case when new.is_correct then 1 else 0 end,
    case when new.is_correct then 100 else 0 end,
    now()
  )
  on conflict (user_id, topic_id) do update set
    attempts_count = progress.attempts_count + 1,
    correct_count = progress.correct_count + case when new.is_correct then 1 else 0 end,
    accuracy = round(
      100.0 * (progress.correct_count + case when new.is_correct then 1 else 0 end)
      / (progress.attempts_count + 1),
      2
    ),
    last_practiced_at = now();

  return new;
end;
$$;

create trigger on_attempt_created
  after insert on attempt
  for each row execute function public.handle_new_attempt();