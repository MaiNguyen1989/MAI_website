'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Lead } from '@/types';
import { initialLeads } from '@/lib/mockData';
import Link from 'next/link';

import { supabase } from '@/lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  programSource: string;
}

export default function BookingModal({ isOpen, onClose, programSource }: BookingModalProps) {
  const [leads, setLeads] = useLocalStorage<Lead[]>('mai_leads', initialLeads);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Bạn phải đồng ý với Chính sách bảo mật và Điều khoản sử dụng để tiếp tục.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

    const scoresPayload = {
      mindful: '-',
      action: '-',
      tech: '-',
      source: 'consultation' as const,
      programSource: programSource
    };

    const newLead: Lead = {
      id: 'l-' + Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      role: programSource,
      scores: scoresPayload,
      date,
      source: 'consultation',
      programSource: programSource
    };

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          id: newLead.id,
          name: newLead.name,
          phone: newLead.phone,
          email: newLead.email,
          company: newLead.company,
          role: newLead.role,
          scores: scoresPayload,
          date: newLead.date
        });
      if (error) console.warn('Lỗi ghi Supabase (dùng LocalStorage dự phòng):', error);
    } catch (err) {
      console.warn('Lỗi kết nối Supabase:', err);
    }

    setLeads([newLead, ...leads]);
    setIsSubmitting(false);
    alert("Đăng ký tư vấn thành công! Chuyên gia của MAI Institute sẽ liên hệ với bạn trong thời gian sớm nhất.");
    setFormData({ name: '', phone: '', email: '', company: '' });
    setAgreeToTerms(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-zen-white max-w-[500px] w-full rounded-lg shadow-xl border border-surface-container p-6 md:p-10 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center space-y-2 mb-6">
          <img
            alt="MAI Logo"
            className="h-12 w-auto mx-auto object-contain mb-2"
            src="/images/MAI_Logo.png"
          />
          <h2 className="font-display text-2xl md:text-3xl text-primary font-medium">
            {programSource.startsWith('Đăng ký') ? programSource : 'Đặt Lịch Tham Vấn Giải Pháp'}
          </h2>
          <p className="font-body text-xs text-secondary">
            Vui lòng để lại thông tin. Đội ngũ chuyên gia MAI Institute sẽ chủ động liên hệ để lắng nghe nhu cầu và rà soát điểm nghẽn cùng bạn.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Họ và tên</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Số điện thoại</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
              placeholder="0912345678"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
              placeholder="email@congty.com"
            />
          </div>
          <div className="space-y-1">
            <label className="font-label text-xs font-semibold text-secondary uppercase tracking-wider block">Công ty / Cơ quan</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full border border-surface-container rounded px-3 py-2 text-sm focus:border-heritage-maroon focus:ring-heritage-maroon/20 outline-none"
              placeholder="Tên doanh nghiệp của bạn"
            />
          </div>
          {/* Checkbox Consent (Tuân thủ Luật 91/2025/QH15) */}
          <div className="flex items-start gap-3 my-4 p-3 bg-surface-container/20 rounded border border-surface-container/40">
            <input
              id="booking-consent-checkbox"
              type="checkbox"
              required
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-heritage-maroon focus:ring-heritage-maroon accent-heritage-maroon"
            />
            <label htmlFor="booking-consent-checkbox" className="font-body text-[11px] text-secondary leading-relaxed cursor-pointer selection:bg-transparent">
              Tôi đồng ý cho phép MAI Institute liên hệ tư vấn và xử lý thông tin cá nhân của tôi theo đúng <Link href="/privacy" target="_blank" className="text-heritage-maroon hover:underline font-semibold" onClick={(e) => e.stopPropagation()}>Chính sách bảo mật</Link> và <Link href="/terms" target="_blank" className="text-heritage-maroon hover:underline font-semibold" onClick={(e) => e.stopPropagation()}>Điều khoản sử dụng</Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreeToTerms || isSubmitting}
            className={`w-full py-3.5 font-label text-xs font-bold uppercase tracking-widest transition-all rounded-sm shadow ${
              agreeToTerms && !isSubmitting
                ? 'bg-heritage-maroon text-zen-white hover:bg-primary-container active:scale-[0.98]'
                : 'bg-surface-container text-white/40 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Đang gửi thông tin...' : 'Gửi thông tin tham vấn'}
          </button>
        </form>
      </div>
    </div>
  );
}
