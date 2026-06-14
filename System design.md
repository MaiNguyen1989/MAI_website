## 2. Kiến Trúc Hệ Thống

### 2.1 Tổng quan kiến trúc

┌─────────────────────────┐
│      User Browser       │
└───────────┬─────────────┘
            │ HTTPS / WSS
            ▼
┌─────────────────────────┐
│    Vercel CDN / Edge    │
└───────────┬─────────────┘
            │
            ▼
┌───────────────────────────────────────┐
│ Next.js Web App (Vercel Serverless)   │
├───────────────────────────────────────┤
│ - UI & Routing (React)                │
│ - API Routes (Serverless Functions)   │
│ - Radar Chart & PDF Generation Engine │
└───────────┬───────────────────────┬───┘
            │                       │
            │ PostgreSQL Client     │ REST / Storage SDK
            ▼                       ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│    Supabase Service     │   │    Supabase Storage     │
├─────────────────────────┤   ├─────────────────────────┤
│ - PostgreSQL DB         │   │ - PDFs (E-books, Report)│
│ - Auth & Row Level Sec  │   │ - Audio (Podcasts)      │
│ - Database Triggers     │   │ - Videos (E-learning)   │
└─────────────────────────┘   └─────────────────────────┘

### 2.2 Tech Stack: github, supabase, vercel.

| Layer | Công nghệ | Ghi chú |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React), Tailwind CSS, Lucide Icons, Recharts | Next.js hỗ trợ SSR/ISR giúp tối ưu hóa SEO vượt trội và tải trang nhanh (< 2s). Recharts dùng để vẽ biểu đồ Radar động trên client-side. |
| **Backend / DB** | Supabase (PostgreSQL, Auth, Edge Functions) | Cung cấp PostgreSQL mạnh mẽ kết hợp Row Level Security (RLS) để bảo mật thông tin Leads/Admins. Edge Functions dùng để xử lý logic PDF generation. |
| **Storage** | Supabase Storage | Lưu trữ tệp tin tĩnh dung lượng lớn như tài liệu E-book (PDF), âm thanh Podcast (MP3) và video học tập. |
| **DevOps / CI/CD**| GitHub & Vercel | Quản lý mã nguồn trên GitHub, cấu hình luồng CI/CD tự động deploy lên Vercel Edge Network khi push code. |

---

## 3. Tính Năng Chi Tiết

### 3.1 Trang chủ & Landing Page (Phase 1 - MVP)
- **Giao diện thương hiệu:** Phong cách UI tối giản, sang trọng (Modern typography, Serif kết hợp Sans-serif, không gian âm rộng).
- **Điều hướng thông minh:** Menu điều hướng tối giản dẫn trực tiếp đến các nhóm giải pháp, Blog và các công cụ chẩn đoán.
- **CTA nổi bật:** Nút kêu gọi hành động (CTA) "Bắt đầu chẩn đoán hệ thống ngay (Free 5-Min Audit)" có hiệu ứng hover mượt mà kích thích tương tác.

### 3.2 Công cụ Chẩn đoán Động - Diagnostic Tool (Phase 1 - MVP)
- **Phân luồng Onboarding:** Cho phép người dùng chọn vai trò (Giám đốc Vùng / Agency Leader / Lãnh đạo Đội ngũ) để tải bộ câu hỏi phù hợp.
- **Trải nghiệm Trắc nghiệm Động:** Chỉ hiển thị 1 câu hỏi/trang để giảm tải nhận thức. Tích hợp Slider (thanh trượt từ 1-10) và thẻ chọn Card trực quan.
- **Trang kết quả:** Biểu thị kết quả dưới dạng Radar Chart (3 trục: Năng lực Thực thi - Action, Sức khỏe Tinh thần - Mindful, Tích hợp Công nghệ - Tech Integration). 
- **Lead Generation Lock:** Yêu cầu người dùng điền Họ tên, Số điện thoại, Email, Công ty để tải Báo cáo Phân tích chi tiết (PDF).

### 3.3 Kho Lưu trữ & Thought Leadership Hub (Phase 1 - MVP)
- **Tài liệu & Podcast:** Khu vực lưu trữ tài liệu e-book định dạng PDF và các link nghe podcast/bài viết thực chiến giúp giữ chân người dùng.
- **Blog Tạp chí cao cấp:** Thiết kế tương tự McKinsey Insights, trang bị bộ lọc thông minh theo chủ đề: Xu hướng Ngành | Công nghệ Quản trị | Khai phóng Tâm trí | Báo cáo Độc quyền.

### 3.4 Cổng Quản trị Nội bộ - CMS (Phase 1 - MVP)
- **Quản lý nội dung:** Giao diện tiếng Việt đơn giản cho phép nhân sự MAI tự đăng/sửa bài viết, upload file âm thanh podcast, quản lý tài liệu.
- **Quản lý Leads:** Bảng hiển thị thông tin khách hàng (Tên, SĐT, Email, Kết quả bài test) sắp xếp theo thứ tự mới nhất.

