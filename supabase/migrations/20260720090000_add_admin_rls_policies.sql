-- Migration: add_admin_rls_policies
-- Adds an is_admin() helper and admin-only write policies to every content
-- table that currently only has "public read". Nothing here changes read
-- access — students still read the same rows the same way.

-- SECURITY DEFINER so this can be called from RLS policies (which run as
-- the requesting user, who doesn't have permission to read other users'
-- profile rows without this).
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- course / module / lesson / topic
create policy "Admins can insert courses" on course for insert with check (is_admin());
create policy "Admins can update courses" on course for update using (is_admin());
create policy "Admins can delete courses" on course for delete using (is_admin());

create policy "Admins can insert modules" on module for insert with check (is_admin());
create policy "Admins can update modules" on module for update using (is_admin());
create policy "Admins can delete modules" on module for delete using (is_admin());

create policy "Admins can insert lessons" on lesson for insert with check (is_admin());
create policy "Admins can update lessons" on lesson for update using (is_admin());
create policy "Admins can delete lessons" on lesson for delete using (is_admin());

create policy "Admins can insert topics" on topic for insert with check (is_admin());
create policy "Admins can update topics" on topic for update using (is_admin());
create policy "Admins can delete topics" on topic for delete using (is_admin());

-- question bank
create policy "Admins can insert questions" on question for insert with check (is_admin());
create policy "Admins can update questions" on question for update using (is_admin());
create policy "Admins can delete questions" on question for delete using (is_admin());

-- mock tests
create policy "Admins can insert mock tests" on mock_test for insert with check (is_admin());
create policy "Admins can update mock tests" on mock_test for update using (is_admin());
create policy "Admins can delete mock tests" on mock_test for delete using (is_admin());

create policy "Admins can insert mock test questions" on mock_test_question for insert with check (is_admin());
create policy "Admins can update mock test questions" on mock_test_question for update using (is_admin());
create policy "Admins can delete mock test questions" on mock_test_question for delete using (is_admin());

-- blog
create policy "Admins can insert blog posts" on blog_content for insert with check (is_admin());
create policy "Admins can update blog posts" on blog_content for update using (is_admin());
create policy "Admins can delete blog posts" on blog_content for delete using (is_admin());