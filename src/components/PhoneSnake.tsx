import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Play, RotateCcw, Award, Trophy, Hash, 
  ArrowUp, ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight, 
  Volume2, VolumeX, Sparkles, Lock, ShieldAlert,
  ChevronRight, Compass, Smile, Baby, Home
} from 'lucide-react';
import { sound } from './SoundManager';

interface PhoneSnakeProps {
  onClose: () => void;
  username: string;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameMode = 'adventure' | 'endless';
type FoodType = 'child' | 'diamond' | 'gold_diamond';

interface Position {
  x: number;
  y: number;
}

interface MapConfig {
  id: number;
  name: string;
  theme: string; // Tailwind gradient for the header/UI card
  gridBg: string; // Tailwind bg for active grid
  borderColor: string;
  accentGlow: string;
  snakeHead: string;
  snakeBody: string;
  portalColor: string; // Transition door colors
  targetLength: number; // Children needed to open door
  obstacles: Position[];
  speed: number; // Tick interval in ms
  description: string;
}

// 7 Kindergarten Locations for Adventure Mode matching Przedszkole BAJA
const MAPS: MapConfig[] = [
  {
    id: 1,
    name: 'Poziom 1: Korytarz Przedszkola',
    theme: 'from-amber-100 to-orange-100 text-amber-900',
    gridBg: 'bg-amber-50/70',
    borderColor: 'border-amber-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
    snakeHead: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm border border-white',
    snakeBody: 'bg-orange-300 border border-white/60',
    portalColor: 'bg-amber-400 border-amber-600',
    targetLength: 12,
    obstacles: [],
    speed: 180,
    description: 'Przejdź przez jasny korytarz przedszkola BAJA i zbierz pierwsze maluchy do wężyka!'
  },
  {
    id: 2,
    name: 'Poziom 2: Kolorowa Szatnia',
    theme: 'from-sky-100 to-blue-100 text-sky-900',
    gridBg: 'bg-sky-50/70',
    borderColor: 'border-sky-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(56,189,248,0.2)]',
    snakeHead: 'bg-gradient-to-br from-sky-400 to-blue-500 shadow-sm border border-white',
    snakeBody: 'bg-sky-300 border border-white/60',
    portalColor: 'bg-sky-400 border-sky-600',
    targetLength: 18,
    obstacles: [
      { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 },
      { x: 10, y: 7 }, { x: 11, y: 7 }, { x: 12, y: 7 }
    ],
    speed: 165,
    description: 'Szatnia pełna kolorowych szafek. Omijaj rzędy ławeczek i pomóż dzieciom dołączyć do grupy!'
  },
  {
    id: 3,
    name: 'Poziom 3: Tęczowa Sala Zabaw',
    theme: 'from-pink-100 to-rose-100 text-pink-900',
    gridBg: 'bg-pink-50/70',
    borderColor: 'border-pink-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(244,114,182,0.2)]',
    snakeHead: 'bg-gradient-to-br from-pink-400 to-rose-500 shadow-sm border border-white',
    snakeBody: 'bg-pink-300 border border-white/60',
    portalColor: 'bg-pink-400 border-pink-600',
    targetLength: 24,
    obstacles: [
      { x: 3, y: 3 }, { x: 11, y: 3 }, { x: 3, y: 11 }, { x: 11, y: 11 },
      { x: 7, y: 7 }
    ],
    speed: 150,
    description: 'Sala pełna porozrzucanych zabawek. Uważaj na pudła z klockami i pluszowe misie!'
  },
  {
    id: 4,
    name: 'Poziom 4: Wesoła Stołówka',
    theme: 'from-yellow-100 to-amber-100 text-amber-900',
    gridBg: 'bg-yellow-50/70',
    borderColor: 'border-yellow-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(234,179,8,0.2)]',
    snakeHead: 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-sm border border-white',
    snakeBody: 'bg-yellow-300 border border-white/60',
    portalColor: 'bg-yellow-400 border-yellow-600',
    targetLength: 30,
    obstacles: [
      { x: 5, y: 4 }, { x: 5, y: 5 }, { x: 5, y: 6 },
      { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }
    ],
    speed: 135,
    description: 'Stołówka w czasie obiadu. Omijaj krzesełka oraz stoliki i uważaj na pyszny kompot!'
  },
  {
    id: 5,
    name: 'Poziom 5: Sala Gimnastyczna',
    theme: 'from-indigo-100 to-violet-100 text-indigo-900',
    gridBg: 'bg-indigo-50/70',
    borderColor: 'border-indigo-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(99,102,241,0.2)]',
    snakeHead: 'bg-gradient-to-br from-indigo-400 to-violet-500 shadow-sm border border-white',
    snakeBody: 'bg-indigo-300 border border-white/60',
    portalColor: 'bg-indigo-400 border-indigo-600',
    targetLength: 36,
    obstacles: [
      { x: 2, y: 2 }, { x: 12, y: 2 }, { x: 2, y: 12 }, { x: 12, y: 12 },
      { x: 7, y: 4 }, { x: 7, y: 10 }
    ],
    speed: 120,
    description: 'Czas na gimnastykę! Omijaj słupki treningowe, pachołki oraz piłki lekarskie!'
  },
  {
    id: 6,
    name: 'Poziom 6: Zielony Ogród',
    theme: 'from-emerald-100 to-green-100 text-emerald-900',
    gridBg: 'bg-emerald-50/70',
    borderColor: 'border-emerald-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    snakeHead: 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-sm border border-white',
    snakeBody: 'bg-emerald-300 border border-white/60',
    portalColor: 'bg-emerald-400 border-emerald-600',
    targetLength: 42,
    obstacles: [
      { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
      { x: 9, y: 9 }, { x: 10, y: 9 }, { x: 11, y: 9 }
    ],
    speed: 105,
    description: 'Słoneczny ogród przedszkolny. Omijaj donice z pięknymi kwiatami i krzewy!'
  },
  {
    id: 7,
    name: 'Poziom 7: Bajkowy Plac Zabaw',
    theme: 'from-teal-100 to-emerald-100 text-teal-900',
    gridBg: 'bg-teal-50/70',
    borderColor: 'border-teal-400/60',
    accentGlow: 'shadow-[0_0_15px_rgba(20,184,166,0.2)]',
    snakeHead: 'bg-gradient-to-br from-teal-400 to-emerald-500 shadow-sm border border-white',
    snakeBody: 'bg-teal-300 border border-white/60',
    portalColor: 'bg-teal-400 border-teal-600',
    targetLength: 50,
    obstacles: [
      { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 },
      { x: 12, y: 12 }, { x: 11, y: 12 }, { x: 12, y: 11 },
      { x: 7, y: 7 }, { x: 6, y: 7 }, { x: 8, y: 7 }
    ],
    speed: 90,
    description: 'Wielki finał na placu zabaw! Omijaj piaskownice, drewniane płotki oraz zjeżdżalnie!'
  }
];

// Beautiful set of emojis for children in the conga line
const childEmojis = ['👦', '👧', '🧒', '👶', '🧑', '👱', '👨‍🦱', '👩‍🦰', '👧', '👦'];

const getChildEmoji = (index: number): string => {
  if (index === 0) return '🧑‍🏫'; // Pani Ania leading the group!
  return childEmojis[(index - 1) % childEmojis.length];
};

const getObstacleEmoji = (mapId: number): string => {
  switch (mapId) {
    case 2: return '🗄️'; // Szatnia (Szafki)
    case 3: return '🧸'; // Sala zabaw (Zabawki)
    case 4: return '🪑'; // Stołówka (Krzesełka)
    case 5: return '🏀'; // Sala gimnastyczna (Piłki)
    case 6: return '🪴'; // Ogród (Doniczki)
    case 7: return '🛝'; // Plac zabaw (Zjeżdżalnie)
    default: return '🧱';
  }
};

export default function PhoneSnake({ onClose, username }: PhoneSnakeProps) {
  // Mode selection & navigation
  const [activeTab, setActiveTab] = useState<'menu' | 'selectMap' | 'game'>('menu');
  const [selectedMode, setSelectedMode] = useState<GameMode>('endless');
  const [currentMapId, setCurrentMapId] = useState<number>(1);

  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelCleared, setIsLevelCleared] = useState(false);
  const [score, setScore] = useState(0);

  // Stats to load & persist
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [highestMapReached, setHighestMapReached] = useState(1);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Sound configurations
  const [isMuted, setIsMuted] = useState(false);

  // Touch swipe refs
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const minSwipeDistance = 30; // pixels
  const gridRef = useRef<HTMLDivElement>(null);

  // Constants
  const GRID_SIZE = 15;

  // Snake coordinates & movement
  const [snake, setSnake] = useState<Position[]>([]);
  const [food, setFood] = useState<Position>({ x: 3, y: 3 });
  const [foodType, setFoodType] = useState<FoodType>('child');
  const [portal, setPortal] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>('UP');

  // Get active map config
  const activeMap = MAPS.find(m => m.id === currentMapId) || MAPS[0];

  // Reference for direction to prevent frame queue issues
  const directionRef = useRef<Direction>('UP');
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation and rendering optimization states
  const [disableTransition, setDisableTransition] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(180);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const obstacleSet = useRef<Set<string>>(new Set());

  // Update obstacle lookup Set whenever map or mode changes
  useEffect(() => {
    const set = new Set<string>();
    const obstacles = selectedMode === 'adventure' ? activeMap.obstacles : [];
    obstacles.forEach(o => set.add(`${o.x},${o.y}`));
    obstacleSet.current = set;
  }, [selectedMode, activeMap]);

  // Load persistence stats on mount
  useEffect(() => {
    const statsKey = `snake_stats_${username}`;
    const saved = localStorage.getItem(statsKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHighScore(parsed.highScore || 0);
        setLastScore(parsed.lastScore || 0);
        setHighestMapReached(parsed.highestMap || 1);
        setGamesPlayed(parsed.gamesPlayed || 0);
      } catch (e) {
        console.error("Error reading snake stats:", e);
      }
    }
  }, [username, activeTab]);

