/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Sword, Shield, Clock, RotateCcw, Award, Zap, Smile, BookOpen, Skull, Volume2, VolumeX, Flame } from 'lucide-react';
import { PlayerProfile } from '../types';
import { sound } from './SoundManager';
import { OPPONENTS } from '../data/opponents';
import ClassroomBackground from './ClassroomBackground';
import HeroineCutIn from './HeroineCutIn';

interface DiamondAttackProps {
  key?: string;
  playerProfile: PlayerProfile;
  opponentId: string; // 'calm' | 'whisper' | 'harmony' | 'echo' | 'mirror' | 'silence' | 'principal'
  opponentLevel: number;
  onClose: (rewards?: { gold: number; diamonds: number; xp: number; won: boolean; playNext?: boolean; trainingScore?: number }) => void;
  isTraining?: boolean;
}

// Grid dimensions
const ROWS = 6;
const COLS = 6;

// Gem metadata
const GEM_TYPES = [
  { id: 'RED', label: 'Basia (Czerwony)', emoji: '🔴', color: 'bg-red-500 shadow-red-500/50', textColor: 'text-red-400' },
  { id: 'YELLOW', label: 'Hania (Żółty)', emoji: '🟡', color: 'bg-yellow-400 shadow-yellow-400/50', textColor: 'text-yellow-400' },
  { id: 'PURPLE', label: 'Zosia (Fioletowy)', emoji: '🟣', color: 'bg-purple-500 shadow-purple-500/50', textColor: 'text-purple-400' },
  { id: 'BLUE', label: 'Dyrektor (Niebieski)', emoji: '🔵', color: 'bg-cyan-400 shadow-cyan-400/50', textColor: 'text-cyan-400' }
];

// Canvas particle system definitions
interface AdvancedParticle {
  id: number;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  color: 'RED' | 'YELLOW' | 'PURPLE' | 'BLUE' | 'SPARK';
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  speedMultiplier: number;
  type: 'heart' | 'star' | 'bubble' | 'ring' | 'spark' | 'heal_orb';
  sparkColor?: string;
}

