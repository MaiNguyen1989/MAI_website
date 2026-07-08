'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingModal from '@/components/shared/BookingModal';

interface Milestone {
  stage: string;
  title: string;
  solution: string;
  focus: string;
  modules: string[];
  format: string;
  icon: string;
}

function SolutionsContent() {
  const searchParams = useSearchParams();
  const [activeBranch, setActiveBranch] = useState<'specialist' | 'management'>('specialist');
  const [hoveredBranch, setHoveredBranch] = useState<'specialist' | 'management' | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<{ branch: 'specialist' | 'management'; index: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');

  const openRegisterModal = (program: string) => {
    setModalSource(program);
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Nhánh 1: Chuyên môn Đại lý (LIBA)
  const specialistRoadmap: Milestone[] = [
    {
      stage: 'Gia nhập ngành',
      title: 'Người bán sản phẩm bảo vệ',
      solution: 'LIBA Foundation – Phân tích sản phẩm BHNT',
      focus: 'Nắm vững bản chất cốt lõi của sản phẩm và xác định đúng nhu cầu bảo vệ cơ bản của khách hàng.',
      modules: [
        'Module 1: 3 đặc tính của BHNT.',
        'Module 2: 6 nhóm quyền lợi trong BHNT.',
        'Module 3: Xác định nhu cầu bảo hiểm (Plan).'
      ],
      format: 'Workshop 1 buổi.',
      icon: 'shield'
    },
    {
      stage: 'Sống được với nghề (1 - 2 năm)',
      title: 'Nhà tư vấn giải pháp tích lũy',
      solution: 'LIBA Level 1',
      focus: 'Nâng cao năng lực thẩm định quyền lợi và quy trình hóa hoạt động tư vấn nhằm gia tăng tỷ lệ chốt hợp đồng thành công.',
      modules: [
        'Module 4: Review quyền lợi BHNT.',
        'Module 5: Quy trình Review quyền lợi BHNT.'
      ],
      format: 'Lớp học 2 buổi kết hợp Khai vấn chuyên sâu 1:1.',
      icon: 'savings'
    },
    {
      stage: 'Làm nghề chủ động (2+ năm)',
      title: 'Nhà hoạch định chiến lược (Tài chính - Bảo hiểm)',
      solution: 'LIBA Level 2',
      focus: 'Tích hợp kiến thức quản lý tài chính cá nhân vào giải pháp bảo hiểm, chủ động kiểm soát hiệu suất làm nghề.',
      modules: [
        'Module 1: Mô hình chiến lược tài chính & danh mục hợp đồng BHNT.',
        'Module 2: Mô hình hoạch định tài chính - bảo hiểm.'
      ],
      format: 'Lớp học 4 buổi + Khai vấn 1:1 + Tham gia Nhóm định kỳ hàng tháng trong vòng 6 tháng.',
      icon: 'query_stats'
    },
    {
      stage: 'Làm nghề bền vững (5+ năm)',
      title: 'Nhà cố vấn tài chính',
      solution: 'LIBA Pro',
      focus: 'Làm chủ bức tranh kinh tế vĩ mô, quản trị danh mục tài sản phức tạp và dẫn dắt xu hướng thị trường để kiến tạo di sản lâu dài.',
      modules: [
        'Module 1: Mô hình danh mục tài sản.',
        'Module 2: Giải mã kinh tế vĩ mô.',
        'Module 3: Chu kỳ thị trường.',
        'Module 4: Cập nhật chính sách, xu hướng đầu tư và phát triển khách hàng cao cấp.'
      ],
      format: 'Lớp học 4 buổi + Workshop 1 buổi + Khai vấn 1:1 + Tham gia Nhóm định kỳ hàng quý trong vòng 1 năm.',
      icon: 'workspace_premium'
    }
  ];

  // Nhánh 2: Quản lý Kinh doanh (Coaching)
  const managementRoadmap: Milestone[] = [
    {
      stage: 'Self Leader',
      title: 'Làm chủ bản thân',
      solution: 'Nghiên cứu tri thức từ Sách "LỰA CHỌN"',
      focus: 'Hiểu rõ bản chất công việc quản lý, các nguồn thu nhận và cách thức vận hành cơ bản của một nhóm kinh doanh.',
      modules: [
        'Tác giả: Chuyên gia Gia Hạnh.',
        'Nội dung: Hiểu rõ công việc quản lý.',
        'Hiểu rõ các nguồn thu nhận quản lý.',
        'Hiểu rõ cách vận hành 1 nhóm kinh doanh.'
      ],
      format: 'Đọc sách & Nghiên cứu tự hướng dẫn.',
      icon: 'person'
    },
    {
      stage: 'Team Leader',
      title: 'Dẫn dắt đội nhóm',
      solution: 'Basic coaching - Level 1',
      focus: 'Chuyển đổi tư duy quản lý áp đặt sang tư duy đồng hành, làm chủ các kỹ năng giao tiếp khai vấn nền tảng.',
      modules: [
        'Module 1: Tư duy nền tảng về coaching.',
        'Module 2: Nền tảng giao tiếp khai vấn.',
        'Module 3: Quy trình coaching cơ bản & ứng dụng.'
      ],
      format: 'Lớp học 2 ngày (offline) hoặc 4 buổi trực tuyến.',
      icon: 'groups'
    },
    {
      stage: 'Team Builder',
      title: 'Kiến tạo và phát triển đội nhóm',
      solution: 'Coaching thực chiến - Level 2',
      focus: 'Sở hữu năng lực xây dựng nhiều đội nhóm mạnh, giải quyết xung đột nhân sự và tạo động lực thực chiến dựa trên hành vi thực tế.',
      modules: [
        'Module 1: Coaching theo hành vi và kết quả.',
        'Module 2: Coaching theo tình huống nhân sự.',
        'Module 3: Coaching tạo động lực và tăng hiệu suất.'
      ],
      format: 'Lớp học 3 ngày hoặc 6 buổi.',
      icon: 'diversity_3'
    },
    {
      stage: 'Business Builder',
      title: 'Xây dựng và tối ưu hệ thống kinh doanh',
      solution: 'Leadership coaching for Leaders - Level 3',
      focus: 'Nâng tầm tư duy lãnh đạo chiến lược, xây dựng văn hóa kế thừa và chuyển hóa toàn diện năng suất của đội ngũ.',
      modules: [
        'Module 1: Leadership coaching mindset.',
        'Module 2: Xây dựng văn hóa coaching & kế thừa.',
        'Module 3: Coaching chiến lược và chuyển hóa đội ngũ.'
      ],
      format: 'Lớp học 4 ngày hoặc 8 buổi (3 giờ/buổi) kết hợp Khai vấn chuyên sâu 1:1.',
      icon: 'domain'
    },
    {
      stage: 'System Builder',
      title: 'Kiến tạo hệ sinh thái và năng lực bền vững',
      solution: 'COACHMATE - Leadership Operating Ecosystem',
      focus: 'Số hóa toàn diện mô hình quản trị, làm chủ các đường ống tuyển dụng, lộ trình học tập và kiểm soát sức khỏe doanh nghiệp thông qua dữ liệu.',
      modules: [
        'Hệ điều hành phát triển lãnh đạo tích hợp giải pháp LPIS.',
        'Hệ thống công cụ tối ưu: Đánh giá trưởng thành (Maturity Assessment).',
        'Đường ống tài năng (Talent Pipeline) & Hệ thống tuyển dụng (Recruitment System).',
        'Lộ trình học tập (Learning Journey) & Bảng quản trị dữ liệu (Dashboard).'
      ],
      format: 'Khai vấn chuyên sâu 1:1 + Coaching & Mentoring từ Chuyên gia + Bàn giao Bộ công cụ & Ứng dụng công nghệ (Tools).',
      icon: 'all_inclusive'
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

  // Xử lý các query parameter từ trang Chẩn đoán
  useEffect(() => {
    const branch = searchParams.get('branch');
    const stageStr = searchParams.get('stage');

    if (branch === 'specialist' || branch === 'management') {
      setActiveBranch(branch);
      
      if (stageStr) {
        const stageIdx = parseInt(stageStr, 10) - 1;
        const maxIdx = branch === 'specialist' ? specialistRoadmap.length - 1 : managementRoadmap.length - 1;
        
        if (stageIdx >= 0 && stageIdx <= maxIdx) {
          // Mở Side Drawer cột mốc
          setTimeout(() => {
            setSelectedStage({ branch, index: stageIdx });
            // Cuộn mượt đến bản đồ
            const element = document.getElementById('career-map');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 300);
        }
      }
    }
  }, [searchParams]);

  // Lấy dữ liệu cột mốc đang được hiển thị trong Side Drawer
  const activeMilestone: Milestone | null = selectedStage
    ? selectedStage.branch === 'specialist'
      ? specialistRoadmap[selectedStage.index]
      : managementRoadmap[selectedStage.index]
    : null;

  return (
    <div id="view-solutions" className="view-content">
      {/* Header */}
      <section className="py-16 px-margin-desktop bg-paper-grey/20">
        <div className="max-w-container-max mx-auto text-center">
          <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2 animate-fadeIn">
            Career Orientation &amp; Programs
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 animate-fadeIn">
            Học Viện Đào Tạo Hiệu Suất Cao
          </h1>
          <p className="font-body text-sm md:text-base text-secondary max-w-2xl mx-auto leading-relaxed animate-fadeIn">
            Lộ trình chuyển đổi hiệu suất và chuẩn hóa quy trình thấu cảm, thiết kế riêng cho ngành Bảo hiểm Nhân thọ tại Việt Nam.
          </p>
        </div>
      </section>

      {/* CORE SERVICES SECTION (NEW - PHÂN BIỆT RÕ 2 DỊCH VỤ) */}
      <section className="py-16 px-margin-desktop bg-background border-b border-surface-container/60">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block">
              Our Services
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Dịch vụ Đào tạo */}
            <div className="bg-zen-white border border-surface-container rounded-lg p-8 shadow-sm hover:border-heritage-maroon/30 transition-soft flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-heritage-maroon/5 text-heritage-maroon w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-heritage-maroon group-hover:text-zen-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[24px]">local_library</span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary">Đào Tạo Năng Lực &amp; Hiệu Suất</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">
                  Hệ thống chương trình đào tạo toàn diện, hỗ trợ xây dựng năng lực chuyên môn thực chiến cho Đại lý (<strong>LIBA</strong>) và nâng tầm kỹ năng khai vấn quản trị dựa trên dữ liệu cho cấp Quản lý (<strong>Coaching</strong>).
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container/60 mt-6">
                <button
                  onClick={() => scrollToSection('career-map')}
                  className="w-full bg-heritage-maroon text-zen-white hover:bg-primary-container transition-all py-3.5 font-label text-xs font-bold uppercase tracking-widest rounded-sm text-center active:scale-95 duration-150"
                >
                  Khám phá Lộ trình Đào tạo
                </button>
              </div>
            </div>

            {/* Card 2: Dịch vụ Tổ chức Workshop */}
            <div className="bg-zen-white border border-surface-container rounded-lg p-8 shadow-sm hover:border-heritage-maroon/30 transition-soft flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="bg-heritage-maroon/5 text-heritage-maroon w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-heritage-maroon group-hover:text-zen-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[24px]">campaign</span>
                </div>
                <h3 className="font-display text-xl font-bold text-primary">Đồng Hành Tổ Chức Workshop Khách Hàng</h3>
                <p className="font-body text-sm text-secondary leading-relaxed">
                  Giải pháp phối hợp giúp nhà tư vấn gia tăng mức độ gắn kết và uy tín trước khách hàng. Chúng tôi cung cấp cẩm nang nội dung chuẩn hóa, kết nối diễn giả chia sẻ sâu sắc các chủ đề hoạch định tài chính cá nhân.
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container/60 mt-6">
                <button
                  onClick={() => scrollToSection('workshops-section')}
                  className="w-full border border-heritage-maroon text-heritage-maroon hover:bg-heritage-maroon hover:text-zen-white transition-all py-3.5 font-label text-xs font-bold uppercase tracking-widest rounded-sm text-center active:scale-95 duration-150"
                >
                  Xem các Chủ đề Workshop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Dashboard Title */}
      <section className="pt-16 px-margin-desktop bg-background" id="career-map">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-3">
            Bạn đang đứng ở đâu trong hành trình di sản của mình?
          </h2>
          <p className="font-body text-sm text-secondary max-w-2xl mx-auto leading-relaxed">
            Hãy lựa chọn nhánh phát triển tương ứng với điểm tựa hiện tại của bạn để mở khóa lộ trình giải pháp được cá nhân hóa từ MAI Institute.
          </p>
        </div>
      </section>

      {/* CAREER INTERACTIVE DASHBOARD */}
      <section className="py-12 px-margin-desktop bg-background relative overflow-hidden">
        <div className="max-w-container-max mx-auto">
          
          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden justify-center mb-8 border-b border-surface-container gap-2">
            <button
              onClick={() => setActiveBranch('specialist')}
              className={`flex-1 py-4 text-center font-label text-xs font-bold uppercase tracking-wider transition-all ${
                activeBranch === 'specialist'
                  ? 'border-b-2 border-heritage-maroon text-heritage-maroon'
                  : 'text-secondary'
              }`}
            >
              Lộ trình Đại lý (LIBA)
            </button>
            <button
              onClick={() => setActiveBranch('management')}
              className={`flex-1 py-4 text-center font-label text-xs font-bold uppercase tracking-wider transition-all ${
                activeBranch === 'management'
                  ? 'border-b-2 border-heritage-maroon text-heritage-maroon'
                  : 'text-secondary'
              }`}
            >
              Lộ trình Quản trị
            </button>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-4 items-stretch relative">
            
            {/* CỘT TRÁI: NHÁNH CHUYÊN MÔN (LIBA) */}
            <div 
              className={`col-span-5 space-y-6 transition-all duration-300 ${
                hoveredBranch === 'management' ? 'opacity-40 scale-[0.98]' : hoveredBranch === 'specialist' ? 'scale-[1.02] opacity-100' : ''
              }`}
              onMouseEnter={() => setHoveredBranch('specialist')}
              onMouseLeave={() => setHoveredBranch(null)}
            >
              <div className="text-right pr-6 mb-8">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Professional Suite
                </span>
                <h3 className="font-display text-2xl text-primary font-bold mt-2">Lộ trình Đại lý Tư vấn chuyên nghiệp (LIBA)</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed max-w-sm ml-auto">
                  Nâng tầm tư duy từ một &quot;Người bán sản phẩm&quot; thuần túy thành một &quot;Nhà cố vấn tài chính toàn diện&quot;.
                </p>
              </div>

              <div className="space-y-6">
                {specialistRoadmap.map((item, idx) => {
                  const isHovered = hoveredStage === `specialist-${idx}`;
                  return (
                    <div 
                      key={item.title}
                      className="relative cursor-pointer group bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm hover:border-heritage-maroon/60 transition-soft"
                      onMouseEnter={() => setHoveredStage(`specialist-${idx}`)}
                      onMouseLeave={() => setHoveredStage(null)}
                      onClick={() => setSelectedStage({ branch: 'specialist', index: idx })}
                    >
                      {/* Cột mốc Label */}
                      <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                        Cột mốc 0{idx + 1} — {item.stage}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-primary mt-1">{item.title}</h4>
                      <p className="font-body text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">{item.focus}</p>
                      
                      <div className="mt-4 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                        <span>Khóa: {item.solution}</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Chi tiết <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                        </span>
                      </div>

                      {/* SVG Line nối sang trục giữa */}
                      <div className={`absolute top-1/2 -right-8 w-8 h-px z-0 pointer-events-none transition-all duration-300 ${
                        isHovered ? 'border-t-2 border-heritage-maroon border-solid' : 'border-t border-surface-container border-dashed'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CỘT GIỮA: TRỤC TRUNG TÂM (ĐÃ BỎ KHỐI BÁN HÀNG) */}
            <div className="col-span-2 flex flex-col items-center justify-center py-12 relative min-h-[600px]">
              {/* Trục nét đứt dọc chạy suốt chiều cao */}
              <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-heritage-maroon/20 z-0"></div>

              {/* Logo MAI ở trên */}
              <div className="relative z-10 bg-zen-white p-3 rounded-full border border-surface-container shadow-sm mb-12 transition-transform duration-700 hover:rotate-180">
                <img 
                  alt="MAI Institute Logo" 
                  className="h-10 w-10 object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9lDDOktfXYovL94tHBrnqXMCK4igx_lTHn325gf1yG1IWLZN-zPHOovHqKgwfiuNBr4HTm-L1O_WhP53ypmNZ37oqnn252tewc5gU2BSEzintj93qZmieuKUWOFwZvx4qynf3EblbM-9M8_87GAy0Ci85iHLaJSKanRB_RDlI5WNxMXmMyAmy2wyfZ_y7O5igVT6Vc0YndNSqJxQgsG64VNoLqcLIqWqjbxuCCy93KsJIEmFkjuau8vMaqw6bASVb__GmYmLbr0" 
                />
              </div>

              {/* Vòng Zen trang trí ở giữa */}
              <div className="relative w-full flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-dashed border-heritage-maroon/20 flex items-center justify-center animate-spin" style={{ animationDuration: '30s' }}>
                  <span className="material-symbols-outlined text-heritage-maroon/15 text-[32px]">sync_alt</span>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: NHÁNH QUẢN LÝ (COACHING) */}
            <div 
              className={`col-span-5 space-y-6 transition-all duration-300 ${
                hoveredBranch === 'specialist' ? 'opacity-40 scale-[0.98]' : hoveredBranch === 'management' ? 'scale-[1.02] opacity-100' : ''
              }`}
              onMouseEnter={() => setHoveredBranch('management')}
              onMouseLeave={() => setHoveredBranch(null)}
            >
              <div className="text-left pl-6 mb-8">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Executive Suite
                </span>
                <h3 className="font-display text-2xl text-primary font-bold mt-2">Lộ trình Nhà quản trị kinh doanh xuất sắc</h3>
                <p className="font-body text-xs text-secondary mt-2 leading-relaxed max-w-sm">
                  Dịch chuyển từ quản trị thủ công sang xây dựng hệ điều hành phát triển lãnh đạo dựa trên dữ liệu thực tế.
                </p>
              </div>

              <div className="space-y-6">
                {managementRoadmap.map((item, idx) => {
                  const isHovered = hoveredStage === `management-${idx}`;
                  return (
                    <div 
                      key={item.title}
                      className="relative cursor-pointer group bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm hover:border-heritage-maroon/60 transition-soft"
                      onMouseEnter={() => setHoveredStage(`management-${idx}`)}
                      onMouseLeave={() => setHoveredStage(null)}
                      onClick={() => setSelectedStage({ branch: 'management', index: idx })}
                    >
                      {/* SVG Line nối sang trục giữa */}
                      <div className={`absolute top-1/2 -left-8 w-8 h-px z-0 pointer-events-none transition-all duration-300 ${
                        isHovered ? 'border-t-2 border-heritage-maroon border-solid' : 'border-t border-surface-container border-dashed'
                      }`}></div>

                      {/* Cột mốc Label */}
                      <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                        Cột mốc 0{idx + 1} — {item.stage}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-primary mt-1">{item.title}</h4>
                      <p className="font-body text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">{item.focus}</p>
                      
                      <div className="mt-4 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                        <span>Giải pháp: {item.solution}</span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Chi tiết <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Mobile List Layout (ĐÃ BỎ BÁN HÀNG) */}
          <div className="block lg:hidden space-y-6">
            {activeBranch === 'specialist' ? (
              <div className="space-y-6">
                <div className="text-center px-4 mb-6">
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    Nâng tầm tư duy từ một &quot;Người bán sản phẩm&quot; thuần túy thành một &quot;Nhà cố vấn tài chính toàn diện&quot;, làm chủ dòng tiền và đồng hành cùng khách hàng.
                  </p>
                </div>
                {specialistRoadmap.map((item, idx) => (
                  <div 
                    key={item.title}
                    className="bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm active:border-heritage-maroon transition-soft"
                    onClick={() => setSelectedStage({ branch: 'specialist', index: idx })}
                  >
                    <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                      Cột mốc 0{idx + 1} — {item.stage}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-primary mt-1">{item.title}</h4>
                    <p className="font-body text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">{item.focus}</p>
                    <div className="mt-4 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                      <span className="truncate max-w-[70%]">Khóa: {item.solution}</span>
                      <span className="flex items-center gap-1">
                        Chi tiết <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center px-4 mb-6">
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    Dịch chuyển từ quản trị thủ công sang xây dựng hệ điều hành phát triển lãnh đạo dựa trên dữ liệu thực tế, giải phóng sức lao động.
                  </p>
                </div>
                {managementRoadmap.map((item, idx) => (
                  <div 
                    key={item.title}
                    className="bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm active:border-heritage-maroon transition-soft"
                    onClick={() => setSelectedStage({ branch: 'management', index: idx })}
                  >
                    <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                      Cột mốc 0{idx + 1} — {item.stage}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-primary mt-1">{item.title}</h4>
                    <p className="font-body text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">{item.focus}</p>
                    <div className="mt-4 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                      <span className="truncate max-w-[70%]">Giải pháp: {item.solution}</span>
                      <span className="flex items-center gap-1">
                        Chi tiết <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION: WORKSHOP & TALKSHOW (SUPPORTING VALUES) */}
      <section id="workshops-section" className="py-20 px-margin-desktop bg-paper-grey/30 border-t border-surface-container scroll-mt-12">
        <div className="max-w-container-max mx-auto space-y-12">
          
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
                <p className="font-body text-sm text-secondary leading-relaxed">
                  Thiết lập vị thế nhà cố vấn đáng tin cậy trong lòng khách hàng dựa trên năng lực giải quyết vấn đề thực tế và sự thấu cảm nhân văn.
                </p>
              </div>
            </div>
          </div>

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
                    <p className="font-body text-sm text-secondary leading-relaxed">{topic.description}</p>
                  </div>
                  <div className="border-t border-surface-container/60 pt-4 mt-4">
                    <span className="text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider block">
                      Tiêu điểm:
                    </span>
                    <p className="font-body text-xs text-secondary mt-1 italic">{topic.focus}</p>
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
      </section>

      {/* SIDE DRAWER FOR MILESTONE DETAILS */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          selectedStage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedStage(null)}
        ></div>

        {/* Drawer Panel */}
        <div 
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-zen-white shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            selectedStage ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
            onClick={() => setSelectedStage(null)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          {activeMilestone && (
            <div className="flex-1 flex flex-col justify-between h-full pt-6 overflow-y-auto">
              
              <div className="space-y-6 pr-2">
                {/* Header info */}
                <div>
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider">
                    {selectedStage?.branch === 'specialist' ? 'Lộ trình Đại lý (LIBA)' : 'Lộ trình Quản lý'}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-primary mt-1">
                    {activeMilestone.title}
                  </h3>
                  <div className="mt-2 inline-block bg-paper-grey text-secondary px-3 py-1 text-xs font-semibold rounded font-label">
                    Giai đoạn: {activeMilestone.stage}
                  </div>
                </div>

                {/* Nhu cầu thực tế */}
                <div className="space-y-2 bg-paper-grey/30 border border-surface-container rounded-lg p-5">
                  <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider block">Nhu cầu thực tế:</span>
                  <p className="font-body text-sm text-on-surface leading-relaxed italic">
                    &quot;{activeMilestone.focus}&quot;
                  </p>
                </div>

                {/* Giải pháp đào tạo & Module */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider block">Giải pháp đề xuất:</span>
                    <p className="font-body text-base font-semibold text-primary">{activeMilestone.solution}</p>
                  </div>

                  {activeMilestone.modules.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider block">Nội dung chi tiết:</span>
                      <ul className="space-y-2.5">
                        {activeMilestone.modules.map((mod, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm font-body text-secondary">
                            <span className="material-symbols-outlined text-[16px] text-heritage-maroon mt-0.5">check_circle</span>
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Hình thức */}
                <div className="space-y-1 border-t border-surface-container pt-4">
                  <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-wider block">Hình thức triển khai:</span>
                  <p className="font-body text-sm text-secondary">{activeMilestone.format}</p>
                </div>
              </div>

              {/* Action Button at the bottom of the Drawer */}
              <div className="pt-6 border-t border-surface-container mt-8">
                <button
                  onClick={() => {
                    const programName = selectedStage?.branch === 'specialist'
                      ? `Lộ trình LIBA: ${activeMilestone.title} (${activeMilestone.stage})`
                      : `Lộ trình Quản trị: ${activeMilestone.title} (${activeMilestone.stage})`;
                    openRegisterModal(`Đăng ký Tư vấn: ${programName}`);
                  }}
                  className="w-full bg-heritage-maroon text-zen-white hover:bg-primary-container transition-all py-4 font-label text-xs font-bold uppercase tracking-widest rounded-sm text-center active:scale-95 duration-150 shadow"
                >
                  {selectedStage?.branch === 'specialist' ? 'Đăng ký Lộ trình LIBA tương ứng' : 'Kích hoạt Lộ trình & Nhận tư vấn'}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource={modalSource}
      />
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-heritage-maroon border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SolutionsContent />
    </Suspense>
  );
}
