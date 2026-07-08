/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from './SoundManager';
import { CHAPTERS } from '../data/chapters';
import { CHARACTERS } from '../data/characters';
import { Scene, Choice, Faction, GameState, PlayerProfile } from '../types';
import MinigameWrapper from './Minigames';
import WeatherEffects from './WeatherEffects';
import SceneTransition from './SceneTransition';
import AnimatedPortrait from './AnimatedPortrait';
import DiamondAttack from './DiamondAttack';

interface StoryScreenProps {
  gameState: GameState;
  onUpdateState: (updated: Partial<GameState>) => void;
  onExitToMenu: () => void;
  playerProfile: PlayerProfile;
}

export default function StoryScreen({ gameState, onUpdateState, onExitToMenu, playerProfile }: StoryScreenProps) {
  const chapter = CHAPTERS.find(c => c.id === gameState.currentChapterId);
  const scene: Scene | undefined = chapter?.scenes[gameState.currentSceneId];

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [activeMinigame, setActiveMinigame] = useState<'FORT' | 'PAINT' | 'BLOCKS' | 'MOVEMENT' | 'HIDDEN' | 'PUZZLE' | 'DIAMOND' | null>(null);
  const [typedText, setTypedText] = useState('');
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Synchronously reset dialogue when scene ID changes to prevent stale dialogue indices
  const [prevSceneId, setPrevSceneId] = useState(gameState.currentSceneId);
  if (gameState.currentSceneId !== prevSceneId) {
    setDialogueIndex(0);
    setTypedText('');
    setPrevSceneId(gameState.currentSceneId);
  }

  // Tracking score changes for pop-up indicators
  const [freedomPop, setFreedomPop] = useState<number | null>(null);
  const [orderPop, setOrderPop] = useState<number | null>(null);
  const [prevFreedom, setPrevFreedom] = useState(gameState.freedomScore);
  const [prevOrder, setPrevOrder] = useState(gameState.orderScore);

  useEffect(() => {
    if (gameState.freedomScore !== prevFreedom) {
      const diff = gameState.freedomScore - prevFreedom;
      setFreedomPop(diff);
      setPrevFreedom(gameState.freedomScore);
      const timer = setTimeout(() => setFreedomPop(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.freedomScore, prevFreedom]);

  useEffect(() => {
    if (gameState.orderScore !== prevOrder) {
      const diff = gameState.orderScore - prevOrder;
      setOrderPop(diff);
      setPrevOrder(gameState.orderScore);
      const timer = setTimeout(() => setOrderPop(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.orderScore, prevOrder]);

  // Background music control based on scene context
  useEffect(() => {
    if (!scene) return;

    if (scene.id.includes('secret') || scene.id.includes('escape')) {
      sound.playMusic('tension');
    } else if (scene.id.includes('therapists') || scene.id.includes('meditate') || scene.id.includes('order')) {
      sound.playMusic('calm');
    } else {
      sound.playMusic('happy');
    }

    setDialogueIndex(0);
  }, [scene]);

  // Track previously unlocked teachers to display dynamic catalog unlock toast notifications
  const prevUnlockedRef = useRef<string[]>(playerProfile.unlockedTeachers);

  useEffect(() => {
    const currentUnlocked = playerProfile.unlockedTeachers;
    const prevUnlocked = prevUnlockedRef.current;

    // Find characters that are in currentUnlocked but not in prevUnlocked
    const newlyUnlocked = currentUnlocked.filter(id => !prevUnlocked.includes(id));

    if (newlyUnlocked.length > 0) {
      // Find character name from registry
      const charName = CHARACTERS[newlyUnlocked[0]]?.name || newlyUnlocked[0];
      sound.playUnlock();
      setShowNotification(`🎉 ODBLOKOWANO KARTOTEKĘ: ${charName}! Możesz przeczytać jej akta w Menu.`);
      const timer = setTimeout(() => setShowNotification(null), 5000);
      return () => clearTimeout(timer);
    }

    prevUnlockedRef.current = currentUnlocked;
  }, [playerProfile.unlockedTeachers]);

  // Typewriter effect for dialog text with robust ref skipping
  const currentDialogue = scene?.dialogue[dialogueIndex];
  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef<number>(0);
  const isTypewriterActiveRef = useRef(false);

  useEffect(() => {
    if (!currentDialogue) return;

    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }

    // Play situational warning sound for scary characters when they start speaking
    const scarySpeakers = ['dyrektorka', 'sonia', 'lysy_kierownik'];
    if (scarySpeakers.includes(currentDialogue.speakerId)) {
      sound.playAlert();
    }

    setTypedText('');
    isTypewriterActiveRef.current = true;
    let i = 0;
    const txt = currentDialogue.text;
    typewriterTimerRef.current = setInterval(() => {
      setTypedText(txt.slice(0, i + 1));
      i++;
      if (i >= txt.length) {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
        isTypewriterActiveRef.current = false;
      }
    }, 15); // Quick typewriter speed for legibility

    return () => {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      isTypewriterActiveRef.current = false;
    };
  }, [currentDialogue]);

  if (!chapter || !scene) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-xl">Błąd ładowania sceny.</p>
        <button onClick={onExitToMenu} className="mt-4 bg-slate-700 py-2 px-4 rounded">Powrót do Menu</button>
      </div>
    );
  }

  const handleNextDialogue = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 200) {
      return; // Filter rapid double-clicks/taps that bypass short dialogue lines
    }
    lastClickTimeRef.current = now;

    const fullText = currentDialogue?.text || '';
    if (isTypewriterActiveRef.current) {
      sound.playClick();
      // Skipped/sped up - clear typing timer and instantly reveal full text
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      isTypewriterActiveRef.current = false;
      setTypedText(fullText);
      return;
    }

    if (dialogueIndex < scene.dialogue.length - 1) {
      sound.playSwipe();
      setDialogueIndex(prev => prev + 1);
    } else if (scene.minigameType && !activeMinigame) {
      sound.playBattleStart();
      // Trigger minigame after dialogue finishes
      setActiveMinigame(scene.minigameType);
    }
  };

  const handleChoiceSelect = (choice: Choice) => {
    sound.playChoice();

    // Check faction requirement if exists
    if (choice.requiredFaction && gameState.playerFactionChoice !== choice.requiredFaction) {
      sound.playFail();
      setShowNotification(`Ten wybór wymaga przynależności do frakcji: ${choice.requiredFaction === 'NAUCZYCIELKI' ? '🌼 NAUCZYCIELKI' : '🔷 TERAPEUTKI'}`);
      setTimeout(() => setShowNotification(null), 3500);
      return;
    }

    // Apply stat changes
    let newFreedom = Math.max(0, Math.min(100, gameState.freedomScore + choice.impactFreedom));
    let newOrder = Math.max(0, Math.min(100, gameState.orderScore + choice.impactOrder));

    // Sound effect on stat gain
    if (choice.impactFreedom > 0) sound.playStatGain('freedom');
    if (choice.impactOrder > 0) sound.playStatGain('order');

    // Handle inventory
    const nextInventory = [...gameState.inventory];
    if (choice.gainItem && !nextInventory.includes(choice.gainItem)) {
      sound.playAchievement();
      nextInventory.push(choice.gainItem);
    }

    // Lock faction if choice triggers lock
    let newFaction = gameState.playerFactionChoice;
    if (choice.id === 'ch4_join_teachers') newFaction = 'NAUCZYCIELKI';
    if (choice.id === 'ch4_join_therapists') newFaction = 'TERAPEUTKI';

    // Figure out next scene & chapter ID
    let nextScene = choice.nextSceneId;
    let nextChapterId = gameState.currentChapterId;

    // Dynamically check if the next scene crosses into a higher chapter (e.g. 'ch11_intro' -> Chapter 11)
    const match = nextScene.match(/^ch([0-9]+)_/);
    if (match) {
      const sceneChapterNum = parseInt(match[1], 10);
      if (sceneChapterNum > gameState.currentChapterId) {
        nextChapterId = sceneChapterNum;
      }
    }

    // Save choice consequence notification
    if (choice.consequenceText) {
      setShowNotification(choice.consequenceText);
      setTimeout(() => setShowNotification(null), 4000);
    }

    onUpdateState({
      currentChapterId: nextChapterId,
      currentSceneId: nextScene,
      freedomScore: newFreedom,
      orderScore: newOrder,
      playerFactionChoice: newFaction,
      inventory: nextInventory
    });
  };

  const handleMinigameWin = (freedomBonus: number, orderBonus: number) => {
    setActiveMinigame(null);

    let newFreedom = Math.max(0, Math.min(100, gameState.freedomScore + freedomBonus));
    let newOrder = Math.max(0, Math.min(100, gameState.orderScore + orderBonus));

    const updatedCompleted = [...gameState.completedMinigames];
    if (scene.minigameType && !updatedCompleted.includes(scene.minigameType)) {
      updatedCompleted.push(scene.minigameType);
    }

    onUpdateState({
      freedomScore: newFreedom,
      orderScore: newOrder,
      completedMinigames: updatedCompleted,
      currentSceneId: scene.nextSceneIdOnMinigameWin || scene.id
    });
  };

  const handleMinigameLose = () => {
    setActiveMinigame(null);
    // Proceed anyway as fallback so the player is never stuck, with slight penalty
    onUpdateState({
      freedomScore: Math.max(0, gameState.freedomScore - 5),
      orderScore: Math.max(0, gameState.orderScore - 5),
      currentSceneId: scene.nextSceneIdOnMinigameWin || scene.id
    });
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Get current speaker details
  const speakerId = currentDialogue?.speakerId || 'system';
  const speaker = CHARACTERS[speakerId] || {
    id: 'system',
    name: 'Narrator',
    faction: 'NEUTRAL' as Faction,
    role: '',
    description: '',
    portraitUrl: '',
    accentColor: '#cbd5e1',
    secondaryColor: '#94a3b8',
    abilities: [],
    history: '',
    winPhrase: ''
  };

  const showChoices = dialogueIndex === scene.dialogue.length - 1 && !scene.minigameType;

  return (
    <div id="story-viewport" className="min-h-screen bg-[#1a0f0a] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 bg-[#1a0f0a]" />
      
      {/* Absolute fullscreen scene background with parallax entry */}
      <motion.div
        key={scene.id}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] saturate-[1.2]"
        style={{ backgroundImage: `url(${scene.backgroundUrl})` }}
      />
      
      {/* Immersive overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffedcc] via-[#f7d08a] to-[#d9a066] opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)` }} />
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#ff9068] rounded-full blur-[120px] opacity-15 pointer-events-none z-0" />

      {/* Scene Weather & Mood Atmospheric Effects */}
      <WeatherEffects gameState={gameState} />

      {/* Cinematic Scene Page Turn Transition */}
      <SceneTransition sceneId={scene.id} />

      {/* Top Header Overlay */}
      <div className="z-10 bg-black/50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToMenu}
            id="back-to-menu-btn"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-white shadow-lg shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
              <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#ffdfa0] font-bold drop-shadow-md">
                {chapter.title}
              </div>
            </div>
            <div className="text-base font-extrabold font-sans tracking-tight text-white">{scene.title}</div>
          </div>
        </div>

        {/* Live HUD Stats with Cinematic Faction Meters */}
        <div className="flex flex-1 max-w-2xl justify-end items-center gap-6">
          {/* Freedom Meter */}
          <div className="flex flex-col gap-1 w-28 md:w-52 relative">
            <div className="flex justify-between items-end relative">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#ffdfa0] drop-shadow-md flex items-center gap-1">
                🌈 Dziecięca Wolność
              </span>
              <span className="text-xs font-black italic text-white drop-shadow-md">{gameState.freedomScore}%</span>
              
              {/* Dynamic Score Pop-up Indicator */}
              <AnimatePresence>
                {freedomPop !== null && (
                  <motion.span
                    initial={{ opacity: 0, y: 12, scale: 0.8 }}
                    animate={{ opacity: 1, y: -22, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute right-0 top-[-25px] text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full z-30 ${
                      freedomPop > 0 ? 'text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-rose-400 bg-rose-950/90 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    }`}
                  >
                    {freedomPop > 0 ? `+${freedomPop}` : freedomPop}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-3.5 w-full bg-black/50 rounded-full border border-white/10 overflow-hidden shadow-inner relative">
              {/* Animated Shimmer Overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10 animate-pulse" style={{ backgroundSize: '200% 100%' }} />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${gameState.freedomScore}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                className="h-full bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(244,63,94,0.7)]"
              />
            </div>
          </div>

          {/* Order Meter */}
          <div className="flex flex-col gap-1 w-28 md:w-52 relative">
            <div className="flex justify-between items-end relative">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 drop-shadow-md flex items-center gap-1">
                ⚙️ Terapeutyczne Uporządkowanie
              </span>
              <span className="text-xs font-black italic text-white drop-shadow-md">{gameState.orderScore}%</span>
              
              {/* Dynamic Score Pop-up Indicator */}
              <AnimatePresence>
                {orderPop !== null && (
                  <motion.span
                    initial={{ opacity: 0, y: 12, scale: 0.8 }}
                    animate={{ opacity: 1, y: -22, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute right-0 top-[-25px] text-[10px] font-extrabold font-mono px-2 py-0.5 rounded-full z-30 ${
                      orderPop > 0 ? 'text-cyan-400 bg-cyan-950/90 border border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-slate-400 bg-slate-900/90 border border-slate-700/40 shadow-md'
                    }`}
                  >
                    {orderPop > 0 ? `+${orderPop}` : orderPop}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-3.5 w-full bg-black/50 rounded-full border border-white/10 overflow-hidden shadow-inner relative">
              {/* Animated Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10 animate-pulse" style={{ backgroundSize: '200% 100%' }} />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${gameState.orderScore}%` }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                className="h-full bg-gradient-to-r from-slate-600 via-sky-400 to-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.7)]"
              />
            </div>
          </div>

          <div className="flex items-center border-l border-white/10 pl-4 shrink-0">
            <button
              onClick={toggleMute}
              id="toggle-audio-btn"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-white shadow-lg"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating notifications */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 backdrop-blur-lg border-2 border-[#ffdfa0]/60 rounded-xl px-5 py-3 shadow-2xl flex items-center gap-3 text-sm max-w-md text-center text-amber-100"
          >
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center - Active Minigame Modal Overlay */}
      <AnimatePresence>
        {activeMinigame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {activeMinigame === 'DIAMOND' ? (
              <div className="w-full h-full max-w-5xl bg-[#120804] border-2 border-[#ffdfa0]/30 rounded-[36px] overflow-hidden shadow-2xl relative z-50">
                <DiamondAttack
                  playerProfile={playerProfile}
                  opponentId={scene.id === 'ch10_boss' ? 'lysy_kierownik' : 'amelia'}
                  opponentLevel={scene.id === 'ch10_boss' ? 10 : 8}
                  onClose={(rewards) => {
                    if (rewards && rewards.won) {
                      handleMinigameWin(30, 30);
                    } else {
                      // Allow proceeding as fallback anyway but with lower score
                      handleMinigameWin(10, 10);
                    }
                  }}
                  isTraining={false}
                />
              </div>
            ) : (
              <MinigameWrapper
                type={activeMinigame as any}
                onWin={handleMinigameWin}
                onLose={handleMinigameLose}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Middle Area - Character Portrait Display */}
      {!activeMinigame && (
        <div className="flex-1 flex items-end justify-center px-4 md:px-12 pb-4 overflow-hidden z-10 select-none">
          <AnimatePresence mode="wait">
            {speaker.portraitUrl && speakerId !== 'system' && speakerId !== 'player' && (
              <AnimatedPortrait
                speaker={speaker}
                speakerId={speakerId}
                dialogueText={currentDialogue?.text || ''}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Area - Dialogue Box & Choices */}
      {!activeMinigame && (
        <div className="z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6 space-y-4 max-w-4xl mx-auto w-full">
          {/* Faction lock details in Chapter 5 */}
          {gameState.playerFactionChoice !== 'NEUTRAL' && showChoices && (
            <div className="text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ffdfa0] drop-shadow-md">
              Przymierze: {gameState.playerFactionChoice === 'NAUCZYCIELKI' ? '🌼 NAUCZYCIELKI' : '🔷 TERAPEUTKI'}
            </div>
          )}

          {/* Typewriter Dialogue box */}
          {!showChoices ? (
            <div
              onClick={handleNextDialogue}
              id="dialogue-box"
              className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative cursor-pointer hover:border-white/30 hover:bg-black/60 transition duration-300 select-none flex flex-col justify-between min-h-[140px] max-w-4xl mx-auto w-full"
            >
              {/* Speaker Header with neon pulsing element */}
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: speaker.accentColor || '#f59e0b' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: speaker.accentColor || '#f59e0b' }}></span>
                </span>
                <span
                  className="font-black tracking-[0.2em] text-xs uppercase font-mono"
                  style={{ color: speaker.accentColor || '#ffffff' }}
                >
                  {speaker.name}
                </span>
                {speaker.role && (
                  <span className="text-[10px] text-white/50 tracking-wider uppercase font-mono pl-2 border-l border-white/10">{speaker.role}</span>
                )}
              </div>

              {/* Typed text */}
              <p className="text-white/95 text-base md:text-lg leading-relaxed flex-1 mt-2 mb-4 font-medium italic drop-shadow-sm">
                "{typedText}"
              </p>

              {/* Tap to continue indicator */}
              <div className="flex justify-end items-center text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase pt-2">
                Naciśnij dalej <ChevronRight className="w-4 h-4 ml-1 animate-bounce" />
              </div>
            </div>
          ) : (
            /* Choice visual array styled with custom border gradient frames */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="choice-selector">
              <AnimatePresence>
                {scene.choices.map((choice) => {
                  const isLocked = choice.requiredFaction && gameState.playerFactionChoice !== choice.requiredFaction;
                  
                  // Dynamic borders matching path selection
                  let gradientClasses = 'from-amber-600 via-yellow-500 to-orange-500';
                  let labelColor = 'text-amber-400';
                  let badgeLabel = 'WYBÓR FABULARNY';

                  if (choice.requiredFaction === 'NAUCZYCIELKI' || choice.impactFreedom > 0) {
                    gradientClasses = 'from-red-500 via-amber-400 to-yellow-500';
                    labelColor = 'text-amber-300';
                    badgeLabel = 'ŚCIEŻKA WOLNOŚCI (NAUCZYCIELKI)';
                  } else if (choice.requiredFaction === 'TERAPEUTKI' || choice.impactOrder > 0) {
                    gradientClasses = 'from-slate-500 via-sky-400 to-blue-600';
                    labelColor = 'text-sky-300';
                    badgeLabel = 'ŚCIEŻKA UPORZĄDKOWANIA (TERAPEUTKI)';
                  }

                  if (isLocked) {
                    gradientClasses = 'from-slate-800 to-slate-900';
                    labelColor = 'text-slate-500';
                    badgeLabel = 'WYBÓR ZABLOKOWANY';
                  }

                  return (
                    <motion.div
                      key={choice.id}
                      onClick={() => !isLocked && handleChoiceSelect(choice)}
                      className={`relative p-[1px] rounded-2xl bg-gradient-to-r ${gradientClasses} transition-all duration-300 ${
                        isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.01] cursor-pointer shadow-lg hover:shadow-2xl'
                      }`}
                    >
                      <div className="bg-[#1a0f0a]/90 backdrop-blur-xl rounded-[15px] p-4 md:p-5 flex flex-col justify-between h-full min-h-[110px] text-left select-none">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-[9px] uppercase font-bold tracking-[0.15em] ${labelColor}`}>
                              {badgeLabel}
                            </span>
                            {choice.requiredFaction && (
                              <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/60">
                                Wymagany Sojusz
                              </span>
                            )}
                          </div>

                          <span className="text-white text-sm md:text-base font-semibold tracking-tight block mt-1.5 leading-snug">
                            {choice.text}
                          </span>
                        </div>

                        {/* Scores preview */}
                        {!isLocked && (choice.impactFreedom !== 0 || choice.impactOrder !== 0) && (
                          <div className="flex gap-4 text-[9px] font-mono text-white/50 pt-2 border-t border-white/5 mt-2.5">
                            {choice.impactFreedom !== 0 && (
                              <span className={choice.impactFreedom > 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                                🌈 {choice.impactFreedom > 0 ? `+${choice.impactFreedom}` : choice.impactFreedom} Wolność
                              </span>
                            )}
                            {choice.impactOrder !== 0 && (
                              <span className={choice.impactOrder > 0 ? 'text-sky-300 font-bold' : 'text-slate-400'}>
                                ⚙️ {choice.impactOrder > 0 ? `+${choice.impactOrder}` : choice.impactOrder} Uporządkowanie
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
