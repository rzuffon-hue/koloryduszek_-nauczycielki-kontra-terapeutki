/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, BookOpen, Trophy, LogOut, Coins, Gem, Sparkles } from 'lucide-react';
import { GameState, Faction, PlayerProfile } from './types';
import { CHARACTERS } from './data/characters';
import MainMenu from './components/MainMenu';
import StoryScreen from './components/StoryScreen';
import LoginScreen from './components/LoginScreen';
import ArenaMode from './components/ArenaMode';
import DiamondAttack from './components/DiamondAttack';
import { sound } from './components/SoundManager';

const PROFILES_STORAGE_KEY = 'koloryduszek_profiles_v2';
const CURRENT_PROFILE_KEY = 'koloryduszek_current_profile_v2';

const DEFAULT_STORY_STATE: GameState = {
  currentChapterId: 1,
  currentSceneId: 'ch1_intro',
  freedomScore: 50,
  orderScore: 50,
  playerFactionChoice: 'NEUTRAL',
  inventory: [],
  completedMinigames: [],
  characterStatuses: {
    basia: 'unlocked',
    hania: 'unlocked',
    zosia: 'locked',
    calm: 'unlocked',
    whisper: 'unlocked',
    harmony: 'locked'
  }
};

// Robust profile migrator to gracefully heal old or missing fields on existing user profiles
export function migrateProfile(profile: any): PlayerProfile {
  const isSebastian = profile.username && profile.username.toLowerCase() === 'sebastian';
  const storySave = {
    ...DEFAULT_STORY_STATE,
    ...(profile.storySave || {})
  };

  // Dynamically calculate and add characters that are unlocked based on the story progress
  const chapterId = storySave.currentChapterId || 1;
  const storyUnlocked = Object.values(CHARACTERS)
    .filter(char => char.id !== 'system' && char.id !== 'player' && (char.requiredChapter ?? 1) <= chapterId)
    .map(char => char.id);

  const existingUnlocked = profile.unlockedTeachers ?? ['basia', 'hania'];
  const nextUnlocked = Array.from(new Set([...existingUnlocked, ...storyUnlocked]));

  return {
    username: profile.username || 'Gracz',
    pin: profile.pin || '1234',
    level: profile.level ?? 1,
    xp: profile.xp ?? 0,
    diamonds: profile.diamonds ?? 15,
    gold: profile.gold ?? 120,
    unlockedTeachers: nextUnlocked,
    defeatedTherapists: profile.defeatedTherapists ?? [],
    highestCompletedArenaLevel: profile.highestCompletedArenaLevel ?? 0,
    achievements: profile.achievements ?? ['Krok Pierwszy'],
    unlockedSkins: profile.unlockedSkins ?? ['classic', 'default'],
    storySave,
    teacherLevels: profile.teacherLevels ?? {
      basia: 1,
      hania: 1,
      zosia: 1,
      dyrektor: 1
    },
    stats: {
      completedMinigamesCount: profile.stats?.completedMinigamesCount ?? 0,
      arenasWon: profile.stats?.arenasWon ?? 0,
      totalDamageDealt: profile.stats?.totalDamageDealt ?? 0,
      diamondsMatched: profile.stats?.diamondsMatched ?? 0,
      trainingHighScore: profile.stats?.trainingHighScore ?? 0,
      ...(profile.stats || {})
    },
    isAdmin: profile.isAdmin || isSebastian
  };
}

