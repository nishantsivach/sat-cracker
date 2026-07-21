alter table college
  add column if not exists is_published boolean not null default false;


drop policy if exists "Public read access" on college;

create policy "Public read access" on college for select using (is_published = true);
create policy "Admins can view all colleges" on college for select using (is_admin());
create policy "Admins can insert colleges" on college for insert with check (is_admin());
create policy "Admins can update colleges" on college for update using (is_admin());
create policy "Admins can delete colleges" on college for delete using (is_admin());