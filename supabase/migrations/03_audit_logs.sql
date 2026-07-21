-- 03_audit_logs.sql
-- Tạo bảng AUDIT LOGS để ghi vết các hành động quản trị (Admin Actions Audit Trail)

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    user_email TEXT,
    action TEXT NOT NULL,          -- Ví dụ: 'DELETE_LEAD', 'CREATE_POST', 'UPDATE_POST', 'LOGIN'
    target_table TEXT,             -- Ví dụ: 'leads', 'posts'
    target_id TEXT,                -- ID của record được thao tác
    details JSONB,                 -- Chi tiết dữ liệu hoặc thay đổi
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt Row Level Security (RLS) cho audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Thắt chặt RLS: Chỉ người dùng đã xác thực (Authenticated Admins) mới có quyền đọc và tạo nhật ký
CREATE POLICY "Allow authenticated admin read audit logs" ON public.audit_logs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated admin insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated WITH CHECK (true);
