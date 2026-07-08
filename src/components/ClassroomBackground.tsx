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
  
  // Difference in percentage health: ranges from -1 (worst, losing) to +1 (best, winning)
  const diff = playerPct - enemyPct;
  
  // Calculate silence factor: how much the therapists' sterile, dimmed environment dominates.
  // When player is losing (diff < 0), silenceFactor scales from 0 up to 1.
  const silenceFactor = diff < 0 ? Math.min(1, Math.abs(diff) * 1.5) : 0;
  
  // Dynamic blackboard text and aesthetics based on player performance
  let boardTitle = '🧸 SALA KREATYWNA 3D';
  let boardSubtitle = 'Tęczowy Zakątek • Kreatywna Swoboda';
  let boardLine1 = '2 + 2 = 🌈 chaos to radosna nauka!';
  let boardLine2 = 'Broń sali przed sterylnym wyciszeniem!';
  let boardTheme = 'border-[#29160e] bg-[#0e2c1e]';
  let boardTextClass = 'text-emerald-300/60';
  let boardIcon = '🏫';
  let boardIconAnimation = 'animate-bounce duration-[4000ms]';
  
  if (diff >= 0.3) {
    // Player is dominating! Highly creative, bright, supercharged state.
    boardTitle = '✨ SZALEŃSTWO BARW ✨';
    boardSubtitle = 'Tęczowy Zakątek rozkwita nieskończonością!';
    boardLine1 = 'Wyobraźnia: 100% | Radość: MAKSYMALNA! 🎉';
    boardLine2 = 'Frakcja Terapeutek ucieka przed kolorami!';
    boardTheme = 'border-amber-700 bg-[#0c3c20] shadow-[0_0_20px_rgba(52,211,153,0.3)]';
    boardTextClass = 'text-amber-200/80 font-extrabold';
    boardIcon = '🌈';
    boardIconAnimation = 'animate-bounce duration-[2000ms]';
  } else if (diff < -0.2) {
    // Opponent has upper hand. Dimmed, sterile "Silence Zone" is taking over.
    boardTitle = '🤫 REGULAMIN WYCISZENIA 🤫';
    boardSubtitle = 'Niesymetryczne zachowanie zostało wykryte!';
    boardLine1 = 'Zasada 42: Żadnej kreatywności. Pełna powaga.';
    boardLine2 = 'Status: Trwa procedowanie wyciszenia korytarza...';
    boardTheme = 'border-slate-800 bg-[#121620] opacity-90 shadow-[0_0_20px_rgba(239,68,68,0.1)]';
    boardTextClass = 'text-rose-400/70 font-semibold tracking-wider animate-pulse';
    boardIcon = '📋';
    boardIconAnimation = 'animate-pulse duration-[1500ms]';
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-all duration-1000">
      
      {/* BASE LAYER: Warm, friendly, glowing wooden kindergarten wall (Winning/Neutral state) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2b170e] via-[#1a0e07] to-[#120805] transition-all duration-1000" />
      
      {/* COLD STERILE LAYER: Blends in to dim and freeze the room when therapists dominate (Losing state) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#070b16] via-[#04060c] to-[#010204] transition-all duration-1000 mix-blend-multiply"
        style={{ opacity: silenceFactor }}
      />
      <div 
        className="absolute inset-0 bg-indigo-950/20 transition-all duration-1000 mix-blend-color-dodge"
        style={{ opacity: silenceFactor }}
      />

      {/* DYNAMIC WINDOW SUNBEAMS (Volumetric light rays) */}
      {/* 1. Cheerful Warm Sunbeams - pouring from top-left */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-1000"
        style={{ opacity: Math.max(0.01, 0.28 * (1 - silenceFactor)) }}
      >
        {/* Soft radial glow */}
        <div className="absolute -top-20 -left-20 w-[700px] h-[700px] bg-radial-gradient from-amber-400/25 via-orange-500/5 to-transparent pointer-events-none animate-pulse duration-[8000ms]" />
        
        {/* Slanted beams of warm window light */}
        <div 
          className="absolute top-0 left-0 w-[140%] h-[140%] origin-top-left rotate-[15deg]"
          style={{
            background: 'repeating-linear-gradient(60deg, rgba(251, 191, 36, 0.25) 0px, rgba(251, 191, 36, 0.25) 50px, transparent 50px, transparent 150px)',
            filter: 'blur(20px)',
            animation: 'panLightWarm 18s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* 2. Cold Sterile Beams - taking over when losing */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-1000"
        style={{ opacity: Math.min(0.20, silenceFactor * 0.4) }}
      >
        {/* Cold bluish radial spotlight overhead (the therapist's glare) */}
        <div className="absolute top-[-50px] left-[50%] -translate-x-1/2 w-[600px] h-[400px] bg-radial-gradient from-cyan-500/20 via-blue-900/2 to-transparent pointer-events-none animate-pulse duration-[4000ms]" />
        
        {/* Slanted beams of cold sterile blue light */}
        <div 
          className="absolute top-0 left-0 w-[140%] h-[140%] origin-top-left rotate-[10deg]"
          style={{
            background: 'repeating-linear-gradient(50deg, rgba(34, 211, 238, 0.15) 0px, rgba(34, 211, 238, 0.15) 35px, transparent 35px, transparent 180px)',
            filter: 'blur(16px)',
            animation: 'panLightCold 12s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* DYNAMIC HANGING GARLANDS (BUNTINGS) */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 flex justify-around px-8 z-10 pointer-events-none transition-all duration-1000"
        style={{
          opacity: 0.85 - silenceFactor * 0.45,
          filter: `grayscale(${silenceFactor * 90}%) translateY(${-silenceFactor * 10}px)`
        }}
      >
        <svg className="w-full h-16 overflow-visible">
          {/* Swaying path cord */}
          <path d="M 0,5 Q 250,22 500,5 Q 750,22 1000,5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          
          {/* Flags hung along the string */}
          {[
            { cx: 50, color: '#f87171' },  // Rose
            { cx: 120, color: '#fbbf24' }, // Yellow
            { cx: 190, color: '#a855f7' }, // Purple
            { cx: 260, color: '#22d3ee' }, // Cyan
            { cx: 330, color: '#fb7185' }, // Rose Pink
            { cx: 400, color: '#34d399' }, // Green
            { cx: 470, color: '#f59e0b' }, // Amber
            { cx: 540, color: '#a78bfa' }, // Light purple
            { cx: 610, color: '#fbbf24' },
            { cx: 680, color: '#f87171' },
            { cx: 750, color: '#22d3ee' },
            { cx: 820, color: '#fb7185' },
            { cx: 890, color: '#34d399' },
            { cx: 960, color: '#a855f7' }
          ].map((f, i) => (
            <polygon
              key={`pennant-${i}`}
              points={`${f.cx - 10},10 ${f.cx + 10},10 ${f.cx},35`}
              fill={f.color}
              opacity="0.85"
              style={{
                transformOrigin: `${f.cx}px 10px`,
                // Sway slower and tighter when losing/silenced
                animation: `buntingSway ${2.5 + silenceFactor * 2.5 + (i % 3) * 0.4}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </svg>
      </div>

      {/* GIANT GREEN BLACKBOARD IN THE BACKGROUND */}
      <div 
        className={`absolute top-[16%] left-[4%] right-[4%] h-[26%] border-[8px] rounded-[24px] shadow-2xl transition-all duration-1000 flex flex-col items-center justify-center p-4 relative overflow-hidden z-0 ${boardTheme}`}
      >
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
        
        {/* Child-like chalk drawings in chalkboard background */}
        <div className="w-full h-full flex justify-between items-center px-4 md:px-8 text-white/30 text-[11px] font-mono select-none pointer-events-none relative z-10 transition-all duration-1000">
          
          {/* Left notes */}
          <div className="flex flex-col gap-1 items-start max-w-[30%]">
            <span className={`font-black tracking-wider text-xs uppercase ${boardTextClass}`}>{boardTitle}</span>
            <span className="opacity-80 hidden sm:inline">{boardSubtitle}</span>
            <span className="text-[10px] text-amber-100/45 italic mt-1 font-sans">{boardLine1}</span>
          </div>

          {/* Centerpiece indicator */}
          <div className="text-center flex flex-col items-center">
            <span className={`text-2xl ${boardIconAnimation} filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]`}>{boardIcon}</span>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] mt-1.5 text-white/80 hidden xs:inline-block">TĘCZOWY ZAKĄTEK</span>
            <span className="text-[7px] text-white/40 tracking-wider">Mecz-3 Kreatywności</span>
          </div>

          {/* Right rules list */}
          <div className="flex flex-col gap-0.5 items-end text-right max-w-[30%] font-sans">
            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest border-b border-white/10 pb-0.5 mb-1">Moc Frakcji</span>
            <span className="text-emerald-400 text-[10px] font-black">🟢 Nauczycielki: {(playerPct * 100).toFixed(0)}%</span>
            <span className={`${silenceFactor > 0.4 ? 'text-red-400 font-black' : 'text-slate-400'} text-[10px]`}>🔴 Terapeutki: {(enemyPct * 100).toFixed(0)}%</span>
            <span className="text-[9px] text-purple-300/60 mt-1 hidden sm:inline italic">{boardLine2}</span>
          </div>

        </div>

        {/* Dynamic blackboard overlays */}
        {silenceFactor > 0.5 && (
          <div className="absolute inset-0 bg-red-950/10 pointer-events-none animate-pulse duration-[2000ms] mix-blend-color-burn z-0" />
        )}
      </div>

      {/* DYNAMIC SWAYING & ROCKING PLAYGROUND TOYS */}
      {/* 1. Rocking Toy Horse (Bottom-Left Corner) */}
      <div 
        className="absolute bottom-12 left-10 flex flex-col items-center select-none pointer-events-none z-10 hidden md:flex transition-all duration-1000"
        style={{
          opacity: 0.35 + (1 - silenceFactor) * 0.5,
          filter: `grayscale(${silenceFactor * 85}%)`,
          transform: `scale(${1 - silenceFactor * 0.1}) translateY(${silenceFactor * 8}px)`
        }}
      >
        <div 
          className="text-5xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
          style={{
            animation: silenceFactor > 0.95 
              ? 'none' 
              : `rockHorse ${2.2 + silenceFactor * 3.5}s ease-in-out infinite alternate`,
            transformOrigin: 'bottom center'
          }}
        >
          🎠
        </div>
        <span className="text-[8px] font-mono font-bold tracking-[0.2em] text-amber-200/40 uppercase mt-2.5">Karuzela</span>
      </div>

      {/* 2. Rotating Wind Pinwheel / Spinning Top (Bottom-Right Corner) */}
      <div 
        className="absolute bottom-12 right-12 flex flex-col items-center select-none pointer-events-none z-10 hidden md:flex transition-all duration-1000"
        style={{
          opacity: 0.35 + (1 - silenceFactor) * 0.5,
          filter: `grayscale(${silenceFactor * 85}%)`,
          transform: `scale(${1 - silenceFactor * 0.1}) translateY(${silenceFactor * 8}px)`
        }}
      >
        <div 
          className="text-5xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
          style={{
            animation: silenceFactor > 0.85 
              ? 'rockHorse 5s ease-in-out infinite alternate' 
              : `spinToy ${1.8 + silenceFactor * 12}s linear infinite`,
            transformOrigin: 'center center'
          }}
        >
          🌀
        </div>
        <span className="text-[8px] font-mono font-bold tracking-[0.2em] text-cyan-300/40 uppercase mt-2.5">Wiatraczek</span>
      </div>

      {/* 3. Wall Shelf with Plush Toys (Right Side) */}
      <div 
        className="absolute top-[48%] right-[8%] w-28 h-2.5 bg-[#3a1d10] border-b border-[#221008] rounded-full opacity-40 z-0 hidden lg:block transition-all duration-1000"
        style={{ filter: `grayscale(${silenceFactor * 70}%)` }}
      />
      <div 
        className="absolute top-[42%] right-[8%] w-28 flex justify-around items-end px-3 z-10 hidden lg:flex transition-all duration-1000"
        style={{
          opacity: 0.45 + (1 - silenceFactor) * 0.45,
          filter: `grayscale(${silenceFactor * 80}%)`,
          transform: `translateY(${silenceFactor * 5}px)`
        }}
      >
        {/* Teddy Bear */}
        <div 
          className="text-3xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          style={{
            transformOrigin: 'bottom center',
            animation: `toyNudge ${3.5 + silenceFactor * 3}s ease-in-out infinite alternate`
          }}
        >
          🧸
        </div>
        {/* Paint brush and palette */}
        <div 
          className="text-2xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          style={{
            transformOrigin: 'bottom center',
            animation: `toyNudge ${4.8 + silenceFactor * 2}s ease-in-out infinite alternate-reverse`
          }}
        >
          🎨
        </div>
      </div>

      {/* 4. Toy Shelf (Left Side) */}
      <div 
        className="absolute top-[48%] left-[8%] w-28 h-2.5 bg-[#3a1d10] border-b border-[#221008] rounded-full opacity-40 z-0 hidden lg:block transition-all duration-1000"
        style={{ filter: `grayscale(${silenceFactor * 70}%)` }}
      />
      <div 
        className="absolute top-[42%] left-[8%] w-28 flex justify-around items-end px-3 z-10 hidden lg:flex transition-all duration-1000"
        style={{
          opacity: 0.45 + (1 - silenceFactor) * 0.45,
          filter: `grayscale(${silenceFactor * 80}%)`,
          transform: `translateY(${silenceFactor * 5}px)`
        }}
      >
        {/* Castle Block */}
        <div 
          className="text-2.5xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          style={{
            transformOrigin: 'bottom center',
            animation: `toyNudge ${4.2 + silenceFactor * 4}s ease-in-out infinite alternate`
          }}
        >
          🏰
        </div>
        {/* Rubik Cube / Gift box */}
        <div 
          className="text-2.5xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          style={{
            transformOrigin: 'bottom center',
            animation: `toyNudge ${3.1 + silenceFactor * 2}s ease-in-out infinite alternate-reverse`
          }}
        >
          🎁
        </div>
      </div>

      {/* FLOATING DRIFTING TOYS & PARTICLES (Toy Blocks, Airplanes, Motes of dust) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Paper airplane */}
        <div 
          className="absolute text-xl opacity-50 transition-all duration-1000"
          style={{
            left: '12%',
            top: '55%',
            animation: 'driftToyPlane 22s linear infinite',
            filter: `grayscale(${silenceFactor * 85}%)`,
            opacity: 0.5 - silenceFactor * 0.3
          }}
        >
          ✈️
        </div>

        {/* Toy Block A */}
        <div 
          className="absolute text-[10px] bg-gradient-to-br from-amber-400 to-amber-600 w-4.5 h-4.5 rounded flex items-center justify-center font-black text-slate-900 border border-amber-300 shadow-md select-none transition-all duration-1000"
          style={{
            left: '82%',
            top: '54%',
            animation: 'driftToyPlane 28s linear infinite -6s',
            filter: `grayscale(${silenceFactor * 85}%)`,
            opacity: 0.6 - silenceFactor * 0.4
          }}
        >
          A
        </div>

        {/* Toy Block B */}
        <div 
          className="absolute text-[10px] bg-gradient-to-br from-rose-400 to-rose-600 w-4.5 h-4.5 rounded flex items-center justify-center font-black text-slate-900 border border-rose-300 shadow-md select-none transition-all duration-1000"
          style={{
            left: '78%',
            top: '64%',
            animation: 'driftToyPlane 24s linear infinite -12s',
            filter: `grayscale(${silenceFactor * 85}%)`,
            opacity: 0.6 - silenceFactor * 0.4
          }}
        >
          B
        </div>

        {/* Floating Bubble A */}
        <div 
          className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400/20 border border-cyan-300/40 transition-all duration-1000"
          style={{
            left: '24%',
            top: '76%',
            animation: `driftBubbleToy ${13 + silenceFactor * 7}s linear infinite`,
            opacity: 0.65 - silenceFactor * 0.5
          }}
        />

        {/* Floating Bubble B */}
        <div 
          className="absolute w-5 h-5 rounded-full bg-pink-400/15 border border-pink-300/35 transition-all duration-1000"
          style={{
            left: '74%',
            top: '20%',
            animation: `driftBubbleToy ${16 + silenceFactor * 9}s linear infinite -5s`,
            opacity: 0.6 - silenceFactor * 0.5
          }}
        />

        {/* Floating Sparkle/Star (Only active when winning/neutral) */}
        <div 
          className="absolute text-sm select-none transition-all duration-1000"
          style={{
            left: '42%',
            top: '70%',
            animation: 'driftBubbleToy 11s linear infinite',
            opacity: 0.6 * (1 - silenceFactor),
          }}
        >
          ✨
        </div>
        
        <div 
          className="absolute text-sm select-none transition-all duration-1000"
          style={{
            left: '60%',
            top: '80%',
            animation: 'driftBubbleToy 15s linear infinite -3s',
            opacity: 0.4 * (1 - silenceFactor),
          }}
        >
          🎈
        </div>

      </div>

      {/* CORE CSS KEYFRAMES */}
      <style>{`
        @keyframes panLightWarm {
          0% { transform: rotate(12deg) scale(1.0); opacity: 0.85; }
          100% { transform: rotate(18deg) scale(1.05); opacity: 1.0; }
        }
        @keyframes panLightCold {
          0% { transform: rotate(8deg) scale(1.0); opacity: 0.7; }
          100% { transform: rotate(13deg) scale(1.03); opacity: 1.0; }
        }
        @keyframes buntingSway {
          0% { transform: rotate(-5deg); }
          100% { transform: rotate(5deg); }
        }
        @keyframes rockHorse {
          0% { transform: rotate(-9deg) translateY(0px); }
          100% { transform: rotate(9deg) translateY(-3px); }
        }
        @keyframes spinToy {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes toyNudge {
          0% { transform: rotate(-4deg) translateY(0); }
          100% { transform: rotate(4deg) translateY(-2px); }
        }
        @keyframes driftToyPlane {
          0% { transform: translateY(0) rotate(0deg) scale(0.95); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-240px) rotate(360deg) scale(1.05); opacity: 0; }
        }
        @keyframes driftBubbleToy {
          0% { transform: translate(0, 90px) scale(0.85); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate(45px, -190px) scale(1.15); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
