'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookingModal from './BookingModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Giải pháp', href: '/solutions' },
    { label: 'Công cụ Chẩn đoán', href: '/diagnose' },
    { label: 'Blog', href: '/blog' },
    { label: 'Podcast', href: '/blog?filter=Podcasts' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-surface-container transition-all duration-300 ${isScrolled ? 'py-2 shadow-sm' : 'py-4'}`} id="main-nav">
        <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto">
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <img
              alt="MAI Institute Logo"
              className="h-10 w-10 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9lDDOktfXYovL94tHBrnqXMCK4igx_lTHn325gf1yG1IWLZN-zPHOovHqKgwfiuNBr4HTm-L1O_WhP53ypmNZ37oqnn252tewc5gU2BSEzintj93qZmieuKUWOFwZvx4qynf3EblbM-9M8_87GAy0Ci85iHLaJSKanRB_RDlI5WNxMXmMyAmy2wyfZ_y7O5igVT6Vc0YndNSqJxQgsG64VNoLqcLIqWqjbxuCCy93KsJIEmFkjuau8vMaqw6bASVb__GmYmLbr0"
            />
            <span className="font-headline text-3xl text-heritage-maroon font-bold tracking-tight">MAI Institute</span>
          </Link>
          <div className="hidden md:flex gap-8 items-center" id="nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href.split('?')[0];
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-item hover:text-heritage-maroon transition-all font-label text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-heritage-maroon border-b-2 border-heritage-maroon pb-1' : 'text-secondary'}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#about-section"
              className="nav-item text-secondary hover:text-heritage-maroon transition-all font-label text-xs font-semibold uppercase tracking-wider"
            >
              Về chúng tôi
            </Link>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-heritage-maroon text-zen-white px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 duration-150 rounded-sm"
          >
            Tư vấn Chiến lược
          </button>
        </div>
      </nav>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource="Đặt lịch Tư vấn Chiến lược"
      />
    </>
  );
}
