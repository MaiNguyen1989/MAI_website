# 🛡️ BÁO CÁO & SECURITY CHECKLIST 4 LỚP — MAI INSTITUTE WEBSITE

*Thời gian kiểm định: 21/07/2026*  
*Quy chuẩn áp dụng: OWASP Top 10, Next.js Security Best Practices, Luật Bảo vệ Dữ liệu Cá nhân (Luật 91/2025/QH15 & Nghị định 13/2023/NĐ-CP).*

---

## 📊 TỔNG QUAN KẾT QUẢ AUDIT

- **Điểm tổng kết**: **15 / 15** (100%)
- **Trạng thái**: ✅ **ĐÃ ĐẠT CHUẨN — SẴN SÀNG GO LIVE**

---

## 🔒 PHASE 1: BẢO MẬT BÊN TRONG (CODE & DATA)
- [x] **1. .env trong .gitignore**: Đã cấu hình bỏ qua `.env`, `.env*.local`, `.env.production` trong `.gitignore`.
- [x] **2. Public Prefix Security**: Không lộ secret keys bí mật với prefix `NEXT_PUBLIC_` (chỉ công khai Supabase URL và Anon Key).
- [x] **3. Không lộ Hardcoded Secrets**: Đã quét toàn bộ dự án, không có API key hay mật khẩu bí mật dán trực tiếp trong mã nguồn.
- [x] **4. Clean Console.log**: Đã kiểm tra các log, không ghi vết dữ liệu nhạy cảm hay mật khẩu của người dùng.
- [x] **5. Tối ưu Query (.select(...))**: Đã thay thế toàn bộ các truy vấn `.select('*')` bằng việc liệt kê rõ ràng tên cột (`id, title, category, type, summary, content, image, created_at`) giúp tăng tốc độ tải và ngăn rò rỉ trường mới.

---

## 🛡️ PHASE 2: BẢO MẬT BÊN NGOÀI (CONFIG & HEADERS)
- [x] **1. Security Headers trong next.config.js & Middleware**:
  - `X-Frame-Options: DENY` (Ngăn chặn tấn công Clickjacking)
  - `X-Content-Type-Options: nosniff` (Chống MIME-type Sniffing)
  - `Strict-Transport-Security` (Bắt buộc HTTPS 1 năm với subdomains)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy` (CSP hỗ trợ Supabase, Google Fonts, Unsplash)
- [x] **2. Rate Limiting Middleware (`src/middleware.ts`)**: Đã thiết lập giới hạn 60 request/phút theo IP để ngăn ngừa các đợt tấn công Spam / Brute Force / DDoS.
- [x] **3. Kiểm soát CORS & Auth**: Sử dụng Supabase Row Level Security (RLS) thắt chặt quyền quản trị chỉ dành cho tài khoản `authenticated`.
- [x] **4. Chống Spam Form Submit**: Tất cả các Form (`BookingModal`, `DiagnosePage`) đều có trạng thái `isSubmitting` vô hiệu hóa nút bấm ngay sau khi click.

---

## 🔄 PHASE 3: PHỤC HỒI & LOGGING
- [x] **1. Audit Logs Schema (`03_audit_logs.sql`)**: Đã tạo migration SQL khởi tạo bảng `public.audit_logs` phục vụ ghi vết mọi hành động thêm/sửa/xóa của Admin.
- [x] **2. Tách biệt Môi trường**: Hỗ trợ tệp cấu hình môi trường chuẩn Next.js (`.env.local`, `.env.production`).
- [x] **3. Migration SQL An Toàn**: Toàn bộ file migration trong `supabase/migrations/` không sử dụng các lệnh xóa dữ liệu hàng loạt nguy hiểm (`DROP TABLE` hay `DELETE` không điều kiện).

---

## ⚖️ PHASE 4: PHÁP LÝ & TỰ NGUYỆN (LUẬT 91/2025/QH15 VIỆT NAM)
- [x] **1. Chính sách Bảo mật & Điều khoản**: Đã tạo đường dẫn riêng cho `/privacy` và `/terms` chi tiết theo Luật 91/2025/QH15 & Nghị định 13/2023/NĐ-CP.
- [x] **2. Valid Consent Checkbox**: Các form thu thập thông tin khách hàng đều có ô tích chọn cam kết bảo mật, **mặc định không đánh dấu sẵn** (`defaultChecked = false`), tuân thủ chuẩn chấp thuận tự nguyện.
- [x] **3. Phân loại Dữ liệu An toàn**: Chỉ thu thập thông tin liên hệ và kết quả trắc nghiệm nghề nghiệp cơ bản, không thu thập dữ liệu nhạy cảm (sinh trắc học, thẻ tín dụng, vị trí GPS thời gian thực).

---

### 📝 HƯỚNG DẪN KHI GO LIVE PRODUCTION
1. **Supabase Migration**: Chạy file `supabase/migrations/03_audit_logs.sql` trên bảng điều khiển Supabase SQL Editor.
2. **Domain SSL**: Đảm bảo domain chính thức đã được bật SSL/TLS (HTTPS).
