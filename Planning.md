# 📋 KẾ HOẠCH TRIỂN KHAI DỰ ÁN: WEBSITE MAI INSTITUTE

## 1. Tổng Quan Tiến Độ

* **Trạng thái hiện tại:** Hoàn thành Phase 1 (Frontend Prototype SPA & CMS Dashboard chạy bằng Mock Data). Đã đẩy mã nguồn lên GitHub và sẵn sàng deploy lên Vercel. Chuẩn bị bước sang Phase 2 (Thiết lập Database Supabase & Tích hợp API thực tế).
* **Thanh tiến độ triển khai:** `██████░░░░ 55%`

### Danh sách các hạng mục chi tiết

| Hạng mục | Trạng thái | Mức độ ưu tiên | Ghi chú |
| :--- | :--- | :--- | :--- |
| ✅ Phân tích Yêu cầu sản phẩm (PRD.md) | Hoàn thành | **P0** | Đã định hình rõ các giai đoạn MVP, V1.1 và V2. |
| ✅ Thiết kế Kiến trúc Hệ thống (System design.md) | Hoàn thành | **P0** | Chốt phương án sử dụng Next.js + Supabase + Vercel. |
| ✅ Thiết kế UI/UX & Giao diện | Hoàn thành | **P0** | Thiết kế Prototype trực quan, responsive sang trọng dựa trên Design System. |
| ✅ Xây dựng Frontend Prototype (Mock data) | Hoàn thành | **P0** | Trình diễn luồng chẩn đoán và Radar SVG động thông qua localStorage. |
| ❌ Thiết kế Database & Cài đặt Supabase | Chưa bắt đầu | **P1** | Khởi tạo bảng, thiết lập quan hệ và Row Level Security. |
| ❌ Xây dựng API & Edge Functions (PDF) | Chưa bắt đầu | **P1** | Logic tính điểm và sinh file PDF kết quả tự động. |
| ✅ Phát triển CMS Admin & Blog | Hoàn thành | **P1** | Tách biệt trang admin.html độc lập, hỗ trợ đăng bài viết & quản lý Leads. |
| ❌ Xây dựng Module E-learning (V1.1) | Chưa bắt đầu | **P2** | Trang học thử video, bài tập thực hành. |
| ❌ Tích hợp Cổng thanh toán (V2) | Chưa bắt đầu | **P2** | Tích hợp cổng VietQR/PayOS thanh toán tự động. |

---

## 2. Kế Hoạch Triển Khai Chi Tiết (Front-end/Prototype First)

### Phase 1: UI/UX & Front-end Prototype (Chạy bằng Mock Data) - [ĐÃ HOÀN THÀNH]
*Mục tiêu:* Hoàn thiện toàn bộ giao diện người dùng và luồng trải nghiệm chẩn đoán để nghiệm thu với khách hàng trước khi đụng vào cơ sở dữ liệu.

| Sprint | Thời gian | Tasks | Output |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | Tuần 1 | ① Thiết kế UI/UX trên Figma cho Landing page và Dashboard chẩn đoán.<br>② Định hình Design System (Serif Font cao cấp, bảng màu Gold/Deep Navy).<br>③ Dựng khung Layout tĩnh (Navbar, Hero, Footer, Blog list) bằng Next.js + Tailwind. | Layout Landing Page và Blog tĩnh hoàn tất, đảm bảo responsive. (Hoàn thành) |
| **Sprint 2** | Tuần 2 | ① Phát triển UI/UX động của Công cụ chẩn đoán (Quiz Flow). Mỗi trang 1 câu hỏi.<br>② Tích hợp các control tương tác (Slider kéo trượt từ 1-10, Card Selection).<br>③ Hiệu ứng Loading giả lập phân tích dữ liệu và Lead Form thu thập thông tin. | Luồng làm Quiz tương tác chạy mượt mà trên frontend. (Hoàn thành) |
| **Sprint 3** | Tuần 3 | ① Vẽ đồ thị Radar Chart bằng Recharts hiển thị kết quả chẩn đoán 3 trục.<br>② Thiết kế giao diện CMS Admin (quản lý bài viết, danh sách khách hàng).<br>③ Tạo mock data JSON cho các bộ câu hỏi và bài viết tạp chí. | Bản Frontend Prototype hoàn chỉnh chạy 100% Mock Data. (Hoàn thành) |

### Phase 2: Database & Core Backend Integration
*Mục tiêu:* Cấu trúc cơ sở dữ liệu, xây dựng API xử lý nghiệp vụ và kết nối dữ liệu thật vào Frontend.

| Sprint | Thời gian | Tasks | Output |
| :--- | :--- | :--- | :--- |
| **Sprint 4** | Tuần 4 | ① Thiết lập cơ sở dữ liệu Supabase PostgreSQL với 10 bảng như thiết kế.<br>② Cài đặt Row Level Security (RLS) bảo mật dữ liệu Leads.<br>③ Tích hợp Supabase Auth phục vụ đăng nhập phân quyền Admin/Học viên. | Database sẵn sàng, hệ thống Auth hoạt động ổn định. |
| **Sprint 5** | Tuần 5 | ① Xây dựng API nhận câu trả lời Quiz, tính điểm và lưu lịch sử (`/api/v1/quizzes/submit`).<br>② Phát triển Edge Function sinh file báo cáo PDF chẩn đoán tự động.<br>③ Đồng bộ dữ liệu thật cho Blog, Podcast và CMS Dashboard quản lý leads. | Hệ thống chẩn đoán tự động hoàn thiện từ Frontend đến Backend. |

