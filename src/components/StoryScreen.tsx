/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Volume2, VolumeX, Music, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from './SoundManager';
import { CHAPTERS } from '../data/chapters';
import { CHARACTERS } from '../data/characters';
import { Scene, Choice, Faction, GameState, PlayerProfile } from '../types';
import MinigameWrapper from './Minigames';
import WeatherEffects from './WeatherEffects';
import SceneTransition from './SceneTransition';
import AnimatedPortrait from './AnimatedPortrait';
import DiamondAttack from './DiamondAttack';
import PhoneModal from './PhoneModal';
import { Smartphone, BookOpen } from 'lucide-react';
import HomeIntermission from './HomeIntermission';
import PostFallJournalModal from './PostFallJournalModal';
import { OPTIONAL_SCENES } from '../data/optionalScenes';

interface StoryScreenProps {
  gameState: GameState;
  onUpdateState: (updated: Partial<GameState>) => void;
  onExitToMenu: () => void;
  playerProfile: PlayerProfile;
}

function getPhoneUnreadCount(gameState: GameState): number {
  let unreadCount = 0;
  
  // Anonim messages (Chapter 21+)
  if (gameState.currentChapterId >= 21) {
    const totalMsgs = 3;
    const readCountStr = localStorage.getItem('phone_read_chat_anonim');
    if (!readCountStr) {
      unreadCount++;
    } else {
      const readCount = parseInt(readCountStr, 10);
      if (totalMsgs > readCount) {
        unreadCount++;
      }
    }
  }

  // Call history list size depends on chapter
  let totalCalls = 2;
  if (gameState.currentChapterId >= 6) totalCalls++;
  if (gameState.currentChapterId >= 11) totalCalls++;
  if (gameState.currentChapterId >= 12) totalCalls++;
  if (gameState.currentChapterId >= 15) totalCalls++;
  if (gameState.currentChapterId >= 21) totalCalls += 3;

  const readCallsStr = localStorage.getItem('phone_read_calls_count');
  if (!readCallsStr) {
    unreadCount += (totalCalls > 0 ? 1 : 0);
  } else {
    const readCallsCount = parseInt(readCallsStr, 10);
    if (totalCalls > readCallsCount) {
      unreadCount++;
    }
  }

  return unreadCount;
}

