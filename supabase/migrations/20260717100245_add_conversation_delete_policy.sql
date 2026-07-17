-- Migration: add_conversation_delete_policy


create policy "Users can delete their own conversations"
  on ai_conversation for delete
  using (auth.uid() = user_id);