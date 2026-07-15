'use client';

import React from 'react';
import { LeadScores } from '@/types';

interface RadarChartProps {
  scores: LeadScores;
}

export default function RadarChart({ scores }: RadarChartProps) {
  // Kiểm tra xem đây là kết quả của Leader hay Agent (TVV)
  // Đối với Leader: scores sẽ có l, p, i, s
  const isLeader = scores.l !== undefined;

  const size = 300;
  const center = size / 2;
  const maxR = 80;

  if (isLeader) {
    const lVal = Number(scores.l) || 5;
    const pVal = Number(scores.p) || 5;
    const iVal = Number(scores.i) || 5;
    const sVal = Number(scores.s) || 5;

    const getLeaderCoords = (l: number, p: number, i: number, s: number) => {
      return {
        xL: center,
        yL: center - (l / 10) * maxR,
        xP: center + (p / 10) * maxR,
        yP: center,
        xI: center,
        yI: center + (i / 10) * maxR,
        xS: center - (s / 10) * maxR,
        yS: center
      };
    };

    const grid1 = getLeaderCoords(10, 10, 10, 10);
    const grid2 = getLeaderCoords(6, 6, 6, 6);
    const grid3 = getLeaderCoords(3, 3, 3, 3);
    const real = getLeaderCoords(lVal, pVal, iVal, sVal);

    return (
      <div className="w-full max-w-[300px] mx-auto flex items-center justify-center p-2 bg-zen-white rounded-lg">
        <svg width="300" height="300" viewBox="0 0 300 300" className="w-full h-auto">
          {/* Grid lines (hình thoi đồng tâm) */}
          <polygon
            points={`${grid1.xL},${grid1.yL} ${grid1.xP},${grid1.yP} ${grid1.xI},${grid1.yI} ${grid1.xS},${grid1.yS}`}
            fill="none"
            stroke="#dbdad9"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <polygon
            points={`${grid2.xL},${grid2.yL} ${grid2.xP},${grid2.yP} ${grid2.xI},${grid2.yI} ${grid2.xS},${grid2.yS}`}
            fill="none"
            stroke="#dbdad9"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <polygon
            points={`${grid3.xL},${grid3.yL} ${grid3.xP},${grid3.yP} ${grid3.xI},${grid3.yI} ${grid3.xS},${grid3.yS}`}
            fill="none"
            stroke="#dbdad9"
            strokeWidth="1"
            strokeDasharray="4"
          />

          {/* Trục vẽ từ tâm ra 4 đỉnh */}
          <line x1={center} y1={center} x2={grid1.xL} y2={grid1.yL} stroke="#dbdad9" strokeWidth="1" />
          <line x1={center} y1={center} x2={grid1.xP} y2={grid1.yP} stroke="#dbdad9" strokeWidth="1" />
          <line x1={center} y1={center} x2={grid1.xI} y2={grid1.yI} stroke="#dbdad9" strokeWidth="1" />
          <line x1={center} y1={center} x2={grid1.xS} y2={grid1.yS} stroke="#dbdad9" strokeWidth="1" />

          {/* Vùng Điểm số thực tế */}
          <polygon
            points={`${real.xL},${real.yL} ${real.xP},${real.yP} ${real.xI},${real.yI} ${real.xS},${real.yS}`}
            fill="#630d0d"
            fillOpacity="0.3"
            stroke="#630d0d"
            strokeWidth="2"
          />

          {/* Điểm chấm tròn tại đỉnh */}
          <circle cx={real.xL} cy={real.yL} r="4" fill="#630d0d" />
          <circle cx={real.xP} cy={real.yP} r="4" fill="#630d0d" />
          <circle cx={real.xI} cy={real.yI} r="4" fill="#630d0d" />
          <circle cx={real.xS} cy={real.yS} r="4" fill="#630d0d" />

          {/* Labels */}
          <text x={grid1.xL} y={grid1.yL - 10} textAnchor="middle" className="font-label text-[10px] font-bold fill-heritage-maroon">
            LEADERSHIP ({lVal})
          </text>
          <text x={grid1.xP + 10} y={grid1.yP + 4} textAnchor="start" className="font-label text-[10px] font-bold fill-heritage-maroon">
            PERFORMANCE ({pVal})
          </text>
          <text x={grid1.xI} y={grid1.yI + 15} textAnchor="middle" className="font-label text-[10px] font-bold fill-heritage-maroon">
            INDEPENDENCE ({iVal})
          </text>
          <text x={grid1.xS - 10} y={grid1.yS + 4} textAnchor="end" className="font-label text-[10px] font-bold fill-heritage-maroon">
            SYSTEM ({sVal})
          </text>
        </svg>
      </div>
    );
  }

  // Đối với Agent/TVV vẽ 3 trục (mindful, action, tech)
  const mindfulVal = Number(scores.mindful) || 5;
  const actionVal = Number(scores.action) || 5;
  const techVal = Number(scores.tech) || 5;

  const getAgentCoords = (m: number, a: number, t: number) => {
    const rMindful = (m / 10) * maxR;
    const rAction = (a / 10) * maxR;
    const rTech = (t / 10) * maxR;

    return {
      xM: center,
      yM: center - rMindful,
      xA: center + rAction * Math.cos((30 * Math.PI) / 180),
      yA: center + rAction * Math.sin((30 * Math.PI) / 180),
      xT: center + rTech * Math.cos((150 * Math.PI) / 180),
      yT: center + rTech * Math.sin((150 * Math.PI) / 180)
    };
  };

  const grid1 = getAgentCoords(10, 10, 10);
  const grid2 = getAgentCoords(6, 6, 6);
  const grid3 = getAgentCoords(3, 3, 3);
  const real = getAgentCoords(mindfulVal, actionVal, techVal);

  return (
    <div className="w-full max-w-[300px] mx-auto flex items-center justify-center p-2 bg-zen-white rounded-lg">
      <svg width="300" height="300" viewBox="0 0 300 300" className="w-full h-auto">
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

        <line x1={center} y1={center} x2={grid1.xM} y2={grid1.yM} stroke="#dbdad9" strokeWidth="1" />
        <line x1={center} y1={center} x2={grid1.xA} y2={grid1.yA} stroke="#dbdad9" strokeWidth="1" />
        <line x1={center} y1={center} x2={grid1.xT} y2={grid1.yT} stroke="#dbdad9" strokeWidth="1" />

        <polygon
          points={`${real.xM},${real.yM} ${real.xA},${real.yA} ${real.xT},${real.yT}`}
          fill="#630d0d"
          fillOpacity="0.3"
          stroke="#630d0d"
          strokeWidth="2"
        />

        <circle cx={real.xM} cy={real.yM} r="4" fill="#630d0d" />
        <circle cx={real.xA} cy={real.yA} r="4" fill="#630d0d" />
        <circle cx={real.xT} cy={real.yT} r="4" fill="#630d0d" />

        <text x={grid1.xM} y={grid1.yM - 10} textAnchor="middle" className="font-label text-[11px] font-bold fill-heritage-maroon">
          MINDFUL ({mindfulVal})
        </text>
        <text x={grid1.xA + 12} y={grid1.yA + 4} textAnchor="start" className="font-label text-[11px] font-bold fill-heritage-maroon">
          ACTION ({actionVal})
        </text>
        <text x={grid1.xT - 12} y={grid1.yT + 4} textAnchor="end" className="font-label text-[11px] font-bold fill-heritage-maroon">
          TECH ({techVal})
        </text>
      </svg>
    </div>
  );
}
