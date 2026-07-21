-- Migration: update_topic_guide_table
-- topic_guide already exists. This adds what's missing:
-- is_published, and a join table replacing related_slugs (text[]).
-- related_slugs itself is NOT dropped here — see the follow-up migration,
-- run only after confirming the backfill below produced correct rows.

alter table topic_guide
  add column if not exists is_published boolean not null default false;

create table if not exists topic_guide_related (
  id uuid default gen_random_uuid() primary key,
  topic_guide_id uuid not null references topic_guide(id) on delete cascade,
  related_topic_guide_id uuid not null references topic_guide(id) on delete cascade,
  unique (topic_guide_id, related_topic_guide_id),
  check (topic_guide_id <> related_topic_guide_id)
);

alter table topic_guide enable row level security;
alter table topic_guide_related enable row level security;


do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'topic_guide' and policyname = 'Public read access') then
    create policy "Public read access" on topic_guide for select using (is_published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'topic_guide' and policyname = 'Admins can view all topic guides') then
    create policy "Admins can view all topic guides" on topic_guide for select using (is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename = 'topic_guide' and policyname = 'Admins can insert topic guides') then
    create policy "Admins can insert topic guides" on topic_guide for insert with check (is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename = 'topic_guide' and policyname = 'Admins can update topic guides') then
    create policy "Admins can update topic guides" on topic_guide for update using (is_admin());
  end if;
  if not exists (select 1 from pg_policies where tablename = 'topic_guide' and policyname = 'Admins can delete topic guides') then
    create policy "Admins can delete topic guides" on topic_guide for delete using (is_admin());
  end if;
end $$;

create policy "Public read access" on topic_guide_related for select using (true);
create policy "Admins can insert topic guide relations" on topic_guide_related for insert with check (is_admin());
create policy "Admins can delete topic guide relations" on topic_guide_related for delete using (is_admin());


insert into topic_guide_related (topic_guide_id, related_topic_guide_id)
select tg.id, r.id
from topic_guide tg
cross join lateral unnest(tg.related_slugs) as rs(slug)
join topic_guide r on r.slug = rs.slug
where tg.id <> r.id
on conflict (topic_guide_id, related_topic_guide_id) do nothing;