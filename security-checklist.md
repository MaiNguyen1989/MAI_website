# 📋 BÁO CÁO & CHECKLIST BẢO MẬT 4 LỚP — MAI WEBSITE

Tài liệu này ghi nhận hiện trạng và danh sách kiểm tra bảo mật cho hệ thống **MAI website** (Next.js + Supabase). 

*Cập nhật lần cuối: Ngày 17 tháng 7 năm 2026*

---

## 🔒 Lớp 1: Bảo mật Bên Trong (Code & Data)

- [x] **Giới hạn .env trong Git:** Đã thêm `.env`, `.env*.local`, `.env.development`, `.env.production` và `.env.staging` vào file [`.gitignore`](file:///.gitignore) để ngăn chặn rò rỉ mã bảo mật lên GitHub.
- [x] **Kiểm soát Public Prefix:** Đã kiểm tra `.env.local` và xác nhận chỉ có các biến frontend công khai (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) bắt đầu bằng `NEXT_PUBLIC_`. Không có secret keys nào dùng tiền tố này.
- [x] **Rà soát Hardcoded Secrets:** Không phát hiện API keys, JWT Secrets, hoặc mật khẩu nào bị viết cứng (hardcoded) trong mã nguồn.
- [x] **Không rò rỉ log nhạy cảm:** Không sử dụng các lệnh `console.log()` ghi lại thông tin mật khẩu hoặc dữ liệu cá nhân của người dùng.
- [x] **Tránh Over-fetching:** Đã tối ưu hóa các truy vấn danh sách bài viết từ Supabase tại [Trang chủ](file:///src/app/(site)/page.tsx) và [Blog](file:///src/app/(site)/blog/page.tsx) bằng cách chọn cụ thể các trường (`.select('id, title, category, type, summary, image, created_at')`), loại bỏ việc nạp cột dữ liệu HTML `content` dung lượng lớn không cần thiết.

---

## 🛡️ Lớp 2: Bảo mật Bên Ngoài (Config & Headers)

- [x] **Cấu hình Security Headers:** Đã thiết lập các HTTP Headers bảo mật thông qua cấu hình `headers` trong [`next.config.js`](file:///next.config.js):
  - `Content-Security-Policy` (CSP) chặt chẽ, ngăn ngừa XSS.
  - `X-Frame-Options: DENY` chống tấn công Clickjacking.
  - `X-Content-Type-Options: nosniff` chống khai thác mime type.
  - `Strict-Transport-Security` (HSTS) ép buộc HTTPS.
  - `Referrer-Policy` bảo vệ nguồn gốc request.
- [ ] **Rate Limiting ở mức hạ tầng:**
  - *Ghi chú:* Vì ứng dụng Next.js kết nối trực tiếp với Supabase Client từ trình duyệt, Rate Limiting cần được bật trực tiếp trên **Supabase Dashboard** (Settings -> API -> Max Rows / Rate Limits).
- [ ] **Cấu hình CORS an toàn:**
  - *Ghi chú:* Cần giới hạn danh sách Domain được phép gọi tới Supabase URL trong mục CORS của Supabase Dashboard sau khi deploy chính thức (Production Domain), tránh cho phép tất cả các domain.
- [x] **Chống click spam (Double Submit):**
  - Đã tích hợp thuộc tính `disabled` và hiệu ứng loading khi đang gửi biểu mẫu trong [`BookingModal.tsx`](file:///src/components/shared/BookingModal.tsx).
  - Nút bắt đầu làm trắc nghiệm chỉ được kích hoạt khi người dùng đồng ý với các điều khoản.

---

## 🔄 Lớp 3: Phục Hồi & Bảo mật DB

- [x] **Bảo vệ bằng RLS Policies (Row Level Security):**
  - Đã kích hoạt RLS trên tất cả các bảng.
  - Đã tạo file migration [`02_secure_rls.sql`](file:///supabase/migrations/02_secure_rls.sql) để thay thế chính sách cũ: **Thu hồi quyền Admin của Anon Key**.
  - Hiện tại, chỉ có người dùng được xác thực (`authenticated` - đăng nhập qua Supabase Auth) mới có quyền quản trị bài viết, câu hỏi và xem danh sách leads của khách hàng.
  - Khách vãng lai (`anon`) chỉ được phép đọc nội dung công khai và `INSERT` dữ liệu leads.
- [ ] **Lập bảng Audit Logs:**
  - *Ghi chú:* Cần lập thêm bảng `audit_logs` để tự động ghi vết (trigger) các hành động INSERT/UPDATE/DELETE của quản trị viên khi hệ thống có thêm nhiều tài khoản vận hành.
- [x] **Kiểm tra Migration an toàn:**
  - File migration không chứa các lệnh phá hủy dữ liệu nguy hiểm như `DROP DATABASE` hoặc lệnh `DELETE` không có điều kiện.

---

## ⚖️ Lớp 4: Pháp Lý (Luật 91/2025/QH15 & GDPR)

- [x] **Chính sách bảo mật công khai:** Đã tạo trang [Chính sách bảo mật thông tin cá nhân](file:///src/app/(site)/privacy/page.tsx) làm rõ mục đích thu thập, cách thức xử lý, quyền của chủ thể dữ liệu và thời hạn phản hồi yêu cầu (72 giờ) đúng theo Luật 91/2025/QH15.
- [x] **Điều khoản sử dụng rõ ràng:** Đã tạo trang [Điều khoản sử dụng dịch vụ](file:///src/app/(site)/terms/page.tsx) quy định bản quyền nội dung của MAI Institute và trách nhiệm của khách hàng.
- [x] **Cơ chế Đồng ý Hợp lệ (Valid Consent):**
  - Đã thêm Checkbox Consent vào [Trang chẩn đoán](file:///src/app/(site)/diagnose/page.tsx) và [Modal đặt lịch](file:///src/components/shared/BookingModal.tsx).
  - Checkbox mặc định ở trạng thái **không chọn sẵn** (default unchecked). Khách hàng phải chủ động tích chọn thì mới có thể gửi dữ liệu.
- [x] **Phân loại dữ liệu cá nhân:** Hệ thống chỉ thu thập thông tin cơ bản để liên hệ (Tên, SĐT, Email). Không thu thập dữ liệu cá nhân nhạy cảm như dữ liệu sinh trắc học, định vị GPS hoặc thông tin tài chính/thanh toán.
