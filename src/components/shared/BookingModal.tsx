'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Lead } from '@/types';
import { initialLeads } from '@/lib/mockData';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

    const newLead: Lead = {
      id: 'l-' + Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      role: programSource,
      scores: { mindful: '-', action: '-', tech: '-' },
      date
    };

    setLeads([newLead, ...leads]);
    alert("Đăng ký tư vấn thành công! Chuyên gia của MAI Institute sẽ liên hệ với bạn trong thời gian sớm nhất.");
    setFormData({ name: '', phone: '', email: '', company: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-zen-white max-w-[500px] w-full rounded-lg shadow-xl border border-surface-container p-6 md:p-10 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center space-y-2 mb-6">
          <span className="material-symbols-outlined text-[48px] text-heritage-maroon">calendar_month</span>
          <h2 className="font-display text-2xl md:text-3xl text-primary font-medium">
            {programSource.startsWith('Đăng ký') ? programSource : 'Đặt lịch tư vấn chiến lược'}
          </h2>
          <p className="font-body text-xs text-secondary">
            Vui lòng điền thông tin để chuyên gia của MAI Institute liên hệ trong vòng 24 giờ làm việc.
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
          <button
            type="submit"
            className="w-full bg-heritage-maroon text-zen-white py-3.5 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-all rounded-sm shadow active:scale-[0.98]"
          >
            Xác nhận Đặt lịch tư vấn
          </button>
        </form>
      </div>
    </div>
  );
}