  // Save/Update stats helper
  const saveStats = (finalScore: number, mapClearedId?: number) => {
    const statsKey = `snake_stats_${username}`;
    const newHighScore = selectedMode === 'endless' ? Math.max(highScore, finalScore) : highScore;
    const newGamesPlayed = gamesPlayed + 1;
    let newHighestMap = highestMapReached;

    if (mapClearedId && mapClearedId >= highestMapReached && mapClearedId < 7) {
      newHighestMap = mapClearedId + 1;
    }

    setHighScore(newHighScore);
    setLastScore(finalScore);
    setGamesPlayed(newGamesPlayed);
    setHighestMapReached(newHighestMap);

    localStorage.setItem(statsKey, JSON.stringify({
      highScore: newHighScore,
      lastScore: finalScore,
      highestMap: newHighestMap,
      gamesPlayed: newGamesPlayed
    }));
  };

  // Sound trigger wrapper
  const playLocalSound = (type: 'eat' | 'die' | 'click' | 'victory' | 'portal') => {
    if (isMuted) return;
    try {
      if (type === 'eat') {
        sound.playSuccess();
      } else if (type === 'die') {
        sound.playFail();
      } else if (type === 'victory') {
        sound.playSuccess();
      } else if (type === 'portal') {
        sound.playUnlock();
      } else {
        sound.playClick();
      }
    } catch (e) {
      // Ignored
    }
  };

