create policy "Admins can view all mock tests"
  on mock_test for select
  using (is_admin());