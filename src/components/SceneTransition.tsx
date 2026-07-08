/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SceneTransitionProps {
  sceneId: string;
}

export default function SceneTransition({ sceneId }: SceneTransitionProps) {
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(sceneId);

  useEffect(() => {
    if (sceneId !== key) {
      // Trigger transition sequence when scene changes
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        setKey(sceneId);
      }, 1100); // Duration matches transition sequence
      return () => clearTimeout(timer);
    }
  }, [sceneId, key]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="fixed inset-0 z-50 pointer-events-auto overflow-hidden flex items-center justify-center bg-black/10"
        >
          {/* Main 3D Book Page Container */}
          <div className="absolute inset-0 flex select-none pointer-events-none" style={{ perspective: '2000px' }}>
            
            {/* Left Page (Fading out and sliding left) */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#1a0f0a] border-r border-white/5 flex flex-col justify-center items-end pr-12 shadow-2xl relative"
            >
              {/* Paper textures and warm vintage glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2d1b10] via-[#1a0f0a] to-[#2d1b10] opacity-80" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 to-transparent" />
              <div className="absolute inset-0 border-y-8 border-l-8 border-[#3d271a]/30 m-4 rounded-l-2xl" />
              
              <div className="relative z-10 text-right opacity-30 select-none">
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ffdfa0] mb-1">Poprzedni Rozdział</div>
                <div className="w-16 h-0.5 bg-gradient-to-l from-[#ffdfa0]/30 to-transparent ml-auto" />
              </div>
            </motion.div>

            {/* Right Page (Fading out and sliding right) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#1a0f0a] border-l border-white/5 flex flex-col justify-center items-start pl-12 shadow-2xl relative"
            >
              {/* Paper textures and warm vintage glow */}
              <div className="absolute inset-0 bg-gradient-to-tl from-[#2d1b10] via-[#1a0f0a] to-[#2d1b10] opacity-80" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute inset-0 border-y-8 border-r-8 border-[#3d271a]/30 m-4 rounded-r-2xl" />
              
              <div className="relative z-10 text-left opacity-30 select-none">
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ffdfa0] mb-1">Nowy Rozdział</div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#ffdfa0]/30 to-transparent" />
              </div>
            </motion.div>

            {/* Folding Leaf (Rotates 3D from right to left like a real page turn) */}
            <motion.div
              initial={{ rotateY: 0, shadow: '0 0 0px rgba(0,0,0,0)' }}
              animate={{ 
                rotateY: -180,
                transition: { duration: 0.85, ease: [0.645, 0.045, 0.355, 1], delay: 0.1 }
              }}
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#1e110b] origin-left z-20 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              style={{ 
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Cover texture / gold leaf backing */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#150a05] via-[#2d190e] to-[#1a0e08] shadow-inner" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute inset-0 border-y-8 border-r-8 border-[#ffdfa0]/15 m-4 rounded-r-xl" />

              {/* Magical Sparkle inside the flipping leaf */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <Sparkles className="w-16 h-16 text-[#ffdfa0]/60 animate-pulse" />
              </div>
            </motion.div>

            {/* Glowing Golden Line sweeping across as page flips */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ 
                x: '-100%', 
                opacity: [0, 1, 1, 0]
              }}
              transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.1 }}
              className="absolute inset-y-0 w-2 bg-gradient-to-b from-[#ffdfa0]/0 via-[#ffdfa0] to-[#ffdfa0]/0 z-30"
              style={{
                boxShadow: '0 0 40px 10px rgba(255, 223, 160, 0.8)',
              }}
            />

            {/* Magical golden stardust particles spraying along the spine */}
            {[...Array(15)].map((_, i) => {
              const delay = 0.2 + (i * 0.03);
              const size = Math.random() * 4 + 3;
              const y = 20 + Math.random() * 60; // Spread vertically
              return (
                <motion.div
                  key={`star-${i}`}
                  initial={{ x: '100%', y: `${y}%`, opacity: 0, scale: 0.5 }}
                  animate={{ 
                    x: ['50%', '-50%'],
                    y: [`${y}%`, `${y - 15 + Math.random() * 30}%`],
                    opacity: [0, 0.9, 0],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay }}
                  className="absolute rounded-full bg-gradient-to-tr from-yellow-300 to-amber-500 z-40 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                  style={{
                    width: size,
                    height: size,
                    left: '50%',
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
