'use client';

import React from 'react';
import { LeadScores } from '@/types';

interface RadarChartProps {
  scores: LeadScores;
}

export default function RadarChart({ scores }: RadarChartProps) {
  // Convert score values to numbers safely
  const mindfulVal = Number(scores.mindful) || 5;
  const actionVal = Number(scores.action) || 5;
  const techVal = Number(scores.tech) || 5;

  const size = 300;
  const center = size / 2;
  const maxR = 100;

  // Calculate coordinates for a specific set of scores
  const getCoordinates = (m: number, a: number, t: number) => {
    const rMindful = (m / 10) * maxR;
    const rAction = (a / 10) * maxR;
    const rTech = (t / 10) * maxR;

    const xM = center;
    const yM = center - rMindful;

    const xA = center + rAction * Math.cos((30 * Math.PI) / 180);
    const yA = center + rAction * Math.sin((30 * Math.PI) / 180);

    const xT = center + rTech * Math.cos((150 * Math.PI) / 180);
    const yT = center + rTech * Math.sin((150 * Math.PI) / 180);

    return { xM, yM, xA, yA, xT, yT };
  };

  const grid1 = getCoordinates(10, 10, 10);
  const grid2 = getCoordinates(6, 6, 6);
  const grid3 = getCoordinates(3, 3, 3);
  const real = getCoordinates(mindfulVal, actionVal, techVal);

  return (
    <div className="w-full max-w-[300px] mx-auto flex items-center justify-center p-2 bg-zen-white rounded-lg">
      <svg width="300" height="300" viewBox="0 0 300 300" className="w-full h-auto">
        {/* Grid Lines (Lưới tam giác nét đứt) */}
        <polygon
          points={`${grid1.xM},${grid1.yM} ${grid1.xA},${grid1.yA} ${grid1.xT},${grid1.yT}`}
          fill="none"
          stroke="#dbdad9"
          strokeWidth="1"
          strokeDasharray="4"
        />
        <polygon
          points={`${grid2.xM},${grid2.yM} ${grid2.xA},${grid2.yA} ${grid2.xT},${grid2.yT}`}
          fill="none"
          stroke="#dbdad9"
          strokeWidth="1"
          strokeDasharray="4"
        />
        <polygon
          points={`${grid3.xM},${grid3.yM} ${grid3.xA},${grid3.yA} ${grid3.xT},${grid3.yT}`}
          fill="none"
          stroke="#dbdad9"
          strokeWidth="1"
          strokeDasharray="4"
        />

        {/* Trục vẽ từ tâm ra đỉnh */}
        <line x1={center} y1={center} x2={grid1.xM} y2={grid1.yM} stroke="#dbdad9" strokeWidth="1" />
        <line x1={center} y1={center} x2={grid1.xA} y2={grid1.yA} stroke="#dbdad9" strokeWidth="1" />
        <line x1={center} y1={center} x2={grid1.xT} y2={grid1.yT} stroke="#dbdad9" strokeWidth="1" />

        {/* Vùng Điểm số thực tế */}
        <polygon
          points={`${real.xM},${real.yM} ${real.xA},${real.yA} ${real.xT},${real.yT}`}
          fill="#630d0d"
          fillOpacity="0.3"
          stroke="#630d0d"
          strokeWidth="2"
        />

        {/* Điểm chấm tròn tại đỉnh */}
        <circle cx={real.xM} cy={real.yM} r="4" fill="#630d0d" />
        <circle cx={real.xA} cy={real.yA} r="4" fill="#630d0d" />
        <circle cx={real.xT} cy={real.yT} r="4" fill="#630d0d" />

        {/* Labels */}
        <text
          x={grid1.xM}
          y={grid1.yM - 10}
          textAnchor="middle"
          className="font-label text-[11px] font-bold fill-heritage-maroon"
        >
          MINDFUL ({mindfulVal})
        </text>
        <text
          x={grid1.xA + 12}
          y={grid1.yA + 4}
          textAnchor="start"
          className="font-label text-[11px] font-bold fill-heritage-maroon"
        >
          ACTION ({actionVal})
        </text>
        <text
          x={grid1.xT - 12}
          y={grid1.yT + 4}
          textAnchor="end"
          className="font-label text-[11px] font-bold fill-heritage-maroon"
        >
          TECH ({techVal})
        </text>
      </svg>
    </div>
  );
}
