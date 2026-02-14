
-- Existing tables...

-- ホール管理テーブル
create table halls (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, name)
);

-- RLS policies for halls
alter table halls enable row level security;

create policy "Users can view their own halls"
  on halls for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own halls"
  on halls for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own halls"
  on halls for delete
  using ( auth.uid() = user_id );