export default function DiamondAttack({ playerProfile, opponentId, opponentLevel, onClose, isTraining = false }: DiamondAttackProps) {
  const opponent = OPPONENTS[opponentId] || OPPONENTS.calm;
  const maxEnemyHp = opponent.maxHp + (opponentLevel - 1) * 200;
  const maxPlayerHp = 100 + playerProfile.level * 10;

  // Game states
  const [enemyHp, setEnemyHp] = useState(maxEnemyHp);
  const [playerHp, setPlayerHp] = useState(maxPlayerHp);
  const [board, setBoard] = useState<string[]>([]);
  const [lockedTiles, setLockedTiles] = useState<boolean[]>(Array(ROWS * COLS).fill(false));
  const [blockedColor, setBlockedColor] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [enemySpeech, setEnemySpeech] = useState(opponent.phraseStart);
  const [lastPlayerAttackType, setLastPlayerAttackType] = useState<string | null>(null);

  // Combos & timers
  const [comboCount, setComboCount] = useState(0);
  const [enemyTimer, setEnemyTimer] = useState(4); // Turns until special trigger
  const [turnsUsed, setTurnsUsed] = useState(0);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number; color: string }[]>([]);
  const [animationsActive, setAnimationsActive] = useState(false);
  const [silenceCounter, setSilenceCounter] = useState(0);

  // AAA Visual states
  const [isShaking, setIsShaking] = useState(false);
  const [isOpponentHurt, setIsOpponentHurt] = useState(false);
  const [isOpponentAttacking, setIsOpponentAttacking] = useState(false);
  const [boardRotation, setBoardRotation] = useState({ x: 8, y: -3 });
  
  // Custom interactive animations and effects
  const [activeHeroineCutIn, setActiveHeroineCutIn] = useState<{
    id: string;
    name: string;
    attackName: string;
    quote: string;
    color: string;
    accentColor: string;
    combo: number;
  } | null>(null);

  const [gameResult, setGameResult] = useState<'WON' | 'LOST' | null>(null);
  const [score, setScore] = useState(0);
  const [noMovesPopup, setNoMovesPopup] = useState(false);

  // Refs
  const textIdCounter = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<AdvancedParticle[]>([]);
  const dragStartIdxRef = useRef<number | null>(null);

  // Initialize Match-3 Grid on mount
  useEffect(() => {
    initializeBoard();
  }, []);

  // HTML5 Canvas particles animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let animId: number;
    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Loop particles
      particlesRef.current = particlesRef.current.map(p => {
        p.life += 1;

        // Pull particle magnetically to target if it exists
        if (p.targetX !== undefined && p.targetY !== undefined) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 18) {
            p.life = p.maxLife; // Trigger removal
            triggerTargetImpact(p.color, p.targetX, p.targetY);
            return p;
          }

          // Magnetic drag physics
          const pull = 0.22 + (p.life / p.maxLife) * 0.45;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;

          // Velocity limiter
          const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const maxVelocity = 15 * p.speedMultiplier;
          if (velocity > maxVelocity) {
            p.vx = (p.vx / velocity) * maxVelocity;
            p.vy = (p.vy / velocity) * maxVelocity;
          }
        } else {
          // Free float friction
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha = Math.max(0, 1 - (p.life / p.maxLife));

        // Draw individual particle designs
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'heart') {
          ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`; // Rose-500
          ctx.shadowColor = 'rgba(244, 63, 94, 0.6)';
          ctx.shadowBlur = 10;
          drawHeart(ctx, 0, 0, p.size);
        } else if (p.type === 'star') {
          ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`; // Amber-400
          ctx.shadowColor = 'rgba(251, 191, 36, 0.7)';
          ctx.shadowBlur = 12;
          drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
        } else if (p.type === 'bubble') {
          ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`; // Purple-500
          ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          // Inner gloss highlights
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(-p.size / 6, -p.size / 6, p.size / 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'heal_orb') {
          ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`; // Cyan-400
          ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ring') {
          ctx.strokeStyle = `rgba(34, 211, 238, ${p.alpha * 0.8})`;
          ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
          ctx.shadowBlur = 15;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (1 + p.life / 8), 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Standard sparkles
          ctx.fillStyle = p.sparkColor || `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
        return p;
      }).filter(p => p.life < p.maxLife && p.alpha > 0);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Draw Heart path on Canvas
  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    ctx.quadraticCurveTo(x + size, y + size * 0.7, x, y + size);
    ctx.quadraticCurveTo(x - size, y + size * 0.7, x - size, y + size / 3);
    ctx.quadraticCurveTo(x - size, y, x - size / 2, y);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
  };

  // Draw Star path on Canvas
  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  // Target impact splash particles (flying outward from hit card)
  const triggerTargetImpact = (color: string, tx: number, ty: number) => {
    const bursts: AdvancedParticle[] = [];
    const colors = {
      RED: 'rgba(239, 68, 68, 0.85)',
      YELLOW: 'rgba(251, 191, 36, 0.85)',
      PURPLE: 'rgba(168, 85, 247, 0.85)',
      BLUE: 'rgba(34, 211, 238, 0.85)',
      SPARK: 'rgba(255, 255, 255, 0.85)'
    };

    const count = color === 'BLUE' ? 8 : 12;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      bursts.push({
        id: Math.random() + Date.now() + i,
        x: tx,
        y: ty,
        color: color as any,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: 3 + Math.random() * 5,
        rotation: Math.random() * Math.PI,
        rotSpeed: -0.1 + Math.random() * 0.2,
        life: 0,
        maxLife: 20 + Math.floor(Math.random() * 15),
        speedMultiplier: 1,
        type: 'spark',
        sparkColor: color === 'BLUE' ? 'rgba(52, 211, 153, 0.9)' : (colors as any)[color] // green flash for heals!
      });
    }

    particlesRef.current.push(...bursts);
  };

  // Trigger high fidelity particle burst at the matched index coordinate
  const spawnAdvancedParticles = (idx: number, gemType: string) => {
    const tileEl = document.getElementById(`tile-${idx}`);
    if (!tileEl) return;

    const rect = tileEl.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const isHealing = gemType === 'BLUE';
    const targetElId = isHealing ? 'player-health-bar' : 'therapist-card';
    const targetEl = document.getElementById(targetElId);

    // Default target coordinates fallback
    let targetX = isHealing ? window.innerWidth * 0.25 : window.innerWidth * 0.25;
    let targetY = isHealing ? window.innerHeight * 0.75 : window.innerHeight * 0.25;

    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      targetX = targetRect.left + targetRect.width / 2;
      targetY = targetRect.top + targetRect.height / 2;
    }

    const newParticles: AdvancedParticle[] = [];

    // Radial healing shockwave ring
    if (isHealing) {
      newParticles.push({
        id: Math.random() + Date.now() + 100,
        x: startX,
        y: startY,
        color: 'BLUE',
        vx: 0,
        vy: 0,
        alpha: 1,
        size: 8,
        rotation: 0,
        rotSpeed: 0,
        life: 0,
        maxLife: 15,
        speedMultiplier: 1,
        type: 'ring'
      });
    }

    // Core color particles
    const particleCount = 12 + Math.floor(Math.random() * 6);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4.5; // Initial burst velocity

      const pColor = gemType as any;
      const pType = isHealing ? 'heal_orb' : (gemType === 'RED' ? 'heart' : (gemType === 'YELLOW' ? 'star' : 'bubble'));

      newParticles.push({
        id: Math.random() + Date.now() + i,
        x: startX,
        y: startY,
        targetX,
        targetY,
        color: pColor,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: gemType === 'RED' ? (8 + Math.random() * 5) : (10 + Math.random() * 7),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: -0.15 + Math.random() * 0.3,
        life: 0,
        maxLife: 45 + Math.floor(Math.random() * 25),
        speedMultiplier: 0.85 + Math.random() * 0.4,
        type: pType as any
      });
    }

    particlesRef.current.push(...newParticles);
  };

  // Find 3-in-a-row
  const findMatches = (grid: string[]): number[] => {
    let matchIndices = new Set<number>();

    // Horizontal scan
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 2; c++) {
        const idx = r * COLS + c;
        const type = grid[idx];
        if (type && type !== '' && grid[idx + 1] === type && grid[idx + 2] === type) {
          if (blockedColor && type === blockedColor) continue;
          matchIndices.add(idx);
          matchIndices.add(idx + 1);
          matchIndices.add(idx + 2);
        }
      }
    }

    // Vertical scan
    for (let r = 0; r < ROWS - 2; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        const type = grid[idx];
        if (type && type !== '' && grid[idx + COLS] === type && grid[idx + COLS * 2] === type) {
          if (blockedColor && type === blockedColor) continue;
          matchIndices.add(idx);
          matchIndices.add(idx + COLS);
          matchIndices.add(idx + COLS * 2);
        }
      }
    }

    return Array.from(matchIndices);
  };

  // Check if any valid Match-3 moves exist on the board
  const hasValidMoves = (grid: string[]): boolean => {
    const tempGrid = [...grid];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        // Check swap right
        if (c < COLS - 1) {
          const rightIdx = idx + 1;
          const temp = tempGrid[idx];
          tempGrid[idx] = tempGrid[rightIdx];
          tempGrid[rightIdx] = temp;
          
          const matches = findMatches(tempGrid);
          
          tempGrid[rightIdx] = tempGrid[idx];
          tempGrid[idx] = temp;
          
          if (matches.length > 0) return true;
        }
        // Check swap down
        if (r < ROWS - 1) {
          const downIdx = idx + COLS;
          const temp = tempGrid[idx];
          tempGrid[idx] = tempGrid[downIdx];
          tempGrid[downIdx] = temp;
          
          const matches = findMatches(tempGrid);
          
          tempGrid[downIdx] = tempGrid[idx];
          tempGrid[idx] = temp;
          
          if (matches.length > 0) return true;
        }
      }
    }
    return false;
  };

  // Setup Board elements
  const initializeBoard = () => {
    let newBoard: string[] = [];
    let attempts = 0;
    while (attempts < 150) {
      newBoard = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let possibleGems = GEM_TYPES.map(g => g.id);
          // Prevent horizontal matches on load
          if (c >= 2) {
            const left1 = newBoard[newBoard.length - 1];
            const left2 = newBoard[newBoard.length - 2];
            if (left1 === left2) possibleGems = possibleGems.filter(g => g !== left1);
          }
          // Prevent vertical matches on load
          if (r >= 2) {
            const top1 = newBoard[newBoard.length - COLS];
            const top2 = newBoard[newBoard.length - COLS * 2];
            if (top1 === top2) possibleGems = possibleGems.filter(g => g !== top1);
          }
          const chosen = possibleGems[Math.floor(Math.random() * possibleGems.length)];
          newBoard.push(chosen);
        }
      }
      
      if (hasValidMoves(newBoard)) {
        break;
      }
      attempts++;
    }
    setBoard(newBoard);
    setLockedTiles(Array(ROWS * COLS).fill(false));
    setBlockedColor(null);
  };

  // Add floating combat numbers
  const addFloatingText = (text: string, x: number, y: number, color: string = 'text-amber-400') => {
    const id = textIdCounter.current++;
    setFloatingTexts(prev => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1500);
  };

  // Interactive 3D board tilting based on mouse coordinate
  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    setBoardRotation({
      x: 8 - (normY * 12), // pitch
      y: -3 + (normX * 12) // yaw
    });
  };

  const handleBoardMouseLeave = () => {
    setBoardRotation({ x: 8, y: -3 }); // return to resting angle
  };

  // Drag and drop / Swipe handlers for Match-3
  const handleMouseDown = (e: React.MouseEvent, idx: number) => {
    if (gameResult || animationsActive || lockedTiles[idx]) return;
    dragStartIdxRef.current = idx;
    setSelectedIdx(idx);
  };

  const handleMouseEnter = (idx: number) => {
    if (gameResult || animationsActive || lockedTiles[idx]) return;
    if (dragStartIdxRef.current !== null && dragStartIdxRef.current !== idx) {
      const startIdx = dragStartIdxRef.current;
      
      const r1 = Math.floor(startIdx / COLS);
      const c1 = startIdx % COLS;
      const r2 = Math.floor(idx / COLS);
      const c2 = idx % COLS;

      const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
      if (isAdjacent) {
        swapAndResolve(startIdx, idx);
      }
      dragStartIdxRef.current = null;
      setSelectedIdx(null);
    }
  };

  const handleMouseUp = () => {
    dragStartIdxRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent, idx: number) => {
    if (gameResult || animationsActive || lockedTiles[idx]) return;
    dragStartIdxRef.current = idx;
    setSelectedIdx(idx);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameResult || animationsActive || dragStartIdxRef.current === null) return;
    
    const touch = e.touches[0];
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!elem) return;
    
    const button = elem.closest('[id^="tile-"]');
    if (button) {
      const tileIdStr = button.id;
      const targetIdx = parseInt(tileIdStr.replace('tile-', ''), 10);
      
      if (!isNaN(targetIdx) && targetIdx !== dragStartIdxRef.current) {
        if (lockedTiles[targetIdx]) return;
        const startIdx = dragStartIdxRef.current;
        
        const r1 = Math.floor(startIdx / COLS);
        const c1 = startIdx % COLS;
        const r2 = Math.floor(targetIdx / COLS);
        const c2 = targetIdx % COLS;

        const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
        if (isAdjacent) {
          swapAndResolve(startIdx, targetIdx);
          dragStartIdxRef.current = null;
          setSelectedIdx(null);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    dragStartIdxRef.current = null;
  };

  // Handle Match-3 Swaps
  const handleTileClick = (idx: number) => {
    if (gameResult || animationsActive) return;

    sound.playClick();
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else {
      const r1 = Math.floor(selectedIdx / COLS);
      const c1 = selectedIdx % COLS;
      const r2 = Math.floor(idx / COLS);
      const c2 = idx % COLS;

      const isAdjacent = Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;

      if (isAdjacent) {
        swapAndResolve(selectedIdx, idx);
      }
      setSelectedIdx(null);
      dragStartIdxRef.current = null;
    }
  };

  const swapAndResolve = async (idx1: number, idx2: number) => {
    setAnimationsActive(true);
    let currentBoard = [...board];

    if (lockedTiles[idx1] || lockedTiles[idx2]) {
      addFloatingText('BLOKADA!', 150, 150, 'text-red-500 font-black tracking-widest animate-bounce');
      if (sound.playFail) sound.playFail();
      setAnimationsActive(false);
      return;
    }

    // Perform swap
    const temp = currentBoard[idx1];
    currentBoard[idx1] = currentBoard[idx2];
    currentBoard[idx2] = temp;
    setBoard(currentBoard);

    const matchesResult = findMatches(currentBoard);
    let finalBoardState = currentBoard;

    if (matchesResult.length > 0) {
      let currentCombo = 1;
      let tempBoard = [...currentBoard];
      let hasMatches = true;
      let enemyHpTracker = enemyHp; // track health locally because state updates are asynchronous

      while (hasMatches) {
        const matches = findMatches(tempBoard);
        if (matches.length > 0) {
          const firstMatchIdx = matches[0];
          const matchedColor = tempBoard[firstMatchIdx];

          // Compute damage & trigger full screen cut-in
          const results = calculateAttackImpact(matchedColor, matches.length, currentCombo);
          enemyHpTracker = Math.max(0, enemyHpTracker - results.damage);
          setEnemyHp(enemyHpTracker);

          // Calculate and award training score points
          let basePoints = 100;
          if (matches.length === 4) basePoints = 200;
          else if (matches.length >= 5) basePoints = 400;
          const pointsGained = basePoints * currentCombo;
          setScore(prev => prev + pointsGained);
          addFloatingText(`+${pointsGained} pkt`, 150, 60, 'text-yellow-300 font-black animate-bounce text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]');

          // Clear those tiles
          matches.forEach(mIdx => {
            const gemType = tempBoard[mIdx];
            spawnAdvancedParticles(mIdx, gemType);
            tempBoard[mIdx] = '';
          });

          setBoard([...tempBoard]);
          await delay(250);

          // Falling cascades refiller
          tempBoard = refillBoard(tempBoard);
          setBoard([...tempBoard]);
          await delay(250);

          currentCombo++;
          setComboCount(currentCombo - 1);
        } else {
          hasMatches = false;
        }
      }

      finalBoardState = tempBoard;

      // Check final battle victory
      if (enemyHpTracker <= 0) {
        triggerWin();
      } else {
        progressOpponentTimer();
      }
    } else {
      // Revert swap since no matches
      await delay(200);
      currentBoard[idx2] = currentBoard[idx1];
      currentBoard[idx1] = temp;
      setBoard(currentBoard);
      addFloatingText('Brak dopasowania!', 150, 150, 'text-slate-400 text-xs');
      finalBoardState = currentBoard;
    }

    setAnimationsActive(false);

    // After resolution finishes, check if any valid moves remain on the board
    const boardHasMoves = hasValidMoves(finalBoardState);
    if (!boardHasMoves) {
      if (sound.playFail) sound.playFail();
      setNoMovesPopup(true);
    }
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const refillBoard = (grid: string[]): string[] => {
    let nextGrid = [...grid];

    for (let c = 0; c < COLS; c++) {
      let emptySlots = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        const idx = r * COLS + c;
        if (nextGrid[idx] === '') {
          emptySlots++;
        } else if (emptySlots > 0) {
          nextGrid[idx + emptySlots * COLS] = nextGrid[idx];
          nextGrid[idx] = '';
        }
      }

      for (let r = 0; r < emptySlots; r++) {
        const idx = r * COLS + c;
        const randomType = GEM_TYPES[Math.floor(Math.random() * GEM_TYPES.length)].id;
        nextGrid[idx] = randomType;
      }
    }

    return nextGrid;
  };

  const triggerWin = () => {
    if (sound.playTrophy) sound.playTrophy();
    setGameResult('WON');
  };

  const triggerLoss = () => {
    if (sound.playFail) sound.playFail();
    setGameResult('LOST');
  };

  // Perform combat calculation and queue epic cut-ins and dialogues
  const calculateAttackImpact = (color: string, matchSize: number, combo: number) => {
    if (sound.playSwipe) sound.playSwipe();

    let baseDamage = 30 + playerProfile.level * 4;
    let attackTitle = 'Zwykły Atak';
    let attackDesc = '';
    let animColor = 'text-white';
    let damageMultiplier = 1;

    if (matchSize === 4) {
      damageMultiplier = 1.7;
      attackTitle = 'Moc Specjalna ✨';
    } else if (matchSize >= 5) {
      damageMultiplier = 2.5;
      attackTitle = 'ULTIMATE ATTACK 🔥';
    }

    const comboMult = 1 + (combo - 1) * 0.25;
    let finalDamage = Math.round(baseDamage * damageMultiplier * comboMult);

    let teacherId = 'basia';
    let tName = 'Pani Basia';
    let accentColor = '#f43f5e';
    let quote = '"Nasz kreatywny chaos rozbije każdy sterylny rygor!"';

    if (color === 'RED') {
      sound.playHit();
      teacherId = 'basia';
      tName = 'Pani Basia';
      attackDesc = 'Fort z Krzeseł!';
      finalDamage = Math.round(finalDamage * 1.3);
      animColor = 'text-rose-500 font-extrabold';
      accentColor = '#f43f5e';
      quote = '"Kredki i budowle ponad sterylne biurka! Fort z Krzeseł!"';
    } else if (color === 'YELLOW') {
      sound.playPaint();
      teacherId = 'hania';
      tName = 'Pani Hania';
      attackDesc = 'Eksplozja Farb!';
      finalDamage = Math.round(finalDamage * 1.15);
      animColor = 'text-amber-400 font-black';
      accentColor = '#fbbf24';
      quote = '"Każda plama to krok do bajecznej przygody! Eksplozja farb!"';
    } else if (color === 'PURPLE') {
      sound.playZap();
      teacherId = 'zosia';
      tName = 'Pani Zosia';
      attackDesc = 'Mroczna Bajka!';
      finalDamage = Math.round(finalDamage * 1.1);
      animColor = 'text-purple-400 font-semibold';
      accentColor = '#a855f7';
      quote = '"Roztańczymy ten smutny regulamin! Czas na radosny chaos!"';
    } else if (color === 'BLUE') {
      sound.playHeal();
      teacherId = 'dyrektor';
      tName = 'Sojusz Dyrekcji';
      attackDesc = 'Dzwonek Władzy!';
      animColor = 'text-cyan-400 font-black';
      accentColor = '#22d3ee';
      quote = '"Praca w przedszkolu sprzyja uśmiechom dzieci! Dzwonek Władzy!"';

      // Self healing power
      const healAmt = Math.round(maxPlayerHp * 0.16);
      setPlayerHp(prev => Math.min(maxPlayerHp, prev + healAmt));
      addFloatingText(`+${healAmt} HP (Uzdrowienie)`, 60, 80, 'text-emerald-400 font-black tracking-wide');
    }

    // Silent debuff reduction
    if (silenceCounter > 0 && color !== 'RED') {
      finalDamage = Math.round(finalDamage * 0.4);
      attackDesc += ' (OSŁABIONA CISZĄ)';
      addFloatingText('CIĘCIE MOCY O 60%!', 150, 60, 'text-slate-400 text-[10px] font-bold');
    }

    // Mirror damage reflex trigger
    if (opponentId === 'mirror' && Math.random() < 0.35) {
      const reflectAmt = Math.round(finalDamage * 0.22);
      setPlayerHp(prev => {
        const nextHp = Math.max(0, prev - reflectAmt);
        if (nextHp <= 0) setTimeout(() => triggerLoss(), 20);
        return nextHp;
      });
      addFloatingText(`-${reflectAmt} HP (Odbicie!)`, 60, 100, 'text-rose-400 font-extrabold animate-pulse');
    }

    // Screen Shakes and portrait flashes
    setIsShaking(true);
    setIsOpponentHurt(true);
    setTimeout(() => setIsShaking(false), 450);
    setTimeout(() => setIsOpponentHurt(false), 450);

    // Queue heroine reaction overlay
    setActiveHeroineCutIn({
      id: teacherId,
      name: tName,
      attackName: `${attackTitle}: ${attackDesc}`,
      quote,
      color: animColor,
      accentColor,
      combo
    });

    // Dismiss reaction automatically
    setTimeout(() => {
      setActiveHeroineCutIn(null);
    }, 1150);

    setLastPlayerAttackType(color);

    // Dialog trigger
    const quotes = opponent.phraseHurt;
    setEnemySpeech(quotes[Math.floor(Math.random() * quotes.length)]);

    // Floating text on target
    addFloatingText(`-${finalDamage} HP`, 150, 40, animColor);

    return { damage: finalDamage };
  };

  const progressOpponentTimer = () => {
    setTurnsUsed(prev => prev + 1);

    if (silenceCounter > 0) {
      setSilenceCounter(prev => prev - 1);
    }

    setEnemyTimer(prev => {
      if (prev <= 1) {
        triggerTherapistSkill();
        return 4; // reset special timer
      } else {
        return prev - 1;
      }
    });
  };

  // Boss skill routines
  const triggerTherapistSkill = () => {
    if (sound.playZap) sound.playZap();
    setEnemySpeech(opponent.phraseSkill);

    setIsOpponentAttacking(true);
    setIsShaking(true);
    setTimeout(() => {
      setIsOpponentAttacking(false);
      setIsShaking(false);
    }, 800);

    const baseAttack = 15 + opponentLevel * 5;

    if (opponentId === 'calm') {
      // Locks 3 random boards
      let nextLocks = [...lockedTiles];
      let locksPlaced = 0;
      while (locksPlaced < 3) {
        const rnd = Math.floor(Math.random() * (ROWS * COLS));
        if (!nextLocks[rnd]) {
          nextLocks[rnd] = true;
          locksPlaced++;
        }
      }
      setLockedTiles(nextLocks);
      addFloatingText('Blokada planszy!', 150, 140, 'text-cyan-300 font-black');
      
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - baseAttack);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`-${baseAttack} HP`, 60, 100, 'text-rose-500 font-bold');
    } 
    else if (opponentId === 'whisper') {
      // Board shuffle
      initializeBoard();
      addFloatingText('Mieszanie planszy!', 150, 140, 'text-purple-300 font-black animate-spin');
      
      const dmg = Math.round(baseAttack * 1.2);
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - dmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`-${dmg} HP`, 60, 100, 'text-rose-500 font-bold');
    } 
    else if (opponentId === 'harmony') {
      // Blocks RED matches
      setBlockedColor('RED');
      addFloatingText('Zablokowany Czerwony!', 150, 140, 'text-rose-500 font-black');
      
      const dmg = Math.round(baseAttack * 1.3);
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - dmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`-${dmg} HP`, 60, 100, 'text-rose-500 font-bold');
    } 
    else if (opponentId === 'echo') {
      // Echo retaliations
      let copiedDmg = Math.round(baseAttack * 2);
      if (lastPlayerAttackType === 'RED') copiedDmg = Math.round(copiedDmg * 1.3);
      
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - copiedDmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`Odwet Echo: -${copiedDmg} HP`, 60, 100, 'text-rose-500 font-bold animate-pulse');
    } 
    else if (opponentId === 'mirror') {
      const dmg = Math.round(baseAttack * 1.5);
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - dmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`Refleks: -${dmg} HP`, 60, 100, 'text-rose-500 font-bold');
    } 
    else if (opponentId === 'silence') {
      setSilenceCounter(2);
      addFloatingText('Kurtyna Milczenia!', 150, 140, 'text-slate-400 font-black uppercase');
      
      const dmg = Math.round(baseAttack * 1.6);
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - dmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`-${dmg} HP`, 60, 100, 'text-rose-500 font-bold');
    } 
    else if (opponentId === 'principal') {
      const dmg = Math.round(baseAttack * 2.2);
      setPlayerHp(prev => {
        const hp = Math.max(0, prev - dmg);
        if (hp <= 0) triggerLoss();
        return hp;
      });
      addFloatingText(`Kolegium! -${dmg} HP`, 60, 100, 'text-red-500 font-black animate-bounce');
    }
    else if (opponentId === 'lysy_kierownik') {
      // Shuffles the board and locks 2 random tiles (cost cutting!)
      initializeBoard();
      let nextLocks = [...lockedTiles];
      let locksPlaced = 0;
      while (locksPlaced < 2) {
        const rnd = Math.floor(Math.random() * (ROWS * COLS));
        if (!nextLocks[rnd]) {
          nextLocks[rnd] = true;
          locksPlaced++;
        }
      }
      setLockedTiles(nextLocks);
      addFloatingText('Cięcia budżetowe!', 150, 140, 'text-purple-400 font-black animate-pulse');
      
      // In training against Lysy Kierownik, player takes 0 damage (totally relaxed)
      addFloatingText(`Kalkulacja kosztów!`, 60, 100, 'text-purple-300 font-bold');
    }
  };

  const handleFinishGame = () => {
    sound.playClick();
    if (isTraining) {
      onClose({ gold: 0, diamonds: 0, xp: 0, won: false, trainingScore: score });
    } else if (gameResult === 'WON') {
      const gReward = 30 + opponentLevel * 10 + Math.floor(Math.random() * 20);
      const dReward = 2 + Math.floor(opponentLevel / 3);
      const xReward = 40 + opponentLevel * 15;
      onClose({ gold: gReward, diamonds: dReward, xp: xReward, won: true });
    } else {
      onClose({ gold: 5, diamonds: 0, xp: 10, won: false });
    }
  };

  const handlePlayNextGame = () => {
    sound.playClick();
    if (gameResult === 'WON') {
      const gReward = 30 + opponentLevel * 10 + Math.floor(Math.random() * 20);
      const dReward = 2 + Math.floor(opponentLevel / 3);
      const xReward = 40 + opponentLevel * 15;
      onClose({ gold: gReward, diamonds: dReward, xp: xReward, won: true, playNext: true });
    } else {
      onClose({ gold: 5, diamonds: 0, xp: 10, won: false });
    }
  };

  // Render gem vectors for Match-3 Board
  const renderFacetedGem = (gemId: string, isSelected: boolean) => {
    switch (gemId) {
      case 'RED': // Ruby Heart (Pani Basia)
        return (
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] filter drop-shadow-[0_4px_10px_rgba(239,68,68,0.6)]">
            <defs>
              <radialGradient id="grad-red" cx="45%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#ff5d5d" />
                <stop offset="60%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
            </defs>
            <path 
              d="M50 86 C50 86 16 58 16 36 C16 18 30 12 41 22 L50 31 L59 22 C70 12 84 18 84 36 C84 58 50 86 50 86 Z" 
              fill="url(#grad-red)" 
            />
            <path d="M50 31 L50 86" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
            <path d="M16 36 L50 31 L84 36" stroke="#fecaca" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
            <circle cx="50" cy="46" r="3" fill="#ffffff" className="animate-pulse" />
          </svg>
        );
      case 'YELLOW': // Topaz Rhombus (Pani Hania)
        return (
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] filter drop-shadow-[0_4px_10px_rgba(234,179,8,0.6)]">
            <defs>
              <radialGradient id="grad-yellow" cx="45%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#713f12" />
              </radialGradient>
            </defs>
            <polygon points="50,11 85,50 50,89 15,50" fill="url(#grad-yellow)" />
            <line x1="50" y1="11" x2="50" y2="89" stroke="#fef08a" strokeWidth="1.5" opacity="0.75" />
            <line x1="15" y1="50" x2="85" y2="50" stroke="#fef08a" strokeWidth="1.5" opacity="0.75" />
            <circle cx="50" cy="50" r="3.5" fill="#ffffff" className="animate-pulse" />
          </svg>
        );
      case 'PURPLE': // Amethyst Teardrop (Pani Zosia)
        return (
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] filter drop-shadow-[0_4px_10px_rgba(168,85,247,0.6)]">
            <defs>
              <radialGradient id="grad-purple" cx="45%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="60%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#581c87" />
              </radialGradient>
            </defs>
            <path 
              d="M50 16 C50 16 19 50 19 68 C19 83 33 91 50 91 C67 91 81 83 81 68 C81 50 50 16 50 16 Z" 
              fill="url(#grad-purple)" 
            />
            <line x1="50" y1="16" x2="50" y2="91" stroke="#f3e8ff" strokeWidth="1.5" opacity="0.65" />
            <path d="M19 68 L50 56 L81 68" stroke="#f3e8ff" strokeWidth="1.2" opacity="0.55" strokeLinecap="round" />
          </svg>
        );
      case 'BLUE': // Sapphire Octagon (Sojusz Dyrekcji)
        return (
          <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] filter drop-shadow-[0_4px_10px_rgba(6,182,212,0.6)]">
            <defs>
              <radialGradient id="grad-blue" cx="45%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#ecfeff" />
                <stop offset="50%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#155e75" />
              </radialGradient>
            </defs>
            <polygon points="30,13 70,13 89,32 89,71 70,90 30,90 11,71 11,32" fill="url(#grad-blue)" />
            <polygon points="36,21 64,21 78,34 78,65 64,79 36,79 22,65 22,34" fill="none" stroke="#cffafe" strokeWidth="1.5" opacity="0.75" />
            <polygon points="50,39 52,47 60,49 52,51 50,59 48,51 40,49 48,47" fill="#ffffff" className="animate-pulse" />
          </svg>
        );
      default:
        return <div className="text-2xl">💎</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0c0604] text-white z-50 flex flex-col p-4 md:p-6 overflow-hidden select-none font-sans">
      
      {/* 1. Animated Classroom Background Backdrop */}
      <ClassroomBackground 
        playerHp={playerHp}
        maxPlayerHp={maxPlayerHp}
        enemyHp={enemyHp}
        maxEnemyHp={maxEnemyHp}
      />

      {/* 2. Fullscreen HTML5 Particle Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      {/* Header bar */}
      <div className="w-full flex items-center justify-between border-b border-[#ff9068]/25 pb-3 mb-4 shrink-0 relative z-30">
        <div className="flex items-center gap-3">
          <div className="bg-[#ff9068]/15 border border-[#ff9068]/30 px-3.5 py-1.5 rounded-2xl flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#ff9068] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.15em] text-[#ffdfa0]">
              {isTraining ? 'Tryb Treningowy' : 'Starcie Diamentowe 3D'}
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium tracking-tight">
            {isTraining ? 'Bezkolizyjny trening umiejętności Match-3' : 'Nauczycielki vs Frakcja Terapeutek'}
          </span>
        </div>

        <button
          onClick={() => onClose({ gold: 0, diamonds: 0, xp: 0, won: false })}
          className="bg-black/50 border border-[#ff9068]/30 text-slate-300 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#ff9068]/15 hover:text-white transition active:scale-95 flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#ff9068]" />
          Ucieczka
        </button>
      </div>

      {/* Primary Gameplay Split Pane */}
      <motion.div 
        animate={isShaking ? {
          x: [-8, 8, -6, 6, -3, 3, 0],
          y: [-4, 4, -2, 2, -1, 1, 0],
          transition: { duration: 0.4 }
        } : {}}
        className="flex-1 flex flex-col lg:flex-row gap-6 md:gap-8 justify-center items-center max-w-6xl w-full mx-auto relative z-30 overflow-y-auto"
      >
        
        {/* LEFT PORTAL: Opponent and Player stats/cards */}
        <div className="w-full max-w-md flex flex-col gap-4 shrink-0 justify-center">
          
          {/* Opponent (Therapist) card */}
          <motion.div 
            id="therapist-card"
            animate={isOpponentHurt ? {
              scale: [1, 0.96, 1.05, 1],
              transition: { duration: 0.3 }
            } : {}}
            className={`p-5 rounded-[32px] border-2 transition-all duration-300 relative overflow-hidden flex flex-col gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.8)] ${
              isOpponentHurt 
                ? 'border-red-500 bg-red-950/45 shadow-[0_0_25px_rgba(239,68,68,0.45)]'
                : isOpponentAttacking
                  ? 'border-purple-500 bg-purple-950/45 shadow-[0_0_25px_rgba(168,85,247,0.45)]'
                  : `bg-[#1a0e0a]/90 border-[#ff9068]/30 ${opponent.color}`
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/65 pointer-events-none" />
            
            <div className="absolute top-2.5 right-3.5 p-1 text-[10px] font-mono tracking-wider text-amber-300 font-bold opacity-75">
              POZIOM {opponentLevel}
            </div>

            <div className="flex items-center gap-4 relative z-10 mt-1">
              <div className={`w-16 h-16 rounded-2xl border-2 overflow-hidden shrink-0 relative transition-all duration-300 ${
                isOpponentHurt ? 'border-red-500 scale-105' : 'border-white/15'
              }`}>
                <img
                  src={opponent.portraitUrl}
                  alt={opponent.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isOpponentHurt ? 'brightness-125 saturate-150 contrast-125 scale-110' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
              </div>

              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff9068] block opacity-90">
                  {opponent.role}
                </span>
                <h3 className="text-xl font-black tracking-tight text-white">{opponent.name}</h3>
              </div>
            </div>

            {/* HP Bar */}
            <div className="space-y-1.5 relative z-10 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <Skull className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  Pancerz Uporządkowania
                </span>
                <span className="font-mono font-bold text-slate-100">{enemyHp} / {maxEnemyHp}</span>
              </div>
              <div className="h-4.5 bg-black/60 border border-white/10 rounded-full overflow-hidden shadow-inner relative">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: `${(enemyHp / maxEnemyHp) * 100}%` }}
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 shadow-[0_0_15px_rgba(239,68,68,0.75)]"
                />
              </div>
            </div>

            {/* Elegant speech dialogue */}
            <div className="bg-black/55 border border-[#ff9068]/15 p-3 rounded-2xl text-xs italic text-slate-200 mt-1 min-h-[55px] flex items-center leading-relaxed shadow-inner">
              "{enemySpeech}"
            </div>

            {/* Timer status */}
            <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest pt-1 border-t border-white/5 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                Ruchy Terapeutki: <strong className="text-cyan-300 font-black text-sm">{enemyTimer}</strong>
              </span>
              {silenceCounter > 0 && (
                <span className="text-slate-100 bg-slate-800/90 px-2.5 py-1 rounded-full animate-pulse border border-slate-700 font-bold text-[9px]">
                  Wyciszenie ({silenceCounter} tury)
                </span>
              )}
            </div>
          </motion.div>

          {isTraining ? (
            /* Training Score Panel */
            <div className="bg-[#1b0d07]/95 border-2 border-purple-500/50 rounded-[32px] p-5 flex flex-col gap-4 shadow-[0_12px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400 animate-bounce" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#ffdfa0]">Tablica Treningu</span>
                </div>
                {score > (playerProfile.stats.trainingHighScore || 0) && (
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-1 rounded-full border border-amber-500/40 uppercase tracking-widest animate-pulse"
                  >
                    🏆 NOWY REKORD!
                  </motion.span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 p-4 rounded-2xl flex flex-col items-center justify-center border border-white/5 shadow-inner">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">TWÓJ WYNIK</span>
                  <motion.strong 
                    key={score}
                    initial={{ scale: 1.3, color: '#fbbf24' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-3xl font-black mt-1"
                  >
                    {score}
                  </motion.strong>
                </div>
                
                <div className="bg-black/60 p-4 rounded-2xl flex flex-col items-center justify-center border border-white/5 shadow-inner">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">REKORD ŻYCIA</span>
                  <strong className="text-3xl font-black text-amber-400 mt-1">
                    {Math.max(score, playerProfile.stats.trainingHighScore || 0)}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300 uppercase">
                <div className="bg-black/50 p-2 rounded-2xl flex justify-between items-center border border-white/5 shadow-inner">
                  <span className="text-slate-400 font-bold">Combo:</span>
                  <strong className="text-amber-400 text-sm font-black">{comboCount}x</strong>
                </div>
                <div className="bg-black/50 p-2 rounded-2xl flex justify-between items-center border border-white/5 shadow-inner">
                  <span className="text-slate-400 font-bold">Ruchy:</span>
                  <strong className="text-cyan-400 text-sm font-black">{turnsUsed}</strong>
                </div>
              </div>
            </div>
          ) : (
            /* Player stats panel */
            <div 
              id="player-health-bar"
              className="bg-[#1b0d07]/90 border border-[#ff9068]/30 rounded-[32px] p-5 flex flex-col gap-4 shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#ffdfa0]">Zdrowie Drużyny</span>
                </div>
                <span className="font-mono font-bold text-sm text-slate-100">{playerHp} / {maxPlayerHp}</span>
              </div>
              
              <div className="h-3.5 w-full bg-black/55 rounded-full overflow-hidden border border-white/10 shadow-inner">
                <motion.div
                  animate={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                  className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300 uppercase">
                <div className="bg-black/50 p-2 rounded-2xl flex justify-between items-center border border-white/5 shadow-inner">
                  <span className="text-slate-400 font-bold">Mnożnik Combo:</span>
                  <strong className="text-amber-400 text-sm font-black">{comboCount}x</strong>
                </div>
                <div className="bg-black/50 p-2 rounded-2xl flex justify-between items-center border border-white/5 shadow-inner">
                  <span className="text-slate-400 font-bold">Użyte Tury:</span>
                  <strong className="text-cyan-400 text-sm font-black">{turnsUsed}</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT PORTAL: The interactive Match-3 board with 3D tilts */}
        <div className="flex-1 flex flex-col justify-center items-center w-full relative">
          
          {/* Main board tilted in 3D */}
          <div 
            onMouseMove={handleBoardMouseMove}
            onMouseLeave={handleBoardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${boardRotation.x}deg) rotateY(${boardRotation.y}deg) rotateZ(0.5deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="w-full aspect-square max-w-[420px] bg-gradient-to-b from-[#25130b] to-[#120804] border-4 border-[#ff9068]/50 rounded-[40px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/75 pointer-events-none" />
            <div className="absolute inset-0 border border-white/5 rounded-[36px] pointer-events-none" />

            {/* Floating combat numbers inside the board container */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              <AnimatePresence>
                {floatingTexts.map(f => (
                  <motion.div
                    key={`ft-${f.id}`}
                    initial={{ opacity: 0, scale: 0.6, y: f.y }}
                    animate={{ opacity: 1, scale: 1.35, y: f.y - 45 }}
                    exit={{ opacity: 0 }}
                    className={`absolute left-[50%] -translate-x-[50%] ${f.color} text-xl font-black tracking-wider text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]`}
                    style={{ top: `${f.y}%` }}
                  >
                    {f.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Match-3 buttons grid */}
            <div className="grid grid-cols-6 gap-2 w-full h-full relative z-10">
              {board.map((gemId, idx) => {
                const isSelected = selectedIdx === idx;
                const isLocked = lockedTiles[idx];

                return (
                  <motion.button
                    id={`tile-${idx}`}
                    key={`gem-btn-${idx}`}
                    onClick={() => handleTileClick(idx)}
                    onMouseDown={(e) => handleMouseDown(e, idx)}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseUp={handleMouseUp}
                    onTouchStart={(e) => handleTouchStart(e, idx)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    whileHover={{ scale: isLocked ? 1 : 1.05 }}
                    whileTap={{ scale: isLocked ? 1 : 0.95 }}
                    className={`relative aspect-square rounded-2xl flex items-center justify-center transition duration-200 border-2 overflow-hidden touch-none ${
                      isSelected 
                        ? 'border-[#fbbf24] bg-[#fbbf24]/20 scale-105 shadow-[0_0_20px_#fbbf24] z-20' 
                        : isLocked
                          ? 'border-red-600/40 bg-red-950/40'
                          : 'border-white/5 bg-black/50 hover:bg-black/60 shadow-inner'
                    }`}
                  >
                    {gemId && renderFacetedGem(gemId, isSelected)}

                    {isLocked && (
                      <div className="absolute inset-0 bg-red-950/75 flex items-center justify-center text-xs font-bold text-red-400 z-10 animate-pulse">
                        🔒
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Attack Legends panel */}
          <div className="w-full max-w-md bg-black/45 border border-white/5 rounded-2xl p-3.5 mt-4 flex flex-col gap-2 relative z-10">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
              Legenda Ataków Kolorów
            </span>
            <div className="grid grid-cols-4 gap-2 text-[9px] text-center font-mono">
              <div className="bg-red-500/10 p-1.5 rounded-xl border border-rose-500/15">
                <span className="block text-sm">🔴</span>
                <span className="text-rose-300 font-extrabold block mt-0.5">Szturm</span>
              </div>
              <div className="bg-yellow-500/10 p-1.5 rounded-xl border border-amber-500/15">
                <span className="block text-sm">🟡</span>
                <span className="text-amber-300 font-extrabold block mt-0.5">Rozbryzg</span>
              </div>
              <div className="bg-purple-500/10 p-1.5 rounded-xl border border-purple-500/15">
                <span className="block text-sm">🟣</span>
                <span className="text-purple-300 font-extrabold block mt-0.5">Urok</span>
              </div>
              <div className="bg-cyan-500/10 p-1.5 rounded-xl border border-cyan-500/15">
                <span className="block text-sm">🔵</span>
                <span className="text-cyan-300 font-extrabold block mt-0.5">Uzdrowienie</span>
              </div>
            </div>
          </div>

        </div>

      </motion.div>

      {/* 3. Heroine Full-Screen Cut-In portrait reaction */}
      <AnimatePresence>
        {activeHeroineCutIn && (
          <HeroineCutIn
            id={activeHeroineCutIn.id}
            name={activeHeroineCutIn.name}
            attackName={activeHeroineCutIn.attackName}
            quote={activeHeroineCutIn.quote}
            color={activeHeroineCutIn.color}
            accentColor={activeHeroineCutIn.accentColor}
            combo={activeHeroineCutIn.combo}
          />
        )}
      </AnimatePresence>

      {/* 4. Opponent Skill Flash Overlay */}
      <AnimatePresence>
        {isOpponentAttacking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-red-950/20 border-8 border-red-600/40 pointer-events-none z-45 mix-blend-color-dodge flex items-center justify-center"
          >
            <div className="text-red-500 font-black text-3xl tracking-widest uppercase animate-ping">
              ⚠️ KONTRATAK! ⚠️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. End Game Modal */}
      <AnimatePresence>
        {gameResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 35 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#211109] border-2 border-[#ff9068]/50 rounded-[44px] p-6 md:p-8 max-w-md w-full text-center space-y-6 shadow-3xl"
            >
              {gameResult === 'WON' ? (
                <>
                  <div className="mx-auto w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
                    <Award className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 tracking-[0.35em] uppercase block">
                      Zwycięstwo!
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      Pokonałaś {opponent.name}!
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed italic px-2">
                      "{(opponent as any).winPhrase || 'Niemożliwe... Moje idealne, sterylne tablice i regulaminy runęły!'}"
                    </p>
                  </div>

                  {isTraining ? (
                    <div className="bg-black/55 border border-purple-500/15 p-4 rounded-3xl space-y-2 shadow-inner">
                      <h4 className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-purple-300">Trening ukończony pomyślnie!</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Świetny wynik! Ten poziom służy tylko jako bezstresowy trening. Nie przyznaje on żadnych zasobów ani nie zapisuje postępów na mapie. Wejdź na Arenę, aby walczyć o prawdziwe nagrody!
                      </p>
                    </div>
                  ) : (
                    <div className="bg-black/55 border border-[#ff9068]/15 p-4 rounded-3xl space-y-3 shadow-inner">
                      <h4 className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#ffdfa0]">Zdobyte Łupy:</h4>
                      <div className="grid grid-cols-3 gap-2.5 text-xs">
                        <div className="bg-[#ff9068]/10 p-2.5 rounded-2xl border border-[#ff9068]/20">
                          <span className="block text-lg">🪙</span>
                          <span className="font-bold text-white block mt-0.5">+{30 + opponentLevel * 10}</span>
                          <span className="block text-[8px] text-slate-400 uppercase tracking-wider">Złoto</span>
                        </div>
                        <div className="bg-cyan-500/10 p-2.5 rounded-2xl border border-cyan-500/20">
                          <span className="block text-lg">💎</span>
                          <span className="font-bold text-cyan-300 block mt-0.5">+{2 + Math.floor(opponentLevel / 3)}</span>
                          <span className="block text-[8px] text-slate-400 uppercase tracking-wider">Diamenty</span>
                        </div>
                        <div className="bg-purple-500/10 p-2.5 rounded-2xl border border-purple-500/20">
                          <span className="block text-lg">✨</span>
                          <span className="font-bold text-purple-300 block mt-0.5">+{40 + opponentLevel * 15}</span>
                          <span className="block text-[8px] text-slate-400 uppercase tracking-wider">XP</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="mx-auto w-20 h-20 bg-rose-500/20 border-2 border-rose-500 rounded-full flex items-center justify-center text-rose-500 animate-pulse">
                    <Skull className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-rose-400 tracking-[0.35em] uppercase block">
                      Porażka
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      {isTraining ? 'Koniec treningu' : 'Terapeutki Cię Wyciszyły'}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed italic px-2">
                      {isTraining 
                        ? '"Spróbuj jeszcze raz ułożyć pasujące diamenty. Praktyka czyni mistrza!"'
                        : '"Twoje niesymetryczne zachowanie zostało zaadresowane w naszym regulaminie."'}
                    </p>
                  </div>

                  <div className="bg-black/55 border border-rose-500/15 p-4 rounded-3xl shadow-inner">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {isTraining 
                        ? 'W tym trybie nie tracisz żadnych zasobów ani postępu. Możesz trenować dowolną ilość razy!'
                        : 'Ulepsz siłę i zdrowie swoich nauczycielek w panelu rozwoju i spróbuj ponownie!'}
                    </p>
                  </div>
                </>
              )}

              {gameResult === 'WON' ? (
                <div className="flex flex-col gap-2.5 w-full">
                  {!isTraining && opponentLevel < 33 && (
                    <button
                      onClick={handlePlayNextGame}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black tracking-widest uppercase text-xs shadow-lg transition hover:brightness-110 active:scale-95 border-b-4 border-emerald-700"
                    >
                      Następna bitwa ➔ Poziom {opponentLevel + 1}
                    </button>
                  )}
                  <button
                    onClick={handleFinishGame}
                    className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 font-bold text-xs tracking-wider uppercase transition active:scale-95"
                  >
                    {isTraining ? 'Wróć do menu' : 'Zapisz i wróć na mapę'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleFinishGame}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-[#ff9068] text-slate-950 font-black tracking-widest uppercase text-xs shadow-lg transition hover:brightness-110 active:scale-95 border-b-4 border-amber-700"
                >
                  {isTraining ? 'Wróć do menu' : 'Odbierz pocieszenie & wróć'}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. No Moves Popup Modal */}
      <AnimatePresence>
        {noMovesPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 35 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#211109] border-2 border-purple-500/50 rounded-[44px] p-6 md:p-8 max-w-md w-full text-center space-y-6 shadow-3xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="mx-auto w-20 h-20 bg-purple-500/20 border-2 border-purple-500 rounded-full flex items-center justify-center text-purple-400 animate-pulse">
                <Clock className="w-10 h-10" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black text-purple-300 tracking-[0.35em] uppercase block">
                  Brak ruchu!
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  Koniec Ruchów na Planszy!
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed italic px-2">
                  "Kierownik przeliczył wszystkie kombinacje i zadecydował o zakończeniu rundy z powodu braku perspektyw zysku."
                </p>
              </div>

              <div className="bg-black/55 border border-purple-500/15 p-4 rounded-3xl space-y-1 shadow-inner">
                <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-purple-300 block">TWÓJ UZYSKANY WYNIK</span>
                <strong className="text-3xl font-black text-white">{score} pkt</strong>
                {score > (playerProfile.stats.trainingHighScore || 0) && (
                  <span className="text-[10px] text-amber-300 font-extrabold block mt-1 animate-bounce">🏆 NOWY REKORD ŻYCIA!</span>
                )}
              </div>

              <div className="flex flex-col gap-2.5 w-full">
                <button
                  onClick={() => {
                    sound.playClick();
                    // Reset game for another try
                    setScore(0);
                    setComboCount(0);
                    setTurnsUsed(0);
                    setNoMovesPopup(false);
                    initializeBoard();
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500 text-slate-950 font-black tracking-widest uppercase text-xs shadow-lg transition hover:brightness-110 active:scale-95 border-b-4 border-purple-700"
                >
                  Zacznij od nowa
                </button>
                <button
                  onClick={handleFinishGame}
                  className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-slate-300 font-bold text-xs tracking-wider uppercase transition active:scale-95"
                >
                  Zapisz wynik i wyjdź
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
