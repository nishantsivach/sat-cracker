create policy "Admins can view all profiles"
  on profiles for select
  using (is_admin());