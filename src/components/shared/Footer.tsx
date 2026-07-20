'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-container py-16" id="main-footer">
      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6 md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              alt="MAI Logo"
              className="h-10 w-auto object-contain"
              src="/images/MAI_Logo.png"
            />
            <span className="font-headline text-2xl text-heritage-maroon font-bold tracking-tight">MAI Institute</span>
          </div>
          <p className="font-body text-xs text-secondary leading-relaxed max-w-sm">
            Học viện đào tạo &amp; Cung cấp công cụ quản trị tiên phong dành riêng cho các nhà lãnh đạo kinh doanh Bảo hiểm Nhân thọ thế hệ mới tại Việt Nam.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-label text-xs font-bold text-primary uppercase tracking-widest">Khám phá</h4>
          <ul className="space-y-2 font-body text-sm text-secondary">
            <li><Link className="hover:text-heritage-maroon transition-colors" href="/solutions">Giải pháp Đào tạo</Link></li>
            <li><Link className="hover:text-heritage-maroon transition-colors" href="/diagnose">Bài trắc nghiệm Chẩn đoán</Link></li>
            <li><Link className="hover:text-heritage-maroon transition-colors" href="/blog">Kho tài liệu &amp; Podcast</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-label text-xs font-bold text-primary uppercase tracking-widest">Hệ thống</h4>
          <ul className="space-y-2 font-body text-sm text-secondary">
            <li><Link className="hover:text-heritage-maroon transition-colors" href="/blog">Blog Tạp chí</Link></li>
            <li><Link className="hover:text-heritage-maroon transition-colors cursor-pointer" href="/admin">Quản trị viên | CMS Login</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-secondary opacity-60">
          © {new Date().getFullYear()} MAI Institute. Mindful Action for Elite Executives.
        </p>
        <div className="flex gap-6 opacity-60">
          <Link className="hover:text-heritage-maroon transition-colors" href="#"><span className="material-symbols-outlined text-xl">share</span></Link>
          <Link className="hover:text-heritage-maroon transition-colors" href="#"><span className="material-symbols-outlined text-xl">mail</span></Link>
          <Link className="hover:text-heritage-maroon transition-colors" href="#"><span className="material-symbols-outlined text-xl">forum</span></Link>
        </div>
      </div>
    </footer>
  );
}
