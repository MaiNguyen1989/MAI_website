'use client';

import React, { useState } from 'react';
import BookingModal from '@/components/shared/BookingModal';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'coaching' | 'liba' | 'workshop'>('coaching');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');

  const openRegisterModal = (program: string) => {
    setModalSource(program);
    setIsModalOpen(true);
  };

  const coachingRoadmap = [
    {
      stage: 'Self Leader',
      title: 'Làm chủ bản thân',
      solution: 'Nhận thức & Thấu hiểu Quản lý',
      modules: [
        'Hiểu rõ công việc quản lý',
        'Hiểu rõ các nguồn thu nhận quản lý',
        'Hiểu rõ các vận hành 1 nhóm kinh doanh'
      ],
      format: 'Sách "LỰA CHỌN"',
      icon: 'person'
    },
    {
      stage: 'Team Leader',
      title: 'Dẫn dắt đội nhóm',
      solution: 'Basic Coaching - Level 1',
      modules: [
        'Module 1: Tư duy nền tảng về coaching',
        'Module 2: Nền tảng giao tiếp khai vấn',
        'Module 3: Quy trình coaching cơ bản & ứng dụng'
      ],
      format: 'Lớp học - 2 ngày (offline) hoặc 4 buổi',
      icon: 'groups'
    },
    {
      stage: 'Team Builder',
      title: 'Kiến tạo & Phát triển đội nhóm',
      solution: 'Coaching Thực Chiến - Level 2',
      modules: [
        'Module 1: Coaching theo hành vi và kết quả',
        'Module 2: Coaching theo tình huống nhân sự',
        'Module 3: Coaching tạo động lực và tăng hiệu suất'
      ],
      format: 'Lớp học 3 ngày hoặc 6 buổi',
      icon: 'diversity_3'
    },
    {
      stage: 'Business Builder',
      title: 'Xây dựng & Tối ưu hệ thống',
      solution: 'Leadership Coaching for Leaders - Level 3',
      modules: [
        'Module 1: Leadership coaching mindset',
        'Module 2: Xây dựng văn hóa coaching & kế thừa',
        'Module 3: Coaching chiến lược và chuyển hóa đội ngũ'
      ],
      format: 'Lớp học 4 ngày hoặc 8 buổi (3h/buổi) + Coaching 1:1',
      icon: 'domain'
    },
    {
      stage: 'System Builder',
      title: 'Kiến tạo hệ sinh thái & Năng lực bền vững',
      solution: 'COACHMATE - Leadership Operating Ecosystem',
      modules: [
        'Hệ điều hành phát triển lãnh đạo tích hợp LPIS',
        'Đánh giá trưởng thành & Hệ thống Talent Pipeline',
        'Recruitment System, Learning Journey & Dashboard quản trị'
      ],
      format: 'Coaching 1:1 + Coaching & Mentoring + Tools quản lý độc quyền',
      icon: 'all_inclusive'
    }
  ];

  const libaRoadmap = [
    {
      stage: 'Gia nhập ngành',
      title: 'Người bán sản phẩm bảo vệ',
      solution: 'LIBA Foundation - Phân tích sản phẩm BHNT',
      modules: [
        'Module 1: 3 đặc tính của BHNT',
        'Module 2: 6 nhóm quyền lợi trong BHNT',
        'Module 3: Xác định nhu cầu bảo hiểm (Plan)'
      ],
      format: 'Workshop 1 buổi',
      icon: 'shield'
    },
    {
      stage: 'Sống được với nghề',
      title: 'Nhà tư vấn giải pháp tích lũy (Làm 1-2 năm)',
      solution: 'LIBA Level 1',
      modules: [
        'Module 4: Review quyền lợi BHNT',
        'Module 5: Quy trình Review quyền lợi BHNT'
      ],
      format: 'Lớp học 2 buổi + Coaching 1:1',
      icon: 'savings'
    },
    {
      stage: 'Làm nghề chủ động',
      title: 'Nhà hoạch định chiến lược (Làm 2+ năm)',
      solution: 'LIBA Level 2 - Hoạch định tài chính - bảo hiểm',
      modules: [
        'Module chiến lược tài chính & danh mục hợp đồng BHNT',
        'Quy trình hoạch định tài chính - bảo hiểm chuyên nghiệp'
      ],
      format: 'Lớp học 4 buổi + Coaching 1:1 + Nhóm định kỳ tháng (trong 6 tháng)',
      icon: 'query_stats'
    },
    {
      stage: 'Làm nghề bền vững',
      title: 'Nhà cố vấn tài chính (Làm 5+ năm)',
      solution: 'LIBA Pro',
      modules: [
        'Module quản trị danh mục tài sản',
        'Giải mã kinh tế vĩ mô & Chu kỳ thị trường tài chính',
        'Cập nhật chính sách, xu hướng đầu tư và phát triển khách hàng cao cấp'
      ],
      format: 'Lớp học 4 buổi + Workshop 1 buổi + Coaching 1:1 + Nhóm định kỳ quý (trong 1 năm)',
      icon: 'workspace_premium'
    }
  ];

  const workshopTopics = [
    {
      title: 'Tài chính Đại học (University Financial Planning)',
      description: 'Đồng hành cùng phụ huynh chuẩn bị ngân sách giáo dục vững vàng cho con cái. Thiết kế các quỹ dự phòng giáo dục dài hạn, bảo vệ tương lai học tập của con trẻ trước mọi biến cố và tối ưu hoá dòng tiền tích luỹ.',
      icon: 'school',
      focus: 'Chuẩn bị tài chính đại học vững vàng cho tương lai của con'
    },
    {
      title: 'Giáo dục Tài chính cho Trẻ em (Financial Education for Children)',
      description: 'Giúp phụ huynh nuôi dưỡng tư duy tài chính lành mạnh cho con trẻ ngay từ nhỏ. Phương pháp định hình thói quen chi tiêu, tiết kiệm và thấu hiểu giá trị của đồng tiền một cách tỉnh thức (Zen & Money for Kids).',
      icon: 'child_care',
      focus: 'Xây dựng tư duy tài chính thông minh cho thế hệ tương lai'
    },
    {
      title: 'Tài chính Sự nghiệp (Career Financial Planning)',
      description: 'Hoạch định lộ trình quản trị tài chính cá nhân theo từng giai đoạn thăng tiến sự nghiệp. Tối ưu hoá dòng tiền, quản trị nợ, đầu tư gia tăng tài sản bền vững và thiết lập lưới an sinh bảo vệ nguồn thu nhập cốt lõi.',
      icon: 'work',
      focus: 'Quản trị tài chính cá nhân theo lộ trình phát triển sự nghiệp'
    }
  ];

  return (
    <div id="view-solutions" className="view-content">
      <section className="py-16 px-margin-desktop bg-paper-grey/20">
        <div className="max-w-container-max mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2">
              Programs &amp; Solutions
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-primary mb-6">
              Học Viện Đào Tạo Hiệu Suất Cao
            </h1>
            <p className="font-body text-base md:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Lộ trình chuyển đổi hiệu suất và chuẩn hóa quy trình thấu thấu cảm, thiết kế riêng cho ngành Bảo hiểm Nhân thọ tại Việt Nam.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex flex-col md:flex-row justify-center border-b border-surface-container mb-12 max-w-4xl mx-auto gap-2 md:gap-0">
            <button
              onClick={() => setActiveTab('coaching')}
              className={`flex-1 py-4 text-center font-label text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'coaching'
                  ? 'border-b-2 border-heritage-maroon text-heritage-maroon'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Lộ trình cho Quản lý (Coaching)
            </button>
            <button
              onClick={() => setActiveTab('liba')}
              className={`flex-1 py-4 text-center font-label text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'liba'
                  ? 'border-b-2 border-heritage-maroon text-heritage-maroon'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Lộ trình cho Đại lý (LIBA)
            </button>
            <button
              onClick={() => setActiveTab('workshop')}
              className={`flex-1 py-4 text-center font-label text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === 'workshop'
                  ? 'border-b-2 border-heritage-maroon text-heritage-maroon'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              Talkshow &amp; Workshop (Khách hàng)
            </button>
          </div>

          {/* ROADMAPS CONTENT */}
          {activeTab === 'coaching' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Executive Suite Roadmap
                </span>
                <p className="font-body text-xs text-secondary mt-3">
                  Giải pháp Needs-payoff huấn luyện kỹ năng khai vấn và tự động hóa vận hành cho các nhà quản lý bảo hiểm qua 5 cấp độ trưởng thành.
                </p>
              </div>

              {/* TIMELINE */}
              <div className="relative border-l border-heritage-maroon/20 ml-4 md:ml-32 space-y-12 pb-8">
                {coachingRoadmap.map((item, idx) => (
                  <div key={item.stage} className="relative pl-8 md:pl-12">
                    {/* Circle Node */}
                    <div className="absolute -left-6 top-1.5 bg-zen-white border-2 border-heritage-maroon rounded-full w-12 h-12 flex items-center justify-center text-heritage-maroon shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>

                    {/* Content Card */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 shadow-sm hover:border-heritage-maroon/40 transition-soft">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                        <div>
                          <span className="font-label text-[10px] font-bold text-heritage-maroon uppercase tracking-widest">
                            Cấp độ 0{idx + 1} — {item.stage}
                          </span>
                          <h3 className="font-display text-2xl font-semibold text-primary mt-0.5">{item.title}</h3>
                        </div>
                        <span className="bg-paper-grey text-secondary px-3 py-1 rounded text-xs font-semibold font-label">
                          Hình thức: {item.format}
                        </span>
                      </div>

                      <div className="space-y-4 border-t border-surface-container/60 pt-4">
                        <div className="space-y-1">
                          <h4 className="font-label text-xs font-bold text-secondary uppercase tracking-wider">Giải pháp cần:</h4>
                          <p className="font-body text-sm font-semibold text-primary">{item.solution}</p>
                        </div>

                        <ul className="space-y-2 text-xs font-body text-secondary pl-1">
                          {item.modules.map((mod, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <span className="material-symbols-outlined text-[14px] text-heritage-maroon mt-0.5">check</span>
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => openRegisterModal(`Đăng ký Tư vấn: Coaching - ${item.stage}`)}
                          className="bg-heritage-maroon/5 text-heritage-maroon hover:bg-heritage-maroon hover:text-zen-white transition-all duration-300 px-4 py-2 font-label text-[10px] font-bold uppercase tracking-wider rounded-sm"
                        >
                          Đăng ký tư vấn lộ trình
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'liba' && (
            <div className="space-y-12 animate-fadeIn">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Professional Suite - LIBA Roadmap
                </span>
                <p className="font-body text-xs text-secondary mt-3">
                  Lộ trình chuyển đổi kỹ năng tư vấn sang Cố vấn tài chính chuyên nghiệp theo 4 cột mốc thời gian và kinh nghiệm làm nghề.
                </p>
              </div>

              {/* TIMELINE */}
              <div className="relative border-l border-heritage-maroon/20 ml-4 md:ml-32 space-y-12 pb-8">
                {libaRoadmap.map((item, idx) => (
                  <div key={item.stage} className="relative pl-8 md:pl-12">
                    {/* Circle Node */}
                    <div className="absolute -left-6 top-1.5 bg-zen-white border-2 border-heritage-maroon rounded-full w-12 h-12 flex items-center justify-center text-heritage-maroon shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>

                    {/* Content Card */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 shadow-sm hover:border-heritage-maroon/40 transition-soft">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                        <div>
                          <span className="font-label text-[10px] font-bold text-heritage-maroon uppercase tracking-widest">
                            Giai đoạn 0{idx + 1} — {item.stage}
                          </span>
                          <h3 className="font-display text-2xl font-semibold text-primary mt-0.5">{item.title}</h3>
                        </div>
                        <span className="bg-paper-grey text-secondary px-3 py-1 rounded text-xs font-semibold font-label max-w-xs text-right">
                          {item.format}
                        </span>
                      </div>

                      <div className="space-y-4 border-t border-surface-container/60 pt-4">
                        <div className="space-y-1">
                          <h4 className="font-label text-xs font-bold text-secondary uppercase tracking-wider">Giải pháp yêu cầu:</h4>
                          <p className="font-body text-sm font-semibold text-primary">{item.solution}</p>
                        </div>

                        <ul className="space-y-2 text-xs font-body text-secondary pl-1">
                          {item.modules.map((mod, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <span className="material-symbols-outlined text-[14px] text-heritage-maroon mt-0.5">check</span>
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => openRegisterModal(`Đăng ký Tư vấn: Lớp LIBA - ${item.stage}`)}
                          className="bg-heritage-maroon/5 text-heritage-maroon hover:bg-heritage-maroon hover:text-zen-white transition-all duration-300 px-4 py-2 font-label text-[10px] font-bold uppercase tracking-wider rounded-sm"
                        >
                          Đăng ký tư vấn lộ trình
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workshop' && (
            <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
              {/* Introduction Card */}
              <div className="bg-zen-white border border-surface-container rounded-lg p-8 md:p-12 shadow-sm space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Talkshow &amp; Workshop Dành Cho Khách Hàng Cuối
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-primary font-bold">
                    Trao Gửi Tri Thức - Đồng Hành Bền Vững
                  </h2>
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    Đồng hành cùng Đại lý kiến tạo sự gắn kết tự nhiên cùng khách hàng thông qua giá trị chuyên môn thực tiễn từ hoạch định tài chính cá nhân.
                  </p>
                </div>

                {/* Core Philosophy Section */}
                <div className="border-t border-surface-container/60 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl text-heritage-maroon italic">Triết lý của giai đoạn mới:</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      Trong xu thế phát triển mới, khách hàng ngày càng mong muốn nhận được những giải pháp cố vấn tài chính thực tế và phù hợp với bối cảnh cuộc sống của gia đình.
                    </p>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      Bên cạnh các phương thức tri ân khách hàng truyền thống, việc tổ chức các buổi workshop chia sẻ tri thức hoạch định tài chính chuyên sâu chính là giải pháp tối ưu. Điều này không chỉ giúp khách hàng thấu hiểu cặn kẽ nhu cầu quản trị tài sản của gia đình mà còn nâng tầm uy tín của nhà tư vấn.
                    </p>
                  </div>
                  <div className="bg-background/40 p-6 rounded-lg border border-surface-container border-dashed text-center space-y-4">
                    <span className="material-symbols-outlined text-[48px] text-heritage-maroon">volunteer_activism</span>
                    <h4 className="font-headline text-lg font-bold text-primary">Đồng Hành Bằng Chuyên Môn</h4>
                    <p className="font-body text-xs text-secondary leading-relaxed">
                      Thiết lập vị thế nhà cố vấn đáng tin cậy trong lòng khách hàng dựa trên năng lực giải quyết vấn đề thực tế và sự thấu cảm nhân văn.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Topics */}
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary text-center">Các Chủ Đề Đồng Hành Cốt Lõi:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workshopTopics.map((topic) => (
                    <div key={topic.title} className="bg-zen-white border border-surface-container hover:border-heritage-maroon/35 rounded-lg p-6 flex flex-col justify-between shadow-sm transition-soft">
                      <div className="space-y-4">
                        <div className="bg-heritage-maroon/5 text-heritage-maroon w-12 h-12 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[24px]">{topic.icon}</span>
                        </div>
                        <h4 className="font-display text-xl font-bold text-primary leading-snug">{topic.title}</h4>
                        <p className="font-body text-xs text-secondary leading-relaxed">{topic.description}</p>
                      </div>
                      <div className="border-t border-surface-container/60 pt-4 mt-4">
                        <span className="text-[10px] font-label font-bold text-heritage-maroon uppercase tracking-wider block">
                          Tiêu điểm:
                        </span>
                        <p className="font-body text-[11px] text-secondary mt-1 italic">{topic.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-primary text-zen-white rounded-lg p-8 md:p-12 text-center space-y-6 shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <span className="material-symbols-outlined text-[200px]">chat_bubble</span>
                </div>
                <h3 className="font-headline text-3xl">Tổ chức Workshop cho Đội ngũ của bạn?</h3>
                <p className="font-body text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
                  MAI Institute đồng hành hỗ trợ Đại lý chuẩn hóa slide nội dung, cung cấp tài liệu cẩm nang bài bản và kết nối diễn giả chia sẻ chuyên môn cùng khách hàng.
                </p>
                <button
                  onClick={() => openRegisterModal('Đăng ký tổ chức Talkshow/Workshop Khách hàng')}
                  className="bg-zen-white text-heritage-maroon hover:bg-paper-grey font-label text-xs font-bold uppercase tracking-widest px-8 py-4 transition-all duration-150 active:scale-95 rounded-sm"
                >
                  Liên hệ Thiết lập Workshop ngay
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource={modalSource}
      />
    </div>
  );
}
