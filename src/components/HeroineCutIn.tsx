/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface HeroineCutInProps {
  id: string;
  name: string;
  attackName: string;
  quote: string;
  color: string;
  accentColor: string;
  combo: number;
}

export default function HeroineCutIn({ id, name, attackName, quote, color, accentColor, combo }: HeroineCutInProps) {
  // Map specific heroine ID to her custom shadow color / theme colors
  const glowStyle = {
    boxShadow: `0 0 45px ${accentColor}`,
    borderColor: accentColor,
  };

  // If we are showing a combo (and combo count is >= 2), render a massive combo burst badge
  const isComboBonus = combo >= 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-45 flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Rapid diagonal scrolling speed-lines overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1.5px, transparent 1.5px, transparent 18px)',
          backgroundSize: '200% 200%',
          animation: 'scrollingSpeedlines 0.2s linear infinite'
        }}
      />

      {/* Dramatic color flash beam cutting horizontally through the screen */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.95 }}
        exit={{ scaleY: 0, opacity: 0 }}
        className="absolute left-0 right-0 h-44 sm:h-52 z-10 flex items-center justify-center pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}40, ${accentColor}cc, ${accentColor}40, transparent)`,
          borderTop: `2px solid ${accentColor}`,
          borderBottom: `2px solid ${accentColor}`,
        }}
      />

      {/* Main visual containment container */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-between px-6 sm:px-16 z-20 pointer-events-none">
        
        {/* HEROINE PORTRAIT - Crop and scale of teachers trio with dramatic filters */}
        <motion.div
          initial={{ x: -160, opacity: 0, scale: 0.85 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 180, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120 }}
          className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-[36px] overflow-hidden border-4 z-20 flex items-center justify-center shrink-0 shadow-2xl"
          style={glowStyle}
        >
          <img
            src="/src/assets/images/teachers_trio_1783451887451.jpg"
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
            style={{
              // Zoom & adjust focus based on active teacher
              objectPosition: id === 'basia' ? 'left' : id === 'hania' ? 'center' : id === 'zosia' ? 'right' : 'center',
              filter: `brightness(1.15) contrast(1.1) saturate(130%) drop-shadow(0 0 10px ${accentColor}cc)`
            }}
          />
          {/* Action Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Active indicator overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 rounded-full border border-white/25 text-[9px] font-black uppercase tracking-widest text-white shadow-md">
            NAUCZYCIELKA ACTIVE ⚡
          </div>
        </motion.div>

        {/* HEROINE INFORMATION PANEL: Quotes, abilities, and combos */}
        <motion.div
          initial={{ x: 160, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -180, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120 }}
          className="flex-1 flex flex-col justify-center items-start text-left pl-6 sm:pl-12 max-w-xl z-20"
        >
          {/* Highlight Indicator */}
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300 drop-shadow-md bg-black/50 px-3 py-1 rounded-full border border-amber-300/30">
            KONTRAKTYWNY SZTURM KOLORU
          </span>
          
          {/* Heroine Name */}
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {name}
          </h2>

          {/* Action text */}
          <p className={`text-base sm:text-lg font-black mt-1 uppercase ${color} tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse`}>
            {attackName}
          </p>

          {/* Dialogue bubble quote */}
          <div className="bg-black/75 border border-white/10 p-3.5 rounded-2xl text-xs sm:text-sm italic text-slate-100 mt-4 max-w-md shadow-xl leading-relaxed relative">
            <span className="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-black/75 border-b-[8px] border-b-transparent" />
            {quote}
          </div>

          {/* Floating Combo Burst alert */}
          {isComboBonus && (
            <motion.div
              initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
              animate={{ scale: [0.4, 1.25, 1], rotate: -8, opacity: 1 }}
              className="mt-4 bg-gradient-to-r from-red-500 via-amber-500 to-yellow-400 text-slate-950 font-black tracking-widest text-xs uppercase px-4 py-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5"
            >
              🔥 COMBO {combo}x BOOSTER!
            </motion.div>
          )}
        </motion.div>

      </div>

      <style>{`
        @keyframes scrollingSpeedlines {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
      `}</style>
    </motion.div>
  );
}
