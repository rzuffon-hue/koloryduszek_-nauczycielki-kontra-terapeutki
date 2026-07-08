/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, HelpCircle, Key, Book, Palette, Compass, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sound } from './SoundManager';

interface MinigameProps {
  type: 'FORT' | 'PAINT' | 'BLOCKS' | 'MOVEMENT' | 'HIDDEN' | 'PUZZLE';
  onWin: (freedomBonus: number, orderBonus: number) => void;
  onLose: () => void;
}

export default function MinigameWrapper({ type, onWin, onLose }: MinigameProps) {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
  const [freedomEarned, setFreedomEarned] = useState(0);
  const [orderEarned, setOrderEarned] = useState(0);

  const startPlaying = () => {
    sound.playClick();
    setGameState('playing');
  };

  const handleWin = (f: number, o: number) => {
    sound.playSuccess();
    setFreedomEarned(f);
    setOrderEarned(o);
    setGameState('won');
  };

  const handleLoseLocal = () => {
    sound.playClick();
    setGameState('lost');
  };

  // Render the specific minigame
  const renderMinigame = () => {
    switch (type) {
      case 'FORT':
        return <FortGame onWin={(f, o) => handleWin(f, o)} onLose={handleLoseLocal} />;
      case 'PAINT':
        return <PaintGame onWin={(f, o) => handleWin(f, o)} />;
      case 'BLOCKS':
        return <BlocksGame onWin={(f, o) => handleWin(f, o)} />;
      case 'MOVEMENT':
        return <MovementGame onWin={(f, o) => handleWin(f, o)} onLose={handleLoseLocal} />;
      case 'HIDDEN':
        return <HiddenObjectsGame onWin={(f, o) => handleWin(f, o)} />;
      case 'PUZZLE':
        return <PuzzleGame onWin={(f, o) => handleWin(f, o)} />;
      default:
        return <div className="text-center py-8">Nieznany typ minigry.</div>;
    }
  };

  // Get description and rules
  const getRules = () => {
    switch (type) {
      case 'FORT':
        return {
          title: '🏰 Budowanie Fortu Wolności',
          desc: 'Nauczycielki chcą zbudować najwyższy fort z poduszek i krzeseł! Klikaj precyzyjnie, aby upuszczać kolejne elementy na chwiejącą się wieżę.',
          objective: 'Ułóż wieżę o wysokości 5 elementów, nie tracąc równowagi.',
          gain: '🌈 +25 Wolności / 🔷 -10 Uporządkowania'
        };
      case 'PAINT':
        return {
          title: '🎨 Malowanie Kolorowego Muralu',
          desc: 'Pomaluj sterylne ściany przedszkola radosnymi barwami Koloryduszka! Wybierz kolor i klikaj lub przeciągaj palcem po siatce, aby wypełnić obraz.',
          objective: 'Pomaluj co najmniej 85% pól, by ujawnić ukrytą magię duszka.',
          gain: '🌈 +20 Wolności / 🔷 +10 Uporządkowania (Zależy od wybranych barw!)'
        };
      case 'BLOCKS':
        return {
          title: '📦 Porządkowanie vs Wyobraźnia',
          desc: 'Czas na segregację zabawek! Możesz ułożyć je perfekcyjnie według kolorów i kształtów (Terapeutki) lub zbudować asymetryczne rzeźby (Nauczycielki).',
          objective: 'Rozmieść wszystkie 6 klocków do odpowiednich stref.',
          gain: 'Zależy od Twojego stylu gry!'
        };
      case 'MOVEMENT':
        return {
          title: '🎵 Rytmiczny Taniec Kolorów',
          desc: 'Dzieci chcą skakać do rytmu! Klikaj przycisk idealnie w momencie, gdy wskaźnik znajdzie się w środkowej, zielonej strefie rytmu.',
          objective: 'Zdobądź 5 perfekcyjnych uderzeń, aby rozkręcić super zabawę.',
          gain: '🌈 +20 Wolności / 🔷 +15 Uporządkowania'
        };
      case 'HIDDEN':
        return {
          title: '🔍 Poszukiwanie Ukrytych Wskazówek',
          desc: 'Śledztwo w szatni! Przeszukaj szafkę i otoczenie, aby znaleźć klucze, plany oraz poufne notatki ukryte na obrazie.',
          objective: 'Znajdź wszystkie 4 ukryte przedmioty wymienione na liście.',
          gain: '🌈 +15 Wolności / 🔷 +15 Uporządkowania'
        };
      case 'PUZZLE':
        return {
          title: '🧩 Omijanie Blokady Panelu',
          desc: 'Trzeba odblokować tajny zamek! Obracaj fragmenty rur i przewodów energetycznych na planszy, aby połączyć lewe źródło z prawym odbiornikiem.',
          objective: 'Stwórz jedno nieprzerwane połączenie od startu do mety.',
          gain: '🌈 +15 Wolności / 🔷 +25 Uporządkowania'
        };
    }
  };

  const info = getRules();

  return (
    <div id="minigame-container" className="bg-slate-900/90 backdrop-blur-md rounded-2xl border-4 border-slate-700 p-6 max-w-xl mx-auto text-white shadow-2xl relative overflow-hidden">
      {/* Visual background ambient glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6"
          >
            <h3 className="text-2xl font-bold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-cyan-400 mb-4">
              {info.title}
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              {info.desc}
            </p>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 mb-6 text-left space-y-2">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Cel gry:</div>
              <div className="text-sm text-slate-200 font-medium flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{info.objective}</span>
              </div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider pt-2">Nagroda za sukces:</div>
              <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-cyan-300 font-semibold">
                {info.gain}
              </div>
            </div>

            <button
              onClick={startPlaying}
              id="start-minigame-btn"
              className="w-full bg-gradient-to-r from-pink-500 via-amber-500 to-cyan-500 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition transform duration-150 flex items-center justify-center gap-2 text-lg"
            >
              Rozpocznij Wyzwanie <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {renderMinigame()}
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 space-y-6"
          >
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 animate-bounce">
              <Trophy className="w-16 h-16" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-emerald-400 font-sans tracking-tight">
                ZWYCIĘSTWO!
              </h3>
              <p className="text-slate-300 text-sm">
                Świetna robota! Udało Ci się pomyślnie ukończyć wyzwanie.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-5 border border-emerald-500/30 inline-block min-w-[280px]">
              <div className="text-xs text-slate-400 uppercase font-mono tracking-wider mb-2">Uzyskane punkty:</div>
              <div className="flex justify-center gap-6">
                {freedomEarned !== 0 && (
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-lg">
                    🌈 <span className="text-sm font-normal text-slate-300">Wolność:</span> {freedomEarned > 0 ? `+${freedomEarned}` : freedomEarned}
                  </div>
                )}
                {orderEarned !== 0 && (
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-lg">
                    🔷 <span className="text-sm font-normal text-slate-300">Ład:</span> {orderEarned > 0 ? `+${orderEarned}` : orderEarned}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onWin(freedomEarned, orderEarned)}
              id="minigame-claim-btn"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition transform"
            >
              Kontynuuj Przygodę
            </button>
          </motion.div>
        )}

        {gameState === 'lost' && (
          <motion.div
            key="lost"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 space-y-6"
          >
            <div className="inline-flex p-4 rounded-full bg-rose-500/20 border-2 border-rose-400 text-rose-400">
              <RotateCcw className="w-16 h-16 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-rose-400 font-sans tracking-tight">
                SPRÓBUJ PONOWNIE!
              </h3>
              <p className="text-slate-300 text-sm">
                Wieża się chwiała zbyt mocno lub skończył się czas. Nie poddawaj się!
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setGameState('playing')}
                id="minigame-retry-btn"
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition"
              >
                Powtórz Grę
              </button>
              <button
                onClick={onLose}
                id="minigame-giveup-btn"
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg hover:brightness-110 transition"
              >
                Pomiń (Uznaj porażkę)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🏰 1. FORT GAME: Drop objects on top of each other to stack a tower!
function FortGame({ onWin, onLose }: { onWin: (f: number, o: number) => void; onLose: () => void }) {
  const [items, setItems] = useState<{ id: number; y: number; width: number; color: string; label: string }[]>([
    { id: 0, y: 0, width: 140, color: 'bg-slate-700', label: 'Solidna Ławka' }
  ]);
  const [pivotX, setPivotX] = useState(50); // % of container width
  const [swingDir, setSwingDir] = useState(1);
  const [lives, setLives] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Swing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPivotX((prev) => {
        let next = prev + swingDir * 3;
        if (next >= 85) {
          setSwingDir(-1);
          return 85;
        }
        if (next <= 15) {
          setSwingDir(1);
          return 15;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [swingDir]);

  const dropItem = () => {
    sound.playClick();
    const itemTypes = [
      { width: 110, color: 'bg-amber-500', label: 'Miękka Poduszka' },
      { width: 95, color: 'bg-cyan-500', label: 'Kartonowy Domek' },
      { width: 80, color: 'bg-rose-500', label: 'Krzesełko' },
      { width: 70, color: 'bg-emerald-500', label: 'Pluszowy Misiek' },
      { width: 60, color: 'bg-purple-500', label: 'Flaga Tęczy' }
    ];

    const nextTypeIdx = items.length - 1;
    if (nextTypeIdx >= itemTypes.length) {
      // Already won!
      onWin(25, -10);
      return;
    }

    // Check alignment with the last stacked item
    const lastItem = items[items.length - 1];
    // Since this is a simple, highly playable game, we check if pivotX is close to 50 (or aligned).
    // Let's create an elegant visual check: if player drops between 35% and 65%, it stacks beautifully!
    const targetMin = 50 - lastItem.width / 5;
    const targetMax = 50 + lastItem.width / 5;

    if (pivotX >= targetMin && pivotX <= targetMax) {
      // Successful drop!
      sound.playBlock();
      const newItem = {
        id: items.length,
        y: items.length * 40,
        width: itemTypes[nextTypeIdx].width,
        color: itemTypes[nextTypeIdx].color,
        label: itemTypes[nextTypeIdx].label
      };
      const updated = [...items, newItem];
      setItems(updated);

      if (updated.length >= 6) {
        sound.playLevelUp();
        setTimeout(() => onWin(25, -10), 600);
      }
    } else {
      // Missed!
      sound.playHit();
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        sound.playFail();
        onLose();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs font-mono bg-slate-800 p-2 rounded-lg">
        <span className="text-amber-400">Wieża: {items.length - 1} / 5</span>
        <span className="text-rose-400">Równowaga: {'❤️'.repeat(lives)}</span>
      </div>

      <div ref={containerRef} className="relative h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-end p-4">
        {/* Swinger indicator */}
        {items.length < 6 && (
          <div
            className="absolute top-2 h-10 flex flex-col items-center"
            style={{ left: `${pivotX}%`, transform: 'translateX(-50%)', transition: 'none' }}
          >
            <div className="w-1 h-4 bg-slate-400" />
            <div className="px-2 py-0.5 rounded bg-pink-500 text-[10px] font-bold whitespace-nowrap shadow">
              {['Poduszka', 'Karton', 'Krzesełko', 'Miś', 'Flaga'][items.length - 1]}
            </div>
          </div>
        )}

        {/* Stack representation */}
        <div className="w-full flex flex-col items-center space-y-1 mt-auto">
          {items.map((it, idx) => (
            <motion.div
              key={it.id}
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              className={`h-8 ${it.color} rounded-md shadow-md border border-white/20 flex items-center justify-center text-[10px] font-extrabold text-slate-950 font-sans`}
              style={{ width: `${it.width}px` }}
            >
              {it.label}
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={dropItem}
        id="drop-block-btn"
        className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-3 rounded-lg shadow-lg"
      >
        PUŚĆ ELEMENT! (Spacją lub Kliknięciem)
      </button>
    </div>
  );
}

// 🎨 2. PAINT GAME: Brush/click cells to color the mural!
function PaintGame({ onWin }: { onWin: (f: number, o: number) => void }) {
  const GRID_SIZE = 6;
  const initialGrid = Array(GRID_SIZE * GRID_SIZE).fill('#1e293b'); // Dark gray
  const [grid, setGrid] = useState<string[]>(initialGrid);
  const [selectedColor, setSelectedColor] = useState('#fbbf24'); // Yellow Amber
  const [paintCount, setPaintCount] = useState(0);

  const colors = [
    { value: '#fbbf24', name: 'Złoto Słońca', faction: 'NAUCZYCIELKI' },
    { value: '#ec4899', name: 'Róż Duszka', faction: 'NAUCZYCIELKI' },
    { value: '#60a5fa', name: 'Błękit Ładu', faction: 'TERAPEUTKI' },
    { value: '#2dd4bf', name: 'Menta Spokoju', faction: 'TERAPEUTKI' },
    { value: '#a78bfa', name: 'Fiolet Ciszy', faction: 'TERAPEUTKI' }
  ];

  const paintCell = (idx: number) => {
    sound.playPaint();
    const nextGrid = [...grid];
    nextGrid[idx] = selectedColor;
    setGrid(nextGrid);

    // Calculate percent painted
    const painted = nextGrid.filter(cell => cell !== '#1e293b').length;
    setPaintCount(painted);

    const percent = (painted / (GRID_SIZE * GRID_SIZE)) * 100;
    if (percent >= 85) {
      sound.playLevelUp();
      // Determine what flavor the painting has
      const freedomColorCount = nextGrid.filter(c => c === '#fbbf24' || c === '#ec4899').length;
      const orderColorCount = nextGrid.filter(c => c === '#60a5fa' || c === '#2dd4bf' || c === '#a78bfa').length;

      // Deliver stats based on colors
      if (freedomColorCount > orderColorCount) {
        onWin(20, 5);
      } else {
        onWin(5, 20);
      }
    }
  };

  const progressPercent = Math.min(Math.round((paintCount / (GRID_SIZE * GRID_SIZE)) * 100), 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs font-mono bg-slate-800 p-2 rounded-lg">
        <span>Ukończono muralu: {progressPercent}% / 85%</span>
        <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-amber-400 h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Palette */}
      <div className="flex gap-2 justify-center">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => { sound.playClick(); setSelectedColor(c.value); }}
            style={{ backgroundColor: c.value }}
            className={`w-10 h-10 rounded-full border-4 transition transform hover:scale-105 active:scale-95 ${selectedColor === c.value ? 'border-white scale-110 shadow-lg' : 'border-slate-800/80'}`}
            title={c.name}
          />
        ))}
      </div>

      {/* Grid Canvas */}
      <div className="grid grid-cols-6 gap-1 bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-sm mx-auto aspect-square">
        {grid.map((cellColor, idx) => (
          <div
            key={idx}
            onClick={() => paintCell(idx)}
            className="rounded cursor-crosshair transition duration-150 relative hover:brightness-125"
            style={{ backgroundColor: cellColor }}
          >
            {/* Subtle decorative grid cells layout representing Koloryduszek */}
            {idx === 14 || idx === 15 || idx === 20 || idx === 21 || idx === 26 || idx === 27 ? (
              <div className="absolute inset-0 border border-white/5 flex items-center justify-center text-[8px] opacity-20 pointer-events-none text-white">⭐</div>
            ) : null}
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 font-medium">
        Klikaj kafelki, aby nałożyć wybrany kolor. Przywróć magię Koloryduszka!
      </p>
    </div>
  );
}

// 📦 3. BLOCKS GAME: Drag/click blocks to place them in Faction boxes!
interface ToyBlock {
  id: number;
  shape: 'SQUARE' | 'CIRCLE' | 'TRIANGLE' | 'STAR' | 'CYLINDER' | 'HEXAGON';
  color: string;
  name: string;
  placedIn: 'NONE' | 'CHAOS' | 'SYMMETRY';
}

function BlocksGame({ onWin }: { onWin: (f: number, o: number) => void }) {
  const [blocks, setBlocks] = useState<ToyBlock[]>([
    { id: 1, shape: 'SQUARE', color: 'bg-amber-400', name: 'Złota Kostka', placedIn: 'NONE' },
    { id: 2, shape: 'CIRCLE', color: 'bg-rose-400', name: 'Różowa Kula', placedIn: 'NONE' },
    { id: 3, shape: 'TRIANGLE', color: 'bg-emerald-400', name: 'Zielona Piramida', placedIn: 'NONE' },
    { id: 4, shape: 'STAR', color: 'bg-purple-400', name: 'Fioletowa Gwiazda', placedIn: 'NONE' },
    { id: 5, shape: 'CYLINDER', color: 'bg-cyan-400', name: 'Niebieski Walec', placedIn: 'NONE' },
    { id: 6, shape: 'HEXAGON', color: 'bg-teal-400', name: 'Turkusowy Sześciokąt', placedIn: 'NONE' }
  ]);

  const placeBlock = (blockId: number, box: 'CHAOS' | 'SYMMETRY') => {
    sound.playBlock();
    const nextBlocks = blocks.map(b => b.id === blockId ? { ...b, placedIn: box } : b);
    setBlocks(nextBlocks);

    // If all are placed, calculate stats based on final location
    const unplaced = nextBlocks.filter(b => b.placedIn === 'NONE').length;
    if (unplaced === 0) {
      sound.playLevelUp();
      const chaosCount = nextBlocks.filter(b => b.placedIn === 'CHAOS').length;
      const symmetryCount = nextBlocks.filter(b => b.placedIn === 'SYMMETRY').length;

      // Standard outcomes
      if (chaosCount > symmetryCount) {
        onWin(20, -5);
      } else if (symmetryCount > chaosCount) {
        onWin(-5, 20);
      } else {
        onWin(10, 10);
      }
    }
  };

  const activeBlock = blocks.find(b => b.placedIn === 'NONE');

  return (
    <div className="space-y-6 py-2">
      {/* Target stats display */}
      <div className="text-center">
        <h4 className="text-sm font-semibold text-slate-300">Gdzie chcesz umieścić ten klocek?</h4>
      </div>

      <AnimatePresence mode="wait">
        {activeBlock ? (
          <motion.div
            key={activeBlock.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/60 max-w-[200px] mx-auto shadow"
          >
            {/* Geometric block presentation */}
            <div className={`w-16 h-16 ${activeBlock.color} rounded-lg flex items-center justify-center shadow-lg border-2 border-white/30 text-2xl mb-3`}>
              {activeBlock.shape === 'SQUARE' && '⬜'}
              {activeBlock.shape === 'CIRCLE' && '⚪'}
              {activeBlock.shape === 'TRIANGLE' && '🔺'}
              {activeBlock.shape === 'STAR' && '⭐'}
              {activeBlock.shape === 'CYLINDER' && '🥫'}
              {activeBlock.shape === 'HEXAGON' && '💠'}
            </div>
            <span className="text-sm font-bold text-white font-mono">{activeBlock.name}</span>
          </motion.div>
        ) : (
          <div className="text-center text-sm font-semibold text-emerald-400">Sortowanie zakończone!</div>
        )}
      </AnimatePresence>

      {/* Sorting buckets */}
      <div className="grid grid-cols-2 gap-4">
        {/* Creative Chaos Bucket (Teachers) */}
        <button
          onClick={() => activeBlock && placeBlock(activeBlock.id, 'CHAOS')}
          disabled={!activeBlock}
          className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 hover:from-amber-500/30 border-2 border-amber-500/30 hover:border-amber-400 rounded-xl p-4 text-center group transition active:scale-98"
        >
          <div className="text-3xl mb-1 group-hover:scale-110 transition">🌈</div>
          <h5 className="font-bold text-amber-300 text-sm">Kreatywny Bałagan</h5>
          <p className="text-[10px] text-slate-400 leading-tight mt-1">Zbuduj z nich zamek smoków! (+Wolność)</p>
          <div className="text-xs text-amber-400 font-mono mt-2">
            Złożono: {blocks.filter(b => b.placedIn === 'CHAOS').length}
          </div>
        </button>

        {/* Symmetrical Drawer Bucket (Therapists) */}
        <button
          onClick={() => activeBlock && placeBlock(activeBlock.id, 'SYMMETRY')}
          disabled={!activeBlock}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 hover:from-cyan-500/30 border-2 border-cyan-500/30 hover:border-cyan-400 rounded-xl p-4 text-center group transition active:scale-98"
        >
          <div className="text-3xl mb-1 group-hover:scale-110 transition">🔷</div>
          <h5 className="font-bold text-cyan-300 text-sm">Symetryczna Szuflada</h5>
          <p className="text-[10px] text-slate-400 leading-tight mt-1">Ułóż geometrycznie według norm. (+Ład)</p>
          <div className="text-xs text-cyan-400 font-mono mt-2">
            Złożono: {blocks.filter(b => b.placedIn === 'SYMMETRY').length}
          </div>
        </button>
      </div>
    </div>
  );
}

// 🎵 4. MOVEMENT GAME: Tap precisely in the green zone to dance/meditate!
function MovementGame({ onWin, onLose }: { onWin: (f: number, o: number) => void; onLose: () => void }) {
  const [pointer, setPointer] = useState(10); // 0 to 100
  const [movingDir, setMovingDir] = useState(1);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(7);

  // Speed increments based on score
  useEffect(() => {
    const speed = 25 - score * 1.5;
    const interval = setInterval(() => {
      setPointer((prev) => {
        let next = prev + movingDir * 4;
        if (next >= 95) {
          setMovingDir(-1);
          return 95;
        }
        if (next <= 5) {
          setMovingDir(1);
          return 5;
        }
        return next;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [movingDir, score]);

  const tapRhythm = () => {
    sound.playClick();
    // Green zone is between 40 and 60
    const isInGreen = pointer >= 38 && pointer <= 62;
    const nextAttempts = attempts - 1;
    setAttempts(nextAttempts);

    if (isInGreen) {
      sound.playUnlock();
      const nextScore = score + 1;
      setScore(nextScore);

      if (nextScore >= 5) {
        sound.playLevelUp();
        onWin(20, 15);
      }
    } else {
      // Failed tap
      sound.playHit();
      if (nextAttempts < (5 - score)) {
        sound.playFail();
        onLose();
      }
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex justify-between items-center text-xs font-mono bg-slate-800 p-2 rounded-lg">
        <span className="text-emerald-400">Rytm: {score} / 5</span>
        <span className="text-rose-400">Próby: {attempts}</span>
      </div>

      {/* Tapping track */}
      <div className="relative h-14 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center px-2">
        {/* Sweet spot indicator (Green) */}
        <div className="absolute left-[38%] right-[38%] top-0 bottom-0 bg-emerald-500/20 border-x-2 border-emerald-400/50 flex items-center justify-center">
          <div className="text-[10px] font-bold text-emerald-300 tracking-widest font-mono">RYTM</div>
        </div>

        {/* Moving needle */}
        <div
          className="absolute w-2 h-10 bg-pink-500 rounded shadow-lg shadow-pink-500/50"
          style={{ left: `${pointer}%`, transform: 'translateX(-50%)', transition: 'none' }}
        />
      </div>

      <button
        onClick={tapRhythm}
        id="tap-rhythm-btn"
        className="w-full bg-pink-500 hover:bg-pink-400 text-slate-950 font-extrabold py-4 rounded-xl shadow-lg shadow-pink-500/20 text-lg transition"
      >
        SKACZ! (Kliknij w zielonym polu)
      </button>

      <p className="text-center text-xs text-slate-400">
        Wychwyć idealny moment. Niebieski emiter i tęczowy zamek reagują na Twoją synchronizację!
      </p>
    </div>
  );
}

// 🔍 5. HIDDEN OBJECTS GAME: Search for 4 items in the locker room!
interface HiddenItem {
  id: string;
  name: string;
  found: boolean;
  left: string; // Style positions
  top: string;
  size: string;
  icon: string;
}

function HiddenObjectsGame({ onWin }: { onWin: (f: number, o: number) => void }) {
  const [items, setItems] = useState<HiddenItem[]>([
    { id: 'key', name: 'Klucz do Szafki 7', found: false, left: '78%', top: '38%', size: 'w-8 h-8', icon: '🔑' },
    { id: 'diary', name: 'Dziennik Terapeutek', found: false, left: '22%', top: '65%', size: 'w-10 h-10', icon: '📓' },
    { id: 'brush', name: 'Złoty Pędzel Basi', found: false, left: '50%', top: '15%', size: 'w-8 h-8', icon: '🖌️' },
    { id: 'bead', name: 'Koralik Kolorydusza', found: false, left: '88%', top: '80%', size: 'w-6 h-6', icon: '🔮' }
  ]);

  const clickItem = (id: string) => {
    sound.playUnlock();
    const updated = items.map(it => it.id === id ? { ...it, found: true } : it);
    setItems(updated);

    const allFound = updated.every(it => it.found);
    if (allFound) {
      sound.playLevelUp();
      setTimeout(() => onWin(15, 15), 600);
    }
  };

  return (
    <div className="space-y-4">
      {/* Item list */}
      <div className="grid grid-cols-2 gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-2 text-xs">
            <span className={`text-sm ${it.found ? 'opacity-30 line-through' : ''}`}>{it.icon} {it.name}</span>
            {it.found && <span className="text-emerald-400 font-bold font-mono">✔️</span>}
          </div>
        ))}
      </div>

      {/* Hidden scene container */}
      <div className="relative h-60 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950">
        {/* Background visual graphics represents messy locker room */}
        <div className="absolute inset-0 opacity-25 p-4 text-[10px] text-slate-400 pointer-events-none font-mono">
          <div>=== SZATNIA NR 2 ===</div>
          <div>SZAFKA_1: ubranka dzieci</div>
          <div>SZAFKA_2: klocki sensoryczne</div>
          <div>SZAFKA_3: buty zapasowe</div>
          <div>SZAFKA_7: ZABLOKOWANO (Wymaga klucza)</div>
        </div>

        {/* Clickable fake clutter objects */}
        <div className="absolute left-[30%] top-[40%] text-2xl cursor-default opacity-40 select-none">👕</div>
        <div className="absolute left-[65%] top-[20%] text-2xl cursor-default opacity-40 select-none">🧸</div>
        <div className="absolute left-[15%] top-[15%] text-2xl cursor-default opacity-40 select-none">🎒</div>
        <div className="absolute left-[45%] top-[70%] text-2xl cursor-default opacity-40 select-none">👢</div>

        {/* Real hidden items */}
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => !it.found && clickItem(it.id)}
            style={{ left: it.left, top: it.top }}
            className={`absolute ${it.size} flex items-center justify-center text-xl hover:scale-125 transition transform ${it.found ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-90'}`}
          >
            {it.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// 🧩 6. PUZZLE GAME: Rotate cells to align the electrical pipeline!
interface PipeNode {
  id: number;
  rotation: number; // 0, 90, 180, 270
  type: 'CORNER' | 'STRAIGHT' | 'T-SHAPE';
}

function PuzzleGame({ onWin }: { onWin: (f: number, o: number) => void }) {
  // A simple 3x3 pipe alignment puzzle
  const [pipes, setPipes] = useState<PipeNode[]>([
    { id: 0, rotation: 90, type: 'CORNER' },
    { id: 1, rotation: 180, type: 'STRAIGHT' },
    { id: 2, rotation: 0, type: 'CORNER' },
    { id: 3, rotation: 0, type: 'STRAIGHT' },
    { id: 4, rotation: 270, type: 'CORNER' },
    { id: 5, rotation: 90, type: 'STRAIGHT' },
    { id: 6, rotation: 180, type: 'CORNER' },
    { id: 7, rotation: 0, type: 'STRAIGHT' },
    { id: 8, rotation: 90, type: 'CORNER' }
  ]);

  const rotatePipe = (idx: number) => {
    sound.playClick();
    const nextPipes = pipes.map((p, i) => i === idx ? { ...p, rotation: (p.rotation + 90) % 360 } : p);
    setPipes(nextPipes);

    // Simplification check: to make it universally beatable and fun, the puzzle is solved
    // when a certain set of orientations match, or when the player has rotated at least 5 times and has them aligned reasonably.
    // Let's check for precise straight connection from left to right (nodes: 3, 4, 5 align at specific rotations, or 0, 1, 2)
    // To make it super satisfying, we verify if specific nodes are correctly aligned. Let's do a simple count:
    const solved = nextPipes[1].rotation === 0 || nextPipes[1].rotation === 180;
    const solvedCenter = nextPipes[4].rotation === 90 || nextPipes[4].rotation === 270;
    const solvedRight = nextPipes[7].rotation === 0 || nextPipes[7].rotation === 180;

    if (solved && solvedCenter && solvedRight) {
      sound.playLevelUp();
      setTimeout(() => onWin(15, 25), 600);
    }
  };

  const forceSolve = () => {
    // Solves it automatically as fallback
    onWin(15, 25);
  };

  return (
    <div className="space-y-4 py-2">
      <div className="text-center">
        <h4 className="text-sm font-semibold text-slate-300">Klikaj rury, aby je obracać i połączyć obwód!</h4>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-[280px] mx-auto aspect-square">
        {pipes.map((pipe, idx) => (
          <button
            key={pipe.id}
            onClick={() => rotatePipe(idx)}
            style={{ transform: `rotate(${pipe.rotation}deg)` }}
            className="bg-slate-800 rounded-lg flex items-center justify-center p-3 hover:bg-slate-700 transition transform border border-slate-700/60"
          >
            {/* Vector representations of pipes using Unicode symbols */}
            {pipe.type === 'CORNER' && <span className="text-3xl font-extrabold text-cyan-400">╝</span>}
            {pipe.type === 'STRAIGHT' && <span className="text-3xl font-extrabold text-amber-400">║</span>}
            {pipe.type === 'T-SHAPE' && <span className="text-3xl font-extrabold text-pink-400">╠</span>}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={forceSolve}
          className="w-full bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 py-2 rounded-lg"
        >
          Pomiń i złam zamek automatycznie
        </button>
      </div>
    </div>
  );
}
