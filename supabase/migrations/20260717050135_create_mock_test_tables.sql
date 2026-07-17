-- Migration: create_mock_test_tables

create table if not exists mock_test (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  duration_minutes int not null,
  is_published boolean not null default true,
  created_at timestamptz default now()
);


create table if not exists mock_test_question (
  id uuid default gen_random_uuid() primary key,
  mock_test_id uuid not null references mock_test(id) on delete cascade,
  question_id uuid not null references question(id) on delete cascade,
  "order" int not null default 0,
  unique (mock_test_id, question_id)
);

create table if not exists result (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  mock_test_id uuid not null references mock_test(id) on delete cascade,
  score int not null,               
  total_questions int not null,
  section_breakdown jsonb not null, 
  created_at timestamptz default now()
);


alter table attempt
  add constraint attempt_mock_test_id_fkey
  foreign key (mock_test_id) references mock_test(id) on delete set null;

alter table mock_test enable row level security;
alter table mock_test_question enable row level security;
alter table result enable row level security;


create policy "Public read access" on mock_test for select using (is_published = true);
create policy "Public read access" on mock_test_question for select using (true);

create policy "Users can view their own results"
  on result for select
  using (auth.uid() = user_id);

create policy "Users can insert their own results"
  on result for insert
  with check (auth.uid() = user_id);


with new_test as (
  insert into mock_test (title, duration_minutes)
  values ('SAT Practice Test 1', 15)
  returning id
)
insert into mock_test_question (mock_test_id, question_id, "order")
select new_test.id, question.id, row_number() over (order by question.created_at)
from new_test, question;