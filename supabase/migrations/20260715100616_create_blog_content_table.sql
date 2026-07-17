-- Migration: create_blog_content_table
-- Creates the blog_content table matching the fields the code already expects
-- (title, slug, content, created_at) plus a primary key.

create table if not exists blog_content (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  created_at timestamptz default now()
);

-- Blog content is public — anyone (including logged-out visitors) should be
-- able to read it, so we enable RLS and add an explicit public-read policy
-- rather than leaving RLS off entirely.
alter table blog_content enable row level security;

create policy "Public read access"
  on blog_content
  for select
  using (true);

-- One sample row so /blogs and /blogs/[slug] can be verified end-to-end
-- before real posts are written.
insert into blog_content (title, slug, content) values (
  'How to Prepare for the SAT in 3 Months',
  'how-to-prepare-for-sat-in-3-months',
  'A focused 3-month SAT prep plan starts with a diagnostic test to identify your weak areas. Spend the first month on foundational concepts in Math and Reading & Writing, the second month on targeted practice for your weakest topics, and the final month on full-length timed mock tests to build stamina and pacing. Consistency matters more than long study sessions — aim for 45-60 focused minutes daily rather than occasional 4-hour cram sessions.'
)
on conflict (slug) do nothing;