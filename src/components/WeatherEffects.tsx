/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState } from '../types';

interface WeatherEffectsProps {
  gameState: GameState;
}

export default function WeatherEffects({ gameState }: WeatherEffectsProps) {
  const { currentChapterId, freedomScore, orderScore, playerFactionChoice } = gameState;
  const [lightningActive, setLightningActive] = useState(false);

  // Trigger random lightning flashes in Chapter 4 (Stormy)
  useEffect(() => {
    if (currentChapterId !== 4) return;

    const triggerLightning = () => {
      setLightningActive(true);
      setTimeout(() => {
        setLightningActive(false);
        // Double flash
        if (Math.random() > 0.4) {
          setTimeout(() => {
            setLightningActive(true);
            setTimeout(() => setLightningActive(false), 80);
          }, 120);
        }
      }, 100);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerLightning();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentChapterId]);

  // Determine active mood and layout options based on chapter
  const renderSunny = () => {
    // Chapter 1: Sunny rays & gentle floating warm pollen particles
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Ambient Warm Glow */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-amber-400/10 rounded-full blur-[160px]" />

        {/* Dynamic Sun Rays */}
        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sun-ray-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3d1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g transform="rotate(-35 300 0)">
            {/* Pulsating Sunbeams */}
            <motion.rect
              x="-200"
              y="0"
              width="140"
              height="2000"
              fill="url(#sun-ray-grad)"
              animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.95, 1.1, 0.95] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.rect
              x="100"
              y="0"
              width="80"
              height="2000"
              fill="url(#sun-ray-grad)"
              animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [1, 1.2, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.rect
              x="300"
              y="0"
              width="180"
              height="2000"
              fill="url(#sun-ray-grad)"
              animate={{ opacity: [0.5, 0.9, 0.5], scaleX: [0.9, 1.05, 0.9] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <motion.rect
              x="600"
              y="0"
              width="100"
              height="2000"
              fill="url(#sun-ray-grad)"
              animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.95, 1.15, 0.95] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </g>
        </svg>

        {/* Golden floating particles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 6 + 4;
          const left = Math.random() * 100;
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * -10;
          return (
            <motion.div
              key={`sun-p-${i}`}
              className="absolute rounded-full bg-gradient-to-tr from-amber-200 to-yellow-300 opacity-25 filter blur-[1px]"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: '-20px',
              }}
              animate={{
                y: [0, -1100],
                x: [0, Math.sin(i) * 50],
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderRainbowBreeze = () => {
    // Chapter 2: Creative breeze. Lens flares & colorful floating pastel sparks.
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Rainbow Gradient Flare */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(245,158,11,0.3) 25%, rgba(16,185,129,0.3) 50%, rgba(6,182,212,0.3) 75%, transparent 100%)',
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Flowing colorful wind particles */}
        {[...Array(20)].map((_, i) => {
          const colors = [
            'from-rose-400 to-pink-500',
            'from-amber-300 to-yellow-400',
            'from-cyan-400 to-blue-500',
            'from-emerald-400 to-teal-500',
          ];
          const colorClass = colors[i % colors.length];
          const size = Math.random() * 6 + 4;
          const top = Math.random() * 100;
          const duration = Math.random() * 8 + 6;
          const delay = Math.random() * -8;
          return (
            <motion.div
              key={`breeze-p-${i}`}
              className={`absolute rounded-full bg-gradient-to-r ${colorClass} opacity-30 blur-[0.5px]`}
              style={{
                width: size,
                height: size,
                top: `${top}%`,
                left: '-20px',
              }}
              animate={{
                x: [0, window.innerWidth + 200],
                y: [0, (Math.cos(i) * 100)],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderRainy = () => {
    // Chapter 3: Cosy rainy twilight (Sneakiness, dark room)
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Rainy Tint overlay */}
        <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />

        {/* Rain Streaks */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rain-streak" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="100%" stopColor="#cffafe" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Static SVG lines mapped to render rapidly */}
          {[...Array(35)].map((_, i) => {
            const x = Math.random() * 2000 - 500;
            const yStart = Math.random() * -400;
            const length = Math.random() * 80 + 60;
            const delay = Math.random() * -3;
            const duration = Math.random() * 0.8 + 0.6;
            return (
              <g key={`rain-${i}`}>
                <line
                  x1={x}
                  y1={yStart}
                  x2={x + 35}
                  y2={yStart + length}
                  stroke="url(#rain-streak)"
                  strokeWidth={Math.random() * 1.5 + 0.5}
                  className="animate-rain"
                  style={{
                    animation: `fall ${duration}s linear infinite ${delay}s`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Droplets splash occasionally */}
        {[...Array(12)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * -5;
          const duration = Math.random() * 3 + 2;
          return (
            <motion.div
              key={`splash-${i}`}
              className="absolute w-3 h-3 border border-cyan-300/30 rounded-full"
              style={{ left: `${left}%`, top: `${top}%` }}
              animate={{
                scale: [0, 2],
                opacity: [0, 0.4, 0],
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

        {/* Custom CSS for Rain Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fall {
            0% {
              transform: translate3d(0, -200px, 0);
            }
            100% {
              transform: translate3d(250px, 1200px, 0);
            }
          }
        `}} />
      </div>
    );
  };

  const renderStormy = () => {
    // Chapter 4: Windy stormy tension & lightning flashes
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dark rolling mist/fog overlay */}
        <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color-burn" />

        {/* Lightning Flash Layer */}
        <AnimatePresence>
          {lightningActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cyan-100 z-10 mix-blend-overlay"
              transition={{ duration: 0.05 }}
            />
          )}
        </AnimatePresence>

        {/* Rapid mist layers drifting */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent blur-3xl"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-900/10 to-transparent blur-3xl"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        {/* Flying stormy winds (fast, direct dust particle streaks) */}
        {[...Array(25)].map((_, i) => {
          const width = Math.random() * 120 + 80;
          const top = Math.random() * 100;
          const duration = Math.random() * 2 + 1.5;
          const delay = Math.random() * -3;
          return (
            <motion.div
              key={`wind-s-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-slate-400/20 to-transparent"
              style={{
                width,
                top: `${top}%`,
                left: '-200px',
              }}
              animate={{
                x: [0, window.innerWidth + 400],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderFinalShowdown = () => {
    // Chapter 5: Grand Finale. Effects vary heavily based on active alliance / scores
    const isTeachers = playerFactionChoice === 'NAUCZYCIELKI' || (playerFactionChoice === 'NEUTRAL' && freedomScore > orderScore + 10);
    const isTherapists = playerFactionChoice === 'TERAPEUTKI' || (playerFactionChoice === 'NEUTRAL' && orderScore > freedomScore + 10);

    if (isTeachers) {
      // FREEDOM FINALE: Joyous rainbow bursts & warm golden/orange spark celebration!
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Pulsating hot magenta/amber background hues */}
          <div className="absolute bottom-0 left-1/4 w-[70vw] h-[70vw] bg-rose-500/15 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-0 right-1/4 w-[50vw] h-[50vw] bg-amber-400/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '6s' }} />

          {/* Dancing confetti/fireworks elements */}
          {[...Array(25)].map((_, i) => {
            const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#fbbf24', '#10b981', '#3b82f6'];
            const color = colors[i % colors.length];
            const size = Math.random() * 8 + 5;
            const left = Math.random() * 100;
            const duration = Math.random() * 5 + 4;
            const delay = Math.random() * -5;
            return (
              <motion.div
                key={`freedom-star-${i}`}
                className="absolute shadow-lg"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color,
                  borderRadius: i % 2 === 0 ? '50%' : '1px',
                  left: `${left}%`,
                  bottom: '-20px',
                }}
                animate={{
                  y: [0, -1100],
                  x: [0, Math.sin(i * 3) * 120],
                  rotate: [0, 720],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
      );
    } else if (isTherapists) {
      // ORDER FINALE: Precise calming cyan, ice blue grid rays & breathing geometric crystalline light structures
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Calming deep cyan glow */}
          <div className="absolute inset-0 bg-cyan-950/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] bg-cyan-500/10 rounded-full blur-[180px]" />

          {/* Calming perfect vertical beam grids */}
          <div className="absolute inset-x-0 top-0 bottom-0 flex justify-around opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`grid-line-${i}`}
                className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  scaleX: [1, 2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Calming symmetry crystals drifting downwards symmetrically */}
          {[...Array(16)].map((_, i) => {
            const size = Math.random() * 6 + 4;
            const left = (i / 15) * 100; // Symmetrical horizontal distribution
            const duration = Math.random() * 8 + 8;
            const delay = Math.random() * -10;
            return (
              <motion.div
                key={`order-crystal-${i}`}
                className="absolute border border-cyan-300 bg-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.5)] rotate-45"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: '-20px',
                }}
                animate={{
                  y: [0, 1100],
                  opacity: [0, 0.8, 0.8, 0],
                  rotate: [45, 225],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'linear',
                }}
              />
            );
          })}
        </div>
      );
    } else {
      // NEUTRAL FINALE (ZŁOTA HARMONIA): Splendid blending stardust of both colors together with a gorgeous golden halo!
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Dual energy focal points */}
          <div className="absolute bottom-1/4 left-1/4 w-[50vw] h-[50vw] bg-amber-400/15 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] bg-cyan-400/15 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '5s' }} />

          {/* Central Golden Halo */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-yellow-300/10 rounded-full blur-[150px]" />

          {/* Twirling dual-energy sparkles */}
          {[...Array(30)].map((_, i) => {
            const isGold = i % 3 === 0;
            const isCyan = i % 3 === 1;
            const colorClass = isGold
              ? 'bg-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.6)]'
              : isCyan
              ? 'bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
              : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]';

            const size = Math.random() * 5 + 3;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 5;
            const delay = Math.random() * -6;
            return (
              <motion.div
                key={`harmony-star-${i}`}
                className={`absolute rounded-full ${colorClass}`}
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  bottom: '-20px',
                }}
                animate={{
                  y: [0, -1100],
                  x: [0, Math.sin(i * 2) * 80],
                  scale: [0.6, 1.2, 0.6],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
      );
    }
  };

  switch (currentChapterId) {
    case 1:
      return renderSunny();
    case 2:
      return renderRainbowBreeze();
    case 3:
      return renderRainy();
    case 4:
      return renderStormy();
    case 5:
      return renderFinalShowdown();
    default:
      return renderSunny();
  }
}
