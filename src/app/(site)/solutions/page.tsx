'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingModal from '@/components/shared/BookingModal';
import Link from 'next/link';

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
  const [activeTab, setActiveTab] = useState<'liba' | 'coaching' | 'workshop'>('liba');

  const handleTabChange = (tab: 'liba' | 'coaching' | 'workshop') => {
    setActiveTab(tab);
    if (tab === 'liba') {
      setActiveBranch('specialist');
    } else if (tab === 'coaching') {
      setActiveBranch('management');
    }
    setTimeout(() => {
      const element = document.getElementById('solutions-detail-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

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
      setActiveTab(branch === 'specialist' ? 'liba' : 'coaching');
      
      if (stageStr) {
        const stageIdx = parseInt(stageStr, 10) - 1;
        const maxIdx = branch === 'specialist' ? specialistRoadmap.length - 1 : managementRoadmap.length - 1;
        
        if (stageIdx >= 0 && stageIdx <= maxIdx) {
          // Mở Side Drawer cột mốc
          setTimeout(() => {
            setSelectedStage({ branch, index: stageIdx });
            // Cuộn mượt đến bản đồ
            const element = document.getElementById('solutions-detail-section');
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
          <div className="flex justify-start mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-label font-bold text-secondary hover:text-heritage-maroon transition-colors group"
            >
              <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Quay lại Trang chủ
            </Link>
          </div>
          <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block mb-2 animate-fadeIn">
            Career Orientation &amp; Programs
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-primary mb-6 animate-fadeIn">
            Học Viện Hành Động Tỉnh Thức
          </h1>
          <p className="font-body text-sm md:text-base text-secondary max-w-2xl mx-auto leading-relaxed animate-fadeIn">
            Lộ trình chuyển đổi hiệu suất và chuẩn hóa quy trình thấu cảm, thiết kế riêng cho ngành Bảo hiểm Nhân thọ tại Việt Nam.
          </p>
        </div>
      </section>

      {/* NAVIGATION HUB (CENTRAL PORTAL - NEW) */}
      <section className="py-16 px-margin-desktop bg-background border-b border-surface-container/60">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block">
              Our Programs &amp; Services
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-primary font-bold">
              Chương Trình &amp; Dịch Vụ Cốt Lõi
            </h2>
            <p className="font-body text-xs md:text-sm text-secondary max-w-xl mx-auto leading-relaxed">
              Khám phá các lộ trình đào tạo chuyên sâu và giải pháp hỗ trợ thực chiến được thiết kế may đo cho ngành Bảo hiểm Nhân thọ tại Việt Nam.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Khóa học LIBA */}
            <div 
              onClick={() => handleTabChange('liba')}
              className={`cursor-pointer rounded-lg p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group border relative ${
                activeTab === 'liba' 
                  ? 'bg-zen-white border-heritage-maroon shadow-md scale-[1.02] ring-1 ring-heritage-maroon/20' 
                  : 'bg-zen-white/50 border-surface-container/80 hover:border-heritage-maroon/40 hover:bg-zen-white shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeTab === 'liba' ? 'bg-heritage-maroon text-zen-white' : 'bg-heritage-maroon/5 text-heritage-maroon group-hover:bg-heritage-maroon group-hover:text-zen-white'
                }`}>
                  <span className="material-symbols-outlined text-[24px]">local_library</span>
                </div>
                <div>
                  <span className="font-label text-[10px] font-bold text-heritage-maroon uppercase tracking-wider block mb-1">
                    Khóa học đại lý
                  </span>
                  <h3 className="font-display text-xl font-bold text-primary">LIBA – Cố Vấn Chuyên Nghiệp</h3>
                </div>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                  Định hình tư duy phân tích quyền lợi và hoạch định tài chính toàn diện. Chuyển đổi vai trò từ người bán hàng sang Chuyên gia cố vấn tài chính đáng tin cậy.
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container/60 mt-6 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                <span>Khám phá chương trình</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
              {activeTab === 'liba' && (
                <div className="absolute top-3 right-3 bg-heritage-maroon text-zen-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wider scale-95">
                  Đang xem
                </div>
              )}
            </div>

            {/* Card 2: Khóa học Coaching */}
            <div 
              onClick={() => handleTabChange('coaching')}
              className={`cursor-pointer rounded-lg p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group border relative ${
                activeTab === 'coaching' 
                  ? 'bg-zen-white border-heritage-maroon shadow-md scale-[1.02] ring-1 ring-heritage-maroon/20' 
                  : 'bg-zen-white/50 border-surface-container/80 hover:border-heritage-maroon/40 hover:bg-zen-white shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeTab === 'coaching' ? 'bg-heritage-maroon text-zen-white' : 'bg-heritage-maroon/5 text-heritage-maroon group-hover:bg-heritage-maroon group-hover:text-zen-white'
                }`}>
                  <span className="material-symbols-outlined text-[24px]">groups</span>
                </div>
                <div>
                  <span className="font-label text-[10px] font-bold text-heritage-maroon uppercase tracking-wider block mb-1">
                    Huấn luyện quản lý
                  </span>
                  <h3 className="font-display text-xl font-bold text-primary">Coaching – Nâng Tầm Quản Trị</h3>
                </div>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                  Khai phóng năng lực dẫn dắt. Dịch chuyển từ quản lý áp đặt sang tư duy khai vấn đồng hành, giải phóng sức lao động và kiến tạo đội ngũ tự vận hành.
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container/60 mt-6 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                <span>Khám phá chương trình</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
              {activeTab === 'coaching' && (
                <div className="absolute top-3 right-3 bg-heritage-maroon text-zen-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wider scale-95">
                  Đang xem
                </div>
              )}
            </div>

            {/* Card 3: Workshop Dịch vụ */}
            <div 
              onClick={() => handleTabChange('workshop')}
              className={`cursor-pointer rounded-lg p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group border relative ${
                activeTab === 'workshop' 
                  ? 'bg-zen-white border-heritage-maroon shadow-md scale-[1.02] ring-1 ring-heritage-maroon/20' 
                  : 'bg-zen-white/50 border-surface-container/80 hover:border-heritage-maroon/40 hover:bg-zen-white shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeTab === 'workshop' ? 'bg-heritage-maroon text-zen-white' : 'bg-heritage-maroon/5 text-heritage-maroon group-hover:bg-heritage-maroon group-hover:text-zen-white'
                }`}>
                  <span className="material-symbols-outlined text-[24px]">campaign</span>
                </div>
                <div>
                  <span className="font-label text-[10px] font-bold text-heritage-maroon uppercase tracking-wider block mb-1">
                    Dịch vụ đồng hành
                  </span>
                  <h3 className="font-display text-xl font-bold text-primary">Tổ Chức Workshop Khách Hàng</h3>
                </div>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                  Đồng hành cùng Đại lý tổ chức các sự kiện Talkshow/Workshop chia sẻ tri thức tài chính chuyên sâu, kiến tạo sự tin tưởng và gắn kết tự nhiên cùng khách hàng.
                </p>
              </div>
              <div className="pt-6 border-t border-surface-container/60 mt-6 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                <span>Tìm hiểu dịch vụ</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
              {activeTab === 'workshop' && (
                <div className="absolute top-3 right-3 bg-heritage-maroon text-zen-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wider scale-95">
                  Đang xem
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ANCHOR ELEMENT FOR DETAILED CONTENT */}
      <div id="solutions-detail-section" className="scroll-mt-16" />

      {/* DETAILED CONTENT RENDERED BASED ON ACTIVE TAB */}

      {/* TAB 1: LIBA COURSE */}
      {activeTab === 'liba' && (
        <div className="animate-fadeIn">
          {/* SECTION: GIỚI THIỆU LIBA & KẾT QUẢ THỰC TẾ */}
          <section className="py-20 px-margin-desktop bg-zen-white/40 border-b border-surface-container/60">
            <div className="max-w-container-max mx-auto space-y-16">
              
              {/* LIBA Introduction */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Đào tạo chuyên sâu về đại lý
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl text-primary font-bold leading-tight">
                    LIBA: Định Hình Tư Duy Cố Vấn Bảo Hiểm Chuyên Nghiệp
                  </h2>
                  <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                    Trong môi trường thị trường hiện nay, khi niềm tin của khách hàng trở thành tài sản quý giá nhất, những phương pháp kinh doanh dựa trên sự nể nang hay quảng bá đơn thuần đã không còn mang lại sự bền vững. Một đại lý bảo hiểm muốn tồn tại và phát triển dài hạn không chỉ cần kỹ năng chốt hợp đồng, mà cần một nền tảng chuyên môn sâu sắc để trở thành một &quot;đối tác tài chính&quot; đáng tin cậy của khách hàng.
                  </p>
                  <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                    <strong>LIBA (Life Insurance Benefits Analyst)</strong> là chương trình đào tạo chuyên biệt do MAI Institute phát triển, hướng tới việc chuyển đổi vai trò của người tư vấn: từ một người bán sản phẩm đơn thuần trở thành một Chuyên gia phân tích quyền lợi và hoạch định tài chính.
                  </p>
                  
                  {/* Note for Managers */}
                  <div className="bg-heritage-maroon/5 border-l-4 border-heritage-maroon p-5 rounded-r-lg space-y-2">
                    <h4 className="font-display text-sm font-bold text-heritage-maroon uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">engineering</span>
                      Giải pháp cho nhà quản lý
                    </h4>
                    <p className="font-body text-xs text-secondary leading-relaxed">
                      LIBA là giải pháp hệ thống hóa năng lực cho đội ngũ. Chúng tôi giúp bạn chuẩn hóa quy trình làm việc, biến kiến thức bảo hiểm khô khan thành các công cụ tư vấn trực quan, dễ hiểu và dễ sao chép, xây dựng văn phòng vận hành dựa trên năng lực thực chất.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div className="text-center lg:text-left mb-4">
                    <h3 className="font-headline text-lg font-bold text-primary">
                      Hệ thống tư duy thực chiến giúp bạn:
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Trụ cột 1 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Phân tích minh bạch</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Hiểu rõ bản chất của các dòng sản phẩm, từ đó phân tích và giải thích cặn kẽ quyền lợi cho khách hàng một cách trung lập, khách quan.
                      </p>
                    </div>

                    {/* Trụ cột 2 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Tư duy cố vấn</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Khám phá nhu cầu thực tế và &quot;khoảng trống tài chính&quot; của khách hàng thông qua phương pháp lắng nghe chủ động thay vì vội vã đưa ra giải pháp.
                      </p>
                    </div>

                    {/* Trụ cột 3 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">trending_up</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Xây dựng sự bền vững</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Xây dựng tệp khách hàng trung thành dựa trên giá trị chuyên môn, giải quyết bài toán duy trì hợp đồng (K2) và tạo referrals tự nhiên.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-background/50 border border-surface-container rounded-lg flex items-center gap-4">
                    <span className="material-symbols-outlined text-[32px] text-heritage-maroon shrink-0">verified</span>
                    <p className="font-body text-xs text-secondary leading-relaxed">
                      LIBA không chỉ là một khóa học, đó là một <strong>tiêu chuẩn làm nghề</strong> mà MAI Institute mong muốn cùng bạn thiết lập và lan tỏa trong cộng đồng tư vấn bảo hiểm tại Việt Nam.
                    </p>
                  </div>
                </div>
              </div>

              {/* LIBA Outcomes */}
              <div className="space-y-8 pt-8 border-t border-surface-container/60">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Giá trị thực tế mang lại
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
                    Kết Quả Thực Tế Sau Khóa Học LIBA
                  </h3>
                  <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                    Sự hiệu quả của hệ thống LIBA không được đo lường bằng những lời hô hào ngắn hạn, mà được chứng thực bởi những chuyển dịch rất rõ ràng trong thói quen làm nghề của đại lý và phản hồi thực tế từ phía khách hàng.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Dành cho khách hàng */}
                  <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-surface-container/60 mb-6">
                        <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">person_celebrate</span>
                        </div>
                        <div>
                          <h4 className="font-display text-base md:text-lg font-bold text-primary">1. Đối với Khách hàng</h4>
                          <p className="font-body text-[11px] text-secondary">Sự an tâm dựa trên sự thấu hiểu thực chất</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-5">
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Giải tỏa tâm lý phòng thủ
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Thay vì cảm giác bị chèo kéo mua một sản phẩm mới, khách hàng đón nhận buổi làm việc với tâm thế cởi mở, xem đây là một buổi rà soát và hoạch định trung lập để bảo vệ dòng tiền gia đình.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Nhìn rõ &quot;bức tranh tài chính&quot; toàn cảnh
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Khách hàng tự gọi tên được các rủi ro, nhận diện chính xác các quyền lợi mình đang sở hữu, đồng thời phát hiện ra các &quot;khoảng trống bảo vệ&quot; hoặc sự chồng chéo lãng phí trong các hợp đồng cũ.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Chủ động duy trì và cam kết dài hạn
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Khi thực sự hiểu cặn kẽ bản chất kế hoạch tài chính, khách hàng trân trọng giá trị giải pháp hơn và chủ động đóng phí các năm tiếp theo, bảo vệ tối đa chỉ số duy trì K2 của văn phòng.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Dành cho đại lý */}
                  <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-surface-container/60 mb-6">
                        <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">badge</span>
                        </div>
                        <div>
                          <h4 className="font-display text-base md:text-lg font-bold text-primary">2. Đối với Đại lý</h4>
                          <p className="font-body text-[11px] text-secondary">Từ &quot;ngại đường&quot; đến chủ động làm chủ sự nghiệp</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-5">
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Mở cuộc hẹn tự nhiên, không áp lực
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Đại lý không còn bế tắc vì cạn kiệt tệp người quen. Với phương pháp &quot;Review quyền lợi miễn phí&quot;, họ có một lý do văn minh và giá trị để gõ cửa khách hàng cũ, tiếp cận nguồn khách hàng mồ côi hoặc thiết lập mối quan hệ mới.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Tự tin tư vấn dựa trên năng lực chuyên môn
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Chuyển đổi từ bán tính năng sản phẩm sang phân tích danh mục giúp nâng cao vị thế thương hiệu cá nhân. Họ tự tin tư vấn các giải pháp &quot;đề kháng suy thoái&quot; tương thích với bức tranh tài sản tổng thể của khách hàng.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Tăng hiệu suất khai thác thực tế (ROI)
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Nhờ quy trình đặt câu hỏi chuẩn hóa và thiết kế giải pháp cân bằng, đại lý dễ dàng gia tăng kích thước hợp đồng (Ticket Size) và nhận lời giới thiệu khách hàng mới (Referrals) một cách tự nhiên.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: LỘ TRÌNH LIBA */}
          <section className="py-20 px-margin-desktop bg-background border-b border-surface-container/60">
            <div className="max-w-container-max mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Lộ trình học tập
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
                  Bản Đồ Lộ Trình Phát Triển Đại Lý (LIBA)
                </h3>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                  Lộ trình từng bước giúp bạn nâng tầm năng lực tư duy, làm chủ sự nghiệp và xây dựng di sản bền vững trong ngành bảo hiểm. Click vào từng cột mốc để xem chi tiết các module đào tạo.
                </p>
              </div>

              {/* Timeline Layout */}
              <div className="max-w-3xl mx-auto relative pl-6 md:pl-8 border-l border-heritage-maroon/20 space-y-8 py-4">
                {specialistRoadmap.map((item, idx) => (
                  <div 
                    key={item.title}
                    onClick={() => setSelectedStage({ branch: 'specialist', index: idx })}
                    className="relative cursor-pointer group bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm hover:border-heritage-maroon/60 transition-soft"
                  >
                    {/* Timeline Node dot */}
                    <div className="absolute top-8 -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-zen-white border-2 border-heritage-maroon group-hover:bg-heritage-maroon transition-colors duration-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-heritage-maroon group-hover:bg-zen-white transition-colors"></div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                        Cột mốc 0{idx + 1} — {item.stage}
                      </span>
                      <span className="text-[11px] font-label font-bold text-secondary bg-paper-grey px-2 py-0.5 rounded-sm uppercase tracking-wider self-start md:self-auto">
                        Hình thức: {item.format.split(' + ')[0]}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-primary group-hover:text-heritage-maroon transition-colors">{item.title}</h4>
                    <p className="font-body text-xs md:text-sm text-secondary mt-2 leading-relaxed">{item.focus}</p>

                    <div className="mt-4 pt-4 border-t border-surface-container/60 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                      <span>Khóa: {item.solution}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Xem chi tiết các module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: COACHING COURSE */}
      {activeTab === 'coaching' && (
        <div className="animate-fadeIn">
          {/* SECTION: GIỚI THIỆU COACHING & KẾT QUẢ THỰC TẾ */}
          <section className="py-20 px-margin-desktop bg-zen-white/40 border-b border-surface-container/60">
            <div className="max-w-container-max mx-auto space-y-16">
              
              {/* Coaching Introduction */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Huấn luyện quản lý chuyên sâu
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl text-primary font-bold leading-tight">
                    Mindful Leadership Coaching: Khai Phong Năng Lực Dẫn Dắt
                  </h2>
                  <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                    Trong hành trình phát triển sự nghiệp Bảo hiểm Nhân thọ, một nhà quản lý xuất sắc không được định nghĩa bằng việc họ tự mình mang về bao nhiêu doanh số, mà bằng việc họ giúp bao nhiêu cộng sự bên dưới đạt được thành công bền vững. Tuy nhiên, phần lớn các quản lý kinh doanh hiện nay đang thăng tiến bằng bản năng và kinh nghiệm cá nhân, dẫn đến cái bẫy &quot;siêu nhân độc hành&quot; – bận rộn 10-12 tiếng mỗi ngày để xử lý sự vụ, làm thay và &quot;sạc pin cảm xúc&quot; cho cấp dưới nhưng hệ thống vẫn gãy rụng.
                  </p>
                  <p className="font-body text-sm md:text-base text-secondary leading-relaxed">
                    <strong>Mindful Leadership Coaching</strong> là chương trình huấn luyện năng lực khai vấn chuyên biệt do MAI Institute thiết kế dành riêng cho đội ngũ quản lý kinh doanh BHNT (UM, SM, GA, AD). Chương trình giúp nhà quản lý chuyển đổi triệt để từ phong cách &quot;quản lý - kiểm soát&quot; áp đặt sang phong cách &quot;khai vấn - đồng hành&quot;, khơi dậy động lực tự thân và năng lực tự chủ của đại lý.
                  </p>
                  
                  {/* Note for Teams */}
                  <div className="bg-heritage-maroon/5 border-l-4 border-heritage-maroon p-5 rounded-r-lg space-y-2">
                    <h4 className="font-display text-sm font-bold text-heritage-maroon uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                      Dịch chuyển tư duy quản trị
                    </h4>
                    <p className="font-body text-xs text-secondary leading-relaxed">
                      Giúp bạn dịch chuyển tư duy từ &quot;người làm vận hành đơn thuần&quot; sang &quot;nhà kiến tạo lãnh đạo&quot;, xây dựng đường ống nhân sự kế thừa mạnh mẽ và kiến tạo văn hóa đội nhóm gắn kết dựa trên năng lực thực chất.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div className="text-center lg:text-left mb-4">
                    <h3 className="font-headline text-lg font-bold text-primary">
                      Giải quyết &quot;điểm nghẽn&quot; thực địa với 3 trụ cột:
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Trụ cột 1 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Kích hoạt tự chủ</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Chuyển giao quy trình GROW và kỹ thuật đặt câu hỏi chuẩn hóa, rèn luyện cho đại lý thói quen tự đề xuất phương án và tự chịu trách nhiệm.
                      </p>
                    </div>

                    {/* Trụ cột 2 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">self_improvement</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Giải phóng lao động</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Thoát khỏi vai trò &quot;bảo mẫu cảm xúc&quot;. Thiết lập hệ thống tự vận hành thông qua các cuộc trò chuyện coaching nhanh 15 phút hiệu quả.
                      </p>
                    </div>

                    {/* Trụ cột 3 */}
                    <div className="bg-zen-white border border-surface-container rounded-lg p-6 space-y-4 hover:border-heritage-maroon/30 transition-soft">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">analytics</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-primary">Tối ưu chỉ số</h4>
                      <p className="font-body text-xs text-secondary leading-relaxed">
                        Ứng dụng khai vấn vào thực tế: kích hoạt đại lý ngủ đông, cứu vớt đại lý mất lửa, giúp người mới vượt qua khủng hoảng cảm xúc.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-background/50 border border-surface-container rounded-lg flex items-center gap-4">
                    <span className="material-symbols-outlined text-[32px] text-heritage-maroon shrink-0">military_tech</span>
                    <p className="font-body text-xs text-secondary leading-relaxed">
                      Chương trình cam kết mang lại hiệu quả thực chiến cao với <strong>tỷ lệ thực hành lên đến 70%</strong> và bàn giao bộ công cụ đóng gói sẵn (Coaching Handbook).
                    </p>
                  </div>
                </div>
              </div>

              {/* Coaching Outcomes */}
              <div className="space-y-8 pt-8 border-t border-surface-container/60">
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Giá trị thực tế mang lại
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
                    Kết Quả Thực Tế Từ Sự Chuyển Hóa
                  </h3>
                  <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                    Hiệu quả của năng lực khai vấn tại MAI Institute được đo lường bằng chính sự trưởng thành tự chủ của đội ngũ tư vấn viên bên dưới và sự thảnh thơi trong quản trị của người lãnh đạo.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Dành cho Quản lý */}
                  <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-surface-container/60 mb-6">
                        <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                        </div>
                        <div>
                          <h4 className="font-display text-base md:text-lg font-bold text-primary">1. Đối với Nhà Quản lý</h4>
                          <p className="font-body text-[11px] text-secondary">Quản trị thảnh thơi, hệ thống tự vận hành</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-5">
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Ủy quyền và giải phóng thời gian
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Quản lý biết cách buông bỏ tư duy cầu toàn để giao quyền hiệu quả. Giải phóng phần lớn quỹ thời gian sự vụ hàng tuần để tập trung vào chiến lược phát triển văn phòng.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Kèm cặp theo quy trình chuẩn
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Thay vì kèm cặp theo bản năng hay cảm xúc nhất thời, quản lý sở hữu sổ tay hướng dẫn (Coaching Handbook) và các kịch bản hội thoại chuẩn hóa cho từng tình huống (kích hoạt active, đại lý ngủ đông, tuyển dụng...).
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Kiến tạo đội ngũ kế thừa
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Vượt qua rào cản tâm lý sợ tuyến dưới làm hỏng việc để tự tin xây dựng lộ trình phát triển năng lực cho các thế hệ quản lý tiếp theo (UM/BM), tạo bệ phóng nhân rộng quy mô hệ thống.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Dành cho Đại lý */}
                  <div className="bg-zen-white border border-surface-container rounded-lg p-6 md:p-8 space-y-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 pb-4 border-b border-surface-container/60 mb-6">
                        <div className="bg-heritage-maroon/5 text-heritage-maroon w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
                        </div>
                        <div>
                          <h4 className="font-display text-base md:text-lg font-bold text-primary">2. Đối với Đội ngũ Đại lý</h4>
                          <p className="font-body text-[11px] text-secondary">Chủ động hành động, bứt phá hiệu suất</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-5">
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Động lực nội tại thay thế áp lực
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Không còn trạng thái thụ động chờ đợi sếp giao việc hay thúc giục doanh số. Đại lý tự nhận diện được mục tiêu cá nhân, chủ động tìm kiếm giải pháp vượt qua lời từ chối và cam kết hành động.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Nâng cao tỷ lệ sống sót của người mới
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Đại lý mới gia nhập được đồng hành bằng các phiên khai vấn tâm lý và định hướng rõ ràng, giúp họ nhanh chóng thích nghi, giảm tỷ lệ rụng rớt trong 3 tháng đầu.
                          </p>
                        </li>
                        <li className="space-y-1">
                          <h5 className="font-display text-sm font-semibold text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-heritage-maroon shrink-0"></span>
                            Gắn kết nội bộ bền vững
                          </h5>
                          <p className="font-body text-xs text-secondary pl-3.5 leading-relaxed">
                            Môi trường làm việc được thiết lập dựa trên sự thấu hiểu và an toàn tâm lý, giúp giảm thiểu sự chia rẽ, tạo động lực để các nhân sự tinh nhuệ (MDRT) tự tin bước lên các nấc thang quản lý tiếp theo.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: LỘ TRÌNH COACHING */}
          <section className="py-20 px-margin-desktop bg-background border-b border-surface-container/60">
            <div className="max-w-container-max mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                  Lộ trình học tập
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-primary font-bold">
                  Bản Đồ Lộ Trình Phát Triển Nhà Quản Trị
                </h3>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed">
                  Lộ trình huấn luyện từng bước từ cơ bản đến nâng cao giúp nhà quản trị xây dựng hệ thống lãnh đạo vững mạnh và thảnh thơi. Click vào từng cột mốc để xem chi tiết các module đào tạo.
                </p>
              </div>

              {/* Timeline Layout */}
              <div className="max-w-3xl mx-auto relative pl-6 md:pl-8 border-l border-heritage-maroon/20 space-y-8 py-4">
                {managementRoadmap.map((item, idx) => (
                  <div 
                    key={item.title}
                    onClick={() => setSelectedStage({ branch: 'management', index: idx })}
                    className="relative cursor-pointer group bg-zen-white border border-surface-container rounded-lg p-6 shadow-sm hover:border-heritage-maroon/60 transition-soft"
                  >
                    {/* Timeline Node dot */}
                    <div className="absolute top-8 -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-zen-white border-2 border-heritage-maroon group-hover:bg-heritage-maroon transition-colors duration-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-heritage-maroon group-hover:bg-zen-white transition-colors"></div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest">
                        Cột mốc 0{idx + 1} — {item.stage}
                      </span>
                      <span className="text-[11px] font-label font-bold text-secondary bg-paper-grey px-2 py-0.5 rounded-sm uppercase tracking-wider self-start md:self-auto">
                        Hình thức: {item.format.split(' + ')[0]}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-primary group-hover:text-heritage-maroon transition-colors">{item.title}</h4>
                    <p className="font-body text-xs md:text-sm text-secondary mt-2 leading-relaxed">{item.focus}</p>

                    <div className="mt-4 pt-4 border-t border-surface-container/60 flex justify-between items-center text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider">
                      <span>Giải pháp: {item.solution}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Xem chi tiết các module <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: WORKSHOPS & TALKSHOWS */}
      {activeTab === 'workshop' && (
        <div className="animate-fadeIn">
          {/* SECTION: WORKSHOP & TALKSHOW (SUPPORTING VALUES) */}
          <section id="workshops-section" className="py-20 px-margin-desktop bg-paper-grey/30 border-t border-surface-container scroll-mt-12">
            <div className="max-w-container-max mx-auto space-y-16">
              
              <div className="bg-zen-white border border-surface-container rounded-lg p-8 md:p-12 shadow-sm space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="bg-heritage-maroon/5 text-heritage-maroon font-label text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                    Dịch vụ đồng hành Talkshow &amp; Workshop
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-primary font-bold">
                    Trao Gửi Tri Thức - Đồng Hành Bền Vững
                  </h2>
                  <p className="font-body text-sm text-secondary leading-relaxed">
                    Giải pháp phối hợp toàn diện giúp nhà tư vấn và quản lý gia tăng mức độ gắn kết, củng cố uy tín chuyên môn và phát triển thị trường bền vững thông qua các chương trình chia sẻ tri thức thực tiễn.
                  </p>
                </div>

                <div className="border-t border-surface-container/60 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="font-display text-2xl text-heritage-maroon italic">Triết lý đồng hành:</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      Trong xu thế phát triển mới, khách hàng ngày càng mong muốn nhận được những giải pháp cố vấn tài chính thực tế và phù hợp với bối cảnh cuộc sống của gia đình.
                    </p>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      Bên cạnh các phương thức tri ân khách hàng truyền thống, việc tổ chức các buổi workshop chia sẻ tri thức hoạch định tài chính và huấn luyện chuyên môn chính là giải pháp tối ưu, mang lại giá trị thực chất cho cả khách hàng và đội ngũ tư vấn.
                    </p>
                  </div>
                  <div className="bg-background/40 p-6 rounded-lg border border-surface-container border-dashed text-center space-y-4">
                    <span className="material-symbols-outlined text-[48px] text-heritage-maroon">volunteer_activism</span>
                    <h4 className="font-headline text-lg font-bold text-primary">Hai nhóm đối tượng đồng hành</h4>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      Chúng tôi thiết kế các chương trình workshop hướng đến hai nhóm đối tượng cốt lõi: <strong>Khách hàng mua bảo hiểm</strong> và <strong>Đại lý bảo hiểm nhân thọ</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nhóm đối tượng 1 */}
              <div className="space-y-6">
                <div className="border-l-4 border-heritage-maroon pl-4">
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block">Đối tượng 01</span>
                  <h3 className="font-display text-2xl font-bold text-primary">Dành Cho Khách Hàng Mua Bảo Hiểm</h3>
                  <p className="font-body text-xs md:text-sm text-secondary mt-1 max-w-2xl">
                    Đồng hành cùng Đại lý kiến tạo sự gắn kết tự nhiên cùng khách hàng thông qua giá trị chuyên môn thực tiễn từ hoạch định tài chính cá nhân.
                  </p>
                </div>
                
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

              {/* Nhóm đối tượng 2 */}
              <div className="space-y-6 pt-6 border-t border-surface-container/60">
                <div className="border-l-4 border-heritage-maroon pl-4">
                  <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-wider block">Đối tượng 02</span>
                  <h3 className="font-display text-2xl font-bold text-primary">Dành Cho Đại Lý Bảo Hiểm Nhân Thọ</h3>
                  <p className="font-body text-xs md:text-sm text-secondary mt-1 max-w-2xl">
                    Cung cấp các kiến thức và công cụ tư vấn chuyên sâu về kinh tế vĩ mô và phân tích danh mục, giúp đại lý nâng cao năng lực làm nghề chủ động.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Ngân sách */}
                  <div className="bg-zen-white border border-surface-container hover:border-heritage-maroon/35 rounded-lg p-6 flex flex-col justify-between shadow-sm transition-soft">
                    <div className="space-y-4">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px]">paid</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-primary leading-snug">Khi nào khách hàng có ngân sách mua bảo hiểm?</h4>
                      <p className="font-body text-sm text-secondary leading-relaxed">
                        Phân tích chuyên sâu dựa trên chu kỳ phát triển của nền kinh tế. Cung cấp các kiến thức và công cụ thực tế giúp đại lý hiểu rõ hành vi tiêu dùng tài chính của khách hàng trong từng giai đoạn, từ đó chủ động hành động tương thích với các chu kỳ biến động của thị trường.
                      </p>
                    </div>
                    <div className="border-t border-surface-container/60 pt-4 mt-4">
                      <span className="text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider block">
                        Tiêu điểm:
                      </span>
                      <p className="font-body text-xs text-secondary mt-1 italic">
                        Thấu hiểu chu kỳ kinh tế để chủ động trong từng giai đoạn nghề
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Khi nào bán gì */}
                  <div className="bg-zen-white border border-surface-container hover:border-heritage-maroon/35 rounded-lg p-6 flex flex-col justify-between shadow-sm transition-soft">
                    <div className="space-y-4">
                      <div className="bg-heritage-maroon/5 text-heritage-maroon w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[24px]">insights</span>
                      </div>
                      <h4 className="font-display text-xl font-bold text-primary leading-snug">Khi nào bán gì? (Sản phẩm &amp; Chu kỳ)</h4>
                      <p className="font-body text-sm text-secondary leading-relaxed">
                        Mỗi chu kỳ kinh tế sẽ có những sản phẩm bảo hiểm nhân thọ khác nhau phù hợp với mỗi giai đoạn. Việc thấu hiểu sâu sắc bản chất các dòng sản phẩm mình tư vấn sẽ giúp đại lý thiết kế giải pháp chuẩn xác, dễ dàng thuyết phục và có được lòng tin về uy tín chuyên môn tuyệt đối từ phía khách hàng.
                      </p>
                    </div>
                    <div className="border-t border-surface-container/60 pt-4 mt-4">
                      <span className="text-xs font-label font-bold text-heritage-maroon uppercase tracking-wider block">
                        Tiêu điểm:
                      </span>
                      <p className="font-body text-xs text-secondary mt-1 italic">
                        Giải pháp tương thích và lòng tin chuyên môn từ khách hàng
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hộp lưu ý may đo */}
              <div className="bg-heritage-maroon/5 border border-heritage-maroon/20 rounded-lg p-6 md:p-8 text-center max-w-3xl mx-auto space-y-3">
                <span className="material-symbols-outlined text-[32px] text-heritage-maroon">design_services</span>
                <h4 className="font-display text-base font-bold text-primary">Thiết Kế Workshop May Đo Theo Nhu Cầu</h4>
                <p className="font-body text-xs md:text-sm text-secondary leading-relaxed max-w-2xl mx-auto">
                  Những chương trình liệt kê ở trên là ví dụ điển hình. Trên thực tế, <strong>MAI Institute có thể thiết kế các chương trình Talkshow/Workshop dành riêng cho văn phòng hoặc nhóm kinh doanh của bạn</strong>, tùy thuộc hoàn toàn vào nhu cầu thực tế và bối cảnh thị trường của đội ngũ.
                </p>
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
        </div>
      )}

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
