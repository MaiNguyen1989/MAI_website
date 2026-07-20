-- 02_secure_rls.sql
-- Thắt chặt chính sách Row Level Security (RLS) để bảo vệ thông tin
-- Chỉ cho phép người dùng được xác thực (authenticated) được quyền Admin.

-- 1. Bảo vệ bảng POSTS
DROP POLICY IF EXISTS "Allow admin manage posts" ON public.posts;
CREATE POLICY "Allow admin manage posts" ON public.posts
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Bảo vệ bảng QUESTIONS
DROP POLICY IF EXISTS "Allow admin manage questions" ON public.questions;
CREATE POLICY "Allow admin manage questions" ON public.questions
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Bảo vệ bảng LEADS
-- Thu hồi quyền Admin tự do của Anon key trên bảng Leads
DROP POLICY IF EXISTS "Allow admin manage leads" ON public.leads;
CREATE POLICY "Allow admin manage leads" ON public.leads
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Chú ý: Quyền thêm lead của khách làm test ("Allow public insert leads") vẫn được giữ nguyên ở migration 01.
