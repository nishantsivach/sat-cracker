-- Migration: create_seo_content_tables



create table if not exists content_page (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('pillar', 'section', 'logistics', 'comparison', 'faq')),
  slug text not null unique,
  title text not null,
  meta_title text,
  meta_description text,
  intro text,
  body text,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

create table if not exists topic_guide (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  section text not null check (section in ('math', 'reading-writing')),
  summary text,
  meta_title text,
  meta_description text,
  body text,
  related_slugs text[] not null default '{}',
  updated_at timestamptz default now()
);

create table if not exists college (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  avg_sat_score int,
  sat_requirement_notes text,
  meta_title text,
  meta_description text,
  updated_at timestamptz default now()
);

alter table content_page enable row level security;
alter table topic_guide enable row level security;
alter table college enable row level security;

create policy "Public read access" on content_page for select using (true);
create policy "Public read access" on topic_guide for select using (true);
create policy "Public read access" on college for select using (true);


-- ===== content_page: pillar =====
insert into content_page (type, slug, title, meta_title, meta_description, intro, data) values (
  'pillar',
  'sat',
  'SAT Exam Guide 2026: Structure, Scoring, Dates & Prep Strategy',
  'SAT Exam Guide 2026 — Structure, Scoring, Dates & How to Prepare',
  'Everything you need to know about the SAT: test structure, scoring, registration dates, and a section-by-section prep strategy.',
  'The SAT is a standardized test used by U.S. colleges to evaluate applicants. It has two sections — Math, and Reading & Writing — each scored out of 800, for a combined score out of 1600.',
  '{
    "sections": [
      {"icon": "calculator", "title": "Math", "href": "/sat/math", "desc": "Algebra, problem-solving, data analysis, and advanced math."},
      {"icon": "book", "title": "Reading & Writing", "href": "/sat/reading-writing", "desc": "Comprehension, grammar, and evidence-based analysis."},
      {"icon": "calendar", "title": "Test Dates", "href": "/sat/dates", "desc": "Upcoming SAT test dates."},
      {"icon": "calendar", "title": "Registration", "href": "/sat/registration", "desc": "How to register for the SAT."},
      {"icon": "trophy", "title": "Scoring", "href": "/sat/scoring", "desc": "How the SAT is scored, section by section."},
      {"icon": "help", "title": "SAT vs ACT", "href": "/sat/vs-act", "desc": "Compare the SAT and ACT to pick the right test."},
      {"icon": "book", "title": "College Requirements", "href": "/sat/colleges/harvard-university", "desc": "SAT requirements and average scores by college."},
      {"icon": "help", "title": "FAQ", "href": "/sat/faq", "desc": "Common questions about the SAT, answered."}
    ],
    "topicLinks": [
      {"title": "Linear Equations", "href": "/topics/linear-equations"},
      {"title": "Punctuation Rules", "href": "/topics/punctuation-rules"}
    ]
  }'::jsonb
);

-- ===== content_page: sections =====
insert into content_page (type, slug, title, meta_title, meta_description, intro, data) values
(
  'section', 'math', 'SAT Math',
  'SAT Math Section Guide — Topics, Format & Practice',
  'A complete guide to the SAT Math section: format, topics tested, and how to prepare.',
  'The SAT Math section tests algebra, problem-solving and data analysis, and advanced math, split across calculator and non-calculator portions.',
  '{"icon": "calculator", "topics": [{"title": "Linear Equations", "href": "/topics/linear-equations"}]}'::jsonb
),
(
  'section', 'reading-writing', 'SAT Reading & Writing',
  'SAT Reading & Writing Section Guide — Topics, Format & Practice',
  'A complete guide to the SAT Reading & Writing section: format, topics tested, and how to prepare.',
  'The SAT Reading & Writing section tests comprehension, grammar, and evidence-based analysis through short passages.',
  '{"icon": "book", "topics": [{"title": "Punctuation Rules", "href": "/topics/punctuation-rules"}]}'::jsonb
);

-- ===== content_page: logistics =====
insert into content_page (type, slug, title, meta_title, meta_description, body) values
(
  'logistics', 'dates', 'SAT Test Dates 2026',
  'SAT Test Dates 2026 — Full Schedule',
  'Complete list of upcoming SAT test dates for 2026, with registration deadlines.',
  $$The SAT is offered multiple times a year, both in the U.S. and internationally.

Check the College Board's official calendar for exact 2026 dates, since they can shift slightly by region.

Register at least 4-6 weeks before your preferred date to guarantee a seat at your chosen test center.$$
),
(
  'logistics', 'registration', 'How to Register for the SAT',
  'SAT Registration Guide — Step by Step',
  'A step-by-step guide to registering for the SAT, including deadlines and fees.',
  $$Create a College Board account and choose a test date and center.

Upload a recent photo that meets the ID requirements.

Pay the registration fee online; fee waivers are available for eligible students.

Late registration and standby options exist but carry extra fees and no guaranteed seat.$$
),
(
  'logistics', 'scoring', 'How the SAT Is Scored',
  'SAT Scoring Explained — Sections & Total Score',
  'How SAT scoring works — section scores, total score range, and what a good score looks like.',
  $$The SAT has two sections — Math, and Reading & Writing — each scored from 200 to 800.

Your total score is the sum of both sections, ranging from 400 to 1600.

Scores are based on the number of questions answered correctly — there's no penalty for wrong answers.$$
);

