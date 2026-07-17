create table if not exists course (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  is_published boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists module (
  id uuid default gen_random_uuid() primary key,
  course_id uuid not null references course(id) on delete cascade,
  title text not null,
  "order" int not null default 0
);

create table if not exists lesson (
  id uuid default gen_random_uuid() primary key,
  module_id uuid not null references module(id) on delete cascade,
  title text not null,
  content text,
  free_preview boolean not null default false,
  "order" int not null default 0
);

create table if not exists topic (
  id uuid default gen_random_uuid() primary key,
  lesson_id uuid not null references lesson(id) on delete cascade,
  name text not null,
  section text not null check (section in ('math', 'reading-writing'))
);

alter table course enable row level security;
alter table module enable row level security;
alter table lesson enable row level security;
alter table topic enable row level security;

create policy "Public read access" on course for select using (is_published = true);
create policy "Public read access" on module for select using (true);
create policy "Public read access" on lesson for select using (true);
create policy "Public read access" on topic for select using (true);

-- One sample course, populated end-to-end, for testing the catalog and
-- lesson pages before real content is authored.
with new_course as (
  insert into course (title, slug, description)
  values (
    'SAT Math Foundations',
    'sat-math-foundations',
    'Build a solid foundation in the math concepts tested most often on the SAT.'
  )
  returning id
),
new_module as (
  insert into module (course_id, title, "order")
  select id, 'Algebra Basics', 1 from new_course
  returning id
),
new_lesson as (
  insert into lesson (module_id, title, content, free_preview, "order")
  select
    id,
    'Solving Linear Equations',
    'A linear equation can be solved by isolating the variable on one side. Start by combining like terms, then use inverse operations to move constants to the other side, and finally divide by the coefficient of the variable.',
    true,
    1
  from new_module
  returning id
)
insert into topic (lesson_id, name, section)
select id, 'Linear Equations', 'math' from new_lesson;