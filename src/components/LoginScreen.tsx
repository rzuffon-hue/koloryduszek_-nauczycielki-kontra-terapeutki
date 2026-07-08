/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, Sparkles, LogIn, UserPlus, AlertCircle, Trash2, KeyRound } from 'lucide-react';
import { sound } from './SoundManager';
import { PlayerProfile, GameState } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (profile: PlayerProfile) => void;
}

const PROFILES_STORAGE_KEY = 'koloryduszek_profiles_v2';

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

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [profiles, setProfiles] = useState<PlayerProfile[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  // Selected existing profile for PIN entry
  const [selectedProfile, setSelectedProfile] = useState<PlayerProfile | null>(null);
  const [pinAttempt, setPinAttempt] = useState('');

  // Load all registered profiles
  useEffect(() => {
    sound.playMusic('happy');
    const saved = localStorage.getItem(PROFILES_STORAGE_KEY);
    let loadedProfiles: PlayerProfile[] = [];
    if (saved) {
      try {
        loadedProfiles = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load profiles', e);
      }
    }

    const sebastianExists = loadedProfiles.some(p => p.username.toLowerCase() === 'sebastian');
    if (!sebastianExists) {
      const sebastianProfile: PlayerProfile = {
        username: 'Sebastian',
        pin: '707878',
        level: 10,
        xp: 1200,
        diamonds: 999,
        gold: 9999,
        unlockedTeachers: ['basia', 'hania', 'zosia'],
        defeatedTherapists: [],
        highestCompletedArenaLevel: 10,
        achievements: ['Krok Pierwszy', 'Złota Rączka', 'Wielki Mistrz'],
        unlockedSkins: ['classic', 'default'],
        storySave: {
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
            zosia: 'unlocked',
            calm: 'unlocked',
            whisper: 'unlocked',
            harmony: 'locked'
          }
        },
        teacherLevels: {
          basia: 5,
          hania: 5,
          zosia: 5,
          dyrektor: 5
        },
        stats: {
          completedMinigamesCount: 15,
          arenasWon: 10,
          totalDamageDealt: 50000,
          diamondsMatched: 1000
        },
        isAdmin: true
      };
      loadedProfiles.push(sebastianProfile);
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(loadedProfiles));
    } else {
      // Ensure existing Sebastian is marked as admin
      loadedProfiles = loadedProfiles.map(p => 
        p.username.toLowerCase() === 'sebastian' ? { ...p, isAdmin: true } : p
      );
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(loadedProfiles));
    }
    setProfiles(loadedProfiles);
  }, []);

  const saveAllProfiles = (updatedList: PlayerProfile[]) => {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedList));
    setProfiles(updatedList);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setError('');

    const trimmedUser = username.trim();
    if (!trimmedUser) {
      setError('Nazwa gracza nie może być pusta!');
      return;
    }

    if (trimmedUser.length < 3) {
      setError('Nazwa musi mieć co najmniej 3 znaki!');
      return;
    }

    if (!/^\d{4,6}$/.test(pin)) {
      setError('PIN musi składać się z 4 do 6 cyfr!');
      return;
    }

    // Check if duplicate name
    if (profiles.some(p => p.username.toLowerCase() === trimmedUser.toLowerCase())) {
      setError('Ta nazwa gracza jest już zajęta!');
      return;
    }

    // Create a new PlayerProfile with starting stats
    const newProfile: PlayerProfile = {
      username: trimmedUser,
      pin,
      level: 1,
      xp: 0,
      diamonds: 15,
      gold: 120,
      unlockedTeachers: ['basia', 'hania'],
      defeatedTherapists: [],
      highestCompletedArenaLevel: 0,
      achievements: ['Krok Pierwszy'],
      unlockedSkins: ['default'],
      storySave: DEFAULT_STORY_STATE,
      teacherLevels: {
        basia: 1,
        hania: 1,
        zosia: 1,
        dyrektor: 1
      },
      stats: {
        completedMinigamesCount: 0,
        arenasWon: 0,
        totalDamageDealt: 0,
        diamondsMatched: 0
      }
    };

    const updated = [...profiles, newProfile];
    saveAllProfiles(updated);
    
    // Auto login
    onLoginSuccess(newProfile);
  };

  const handleLoginWithPIN = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setError('');

    if (!selectedProfile) return;

    if (pinAttempt === selectedProfile.pin) {
      onLoginSuccess(selectedProfile);
    } else {
      setError('Błędny kod PIN! Spróbuj ponownie.');
      sound.playFail && sound.playFail();
      setPinAttempt('');
    }
  };

  const handleDeleteProfile = (profileToDelete: PlayerProfile, e: React.MouseEvent) => {
    e.stopPropagation(); // Don't select for login
    sound.playClick();
    
    if (confirm(`Czy na pewno chcesz usunąć profil gracza "${profileToDelete.username}" i wszystkie jego zapisy?`)) {
      const updated = profiles.filter(p => p.username !== profileToDelete.username);
      saveAllProfiles(updated);
      if (selectedProfile?.username === profileToDelete.username) {
        setSelectedProfile(null);
      }
    }
  };

  const appendPinDigit = (digit: string) => {
    sound.playClick();
    setError('');
    if (selectedProfile) {
      if (pinAttempt.length < 6) {
        setPinAttempt(prev => prev + digit);
      }
    } else if (isRegistering) {
      if (pin.length < 6) {
        setPin(prev => prev + digit);
      }
    }
  };

  const clearPin = () => {
    sound.playClick();
    if (selectedProfile) {
      setPinAttempt('');
    } else {
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-[#110805] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-orange-950/20 to-black pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Rainbow Sparkle header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-3 mb-8 z-10"
      >
        <span className="text-4xl animate-bounce inline-block">🌈</span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 uppercase">
          Tęczowy Zakątek
        </h1>
        <p className="text-xs font-semibold tracking-widest text-amber-200/60 uppercase font-mono">
          System Autoryzacji Przedszkola
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-[#1d110b] border-2 border-[#ff9068]/30 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(251,146,60,0.15)] space-y-6 z-10 relative"
      >
        <AnimatePresence mode="wait">
          {/* PROFILE SELECTION */}
          {!isRegistering && !selectedProfile && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  <User className="w-5 h-5 text-amber-400" />
                  Wybierz swój profil
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Wybierz profil z listy lub utwórz nowy, aby rozpocząć grę.
                </p>
              </div>

              {/* Profiles List */}
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {profiles.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
                    <p className="text-slate-500 text-sm">Brak zapisanych graczy.</p>
                  </div>
                ) : (
                  profiles.map(p => (
                    <div
                      key={p.username}
                      onClick={() => {
                        sound.playClick();
                        setSelectedProfile(p);
                        setPinAttempt('');
                        setError('');
                      }}
                      className="flex justify-between items-center bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#ff9068]/40 p-4 rounded-2xl cursor-pointer transition active:scale-98"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ff9068]/20 border border-[#ff9068]/40 rounded-xl flex items-center justify-center text-amber-300 font-bold">
                          Lvl {p.level}
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-sm">{p.username}</p>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1">
                            💎 {p.diamonds} • 🪙 {p.gold} • Arena Lvl {p.highestCompletedArenaLevel}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteProfile(p, e)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Register Button */}
              <button
                onClick={() => {
                  sound.playClick();
                  setIsRegistering(true);
                  setError('');
                  setUsername('');
                  setPin('');
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-[#ff9068] hover:brightness-110 text-slate-950 font-black tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                Stwórz Nowy Profil
              </button>
            </motion.div>
          )}

          {/* PIN VERIFICATION */}
          {selectedProfile && (
            <motion.div
              key="pin-verify"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <span className="text-xs font-mono text-[#ff9068] uppercase tracking-widest block mb-1">
                  Wymagany kod PIN
                </span>
                <h2 className="text-xl font-bold text-white">
                  Witaj, {selectedProfile.username}!
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Wprowadź swój PIN, aby odblokować zapis.
                </p>
              </div>

              {/* Dots for PIN */}
              <div className="flex justify-center gap-4 py-2">
                {[...Array(selectedProfile.pin.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 transition duration-150 ${
                      i < pinAttempt.length
                        ? 'bg-[#ff9068] border-[#ff9068] scale-110 shadow-[0_0_10px_#ff9068]'
                        : 'bg-transparent border-white/20'
                    }`}
                  />
                ))}
              </div>

              {error && (
                <div className="text-xs text-red-400 text-center bg-red-950/50 border border-red-500/20 p-2.5 rounded-xl flex items-center gap-2 justify-center">
                  <AlertCircle className="w-4 h-4 shrink-0 animate-bounce" />
                  <span>{error}</span>
                </div>
              )}

              {/* dialpad */}
              <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => appendPinDigit(num)}
                    className="w-14 h-14 rounded-2xl bg-black/40 hover:bg-[#ff9068]/20 border border-white/10 hover:border-[#ff9068]/40 text-lg font-bold text-white transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearPin}
                  className="w-14 h-14 rounded-2xl bg-black/40 hover:bg-red-500/20 border border-white/5 text-xs font-bold text-slate-400 hover:text-red-400 transition active:scale-95 flex items-center justify-center"
                >
                  Usuń
                </button>
                <button
                  type="button"
                  onClick={() => appendPinDigit('0')}
                  className="w-14 h-14 rounded-2xl bg-black/40 hover:bg-[#ff9068]/20 border border-white/10 hover:border-[#ff9068]/40 text-lg font-bold text-white transition active:scale-95"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleLoginWithPIN}
                  disabled={pinAttempt.length !== selectedProfile.pin.length}
                  className="w-14 h-14 rounded-2xl bg-[#ff9068] hover:bg-amber-400 text-slate-950 text-xs font-black uppercase transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center shadow-lg"
                >
                  OK
                </button>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedProfile(null);
                  setPinAttempt('');
                  setError('');
                }}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition"
              >
                Powrót do listy profili
              </button>
            </motion.div>
          )}

          {/* REGISTER NEW PROFILE */}
          {isRegistering && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#ff9068]" />
                  Zarejestruj się
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Stwórz profil, podając login i PIN zabezpieczający.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-amber-200/70 uppercase tracking-widest block font-mono">
                    Nazwa gracza / Login
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.slice(0, 15))}
                      placeholder="np. Przedszkolak"
                      className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 focus:border-[#ff9068]/50 rounded-2xl text-sm font-bold text-white outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-amber-200/70 uppercase tracking-widest block font-mono">
                    Kod PIN (4-6 cyfr)
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="password"
                      value={pin}
                      readOnly
                      placeholder="Klikaj cyfry poniżej"
                      className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm font-mono font-bold tracking-widest text-center text-white outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-xs text-red-400 bg-red-950/50 border border-red-500/20 p-2.5 rounded-xl flex items-center gap-2 justify-center">
                    <AlertCircle className="w-4 h-4 shrink-0 animate-bounce" />
                    <span>{error}</span>
                  </div>
                )}

                {/* PIN Dialpad for Registering */}
                <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto pt-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                    <button
                      type="button"
                      key={`reg-${num}`}
                      onClick={() => appendPinDigit(num)}
                      className="w-12 h-12 rounded-xl bg-black/40 hover:bg-[#ff9068]/20 border border-white/10 hover:border-[#ff9068]/40 text-base font-bold text-white transition active:scale-95"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={clearPin}
                    className="w-12 h-12 rounded-xl bg-black/40 hover:bg-red-500/20 border border-white/5 text-[10px] font-bold text-slate-400 hover:text-red-400 transition active:scale-95 flex items-center justify-center"
                  >
                    Usuń
                  </button>
                  <button
                    type="button"
                    key="reg-0"
                    onClick={() => appendPinDigit('0')}
                    className="w-12 h-12 rounded-xl bg-black/40 hover:bg-[#ff9068]/20 border border-white/10 hover:border-[#ff9068]/40 text-base font-bold text-white transition active:scale-95"
                  >
                    0
                  </button>
                  <div className="w-12 h-12" />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setIsRegistering(false);
                      setError('');
                    }}
                    className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-[#ff9068] hover:brightness-110 text-slate-950 font-black uppercase text-xs rounded-2xl transition active:scale-98"
                  >
                    Zapisz i Graj
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
