alter table lesson drop column if exists video_uid;
alter table lesson add column if not exists video_path text;

insert into storage.buckets (id, name, public)
values ('lesson-videos', 'lesson-videos', true)
on conflict (id) do nothing;

create policy "Public read access" on storage.objects for select
  using (bucket_id = 'lesson-videos');

create policy "Admins can upload lesson videos" on storage.objects for insert
  with check (bucket_id = 'lesson-videos' and is_admin());

create policy "Admins can update lesson videos" on storage.objects for update
  using (bucket_id = 'lesson-videos' and is_admin());

create policy "Admins can delete lesson videos" on storage.objects for delete
  using (bucket_id = 'lesson-videos' and is_admin());