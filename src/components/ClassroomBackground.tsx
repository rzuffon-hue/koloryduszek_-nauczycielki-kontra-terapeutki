/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ClassroomBackgroundProps {
  playerHp?: number;
  maxPlayerHp?: number;
  enemyHp?: number;
  maxEnemyHp?: number;
}

export default function ClassroomBackground({
  playerHp = 100,
  maxPlayerHp = 100,
  enemyHp = 100,
  maxEnemyHp = 100,
}: ClassroomBackgroundProps) {
  
  // Calculate health percentages (capped between 0 and 1)
  const playerPct = Math.max(0, Math.min(1, playerHp / maxPlayerHp));
  const enemyPct = Math.max(0, Math.min(1, enemyHp / maxEnemyHp));
  const diff = playerPct - enemyPct;
  
  // Dynamic blackboard text and aesthetics based on player performance
  let boardTitle = '🧸 SALA KREATYWNA';
  let boardSubtitle = 'Tęczowy Zakątek • Kreatywna Swoboda';
  let boardTheme = 'border-[#29160e] bg-[#0e2c1e]/40';
  let boardTextClass = 'text-emerald-300/80';
  let boardIcon = '🏫';
  
  if (diff >= 0.3) {
    boardTitle = '✨ SZALEŃSTWO BARW ✨';
    boardSubtitle = 'Tęczowy Zakątek rozkwita kolorami!';
    boardTheme = 'border-amber-700/60 bg-[#0c3c20]/45 shadow-[0_0_20px_rgba(52,211,153,0.15)]';
    boardTextClass = 'text-amber-200/90 font-extrabold';
    boardIcon = '🌈';
  } else if (diff < -0.2) {
    boardTitle = '🤫 REGULAMIN WYCISZENIA 🤫';
    boardSubtitle = 'Zachowanie niezgodne z instrukcją!';
    boardTheme = 'border-slate-800/80 bg-[#121620]/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
    boardTextClass = 'text-rose-400/90 font-semibold tracking-wider';
    boardIcon = '📋';
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* Deep, rich static vignette background */}
      <div className="absolute inset-0 bg-[#090504]" />
      <div className="absolute inset-0 bg-radial-gradient from-[#221008]/40 via-transparent to-[#040201] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
      
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* STATIC BLACKBOARD IN THE BACKGROUND (Clean, non-animated, hidden on smaller mobiles to save space) */}
      <div 
        className={`absolute top-[6%] left-[5%] right-[5%] h-[15%] hidden md:flex border-4 rounded-2xl shadow-lg items-center justify-between p-4 relative overflow-hidden z-0 border-[#29160e] ${boardTheme}`}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
        
        <div className="w-full h-full flex justify-between items-center px-4 text-white/30 text-xs font-mono select-none pointer-events-none relative z-10">
          {/* Left notes */}
          <div className="flex flex-col gap-0.5 items-start">
            <span className={`font-black tracking-wider text-xs uppercase ${boardTextClass}`}>{boardTitle}</span>
            <span className="opacity-80 text-[10px]">{boardSubtitle}</span>
          </div>

          {/* Centerpiece indicator */}
          <div className="text-center flex flex-col items-center">
            <span className="text-xl filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">{boardIcon}</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-1 text-white/60">KOLORYDUSZEK</span>
          </div>

          {/* Right rules list */}
          <div className="flex flex-col items-end text-right text-[10px] font-sans">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest border-b border-white/10 pb-0.5 mb-1">Moc Stron</span>
            <span className="text-emerald-400 font-black">🟢 Nauczycielki: {(playerPct * 100).toFixed(0)}%</span>
            <span className="text-rose-400">🔴 Terapeutki: {(enemyPct * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

    </div>
  );
}