const pageVariants = {
  initial: (direction: 'forward' | 'backward') => ({
    opacity: 0,
    x: direction === 'forward' ? 120 : -120,
    scale: 0.98,
    filter: 'blur(6px)',
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    }
  },
  exit: (direction: 'forward' | 'backward') => ({
    opacity: 0,
    x: direction === 'forward' ? -120 : 120,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

const VIEW_ORDER: Record<string, number> = {
  'LOGIN': 0,
  'SELECTION': 1,
  'MENU': 1,
  'STORY': 2,
  'ARENA': 2,
  'TRAINING': 2
};

export default function App() {
  const [activeProfile, setActiveProfile] = useState<PlayerProfile | null>(null);
  const [currentView, setCurrentView] = useState<'LOGIN' | 'SELECTION' | 'MENU' | 'STORY' | 'ARENA' | 'TRAINING'>('LOGIN');
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);

  const changeView = (nextView: 'LOGIN' | 'SELECTION' | 'MENU' | 'STORY' | 'ARENA' | 'TRAINING') => {
    const currentWeight = VIEW_ORDER[currentView] ?? 0;
    const nextWeight = VIEW_ORDER[nextView] ?? 0;

    if (nextWeight > currentWeight) {
      setSlideDirection('forward');
    } else if (nextWeight < currentWeight) {
      setSlideDirection('backward');
    } else {
      // If weights are equal (e.g. going from STORY to ARENA or menu to selection), default or handle
      setSlideDirection('forward');
    }
    setCurrentView(nextView);
  };

  // Load profile on start
  useEffect(() => {
    const savedProfile = localStorage.getItem(CURRENT_PROFILE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        const migrated = migrateProfile(parsed);
        setActiveProfile(migrated);
        changeView('MENU');
      } catch (e) {
        console.error('Failed to parse current profile', e);
        changeView('LOGIN');
      }
    } else {
      changeView('LOGIN');
    }
  }, []);

  // Save profile helper
  const updateProfileAndSave = (updated: PlayerProfile) => {
    const migrated = migrateProfile(updated);
    setActiveProfile(migrated);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(migrated));

    // Also update in profiles list
    const savedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (savedProfiles) {
      try {
        const list: PlayerProfile[] = JSON.parse(savedProfiles);
        const index = list.findIndex(p => p.username === migrated.username);
        if (index !== -1) {
          list[index] = migrated;
          localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(list));
        }
      } catch (e) {
        console.error('Failed to update profiles list', e);
      }
    }
  };

  const handleLoginSuccess = (profile: PlayerProfile) => {
    const migrated = migrateProfile(profile);
    setActiveProfile(migrated);
    localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify(migrated));
    changeView('MENU');
  };

  const handleLogout = () => {
    sound.playClick();
    setActiveProfile(null);
    localStorage.removeItem(CURRENT_PROFILE_KEY);
    changeView('LOGIN');
  };

  const handleStartNewGame = () => {
    sound.playClick();
    if (activeProfile && activeProfile.storySave && activeProfile.storySave.currentSceneId !== 'ch1_intro') {
      setShowNewGameConfirm(true);
    } else {
      executeNewGame();
    }
  };

  const executeNewGame = () => {
    if (!activeProfile) return;
    
    const updated: PlayerProfile = {
      ...activeProfile,
      storySave: DEFAULT_STORY_STATE
    };
    updateProfileAndSave(updated);
    changeView('STORY');
    setShowNewGameConfirm(false);
  };

  const handleContinueGame = () => {
    sound.playClick();
    if (activeProfile) {
      changeView('STORY');
    }
  };

  const handleUpdateStoryState = (updatedStory: Partial<GameState>) => {
    if (!activeProfile) return;

    const nextStory = { ...activeProfile.storySave, ...updatedStory };
    
    // Auto increment Level if story progresses beautifully
    let nextLvl = activeProfile.level;
    let nextGold = activeProfile.gold;
    let nextDiamonds = activeProfile.diamonds;

    // Award bonus gold on minigame completion
    if (updatedStory.completedMinigames && updatedStory.completedMinigames.length > activeProfile.storySave.completedMinigames.length) {
      nextGold += 50;
      nextDiamonds += 2;
    }

    const updatedProfile: PlayerProfile = {
      ...activeProfile,
      storySave: nextStory,
      gold: nextGold,
      diamonds: nextDiamonds
    };

    updateProfileAndSave(updatedProfile);
  };

  const handleExitToSelection = () => {
    sound.playClick();
    changeView('MENU');
  };

  const handleExitToMenu = () => {
    sound.playClick();
    changeView('MENU');
  };

  return (
    <div id="game-app-root" className="font-sans antialiased bg-[#0e0705] min-h-screen text-white select-none">
      <AnimatePresence mode="wait" custom={slideDirection}>
        
        {/* VIEW 1: LOGIN */}
        {currentView === 'LOGIN' && (
          <motion.div
            key="login-view"
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <LoginScreen onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {/* VIEW 3: STORY MENU */}
        {currentView === 'MENU' && activeProfile && (
          <motion.div
            key="menu-view"
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <MainMenu
              playerProfile={activeProfile}
              onStartNewGame={handleStartNewGame}
              onContinueGame={handleContinueGame}
              hasSavedGame={activeProfile.storySave.currentSceneId !== 'ch1_intro'}
              gameState={activeProfile.storySave}
              onBack={handleLogout}
              onEnterArena={() => changeView('ARENA')}
              onEnterTraining={() => changeView('TRAINING')}
              onUpdateProfile={updateProfileAndSave}
            />
          </motion.div>
        )}

        {/* VIEW 4: STORY PLAYING */}
        {currentView === 'STORY' && activeProfile && (
          <motion.div
            key="story-playing-view"
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <StoryScreen
              gameState={activeProfile.storySave}
              onUpdateState={handleUpdateStoryState}
              onExitToMenu={handleExitToMenu}
              playerProfile={activeProfile}
            />
          </motion.div>
        )}

        {/* VIEW 5: ARENA MODE MAP */}
        {currentView === 'ARENA' && activeProfile && (
          <motion.div
            key="arena-view"
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <ArenaMode
              playerProfile={activeProfile}
              onUpdateProfile={updateProfileAndSave}
              onExit={handleExitToSelection}
            />
          </motion.div>
        )}

        {/* VIEW 6: TRAINING MODE */}
        {currentView === 'TRAINING' && activeProfile && (
          <motion.div
            key="training-view"
            custom={slideDirection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            <DiamondAttack
              key="training-battle-fight"
              playerProfile={activeProfile}
              opponentId="lysy_kierownik"
              opponentLevel={1}
              onClose={(rewards) => {
                sound.playClick();
                if (rewards && rewards.trainingScore !== undefined) {
                  const currentHighScore = activeProfile.stats.trainingHighScore || 0;
                  if (rewards.trainingScore > currentHighScore) {
                    const updated = {
                      ...activeProfile,
                      stats: {
                        ...activeProfile.stats,
                        trainingHighScore: rewards.trainingScore
                      }
                    };
                    updateProfileAndSave(updated);
                  }
                }
                changeView('MENU');
              }}
              isTraining={true}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Custom Confirmation Modal for resetting story */}
      <AnimatePresence>
        {showNewGameConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#1a0f0a] border border-[#ff9068]/50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center text-rose-500 animate-bounce">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black tracking-tight text-white uppercase">
                  Rozpocząć nową historię?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Masz już zapisany stan fabularny. Rozpoczęcie nowej przygody bezpowrotnie <strong className="text-amber-400 font-extrabold">wymaże postęp fabuły</strong>. Poziom i zasoby konta pozostaną bez zmian.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setShowNewGameConfirm(false);
                  }}
                  className="flex-1 py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold text-sm tracking-wide transition active:scale-98"
                >
                  Anuluj, zachowaj zapis
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    executeNewGame();
                  }}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-sm tracking-widest uppercase shadow-lg transition active:scale-98"
                >
                  Rozpocznij od nowa
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
