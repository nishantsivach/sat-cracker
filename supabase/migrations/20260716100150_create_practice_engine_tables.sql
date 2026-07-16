
create table if not exists question (
  id uuid default gen_random_uuid() primary key,
  topic_id uuid references topic(id) on delete set null,
  section text not null check (section in ('math', 'reading-writing')),
  stem text not null,
  options jsonb not null,         
  correct_index int not null,     
  explanation text,
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  created_at timestamptz default now()
);


create table if not exists attempt (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references question(id) on delete cascade,
  mock_test_id uuid,
  selected_index int not null,
  is_correct boolean not null,
  time_taken_s int,
  created_at timestamptz default now()
);

alter table question enable row level security;
alter table attempt enable row level security;

-- The question bank is read broadly (needed to serve practice sets) —
-- correct_index and explanation being visible pre-answer is an accepted
-- tradeoff at this stage; a stricter version could hide them via a view.
create policy "Public read access" on question for select using (true);

create policy "Users can view their own attempts"
  on attempt for select
  using (auth.uid() = user_id);

create policy "Users can insert their own attempts"
  on attempt for insert
  with check (auth.uid() = user_id);

-- Sample questions — mirrors the dummy set currently hardcoded in
-- src/app/practice/page.tsx, so swapping that page to a real query is a
-- like-for-like replacement.
insert into question (topic_id, section, stem, options, correct_index, explanation, difficulty)
values
  (
    (select id from topic where name = 'Linear Equations' limit 1),
    'math',
    'If 3x + 7 = 22, what is the value of x?',
    '["3", "5", "7", "15"]',
    1,
    'Subtract 7 from both sides to get 3x = 15, then divide by 3 to get x = 5.',
    'easy'
  ),
  (
    null,
    'reading-writing',
    'Which sentence uses the semicolon correctly?',
    '["She studied hard; and passed the test.", "She studied hard; she passed the test.", "She studied hard, she passed the test.", "She studied; hard she passed the test."]',
    1,
    'A semicolon joins two independent clauses without a conjunction.',
    'medium'
  ),
  (
    (select id from topic where name = 'Linear Equations' limit 1),
    'math',
    'Solve for y: 2y - 4 = 10.',
    '["3", "5", "7", "14"]',
    2,
    'Add 4 to both sides to get 2y = 14, then divide by 2 to get y = 7.',
    'easy'
  );