-- ===== content_page: faq =====
insert into content_page (type, slug, title, meta_title, meta_description, data) values (
  'faq', 'faq', 'SAT FAQ — Common Questions Answered',
  'SAT FAQ: Registration, Scoring, Retakes & More',
  'Answers to the most common SAT questions — registration, scoring, retakes, and how to prepare.',
  '{
    "items": [
      {"q": "How is the SAT scored?", "a": "The SAT has two sections — Math, and Reading & Writing — each scored from 200 to 800, for a combined score of 400 to 1600."},
      {"q": "How many times can I retake the SAT?", "a": "There''s no official limit. Most students take it 1-2 times; colleges typically consider your highest score."},
      {"q": "When should I register for the SAT?", "a": "Register at least a month before your preferred test date, since seats and locations fill up early."},
      {"q": "Is a calculator allowed on the SAT Math section?", "a": "Yes — the current digital SAT allows a calculator (built-in or approved) for the entire Math section."}
    ]
  }'::jsonb
);

-- ===== content_page: comparison (SAT vs ACT) =====
insert into content_page (type, slug, title, meta_title, meta_description, intro, data) values (
  'comparison', 'vs-act', 'SAT vs ACT: Which Test Should You Take?',
  'SAT vs ACT: Which Test Is Right for You?',
  'Compare the SAT and ACT, including sections, timing, scoring, and key differences to choose the right college admission test.',
  'The SAT and ACT are both accepted college entrance exams. This guide compares their formats, scoring, sections, and helps you decide which test fits your strengths.',
  '{
    "comparisonTable": [
      {"feature": "Test Length", "sat": "2 hours 14 minutes", "act": "2 hours 55 minutes (without Writing)"},
      {"feature": "Sections", "sat": "Reading & Writing, Math", "act": "English, Math, Reading, Science"},
      {"feature": "Math", "sat": "Calculator allowed throughout", "act": "Calculator allowed (with restrictions)"},
      {"feature": "Science Section", "sat": "No separate Science section", "act": "Includes Science reasoning section"},
      {"feature": "Scoring", "sat": "400\u20131600", "act": "1\u201336 composite score"}
    ],
    "keyDifferences": [
      "SAT focuses more on reasoning and problem-solving skills.",
      "ACT includes a dedicated Science section.",
      "SAT gives more time per question compared to ACT.",
      "Both exams are accepted by colleges across the United States."
    ],
    "chooseSat": ["Prefer a shorter test", "Like calculator access throughout Math", "Prefer more time per question"],
    "chooseAct": ["Work well under time pressure", "Prefer science-based questions", "Like a traditional test format"],
    "faqs": [
      {"q": "Is the SAT easier than the ACT?", "a": "Neither test is universally easier. Students who prefer more time per question may prefer the SAT, while students comfortable with fast-paced sections may prefer the ACT."},
      {"q": "Do colleges prefer the SAT or ACT?", "a": "Most colleges accept both tests equally. Students should choose the exam that best matches their strengths."},
      {"q": "Should I take both SAT and ACT?", "a": "Taking practice tests for both exams can help determine which test format works better for you."}
    ]
  }'::jsonb
);

-- ===== college =====
insert into college (slug, name, avg_sat_score, sat_requirement_notes, meta_title, meta_description) values
(
  'harvard-university', 'Harvard University', 1520,
  'Harvard is test-optional, but admitted students who submit scores average around 1520. A strong SAT score can meaningfully strengthen an application.',
  'Harvard University SAT Requirements & Average Score',
  'Harvard''s SAT policy, average admitted SAT score, and what score range makes you a competitive applicant.'
),
(
  'university-of-michigan', 'University of Michigan', 1435,
  'University of Michigan is test-optional. Admitted students who submit scores typically average around 1435.',
  'University of Michigan SAT Requirements & Average Score',
  'University of Michigan''s SAT policy, average admitted SAT score, and how it factors into admissions.'
);

-- ===== topic_guide =====
insert into topic_guide (slug, name, section, summary, meta_title, meta_description, body, related_slugs) values
(
  'linear-equations', 'Linear Equations', 'math',
  'How to identify, set up, and solve linear equations on the SAT Math section.',
  'SAT Linear Equations: Formulas, Examples & Practice',
  'Master SAT linear equations — key formulas, worked examples, and common mistakes to avoid.',
  $$A linear equation is any equation that can be written in the form **ax + b = c**, where the variable appears only to the first power.

## Key steps to solve
1. Combine like terms on each side.
2. Move variable terms to one side, constants to the other.
3. Divide by the coefficient of the variable.

## Example
Solve **2x + 3 = 7**:
- Subtract 3 from both sides: 2x = 4
- Divide by 2: x = 2

## Common mistakes
- Forgetting to distribute a negative sign across parentheses.
- Flipping the inequality sign incorrectly (for linear inequalities).$$,
  array['punctuation-rules']
),
(
  'punctuation-rules', 'Punctuation Rules', 'reading-writing',
  'The comma, semicolon, and colon rules the SAT tests most often.',
  'SAT Punctuation Rules: Commas, Semicolons & Colons',
  'A quick-reference guide to the SAT''s most commonly tested punctuation rules, with examples.',
  $$The SAT Reading & Writing section tests a small, predictable set of punctuation rules.

## Commas
Use a comma before a coordinating conjunction (FANBOYS) joining two independent clauses.

## Semicolons
A semicolon joins two independent clauses without a conjunction.

## Colons
A colon introduces a list or explanation, and must follow a complete independent clause.$$,
  array['linear-equations']
);