### 3.5 Hệ thống Học thử E-learning (Phase 2 - V1.1)
- **Học thử miễn phí:** Admin có thể đăng tải các video bài giảng ngắn và các bài tập thực hành nhỏ đi kèm dưới mỗi video để thu hút học viên trải nghiệm.

### 3.6 Cổng Thanh toán & Khóa học Trả phí (Phase 3 - V2)
- **E-commerce & Thanh toán:** Hiển thị giá tiền các công cụ quản lý thông minh (file mẫu/phần mềm mini) và khóa học trọn gói. Tích hợp cổng thanh toán trực tuyến (ví dụ PayOS/VietQR) để tự động hóa quy trình mua và kích hoạt tài khoản.

---

## 4. Database Schema

### 4.1 Bảng chính

┌──────────────────┐               ┌──────────────────┐
│     profiles     │               │     quizzes      │
├──────────────────┤               ├──────────────────┤
│ id (PK)          │               │ id (PK)          │
│ email            │               │ title            │
│ phone            │               │ description      │
│ full_name        │               │ created_at       │
│ company          │               └────────┬─────────┘
│ role             │                        │
└────────┬─────────┘                        │ (1:N)
         │                                  ▼
         │ (1:N)                   ┌──────────────────┐
         │                         │    questions     │
         │                         ├──────────────────┤
         │                         │ id (PK)          │
         │                         │ quiz_id (FK)     │
         │                         │ question_text    │
         │                         │ question_type    │
         │                         └────────┬─────────┘
         ▼                                  │
┌──────────────────┐                        │ (1:N)
│  quiz_attempts   │◄───────────────────────┘
├──────────────────┤
│ id (PK)          │
│ user_id (FK)     │
│ quiz_id (FK)     │
│ score_action     │
│ score_mindful    │
│ score_tech       │
│ created_at       │
└──────────────────┘

### 4.2 Tổng cộng: **10 bảng**

1. `profiles`: Lưu trữ thông tin người dùng (Leads, học viên và quản trị viên).
2. `quizzes`: Danh sách các bài khảo sát/chẩn đoán.
3. `questions`: Các câu hỏi thuộc một bài khảo sát cụ thể.
4. `question_options`: Các đáp án lựa chọn hoặc cấu hình giá trị min/max cho câu hỏi dạng Slider.
5. `quiz_attempts`: Ghi nhận mỗi lượt thực hiện chẩn đoán của khách hàng và điểm số Radar của họ.
6. `quiz_responses`: Chi tiết câu trả lời của từng câu hỏi trong mỗi lượt khảo sát.
7. `categories`: Danh mục bài viết blog/podcast (Xu hướng Ngành, Khai phóng Tâm trí,...).
8. `posts`: Các bài viết blog, tài liệu hoặc podcast (lưu tiêu đề, nội dung, đường dẫn tệp âm thanh).
9. `courses`: Thông tin các khóa học (dành cho Phase 2 & 3).
10. `lessons`: Các bài học/video bài giảng chi tiết nằm trong khóa học.

---

## 5. API Endpoints

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **POST** | `/api/v1/auth/login` | Đăng nhập tài khoản admin/học viên. |
| **POST** | `/api/v1/leads/register` | Thu thập thông tin lead khi họ đăng ký nhận kết quả PDF chi tiết. |
| **GET** | `/api/v1/quizzes/:id` | Lấy danh sách câu hỏi của bài chẩn đoán theo phân loại onboarding. |
| **POST** | `/api/v1/quizzes/submit` | Gửi câu trả lời, tính toán điểm 3 trục và lưu lượt thực hiện khảo sát. |
| **GET** | `/api/v1/posts` | Lấy danh sách bài viết/podcasts có hỗ trợ bộ lọc và phân trang. |
| **POST** | `/api/v1/admin/posts` | Đăng bài viết hoặc podcast mới (Yêu cầu quyền admin). |
| **GET** | `/api/v1/courses` | Danh sách các khóa học e-learning (Phase 2 & 3). |
| **POST** | `/api/v1/payment/checkout` | Tạo link thanh toán VietQR/PayOS mua công cụ hoặc khóa học (Phase 3). |

---

## 6. Yêu Cầu Hạ Tầng

### 6.1 Server & Infrastructure

