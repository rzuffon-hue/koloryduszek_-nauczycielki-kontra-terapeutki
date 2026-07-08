/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Faction = 'NAUCZYCIELKI' | 'TERAPEUTKI' | 'NEUTRAL';

export interface Character {
  id: string;
  name: string;
  faction: Faction;
  role: string;
  description: string;
  portraitUrl: string; // From generated images or customized fallback
  accentColor: string; // CSS color for styling
  secondaryColor: string;
  abilities: string[];
  history: string;
  winPhrase: string;
  requiredChapter?: number;
}

export interface Choice {
  id: string;
  text: string;
  impactFreedom: number; // 🌈 impact (+ or -)
  impactOrder: number;   // 🔷 impact (+ or -)
  nextSceneId: string;
  requiredFaction?: Faction;
  gainItem?: string;
  consequenceText?: string;
}

export interface DialogueLine {
  speakerId: string; // Character ID or 'SYSTEM' or 'PLAYER'
  text: string;
  expression?: 'happy' | 'serious' | 'mysterious' | 'sad' | 'excited';
}

export interface Scene {
  id: string;
  title: string;
  backgroundUrl: string;
  dialogue: DialogueLine[];
  choices: Choice[];
  minigameType?: 'FORT' | 'PAINT' | 'BLOCKS' | 'MOVEMENT' | 'HIDDEN' | 'PUZZLE' | 'DIAMOND';
  nextSceneIdOnMinigameWin?: string;
}

export interface Chapter {
  id: number;
  title: string;
  summary: string;
  startSceneId: string;
  scenes: { [key: string]: Scene };
}

export interface GameState {
  currentChapterId: number;
  currentSceneId: string;
  freedomScore: number; // 🌈 Dziecięca Wolność (0 to 100)
  orderScore: number;   // 🔷 Terapeutyczne Uporządkowanie (0 to 100)
  playerFactionChoice: Faction;
  inventory: string[];
  completedMinigames: string[];
  characterStatuses: { [charId: string]: 'locked' | 'unlocked' | 'friendly' };
}

export interface TeacherStats {
  id: string;
  name: string;
  color: string;
  element: string; // Gem type color: 'RED' | 'YELLOW' | 'PURPLE' | 'BLUE'
  level: number;
  damage: number;
  health: number;
  abilityName: string;
  abilityDesc: string;
  skinId: string;
}

export interface PlayerProfile {
  username: string;
  pin: string;
  level: number;
  xp: number;
  diamonds: number;
  gold: number;
  unlockedTeachers: string[];
  defeatedTherapists: string[];
  highestCompletedArenaLevel: number;
  achievements: string[];
  unlockedSkins: string[];
  storySave: GameState;
  teacherLevels: { [teacherId: string]: number };
  stats: {
    completedMinigamesCount: number;
    arenasWon: number;
    totalDamageDealt: number;
    diamondsMatched: number;
    trainingHighScore?: number;
  };
  isAdmin?: boolean;
}

