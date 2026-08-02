/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WskazowkaPrzedszkolna from './WskazowkaPrzedszkolna';

interface SceneTransitionProps {
  sceneId: string;
}

export default function SceneTransition({ sceneId }: SceneTransitionProps) {
  const [active, setActive] = useState(false);
  const [key, setKey] = useState(sceneId);

  useEffect(() => {
    if (sceneId !== key) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        setKey(sceneId);
      }, 2500); // 2500ms cinematic transition to allow reading the tips
      return () => clearTimeout(timer);
    }
  }, [sceneId, key]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#0e0705]/95 flex flex-col items-center justify-center p-6 space-y-8 select-none"
        >
          {/* Decorative Background Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-600/5 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-600/5 blur-[120px]" />
          </div>

          <div className="z-10 flex flex-col items-center space-y-4 text-center max-w-md w-full">
            {/* Pulsing Loading Spinner / Icon */}
            <div className="relative flex items-center justify-center w-12 h-12">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-500/20"></span>
              <div className="relative w-8 h-8 rounded-full border-2 border-t-amber-400 border-r-amber-500/20 border-b-amber-500/20 border-l-amber-500/20 animate-spin" />
            </div>

            {/* Loading text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              className="text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-[#ffdfa0] font-black"
            >
              Wczytywanie sali...
            </motion.div>

            {/* Custom Progress Bar */}
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300"
              />
            </div>
          </div>

          {/* Random Lore Tip & Secrets */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="z-10 w-full"
          >
            <WskazowkaPrzedszkolna />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