| Thông số/Layer | Yêu cầu | Ghi chú |
| :--- | :--- | :--- |
| **Web Hosting** | Vercel Serverless Plan (Hỗ trợ Node.js/Edge Runtime) | Phục vụ ứng dụng frontend Next.js, tự động co giãn theo traffic. |
| **Database Server** | Supabase Shared Database (AWS Region: Singapore) | Giảm thiểu độ trễ cho người dùng tại Việt Nam (< 50ms). |
| **Object Storage** | Supabase Storage + Cloudflare CDN | Cache các tệp tin media (audio, video, PDF) giúp tối ưu hóa tốc độ tải. |
| **Security Layer** | Row Level Security (RLS) + SSL + WAF | RLS ngăn chặn rò rỉ dữ liệu Leads chéo giữa các tài khoản, SSL/WAF chặn DDoS. |

### 6.2 Chi Chi phí ước tính/tháng

| Hạng mục | Chi phí dự kiến | Ghi chú |
| :--- | :--- | :--- |
| **Vercel Pro License** | $20 / tháng | Hỗ trợ deploy team, tăng giới hạn Serverless Execution. |
| **Supabase Pro Plan** | $25 / tháng | Mở rộng dung lượng database lên 8GB và băng thông lớn hơn. |
| **Cloudflare CDN/WAF** | $0 / tháng | Sử dụng gói Free là đủ cho các tính năng bảo mật cơ bản ban đầu. |
| **Domain Name** | $1 / tháng | Phí duy trì domain quốc tế hàng năm chia đều theo tháng. |
| **Tổng chi phí** | **$46 / tháng** | Cực kỳ tối ưu cho giai đoạn đầu của startup. |

---

## 7. Rủi Ro & Giảm Thiểu

| # | Rủi ro | Mức độ | Giảm thiểu |
| :--- | :--- | :--- | :--- |
| 1 | Khách hàng thoát trang khi thấy form yêu cầu nhập thông tin cá nhân. | **Cao** | Cho phép xem trước Radar Chart và nhận định sơ bộ. Chỉ khóa chức năng tải bản phân tích chi tiết (PDF). |
| 2 | Rò rỉ thông tin liên hệ nhạy cảm (SĐT/Email) của Leads bảo hiểm. | **Nghiêm trọng** | Kích hoạt Row Level Security (RLS) trên database. Mã hóa thông tin nhạy cảm ở tầng Database. |
| 3 | Tải trang trắc nghiệm quá chậm hoặc lỗi hiển thị trên thiết bị di động. | **Trung bình** | Tối ưu hóa dung lượng hình ảnh, sử dụng Next.js Image Component, thiết kế UI ưu tiên Mobile-First. |
| 4 | Admin MAI Institute gặp khó khăn khi chỉnh sửa nội dung CMS. | **Trung bình** | Xây dựng CMS hoàn toàn bằng tiếng Việt với trình soạn thảo WYSIWYG trực quan, không cần chạm vào code. |

---

## 8. Metrics Thành Công

| Metric | Mục tiêu Phase 1 | Mục tiêu Full |
| :--- | :--- | :--- |
| **Thời gian tải trang** | < 2.5 giây | < 1.5 giây |
| **Tỷ lệ hoàn thành Quiz** | > 60% người dùng bắt đầu làm test | > 80% người dùng bắt đầu làm test |
| **Tỷ lệ chuyển đổi Lead** | > 15% khách làm quiz điền form nhận PDF | > 25% khách làm quiz điền form nhận PDF |
| **Uptime hệ thống** | 99.9% | 99.95% |

---

## 9. Phụ Lục

### Quy tắc logic nghiệp vụ đặc thù (Business Rules)
1. **Phân loại bộ câu hỏi:**
   - Dựa trên vai trò được chọn tại trang chẩn đoán:
     - Giám đốc Vùng / Agency Leader -> Load bộ câu hỏi về kỹ năng quản lý, xây dựng hệ thống, tuyển dụng.
     - Lãnh đạo Đội ngũ / Đại lý -> Load bộ câu hỏi về kỹ năng bán hàng, tư vấn cá nhân, chăm sóc khách hàng.
2. **Logic tính điểm Radar Chart:**
   - Điểm số được chia đều trên 3 trục: Action, Mindful, Tech Integration.
   - Mỗi câu hỏi tương ứng với 1 hoặc nhiều trục điểm. Giá trị của Slider (1-10) sẽ cộng dồn trọng số vào trục tương ứng. Điểm trục = (Tổng điểm đạt được / Tổng điểm tối đa của trục) * 10.
3. **Thuật toán đề xuất sản phẩm:**
   - Nếu Trục Mindful thấp nhất -> Gợi ý khóa học `Mindful Leadership in Tech Era`.
   - Nếu Trục Action/Tech thấp nhất -> Gợi ý `App Quản trị Đội ngũ Độc quyền` hoặc các tài liệu tối ưu hóa quy trình.
   - Nhóm đối tượng `Giám đốc/Leader` -> Chỉ hiển thị nhánh giải pháp `Executive Suite`.
   - Nhóm đối tượng `Đại lý` -> Chỉ hiển thị nhánh giải pháp `Professional Suite`.
