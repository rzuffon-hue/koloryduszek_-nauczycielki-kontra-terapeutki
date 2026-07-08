/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Users, Info, Settings, Sparkles, Volume2, VolumeX, ShieldQuestion, Star, Compass, Coins, Gem, LogOut, Wrench, Layers, Lock, Download, Smartphone } from 'lucide-react';
import { sound } from './SoundManager';
import { CHARACTERS } from '../data/characters';
import { CHAPTERS } from '../data/chapters';
import { GameState, PlayerProfile } from '../types';

interface MainMenuProps {
  playerProfile: PlayerProfile;
  onStartNewGame: () => void;
  onContinueGame: () => void;
  hasSavedGame: boolean;
  gameState: GameState;
  onBack?: () => void;
  onEnterArena?: () => void;
  onEnterTraining?: () => void;
  onUpdateProfile?: (profile: PlayerProfile) => void;
}

export default function MainMenu({ 
  playerProfile, 
  onStartNewGame, 
  onContinueGame, 
  hasSavedGame, 
  gameState, 
  onBack, 
  onEnterArena,
  onEnterTraining,
  onUpdateProfile
}: MainMenuProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'characters' | 'about' | 'admin'>('main');
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [selectedChar, setSelectedChar] = useState<string | null>(null);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] beforeinstallprompt event caught!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      console.log('[PWA] App installed!');
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    sound.playClick();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Install choice outcome: ${outcome}`);
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Admin Tester state
  const [selectedAdminChapter, setSelectedAdminChapter] = useState<number>(1);
  const [adminFreedomScore, setAdminFreedomScore] = useState<number>(50);
  const [adminOrderScore, setAdminOrderScore] = useState<number>(50);

  useEffect(() => {
    sound.playMusic('happy');
    return () => {
      // Keep playing or stop depending on state
    };
  }, []);

  const handleTabChange = (tab: 'main' | 'characters' | 'about' | 'admin') => {
    sound.playClick();
    setActiveTab(tab);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleCharClick = (id: string) => {
    sound.playClick();
    setSelectedChar(id === selectedChar ? null : id);
  };

  return (
    <div
      id="main-menu-viewport"
      className="min-h-screen bg-[#1a0f0a] text-white flex flex-col justify-between relative overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url('/src/assets/images/game_cover_1783451874065.jpg')` }}
    >
      {/* Background Dimming and Golden Overlays for Cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/70 to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffedcc] via-[#f7d08a] to-[#d9a066] opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `radial-gradient(circle at 75% 25%, rgba(255,255,255,0.2) 0%, transparent 65%)` }} />
      <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-[#ff9068] rounded-full blur-[140px] opacity-15 pointer-events-none z-0" />

      {/* Top HUD with audio control & player profile details */}
      <div className="z-10 p-3 md:p-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-white/5 backdrop-blur-md bg-black/30">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-spin text-amber-400 duration-1000">🌈</span>
            <span className="text-xs font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#ffdfa0] to-cyan-300 font-mono">
              TĘCZOWY ZAKĄTEK
            </span>
          </div>
          
          <button
            onClick={toggleMute}
            id="toggle-menu-audio-btn"
            className="sm:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-slate-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>

        {/* Profile info block */}
        <div className="flex items-center gap-4 ml-auto w-full sm:w-auto justify-end">
          {/* Gold / Diamonds */}
          <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5 text-[11px] font-mono">
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="font-bold text-white">{playerProfile.gold}</span>
            </div>
            <div className="flex items-center gap-1 border-l border-white/10 pl-3">
              <Gem className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-white">{playerProfile.diamonds}</span>
            </div>
          </div>

          {/* Username & Level */}
          <div className="text-right hidden xs:block">
            <p className="text-xs font-black text-white leading-none">{playerProfile.username}</p>
            <p className="text-[9px] uppercase font-mono tracking-widest text-amber-300 mt-1">Poziom {playerProfile.level}</p>
          </div>

          <button
            onClick={toggleMute}
            id="toggle-menu-audio-btn-desktop"
            className="hidden sm:block p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition text-slate-300 shadow-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'main' && (
            <motion.div
              key="main-menu"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center space-y-8 w-full max-w-md"
            >
              {/* Title Logo with glow */}
              <div className="space-y-2 relative">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-[#ff9068]/20 rounded-full filter blur-3xl animate-pulse" />
                <span className="text-[10px] tracking-[0.6em] font-medium uppercase text-white/50 block mb-1">
                  Google AI Studio Presents
                </span>
                <h1 className="text-5xl md:text-6xl font-black italic tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                  KOLORY<span className="text-yellow-400">DUSZEK</span>
                </h1>
                <h2 className="text-sm font-extrabold tracking-[0.25em] text-cyan-300 uppercase font-mono mt-2">
                  Nauczycielki vs Terapeutki
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(252,211,77,0.5)]" />
                {isInstalled && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase mt-3 animate-pulse">
                    <Smartphone className="w-3.5 h-3.5" /> Aplikacja PWA aktywna
                  </div>
                )}
              </div>

              {/* Stats HUD if continued */}
              {hasSavedGame && (
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex justify-center gap-6 text-xs shadow-2xl">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-white/40">Rozdział</span>
                    <span className="font-extrabold text-amber-300 text-sm">#0{gameState.currentChapterId}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 border-l border-white/10 pl-6">
                    <span className="text-[9px] uppercase tracking-wider text-white/40">Wolność</span>
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300 text-sm">🌈 {gameState.freedomScore}%</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 border-l border-white/10 pl-6">
                    <span className="text-[9px] uppercase tracking-wider text-white/40">Ład Sensoryczny</span>
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm">🔷 {gameState.orderScore}%</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {hasSavedGame && (
                  <button
                    onClick={onContinueGame}
                    id="continue-game-btn"
                    className="w-full bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-xl hover:brightness-110 transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2 text-lg tracking-wider"
                  >
                    <Play className="w-5 h-5 fill-slate-950" /> KONTYNUUJ GRĘ
                  </button>
                )}

                <button
                  onClick={onStartNewGame}
                  id="new-game-btn"
                  className={`w-full font-black py-4 px-6 rounded-2xl shadow-xl transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2 text-lg tracking-wider ${
                    hasSavedGame
                      ? 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white'
                      : 'bg-gradient-to-r from-cyan-500 via-amber-400 to-orange-500 text-slate-950'
                  }`}
                >
                  <RotateCcw className="w-5 h-5" /> NOWA PRZYGODA
                </button>

                {onEnterArena && (
                  <button
                    onClick={onEnterArena}
                    id="arena-entry-btn"
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:brightness-110 hover:shadow-[0_4px_30px_rgba(6,182,212,0.6)] transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2.5 text-base tracking-wider uppercase border-b-4 border-cyan-700"
                  >
                    💎 DIAMENTOWA ARENA MATCH-3
                  </button>
                )}

                {onEnterTraining && (
                  <button
                    onClick={onEnterTraining}
                    id="training-entry-btn"
                    className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:brightness-110 hover:shadow-[0_4px_30px_rgba(168,85,247,0.5)] transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2.5 text-base tracking-wider uppercase border-b-4 border-purple-700"
                  >
                    🏋️ TRENING BEZSTRESOWY MATCH-3
                  </button>
                )}

                {playerProfile.isAdmin && (
                  <button
                    onClick={() => handleTabChange('admin')}
                    id="admin-panel-btn"
                    className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-[#ff9068] text-slate-950 font-black py-4 px-6 rounded-2xl shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:brightness-110 transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2.5 text-base tracking-widest uppercase border-b-4 border-amber-700"
                  >
                    <Wrench className="w-5 h-5 animate-pulse" /> PANEL TESTERA SEBASTIANA
                  </button>
                )}

                {deferredPrompt && (
                  <button
                    onClick={handleInstallApp}
                    id="pwa-install-btn"
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:brightness-110 transform hover:scale-[1.01] active:scale-99 transition flex items-center justify-center gap-2.5 text-base tracking-wider uppercase border-b-4 border-emerald-700"
                  >
                    <Download className="w-5 h-5" /> ZAINSTALUJ JAKO APLIKACJĘ (PWA)
                  </button>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleTabChange('characters')}
                    id="characters-tab-btn"
                    className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-black/60 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow"
                  >
                    <Users className="w-4 h-4 text-cyan-400" /> KARTOTEKI
                  </button>

                  <button
                    onClick={() => handleTabChange('about')}
                    id="about-tab-btn"
                    className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-black/60 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow"
                  >
                    <Info className="w-4 h-4 text-amber-400" /> O PROJEKCIE
                  </button>
                </div>

                {onBack && (
                  <button
                    onClick={onBack}
                    className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 hover:border-red-500/30 text-rose-400 font-extrabold py-3 px-6 rounded-2xl text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Wyloguj się z profilu
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'characters' && (
            <motion.div
              key="characters-menu"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full bg-[#1a0f0a]/95 backdrop-blur-2xl border border-white/25 rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffdfa0] to-cyan-300">
                  📁 Poufne Akta Osobowe
                </h3>
                <button
                  onClick={() => handleTabChange('main')}
                  className="text-xs text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/10 transition"
                >
                  Powrót
                </button>
              </div>

              {/* Grid of Characters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-y-auto max-h-[280px] pr-1">
                {Object.values(CHARACTERS)
                  .filter((c) => c.id !== 'system' && c.id !== 'player')
                  .map((char) => {
                    const isNauczycielka = char.faction === 'NAUCZYCIELKI';
                    const isUnlocked = playerProfile.unlockedTeachers.includes(char.id);
                    return (
                      <button
                        key={char.id}
                        onClick={() => {
                          sound.playClick();
                          setSelectedChar(char.id);
                        }}
                        className={`p-3 rounded-xl border text-left transition transform hover:scale-[1.02] flex flex-col justify-between ${
                          selectedChar === char.id
                            ? isUnlocked
                              ? isNauczycielka
                                ? 'bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                                : 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                              : 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                            : isUnlocked
                              ? 'bg-black/40 border-white/10 hover:border-white/20 text-slate-300'
                              : 'bg-black/10 border-white/5 border-dashed hover:border-white/15 text-slate-500 opacity-70'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] opacity-80 font-mono uppercase font-bold tracking-wider">
                              {isUnlocked
                                ? isNauczycielka ? '🌼 Nauczycielka' : '🔷 Terapeutka'
                                : '🔒 Zablokowane'}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm mt-1 text-white flex items-center gap-1.5">
                            {!isUnlocked && <Lock className="w-3 h-3 text-rose-500 shrink-0" />}
                            {isUnlocked ? char.name : 'Tajne Akta'}
                          </h4>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2 font-semibold">
                          {isUnlocked ? char.role : `Śledztwo: Rozdział ${char.requiredChapter}`}
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* Expanded details container */}
              <AnimatePresence mode="wait">
                {selectedChar ? (() => {
                  const charData = CHARACTERS[selectedChar];
                  const isUnlocked = playerProfile.unlockedTeachers.includes(selectedChar);

                  if (!isUnlocked) {
                    return (
                      <motion.div
                        key={`locked-${selectedChar}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-rose-950/20 border border-rose-500/30 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-5 text-center md:text-left relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bg-rose-500/5 w-48 h-48 rounded-full blur-3xl -z-10" />
                        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 animate-pulse">
                          <Lock className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest font-mono flex items-center justify-center md:justify-start gap-1.5">
                            <span>⚠️ DOSTĘP ZABRONIONY • SZYFROWANE AKTA</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-medium">
                            Profil psychologiczny, historia oraz unikalne zdolności tej postaci są tymczasowo zablokowane. 
                            Poznaj tę postać bezpośrednio w trakcie przechodzenia wątku głównego.
                          </p>
                          <div className="text-xs text-amber-200/80 font-mono pt-1">
                            💡 Wymagany postęp: <span className="font-bold text-amber-400">Rozdział {charData.requiredChapter}</span> (lub wyższy).
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={selectedChar}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-black/50 p-4 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative bg-black shrink-0 shadow-lg">
                        <img
                          src={charData.portraitUrl}
                          alt={charData.name}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black" style={{ color: charData.accentColor }}>
                            {charData.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-full border border-white/5 text-slate-300 font-bold">
                            {charData.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {charData.description}
                        </p>
                        <div className="border-t border-white/10 pt-2 text-[11px] text-slate-400 leading-relaxed">
                          <span className="font-black uppercase font-mono tracking-wider text-[10px] text-slate-500">
                            Profil ideowy:
                          </span>{' '}
                          {charData.history}
                        </div>
                        <div className="flex gap-2 pt-1.5 flex-wrap">
                          {charData.abilities.map((ab) => (
                            <span key={ab} className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 border border-white/5 text-amber-300">
                              ✨ {ab}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })() : (
                  <div className="text-center text-xs text-slate-400 italic py-5 bg-black/30 rounded-2xl border border-dashed border-white/10">
                    Wybierz dowolną postać z kartoteki, aby zbadać jej unikalny rys psychologiczny i profil.
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about-menu"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="w-full bg-[#1a0f0a]/95 backdrop-blur-2xl border border-white/25 rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-300 uppercase tracking-wider font-mono">
                  📖 Kroniki Tęczowego Zakątka
                </h3>
                <button
                  onClick={() => handleTabChange('main')}
                  className="text-xs text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/10 transition"
                >
                  Powrót
                </button>
              </div>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed max-h-[300px] overflow-y-auto pr-2 font-sans font-medium">
                <div className="border-l-2 border-[#ff9068]/50 pl-3 italic text-xs text-slate-400">
                  Pod kolorowym i niezwykle przyjaznym przedszkolem <strong className="text-white font-semibold">„Tęczowy Zakątek”</strong> kryje się głęboko skrywana tajemnica, która na zawsze może odmienić losy dziecięcej radości...
                </div>

                <p className="text-xs">
                  Większość pracowników głęboko wierzy, że dzieci powinny dorastać poprzez swobodną zabawę, wyobraźnię, głośny śmiech, eksperymentowanie oraz popełnianie błędów. Jednak w ukryciu działa druga, doskonale zorganizowana frakcja.
                </p>

                <div className="space-y-3">
                  {/* Faction: Terapeutki */}
                  <div className="bg-cyan-950/25 p-4 rounded-2xl border border-cyan-500/20 space-y-2">
                    <h4 className="font-extrabold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                      🔷 TAJNY ZAKON TERAPEUTEK (Główne Antagonistki)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      W świecie gry terapeutki stanowią całkowicie fikcyjną, zakonną strukturę będącą głównymi przeciwnikami fabularnymi. Nie reprezentują prawdziwego zawodu ani rzeczywistych metod pracy z dziećmi.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      Działają zawsze zza kulis, unikając otwartej walki. Uciekają się do manipulacji, knucia intryg i zastawiania sprytnych pułapek, by stopniowo przejmować wpływy wśród personelu oraz rodziców. Na zewnątrz są zawsze uderzająco uprzejme, spokojne i uśmiechnięte, lecz za zamkniętymi drzwiami knują kolejne kroki. Ich ostatecznym celem jest przejęcie absolutnej władzy nad przedszkolem i usunięcie każdego, kto stoi na drodze ich sterylnego ładu.
                    </p>
                    <div className="text-[10px] bg-black/35 p-2.5 rounded-xl text-cyan-200 border border-cyan-500/10 space-y-1">
                      <span className="font-bold uppercase tracking-widest text-[9px] text-cyan-400 block">Co odkrywasz w trakcie gry:</span>
                      <ul className="list-disc list-inside space-y-0.5 opacity-90">
                        <li>Tajne, nocne narady przy zgaszonych światłach</li>
                        <li>Sfabrykowane dokumenty, fałszywe dowody i spiski</li>
                        <li>Podsłuchane rozmowy oraz sabotaże wymierzone w nauczycielki</li>
                        <li>Próby manipulowania rodzicami i skłócania personelu</li>
                        <li>Próby aneksji kolejnych sal pod sterylny rygor</li>
                        <li>Ukryte przejścia prowadzące bezpośrednio do podziemnej siedziby Zakonu</li>
                      </ul>
                    </div>
                  </div>

                  {/* Faction: Nauczycielki */}
                  <div className="bg-amber-950/25 p-4 rounded-2xl border border-amber-500/20 space-y-2">
                    <h4 className="font-extrabold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-xs">
                      🌼 NAUCZYCIELKI (Ostatnia Linia Obrony)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Nauczycielki stanowią serce i duszę przedszkola. Nie walczą ze złem za pomocą agresji – ich siłą są odwaga, lojalność, nieskrępowana kreatywność, poczucie humoru oraz bezgraniczna wiara w dziecięcą spontaniczność.
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Z pomocą nowej asystentki (Gracza) nauczycielki stopniowo odkrywają kolejne elementy misternej intrygi, próbując powstrzymać autorytarny zakon przed zmonopolizowaniem placówki i wygaszeniem dziecięcych uśmiechów.
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10 italic leading-relaxed">
                  * Wyjaśnienie: Gra ma charakter satyryczno-fabularny i fikcyjny. Przedstawiony konflikt jest radosną karykaturą literacką stworzoną wyłącznie na potrzeby emocjonującej i unikalnej rozgrywki.
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'admin' && (
            <motion.div
              key="admin-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-[#1e100a]/95 backdrop-blur-2xl border-2 border-amber-500/50 rounded-3xl p-6 shadow-[0_10px_40px_rgba(245,158,11,0.3)] space-y-6 max-w-4xl"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛠️</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#ff9068] uppercase tracking-wider font-mono">
                      Panel Autoryzacyjny Sebastiana
                    </h3>
                    <p className="text-[10px] text-amber-200/60 font-mono">
                      Uprawnienia Deweloperskie / Tester Rozdziałów
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleTabChange('main')}
                  className="text-xs text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl border border-white/10 transition"
                >
                  Powrót do Menu
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* CHAPTERS GRID - 7 cols on lg */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    Wybierz Rozdział do Załadowania
                  </h4>
                  
                  <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1.5 scrollbar-thin scrollbar-thumb-white/10">
                    {CHAPTERS.map((ch) => {
                      const isSelected = selectedAdminChapter === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => {
                            sound.playClick();
                            setSelectedAdminChapter(ch.id);
                          }}
                          className={`w-full text-left p-3.5 rounded-2xl border transition duration-150 relative overflow-hidden flex flex-col gap-1 ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                              : 'bg-black/30 border-white/5 hover:border-white/25 hover:bg-black/50'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-bl-xl text-[9px] uppercase tracking-wider font-mono">
                              Wybrany
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                              isSelected ? 'bg-amber-500 text-slate-950' : 'bg-white/10 text-slate-300'
                            }`}>
                              {ch.id}
                            </span>
                            <span className="font-extrabold text-sm text-white">
                              {ch.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 pl-8">
                            {ch.summary}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TESTER CONTROLS - 5 cols on lg */}
                <div className="lg:col-span-5 bg-black/45 border border-white/10 rounded-2xl p-4 md:p-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                        Konfiguracja Stanu Gry
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Możesz ręcznie ustawić wartości wpływu moralnego przed rozpoczęciem rozdziału.
                      </p>
                    </div>

                    {/* Freedom Score Slider */}
                    <div className="space-y-2 bg-red-950/20 border border-red-500/10 p-3 rounded-xl">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-red-300 flex items-center gap-1">
                          🌈 Dziecięca Wolność:
                        </span>
                        <span className="font-mono font-bold text-red-400">{adminFreedomScore}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={adminFreedomScore}
                        onChange={(e) => setAdminFreedomScore(parseInt(e.target.value))}
                        className="w-full accent-red-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Order Score Slider */}
                    <div className="space-y-2 bg-cyan-950/20 border border-cyan-500/10 p-3 rounded-xl">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-cyan-300 flex items-center gap-1">
                          🔷 Ład Sensoryczny:
                        </span>
                        <span className="font-mono font-bold text-cyan-400">{adminOrderScore}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={adminOrderScore}
                        onChange={(e) => setAdminOrderScore(parseInt(e.target.value))}
                        className="w-full accent-cyan-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Preset buttons */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                        Szybkie Presety Balansu:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => {
                            sound.playClick();
                            setAdminFreedomScore(50);
                            setAdminOrderScore(50);
                          }}
                          className="py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-[10px] font-bold tracking-tight transition"
                        >
                          ⚖️ Idealny 50/50
                        </button>
                        <button
                          onClick={() => {
                            sound.playClick();
                            setAdminFreedomScore(90);
                            setAdminOrderScore(10);
                          }}
                          className="py-1.5 rounded-lg border border-red-500/10 bg-red-500/10 hover:bg-red-500/20 text-[10px] font-bold tracking-tight text-red-300 transition"
                        >
                          🌈 Wolność 90
                        </button>
                        <button
                          onClick={() => {
                            sound.playClick();
                            setAdminFreedomScore(10);
                            setAdminOrderScore(90);
                          }}
                          className="py-1.5 rounded-lg border border-cyan-500/10 bg-cyan-500/10 hover:bg-cyan-500/20 text-[10px] font-bold tracking-tight text-cyan-300 transition"
                        >
                          🔷 Ład 90
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ultimate Test Activation Button */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        const selectedCh = CHAPTERS.find(c => c.id === selectedAdminChapter);
                        if (!selectedCh) return;

                        // Create clean test state for the chosen chapter
                        const testStorySave: GameState = {
                          currentChapterId: selectedCh.id,
                          currentSceneId: selectedCh.startSceneId,
                          freedomScore: adminFreedomScore,
                          orderScore: adminOrderScore,
                          playerFactionChoice: 'NEUTRAL',
                          inventory: ['paper_sword', 'cookie', 'magic_key'], // Give test items
                          completedMinigames: [],
                          characterStatuses: {
                            basia: 'unlocked',
                            hania: 'unlocked',
                            zosia: 'unlocked',
                            calm: 'unlocked',
                            whisper: 'unlocked',
                            harmony: 'unlocked'
                          }
                        };

                        const updatedProfile: PlayerProfile = {
                          ...playerProfile,
                          storySave: testStorySave,
                          // Maximize test resources so testing is a breeze
                          gold: Math.max(playerProfile.gold, 5000),
                          diamonds: Math.max(playerProfile.diamonds, 500)
                        };

                        if (onUpdateProfile) {
                          onUpdateProfile(updatedProfile);
                        }

                        // Play launch sound effect
                        if (sound.playSuccess) {
                          sound.playSuccess();
                        } else {
                          sound.playClick();
                        }

                        // Directly launch the game
                        onContinueGame();
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 hover:brightness-110 text-slate-950 font-black py-4 px-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.25)] tracking-wider text-xs md:text-sm transition flex items-center justify-center gap-2"
                    >
                      🚀 AKTYWUJ I URUCHOM ROZDZIAŁ {selectedAdminChapter}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 leading-normal font-medium">
                      Przycisk zapisze ten stan testowy w wybranym profilu i natychmiast uruchomi tryb fabularny.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer credits with clean spacing */}
      <div className="z-10 p-4 text-center text-[10px] text-white/30 border-t border-white/10 bg-black/60 backdrop-blur-md font-mono select-none">
        <div>KOLORYDUSZEK © 2026 • Wyjątkowe grafiki wygenerowane przez Google AI Studio</div>
      </div>
    </div>
  );
}
