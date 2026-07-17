-- Migration: add_conversation_update_policy


create policy "Users can update their own conversations"
  on ai_conversation for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);