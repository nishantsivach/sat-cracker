-- Migration: enforce_is_published_on_content_tables
-- is_published was added to content_page, topic_guide, and college earlier,


drop policy if exists "Public read access" on content_page;
create policy "Public read access" on content_page for select using (is_published = true);
create policy "Admins can view all content pages" on content_page for select using (is_admin());
