'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookingModal from './BookingModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Tự động đóng mobile menu khi chuyển trang
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Giải pháp', href: '/solutions' },
    { label: 'Công cụ Chẩn đoán', href: '/diagnose' },
    { label: 'Blog', href: '/blog' },
    { label: 'Podcast', href: '/blog?filter=Podcasts' },
    { label: 'Đội ngũ & Về chúng tôi', href: '/about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-surface-container transition-all duration-300 ${
          isScrolled ? 'py-2 shadow-sm' : 'py-4'
        }`}
        id="main-nav"
      >
        <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop max-w-container-max mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img
              alt="MAI Institute Logo"
              className="h-9 md:h-10 w-auto object-contain"
              src="/images/MAI_Logo.png"
            />
            <span className="font-headline text-2xl md:text-3xl text-heritage-maroon font-bold tracking-tight">
              MAI Institute
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8 items-center" id="nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href.split('?')[0];
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-item hover:text-heritage-maroon transition-all font-label text-xs font-semibold uppercase tracking-wider ${
                    isActive
                      ? 'text-heritage-maroon border-b-2 border-heritage-maroon pb-1'
                      : 'text-secondary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-heritage-maroon text-zen-white px-4 md:px-6 py-2.5 md:py-3 font-label text-[11px] md:text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-all active:scale-95 duration-150 rounded-sm"
            >
              Tư vấn Giải pháp
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:text-heritage-maroon focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                // Close icon (X)
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon (☰)
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/98 border-b border-surface-container px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href.split('?')[0];
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2 px-3 rounded-md font-label text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive
                        ? 'bg-heritage-maroon/10 text-heritage-maroon font-bold'
                        : 'text-secondary hover:text-heritage-maroon hover:bg-surface-container/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programSource="Đặt lịch Tư vấn Chiến lược"
      />
    </>
  );
}

