/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Sparkles, Users, ShieldCheck, Heart, AlertCircle, Coffee, Feather, Check, Bookmark } from 'lucide-react';
import { GameState, PlayerProfile } from '../types';
import { sound } from './SoundManager';

interface PostFallJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  playerProfile: PlayerProfile;
}

export default function PostFallJournalModal({
  isOpen,
  onClose,
  gameState,
  playerProfile
}: PostFallJournalModalProps) {
  const [activeTab, setActiveTab] = useState<'entries' | 'people' | 'stats' | 'custom'>('entries');
  const [customNote, setCustomNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(`post_fall_journal_notes_${playerProfile.username || 'default'}`);
      return stored ? JSON.parse(stored) : [
        'Kawiarnia „Kawa i Kolory”: Drzwi przedszkola opieczętowane, ale ziarno wolności zostało zasiane w sercach dzieci.',
        'Obserwacja: Małgorzata i Pani Calm były widziane pod budynkiem nowej korporacji. Zakon Porządku nie zrezygnował z planów.'
      ];
    } catch {
      return [
        'Kawiarnia „Kawa i Kolory”: Drzwi przedszkola opieczętowane, ale ziarno wolności zostało zasiane w sercach dzieci.'
      ];
    }
  });
  const [noteSavedAlert, setNoteSavedAlert] = useState(false);

  if (!isOpen) return null;

  const decisions = gameState.decisions || [];

  // Determine unlocked manifests
  const hasFreedomManifest = decisions.includes('ch41_journal_choice_freedom');
  const hasOrderManifest = decisions.includes('ch41_journal_choice_order');
  const hasVigilanceManifest = decisions.includes('ch41_journal_choice_vigilance');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) return;

    sound.playAchievement();
    const updated = [customNote.trim(), ...savedNotes];
    setSavedNotes(updated);
    try {
      localStorage.setItem(`post_fall_journal_notes_${playerProfile.username || 'default'}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setCustomNote('');
    setNoteSavedAlert(true);
    setTimeout(() => setNoteSavedAlert(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-amber-950/90 border-2 border-amber-600/40 rounded-3xl shadow-[0_0_50px_rgba(217,119,6,0.25)] text-amber-50 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Leather notebook header banner */}
        <div className="relative bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 px-6 py-4 border-b border-amber-500/30 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-amber-200 font-serif">
                  Pamiętnik Po Upadku
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[9px] font-mono text-amber-300 uppercase tracking-widest">
                  Akt II / Rozdział 41
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 italic font-serif">
                Kronika refleksji, losów kadry i tropów po zamknięciu Tęczowego Zakątka
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-amber-500/30 flex items-center justify-center text-amber-300 transition active:scale-95 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation ribbons */}
        <div className="bg-black/40 px-4 py-2 border-b border-amber-500/20 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => { sound.playClick(); setActiveTab('entries'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-serif transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'entries'
                ? 'bg-amber-500/25 border border-amber-400/50 text-amber-100 shadow-sm'
                : 'bg-white/5 border border-transparent text-amber-300/70 hover:bg-white/10 hover:text-amber-200'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            Wpisy & Manifesty
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('people'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-serif transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'people'
                ? 'bg-amber-500/25 border border-amber-400/50 text-amber-100 shadow-sm'
                : 'bg-white/5 border border-transparent text-amber-300/70 hover:bg-white/10 hover:text-amber-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            Losy Osobowości
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('stats'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-serif transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'stats'
                ? 'bg-amber-500/25 border border-amber-400/50 text-amber-100 shadow-sm'
                : 'bg-white/5 border border-transparent text-amber-300/70 hover:bg-white/10 hover:text-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Bilans Wolności i Ładu
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('custom'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-serif transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
              activeTab === 'custom'
                ? 'bg-amber-500/25 border border-amber-400/50 text-amber-100 shadow-sm'
                : 'bg-white/5 border border-transparent text-amber-300/70 hover:bg-white/10 hover:text-amber-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            Notatnik Osobisty ({savedNotes.length})
          </button>
        </div>

        {/* Tab content view */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-gradient-to-b from-stone-900/90 to-amber-950/80 scrollbar-thin">
          
          {/* TAB 1: ENTRIES & MANIFESTS */}
          {activeTab === 'entries' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 leading-relaxed text-xs sm:text-sm text-amber-100 italic font-serif relative">
                <div className="text-amber-400 font-bold mb-1 uppercase tracking-wider text-[10px] font-mono not-italic flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5" /> Kawiarniane podsumowanie (Rozdział 41)
                </div>
                „Zamknięcie przedszkola nie jest końcem naszej walki. To tylko zmiana sceny. Drzwi Tęczowego Zakątka opieczętowano, lecz to, co zbudowaliśmy w dzieciach i z kadrą, pozostanie niezniszczalne.”
              </div>

              <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono flex items-center gap-1.5 pt-2">
                <Feather className="w-4 h-4 text-amber-400" /> Odblokowane Manifesty Po Upadku
              </h3>

              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border transition ${hasFreedomManifest ? 'bg-amber-500/15 border-amber-400/40 text-amber-50' : 'bg-black/30 border-white/10 text-stone-400'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider font-serif text-amber-300 flex items-center gap-1.5">
                      🌸 Manifest Dziecięcej Wolności
                    </span>
                    {hasFreedomManifest ? (
                      <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Zapisano w Rozdziale 41</span>
                    ) : (
                      <span className="text-[9px] font-mono bg-white/5 text-stone-400 px-2 py-0.5 rounded-full">Można wybrać w Rozdziale 41</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed italic font-serif">
                    „Wolność twórcza i radość maluchów są cenniejsze niż jakikolwiek sztucznie narzucony rygor. Kolory i śmiech przetrwają w ludzkich sercach, choćby zamknęli tysiące budynków.”
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border transition ${hasOrderManifest ? 'bg-blue-500/15 border-blue-400/40 text-blue-50' : 'bg-black/30 border-white/10 text-stone-400'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider font-serif text-sky-300 flex items-center gap-1.5">
                      🔷 Zasada Zrównoważonego Ładu
                    </span>
                    {hasOrderManifest ? (
                      <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Zapisano w Rozdziale 41</span>
                    ) : (
                      <span className="text-[9px] font-mono bg-white/5 text-stone-400 px-2 py-0.5 rounded-full">Można wybrać w Rozdziale 41</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed italic font-serif">
                    „Zdrowa dyscyplina i stabilne zasady są potrzebne dla bezpieczeństwa, ale nigdy nie mogą stać się parawanem dla bezdusznej manipulacji i odbierania podmiotowości.”
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border transition ${hasVigilanceManifest ? 'bg-purple-500/15 border-purple-400/40 text-purple-50' : 'bg-black/30 border-white/10 text-stone-400'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider font-serif text-purple-300 flex items-center gap-1.5">
                      👁️ Przysięga Wiecznej Czujności
                    </span>
                    {hasVigilanceManifest ? (
                      <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">Zapisano w Rozdziale 41</span>
                    ) : (
                      <span className="text-[9px] font-mono bg-white/5 text-stone-400 px-2 py-0.5 rounded-full">Można wybrać w Rozdziale 41</span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed italic font-serif">
                    „Zakon Porządku i Małgorzata nie zniknęli z oświaty. Przenieśli się w cień. Będziemy cichymi strażniczkami i zdemaskujemy każdą próbę ponownego uciszania dzieci.”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PEOPLE DESTINIES */}
          {activeTab === 'people' && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono mb-2">
                Status Kadry i Postaci Po Zamknięciu
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 font-serif">Pani Basia</span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Wydostała się</span>
                  </div>
                  <p className="text-[11px] text-amber-100/80 leading-relaxed font-serif">
                    Rozpoczęła prowadzenie wolnych autorskich warsztatów plastycznych dla dzieci z okolicy. Utrzymuje stały kontakt z bohaterką.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-300 font-serif">Pani Hania</span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Nowa praca</span>
                  </div>
                  <p className="text-[11px] text-pink-100/80 leading-relaxed font-serif">
                    Podjęła pracę w państwowym przedszkolu „Słoneczne Osiedle”. Zabrała ze sobą część piosenek i materiałów plastycznych.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-300 font-serif">Pani Zosia</span>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Odpoczynek</span>
                  </div>
                  <p className="text-[11px] text-sky-100/80 leading-relaxed font-serif">
                    Regeneruje siły po długim psychicznym terroryzowaniu przez gabinet terapeutek. Rozważa powrót do studiów pedagogicznych.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 font-serif">Małgorzata & Terapeutki</span>
                    <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">W ukryciu</span>
                  </div>
                  <p className="text-[11px] text-purple-100/80 leading-relaxed font-serif">
                    Po odebraniu tajemniczego telefonu pod budynkiem przedszkola zniknęły. Widziane na rozmowach z inwestorami prywatnych sieci oświatowych.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATS & BALANCE */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-amber-300 font-mono">
                  Bilans Ideologiczny Bohaterki
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-emerald-400 font-bold">☀️ Dziecięca Wolność: {gameState.freedomScore}%</span>
                    <span className="text-sky-400 font-bold">🔷 Terapeutyczne Uporządkowanie: {gameState.orderScore}%</span>
                  </div>

                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex border border-amber-500/20">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: `${gameState.freedomScore}%` }} />
                    <div className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500" style={{ width: `${gameState.orderScore}%` }} />
                  </div>
                </div>

                <p className="text-xs text-amber-100/90 leading-relaxed italic font-serif pt-1">
                  {gameState.freedomScore > gameState.orderScore + 15 ? (
                    '„Twoje serce bije bezsprzecznie dla wolności, sztuki i nieskrępowanego uśmiechu maluchów. Ocaliłaś ducha przedszkola przed zwiędnięciem.”'
                  ) : gameState.orderScore > gameState.freedomScore + 15 ? (
                    '„Stawiałaś na stabilność i rozsądek, chroniąc placówkę przed chaosem. Twój ład ma jednak ludzką, cieplą twarz, odrzucającą okrucieństwo gabinetu.”'
                  ) : (
                    '„Idealny balans wolności i porządku. Rozumiałaś potęgę dziecięcej wyobraźni, nie zapominając o potrzebie bezpieczeństwa i dojrzałej dyskrecji.”'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM PERSONAL NOTE */}
          {activeTab === 'custom' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="space-y-2.5 bg-black/40 p-4 rounded-2xl border border-amber-500/20">
                <label className="block text-xs font-bold text-amber-300 font-serif">
                  Dopisz własną reflesję do Pamiętnika Po Upadku:
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Wpisz swoje przemyślenia na temat zamkniecia przedszkola, dzieci, terapeutek..."
                  className="w-full h-20 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-100 text-xs font-serif placeholder:text-amber-400/40 focus:outline-none focus:border-amber-400/70 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-300/60 italic font-serif">
                    Wpis zostanie zapisany w pamięci profilu
                  </span>
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-extrabold text-xs tracking-wider uppercase shadow-md transition active:scale-95 flex items-center gap-1.5"
                  >
                    <Feather className="w-3.5 h-3.5" /> Dodaj Wpis
                  </button>
                </div>
              </form>

              {noteSavedAlert && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-mono flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" /> Wpis został dodany do Twojego Pamiętnika Po Upadku!
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">
                  Twoje osobiste wpisy ({savedNotes.length})
                </h4>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {savedNotes.map((note, idx) => (
                    <div key={`saved-note-${idx}`} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-100 italic font-serif leading-relaxed">
                      "{note}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-black/80 px-6 py-3 border-t border-amber-500/20 flex justify-between items-center text-[10px] text-amber-300/70 font-mono shrink-0">
          <span>Pamiętnik Po Upadku • Tęczowy Zakątek</span>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-bold text-xs transition active:scale-95"
          >
            Zamknij Pamiętnik
          </button>
        </div>
      </motion.div>
    </div>
  );
}
