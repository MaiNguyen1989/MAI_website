'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Post } from '@/types';
import { initialPosts } from '@/lib/mockData';
import BookingModal from '@/components/shared/BookingModal';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedPosts(data as Post[]);
        } else {
          // Fallback về mock data nếu DB rỗng
          setFeaturedPosts(initialPosts.slice(0, 3));
        }
      } catch (err) {
        console.error('Lỗi khi fetch bài viết từ Supabase:', err);
        // Fallback về mock data nếu Supabase chưa cấu hình
        setFeaturedPosts(initialPosts.slice(0, 3));
      }
    }
    fetchFeaturedPosts();
  }, []);

  return (
    <div id="view-home" className="view-content">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <img
            alt="Hero background"
            className="w-full h-full object-cover opacity-70"
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 w-full px-margin-desktop max-w-container-max mx-auto">
          <div className="max-w-3xl">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-[0.2em] mb-6 block">
              The Mindful Leadership Philosophy
            </span>
            <h1 className="font-display text-5xl md:text-7xl mb-8 leading-[1.1] text-primary">
              Dẫn dắt bằng Tầm nhìn.<br />Quản trị bằng Dữ liệu.
            </h1>
            <p className="font-body text-lg text-secondary mb-10 max-w-2xl leading-relaxed">
              Học viện tối ưu hóa hiệu suất toàn diện dành riêng cho Nhà lãnh đạo Bảo hiểm Nhân thọ thế hệ mới. Ứng dụng Zen vào thực thi chiến lược.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/diagnose"
                className="bg-heritage-maroon text-zen-white px-8 py-5 font-label text-sm font-bold uppercase tracking-widest transition-soft hover:shadow-xl hover:-translate-y-0.5 rounded-sm"
              >
                Bắt đầu chẩn đoán ngay (Free 5-Min Audit)
              </Link>
              <Link
                href="/solutions"
                className="text-heritage-maroon font-label text-sm font-bold uppercase tracking-widest border-b-2 border-heritage-maroon/20 hover:border-heritage-maroon transition-soft flex items-center gap-2"
              >
                Xem lộ trình đào tạo <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Tool Section (Intro) */}
      <section className="py-20 px-margin-desktop bg-paper-grey/40 border-y border-surface-container">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest block">
              Interactive Diagnostic
            </span>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight text-primary">
              Định vị Năng lực & Hệ điều hành Quản trị của Bạn
            </h2>
            <p className="font-body text-base text-secondary max-w-lg leading-relaxed">
              Khung chẩn đoán chuyên sâu thiết kế riêng cho ngành BHNT. Giúp Tư vấn viên xác định mức độ tự chủ nghề nghiệp (G1 - G4) và giúp Nhà quản lý đo lường toàn diện hệ điều hành qua 4 trục LPIS cốt lõi, phát hiện nhanh các điểm nghẽn vận hành thực tế.
            </p>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between font-label text-xs font-bold text-secondary uppercase tracking-wider">
                  <span>Tự chủ & Bản lĩnh làm nghề (TVV)</span>
                  <span className="text-heritage-maroon font-semibold">75%</span>
                </div>
                <div className="h-1 bg-surface-container overflow-hidden rounded-sm">
                  <div className="h-full bg-heritage-maroon rounded-sm" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-label text-xs font-bold text-secondary uppercase tracking-wider">
                  <span>Quản trị hiệu suất & Số liệu (LPIS - P)</span>
                  <span className="text-heritage-maroon font-semibold">60%</span>
                </div>
                <div className="h-1 bg-surface-container overflow-hidden rounded-sm">
                  <div className="h-full bg-heritage-maroon rounded-sm" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-label text-xs font-bold text-secondary uppercase tracking-wider">
                  <span>Quy trình hóa & Nhân bản (LPIS - S)</span>
                  <span className="text-heritage-maroon font-semibold">45%</span>
                </div>
                <div className="h-1 bg-surface-container overflow-hidden rounded-sm">
                  <div className="h-full bg-heritage-maroon rounded-sm" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/diagnose"
                className="bg-heritage-maroon text-zen-white px-6 py-4 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-2 rounded-sm"
              >
                Bắt đầu chẩn đoán ngay <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-full aspect-square max-w-[420px] border border-heritage-maroon/10 flex items-center justify-center p-8 bg-zen-white shadow-sm rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-heritage-maroon/5 to-transparent pointer-events-none"></div>
              <div className="relative w-full h-full border border-dashed border-outline-variant/30 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:rotate-45">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-dashed border-outline-variant/50 rounded-full"></div>
                  <div className="absolute w-1/2 h-1/2 border border-dashed border-outline-variant/70 rounded-full"></div>
                </div>
                
                {/* LPIS Radar Chart Mockup */}
                <div className="absolute inset-0 flex items-center justify-center p-6 -rotate-45 transition-transform duration-700 group-hover:rotate-[315deg]">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Trục dọc L-I và Trục ngang S-P */}
                    <line x1="50" y1="12" x2="50" y2="88" stroke="#630d0d" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                    <line x1="12" y1="50" x2="88" y2="50" stroke="#630d0d" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                    
                    {/* Vòng tròn đồng tâm */}
                    <circle cx="50" cy="50" r="18" fill="none" stroke="#630d0d" strokeWidth="0.25" opacity="0.2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#630d0d" strokeWidth="0.25" opacity="0.2" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#630d0d" strokeWidth="0.25" opacity="0.2" />
                    
                    {/* Nhãn chữ 4 đầu trục */}
                    <text x="50" y="9" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#630d0d" opacity="0.8">L</text>
                    <text x="92" y="52" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#630d0d" opacity="0.8">P</text>
                    <text x="50" y="95" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#630d0d" opacity="0.8">I</text>
                    <text x="8" y="52" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#630d0d" opacity="0.8">S</text>
                    
                    {/* Đa giác Radar (LPIS polygon) lệch nhẹ đại diện cho hình thái lệch trái thực tế */}
                    <polygon 
                      points="50,22 78,50 50,74 38,50" 
                      fill="#630d0d" 
                      fillOpacity="0.15" 
                      stroke="#630d0d" 
                      strokeWidth="1.2" 
                      className="transition-all duration-500 group-hover:fill-opacity-25"
                    />
                    
                    {/* Điểm nút */}
                    <circle cx="50" cy="22" r="1.5" fill="#630d0d" />
                    <circle cx="78" cy="50" r="1.5" fill="#630d0d" />
                    <circle cx="50" cy="74" r="1.5" fill="#630d0d" />
                    <circle cx="38" cy="50" r="1.5" fill="#630d0d" />
                  </svg>
                </div>

                <span className="material-symbols-outlined text-heritage-maroon text-[50px] transition-all duration-500 group-hover:scale-110 z-10 bg-zen-white p-2 rounded-full shadow-sm">
                  insights
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Hub (Intro) */}
      <section className="py-24">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="mb-16 text-center">
            <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
              Our Architecture
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mb-4 text-primary">
              Lộ trình bứt phá. Kết quả thực thi.
            </h2>
            <div className="w-20 h-1 bg-heritage-maroon mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Executive Suite */}
            <Link
              href="/solutions"
              className="group p-8 md:p-12 border border-surface-container hover:border-heritage-maroon/50 transition-soft cursor-pointer bg-zen-white flex flex-col justify-between h-[450px] shadow-sm rounded-lg hover:shadow-md"
            >
              <div>
                <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest mb-4 block">
                  Dành cho lãnh đạo và quản lý
                </span>
                <h3 className="font-headline text-3xl mb-4 text-primary">Phát triển năng lực quản lý</h3>
                <p className="font-body text-base text-secondary mb-8 leading-relaxed">
                  Giải pháp dành riêng cho Lãnh đạo và Quản lý cấp cao ngành Bảo hiểm nhân thọ. Tập trung vào nghệ thuật lãnh đạo qua khai vấn kết hợp cùng hệ thống quản trị tự động.
                </p>
              </div>
              <div>
                <ul className="space-y-3 mb-8 text-sm font-body text-secondary border-t border-surface-container/50 pt-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-heritage-maroon">check_circle</span>
                    Hệ thống quản trị doanh nghiệp BHNT
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-heritage-maroon">check_circle</span>
                    Kỹ năng huấn luyện &amp; Đồng hành
                  </li>
                </ul>
                <div className="flex items-center text-heritage-maroon font-label text-xs font-bold uppercase tracking-widest gap-2 group-hover:gap-4 transition-soft">
                  Tìm hiểu giải pháp chi tiết <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </div>
            </Link>

            {/* Professional Suite */}
            <Link
              href="/solutions"
              className="group p-8 md:p-12 border border-surface-container hover:border-heritage-maroon/50 transition-soft cursor-pointer bg-paper-grey/50 flex flex-col justify-between h-[450px] shadow-sm rounded-lg hover:shadow-md"
            >
              <div>
                <span className="font-label text-xs font-bold text-heritage-maroon uppercase tracking-widest mb-4 block">
                  Dành cho đại lý 
                </span>
                <h3 className="font-headline text-3xl mb-4 text-primary">Phát triển chuyên môn tư vấn</h3>
                <p className="font-body text-base text-secondary mb-8 leading-relaxed">
                  Chuẩn hóa kỹ năng tư vấn chuyên nghiệp cho đội ngũ Đại lý. Chuyển đổi từ &quot;Bán hàng&quot; sang &quot;Cố vấn tài chính&quot; dựa trên các giá trị nhân văn và kỹ thuật chốt đơn thực chiến.
                </p>
              </div>
              <div>
                <ul className="space-y-3 mb-8 text-sm font-body text-secondary border-t border-surface-container/50 pt-6">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-heritage-maroon">check_circle</span>
                    Quy trình tư vấn dựa trên hiểu biết sâu sắc về khách hàng và Tài chính cá nhân
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-heritage-maroon">check_circle</span>
                    Quản trị phễu khách hàng hiện đại
                  </li>
                </ul>
                <div className="flex items-center text-heritage-maroon font-label text-xs font-bold uppercase tracking-widest gap-2 group-hover:gap-4 transition-soft">
                  Nâng tầm chuyên nghiệp <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Thought Leadership (Intro) */}
      <section className="py-24 bg-paper-grey/30 border-y border-surface-container">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-surface-container pb-8">
            <div>
              <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
                Insights &amp; Wisdom
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary">Tầm nhìn &amp; Tư duy</h2>
            </div>
            <Link
              href="/blog"
              className="font-label text-xs font-bold uppercase tracking-widest text-heritage-maroon flex items-center gap-2 hover:translate-x-1 transition-transform mt-4 sm:mt-0"
            >
              Tất cả bài viết <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="home-posts-grid">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog?id=${post.id}`}
                className="space-y-4 cursor-pointer group bg-zen-white p-4 border border-surface-container rounded hover:border-heritage-maroon transition-soft shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface-container-high rounded-sm">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-soft"
                    src={post.image}
                  />
                </div>
                <span className="font-label text-xs font-semibold text-heritage-maroon uppercase tracking-widest block">
                  {post.category} - {post.type.toUpperCase()}
                </span>
                <h3 className="font-headline text-2xl leading-tight hover:text-heritage-maroon transition-colors italic text-primary">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-secondary line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-heritage-maroon text-zen-white overflow-hidden" id="cta-section">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[400px] absolute -right-20 -top-20">
            all_inclusive
          </span>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10 text-center">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 max-w-3xl mx-auto">
            Sẵn sàng để tái định nghĩa tiêu chuẩn hiệu suất?
          </h2>
          <p className="font-body text-base md:text-lg mb-10 opacity-80 max-w-xl mx-auto leading-relaxed">
            Đặt lịch hẹn 30 phút tư vấn miễn phí cùng chuyên gia giải pháp của MAI Institute.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-zen-white text-heritage-maroon px-10 py-5 font-label text-sm font-bold uppercase tracking-widest hover:bg-paper-grey transition-all active:scale-95 shadow-lg rounded-sm"
          >
            Đặt lịch tư vấn ngay
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 px-margin-desktop bg-zen-white" id="about-section">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs font-bold text-secondary uppercase tracking-widest block mb-2">
              Our Foundations
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mb-4 text-primary">
              Đội ngũ &amp; Triết lý
            </h2>
            <div className="w-20 h-1 bg-heritage-maroon rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-heritage-maroon">
                Triết lý của chúng tôi
              </h3>
              <p className="font-body text-base text-secondary leading-relaxed">
                Tại MAI Institute, chúng tôi tin rằng sự thành công bền vững của một nhà lãnh đạo bảo hiểm không chỉ đến từ những con số khô khan, mà còn từ sự tỉnh thức trong từng quyết định. Chúng tôi kết hợp tinh hoa của Mindfulness (Sự tỉnh thức) với sức mạnh của Công nghệ và dữ liệu (Hành động dựa trên dữ liệu) để tạo ra một hệ sinh thái quản trị toàn diện.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-headline text-2xl md:text-3xl text-heritage-maroon">
                Đội ngũ vận hành
              </h3>
              <p className="font-body text-base text-secondary leading-relaxed">
                Đội ngũ của chúng tôi bao gồm những chuyên gia dày dạn kinh nghiệm trong ngành bảo hiểm nhân thọ, các nhà tư vấn chiến lược và những người thực hành phát triển bản thân dựa trên sự thấu hiểu về tâm thức. Sự kết hợp đa dạng này cho phép chúng tôi mang đến những góc nhìn độc đáo và các giải pháp thực thi hiệu quả nhất cho các Lãnh đạo và Quản lý cấp cao thế hệ mới.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource="Đặt lịch Tư vấn Chiến lược"
      />
    </div>
  );
}
