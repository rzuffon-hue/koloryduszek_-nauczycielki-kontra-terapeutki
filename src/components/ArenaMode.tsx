/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Trophy, Shield, Sword, Heart, Star, ChevronRight, Lock, 
  ArrowLeft, Flame, Award, BookOpen, KeyRound, Hammer, ShoppingBag, Coins, Gem
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { sound } from './SoundManager';
import DiamondAttack from './DiamondAttack';

interface ArenaModeProps {
  playerProfile: PlayerProfile;
  onUpdateProfile: (updated: PlayerProfile) => void;
  onExit: () => void;
}

// 11 Locations from user prompt
const MAP_LOCATIONS = [
  { id: 'entrance', name: 'Wejście', icon: '🏫', opponent: 'calm', desc: 'Gdzie wszystko się zaczyna. Sterylne tablice i chłodna portiernia.' },
  { id: 'blocks', name: 'Sala Klocków', icon: '🧸', opponent: 'harmony', desc: 'Klocki poukładane wyłącznie od linijki i według kolorów.' },
  { id: 'art', name: 'Sala Plastyczna', icon: '🎨', opponent: 'whisper', desc: 'Zabronione kredki i sterylne biurka sensoryczne.' },
  { id: 'music', name: 'Sala Muzyczna', icon: '🎵', opponent: 'echo', desc: 'Zakaz zbyt głośnego śpiewania, instrumenty pod kluczem.' },
  { id: 'library', name: 'Biblioteka', icon: '📚', opponent: 'silence', desc: 'Kurtyna ciszy i puste półki na książki z bajkami.' },
  { id: 'playground', name: 'Plac Zabaw', icon: '🎠', opponent: 'calm', desc: 'Symetryczne zjeżdżalnie i brak miejsca na bieganie.' },
  { id: 'canteen', name: 'Stołówka', icon: '🥣', opponent: 'harmony', desc: 'Bezwzględny porządek jedzenia według ustrukturyzowanych gramatur.' },
  { id: 'sensory', name: 'Sala Sensoryczna', icon: '🧩', opponent: 'mirror', desc: 'Ścieżki manipulacyjne mające sformatować dziecięce myśli.' },
  { id: 'office', name: 'Gabinet Terapeutek', icon: '💼', opponent: 'whisper', desc: 'Sanktuarium chłodnych intryg i planów aneksji kolejnych sal.' },
  { id: 'dungeon', name: 'Sekretne Podziemia', icon: '🗝️', opponent: 'silence', desc: 'Głębokie lochy, gdzie tkane są sieci sterylnego rygoru.' },
  { id: 'boss', name: 'Sala Głównej Przełożonej', icon: '👑', opponent: 'principal', desc: 'Siedziba Przełożonej Generalnej Zakonu Terapeutek.' }
];

// Teacher starting statistics and descriptions for upgrades panel
const TEACHERS_UPGRADE_INFO = [
  { id: 'basia', name: 'Pani Basia', color: 'bg-rose-500', textColor: 'text-rose-400', gem: '🔴', role: 'Fort z Krzeseł', desc: 'Zadaje potężne obrażenia fizyczne.', baseAttack: 40, baseHealth: 150 },
  { id: 'hania', name: 'Pani Hania', color: 'bg-yellow-400', textColor: 'text-yellow-400', gem: '🟡', role: 'Eksplozja Farb', desc: 'Zadaje silne obrażenia obszarowe.', baseAttack: 35, baseHealth: 140 },
  { id: 'zosia', name: 'Pani Zosia', color: 'bg-purple-500', textColor: 'text-purple-400', gem: '🟣', role: 'Mroczna Bajka', desc: 'Osłabia i debuffuje przeciwniczki.', baseAttack: 30, baseHealth: 160 },
  { id: 'dyrektor', name: 'Pani Dyrektor', color: 'bg-cyan-400', textColor: 'text-cyan-400', gem: '🔵', role: 'Dzwonek Władzy', desc: 'Daje potężne leczenie i regenerację.', baseAttack: 25, baseHealth: 200 }
];

