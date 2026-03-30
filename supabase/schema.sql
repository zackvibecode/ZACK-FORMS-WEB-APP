-- =============================================
-- ZACK FORMS — SUPABASE DATABASE SCHEMA
-- Copy & paste semua ni dalam Supabase SQL Editor
-- =============================================

-- FORMS TABLE
create table if not exists forms (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'Untitled Form',
  description text default '',
  fields jsonb default '[]'::jsonb,
  whatsapp_number text default '',
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SUBMISSIONS TABLE
create table if not exists submissions (
  id uuid default gen_random_uuid() primary key,
  form_id uuid references forms(id) on delete cascade not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

-- ROW LEVEL SECURITY
alter table forms enable row level security;
alter table submissions enable row level security;

-- POLICIES — FORMS
create policy "Users can view their own forms"
  on forms for select using (auth.uid() = user_id);

create policy "Users can create forms"
  on forms for insert with check (auth.uid() = user_id);

create policy "Users can update their own forms"
  on forms for update using (auth.uid() = user_id);

create policy "Users can delete their own forms"
  on forms for delete using (auth.uid() = user_id);

-- POLICIES — SUBMISSIONS
create policy "Anyone can submit to a published form"
  on submissions for insert with check (
    exists (
      select 1 from forms
      where id = form_id and is_published = true
    )
  );

create policy "Form owners can view submissions"
  on submissions for select using (
    exists (
      select 1 from forms
      where id = form_id and user_id = auth.uid()
    )
  );

-- PUBLIC READ for form rendering (needed for /f/[formId] page)
create policy "Anyone can view published forms"
  on forms for select using (is_published = true);
