/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, HelpCircle, ShieldAlert, Sparkle } from 'lucide-react';
import { Character } from '../types';

interface AnimatedPortraitProps {
  speaker: Character;
  speakerId: string;
  dialogueText: string;
}

type DialogueMood = 'EXCITED' | 'MYSTERIOUS' | 'CALM' | 'TENSE' | 'NORMAL';

export default function AnimatedPortrait({ speaker, speakerId, dialogueText }: AnimatedPortraitProps) {
  // Analyze current dialogue text to extract active emotional mood
  const mood = useMemo<DialogueMood>(() => {
    if (!dialogueText) return 'NORMAL';
    const textLower = dialogueText.toLowerCase();

    // Tense / Shocked mood detection
    if (
      textLower.includes('!') && 
      (textLower.includes('co?') || 
       textLower.includes('nie!') || 
       textLower.includes('zakon') || 
       textLower.includes('atak') || 
       textLower.includes('zdrajca') ||
       textLower.includes('spisek') ||
       textLower.includes('kontrola'))
    ) {
      return 'TENSE';
    }

    // Excited / Happy mood detection
    if (textLower.includes('!') || textLower.includes('hura') || textLower.includes('super') || textLower.includes('świetnie')) {
      return 'EXCITED';
    }

    // Mysterious / Gossipy / Quiet mood detection
    if (
      textLower.includes('...') || 
      textLower.includes('szept') || 
      textLower.includes('śś') || 
      textLower.includes('tajne') || 
      textLower.includes('sekret') ||
      textLower.includes('cicho')
    ) {
      return 'MYSTERIOUS';
    }

    // Calm / Therapeutic calculations
    if (speaker.faction === 'TERAPEUTKI' || textLower.includes('spokój') || textLower.includes('cisz')) {
      return 'CALM';
    }

    return 'NORMAL';
  }, [dialogueText, speaker.faction]);

  // Framer Motion variant configuration for physical breathing/movement
  const breathingVariants = {
    NORMAL: {
      y: [0, -4, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    CALM: {
      scale: [1, 1.015, 1],
      y: [0, -2, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    EXCITED: {
      y: [0, -10, 0],
      scale: [1, 1.03, 0.99, 1],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    MYSTERIOUS: {
      x: [-1.5, 1.5, -1.5],
      y: [0, -3, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    TENSE: {
      x: [-0.8, 0.8, -0.8, 0.8, 0],
      y: [-0.5, 0.5, -0.5, 0],
      transition: {
        duration: 0.12,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Render atmospheric background elements matching mood
  const renderMoodAura = () => {
    switch (mood) {
      case 'EXCITED':
        return (
          <>
            <div className="absolute inset-0 bg-rose-500/10 mix-blend-color-dodge pointer-events-none z-10" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
          </>
        );
      case 'MYSTERIOUS':
        return (
          <>
            <div className="absolute inset-0 bg-purple-950/20 mix-blend-multiply pointer-events-none z-10" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
          </>
        );
      case 'CALM':
        return (
          <>
            <div className="absolute inset-0 bg-cyan-950/15 mix-blend-overlay pointer-events-none z-10" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
          </>
        );
      case 'TENSE':
        return (
          <>
            <div className="absolute inset-0 bg-red-950/20 mix-blend-color-burn pointer-events-none z-10 animate-pulse" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-red-600/25 rounded-full blur-2xl pointer-events-none" />
          </>
        );
      default:
        return (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-[#ffdfa0]/15 rounded-full blur-3xl pointer-events-none" />
        );
    }
  };

  // Render floating particles or icons in the card frame
  const renderMoodParticles = () => {
    const particleCount = 6;
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(particleCount)].map((_, i) => {
          const delay = i * 0.4;
          const left = 15 + (i * 14) + Math.random() * 8;
          const size = Math.random() * 10 + 12;
          const duration = 2.5 + Math.random() * 2;

          let icon = <Sparkle className="w-full h-full text-amber-200/50" />;
          if (mood === 'EXCITED') {
            icon = i % 2 === 0 
              ? <Heart className="w-full h-full text-rose-300/45 fill-rose-300/25" /> 
              : <Sparkles className="w-full h-full text-amber-300/50" />;
          } else if (mood === 'MYSTERIOUS') {
            icon = <HelpCircle className="w-full h-full text-purple-300/40" />;
          } else if (mood === 'TENSE') {
            icon = <ShieldAlert className="w-full h-full text-red-400/50" />;
          } else if (mood === 'CALM') {
            icon = <div className="w-2.5 h-2.5 border border-cyan-300/50 bg-cyan-400/10 rotate-45" />;
          }

          return (
            <motion.div
              key={`m-part-${mood}-${i}`}
              className="absolute bottom-1/4"
              style={{ left: `${left}%`, width: size, height: size }}
              initial={{ y: 20, opacity: 0, scale: 0.6 }}
              animate={{
                y: [-20, -160],
                opacity: [0, 0.75, 0.75, 0],
                scale: [0.6, 1.1, 0.7],
                rotate: [0, i % 2 === 0 ? 180 : -180],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
      </div>
    );
  };

  // Twinkling eye flare overlay to simulate elegant blinking
  const renderBlinkingEyes = () => {
    return (
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Left Twinkle Eye */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 1.2, 0, 0, 0, 1, 0],
            opacity: [0, 0, 0.9, 0, 0, 0, 0.8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }}
          className="absolute w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          style={{ top: '33%', left: '41%' }}
        >
          <Sparkle className="w-full h-full fill-white" />
        </motion.div>

        {/* Right Twinkle Eye */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 0, 1.2, 0, 0, 1, 0],
            opacity: [0, 0, 0, 0.9, 0, 0, 0.8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
            delay: 0.15, // Subtle offset
          }}
          className="absolute w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          style={{ top: '33%', left: '55%' }}
        >
          <Sparkle className="w-full h-full fill-white" />
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      key={speakerId}
      variants={breathingVariants}
      animate={mood}
      className="relative max-w-[280px] md:max-w-xs w-full aspect-[4/5] rounded-t-[100px] overflow-hidden border-x-2 border-t-2 bg-[#1a0f0a] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-end group transition"
      style={{ borderColor: `${speaker.accentColor}60` }}
    >
      {/* Background Glow corresponding to mood */}
      {renderMoodAura()}

      {/* Portrait Image */}
      <img
        src={speaker.portraitUrl}
        alt={speaker.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
      />

      {/* Shading overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-15" />

      {/* Dynamic Eyelashes/Twinkle Sparkles (Animated Blinking) */}
      {renderBlinkingEyes()}

      {/* Decorative Floating Mood Particles */}
      {renderMoodParticles()}

      {/* Character Info Overlay card */}
      <div className="relative p-4 text-center z-25 space-y-1">
        <div
          className="inline-block px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white/90 backdrop-blur-md border border-white/20 shadow-lg"
          style={{ backgroundColor: `${speaker.accentColor}30` }}
        >
          {speaker.role}
        </div>
        <h4 className="text-lg font-black tracking-tight text-white drop-shadow-md">
          {speaker.name}
        </h4>
      </div>
    </motion.div>
  );
}
