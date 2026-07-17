-- Migration: add_conversation_updated_at


alter table ai_conversation
  add column if not exists updated_at timestamptz not null default now();

update ai_conversation c
set updated_at = coalesce(
  (select max(m.created_at) from ai_message m where m.conversation_id = c.id),
  c.created_at
);