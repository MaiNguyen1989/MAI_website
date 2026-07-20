'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div id="view-privacy" className="view-content py-16 px-margin-desktop bg-background min-h-[90vh]">
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
            Chính Sách Bảo Mật Thông Tin Cá Nhân
          </h1>
          <p className="font-body text-xs text-secondary italic">
            Cập nhật lần cuối: Ngày 17 tháng 7 năm 2026 | Tuân thủ Luật Bảo vệ dữ liệu cá nhân (Luật 91/2025/QH15 & Nghị định 13/2023/NĐ-CP)
          </p>
        </div>

        {/* Nội dung chi tiết */}
        <div className="font-body text-sm text-secondary space-y-6 leading-relaxed">
          <p>
            Chào mừng bạn đến với <strong>MAI Institute</strong>. Chúng tôi cam kết bảo vệ dữ liệu cá nhân và quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi bạn sử dụng website của chúng tôi, đặc biệt là khi bạn thực hiện các bài trắc nghiệm chẩn đoán năng lực hoặc đăng ký lịch hẹn tư vấn.
          </p>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              1. Thông tin chúng tôi thu thập
            </h2>
            <p>
              Khi bạn thực hiện chẩn đoán hoặc đặt lịch hẹn, chúng tôi thu thập các thông tin cá nhân cơ bản sau:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Họ và tên:</strong> Để cá nhân hóa báo cáo kết quả và xưng hô khi liên hệ.</li>
              <li><strong>Số điện thoại / Zalo:</strong> Để chuyên gia liên hệ tư vấn trực tiếp và gửi tài liệu liên quan.</li>
              <li><strong>Địa chỉ Email:</strong> Để gửi báo cáo kết quả chẩn đoán tự động và các đề xuất giải pháp.</li>
              <li><strong>Đơn vị công tác & Vị trí hiện tại:</strong> Giúp chúng tôi thấu hiểu bối cảnh làm việc và đưa ra lời khuyên phù hợp nhất với vai trò của bạn (Đại lý tư vấn hoặc Quản lý đội ngũ).</li>
              <li><strong>Kết quả trắc nghiệm chẩn đoán:</strong> Điểm số các trục năng lực (Hành động, Công nghệ, Tỉnh thức) nhằm mục đích phân tích sâu.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              2. Mục đích xử lý dữ liệu
            </h2>
            <p>
              Mọi dữ liệu cá nhân thu thập được xử lý dựa trên sự đồng ý tự nguyện của bạn (Valid Consent), phục vụ các mục đích:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tính toán, phân tích và xuất báo cáo kết quả trắc nghiệm chẩn đoán năng lực.</li>
              <li>Liên hệ tư vấn, đặt lịch hẹn làm việc 1-1 với chuyên gia của MAI Institute.</li>
              <li>Cung cấp thông tin về các khóa học, sự kiện hoặc tài liệu chuyên ngành bảo hiểm nhân thọ phù hợp với nhu cầu của bạn.</li>
              <li>Nâng cao chất lượng dịch vụ và tối ưu hóa trải nghiệm người dùng trên hệ thống website.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              3. Thời gian lưu trữ và bảo mật thông tin
            </h2>
            <p>
              Chúng tôi cam kết áp dụng các biện pháp kỹ thuật và tổ chức cần thiết để bảo vệ thông tin cá nhân của bạn chống lại việc truy cập trái phép, mất mát hoặc sửa đổi trái phép.
            </p>
            <p>
              Dữ liệu của bạn được lưu trữ an toàn trên máy chủ của dịch vụ cơ sở dữ liệu Supabase được mã hóa. Thời gian lưu trữ dữ liệu là cho đến khi bạn yêu cầu chúng tôi hủy bỏ, hoặc khi mục đích xử lý dữ liệu đã hoàn thành.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              4. Quyền của chủ thể dữ liệu
            </h2>
            <p>
              Theo quy định của Luật Bảo vệ dữ liệu cá nhân Việt Nam, bạn có đầy đủ các quyền sau đối với dữ liệu cá nhân của mình:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quyền được biết và quyền đồng ý/không đồng ý xử lý dữ liệu.</li>
              <li>Quyền truy cập, chỉnh sửa hoặc yêu cầu bổ sung thông tin cá nhân.</li>
              <li>Quyền yêu cầu xóa dữ liệu cá nhân hoặc rút lại sự đồng ý bất cứ lúc nào.</li>
              <li>Quyền yêu cầu hạn chế xử lý dữ liệu hoặc phản đối việc xử lý dữ liệu.</li>
            </ul>
            <p>
              Để thực hiện các quyền trên, vui lòng liên hệ với bộ phận Bảo vệ Dữ liệu của chúng tôi qua Email: <a href="mailto:privacy@maiinstitute.vn" className="text-heritage-maroon hover:underline">privacy@maiinstitute.vn</a>. Chúng tôi cam kết phản hồi và xử lý yêu cầu của bạn trong vòng tối đa 72 giờ theo luật định.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg text-primary font-bold border-l-2 border-heritage-maroon pl-3">
              5. Cam kết tuân thủ
            </h2>
            <p>
              Chúng tôi cam kết không bán, chia sẻ hoặc tiết lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào khi chưa được sự đồng ý trước của bạn, ngoại trừ các trường hợp cơ quan nhà nước có thẩm quyền yêu cầu cung cấp thông tin theo quy định của pháp luật.
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
            href="/diagnose"
            className="bg-heritage-maroon text-zen-white px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded shadow"
          >
            Làm trắc nghiệm chẩn đoán ngay
          </Link>
        </div>

      </div>
    </div>
  );
}
