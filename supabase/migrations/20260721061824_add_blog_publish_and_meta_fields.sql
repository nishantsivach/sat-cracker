-- Migration: add_blog_publish_and_meta_fields
-- Adds publish control and SEO meta fields to blog_content

alter table blog_content add column if not exists is_published boolean not null default true;
alter table blog_content add column if not exists meta_title text;
alter table blog_content add column if not exists meta_description text;


drop policy if exists "Public read access" on blog_content;
create policy "Public read access" on blog_content for select using (is_published = true);
create policy "Admins can view all blog posts" on blog_content for select using (is_admin());