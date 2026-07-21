-- Admins can create SEO pages
create policy "Admins can insert content pages"
on content_page
for insert
to authenticated
with check (is_admin());

-- Admins can update SEO pages
create policy "Admins can update content pages"
on content_page
for update
to authenticated
using (is_admin())
with check (is_admin());

-- Admins can delete SEO pages
create policy "Admins can delete content pages"
on content_page
for delete
to authenticated
using (is_admin());