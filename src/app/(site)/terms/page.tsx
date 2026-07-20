'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div id="view-terms" className="view-content py-16 px-margin-desktop bg-background min-h-[90vh]">
      <div className="max-w-[800px] mx-auto bg-zen-white border border-surface-container rounded-lg p-8 md:p-12 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="border-b border-surface-container/60 pb-6 text-center space-y-2">
          <img
            alt="MAI Institute Logo"
            className="h-12 w-auto mx-auto object-contain mb-2"
            src="/images/MAI_Logo.png"
          />
          <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block">
            Thông tin Pháp lý
          </span>
          <h1 className="font-headline text-3xl md:text-4xl text-primary font-bold">
            Điều Khoản Sử Dụng Dịch Vụ
          </h1>
          <p className="font-body text-xs text-secondary italic">
            Cập nhật lần cuối: Ngày 17 tháng 7 năm 2026
          </p>
        </div>

        {/* Nội dung chi tiết */}
        <div className="font-body text-sm text-secondary space-y-6 leading-relaxed">
          <p>
            Chào mừng bạn sử dụng hệ thống đánh giá và đào tạo trực tuyến của <strong>MAI Institute</strong>. Bằng việc truy cập website và sử dụng dịch vụ trắc nghiệm chẩn đoán năng lực của chúng tôi, bạn đồng ý tuân thủ các điều khoản sử dụng dưới đây.
          </p>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              1. Chấp nhận các điều khoản
            </h2>
            <p>
              Vui lòng đọc kỹ các điều khoản này trước khi bắt đầu sử dụng dịch vụ. Nếu bạn không đồng ý với bất kỳ phần nào trong các điều khoản này, bạn nên ngừng truy cập website và sử dụng các dịch vụ của chúng tôi.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              2. Sử dụng dịch vụ chẩn đoán năng lực
            </h2>
            <p>
              Dịch vụ trắc nghiệm chẩn đoán năng lực và các phân tích do MAI Institute cung cấp nhằm mục đích tham khảo khoa học, giúp quản lý và đại lý bảo hiểm nhân thọ tự đánh giá và nâng cao kỹ năng.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bạn cam kết cung cấp thông tin trung thực và chính xác (Họ tên, SĐT, Email) khi điền form đăng ký.</li>
              <li>Bạn đồng ý thực hiện bài trắc nghiệm một cách nghiêm túc, không sao chép hoặc phân phối trái phép các câu hỏi của bài kiểm tra.</li>
              <li>Kết quả chẩn đoán là tài sản riêng dành cho bạn và chỉ được chia sẻ công khai khi có sự đồng ý của bạn.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              3. Bản quyền và Sở hữu trí tuệ
            </h2>
            <p>
              Toàn bộ nội dung trên website bao gồm: bài viết, tệp âm thanh (podcasts), cấu hình và nội dung câu hỏi trắc nghiệm, cấu trúc thuật toán chấm điểm và báo cáo đề xuất, logo và giao diện người dùng đều thuộc quyền sở hữu trí tuệ duy nhất của <strong>MAI Institute</strong>.
            </p>
            <p>
              Mọi hành vi sao chép, trích dẫn mà không ghi rõ nguồn hoặc không được sự đồng ý bằng văn bản của MAI Institute đều cấu thành hành vi vi phạm pháp luật sở hữu trí tuệ.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              4. Giới hạn trách nhiệm
            </h2>
            <p>
              Chúng tôi luôn nỗ lực tối đa để cung cấp những thông tin, phân tích và giải pháp chính xác và chất lượng nhất dựa trên phương pháp luận chuẩn quốc tế. Tuy nhiên:
            </p>
            <p>
              Các báo cáo đề xuất từ bài trắc nghiệm chỉ mang tính tham khảo chuyên môn, không thay thế cho các quyết định quản lý hoặc các tư vấn kinh tế cá nhân của bạn. MAI Institute không chịu trách nhiệm đối với bất kỳ thiệt hại trực tiếp hay gián tiếp nào phát sinh từ việc sử dụng các lời khuyên trên trang web.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              5. Thay đổi điều khoản
            </h2>
            <p>
              MAI Institute có quyền thay đổi, sửa đổi, thêm hoặc bớt các điều khoản sử dụng này bất cứ lúc nào mà không cần báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website này. Việc bạn tiếp tục sử dụng website sau các thay đổi đồng nghĩa với việc bạn chấp nhận các sửa đổi đó.
            </p>
          </section>
        </div>

        {/* Footer actions */}
        <div className="pt-8 border-t border-surface-container/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-label font-bold text-secondary hover:text-heritage-maroon transition-colors group"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Quay lại Trang chủ
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-label font-bold text-heritage-maroon hover:underline"
          >
            Xem Chính sách bảo mật thông tin
          </Link>
        </div>

      </div>
    </div>
  );
}