export default function StoryScreen({ gameState, onUpdateState, onExitToMenu, playerProfile }: StoryScreenProps) {
  const chapter = CHAPTERS.find(c => c.id === gameState.currentChapterId);
  const scene: Scene | undefined = chapter?.scenes[gameState.currentSceneId];

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [activeMinigame, setActiveMinigame] = useState<'FORT' | 'PAINT' | 'BLOCKS' | 'MOVEMENT' | 'HIDDEN' | 'PUZZLE' | 'DIAMOND' | null>(null);
  const [typedText, setTypedText] = useState('');
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isMusicMuted, setIsMusicMuted] = useState(sound.getMusicMuted());
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [unreadPhoneNotifications, setUnreadPhoneNotifications] = useState(0);
  const [intermissionChapter, setIntermissionChapter] = useState<number | null>(null);
  const [pendingNextState, setPendingNextState] = useState<{ id: number; sceneId: string } | null>(null);

  // Free Roam States
  const [freeRoamActive, setFreeRoamActive] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState<string[]>([]);
  const [visitedOptionalScenes, setVisitedOptionalScenes] = useState<string[]>([]);
  const [currentOptionalSceneId, setCurrentOptionalSceneId] = useState<string | null>(null);
  const [optionalDialogueIndex, setOptionalDialogueIndex] = useState(0);
  const [optionalTypedText, setOptionalTypedText] = useState('');
  const [hasPromptedFreeRoam, setHasPromptedFreeRoam] = useState(false);

  // Synchronously reset dialogue when scene ID changes to prevent stale dialogue indices
  const [prevSceneId, setPrevSceneId] = useState(gameState.currentSceneId);
  if (gameState.currentSceneId !== prevSceneId) {
    setDialogueIndex(0);
    setTypedText('');
    setPrevSceneId(gameState.currentSceneId);
    setHasPromptedFreeRoam(false);
    setFreeRoamActive(false);
    setVisitedLocations([]);
    setVisitedOptionalScenes([]);
    setCurrentOptionalSceneId(null);
    setOptionalDialogueIndex(0);
    setOptionalTypedText('');
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

  // Update phone notification unread counts dynamically
  const updateUnreadCount = () => {
    setUnreadPhoneNotifications(getPhoneUnreadCount(gameState));
  };

  useEffect(() => {
    updateUnreadCount();
    window.addEventListener('storage', updateUnreadCount);
    return () => {
      window.removeEventListener('storage', updateUnreadCount);
    };
  }, [gameState.currentChapterId, gameState.decisions, isPhoneOpen]);

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

  const currentOptionalScene = currentOptionalSceneId 
    ? OPTIONAL_SCENES.find(s => s.id === currentOptionalSceneId) 
    : null;
  const currentOptionalDialogue = currentOptionalScene 
    ? currentOptionalScene.dialogue[optionalDialogueIndex] 
    : null;
  const showOptionalChoices = currentOptionalScene 
    ? optionalDialogueIndex === currentOptionalScene.dialogue.length - 1 
    : false;

  const optionalTypewriterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isOptionalTypewriterActiveRef = useRef(false);

  useEffect(() => {
    if (!currentOptionalDialogue) return;

    if (optionalTypewriterTimerRef.current) {
      clearInterval(optionalTypewriterTimerRef.current);
    }

    setOptionalTypedText('');
    isOptionalTypewriterActiveRef.current = true;
    let i = 0;
    const txt = currentOptionalDialogue.text;
    optionalTypewriterTimerRef.current = setInterval(() => {
      setOptionalTypedText(txt.slice(0, i + 1));
      i++;
      if (i >= txt.length) {
        if (optionalTypewriterTimerRef.current) {
          clearInterval(optionalTypewriterTimerRef.current);
          optionalTypewriterTimerRef.current = null;
        }
        isOptionalTypewriterActiveRef.current = false;
      }
    }, 15);

    return () => {
      if (optionalTypewriterTimerRef.current) {
        clearInterval(optionalTypewriterTimerRef.current);
        optionalTypewriterTimerRef.current = null;
      }
      isOptionalTypewriterActiveRef.current = false;
    };
  }, [currentOptionalDialogue]);

  const handleOptionalNextDialogue = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 200) {
      return;
    }
    lastClickTimeRef.current = now;

    const fullText = currentOptionalDialogue?.text || '';
    if (isOptionalTypewriterActiveRef.current) {
      sound.playClick();
      if (optionalTypewriterTimerRef.current) {
        clearInterval(optionalTypewriterTimerRef.current);
        optionalTypewriterTimerRef.current = null;
      }
      isOptionalTypewriterActiveRef.current = false;
      setOptionalTypedText(fullText);
      return;
    }

    if (currentOptionalScene && optionalDialogueIndex < currentOptionalScene.dialogue.length - 1) {
      sound.playSwipe();
      setOptionalDialogueIndex(prev => prev + 1);
    }
  };

  const handleLeaveOptionalScene = () => {
    if (!currentOptionalSceneId) return;
    sound.playClick();
    
    if (currentOptionalScene) {
      const loc = currentOptionalScene.location;
      if (!visitedLocations.includes(loc)) {
        setVisitedLocations(prev => [...prev, loc]);
      }
    }
    
    setVisitedOptionalScenes(prev => {
      if (!prev.includes(currentOptionalSceneId)) {
        return [...prev, currentOptionalSceneId];
      }
      return prev;
    });

    setCurrentOptionalSceneId(null);
    setOptionalDialogueIndex(0);
    setOptionalTypedText('');
  };

  const handleTriggerLocation = (location: 'kitchen' | 'teachers_lounge' | 'hallway' | 'locker_room' | 'secretariat' | 'gym' | 'playground') => {
    const scenesForLocation = OPTIONAL_SCENES.filter(s => s.location === location);
    let sceneToPlay = scenesForLocation.find(s => !visitedOptionalScenes.includes(s.id));
    
    if (!sceneToPlay) {
      sound.playClick();
      setShowNotification("🔍 Sprawdziłeś już wszystko w tym miejscu. Nie ma tu nic nowego do odkrycia!");
      const timer = setTimeout(() => setShowNotification(null), 4000);
      return;
    }

    if (sceneToPlay) {
      sound.playClick();
      setCurrentOptionalSceneId(sceneToPlay.id);
      setOptionalDialogueIndex(0);
      setOptionalTypedText('');
    }
  };

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

    // Record choices persistently
    const nextDecisions = [...(gameState.decisions || [])];
    if (!nextDecisions.includes(choice.id)) {
      nextDecisions.push(choice.id);
    }

    // Save choice consequence notification
    if (choice.consequenceText) {
      setShowNotification(choice.consequenceText);
      setTimeout(() => setShowNotification(null), 4000);
    }

    if (nextChapterId > gameState.currentChapterId) {
      setIntermissionChapter(gameState.currentChapterId);
      setPendingNextState({ id: nextChapterId, sceneId: nextScene });
      onUpdateState({
        freedomScore: newFreedom,
        orderScore: newOrder,
        playerFactionChoice: newFaction,
        inventory: nextInventory,
        decisions: nextDecisions
      });
    } else {
      onUpdateState({
        currentChapterId: nextChapterId,
        currentSceneId: nextScene,
        freedomScore: newFreedom,
        orderScore: newOrder,
        playerFactionChoice: newFaction,
        inventory: nextInventory,
        decisions: nextDecisions
      });
    }
  };

  const handleMinigameWin = (freedomBonus: number, orderBonus: number) => {
    setActiveMinigame(null);

    let newFreedom = Math.max(0, Math.min(100, gameState.freedomScore + freedomBonus));
    let newOrder = Math.max(0, Math.min(100, gameState.orderScore + orderBonus));

    const updatedCompleted = [...gameState.completedMinigames];
    if (scene.minigameType && !updatedCompleted.includes(scene.minigameType)) {
      updatedCompleted.push(scene.minigameType);
    }

    let nextScene = scene.nextSceneIdOnMinigameWin || scene.id;
    let nextChapterId = gameState.currentChapterId;

    const match = nextScene.match(/^ch([0-9]+)_/);
    if (match) {
      const sceneChapterNum = parseInt(match[1], 10);
      if (sceneChapterNum > gameState.currentChapterId) {
        nextChapterId = sceneChapterNum;
      }
    }

    if (nextChapterId > gameState.currentChapterId) {
      setIntermissionChapter(gameState.currentChapterId);
      setPendingNextState({ id: nextChapterId, sceneId: nextScene });
      onUpdateState({
        freedomScore: newFreedom,
        orderScore: newOrder,
        completedMinigames: updatedCompleted
      });
    } else {
      onUpdateState({
        freedomScore: newFreedom,
        orderScore: newOrder,
        completedMinigames: updatedCompleted,
        currentSceneId: nextScene
      });
    }
  };

  const handleMinigameLose = () => {
    setActiveMinigame(null);
    let newFreedom = Math.max(0, gameState.freedomScore - 5);
    let newOrder = Math.max(0, gameState.orderScore - 5);

    let nextScene = scene.nextSceneIdOnMinigameWin || scene.id;
    let nextChapterId = gameState.currentChapterId;

    const match = nextScene.match(/^ch([0-9]+)_/);
    if (match) {
      const sceneChapterNum = parseInt(match[1], 10);
      if (sceneChapterNum > gameState.currentChapterId) {
        nextChapterId = sceneChapterNum;
      }
    }

    if (nextChapterId > gameState.currentChapterId) {
      setIntermissionChapter(gameState.currentChapterId);
      setPendingNextState({ id: nextChapterId, sceneId: nextScene });
      onUpdateState({
        freedomScore: newFreedom,
        orderScore: newOrder
      });
    } else {
      onUpdateState({
        freedomScore: newFreedom,
        orderScore: newOrder,
        currentSceneId: nextScene
      });
    }
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const toggleMusic = () => {
    const muted = sound.toggleMusicMute();
    setIsMusicMuted(muted);
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

  const optionalSpeakerId = currentOptionalDialogue?.speakerId || 'system';
  const optionalSpeaker = CHARACTERS[optionalSpeakerId] || {
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

  const isTeaserScene = React.useMemo(() => {
    return (
      scene.id.toLowerCase().includes('teaser') ||
      scene.title.toLowerCase().includes('zapowiedź') ||
      scene.title.toLowerCase().includes('teaser')
    );
  }, [scene.id, scene.title]);

  const showChoices = dialogueIndex === scene.dialogue.length - 1;

  const isFreeRoamPromptNeeded = 
    gameState.currentChapterId >= 2 && 
    scene.id === chapter.startSceneId && 
    !hasPromptedFreeRoam && 
    !freeRoamActive && 
    showChoices;

  return (
    <div id="story-viewport" className="min-h-screen bg-[#1a0f0a] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 bg-[#1a0f0a]" style={{ backgroundImage: 'radial-gradient(circle at center, #1a0c06 0%, #0d0603 70%, #040201 100%)' }} />
      
      {/* Absolute fullscreen scene background with parallax entry */}
      <motion.div
        key={currentOptionalScene ? currentOptionalScene.id : scene.id}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] saturate-[1.2]"
        style={{ 
          backgroundImage: `url(${currentOptionalScene ? currentOptionalScene.backgroundUrl : scene.backgroundUrl}), radial-gradient(circle at center, #2e1206 0%, #140702 70%, #080301 100%)` 
        }}
      />

      {isTeaserScene && (
        <>
          {/* Top Cinema Bar with gold glowing accents and neon preview label */}
          <div className="absolute top-0 left-0 right-0 h-14 bg-black/95 border-b border-amber-500/30 z-30 flex items-center justify-center pointer-events-none shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 px-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-amber-400 font-mono text-[10px] font-black tracking-[0.4em] uppercase">
                🎬 EKSKLUZYWNA ZAPOWIEDŹ KOLEJNEGO ROZDZIAŁU 🎬
              </span>
            </div>
          </div>
          {/* Bottom Cinema Bar to frame the widescreen movie-like aspect ratio */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/95 border-t border-amber-500/30 z-30 pointer-events-none shadow-[0_-4px_30px_rgba(0,0,0,0.8)]" />
          
          {/* Vintage film grain / scanner vignette lines for high aesthetic polish */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/35 to-black/85 pointer-events-none z-20" style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] pointer-events-none opacity-20 z-20" />
        </>
      )}
      
      {/* Immersive overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffedcc] via-[#f7d08a] to-[#d9a066] opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)` }} />
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#ff9068] rounded-full blur-[120px] opacity-15 pointer-events-none z-0" />

      {/* Scene Weather & Mood Atmospheric Effects */}
      <WeatherEffects gameState={gameState} />

      {/* Cinematic Scene Page Turn Transition */}
      <SceneTransition sceneId={scene.id} />

      {/* Top Header Overlay */}
      <div className="z-20 bg-black/75 p-2.5 md:p-4 flex flex-row justify-between items-center gap-2 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onExitToMenu}
            id="back-to-menu-btn"
            className="p-1.5 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-white shadow-lg shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></div>
              <div className="text-[8px] md:text-[10px] uppercase font-mono tracking-[0.15em] text-[#ffdfa0] font-bold truncate max-w-[100px] sm:max-w-none">
                {chapter.title}
              </div>
            </div>
            <div className="text-xs md:text-sm font-extrabold font-sans tracking-tight text-white truncate max-w-[80px] sm:max-w-[200px] md:max-w-none">{scene.title}</div>
          </div>
        </div>

        {/* Live HUD Stats with Cinematic Faction Meters */}
        <div className="flex items-center gap-2 md:gap-6 min-w-0">
          {/* Freedom Meter */}
          <div className="flex items-center md:flex-col gap-1 md:gap-1 md:w-44 relative">
            <div className="flex justify-between items-center md:items-end w-full relative gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#ffdfa0] drop-shadow-md flex items-center gap-1">
                <span className="md:hidden">🌈</span>
                <span className="hidden md:inline">🌈 Dziecięca Wolność</span>
              </span>
              <span className="text-[10px] md:text-xs font-black italic text-white drop-shadow-md">{gameState.freedomScore}%</span>
              
              {/* Dynamic Score Pop-up Indicator */}
              <AnimatePresence>
                {freedomPop !== null && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: -16, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute right-0 top-[-20px] text-[8px] md:text-[10px] font-extrabold font-mono px-1.5 py-0.5 rounded-full z-30 ${
                      freedomPop > 0 ? 'text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'text-rose-400 bg-rose-950/90 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    }`}
                  >
                    {freedomPop > 0 ? `+${freedomPop}` : freedomPop}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-2 w-full bg-black/50 rounded-full border border-white/10 overflow-hidden shadow-inner relative hidden md:block">
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
          <div className="flex items-center md:flex-col gap-1 md:gap-1 md:w-44 relative">
            <div className="flex justify-between items-center md:items-end w-full relative gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 drop-shadow-md flex items-center gap-1">
                <span className="md:hidden">⚙️</span>
                <span className="hidden md:inline">⚙️ Terapeutyczne Uporządkowanie</span>
              </span>
              <span className="text-[10px] md:text-xs font-black italic text-white drop-shadow-md">{gameState.orderScore}%</span>
              
              {/* Dynamic Score Pop-up Indicator */}
              <AnimatePresence>
                {orderPop !== null && (
                  <motion.span
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: -16, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute right-0 top-[-20px] text-[8px] md:text-[10px] font-extrabold font-mono px-1.5 py-0.5 rounded-full z-30 ${
                      orderPop > 0 ? 'text-cyan-400 bg-cyan-950/90 border border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-slate-400 bg-slate-900/90 border border-slate-700/40 shadow-md'
                    }`}
                  >
                    {orderPop > 0 ? `+${orderPop}` : orderPop}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="h-2 w-full bg-black/50 rounded-full border border-white/10 overflow-hidden shadow-inner relative hidden md:block">
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

          <div className="flex items-center border-l border-white/10 pl-2 md:pl-4 shrink-0 gap-1.5 md:gap-3">
            {/* Pulsing Smartphone button unlocked starting from Chapter 1 */}
            {gameState.currentChapterId >= 1 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPhoneOpen(true);
                }}
                id="smartphone-hud-btn"
                className="relative p-1.5 md:p-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition duration-300 animate-pulse font-bold flex items-center gap-1 px-2.5 md:px-4 text-[10px] md:text-xs font-mono shrink-0"
              >
                <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">TELEFON</span>
                {/* Unread dot badge */}
                {unreadPhoneNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-[8px] text-white font-bold items-center justify-center">{unreadPhoneNotifications}</span>
                  </span>
                )}
              </button>
            )}

            {/* Pamiętnik Po Upadku button (unlocked chapter 41 or if acquired) */}
            {(gameState.currentChapterId >= 41 || gameState.inventory.includes('Pamiętnik Po Upadku')) && (
              <button
                onClick={() => {
                  sound.playClick();
                  setIsJournalOpen(true);
                }}
                id="post-fall-journal-hud-btn"
                className="relative p-1.5 md:p-2.5 rounded-full bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(217,119,6,0.4)] transition duration-300 font-bold flex items-center gap-1 px-2.5 md:px-4 text-[10px] md:text-xs font-serif shrink-0 animate-bounce"
              >
                <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                <span className="hidden sm:inline">PAMIĘTNIK</span>
              </button>
            )}

             <button
              onClick={toggleMusic}
              id="toggle-music-btn"
              className="p-1.5 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-white shadow-lg shrink-0"
              title={isMusicMuted ? "Włącz muzykę w tle" : "Wyłącz muzykę w tle"}
            >
              {isMusicMuted ? <Music className="w-3.5 h-3.5 md:w-5 md:h-5 text-rose-400 opacity-60" /> : <Music className="w-3.5 h-3.5 md:w-5 md:h-5 text-amber-400" />}
            </button>

            <button
              onClick={toggleMute}
              id="toggle-audio-btn"
              className="p-1.5 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-white shadow-lg shrink-0"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 md:w-5 md:h-5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-400" />}
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
      {!activeMinigame && (!freeRoamActive || currentOptionalSceneId !== null) && (
        <div className="flex-1 flex items-end justify-center px-4 md:px-12 pb-4 overflow-hidden z-10 select-none">
          <AnimatePresence mode="wait">
            {freeRoamActive && currentOptionalSceneId !== null ? (
              optionalSpeaker.portraitUrl && optionalSpeakerId !== 'system' && optionalSpeakerId !== 'player' && (
                <AnimatedPortrait
                  speaker={optionalSpeaker}
                  speakerId={optionalSpeakerId}
                  dialogueText={currentOptionalDialogue?.text || ''}
                />
              )
            ) : (
              speaker.portraitUrl && speakerId !== 'system' && speakerId !== 'player' && (
                <AnimatedPortrait
                  speaker={speaker}
                  speakerId={speakerId}
                  dialogueText={currentDialogue?.text || ''}
                />
              )
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Area - Dialogue Box & Choices */}
      {!activeMinigame && !freeRoamActive && (
        <div className="z-10 bg-gradient-to-t from-black via-black/85 to-transparent p-2 sm:p-3 md:p-5 space-y-2 md:space-y-3.5 max-w-4xl mx-auto w-full">
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
              className={`backdrop-blur-xl border rounded-xl md:rounded-3xl p-3 md:p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] relative cursor-pointer select-none flex flex-col justify-between min-h-[90px] md:min-h-[120px] max-w-4xl mx-auto w-full transition-all duration-300 ${
                isTeaserScene
                  ? 'bg-black/90 border-amber-500/40 shadow-[0_0_35px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/20'
                  : 'bg-black/50 border-white/20 hover:border-white/30 hover:bg-black/60'
              }`}
            >
              {/* Speaker Header with neon pulsing element */}
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: speaker.accentColor || '#f59e0b' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: speaker.accentColor || '#f59e0b' }}></span>
                </span>
                <span
                  className="font-black tracking-[0.2em] text-[10px] md:text-xs uppercase font-mono"
                  style={{ color: speaker.accentColor || '#ffffff' }}
                >
                  {speaker.name}
                </span>
                {speaker.role && (
                  <span className="text-[9px] md:text-[10px] text-white/50 tracking-wider uppercase font-mono pl-1.5 md:pl-2 border-l border-white/10">{speaker.role}</span>
                )}
              </div>

              {/* Typed text */}
              <p className="text-white/95 text-xs sm:text-sm md:text-lg leading-relaxed flex-1 mt-0.5 md:mt-1 mb-1 md:mb-2 font-medium italic drop-shadow-sm">
                "{typedText}"
              </p>

              {/* Tap to continue indicator */}
              <div className="flex justify-end items-center text-[8px] md:text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase pt-0.5 md:pt-1">
                Naciśnij dalej <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 animate-bounce" />
              </div>
            </div>
          ) : isFreeRoamPromptNeeded ? (
            /* Free Roam Prompt Panel */
            <div className="flex flex-col items-center bg-black/85 border border-[#ffdfa0]/40 rounded-3xl p-5 md:p-8 max-w-2xl mx-auto text-center space-y-6 shadow-2xl backdrop-blur-2xl">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-amber-400">✨</span>
                  <h3 className="text-sm font-black tracking-widest uppercase text-amber-300 font-mono">Czas Wolny (Część I)</h3>
                  <span className="text-amber-400">✨</span>
                </div>
                <h4 className="text-base md:text-xl font-extrabold text-white">Chwila oddechu w przedszkolu</h4>
                <p className="text-xs md:text-sm text-amber-100/80 leading-relaxed max-w-md mx-auto">
                  Masz chwilę wolnego czasu. Możesz rozejrzeć się po różnych zakątkach przedszkola, aby poznać sekrety pracowników, lub od razu wrócić do swoich codziennych obowiązków.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <button
                  onClick={() => {
                    sound.playChoice();
                    setFreeRoamActive(true);
                  }}
                  className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 text-left"
                >
                  <div className="bg-[#1a0f0a]/95 rounded-[11px] p-4 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-black text-amber-300">🔎 ZBADAJ OTOCZENIE</span>
                      <span className="text-white text-sm font-bold block mt-1">Rozejrzyj się po przedszkolu</span>
                    </div>
                    <span className="text-[10px] text-amber-200/50 mt-3 block font-mono">Odwiedź pokój nauczycielski, kuchnię i inne miejsca</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    sound.playChoice();
                    setHasPromptedFreeRoam(true);
                  }}
                  className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-slate-600 to-slate-400 hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="bg-slate-900/95 rounded-[11px] p-4 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-black text-slate-400">💼 PRACA</span>
                      <span className="text-white text-sm font-bold block mt-1 font-sans">Wróć do obowiązków</span>
                    </div>
                    <span className="text-[10px] text-slate-300/50 mt-3 block font-mono">Przejdź od razu do głównych wydarzeń dnia (Część II)</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Choice visual array styled with custom border gradient frames */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3" id="choice-selector">
              <AnimatePresence>
                {scene.minigameType ? (
                  // Custom narrative choices replacing minigames
                  <>
                    <motion.div
                      key="narrative-minigame-freedom"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleMinigameWin(scene.minigameType === 'DIAMOND' ? 30 : 15, scene.minigameType === 'DIAMOND' ? 10 : -5)}
                      className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-red-500 via-amber-400 to-yellow-500 hover:scale-[1.01] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="bg-[#1a0f0a]/95 backdrop-blur-xl rounded-[11px] p-2.5 md:p-4 flex flex-col justify-between h-full min-h-[75px] md:min-h-[100px] text-left select-none border border-amber-500/10">
                        <div>
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[8px] md:text-[9px] uppercase font-mono font-black tracking-[0.15em] text-amber-300">
                              🌈 {scene.minigameType === 'DIAMOND' ? 'STARCIE: ŚCIEŻKA SERCA' : 'WYZWANIE: ŚCIEŻKA WOLNOŚCI'}
                            </span>
                            <span className="text-[7px] md:text-[8px] bg-amber-500/10 text-amber-300 px-1 py-0.5 rounded font-mono font-bold">
                              Kreatywność
                            </span>
                          </div>
                          <span className="text-white text-xs md:text-base font-bold tracking-tight block mt-1 leading-snug">
                            {scene.minigameType === 'DIAMOND' 
                              ? 'Uwolnij pełną moc Koloryduszka i radosnego buntu, by przełamać opór terapeutek miłością i śmiechem!'
                              : 'Wykorzystaj nieskrępowaną dziecięcą energię, spontaniczność i radosną wyobraźnię, by rozwiązać ten problem!'}
                          </span>
                        </div>
                        <div className="flex gap-2 md:gap-4 text-[8px] md:text-[9px] font-mono text-white/50 pt-1 border-t border-white/5 mt-1.5 md:mt-2">
                          <span className="text-amber-400 font-extrabold">🌈 {scene.minigameType === 'DIAMOND' ? '+30 Wolność' : '+15 Wolność'}</span>
                          <span className="text-slate-400">{scene.minigameType === 'DIAMOND' ? '+10 Uporządkowanie' : '-5 Uporządkowanie'}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      key="narrative-minigame-order"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => handleMinigameWin(scene.minigameType === 'DIAMOND' ? 10 : -5, scene.minigameType === 'DIAMOND' ? 30 : 15)}
                      className="relative p-[1.5px] rounded-xl bg-gradient-to-r from-slate-500 via-sky-400 to-blue-600 hover:scale-[1.01] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="bg-[#1a0f0a]/95 backdrop-blur-xl rounded-[11px] p-2.5 md:p-4 flex flex-col justify-between h-full min-h-[75px] md:min-h-[100px] text-left select-none border border-sky-500/10">
                        <div>
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[8px] md:text-[9px] uppercase font-mono font-black tracking-[0.15em] text-sky-300">
                              ⚙️ {scene.minigameType === 'DIAMOND' ? 'STARCIE: ŚCIEŻKA METODYCZNA' : 'WYZWANIE: ŚCIEŻKA UPORZĄDKOWANIA'}
                            </span>
                            <span className="text-[7px] md:text-[8px] bg-sky-500/10 text-sky-300 px-1 py-0.5 rounded font-mono font-bold">
                              Rygor i Ład
                            </span>
                          </div>
                          <span className="text-white text-xs md:text-base font-bold tracking-tight block mt-1 leading-snug">
                            {scene.minigameType === 'DIAMOND'
                              ? 'Wprowadź niezachwiany ład, analizując błędy systemowe i harmonizując emocje za pomocą spokoju!'
                              : 'Rozwiąż to wyzwanie metodycznie, wprowadzając nienaganną strukturę, symetrię i wyciszenie sensoryczne.'}
                          </span>
                        </div>
                        <div className="flex gap-2 md:gap-4 text-[8px] md:text-[9px] font-mono text-white/50 pt-1 border-t border-white/5 mt-1.5 md:mt-2">
                          <span className="text-sky-300 font-extrabold">⚙️ {scene.minigameType === 'DIAMOND' ? '+30 Uporządkowanie' : '+15 Uporządkowanie'}</span>
                          <span className="text-slate-400">{scene.minigameType === 'DIAMOND' ? '+10 Wolność' : '-5 Wolność'}</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  // Regular choices
                  scene.choices.map((choice) => {
                    const isLocked = choice.requiredFaction && gameState.playerFactionChoice !== choice.requiredFaction;
                    
                    // Dynamic borders matching path selection
                    let gradientClasses = 'from-amber-600 via-yellow-500 to-orange-500';
                    let labelColor = 'text-amber-400';
                    let badgeLabel = 'WYBÓR FABULARNY';

                    if (isTeaserScene) {
                       gradientClasses = 'from-red-600 via-rose-500 to-amber-500 animate-pulse';
                       labelColor = 'text-amber-400 font-black';
                       badgeLabel = '🎬 ZAPOWIEDŹ: ODBLOKUJ ROZDZIAŁ';
                    } else if (choice.requiredFaction === 'NAUCZYCIELKI' || choice.impactFreedom > 0) {
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
                        className={`relative p-[1.5px] rounded-xl bg-gradient-to-r ${gradientClasses} transition-all duration-300 ${
                          isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.01] cursor-pointer shadow-lg hover:shadow-2xl'
                        }`}
                      >
                        <div className="bg-[#1a0f0a]/90 backdrop-blur-xl rounded-[11px] p-2.5 md:p-4 flex flex-col justify-between h-full min-h-[70px] md:min-h-[95px] text-left select-none">
                          <div>
                            <div className="flex justify-between items-center mb-0.5">
                              <span className={`text-[8px] md:text-[9px] uppercase font-bold tracking-[0.15em] ${labelColor}`}>
                                {badgeLabel}
                              </span>
                              {choice.requiredFaction && (
                                <span className="text-[7px] md:text-[8px] bg-white/10 px-1 py-0.5 rounded font-mono text-white/60">
                                  Wymagany Sojusz
                                </span>
                              )}
                            </div>

                            <span className="text-white text-xs md:text-sm font-semibold tracking-tight block mt-0.5 md:mt-1 leading-snug">
                              {choice.text}
                            </span>
                          </div>

                          {/* Scores preview */}
                          {!isLocked && (choice.impactFreedom !== 0 || choice.impactOrder !== 0) && (
                            <div className="flex gap-2 md:gap-4 text-[8px] md:text-[9px] font-mono text-white/50 pt-1 border-t border-white/5 mt-1 md:mt-2">
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
                  })
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Bottom Area - Free Roam Dialogue Box & Optional Scenes */}
      {!activeMinigame && freeRoamActive && currentOptionalSceneId !== null && currentOptionalDialogue && (
        <div className="z-10 bg-gradient-to-t from-black via-black/85 to-transparent p-2 sm:p-3 md:p-5 space-y-2 md:space-y-3.5 max-w-4xl mx-auto w-full">
          {/* Typewriter Dialogue box */}
          {!showOptionalChoices ? (
            <div
              onClick={handleOptionalNextDialogue}
              id="dialogue-box"
              className="backdrop-blur-xl border border-white/20 hover:border-white/30 bg-black/50 hover:bg-black/60 rounded-xl md:rounded-3xl p-3 md:p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] relative cursor-pointer select-none flex flex-col justify-between min-h-[90px] md:min-h-[120px] max-w-4xl mx-auto w-full transition-all duration-300"
            >
              {/* Speaker Header with neon pulsing element */}
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: optionalSpeaker.accentColor || '#f59e0b' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: optionalSpeaker.accentColor || '#f59e0b' }}></span>
                </span>
                <span
                  className="font-black tracking-[0.2em] text-[10px] md:text-xs uppercase font-mono"
                  style={{ color: optionalSpeaker.accentColor || '#ffffff' }}
                >
                  {optionalSpeaker.name}
                </span>
                {optionalSpeaker.role && (
                  <span className="text-[9px] md:text-[10px] text-white/50 tracking-wider uppercase font-mono pl-1.5 md:pl-2 border-l border-white/10">{optionalSpeaker.role}</span>
                )}
              </div>

              {/* Typed text */}
              <p className="text-white/95 text-xs sm:text-sm md:text-lg leading-relaxed flex-1 mt-0.5 md:mt-1 mb-1 md:mb-2 font-medium italic drop-shadow-sm font-sans">
                "{optionalTypedText}"
              </p>

              {/* Tap to continue indicator */}
              <div className="flex justify-end items-center text-[8px] md:text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase pt-0.5 md:pt-1">
                Naciśnij dalej <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 animate-bounce" />
              </div>
            </div>
          ) : (
            /* Choice visual array for leaving the scene */
            <div className="flex justify-center" id="optional-choice-selector">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLeaveOptionalScene}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-black text-xs font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)] transition duration-300 font-bold"
              >
                Opuść to miejsce ↩
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* Central Area - Free Roam Map Directory */}
      {!activeMinigame && freeRoamActive && currentOptionalSceneId === null && (
        <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full p-4 md:p-6 z-10 overflow-y-auto">
          {/* Map Title Header */}
          <div className="text-center space-y-2 mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-amber-300 font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">
              📍 EKSPLORACJA PRZEDSZKOLA
            </div>
            <h2 className="text-lg md:text-2xl font-black text-white tracking-tight">Czas Wolny: Część Swobodna</h2>
            <p className="text-xs text-white/60 max-w-md mx-auto">
              Wybierz miejsce, do którego chcesz zajrzeć. Znajdziesz tam unikalne sceny i plotki rozwijające tajemnicę tego przedszkola.
            </p>
          </div>

          {/* Grid of Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 flex-1 items-center justify-center my-auto">
            {[
              { id: 'teachers_lounge', label: 'Pokój Nauczycielski', desc: 'Chwile szczerości i niszczarka...', color: 'from-amber-600/40 to-yellow-600/30' },
              { id: 'kitchen', label: 'Kuchnia', desc: 'Słodki zapach i sensoryczna melisa...', color: 'from-rose-600/40 to-red-600/30' },
              { id: 'hallway', label: 'Korytarz', desc: 'Regulaminy i dziwne migotania...', color: 'from-blue-600/40 to-sky-600/30' },
              { id: 'locker_room', label: 'Szatnia', desc: 'Zagubione pluszaki i notatki...', color: 'from-emerald-600/40 to-green-600/30' },
              { id: 'secretariat', label: 'Sekretariat', desc: 'Szuflady i stłumione głosy...', color: 'from-purple-600/40 to-indigo-600/30' },
              { id: 'gym', label: 'Sala Gimnastyczna', desc: 'Kalibracje i sensoryczne piłki...', color: 'from-teal-600/40 to-cyan-600/30' },
              { id: 'playground', label: 'Plac Zabaw', desc: 'Popsute huśtawki i piaskownica...', color: 'from-orange-600/40 to-amber-700/30' },
            ].map((loc) => {
              const isVisited = visitedLocations.includes(loc.id);
              const scenesForLoc = OPTIONAL_SCENES.filter(s => s.location === loc.id);
              const isFullyCompleted = scenesForLoc.every(s => visitedOptionalScenes.includes(s.id));

              return (
                <motion.button
                  key={loc.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTriggerLocation(loc.id as any)}
                  className={`relative rounded-2xl p-4 border text-left flex flex-col justify-between h-28 transition-all duration-300 shadow-md ${
                    isFullyCompleted
                      ? 'bg-slate-950/40 border-slate-700/30 opacity-70 hover:opacity-100'
                      : isVisited
                        ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-black/55 border-white/10 hover:border-amber-500/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-white tracking-wide uppercase font-sans">
                        {loc.label}
                      </span>
                      {isFullyCompleted ? (
                        <span className="text-[8px] font-mono font-bold bg-slate-500/15 border border-slate-500/30 text-slate-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                          ✓ Ukończone
                        </span>
                      ) : isVisited ? (
                        <span className="text-[8px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                          ✓ Odwiedzone
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                          Nowość
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/50 leading-relaxed mt-1">
                      {loc.desc}
                    </p>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-amber-400/80 hover:text-amber-300">
                      {isFullyCompleted ? 'Zbadane ✓' : 'Wejdź →'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Finish Free Roam / Go to Part II */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                sound.playChoice();
                setFreeRoamActive(false);
                setHasPromptedFreeRoam(true);
              }}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black text-xs font-black tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)] transition duration-300 animate-pulse font-bold"
            >
              💼 WRÓĆ DO OBOWIĄZKÓW (PRZEJDŹ DO CZĘŚCI II)
            </button>
          </div>
        </div>
      )}

      {/* Smartphone Modal component */}
      <AnimatePresence>
        {isPhoneOpen && (
          <PhoneModal
            isOpen={isPhoneOpen}
            onClose={() => setIsPhoneOpen(false)}
            gameState={gameState}
            playerProfile={playerProfile}
          />
        )}
      </AnimatePresence>

      {/* Post-Fall Journal Modal component */}
      <AnimatePresence>
        {isJournalOpen && (
          <PostFallJournalModal
            isOpen={isJournalOpen}
            onClose={() => setIsJournalOpen(false)}
            gameState={gameState}
            playerProfile={playerProfile}
          />
        )}
      </AnimatePresence>

      {/* Home Intermission component */}
      <AnimatePresence>
        {intermissionChapter !== null && pendingNextState && (
          <HomeIntermission
            completedChapterId={intermissionChapter}
            onFinishIntermission={() => {
              onUpdateState({
                currentChapterId: pendingNextState.id,
                currentSceneId: pendingNextState.sceneId
              });
              setIntermissionChapter(null);
              setPendingNextState(null);
            }}
            freedomScore={gameState.freedomScore}
            orderScore={gameState.orderScore}
            playerName={playerProfile.username}
            gameState={gameState}
            playerProfile={playerProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
