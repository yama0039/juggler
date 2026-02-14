# ジャグラー攻略サイト (GOGO! Analyzer)

ジャグラーの設定判別、データ保存、収支管理を行うためのWebアプリケーションです。

## 機能

- **設定判別**: 回転数、BIG、REG、ブドウ回数から設定を推測。
- **データ保存**: 稼働データを詳細（単独/チェリー重複ボーナスなど）に記録。
- **履歴・収支**: 過去のデータをリスト表示し、収支推移をグラフ化。

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseの設定

データの保存にはSupabaseを使用します。

1. [Supabase](https://supabase.com/) で新規プロジェクトを作成します。
2. SQLエディタで `src/lib/schema.sql` の内容を実行し、テーブルを作成します。
3. プロジェクトの `.env` ファイルを作成し、SupabaseのURLとキーを設定します。

`.env.example` をコピーして `.env` を作成してください：

```bash
cp .env.example .env
```

`.env` ファイルを開き、値を設定します：

```env
VITE_SUPABASE_URL=あなたのSupabaseプロジェクトURL
VITE_SUPABASE_ANON_KEY=あなたのSupabase Anon Key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

## 技術スタック

- React (Vite)
- TypeScript
- Tailwind CSS
- Supabase (Database, Auth)
- Recharts (Graph)
- Lucide React (Icons)
