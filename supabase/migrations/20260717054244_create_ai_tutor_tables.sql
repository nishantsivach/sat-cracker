-- Migration: create_ai_tutor_tables

create table if not exists ai_conversation (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New conversation',
  created_at timestamptz default now()
);

create table if not exists ai_message (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid not null references ai_conversation(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

alter table ai_conversation enable row level security;
alter table ai_message enable row level security;

create policy "Users can view their own conversations"
  on ai_conversation for select
  using (auth.uid() = user_id);

create policy "Users can create their own conversations"
  on ai_conversation for insert
  with check (auth.uid() = user_id);


create policy "Users can view messages in their own conversations"
  on ai_message for select
  using (
    exists (
      select 1 from ai_conversation
      where ai_conversation.id = ai_message.conversation_id
      and ai_conversation.user_id = auth.uid()
    )
  );

create policy "Users can insert messages in their own conversations"
  on ai_message for insert
  with check (
    exists (
      select 1 from ai_conversation
      where ai_conversation.id = ai_message.conversation_id
      and ai_conversation.user_id = auth.uid()
    )
  );