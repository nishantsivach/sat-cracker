-- The existing "Public read access" policy on `course` only shows
-- is_published = true rows. Admins need to see drafts too, in a separate
-- policy (Postgres RLS OR's multiple select policies together).

create policy "Admins can view all courses"
  on course for select
  using (is_admin());