  // Safe starting positions avoiding map obstacles
  const getSafeStartingPositions = (mapId: number): Position[] => {
    if (mapId === 3) {
      return [
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 5, y: 9 }
      ];
    }
    if (mapId === 4) {
      return [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 }
      ];
    }
    if (mapId === 5) {
      return [
        { x: 7, y: 7 },
        { x: 7, y: 8 },
        { x: 7, y: 9 }
      ];
    }
    if (mapId === 6 || mapId === 7) {
      return [
        { x: 6, y: 6 },
        { x: 6, y: 7 },
        { x: 6, y: 8 }
      ];
    }
    // Map 1 & 2
    return [
      { x: 7, y: 10 },
      { x: 7, y: 11 },
      { x: 7, y: 12 }
    ];
  };

  // Spawns exit door in a safe place closest to center
  const spawnPortal = (currentSnake: Position[], mapObstacles: Position[]) => {
    const centerOptions = [
      { x: 7, y: 7 },
      { x: 7, y: 6 },
      { x: 6, y: 7 },
      { x: 8, y: 7 },
      { x: 7, y: 8 }
    ];

    // Find the first option not on obstacle or snake
    for (const pos of centerOptions) {
      const onObstacle = mapObstacles.some(o => o.x === pos.x && o.y === pos.y);
      const onSnake = currentSnake.some(s => s.x === pos.x && s.y === pos.y);
      if (!onObstacle && !onSnake) {
        setPortal(pos);
        return;
      }
    }

    // Fallback: search row by row
    for (let y = 3; y < GRID_SIZE - 3; y++) {
      for (let x = 3; x < GRID_SIZE - 3; x++) {
        const onObstacle = mapObstacles.some(o => o.x === x && o.y === y);
        const onSnake = currentSnake.some(s => s.x === x && s.y === y);
        if (!onObstacle && !onSnake) {
          setPortal({ x, y });
          return;
        }
      }
    }
    setPortal({ x: 7, y: 5 }); // absolute fallback
  };

  // Generate safe food coordinates
  const generateFood = (currentSnake: Position[], mapObstacles: Position[], currentPortal: Position | null): Position => {
    let newFood: Position;
    let attempts = 0;
    let onObstacle = false;
    let onSnake = false;
    let onPortal = false;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      onObstacle = mapObstacles.some(o => o.x === newFood.x && o.y === newFood.y);
      onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
      onPortal = currentPortal !== null && currentPortal.x === newFood.x && currentPortal.y === newFood.y;
      attempts++;
    } while ((onObstacle || onSnake || onPortal) && attempts < 150);

    return newFood;
  };

  // Spawns new food with a randomized reward type
  const spawnNewFood = (currentSnake: Position[], mapObstacles: Position[], currentPortal: Position | null) => {
    const pos = generateFood(currentSnake, mapObstacles, currentPortal);
    setFood(pos);

    // Probability: 55% child, 30% blue diamond, 15% gold star/diamond
    const rand = Math.random();
    if (rand < 0.55) {
      setFoodType('child');
    } else if (rand < 0.85) {
      setFoodType('diamond');
    } else {
      setFoodType('gold_diamond');
    }
  };

  // Initialize Game Play Setup
  const initGame = (mode: GameMode, mapId: number) => {
    playLocalSound('click');
    setSelectedMode(mode);
    setCurrentMapId(mapId);
    
    // Disable slide animation during placement
    setDisableTransition(true);
    setTimeout(() => setDisableTransition(false), 50);
    setBursts([]);

    const obstacles = mode === 'adventure' ? (MAPS.find(m => m.id === mapId)?.obstacles || []) : [];
    const startingSnake = getSafeStartingPositions(mode === 'adventure' ? mapId : 1);
    
    // Set initial speed config matching the selected map
    const baseSpeed = mode === 'adventure' ? (MAPS.find(m => m.id === mapId)?.speed || 180) : 180;
    setCurrentSpeed(baseSpeed);

    setSnake(startingSnake);
    setPortal(null);
    setDirection('UP');
    directionRef.current = 'UP';
    setScore(0);
    setIsGameOver(false);
    setIsLevelCleared(false);
    setIsPlaying(true);
    setActiveTab('game');

    // Trigger initial food spawn
    spawnNewFood(startingSnake, obstacles, null);
  };

  // Trigger GameOver
  const triggerGameOver = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    playLocalSound('die');
    saveStats(score);
  };

  // Trigger Victory (Map complete)
  const triggerVictory = () => {
    setIsPlaying(false);
    setIsLevelCleared(true);
    playLocalSound('victory');
    saveStats(score, currentMapId);
  };

  // Step movement tick
  const moveSnake = () => {
    setSnake(prevSnake => {
      if (prevSnake.length === 0) return prevSnake;

      const head = prevSnake[0];
      const curDir = directionRef.current;
      
      let newHead = { ...head };
      switch (curDir) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      const mapObstacles = selectedMode === 'adventure' ? activeMap.obstacles : [];

      // 1. Boundary hit
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        setTimeout(() => triggerGameOver(), 0);
        return prevSnake;
      }

      // 2. Obstacle collision
      if (mapObstacles.some(o => o.x === newHead.x && o.y === newHead.y)) {
        setTimeout(() => triggerGameOver(), 0);
        return prevSnake;
      }

      // 3. Self-Collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setTimeout(() => triggerGameOver(), 0);
        return prevSnake;
      }

      // 4. Portal Check (Adventure mode)
      if (selectedMode === 'adventure' && portal && newHead.x === portal.x && newHead.y === portal.y) {
        setTimeout(() => triggerVictory(), 0);
        return prevSnake;
      }

      const updatedSnake = [newHead, ...prevSnake];

      // 5. Food Ingestion
      if (newHead.x === food.x && newHead.y === food.y) {
        playLocalSound('eat');
        
        // Point scoring matching item type
        let points = 10;
        if (foodType === 'diamond') points = 15;
        if (foodType === 'gold_diamond') points = 30;
        
        setScore(s => s + points);
        
        // Spawn beautiful glow/light burst at food coordinates
        const burstId = Date.now() + Math.random();
        const eatenX = food.x;
        const eatenY = food.y;
        setBursts(prev => [...prev, { id: burstId, x: eatenX, y: eatenY }]);
        setTimeout(() => {
          setBursts(prev => prev.filter(b => b.id !== burstId));
        }, 600);

        // Spawn portal trigger check for Adventure mode
        const nextLen = updatedSnake.length;
        if (selectedMode === 'adventure' && nextLen >= activeMap.targetLength && !portal) {
          playLocalSound('portal');
          spawnPortal(updatedSnake, mapObstacles);
          // Set safe outer coordinates for food to let player enter portal
          spawnNewFood(updatedSnake, mapObstacles, { x: 7, y: 7 });
        } else {
          spawnNewFood(updatedSnake, mapObstacles, portal);
        }
      } else {
        updatedSnake.pop(); // normal movement removes tail
      }

      return updatedSnake;
    });
  };

  // Keyboard controls
  const changeDirection = (newDir: Direction) => {
    const opps = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };
    if (opps[newDir] !== directionRef.current) {
      setDirection(newDir);
      directionRef.current = newDir;
    }
  };

  // Quadrant-based click/touch steering logic
  const handleTouchOrClickInput = (clientX: number, clientY: number) => {
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const rect = gridEl.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const w = rect.width;
    const h = rect.height;
    
    const centerX = w / 2;
    const centerY = h / 2;
    
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Select direction by determining which quadrant the click/tap is located in
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        changeDirection('RIGHT');
      } else {
        changeDirection('LEFT');
      }
    } else {
      if (dy > 0) {
        changeDirection('DOWN');
      } else {
        changeDirection('UP');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'game' || !isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, activeTab]);

  // Main game interval
  useEffect(() => {
    if (activeTab === 'game' && isPlaying && !isGameOver && !isLevelCleared) {
      const baseSpeed = selectedMode === 'adventure' ? activeMap.speed : 180;
      // Slight speedup as food is eaten
      const speed = Math.max(75, baseSpeed - Math.floor(score / 40) * 10);
      
      // Keep transition speed synchronized with game ticks for 100% butter fluidity!
      setCurrentSpeed(speed);

      gameIntervalRef.current = setInterval(() => {
        moveSnake();
      }, speed);
    }

    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
    };
  }, [isPlaying, isGameOver, isLevelCleared, score, activeTab, selectedMode, currentMapId]);

  // Touch handlers for Mobile Swipe and Tap controls attached directly to prevent mobile browser scrolling
  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const handleTouchStartRaw = (e: TouchEvent) => {
      if (activeTab !== 'game' || !isPlaying) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      
      // Tap control: steer immediately based on screen quadrant
      handleTouchOrClickInput(touch.clientX, touch.clientY);
    };

    const handleTouchMoveRaw = (e: TouchEvent) => {
      if (activeTab !== 'game' || !isPlaying || isGameOver || !touchStartRef.current) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            changeDirection('RIGHT');
          } else {
            changeDirection('LEFT');
          }
        } else {
          if (deltaY > 0) {
            changeDirection('DOWN');
          } else {
            changeDirection('UP');
          }
        }
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEndRaw = (e: TouchEvent) => {
      touchStartRef.current = null;
    };

    gridEl.addEventListener('touchstart', handleTouchStartRaw, { passive: false });
    gridEl.addEventListener('touchmove', handleTouchMoveRaw, { passive: false });
    gridEl.addEventListener('touchend', handleTouchEndRaw, { passive: false });

    return () => {
      gridEl.removeEventListener('touchstart', handleTouchStartRaw);
      gridEl.removeEventListener('touchmove', handleTouchMoveRaw);
      gridEl.removeEventListener('touchend', handleTouchEndRaw);
    };
  }, [activeTab, isPlaying, isGameOver]);

  return (
    <div className="absolute inset-0 bg-[#0c0806] flex flex-col z-50 text-slate-100 select-none overflow-hidden font-sans">
      {/* Header bar - Warm & playful kids styling with premium dark mode */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#1e100a] via-[#120704] to-[#1e100a] border-b border-white/10 flex items-center justify-between shadow-sm shrink-0">
        <button 
          onClick={() => {
            playLocalSound('click');
            if (activeTab === 'game') {
              setIsPlaying(false);
              setActiveTab('menu');
            } else if (activeTab === 'selectMap') {
              setActiveTab('menu');
            } else {
              onClose();
            }
          }}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 font-bold border border-white/10 shadow-sm transition-all active:scale-95 flex items-center gap-1 text-[11px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Powrót</span>
        </button>

        <span className="text-xs font-black tracking-wider uppercase text-amber-400 flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          🎒 WĘŻYK Ylla
        </span>

        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className="p-1.5 rounded-xl bg-white/5 text-amber-400 hover:bg-white/10 border border-white/10 shadow-sm transition"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between gap-4 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* LOBBY / MENU TAB */}
          {activeTab === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-1 flex flex-col justify-center gap-4 py-2"
            >
              {/* Game Poster Cover */}
              <div className="bg-black/40 rounded-3xl p-5 border border-[#ff9068]/20 text-center relative overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.1),transparent_70%)]" />
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#f59e0b] p-0.5 flex items-center justify-center shadow-lg mb-4">
                  <span className="text-3xl">🧑‍🏫</span>
                </div>

                <h1 className="text-lg font-black uppercase tracking-wider text-amber-400">
                  Przedszkolny Wężyk
                </h1>
                <p className="text-[10px] text-amber-200/50 uppercase tracking-widest font-bold mt-1">
                  Świat Przedszkola BAJA
                </p>

                {/* Score Stats Dashboard */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <div className="bg-black/30 rounded-2xl p-2.5 border border-white/5">
                    <div className="flex justify-center mb-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400 font-bold" />
                    </div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Rekord Endless</span>
                    <strong className="text-sm font-black text-amber-300 block mt-0.5">{highScore}</strong>
                  </div>

                  <div className="bg-black/30 rounded-2xl p-2.5 border border-white/5">
                    <div className="flex justify-center mb-1">
                      <Compass className="w-3.5 h-3.5 text-sky-400 font-bold" />
                    </div>
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Ukończone Sale</span>
                    <strong className="text-sm font-black text-sky-400 block mt-0.5">{highestMapReached} / 7</strong>
                  </div>

                  <div className="bg-black/30 rounded-2xl p-2.5 border border-white/5 col-span-2 flex items-center justify-around">
                    <div className="text-center">
                      <span className="text-[8px] uppercase text-slate-400 font-bold">Ostatni Wynik</span>
                      <strong className="text-xs font-black text-orange-400 block">{lastScore}</strong>
                    </div>
                    <div className="h-6 w-[1px] bg-white/10" />
                    <div className="text-center">
                      <span className="text-[8px] uppercase text-slate-400 font-bold">Rozegrane spacerki</span>
                      <strong className="text-xs font-black text-violet-400 block">{gamesPlayed}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode Select Buttons */}
              <div className="flex flex-col gap-2.5">
                {/* ADVENTURE MODE BUTTON */}
                <button
                  onClick={() => {
                    playLocalSound('click');
                    setActiveTab('selectMap');
                  }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-600/15 hover:bg-white/5 border border-amber-500/30 text-left relative overflow-hidden shadow-sm transition active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">Spacer Przedszkolny</span>
                      <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider mt-1.5 flex items-center gap-1">
                        🚀 Tryb Przygody (Kampania)
                      </h3>
                      <p className="text-[10px] text-amber-200/60 mt-0.5">
                        Pokonuj kolejne sale i otwieraj drzwi do innych pomieszczeń!
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-amber-400/60" />
                  </div>
                </button>

                {/* ENDLESS MODE BUTTON */}
                <button
                  onClick={() => initGame('endless', 1)}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-600/15 hover:bg-white/5 border border-emerald-500/30 text-left relative overflow-hidden shadow-sm transition active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">Nieskończona zabawa</span>
                      <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider mt-1.5 flex items-center gap-1">
                        🌌 Tryb Endless (Bez końca)
                      </h3>
                      <p className="text-[10px] text-emerald-200/60 mt-0.5">
                        Spokojny spacer po korytarzu bez dodatkowych przeszkód i drzwi.
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-emerald-400/60" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* MAP SELECTOR TAB */}
          {activeTab === 'selectMap' && (
            <motion.div 
              key="selectMap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-4 py-2"
            >
              <div className="flex items-center justify-between bg-black/40 px-3.5 py-2.5 rounded-2xl border border-white/10">
                <div>
                  <h2 className="text-xs font-black uppercase tracking-wider text-amber-400">Wybierz Salę</h2>
                  <p className="text-[9px] text-slate-400 font-bold">Otwieraj drzwi i zbieraj dzieci do spacerowego wężyka</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                  Odblokowano: {highestMapReached}/7
                </span>
              </div>

              <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 max-h-[380px]">
                {MAPS.map((map) => {
                  const isLocked = map.id > highestMapReached;
                  
                  return (
                    <div 
                      key={map.id}
                      className={`rounded-2xl border transition-all relative overflow-hidden ${
                        isLocked 
                          ? 'bg-black/25 border-white/5 text-slate-600' 
                          : 'bg-black/40 border-white/10 hover:border-amber-500/30 hover:bg-black/50 shadow-sm'
                      }`}
                    >
                      <div className="p-3.5 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                              isLocked ? 'bg-white/5 text-slate-500' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            }`}>
                              SALA {map.id}
                            </span>
                            <span className={`text-xs font-bold truncate uppercase ${isLocked ? 'text-slate-500' : 'text-white'}`}>
                              {map.name.split(': ')[1]}
                            </span>
                          </div>
                          
                          <p className={`text-[10px] mt-1 line-clamp-2 ${isLocked ? 'text-slate-600/60' : 'text-slate-300'}`}>
                            {map.description}
                          </p>
                          
                          <div className="flex items-center gap-3 mt-2 text-[9px] text-slate-400 font-bold">
                            <span className="flex items-center gap-1">
                              👶 Cel: <strong className="text-amber-400 font-black">{map.targetLength}</strong> dzieci
                            </span>
                            <span className="flex items-center gap-1">
                              ⚡ Przeszkoda: <strong className="text-sky-400 font-black">{getObstacleEmoji(map.id)}</strong>
                            </span>
                          </div>
                        </div>

                        {isLocked ? (
                          <div className="p-2 rounded-xl bg-white/5 text-slate-500 shrink-0 border border-white/10">
                            <Lock className="w-4 h-4" />
                          </div>
                        ) : (
                          <button
                            onClick={() => initGame('adventure', map.id)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-amber-950 text-[10px] font-black tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-sm"
                          >
                            Wejdź
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ACTIVE PLAYING SCREEN */}
          {activeTab === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-between gap-3"
            >
              {/* Dynamic game status headers */}
              <div className="flex justify-between items-center bg-black/40 px-3.5 py-2.5 rounded-2xl border border-white/10 shadow-sm shrink-0 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full animate-ping shrink-0 ${
                    selectedMode === 'adventure' ? 'bg-orange-500' : 'bg-emerald-500'
                  }`} />
                  <div className="truncate">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                      {selectedMode === 'adventure' ? `Przygoda: Poziom ${currentMapId}` : 'Nieskończony spacer'}
                    </span>
                    <span className="text-xs font-black truncate block text-white">
                      {selectedMode === 'adventure' ? activeMap.name.split(': ')[1] : 'Spokojny spacer'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-bold">
                  <div className="text-right">
                    <span className="text-[8px] text-slate-400 block uppercase">Wynik</span>
                    <strong className="text-sm font-black text-amber-400">{score}</strong>
                  </div>
                  {selectedMode === 'adventure' && (
                    <div className="text-right border-l border-white/10 pl-3">
                      <span className="text-[8px] text-slate-400 block uppercase">Grupa</span>
                      <strong className="text-sm font-black text-orange-400">
                        {snake.length} <span className="text-[9px] text-slate-400">/{activeMap.targetLength}</span>
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Portal availability progress strip */}
              {selectedMode === 'adventure' && (
                <div className="bg-black/30 border border-white/10 px-3 py-1.5 rounded-xl text-center text-[10px] shrink-0 flex items-center justify-center gap-2 shadow-sm">
                  {snake.length >= activeMap.targetLength ? (
                    <span className="text-emerald-400 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                      🚪 DRZWI OTWARTE! Wejdź w drzwi na planszy, aby przejść do kolejnej sali!
                    </span>
                  ) : (
                    <span className="text-slate-300 font-bold">
                      Zbierz jeszcze <strong className="text-amber-400">{activeMap.targetLength - snake.length}</strong> maluchów, aby otworzyć drzwi do następnego poziomu.
                    </span>
                  )}
                </div>
              )}

              {/* Grid Game Canvas with click support for desktops and seamless gap alignment */}
              <div 
                ref={gridRef}
                onClick={(e) => {
                  if (activeTab === 'game' && isPlaying && !isGameOver && !isLevelCleared) {
                    handleTouchOrClickInput(e.clientX, e.clientY);
                  }
                }}
                className={`aspect-square w-full max-w-[325px] mx-auto bg-[#130906] rounded-3xl border-2 p-1.5 relative overflow-hidden shadow-md transition-all duration-300 touch-none cursor-pointer ${
                  selectedMode === 'adventure' ? activeMap.borderColor + ' ' + activeMap.accentGlow : 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
              >
                {/* Visual indicators for touching four sides of the grid */}
                <div className="absolute inset-2 pointer-events-none z-30 opacity-20 flex flex-col justify-between">
                  <div className="flex justify-center text-[10px] text-amber-300 animate-pulse">▲ DOTKNI GÓRY ▲</div>
                  <div className="flex justify-between items-center w-full px-1">
                    <div className="text-[10px] text-amber-300 animate-pulse">◀ LEWO</div>
                    <div className="text-[10px] text-amber-300 animate-pulse">PRAWO ▶</div>
                  </div>
                  <div className="flex justify-center text-[10px] text-amber-300 animate-pulse">▼ DOTKNI DOŁU ▼</div>
                </div>

                {/* Background grid layout - set gap to 0px so absolute overlay perfectly matches background cells */}
                <div className="grid h-full w-full gap-[0px] relative" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                  {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                    const x = idx % GRID_SIZE;
                    const y = Math.floor(idx / GRID_SIZE);

                    const isFoodSeg = food.x === x && food.y === y;
                    const isPortalSeg = portal !== null && portal.x === x && portal.y === y;
                    const isObstacleSeg = selectedMode === 'adventure' && obstacleSet.current.has(`${x},${y}`);

                    // Check for active diamond eat burst at this cell
                    const activeBurst = bursts.find(b => b.x === x && b.y === y);

                    // Determine segment classes
                    let cellClass = 'bg-amber-50/10 border-[0.5px] border-[#0c0806]/50';
                    let cellContent = null;

                    if (isFoodSeg) {
                      cellClass = 'relative overflow-visible z-10 border-[0.5px] border-[#0c0806]/50';
                      
                      // Render emoji based on foodType
                      let foodEmoji = '🧒';
                      let foodGlow = 'bg-orange-400/40';
                      if (foodType === 'diamond') {
                        foodEmoji = '💎';
                        foodGlow = 'bg-sky-400/40';
                      } else if (foodType === 'gold_diamond') {
                        foodEmoji = '⭐';
                        foodGlow = 'bg-yellow-400/40';
                      }

                      cellContent = (
                        <div className="absolute inset-0 flex items-center justify-center overflow-visible scale-125 pointer-events-none">
                          <div className={`absolute inset-0 ${foodGlow} rounded-full blur-[6px] animate-[pulse_0.6s_infinite_alternate]`} />
                          <motion.div 
                            animate={{ scale: [0.95, 1.3, 0.95] }}
                            transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[15px] sm:text-[18px] select-none z-10 font-bold"
                          >
                            {foodEmoji}
                          </motion.div>
                        </div>
                      );
                    } else if (isPortalSeg) {
                      cellClass = `bg-amber-400/30 scale-105 z-20 border-2 border-dashed border-amber-500 rounded-lg animate-[pulse_1s_infinite]`;
                      cellContent = (
                        <div className="absolute inset-0 flex items-center justify-center text-[12px] select-none animate-bounce pointer-events-none">
                          🚪
                        </div>
                      );
                    } else if (isObstacleSeg) {
                      cellClass = 'bg-[#1e100a] border border-orange-500/20 shadow-sm rounded-md scale-95';
                      cellContent = (
                        <div className="absolute inset-0 flex items-center justify-center text-[11px] select-none pointer-events-none">
                          {getObstacleEmoji(currentMapId)}
                        </div>
                      );
                    } else {
                      // Subtly dot the kindergarten grid tiles
                      cellContent = <div className="w-1 h-1 rounded-full bg-orange-500/15 pointer-events-none" />;
                    }

                    return (
                      <div 
                        key={idx} 
                        className={`rounded-[4px] flex items-center justify-center overflow-hidden relative ${cellClass}`}
                        style={{ width: '100%', height: '100%' }}
                      >
                        {cellContent}

                        {/* Particle light burst overlay upon collecting children/diamonds */}
                        {activeBurst && (
                          <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
                            <div className="absolute w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-500/20 scale-150 opacity-0 animate-[ping-ring_0.5s_ease-out_forwards]" />
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-sm"
                                style={{
                                  animation: `spark-${i} 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Smooth animated conga line of children overlay layer */}
                <div className="absolute inset-1.5 pointer-events-none">
                  {snake.map((segment, i) => {
                    const isHead = i === 0;
                    const scale = Math.max(0.72, 1 - (i / snake.length) * 0.2); // slight taper
                    const zIndex = snake.length - i; // Head always on top

                    // Glowing rainbow conga line inspired by the different factions in the application
                    const rainbowGradients = [
                      'from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.45)] border-amber-300',
                      'from-emerald-400 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.45)] border-emerald-300',
                      'from-cyan-400 to-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.45)] border-sky-300',
                      'from-purple-400 to-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.45)] border-purple-300',
                      'from-pink-400 to-fuchsia-500 shadow-[0_0_8px_rgba(236,72,153,0.45)] border-pink-300',
                      'from-rose-400 to-red-500 shadow-[0_0_8px_rgba(244,63,94,0.45)] border-rose-300',
                    ];
                    
                    const gradientIndex = (i - 1) % rainbowGradients.length;
                    const bgClass = isHead 
                      ? 'bg-gradient-to-br from-[#ec4899] via-amber-400 to-[#fbbf24] shadow-md border-2 border-[#0c0806] shadow-[0_0_12px_rgba(236,72,153,0.6)]' 
                      : `bg-gradient-to-br ${rainbowGradients[gradientIndex]} border-[1.5px] text-white`;

                    return (
                      <div
                        key={`snake-${i}`}
                        className={`absolute rounded-full flex items-center justify-center overflow-hidden will-change-[left,top] ${bgClass}`}
                        style={{
                          left: `${(segment.x / GRID_SIZE) * 100}%`,
                          top: `${(segment.y / GRID_SIZE) * 100}%`,
                          width: `${100 / GRID_SIZE}%`,
                          height: `${100 / GRID_SIZE}%`,
                          transform: `scale(${scale})`,
                          transition: disableTransition ? 'none' : `left ${currentSpeed}ms linear, top ${currentSpeed}ms linear`,
                          zIndex,
                        }}
                      >
                        <span className="text-[10px] sm:text-[12px] select-none">
                          {getChildEmoji(i)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OVERLAYS (GAME OVER / STAGE CLEARED) */}
              <AnimatePresence>
                {/* GAME OVER OVERLAY */}
                {isGameOver && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-4 top-1/4 bottom-1/4 bg-[#1a0f0a] border-2 border-orange-500/30 rounded-3xl p-5 flex flex-col justify-center items-center text-center z-40 shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                      <ShieldAlert className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-sm font-black uppercase text-orange-400 tracking-wider">Ojej!</h3>
                    <p className="text-[10px] text-amber-200/60 mt-1 max-w-[200px]">Maluchy się poślizgnęły! Uderzyłeś w szafkę, ścianę lub ogon grupy!</p>
                    
                    <div className="my-3.5 bg-black/40 border border-orange-500/20 px-4 py-1.5 rounded-xl">
                      <span className="text-[8px] text-amber-400 block uppercase tracking-wider font-bold">Wynik spacerku</span>
                      <strong className="text-lg text-orange-400 font-bold block">{score} pkt</strong>
                    </div>

                    <div className="flex gap-2 w-full max-w-[200px]">
                      <button
                        onClick={() => initGame(selectedMode, currentMapId)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-[10px] font-black uppercase tracking-wider text-amber-950 transition active:scale-95 shadow-sm"
                      >
                        Zagraj Znów
                      </button>
                      <button
                        onClick={() => {
                          playLocalSound('click');
                          setIsGameOver(false);
                          setActiveTab('menu');
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase transition active:scale-95 text-slate-300"
                      >
                        Menu
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* LEVEL CLEARED OVERLAY */}
                {isLevelCleared && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-4 top-1/4 bottom-1/4 bg-[#0d1611] border-2 border-emerald-500/30 rounded-3xl p-5 flex flex-col justify-center items-center text-center z-40 shadow-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6 text-emerald-400 animate-bounce" />
                    </div>
                    <h3 className="text-sm font-black uppercase text-emerald-400 tracking-wider">Poziom Ukończony!</h3>
                    <p className="text-[10px] text-emerald-200/60 mt-1 max-w-[200px]">Udało się otworzyć drzwi i bezpiecznie przejść do kolejnej sali!</p>
                    
                    <div className="my-3.5 bg-black/40 border border-emerald-500/20 px-4 py-1.5 rounded-xl">
                      <span className="text-[8px] text-emerald-400 block uppercase tracking-wider font-bold">Zebrane maluchy</span>
                      <strong className="text-lg text-emerald-400 font-bold block">{snake.length} / {activeMap.targetLength}</strong>
                    </div>

                    <div className="flex gap-2 w-full max-w-[240px]">
                      {currentMapId < 7 ? (
                        <button
                          onClick={() => initGame('adventure', currentMapId + 1)}
                          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-[10px] font-black uppercase tracking-wider transition active:scale-95 text-emerald-950 shadow-sm"
                        >
                          Kolejna Sala
                        </button>
                      ) : (
                        <div className="flex-1 py-2 text-[9px] font-black uppercase tracking-wider text-emerald-400 border border-emerald-500/20 rounded-xl bg-emerald-500/10">
                          🏆 CAŁE PRZEDSZKOLE PRZEJSZANE!
                        </div>
                      )}
                      <button
                        onClick={() => {
                          playLocalSound('click');
                          setIsLevelCleared(false);
                          setActiveTab('menu');
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase transition active:scale-95 text-slate-300"
                      >
                        Menu
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* On-Screen Controller Pad styled as a 4-triangle Square Pad (D-pad) */}
              <div id="dpad-controller" className="relative w-40 h-40 mx-auto my-2 bg-[#1e110a]/80 border-2 border-orange-950/50 rounded-3xl p-1 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_4px_10px_rgba(249,115,22,0.1)] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full select-none touch-none overflow-visible">
                  {/* UP Triangle */}
                  <polygon
                    points="3,3 97,3 50,45"
                    onMouseDown={() => {
                      playLocalSound('click');
                      changeDirection('UP');
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      playLocalSound('click');
                      changeDirection('UP');
                    }}
                    className={`cursor-pointer transition-all duration-150 stroke-[#ffdfa0]/20 stroke-[1] ${
                      direction === 'UP'
                        ? 'fill-amber-500/80 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                        : 'fill-black/45 hover:fill-black/60 active:fill-black/75'
                    }`}
                  />
                  
                  {/* RIGHT Triangle */}
                  <polygon
                    points="97,3 97,97 55,50"
                    onMouseDown={() => {
                      playLocalSound('click');
                      changeDirection('RIGHT');
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      playLocalSound('click');
                      changeDirection('RIGHT');
                    }}
                    className={`cursor-pointer transition-all duration-150 stroke-[#ffdfa0]/20 stroke-[1] ${
                      direction === 'RIGHT'
                        ? 'fill-amber-500/80 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                        : 'fill-black/45 hover:fill-black/60 active:fill-black/75'
                    }`}
                  />

                  {/* DOWN Triangle */}
                  <polygon
                    points="97,97 3,97 50,55"
                    onMouseDown={() => {
                      playLocalSound('click');
                      changeDirection('DOWN');
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      playLocalSound('click');
                      changeDirection('DOWN');
                    }}
                    className={`cursor-pointer transition-all duration-150 stroke-[#ffdfa0]/20 stroke-[1] ${
                      direction === 'DOWN'
                        ? 'fill-amber-500/80 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                        : 'fill-black/45 hover:fill-black/60 active:fill-black/75'
                    }`}
                  />

                  {/* LEFT Triangle */}
                  <polygon
                    points="3,3 3,97 45,50"
                    onMouseDown={() => {
                      playLocalSound('click');
                      changeDirection('LEFT');
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      playLocalSound('click');
                      changeDirection('LEFT');
                    }}
                    className={`cursor-pointer transition-all duration-150 stroke-[#ffdfa0]/20 stroke-[1] ${
                      direction === 'LEFT'
                        ? 'fill-amber-500/80 filter drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                        : 'fill-black/45 hover:fill-black/60 active:fill-black/75'
                    }`}
                  />

                  {/* Direction Arrow Glyphs/Labels centered on each Triangle */}
                  {/* UP Arrow */}
                  <text
                    x="50"
                    y="22"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-black font-mono text-[9px] pointer-events-none transition-colors duration-150 ${
                      direction === 'UP' ? 'fill-[#0c0806] font-bold' : 'fill-[#ffdfa0]'
                    }`}
                  >
                    GÓRA ▲
                  </text>

                  {/* RIGHT Arrow */}
                  <text
                    x="75"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-black font-mono text-[8px] pointer-events-none transition-colors duration-150 ${
                      direction === 'RIGHT' ? 'fill-[#0c0806] font-bold' : 'fill-[#ffdfa0]'
                    }`}
                  >
                    PRAWO ▶
                  </text>

                  {/* DOWN Arrow */}
                  <text
                    x="50"
                    y="78"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-black font-mono text-[9px] pointer-events-none transition-colors duration-150 ${
                      direction === 'DOWN' ? 'fill-[#0c0806] font-bold' : 'fill-[#ffdfa0]'
                    }`}
                  >
                    DÓŁ ▼
                  </text>

                  {/* LEFT Arrow */}
                  <text
                    x="25"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-black font-mono text-[8px] pointer-events-none transition-colors duration-150 ${
                      direction === 'LEFT' ? 'fill-[#0c0806] font-bold' : 'fill-[#ffdfa0]'
                    }`}
                  >
                    ◀ LEWO
                  </text>

                  {/* Aesthetic Central Core / Hub */}
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    className="fill-[#130906] stroke-orange-500/40 stroke-2 pointer-events-none shadow-md"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="5"
                    className={`pointer-events-none transition-all duration-150 ${
                      isPlaying ? 'fill-amber-400 animate-pulse' : 'fill-slate-600'
                    }`}
                  />
                </svg>
              </div>

              {/* Controls guide */}
              <div className="text-center shrink-0">
                <span className="text-[8px] font-bold tracking-wide text-amber-400/50 uppercase">
                  Steruj klawiszami WASD, strzałkami lub przyciskami
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Embedded GPU-accelerated Spark animation classes inside dangerouslySetInnerHTML */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spark-0 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-25px, -25px) scale(0); opacity: 0; }
        }
        @keyframes spark-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(25px, -25px) scale(0); opacity: 0; }
        }
        @keyframes spark-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-25px, 25px) scale(0); opacity: 0; }
        }
        @keyframes spark-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(25px, 25px) scale(0); opacity: 0; }
        }
        @keyframes spark-4 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0, -35px) scale(0); opacity: 0; }
        }
        @keyframes spark-5 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(0, 35px) scale(0); opacity: 0; }
        }
        @keyframes spark-6 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-35px, 0) scale(0); opacity: 0; }
        }
        @keyframes spark-7 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(35px, 0) scale(0); opacity: 0; }
        }
        @keyframes ping-ring {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      ` }} />
    </div>
  );
}
