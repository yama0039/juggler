
-- juggler_records テーブルの作成
create table public.juggler_records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date not null,
  hall_name text not null,
  machine_type text not null,
  machine_number integer,
  
  -- カウンター詳細
  total_spins integer not null default 0,
  
  -- BIGボーナス詳細
  isolated_big integer default 0, -- 単独BIG
  cherry_big integer default 0,   -- チェリーBIG
  
  -- REGボーナス詳細
  isolated_reg integer default 0, -- 単独REG
  cherry_reg integer default 0,   -- チェリーREG
  
  -- 小役
  grape integer default 0,        -- ぶどう
  non_overlapping_cherry integer default 0, -- 非重複チェリー
  
  -- 収支
  investment integer not null default 0, -- 投資枚数
  recovery integer not null default 0,   -- 回収枚数
  
  memo text
);

-- RLS (Row Level Security) の有効化
alter table public.juggler_records enable row level security;

-- ポリシー作成: 自分のデータのみ参照可能
create policy "Users can view their own records"
  on public.juggler_records for select
  using (auth.uid() = user_id);

-- ポリシー作成: 自分のデータのみ挿入可能
create policy "Users can insert their own records"
  on public.juggler_records for insert
  with check (auth.uid() = user_id);

-- ポリシー作成: 自分のデータのみ更新可能
create policy "Users can update their own records"
  on public.juggler_records for update
  using (auth.uid() = user_id);

-- ポリシー作成: 自分のデータのみ削除可能
create policy "Users can delete their own records"
  on public.juggler_records for delete
  using (auth.uid() = user_id);
