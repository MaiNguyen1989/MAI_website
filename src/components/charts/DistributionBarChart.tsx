'use client';

import React from 'react';

interface DistributionBarChartProps {
  distribution: {
    g1: number;
    g2: number;
    g3: number;
    g4: number;
  };
}

export default function DistributionBarChart({ distribution }: DistributionBarChartProps) {
  const data = [
    { label: 'G1 - Gia nhập', value: distribution.g1, desc: 'Người bán sản phẩm bảo vệ' },
    { label: 'G2 - Sống với nghề', value: distribution.g2, desc: 'Nhà tư vấn giải pháp tích lũy' },
    { label: 'G3 - Chủ động', value: distribution.g3, desc: 'Nhà hoạch định chiến lược' },
    { label: 'G4 - Bền vững', value: distribution.g4, desc: 'Nhà cố vấn tài chính' },
  ];

  return (
    <div className="w-full max-w-[400px] mx-auto py-4 space-y-5 bg-zen-white p-6 rounded-lg border border-surface-container/60">
      <h4 className="font-headline text-sm font-bold text-heritage-maroon uppercase tracking-widest text-center border-b border-surface-container/40 pb-2">
        Phân Bổ Giai Đoạn Nghề Nghiệp
      </h4>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-end text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-primary block">{item.label}</span>
                <span className="text-[10px] text-secondary block">{item.desc}</span>
              </div>
              <span className="font-bold text-heritage-maroon text-sm">{Math.round(item.value)}%</span>
            </div>
            
            {/* Thanh tiến trình */}
            <div className="h-2.5 bg-surface-container rounded-full overflow-hidden w-full">
              <div
                className="h-full bg-heritage-maroon transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