### Phase 3: Nâng Cấp E-Learning & Tích Hợp Thanh Toán (Phase 2 & 3 PRD)
*Mục tiêu:* Mở rộng các tính năng học tập và thương mại hóa sản phẩm.

| Sprint | Thời gian | Tasks | Output |
| :--- | :--- | :--- | :--- |
| **Sprint 6** | Tuần 6 | ① Xây dựng module E-learning: Upload video học thử, đính kèm bài tập thực hành.<br>② Mở rộng giao diện CMS Admin cho phép quản lý khóa học, bài học.<br>③ Tối ưu hóa SEO nâng cao cho Thought Leadership Hub (Blog). | Module E-learning học thử hoạt động mượt mà. |
| **Sprint 7** | Tuần 7 | ① Tích hợp cổng thanh toán trực tuyến (API PayOS / VietQR) tự động.<br>② Xây dựng trang Checkout và hệ thống kích hoạt khóa học tự động.<br>③ Kiểm thử hiệu năng (< 1.5s load), kiểm tra bảo mật và Go-live chính thức. | Website MAI Institute hoàn chỉnh chạy trên Vercel Production. |

---

## 3. Cấu Trúc Thư Mục Dự Kiến (Next.js App Router)

```
d:\MAI_website\
├── public/                  # Tài nguyên tĩnh (Images, Logos, E-books)
├── src/
│   ├── app/                 # Next.js App Router (Pages & API Routes)
│   │   ├── (auth)/          # Authentication (Login)
│   │   ├── admin/           # Trang quản trị CMS Admin
│   │   ├── blog/            #thought Leadership Hub (Blog & Podcasts)
│   │   ├── diagnose/        # Công cụ chẩn đoán (Quiz & Results)
│   │   ├── courses/         # Hệ thống e-learning học thử & trả phí
│   │   ├── api/             # API Endpoints nội bộ
│   │   ├── layout.tsx       # Layout dùng chung cho toàn trang
│   │   └── page.tsx         # Landing Page / Hero Section
│   ├── components/          # React Components tái sử dụng
│   │   ├── ui/              # Nguyên tử UI (Button, Input, Slider)
│   │   ├── quiz/            # Các component phục vụ luồng Quiz
│   │   ├── charts/          # Biểu đồ Radar hiển thị kết quả
│   │   └── shared/          # Navbar, Footer, Anchor CTA
│   ├── hooks/               # Các React Hook tùy chỉnh
│   ├── lib/                 # Cấu hình core và các hàm tiện ích
│   │   ├── supabase.ts      # Khởi tạo Supabase client
│   │   └── utils.ts         # Tiện ích chung (format, tính điểm...)
│   └── types/               # TypeScript Interfaces định nghĩa dữ liệu
├── supabase/                # Thư mục quản lý Supabase
│   ├── migrations/          # File script SQL tạo bảng & RLS
│   └── config.toml          # Cấu hình Supabase local
├── package.json             # Danh sách dependencies
├── tailwind.config.js       # Cấu hình Tailwind CSS
└── tsconfig.json            # Cấu hình TypeScript
```

---

## 4. Quyết Định Cần Xác Nhận

| Hạng mục | Đề xuất tối ưu | Trạng thái | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Bảng màu & Design System** | Phối màu đẳng cấp: Deep Navy làm chủ đạo, Warm White/Gold làm điểm nhấn. Font Serif (Playfair Display) kết hợp Sans-serif (Inter). | **Chờ xác nhận** | Cần khách hàng MAI Institute phê duyệt trực tiếp. |
| **Thư viện Sinh file PDF** | Sử dụng thư viện `pdf-lib` chạy trên Supabase Edge Functions. | **Chờ xác nhận** | Đảm bảo hiệu năng tải trang ở client và bảo mật link tải tài liệu. |
| **Cổng thanh toán trực tuyến**| PayOS (Miễn phí phí giao dịch VietQR). | **Đã chốt** | Phù hợp nhất cho thị trường Việt Nam. |
| **Hosting Lưu trữ Video** | YouTube Embed (Chế độ Không công khai) cho MVP. Vimeo cho Phase trả phí. | **Chờ xác nhận** | Tối ưu chi phí hạ tầng ban đầu. |

---

## 5. Bước Tiếp Theo Ngay Lập Tức

- [ ] **1.** Thống nhất với đại diện MAI Institute về bộ nhận diện thương hiệu (Bảng màu, Font chữ Serif).
- [ ] **2.** Thiết kế Wireframe/Figma chi tiết cho luồng Quiz (đặc biệt là thanh Slider và Card chọn vai trò).
- [ ] **3.** Khởi tạo dự án Next.js (App Router, TypeScript, Tailwind CSS) trong thư mục làm việc.
- [ ] **4.** Tạo tệp dữ liệu Mock Data chứa danh sách câu hỏi chẩn đoán và bài viết blog mẫu để chạy thử Prototype.
- [ ] **5.** Tiến hành dựng giao diện Landing Page tĩnh trước tiên.
