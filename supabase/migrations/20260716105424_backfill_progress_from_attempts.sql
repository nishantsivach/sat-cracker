-- Migration: backfill_progress_from_attempts
-- One-time fix: the progress trigger only fires on attempts inserted AFTER
-- it was created. Attempts made during earlier testing (before this trigger
-- existed) were saved in `attempt` but never reflected in `progress`. This
-- recomputes `progress` from scratch using every existing attempt row, so
-- historical data is included going forward. Safe to run once; running it
-- again is harmless since it fully recalculates rather than incrementing.

truncate table progress;

insert into progress (user_id, topic_id, attempts_count, correct_count, accuracy, last_practiced_at)
select
  a.user_id,
  q.topic_id,
  count(*) as attempts_count,
  sum(case when a.is_correct then 1 else 0 end) as correct_count,
  round(100.0 * sum(case when a.is_correct then 1 else 0 end) / count(*), 2) as accuracy,
  max(a.created_at) as last_practiced_at
from attempt a
join question q on q.id = a.question_id
where q.topic_id is not null
group by a.user_id, q.topic_id;