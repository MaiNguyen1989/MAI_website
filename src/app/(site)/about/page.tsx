'use client';

import React, { useState } from 'react';
import BookingModal from '@/components/shared/BookingModal';

interface TabContent {
  id: string;
  label: string;
  icon: string;
}

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State quản lý tab active cho từng thành viên
  const [activeTabHanh, setActiveTabHanh] = useState('bio');
  const [activeTabNhat, setActiveTabNhat] = useState('bio');
  const [activeTabMai, setActiveTabMai] = useState('bio');

  const tabs: TabContent[] = [
    { id: 'bio', label: 'Giới thiệu', icon: 'person' },
    { id: 'expertise', label: 'Chuyên môn', icon: 'school' },
    { id: 'achievements', label: 'Thành tựu & Công trình', icon: 'military_tech' },
  ];

  return (
    <div id="view-about" className="view-content bg-background min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-surface-container">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-[0.2em] mb-4 block">
            Mindful Action for Executives
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 leading-tight max-w-4xl mx-auto">
            Kiến tạo Thế hệ Lãnh đạo Bảo hiểm Tỉnh thức &amp; Hệ thống
          </h1>
          <p className="font-body text-base md:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
            MAI Institute đồng hành cùng các nhà quản lý kinh doanh Bảo hiểm Nhân thọ thế hệ mới bứt phá giới hạn hiệu suất bằng sự kết hợp duy nhất giữa tư duy Tỉnh thức và Quản trị dựa trên dữ liệu.
          </p>
          <div className="w-24 h-1 bg-heritage-maroon mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-paper-grey/20 border-b border-surface-container">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cột trái: Tiêu đề và Quote */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block">
                Triết lý Đào tạo
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-primary leading-tight">
                Hành động Tỉnh thức<br />
                <span className="italic text-heritage-maroon">(Mindful Action)</span>
              </h2>
              <div className="border-l-2 border-heritage-maroon pl-6 py-2 italic text-secondary font-headline text-lg md:text-xl leading-relaxed">
                &quot;Huấn luyện không phải là làm đầy kiến thức, mà là đồng hành để người quản lý nhìn nhận, tự chuyển hóa nội lực và dẫn dắt bằng sự thấu hiểu.&quot;
              </div>
            </div>

            {/* Cột phải: Chi tiết 2 trụ cột */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Trụ cột 1 */}
              <div className="p-8 bg-zen-white border border-surface-container rounded-xl shadow-sm space-y-4 hover:border-heritage-maroon/30 transition-soft">
                <div className="w-12 h-12 bg-heritage-maroon/5 text-heritage-maroon rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">self_improvement</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">Sự Tỉnh thức (Mindfulness)</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">
                  Lắng nghe sâu sắc, thấu hiểu tâm lý hành vi và ứng dụng tư duy tỉnh thức để phát triển nội lực vững vàng. Định vị người làm nghề bảo hiểm thành chuyên gia tài chính tử tế, lấy khách hàng làm trọng tâm.
                </p>
              </div>

              {/* Trụ cột 2 */}
              <div className="p-8 bg-zen-white border border-surface-container rounded-xl shadow-sm space-y-4 hover:border-heritage-maroon/30 transition-soft">
                <div className="w-12 h-12 bg-heritage-maroon/5 text-heritage-maroon rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">insights</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">Hệ thống &amp; Dữ liệu</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">
                  Đơn giản hóa quản trị bằng công nghệ và tự động hóa AI. Xây dựng các mô hình định tư vấn, bộ tiêu chuẩn thẩm định quyền lợi và quy trình hệ thống tối giản để tối ưu hiệu suất thực tế.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          
          <div className="text-center mb-20">
            <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
              Our Leadership
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-primary">
              Ban Sáng lập &amp; Chuyên gia
            </h2>
            <p className="font-body text-sm md:text-base text-secondary max-w-xl mx-auto mt-4 leading-relaxed">
              Những người đồng hành, chuyển giao tri thức và công cụ giúp bạn định hình doanh nghiệp bảo hiểm bền vững.
            </p>
            <div className="w-16 h-0.5 bg-heritage-maroon mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-24">
            
            {/* Member 1: Nguyễn Thị Hồng Hạnh */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Cột ảnh bên trái */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl overflow-hidden shadow-md group border border-surface-container">
                  <img
                    alt="Nguyễn Thị Hồng Hạnh"
                    className="w-full h-full object-cover transition-soft group-hover:scale-[1.05]"
                    src="/images/hong-hanh.jpg"
                  />
                </div>
              </div>

              {/* Cột thông tin bên phải */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-1">
                    Founder MAI Institute
                  </span>
                  <h3 className="font-headline text-3xl md:text-4xl text-primary font-bold">
                    Nguyễn Thị Hồng Hạnh
                  </h3>
                  <p className="font-body text-sm text-secondary italic mt-1">
                    Mentor &amp; Coach | Chuyên gia Khai vấn Lãnh đạo
                  </p>
                </div>

                {/* Tabs điều hướng */}
                <div className="flex border-b border-surface-container gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabHanh(tab.id)}
                      className={`flex items-center gap-2 pb-3 font-label text-xs font-bold uppercase tracking-wider transition-colors relative ${
                        activeTabHanh === tab.id ? 'text-heritage-maroon' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                      {tab.label}
                      {activeTabHanh === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-heritage-maroon rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Nội dung Tab */}
                <div className="min-h-[180px] font-body text-sm text-secondary leading-relaxed space-y-4">
                  {activeTabHanh === 'bio' && (
                    <div className="space-y-4 animate-fade-in">
                      <p>
                        Với hơn 20 năm tâm huyết trong ngành bảo hiểm nhân thọ, từng giữ vị trí Trưởng bộ phận đào tạo và quản lý chất lượng đại lý tại tập đoàn bảo hiểm hàng đầu, cô không chỉ chuyển giao tri thức mà còn kiến tạo một không gian để người làm nghề nhìn nhận, trưởng thành và vững vàng nội lực.
                      </p>
                      <p>
                        Đối với cô, huấn luyện không phải là làm đầy kiến thức, mà là đồng hành để cấp quản lý chuyển hóa tư duy lãnh đạo đối tác, giúp đội ngũ tư vấn định vị bản thân thành những chuyên gia tài chính có chuyên môn, làm nghề bằng sự thấu hiểu và tử tế.
                      </p>
                    </div>
                  )}

                  {activeTabHanh === 'expertise' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Thạc sĩ Quản trị Kinh doanh cấp cao (Executive MBA)</strong> – Đại học Hawaii, Mỹ.
                      </li>
                      <li>
                        <strong className="text-primary">Cựu Trưởng bộ phận Đào tạo Đại lý (Head of Agency Training)</strong> tại tập đoàn bảo hiểm nhân thọ đa quốc gia hàng đầu.
                      </li>
                      <li>
                        Tích lũy hơn 20 năm kinh nghiệm thực chiến trong quản lý chất lượng đào tạo, thiết kế chương trình huấn luyện và đồng hành cùng hàng ngàn quản lý phân phối.
                      </li>
                    </ul>
                  )}

                  {activeTabHanh === 'achievements' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Chứng nhận Quốc tế:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>Chứng chỉ chuyên môn FLMI (Fellow, Life Management Institute) và ACS từ tổ chức LOMA, Hoa Kỳ.</li>
                          <li>Chứng chỉ chuyên môn quốc tế về Quản trị Sự thay đổi (Change Management), CHLB Đức.</li>
                          <li>Chuyên gia Khai vấn và Cố vấn Chuyên nghiệp được chứng nhận (CCMP - Certified Coach &amp; Mentor Professional), Malaysia.</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-primary">Giải thưởng tôn vinh danh giá:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>Ngôi sao Xuất sắc Châu Á (vào các năm 2005 và 2014) vì những đóng góp vượt bậc cho sự nghiệp đào tạo.</li>
                          <li>Ngôi sao Xuất sắc Toàn cầu (năm 2019) vinh danh nhà đào tạo xuất sắc nhất hệ thống tập đoàn.</li>
                        </ul>
                      </li>
                    </ul>
                  )}
                </div>

              </div>
            </div>

            {/* Member 2: Nguyễn Minh Nhật */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16 border-t border-surface-container">
              
              {/* Cột thông tin bên trái (vị trí đảo ngược trên desktop) */}
              <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
                <div>
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-1">
                    Co-Founder MAI Institute
                  </span>
                  <h3 className="font-headline text-3xl md:text-4xl text-primary font-bold">
                    Nguyễn Minh Nhật
                  </h3>
                  <p className="font-body text-sm text-secondary italic mt-1">
                    Trainer &amp; Consultant | Nhà Sáng lập LIBA Institute
                  </p>
                </div>

                {/* Tabs điều hướng */}
                <div className="flex border-b border-surface-container gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabNhat(tab.id)}
                      className={`flex items-center gap-2 pb-3 font-label text-xs font-bold uppercase tracking-wider transition-colors relative ${
                        activeTabNhat === tab.id ? 'text-heritage-maroon' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                      {tab.label}
                      {activeTabNhat === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-heritage-maroon rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Nội dung Tab */}
                <div className="min-h-[180px] font-body text-sm text-secondary leading-relaxed space-y-4">
                  {activeTabNhat === 'bio' && (
                    <div className="space-y-4 animate-fade-in">
                      <p>
                        Hành trình từ năm 2017 của anh gắn liền với việc đơn giản hóa những khái niệm tài chính phức tạp thành các mô hình thực tế và bộ trò chơi giáo dục tài chính trực quan.
                      </p>
                      <p>
                        Với kinh nghiệm huấn luyện hàng ngàn đại lý bảo hiểm và thực hành hoạch định tài chính sâu sắc, anh Nhật không chỉ chuyển giao công cụ, mà sẽ cùng bạn kiến tạo một thế hệ tư vấn viên bảo hiểm nhân thọ chuyên nghiệp, làm việc bằng tư duy hệ thống và sự minh bạch tuyệt đối.
                      </p>
                    </div>
                  )}

                  {activeTabNhat === 'expertise' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Cử nhân Tài chính</strong> – Đại học Kinh tế TP.HCM (UEH).
                      </li>
                      <li>
                        <strong className="text-primary">Sáng lập LIBA Institute</strong> – Học viện chuyên sâu về đào tạo tư duy tài chính toàn diện.
                      </li>
                      <li>
                        Đào tạo trực tiếp và chuyển giao năng lực hoạch định tài chính cho hơn 1000+ đại lý bảo hiểm và hàng trăm doanh nghiệp quy mô lớn tại Việt Nam.
                      </li>
                    </ul>
                  )}

                  {activeTabNhat === 'achievements' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Mô hình &amp; Công cụ quản trị sáng tạo:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>Tác giả bộ tiêu chuẩn An tâm Tài chính &amp; Mô hình Pentagon ứng dụng trong tư vấn.</li>
                          <li>Tác giả 3 bộ trò chơi giáo dục tài chính nổi tiếng: MoneyWe, MoneyMe, MoneySense.</li>
                          <li>Tác giả Game bảo hiểm Money Care – công cụ trực quan hóa lợi ích bảo hiểm.</li>
                          <li>Sáng lập Encolaw – bộ tiêu chuẩn chuyên biệt hỗ trợ thẩm định quyền lợi bảo hiểm nhân thọ cho khách hàng.</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-primary">Chứng nhận quốc tế:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>Giảng viên Giáo dục Tài chính quốc tế được chứng nhận bởi tổ chức NFEC (National Financial Educators Council - Hoa Kỳ).</li>
                          <li>Giảng viên được chứng nhận quốc tế bởi Google (Level 1 Educator).</li>
                        </ul>
                      </li>
                    </ul>
                  )}
                </div>

              </div>

              {/* Cột ảnh bên phải (vị trí đảo ngược trên desktop) */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl overflow-hidden shadow-md group border border-surface-container">
                  <img
                    alt="Nguyễn Minh Nhật"
                    className="w-full h-full object-cover transition-soft group-hover:scale-105"
                    src="/images/minh-nhat.png"
                  />
                </div>
              </div>

            </div>

            {/* Member 3: Nguyễn Thị Quỳnh Mai */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-16 border-t border-surface-container">
              
              {/* Cột ảnh bên trái */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl overflow-hidden shadow-md group border border-surface-container">
                  <img
                    alt="Nguyễn Thị Quỳnh Mai"
                    className="w-full h-full object-cover transition-soft group-hover:scale-105"
                    src="/images/quynh-mai.png"
                  />
                </div>
              </div>

              {/* Cột thông tin bên phải */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-1">
                    Co-Founder MAI Institute
                  </span>
                  <h3 className="font-headline text-3xl md:text-4xl text-primary font-bold">
                    Nguyễn Thị Quỳnh Mai
                  </h3>
                  <p className="font-body text-sm text-secondary italic mt-1">
                    Operations &amp; Platform Lead | Thạc sĩ Tài chính Pháp
                  </p>
                </div>

                {/* Tabs điều hướng */}
                <div className="flex border-b border-surface-container gap-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabMai(tab.id)}
                      className={`flex items-center gap-2 pb-3 font-label text-xs font-bold uppercase tracking-wider transition-colors relative ${
                        activeTabMai === tab.id ? 'text-heritage-maroon' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                      {tab.label}
                      {activeTabMai === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-heritage-maroon rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Nội dung Tab */}
                <div className="min-h-[180px] font-body text-sm text-secondary leading-relaxed space-y-4">
                  {activeTabMai === 'bio' && (
                    <div className="space-y-4 animate-fade-in">
                      <p>
                        Sở hữu bằng Thạc sĩ Tài chính tại Pháp cùng hơn 11 năm kinh nghiệm trong quản trị chuỗi cung ứng, tài chính doanh nghiệp và nghiên cứu tâm lý học hành vi chuyên sâu. Chị Mai mang đến tư duy hệ thống tối giản kết hợp cùng sự thấu hiểu về hành trình phát triển tâm trí của con người.
                      </p>
                      <p>
                        Với niềm đam mê trong việc ứng dụng Trí tuệ Nhân tạo (AI) vào quản trị giáo dục, chị là người xây dựng nền móng công nghệ, thiết kế các giải pháp back-office thông minh. Từ đó kiến tạo nên các giải pháp hỗ trợ vượt trội cho quá trình đào tạo và phát triển con người.
                      </p>
                    </div>
                  )}

                  {activeTabMai === 'expertise' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Cử nhân Kinh Tế</strong> – Đại học Francois Rabelais Tours, Cộng hòa Pháp.
                      </li>
                      <li>
                        <strong className="text-primary">Thạc Sĩ Tài Chính Doanh Nghiệp</strong> – Viện Quản trị Doanh nghiệp (IAE) Toulouse, Pháp.
                      </li>
                      <li>
                        Hơn 6 năm kinh nghiệm quản trị tài chính doanh nghiệp và vận hành chuỗi cung ứng (Supply Chain) tại doanh nghiệp đa quốc gia.
                      </li>
                    </ul>
                  )}

                  {activeTabMai === 'achievements' && (
                    <ul className="space-y-3 animate-fade-in pl-4 list-disc">
                      <li>
                        <strong className="text-primary">Nghiên cứu Hành vi &amp; Tâm trí:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>5 năm nghiên cứu chuyên sâu về khoa học hành vi, tâm lý học nhận thức và phát triển nội lực con người.</li>
                          <li>Ứng dụng thực hành tư duy tỉnh thức (mindfulness) vào việc xây dựng trải nghiệm chuyển hóa toàn diện cho học viên trong các khóa đào tạo.</li>
                        </ul>
                      </li>
                      <li>
                        <strong className="text-primary">Năng lực hệ thống &amp; Tự động hóa AI:</strong>
                        <ul className="pl-6 mt-1 list-circle space-y-1">
                          <li>Kiến trúc sư thiết kế cấu trúc hệ thống dữ liệu học tập và quy trình hệ thống tinh gọn của học viện.</li>
                          <li>Tích hợp các mô hình AI tiên tiến vào quản lý dữ liệu lớn và tối ưu hóa trải nghiệm học tập cá nhân hóa trên môi trường số.</li>
                        </ul>
                      </li>
                    </ul>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-heritage-maroon text-zen-white overflow-hidden rounded-xl max-w-container-max mx-auto my-12 px-margin-desktop text-center">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[300px] absolute -right-20 -top-20">
            all_inclusive
          </span>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="font-headline text-3xl md:text-5xl max-w-3xl mx-auto">
            Sẵn sàng bứt phá hiệu suất hệ thống đại lý của bạn?
          </h2>
          <p className="font-body text-sm md:text-base opacity-80 max-w-xl mx-auto leading-relaxed">
            Đặt lịch hẹn 30 phút thảo luận cùng đội ngũ chuyên gia của MAI Institute để nhận diện các giải pháp chuyển đổi phù hợp nhất.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-zen-white text-heritage-maroon px-8 py-4 font-label text-xs font-bold uppercase tracking-widest hover:bg-paper-grey transition-all active:scale-95 duration-150 rounded-sm shadow-md"
          >
            Đăng ký tham vấn giải pháp cho đội ngũ của bạn.
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource="Đặt lịch Tư vấn Chiến lược từ trang Đội ngũ &amp; Triết lý"
      />
    </div>
  );
}