// Cute available skins
const SKINS_SHOP = [
  { id: 'classic', name: 'Klasyczny Fartuch', cost: 0, desc: 'Tradycyjny, radosny strój nauczycielki.', preview: '👩‍🏫', unlocked: true },
  { id: 'armor', name: 'Zbroja z Kartonu', cost: 150, desc: 'Mocna, tekturowa tarcza chroniąca przed intrygami.', preview: '🛡️', unlocked: false },
  { id: 'summer', name: 'Letni Wakacyjny Styl', cost: 300, desc: 'Słoneczne okulary i wakacyjna energia!', preview: '😎', unlocked: false },
  { id: 'gold', name: 'Złota Mistrzyni Kreatywności', cost: 600, desc: 'Ekskluzywna, błyszcząca złota peleryna.', preview: '✨', unlocked: false }
];

export default function ArenaMode({ playerProfile, onUpdateProfile, onExit }: ArenaModeProps) {
  const [activeSubTab, setActiveSubTab] = useState<'MAP' | 'UPGRADES' | 'SKINS'>('MAP');
  
  // Selected level for Battle
  const [activeBattle, setActiveBattle] = useState<{ opponentId: string; levelIndex: number; levelNum: number } | null>(null);

  // Sound triggers
  const playClick = () => sound.playClick();

  // Arena progress calculations: Each location has 3 sub-levels (Total 33 levels)
  const getLevelStatus = (locIndex: number, subLvl: number) => {
    const levelNum = locIndex * 3 + subLvl + 1;
    const completed = playerProfile.highestCompletedArenaLevel >= levelNum;
    const unlocked = playerProfile.highestCompletedArenaLevel >= levelNum - 1;
    return { completed, unlocked, levelNum };
  };

  const handleLevelSelect = (locIndex: number, subLvl: number) => {
    const status = getLevelStatus(locIndex, subLvl);
    if (!status.unlocked) {
      sound.playFail && sound.playFail();
      return;
    }
    playClick();
    
    const location = MAP_LOCATIONS[locIndex];
    setActiveBattle({
      opponentId: location.opponent,
      levelIndex: locIndex,
      levelNum: status.levelNum
    });
  };

  const handleBattleClose = (rewards?: { gold: number; diamonds: number; xp: number; won: boolean; playNext?: boolean }) => {
    if (!rewards) {
      setActiveBattle(null);
      return;
    }

    if (rewards.won && activeBattle) {
      // Calculate next levels
      const isNewHigh = activeBattle.levelNum > playerProfile.highestCompletedArenaLevel;
      const nextHighLevel = isNewHigh ? activeBattle.levelNum : playerProfile.highestCompletedArenaLevel;
      
      // Calculate XP and levels
      let nextXp = playerProfile.xp + rewards.xp;
      let nextLevel = playerProfile.level;
      const xpNeeded = nextLevel * 100;
      if (nextXp >= xpNeeded) {
        nextXp -= xpNeeded;
        nextLevel += 1;
        sound.playTrophy && sound.playTrophy();
      }

      // Defeated Therapist registration
      const locOpponent = MAP_LOCATIONS[activeBattle.levelIndex].opponent;
      const nextDefeated = playerProfile.defeatedTherapists.includes(locOpponent)
        ? playerProfile.defeatedTherapists
        : [...playerProfile.defeatedTherapists, locOpponent];

      // Achievements check
      let nextAchievements = [...playerProfile.achievements];
      if (nextHighLevel >= 3 && !nextAchievements.includes('Pogromca Sal')) {
        nextAchievements.push('Pogromca Sal');
      }
      if (nextHighLevel >= 15 && !nextAchievements.includes('Weteran Areny')) {
        nextAchievements.push('Weteran Areny');
      }

      const updatedProfile: PlayerProfile = {
        ...playerProfile,
        gold: playerProfile.gold + rewards.gold,
        diamonds: playerProfile.diamonds + rewards.diamonds,
        xp: nextXp,
        level: nextLevel,
        highestCompletedArenaLevel: nextHighLevel,
        defeatedTherapists: nextDefeated,
        achievements: nextAchievements,
        stats: {
          ...playerProfile.stats,
          arenasWon: playerProfile.stats.arenasWon + 1,
          totalDamageDealt: playerProfile.stats.totalDamageDealt + (activeBattle.levelNum * 150)
        }
      };

      onUpdateProfile(updatedProfile);

      if (rewards.playNext && activeBattle.levelNum < 33) {
        const nextLevelNum = activeBattle.levelNum + 1;
        const nextLocIdx = Math.floor((nextLevelNum - 1) / 3);
        const nextLocation = MAP_LOCATIONS[nextLocIdx];
        
        setActiveBattle({
          opponentId: nextLocation.opponent,
          levelIndex: nextLocIdx,
          levelNum: nextLevelNum
        });
      } else {
        setActiveBattle(null);
      }
    } else {
      // Consolation XP
      const updatedProfile: PlayerProfile = {
        ...playerProfile,
        gold: playerProfile.gold + 5,
        xp: playerProfile.xp + 10
      };
      onUpdateProfile(updatedProfile);
      setActiveBattle(null);
    }
  };

  // Upgrading Teacher Stats
  const handleUpgradeTeacher = (teacherId: string) => {
    const currentLvl = playerProfile.teacherLevels[teacherId] || 1;
    const upgradeCostGold = currentLvl * 50;
    const upgradeCostDiamonds = Math.ceil(currentLvl / 2);

    if (playerProfile.gold < upgradeCostGold || playerProfile.diamonds < upgradeCostDiamonds) {
      sound.playFail && sound.playFail();
      alert('Niewystarczająca ilość złota lub diamentów!');
      return;
    }

    sound.playLevelUp();
    const nextLevels = {
      ...playerProfile.teacherLevels,
      [teacherId]: currentLvl + 1
    };

    const updatedProfile: PlayerProfile = {
      ...playerProfile,
      gold: playerProfile.gold - upgradeCostGold,
      diamonds: playerProfile.diamonds - upgradeCostDiamonds,
      teacherLevels: nextLevels
    };

    onUpdateProfile(updatedProfile);
  };

  // Buy Skin
  const handleBuySkin = (skinId: string, cost: number) => {
    if (playerProfile.unlockedSkins.includes(skinId)) return;

    if (playerProfile.gold < cost) {
      sound.playFail && sound.playFail();
      alert('Niewystarczająca ilość złota!');
      return;
    }

    playClick();
    const updatedProfile: PlayerProfile = {
      ...playerProfile,
      gold: playerProfile.gold - cost,
      unlockedSkins: [...playerProfile.unlockedSkins, skinId]
    };

    onUpdateProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-[#0f0705] text-white flex flex-col relative overflow-hidden font-sans select-none pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-0">
      
      {/* HUD Bar */}
      <div className="z-10 p-4 border-b border-[#ff9068]/20 bg-[#1d110b]/90 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4 pt-[calc(16px+env(safe-area-inset-top))]">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#ff9068] to-rose-400">
                💎 DIAMENTOWA AFERA
              </h2>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Profil: <strong className="text-amber-300 font-bold">{playerProfile.username}</strong> • Lvl {playerProfile.level} ({playerProfile.xp}/{playerProfile.level * 100} XP)
              </p>
            </div>
          </div>
        </div>

        {/* Currency & Mode Selector */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          <div className="flex items-center gap-4 text-sm font-bold font-mono">
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-[#ff9068]/20 shadow-inner">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span>{playerProfile.gold}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-cyan-500/20 shadow-inner">
              <Gem className="w-4 h-4 text-cyan-400" />
              <span>{playerProfile.diamonds}</span>
            </div>
          </div>

          <div className="hidden md:flex gap-1.5 bg-black/50 p-1 rounded-2xl border border-white/5 text-xs">
            <button
              onClick={() => { playClick(); setActiveSubTab('MAP'); }}
              className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition ${activeSubTab === 'MAP' ? 'bg-[#ff9068] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Mapa walk
            </button>
            <button
              onClick={() => { playClick(); setActiveSubTab('UPGRADES'); }}
              className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition ${activeSubTab === 'UPGRADES' ? 'bg-[#ff9068] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Rozwój
            </button>
            <button
              onClick={() => { playClick(); setActiveSubTab('SKINS'); }}
              className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition ${activeSubTab === 'SKINS' ? 'bg-[#ff9068] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Sklep / Skórki
            </button>
          </div>
        </div>
      </div>

      {/* Main Area based on sub-tab */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10 max-w-5xl mx-auto w-full">
        
        <AnimatePresence mode="wait">
          
          {/* 1. MAP VIEW */}
          {activeSubTab === 'MAP' && (
            <motion.div
              key="map-subtab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase font-mono tracking-widest text-[#ff9068] bg-[#ff9068]/10 px-3 py-1 rounded-full border border-[#ff9068]/20">
                  Kampania Arena Match-3
                </span>
                <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                  Pokonaj kolejne sterylne strefy przedszkola opanowane przez Tajny Zakon Terapeutek. Każdy pokój kryje 3 poziomy trudności i unikalną bosskę na końcu!
                </p>
              </div>

              {/* mobile-style interactive map chain */}
              <div className="relative flex flex-col items-center gap-8 py-8">
                
                {/* Visual Connector Line representing map path */}
                <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-amber-500 via-[#ff9068]/50 to-purple-950 pointer-events-none z-0" />

                {MAP_LOCATIONS.map((loc, locIdx) => {
                  const isZoneUnlocked = locIdx === 0 || getLevelStatus(locIdx, 0).unlocked;
                  
                  return (
                    <motion.div
                      key={loc.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      className={`relative w-full max-w-lg bg-[#190d08] border-2 rounded-[32px] p-6 shadow-xl z-10 transition duration-300 ${
                        isZoneUnlocked 
                          ? 'border-[#ff9068]/40 hover:border-[#ff9068] shadow-[0_10px_30px_rgba(251,146,60,0.05)]' 
                          : 'border-white/5 opacity-45'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 bg-black/40 rounded-2xl border border-white/5">
                            {loc.icon}
                          </span>
                          <div>
                            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">Lokacja {locIdx + 1}</span>
                            <h4 className="text-lg font-black tracking-tight text-white">{loc.name}</h4>
                          </div>
                        </div>

                        {!isZoneUnlocked && (
                          <div className="p-2.5 rounded-full bg-red-950/20 border border-red-500/20 text-red-400">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 leading-normal mb-6">
                        {loc.desc}
                      </p>

                      {/* Sub-levels Selector representing mobile nodes */}
                      <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2].map(subLvl => {
                          const lvl = getLevelStatus(locIdx, subLvl);
                          const isBoss = subLvl === 2;
                          
                          return (
                            <button
                              key={`sub-${loc.id}-${subLvl}`}
                              onClick={() => handleLevelSelect(locIdx, subLvl)}
                              disabled={!lvl.unlocked}
                              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition duration-200 ${
                                lvl.completed
                                  ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500 text-emerald-300'
                                  : lvl.unlocked
                                    ? isBoss
                                      ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-500 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                                      : 'bg-[#29170f] border-[#ff9068]/30 hover:border-[#ff9068] text-amber-200'
                                    : 'bg-black/40 border-white/5 text-slate-600 cursor-not-allowed'
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
                                {isBoss ? 'BOSS 💀' : `Poziom ${subLvl + 1}`}
                              </span>
                              
                              <div className="flex items-center gap-1">
                                {lvl.completed ? (
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ) : (
                                  <span className="text-xs font-mono font-black">Lvl {lvl.levelNum}</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </motion.div>
          )}

          {/* 2. UPGRADES VIEW */}
          {activeSubTab === 'UPGRADES' && (
            <motion.div
              key="upgrades-subtab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase font-mono tracking-widest text-[#ff9068] bg-[#ff9068]/10 px-3 py-1 rounded-full border border-[#ff9068]/20">
                  Trening i Doskonalenie Drużyny
                </span>
                <p className="text-slate-300 text-xs mt-3">
                  Wydawaj złoto i diamenty zdobyte na Diamentowej Arenie, aby trenować nauczycielki i podnosić ich statystyki walki!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {TEACHERS_UPGRADE_INFO.map(t => {
                  const currentLvl = playerProfile.teacherLevels[t.id] || 1;
                  const goldCost = currentLvl * 50;
                  const diamondCost = Math.ceil(currentLvl / 2);
                  const canAfford = playerProfile.gold >= goldCost && playerProfile.diamonds >= diamondCost;

                  return (
                    <div
                      key={t.id}
                      className="bg-[#1b100b] border-2 border-white/5 rounded-[28px] p-5 space-y-4 shadow-xl hover:border-[#ff9068]/20 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl">
                            {t.gem}
                          </div>
                          <div>
                            <h4 className="text-base font-extrabold text-white">{t.name}</h4>
                            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                              Zdolność: {t.role}
                            </span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-[#ff9068]/20 border border-[#ff9068]/30 rounded-full text-xs font-mono font-bold text-amber-300">
                          Poziom {currentLvl}
                        </div>
                      </div>

                      <p className="text-xs text-slate-400">{t.desc}</p>

                      {/* Stats progression indicator */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1">
                            <Sword className="w-3.5 h-3.5 text-rose-400" /> Atak fizyczny
                          </span>
                          <p className="font-extrabold text-sm font-mono text-white">
                            {t.baseAttack + currentLvl * 5} <span className="text-emerald-400 text-xs font-bold">➔ +5</span>
                          </p>
                        </div>
                        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-emerald-400" /> Żywotność
                          </span>
                          <p className="font-extrabold text-sm font-mono text-white">
                            {t.baseHealth + currentLvl * 15} <span className="text-emerald-400 text-xs font-bold">➔ +15</span>
                          </p>
                        </div>
                      </div>

                      {/* Level Up Button */}
                      <button
                        onClick={() => handleUpgradeTeacher(t.id)}
                        className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-500 to-[#ff9068] text-slate-950 hover:brightness-110 active:scale-98 shadow-md'
                            : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <Hammer className="w-4 h-4" />
                        Trenuj za 🪙 {goldCost} & 💎 {diamondCost}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 3. SKINS VIEW */}
          {activeSubTab === 'SKINS' && (
            <motion.div
              key="skins-subtab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto">
                <span className="text-xs uppercase font-mono tracking-widest text-[#ff9068] bg-[#ff9068]/10 px-3 py-1 rounded-full border border-[#ff9068]/20">
                  Salon Skórek i Osiągnięć
                </span>
                <p className="text-slate-300 text-xs mt-3">
                  Wydawaj zgromadzone złoto na unikalne stroje i personalizacje wizualne, oraz śledź swoje osiągnięcia w placówce.
                </p>
              </div>

              {/* Skins list */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {SKINS_SHOP.map(s => {
                  const isUnlocked = playerProfile.unlockedSkins.includes(s.id) || s.unlocked;
                  const canAfford = playerProfile.gold >= s.cost;

                  return (
                    <div
                      key={s.id}
                      className={`bg-[#1c110b] border-2 rounded-3xl p-4 flex flex-col items-center text-center justify-between gap-3 shadow-lg ${
                        isUnlocked ? 'border-emerald-500/30' : 'border-white/5'
                      }`}
                    >
                      <span className="text-5xl p-4 bg-black/30 rounded-2xl border border-white/5 animate-pulse">
                        {s.preview}
                      </span>
                      
                      <div>
                        <h4 className="text-xs font-black text-white">{s.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                          {s.desc}
                        </p>
                      </div>

                      {isUnlocked ? (
                        <span className="w-full py-2 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded-xl tracking-widest">
                          Odblokowano
                        </span>
                      ) : (
                        <button
                          onClick={() => handleBuySkin(s.id, s.cost)}
                          disabled={!canAfford}
                          className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${
                            canAfford
                              ? 'bg-gradient-to-r from-amber-500 to-[#ff9068] text-slate-950 hover:brightness-110'
                              : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                          }`}
                        >
                          Kup za 🪙 {s.cost}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Achievements banner */}
              <div className="bg-black/30 border border-white/5 p-6 rounded-3xl mt-8 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#ffdfa0] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" /> Zdobyte Medale i Osiągnięcia
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-[#1b100b] border border-white/5 p-4 rounded-2xl flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Pierwszy Krok</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Zarejestruj profil gracza w Tęczowym Zakątku.</p>
                    </div>
                  </div>
                  <div className={`bg-[#1b100b] border p-4 rounded-2xl flex items-center gap-3 ${playerProfile.highestCompletedArenaLevel >= 3 ? 'border-emerald-500/30' : 'border-white/5 opacity-40'}`}>
                    <span className="text-2xl">⚔️</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Pogromca Sal</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Ukończ 3 poziom Areny i pokonaj pierwszą bosskę.</p>
                    </div>
                  </div>
                  <div className={`bg-[#1b100b] border p-4 rounded-2xl flex items-center gap-3 ${playerProfile.highestCompletedArenaLevel >= 15 ? 'border-emerald-500/30' : 'border-white/5 opacity-40'}`}>
                    <span className="text-2xl">👑</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">Weteran Areny</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Ukończ 15 poziomów Areny przedszkolnej.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* STICKY BOTTOM NAVIGATION BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#150a06]/95 backdrop-blur-lg border-t border-[#ff9068]/20 px-4 py-2 pb-[calc(10px+env(safe-area-inset-bottom))] z-40 flex justify-around items-center shadow-2xl">
        <button
          onClick={() => { playClick(); setActiveSubTab('MAP'); }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[48px] px-3 py-1 rounded-xl transition ${
            activeSubTab === 'MAP'
              ? 'text-amber-400 font-extrabold scale-105'
              : 'text-slate-400 font-medium'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] uppercase font-mono tracking-wider">Mapa</span>
        </button>

        <button
          onClick={() => { playClick(); setActiveSubTab('UPGRADES'); }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[48px] px-3 py-1 rounded-xl transition ${
            activeSubTab === 'UPGRADES'
              ? 'text-amber-400 font-extrabold scale-105'
              : 'text-slate-400 font-medium'
          }`}
        >
          <Hammer className="w-5 h-5" />
          <span className="text-[10px] uppercase font-mono tracking-wider">Rozwój</span>
        </button>

        <button
          onClick={() => { playClick(); setActiveSubTab('SKINS'); }}
          className={`flex flex-col items-center justify-center gap-1 min-h-[48px] px-3 py-1 rounded-xl transition ${
            activeSubTab === 'SKINS'
              ? 'text-amber-400 font-extrabold scale-105'
              : 'text-slate-400 font-medium'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] uppercase font-mono tracking-wider">Sklep</span>
        </button>
      </div>

      {/* MATCH-3 BATTLE MINIGAME OVERLAY IF SELECTED */}
      <AnimatePresence>
        {activeBattle && (
          <DiamondAttack
            key={`arena-battle-${activeBattle.levelNum}`}
            playerProfile={playerProfile}
            opponentId={activeBattle.opponentId}
            opponentLevel={activeBattle.levelNum}
            onClose={handleBattleClose}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
