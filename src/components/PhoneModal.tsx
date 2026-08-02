/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, MessageSquare, Users, Image as ImageIcon, FileText, 
  Smartphone, Send, Sparkles, CheckCircle2,
  User, PhoneCall, PhoneMissed, BookOpen, Lock, Gamepad2, Trophy, Hash, Award
} from 'lucide-react';
import { GameState, PlayerProfile } from '../types';
import { CHARACTERS } from '../data/characters';
import { sound } from './SoundManager';
import DiamondAttack from './DiamondAttack';
import PhoneSnake from './PhoneSnake';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  playerProfile: PlayerProfile;
}

type PhoneTab = 'chat' | 'contacts' | 'calls' | 'gallery' | 'notes' | 'game';

export default function PhoneModal({ isOpen, onClose, gameState, playerProfile }: PhoneModalProps) {
  const [activeTab, setActiveTab] = useState<PhoneTab>('chat');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [showMinigame, setShowMinigame] = useState(false);
  const [showSnake, setShowSnake] = useState(false);
  const [snakeStats, setSnakeStats] = useState({ highScore: 0, lastScore: 0, gamesPlayed: 0 });

  // Load snake stats
  useEffect(() => {
    if (playerProfile?.username) {
      const statsKey = `snake_stats_${playerProfile.username}`;
      const saved = localStorage.getItem(statsKey);
      if (saved) {
        try {
          setSnakeStats(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [playerProfile?.username, showSnake]);

  if (!isOpen) return null;

  // Sound handlers
  const handleTabChange = (tab: PhoneTab) => {
    sound.playClick();
    setActiveTab(tab);
    setSelectedChatId(null);
  };

  const handleOpenChat = (charId: string) => {
    sound.playSwipe();
    setSelectedChatId(charId);
  };

  const handleCloseChat = () => {
    sound.playClick();
    setSelectedChatId(null);
  };

  const handleExpandImage = (url: string) => {
    sound.playClick();
    setExpandedImage(url);
  };

  const handleCloseImage = () => {
    sound.playClick();
    setExpandedImage(null);
  };

  // Determine decisions made by player to reflect in chat dialogue
  const decisions = gameState.decisions || [];
  const choseTeachers = decisions.includes('ch21_c2_go_teachers');
  const choseTherapists = decisions.includes('ch21_c2_go_therapists');
  const choseDeleteData = decisions.includes('ch22_c2_delete');
  const choseSaveData = decisions.includes('ch22_c2_save');

  // Dynamic chat contacts list details based on Chapter progress
  const chatContacts = useMemo(() => {
    const list = [
      { id: 'mama', name: 'Mama 🏠', role: 'Rodzina', color: '#10b981', avatar: '👩‍👧' },
      { id: 'system', name: 'Koloryduszek ✨', role: 'Magia', color: '#ec4899', avatar: '✨' }
    ];

    if (gameState.currentChapterId >= 1) {
      list.push({ id: 'basia', name: 'Pani Basia', role: 'Nauczycielki', color: '#fbbf24', avatar: '🌈' });
      list.push({ id: 'calm', name: 'Pani Calm', role: 'Terapeutki', color: '#60a5fa', avatar: '🔷' });
    }
    if (gameState.currentChapterId >= 6) {
      list.push({ id: 'amelia', name: 'Pani Amelia', role: 'Nauczycielki', color: '#f472b6', avatar: '🌸' });
    }
    if (gameState.currentChapterId >= 11) {
      list.push({ id: 'milena', name: 'Pani Milena', role: 'Nauczycielki', color: '#db2777', avatar: '🇬🇧' });
      list.push({ id: 'whisper', name: 'Pani Whisper', role: 'Terapeutki', color: '#a78bfa', avatar: '💜' });
    }
    if (gameState.currentChapterId >= 12) {
      list.push({ id: 'dyrektorka', name: 'Dyrektorka Helena', role: 'Główny Dyrektor', color: '#f59e0b', avatar: '👵' });
    }
    if (gameState.currentChapterId >= 21) {
      list.push({ id: 'anonim', name: 'Nieznany Numer 👁️', role: 'Sygnalista', color: '#94a3b8', avatar: '👤' });
    }
    return list;
  }, [gameState.currentChapterId]);

  // Dynamic chats definition based on chapter & decisions
  const chatMessages = useMemo(() => {
    const messages: { [charId: string]: { sender: 'them' | 'me', text: string, time: string }[] } = {
      mama: [
        { sender: 'them', text: 'Powodzenia w pierwszym dniu nowej pracy, córeczko! Daj znać jak poszło w tym przedszkolu.', time: '08:15' },
        { sender: 'me', text: 'Dzięki mamo! Dzieciaki są kochane, ale atmosfera w kadrze jest dosyć napięta między przedszkolankami a jakimiś terapeutkami...', time: '08:18' },
        { sender: 'them', text: 'Ojej, zawsze tak jest w nowych miejscach. Trzymaj się z daleka od kłótni i rób swoje! Trzymam kciuki! ❤️', time: '08:20' }
      ],
      system: [
        { sender: 'them', text: 'Błyszczące iskry tańczą w ciemności... Czy czujesz ich ciepło?', time: '20:00' },
        { sender: 'me', text: 'Koloryduszku! Czy to Ty wgrałeś tę aplikację na mój telefon?', time: '20:01' },
        { sender: 'them', text: 'Światło w Twojej dłoni jest kluczem do serc przedszkola. Podejmuj decyzje z odwagą i miłością.', time: '20:03' }
      ],
      basia: [
        { sender: 'them', text: 'Cześć! Super, że dołączyłaś do naszej załogi. Jakbyś potrzebowała pomocy z farbami czy zabawkami, wal śmiało!', time: '08:45' },
        { sender: 'me', text: 'Dzięki wielkie Pani Basiu, dzieci mają super energię w Pani sali!', time: '08:48' }
      ],
      calm: [
        { sender: 'them', text: 'Witaj w Tęczowym Zakątku. Pamiętaj, że nadrzędną wartością jest tu spokój i wyciszenie emocjonalne dzieci.', time: '09:00' },
        { sender: 'me', text: 'Dziękuję, rozumiem. Postaram się dbać o porządek.', time: '09:02' }
      ]
    };

    // Amelia in Chapter 6
    if (gameState.currentChapterId >= 6) {
      messages.amelia = [
        { sender: 'them', text: 'Hejka! Jestem Amelia, nowa w zespole. Bardzo się cieszę, że też tu pracujesz!', time: '13:00' },
        { sender: 'me', text: 'Hej Amelia! Witaj w klubie, razem raźniej!', time: '13:02' },
        { sender: 'them', text: 'Dokładnie! Słyszałam, że są tu jakieś spięcia, ale myślę, że damy radę, prawda? 😉', time: '13:05' }
      ];
    }

    // Whisper & Milena in Chapter 11
    if (gameState.currentChapterId >= 11) {
      messages.whisper = [
        { sender: 'them', text: 'Widziałam, jak rozmawiasz z Basią... Bądź ostrożna. Ona bywa bardzo impulsywna i nieprzewidywalna.', time: '10:45' },
        { sender: 'me', text: 'Naprawdę? Wydawała się bardzo miła.', time: '10:47' },
        { sender: 'them', text: 'To tylko pozory, moja droga. Dla dobra dzieci i własnej kariery trzymaj się sprawdzonych zasad.', time: '10:50' }
      ];
      messages.milena = [
        { sender: 'them', text: 'Hi there! Jak idzie asystowanie? Lekcje angielskiego z tobą to czysta przyjemność!', time: '14:20' },
        { sender: 'me', text: 'Ooo dzięki Milena! Też bardzo lubię angielski z dzieciakami.', time: '14:22' },
        { sender: 'them', text: 'Great! Musimy kiedyś wyskoczyć na kawę po pracy i obgadać kilka spraw... Z dala od tych podejrzanych terapeutek.', time: '14:25' }
      ];
    }

    // Dyrektorka in Chapter 12
    if (gameState.currentChapterId >= 12) {
      messages.dyrektorka = [
        { sender: 'them', text: 'Pani Asystentko, proszę dostarczyć mi do gabinetu dzisiejszy raport frekwencji.', time: '11:15' },
        { sender: 'me', text: 'Dzień dobry Pani Dyrektor, oczywiście, zaraz przyniosę dokumenty.', time: '11:17' },
        { sender: 'them', text: 'Dziękuję. Cenię sobie Pani rzetelność i profesjonalizm.', time: '11:20' }
      ];
    }

    // Anonim in Chapter 21
    if (gameState.currentChapterId >= 21) {
      messages.anonim = [
        { sender: 'them', text: 'Ostrzeżenie: Nie ufaj Terapeutkom. One udają troskliwe, ale realizują tajną intrygę uciszania dzieci. Sprawdź bazę danych.', time: '19:45' },
        { sender: 'me', text: 'Kim jesteś? Skąd masz mój numer?', time: '19:47' },
        { sender: 'them', text: 'To nieważne. Ważne są dzieci. Ocal je przed rygorem.', time: '19:50' }
      ];

      // Add Chapter 21 tense communications from Basia and Calm
      messages.basia.push({ sender: 'them', text: 'Hej! Jak się trzymasz w tych ciemnościach? To przerażające, co ten Kierownik zrobił!', time: '20:05' });
      messages.basia.push({ sender: 'me', text: 'Zabezpieczam teren, Basiu. Czy dzieci są bezpieczne?', time: '20:06' });
      messages.basia.push({ sender: 'them', text: 'Tak, zrobiliśmy ze świeczek małe ogniska w bezpiecznej sali. Hania opowiada im legendy, żeby się nie bały.', time: '20:08' });

      messages.calm.push({ sender: 'them', text: 'Asystentko. Wszelkie procedury awaryjne zostały uruchomione. Kluczowa jest dyscyplina.', time: '20:02' });
      messages.calm.push({ sender: 'me', text: 'Pani Calm, co z systemami zapasowymi?', time: '20:03' });
      messages.calm.push({ sender: 'them', text: 'Kierownik zablokował węzły rygorem cyfrowym z poziomu serwerowni. Agregaty nie ruszą bez resetu ręcznego.', time: '20:05' });
    }

    // Inject chapter 21 decisions
    if (choseTeachers) {
      if (messages.basia) {
        messages.basia.push({ sender: 'them', text: 'Dziękuję, że pobiegłaś do nas do sali! Razem jesteśmy nie do zatrzymania! Tworzymy plan sabotażu kamer.', time: '20:15' });
      }
      if (messages.calm) {
        messages.calm.push({ sender: 'them', text: 'Zauważyłam, że wybrałaś pomoc nauczycielkom w ich salonie. Mam nadzieję, że zdajesz sobie sprawę z ryzyka utraty stabilności budynku.', time: '20:17' });
      }
    } else if (choseTherapists) {
      if (messages.calm) {
        messages.calm.push({ sender: 'them', text: 'Wspaniale, że dołączyłaś do mnie w gabinecie. Twoja dojrzałość ułatwi nam wyciszenie paniki.', time: '20:16' });
      }
      if (messages.basia) {
        messages.basia.push({ sender: 'them', text: 'Szkoda, że poszłaś z Calm... Rozumiem, że boisz się ciemności, ale nauczycielki nigdy się nie poddają!', time: '20:18' });
      }
    }

    // Inject chapter 22 decisions
    if (gameState.currentChapterId >= 22) {
      if (messages.basia) {
        messages.basia.push({ sender: 'them', text: 'Dotarliście do serwerowni? Musimy raz na zawsze uwolnić dzieci od tych strasznych profili badawczych!', time: '21:10' });
      }
      if (messages.calm) {
        messages.calm.push({ sender: 'them', text: 'Terminal serwerowy jest przed Wami. Baza danych to jedyny dowód prawny. Nie daj się ponieść emocjom.', time: '21:12' });
      }
      if (messages.system) {
        messages.system.push({ sender: 'them', text: 'W sercu maszyn drży prawda i kłamstwo. Co wybierzesz, gdy zapłonie rdzeń?', time: '21:15' });
      }
    }

    if (choseDeleteData) {
      if (messages.basia) {
        messages.basia.push({ sender: 'me', text: 'Skasowałam całą bazę danych Kierownika. Profile dzieci zniknęły na zawsze.', time: '21:40' });
        messages.basia.push({ sender: 'them', text: 'JESTEŚ CUDOWNA! O tym właśnie marzyłam! Wolność dzieci jest najważniejsza!', time: '21:42' });
      }
      if (messages.calm) {
        messages.calm.push({ sender: 'me', text: 'Zdecydowałam się usunąć bazę danych, by chronić prywatność dzieci.', time: '21:41' });
        messages.calm.push({ sender: 'them', text: 'To był lekkomyślny krok emocjonalny. Skasowałaś kluczowe dowody prawne przeciwko syndykatowi. Konsekwencje będą dotkliwe.', time: '21:44' });
      }
    } else if (choseSaveData) {
      if (messages.calm) {
        messages.calm.push({ sender: 'me', text: 'Pobrałam i zabezpieczyłam pełną bazę danych dla kuratorium.', time: '21:40' });
        messages.calm.push({ sender: 'them', text: 'Bardzo rozsądna decyzja. Teraz prawo jest po naszej stronie. Sprawiedliwość zwycięży.', time: '21:42' });
      }
      if (messages.basia) {
        messages.basia.push({ sender: 'me', text: 'Zabezpieczyłam bazę danych jako dowód prawny. Nie skasowałam jej.', time: '21:41' });
        messages.basia.push({ sender: 'them', text: 'No dobrze, rozumiem... Ale mam nadzieję, że te raporty nigdy więcej nie zostaną użyte przeciwko dzieciakom.', time: '21:44' });
      }
    }

    // Chapter 23 additions
    if (gameState.currentChapterId >= 23) {
      if (messages.basia) {
        messages.basia.push({ sender: 'them', text: 'Kierownik czeka w sali gimnastycznej. To ostateczne starcie! Bądźmy silni!', time: '22:00' });
      }
      if (messages.calm) {
        messages.calm.push({ sender: 'them', text: 'Nadszedł moment prawdy. Nawet my, terapeutki, staniemy przeciwko niemu. Dołącz do nas w sali gimnastycznej.', time: '22:02' });
      }
    }

    return messages;
  }, [gameState.currentChapterId, choseTeachers, choseTherapists, choseDeleteData, choseSaveData]);

  // Call history list dynamically based on Chapter
  const callsList = useMemo(() => {
    const list = [
      { name: 'Mama 🏠', time: 'Wczoraj 18:30', status: 'incoming', type: 'Odebrane' },
      { name: 'Pani Basia', time: 'Rozdział 1, 08:30', status: 'incoming', type: 'Odebrane' },
    ];

    if (gameState.currentChapterId >= 6) {
      list.unshift({ name: 'Pani Amelia', time: 'Rozdział 6, 14:02', status: 'incoming', type: 'Odebrane' });
    }
    if (gameState.currentChapterId >= 11) {
      list.unshift({ name: 'Pani Whisper', time: 'Rozdział 11, 09:12', status: 'missed', type: 'Nieodebrane' });
    }
    if (gameState.currentChapterId >= 12) {
      list.unshift({ name: 'Dyrektorka Helena', time: 'Rozdział 12, 11:45', status: 'incoming', type: 'Odebrane' });
    }
    if (gameState.currentChapterId >= 15) {
      list.unshift({ name: 'Sonia (Nasłuch)', time: 'Rozdział 15, 12:15', status: 'incoming', type: 'Odebrane' });
    }
    if (gameState.currentChapterId >= 21) {
      list.unshift({ name: 'Nieznany Numer 👁️', time: 'Dziś 19:30', status: 'missed', type: 'Nieodebrane' });
      list.unshift({ name: 'Pani Calm (3)', time: 'Dziś 20:05', status: 'missed', type: 'Nieodebrane' });
      list.unshift({ name: 'Pani Basia (2)', time: 'Dziś 19:58', status: 'incoming', type: 'Odebrane' });
    }
    return list;
  }, [gameState.currentChapterId]);

  // Gallery items defined statically and locked based on Chapter progress
  const galleryItems = useMemo(() => {
    const items = [
      { title: 'Okładka Koloryduszek', desc: 'Sercem i tęczą', url: '/assets/images/game_cover_1783451874065.jpg', minChapter: 1 },
      { title: 'Tęczowy Zakątek', desc: 'Nasz Ogród', url: '/assets/images/kindergarten_garden_1783451914603.jpg', minChapter: 1 },
      { title: 'Nauczycielki', desc: 'Ruch Oporu', url: '/assets/images/teachers_trio_1783451887451.jpg', minChapter: 2 },
      { title: 'Terapeutki', desc: 'Zakon Ładu', url: '/assets/images/therapists_trio_1783451898546.jpg', minChapter: 2 },
      { title: 'Plany Budynku', desc: 'Archiwum lat 70.', url: '/assets/images/blueprints_bg_1783533350195.jpg', minChapter: 16 },
      { title: 'Centrum Sterowania', desc: 'Cyber Rdzeń', url: '/assets/images/control_center_1783531596202.jpg', minChapter: 20 },
      { title: 'Ciemna Sala', desc: 'Awaria zasilania', url: '/assets/images/dark_kinder_bg_1783533364360.jpg', minChapter: 21 }
    ];

    return items.map(item => ({
      ...item,
      isUnlocked: item.minChapter <= gameState.currentChapterId
    }));
  }, [gameState.currentChapterId]);

  // Notebook content & Diary entries
  const diaryEntry = useMemo(() => {
    const chId = gameState.currentChapterId;
    if (chId <= 5) {
      return "Rozpoczęłam asystenturę w Tęczowym Zakątku. Cudowne dzieci, ale atmosfera jest gęsta. Nauczycielki (Basia, Hania, Zosia) chcą radosnej swobody, a Terapeutki (Calm, Whisper, Harmony) wprowadzają sztywne rygory i 'Kapsuły Wyciszenia'. Muszę uważać na czyją stronę stanę.";
    }
    if (chId <= 10) {
      return "W przedszkolu pojawiła się nowa nauczycielka Amelia. Dziewczyny od razu jej zaufały, ale ja wyczuwam w niej jakąś niepewność. Terapeutki coraz mocniej naciskają, a szeptane intrygi Whisper zaczynają dzielić ludzi. Łysy Kierownik nadzoruje wszystko z cienia.";
    }
    if (chId <= 15) {
      return "Milena uczy angielskiego z uśmiechem, a Kucharz Janek stara się wyżywić maluchy, ale presja rośnie. Pojawiła się Sonia od podsłuchu, która inwigiluje każdy szept. Robi się naprawdę niebezpiecznie. Terapeutki chcą przejąć pełną kontrolę!";
    }
    if (chId <= 20) {
      return "W-fista Robert pomógł nam zorganizować opór, ale nagle stało się coś strasznego - w całym budynku odcięto zasilanie! Przedszkole utonęło w ciemnościach. To celowa robota Kierownika, by stłumić naszą wolność. Komórka to moje jedyne okno na świat.";
    }
    if (chId >= 41) {
      return "Rozdział 41: Poza Murami. Spotkanie w kawiarni z Basią po zamknięciu Tęczowego Zakątka. Przedszkole zostało opieczętowane, lecz wywalczona wolność pozostała w sercach dzieci. W Pamiętniku Po Upadku notujemy losy kadry i śledzimy Małgorzatę.";
    }
    if (chId === 40) {
      return "Rozdział 40: Zamknięcie Tęczowego Zakątka. Budynek przedszkola opustoszał, a na drzwiach pojawiły się taśmy. Partnerka Łysego odebrała dziwny telefon od prywatnego numeru...";
    }
    return "Rozdział 23-39: Konfrontacja i próba przetrwania. Rozwijamy opór przeciwko Zakonowi Porządku i badamy tajemnice Małgorzaty!";
  }, [gameState.currentChapterId]);

  const notesAndTasks = useMemo(() => {
    const activeTasks = [];
    if (gameState.currentChapterId <= 5) {
      activeTasks.push({ text: 'Poznaj kadrę przedszkola', done: true });
      activeTasks.push({ text: 'Zrozum zasady panujące w Tęczowym Zakątku', done: true });
    } else if (gameState.currentChapterId <= 10) {
      activeTasks.push({ text: 'Obserwuj poczynania nowej nauczycielki Amelii', done: true });
      activeTasks.push({ text: 'Unikaj szeptów i intryg Pani Whisper', done: true });
    } else if (gameState.currentChapterId <= 15) {
      activeTasks.push({ text: 'Zlokalizuj ukryte podsłuchy Soni', done: true });
      activeTasks.push({ text: 'Przeciwstaw się rygorom Terapeutek', done: true });
    } else if (gameState.currentChapterId <= 20) {
      activeTasks.push({ text: 'Zorganizuj sportowy ruch oporu z Robertem', done: true });
      activeTasks.push({ text: 'Przetrwaj awarię zasilania w mroku', done: true });
    } else if (gameState.currentChapterId === 21) {
      activeTasks.push({ text: 'Zbadaj zablokowany budynek', done: choseTeachers || choseTherapists });
      activeTasks.push({ text: 'Podejmij decyzję o sojuszu z Nauczycielkami lub Terapeutkami', done: choseTeachers || choseTherapists });
    } else if (gameState.currentChapterId === 22) {
      activeTasks.push({ text: 'Włam się do terminalu serwerowni', done: true });
      activeTasks.push({ text: 'Rozwiąż dylemat bazy danych (Skasuj lub Pobierz)', done: choseDeleteData || choseSaveData });
    } else if (gameState.currentChapterId === 23) {
      activeTasks.push({ text: 'Idź do sali gimnastycznej', done: true });
      activeTasks.push({ text: 'Staw czoła Łysememu Kierownikowi', done: true });
    } else if (gameState.currentChapterId >= 41) {
      activeTasks.push({ text: 'Spotkaj się z Basią w kawiarni „Kawa i Kolory”', done: true });
      activeTasks.push({ text: 'Skonfiguruj Wpis w Pamiętniku Po Upadku', done: true });
      activeTasks.push({ text: 'Obserwuj ruchy Małgorzaty i Zakonu Porządku', done: false });
    }

    const assistanceNotes = [
      'NOTATKI ASYSTENTKI:',
      `• Pracujesz w przedszkolu Tęczowy Zakątek (Rozdział ${gameState.currentChapterId}).`,
      '• Telefon służy do śledzenia wiadomości, gromadzenia dowodów oraz zapisków w pamiętniku.',
      choseTeachers ? '• Sojusz: NAUCZYCIELKI. Basia, Hania i Zosia stawiają na kreatywną walkę i lampiony.' : '',
      choseTherapists ? '• Sojusz: TERAPEUTKI. Calm, Whisper i Harmony stawiają na symetrię, procedury i ciszę.' : '',
      choseDeleteData ? '• Decyzja: Skasowano bazę danych. Dzieci wolne, brak dowodów dla sądu.' : '',
      choseSaveData ? '• Decyzja: Pobrano bazę danych. Twarde dowody zabezpieczone.' : '',
    ].filter(Boolean);

    return { tasks: activeTasks, notes: assistanceNotes };
  }, [gameState.currentChapterId, choseTeachers, choseTherapists, choseDeleteData, choseSaveData]);

  // Update read counts on chat open
  React.useEffect(() => {
    if (selectedChatId) {
      const msgs = chatMessages[selectedChatId] || [];
      localStorage.setItem(`phone_read_chat_${selectedChatId}`, msgs.length.toString());
      window.dispatchEvent(new Event('storage'));
    }
  }, [selectedChatId, chatMessages]);

  // Update read counts on calls tab open
  React.useEffect(() => {
    if (activeTab === 'calls') {
      localStorage.setItem(`phone_read_calls_count`, callsList.length.toString());
      window.dispatchEvent(new Event('storage'));
    }
  }, [activeTab, callsList]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full h-full sm:h-auto sm:max-w-sm sm:aspect-[9/19] sm:max-h-[820px] bg-[#0c0806] rounded-none sm:rounded-[48px] border-0 sm:border-[10px] border-slate-800 shadow-[0_0_50px_rgba(251,191,36,0.15)] overflow-hidden flex flex-col justify-between text-white"
        style={{ boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)' }}
      >
        {/* Notch / Speaker cutout */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-30 items-center justify-center">
          <div className="w-12 h-1 bg-black rounded-full" />
        </div>

        {/* Home indicator bar at the bottom */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30" />

        {/* Screen Background Layer */}
        <div className="absolute inset-0 bg-[#0c0806] z-0" />
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-amber-500/5 to-cyan-500/5 z-0" />
        
        {/* Status Bar */}
        <div className="pt-4 sm:pt-7 px-6 flex justify-between items-center text-[10px] font-mono text-white/60 z-20 select-none">
          <span>20:21</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-[#fbbf24] animate-pulse">✨ DUSZFON LTE</span>
            <div className="w-4 h-2.5 border border-white/40 rounded-sm p-[1px] flex items-center">
              <div className="h-full w-4/5 bg-emerald-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Header App Title */}
        <div className="px-6 py-2 border-b border-white/5 z-10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-[11px] uppercase font-black tracking-wider text-amber-100 font-mono">Prywatny Telefon</span>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 sm:p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition text-white/70 flex items-center justify-center min-w-[36px] min-h-[36px]"
            title="Zamknij telefon"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Screen Body Viewport */}
        <div className="flex-1 overflow-y-auto px-4 py-3 z-10 font-sans">
          <AnimatePresence mode="wait">
            {selectedChatId ? (
              // Active Chat Conversation Screen
              <motion.div 
                key="chat-messages"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="h-full flex flex-col justify-between"
              >
                {/* Back to chat list with Close / X button */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                  <button 
                    onClick={handleCloseChat}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 min-h-[36px] px-2"
                  >
                    ← Wiadomości
                  </button>
                  <span className="text-xs font-bold text-white font-mono">
                    {chatContacts.find(c => c.id === selectedChatId)?.name}
                  </span>
                  <button 
                    onClick={onClose}
                    className="p-2 sm:p-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 transition text-rose-400 border border-rose-500/30 flex items-center justify-center min-w-[36px] min-h-[36px]"
                    title="Zamknij telefon"
                  >
                    <X className="w-5 h-5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Message logs */}
                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[55vh] sm:max-h-[380px] pr-1 scrollbar-thin">
                  {chatMessages[selectedChatId]?.map((msg, index) => (
                    <div 
                      key={`msg-${selectedChatId}-${index}`}
                      className={`flex flex-col max-w-[85%] ${msg.sender === 'me' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div 
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'me' 
                            ? 'bg-amber-500 text-black font-semibold rounded-tr-none' 
                            : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-white/30 font-mono mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                  {(!chatMessages[selectedChatId] || chatMessages[selectedChatId].length === 0) && (
                    <div className="text-center text-[10px] text-white/40 italic pt-8">Brak wiadomości.</div>
                  )}
                </div>

                {/* Simulated message input */}
                <div className="pt-2 border-t border-white/5 flex gap-1.5 mt-3 shrink-0">
                  <div className="flex-1 bg-white/5 rounded-full px-3 py-1.5 text-[10px] text-white/40 border border-white/5 italic flex items-center">
                    Komunikator zabezpieczony szyfrem...
                  </div>
                  <button className="p-2 rounded-full bg-white/5 text-white/40 cursor-not-allowed">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              // Navigation Views depending on active tab
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {activeTab === 'chat' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2">Komunikator / SMS</h3>
                    {chatContacts.map(contact => {
                      const msgs = chatMessages[contact.id] || [];
                      const lastMsg = msgs[msgs.length - 1];
                      const readCountStr = localStorage.getItem(`phone_read_chat_${contact.id}`);
                      const isUnread = !readCountStr || msgs.length > parseInt(readCountStr, 10);
                      return (
                        <div 
                          key={`contact-item-${contact.id}`}
                          onClick={() => handleOpenChat(contact.id)}
                          className={`p-3 rounded-2xl border transition duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                            isUnread 
                              ? 'bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                              : 'bg-white/5 hover:bg-white/10 border-white/5'
                          }`}
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner" style={{ backgroundColor: `${contact.color}20`, border: `1px solid ${contact.color}40` }}>
                              {contact.avatar}
                            </div>
                            {isUnread && (
                              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <span className={`text-xs font-bold truncate ${isUnread ? 'text-amber-100' : 'text-white'}`}>{contact.name}</span>
                              <span className="text-[8px] text-white/40 font-mono">{lastMsg?.time || 'Brak'}</span>
                            </div>
                            <p className={`text-[10px] truncate mt-0.5 ${isUnread ? 'text-amber-200/80 font-medium' : 'text-white/60'}`}>{lastMsg?.text || 'Brak wiadomości'}</p>
                          </div>
                          <ChevronRightIcon className={`w-3.5 h-3.5 shrink-0 ${isUnread ? 'text-amber-400' : 'text-white/30'}`} />
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'contacts' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2">Moje Kontakty</h3>
                    
                    {/* Always visible mother contact */}
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 shrink-0 flex items-center justify-center text-lg">
                        👩‍👧
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold text-white block truncate">Mama 🏠</span>
                        <span className="text-[9px] uppercase font-bold tracking-widest block font-mono mt-0.5 text-emerald-400">
                          +48 501 123 456
                        </span>
                      </div>
                    </div>

                    {/* Dynamic characters */}
                    {Object.values(CHARACTERS)
                      .filter(char => char.id !== 'system' && char.id !== 'player')
                      .map(char => {
                        const isUnlocked = (char.requiredChapter || 1) <= gameState.currentChapterId;
                        return (
                          <div 
                            key={`contact-profile-${char.id}`}
                            className={`p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 transition ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-white/10 shrink-0 flex items-center justify-center">
                              {isUnlocked && char.portraitUrl ? (
                                <img src={char.portraitUrl} alt={char.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5 text-white/40" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-white block truncate">
                                {isUnlocked ? char.name : 'Zablokowany Profil'}
                              </span>
                              <span className="text-[9px] uppercase font-bold tracking-widest block font-mono mt-0.5" style={{ color: isUnlocked ? char.accentColor : '#64748b' }}>
                                {isUnlocked ? char.role : 'Odkryj w fabule'}
                              </span>
                            </div>
                            {!isUnlocked && (
                              <Lock className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}

                {activeTab === 'calls' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2">Rejestr Połączeń</h3>
                    <div className="space-y-2">
                      {callsList.map((call, idx) => (
                        <div 
                          key={`call-${idx}`}
                          className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                              call.status === 'missed' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                            }`}>
                              {call.status === 'missed' ? <PhoneMissed className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className={`text-xs font-bold block ${call.status === 'missed' ? 'text-red-400' : 'text-white'}`}>
                                {call.name}
                              </span>
                              <span className="text-[9px] text-white/40 font-mono">{call.time}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-white/40">{call.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2">Galeria Dowodów</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {galleryItems.map((item, idx) => (
                        <div 
                          key={`gallery-idx-${idx}`}
                          onClick={() => item.isUnlocked && handleExpandImage(item.url)}
                          className={`rounded-xl overflow-hidden bg-white/5 border transition group ${
                            item.isUnlocked 
                              ? 'border-white/5 cursor-pointer hover:border-amber-400/40' 
                              : 'border-white/5 opacity-45 cursor-not-allowed'
                          }`}
                        >
                          <div className="aspect-square bg-slate-800 overflow-hidden relative flex items-center justify-center">
                            {item.isUnlocked ? (
                              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1.5 text-white/40">
                                <Lock className="w-6 h-6" />
                                <span className="text-[8px] font-mono tracking-widest uppercase text-center px-1">Zablokowane</span>
                              </div>
                            )}
                          </div>
                          <div className="p-1.5 text-center bg-black/40">
                            <span className="text-[9px] font-bold text-white block truncate">{item.isUnlocked ? item.title : '???'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {/* Diary entry */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-[#fbbf24]" /> Osobisty Pamiętnik
                      </h3>
                      <div className="bg-amber-500/5 rounded-2xl p-3.5 border border-amber-500/15 leading-relaxed text-xs text-amber-100 font-medium italic relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl" />
                        "{diaryEntry}"
                      </div>
                    </div>

                    {/* Tasks list */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Cele Fabularne
                      </h3>
                      <div className="space-y-2 bg-white/5 rounded-2xl p-3.5 border border-white/5">
                        {notesAndTasks.tasks.map((task, idx) => (
                          <div key={`task-${idx}`} className="flex items-start gap-2 text-[11px] leading-relaxed">
                            {task.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 mt-1" />
                            )}
                            <span className={task.done ? 'text-white/40 line-through' : 'text-amber-100 font-medium'}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                        {notesAndTasks.tasks.length === 0 && (
                          <div className="text-[10px] text-white/40 italic">Brak zadań w tym rozdziale.</div>
                        )}
                      </div>
                    </div>

                    {/* Notes list */}
                    <div>
                      <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-2">Notatnik Asystentki</h3>
                      <div className="bg-white/5 rounded-2xl p-3 border border-white/5 font-mono text-[9px] text-white/80 space-y-2 max-h-[140px] overflow-y-auto">
                        {notesAndTasks.notes.map((note, idx) => (
                          <p key={`note-${idx}`} className={note.startsWith('NOTATKA') ? 'text-amber-400 font-extrabold' : ''}>{note}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'game' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-black tracking-widest uppercase text-white/40 font-mono mb-1 flex items-center gap-1.5">
                      <Gamepad2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" /> Gry Telefoniczne
                    </h3>
                    
                    <div className="space-y-3">
                      {/* GAME 1: MATCH-3 */}
                      <div className="bg-gradient-to-br from-violet-950/45 to-fuchsia-950/40 rounded-2xl p-4 border border-violet-500/20 relative overflow-hidden shadow-lg transition-all duration-300 hover:border-violet-500/40">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/5 rounded-full blur-xl pointer-events-none" />
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                              🔴 Diamenty: Trening
                            </h4>
                            <p className="text-[10px] text-violet-200/60 mt-1 leading-relaxed">
                              Match-3 bez stresu i limitów czasowych. Ćwicz łączenie kryształów i poprawiaj rekord.
                            </p>
                            <div className="mt-2.5 inline-flex items-center gap-1 text-[9px] font-mono text-yellow-400 bg-black/45 px-2 py-0.5 rounded-lg border border-yellow-500/10">
                              <Trophy className="w-2.5 h-2.5" /> Rekord: {playerProfile?.stats?.trainingHighScore || 0} pkt
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              sound.playSwipe();
                              setShowMinigame(true);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-[10px] font-black tracking-widest uppercase shadow-md transition duration-200 active:scale-95 shrink-0 font-bold"
                          >
                            Graj
                          </button>
                        </div>
                      </div>

                      {/* GAME 2: SNAKE */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-4 border border-amber-400/30 relative overflow-hidden shadow-lg transition-all duration-300 hover:border-amber-400/50">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                              🧒 Przedszkolny Wężyk Ylla
                            </h4>
                            <p className="text-[10px] text-amber-900/70 mt-1 leading-relaxed">
                              Poprowadź wesołą grupę dzieci przez zakamarki przedszkola Ylla! Dołączaj kolejne maluchy i uważaj na przeszkody!
                            </p>
                            
                            <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[8px] text-amber-900/85">
                              <span className="bg-white/70 px-2 py-0.5 rounded-lg border border-amber-500/10 flex items-center gap-1 shadow-sm">
                                <Trophy className="w-2.5 h-2.5 text-amber-500" /> Rekord: {snakeStats.highScore || 0}
                              </span>
                              <span className="bg-white/70 px-2 py-0.5 rounded-lg border border-amber-500/10 flex items-center gap-1 shadow-sm">
                                <Award className="w-2.5 h-2.5 text-orange-500" /> Ostatni: {snakeStats.lastScore || 0}
                              </span>
                              <span className="bg-white/70 px-2 py-0.5 rounded-lg border border-amber-500/10 flex items-center gap-1 shadow-sm">
                                <Hash className="w-2.5 h-2.5 text-amber-600" /> Gry: {snakeStats.gamesPlayed || 0}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              sound.playSwipe();
                              setShowSnake(true);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-[10px] font-black tracking-widest uppercase shadow-md transition duration-200 active:scale-95 shrink-0"
                          >
                            Graj
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Expanded Gallery Image Overlay */}
        <AnimatePresence>
          {expandedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseImage}
              className="absolute inset-0 z-40 bg-black/95 flex flex-col justify-center items-center p-3 cursor-zoom-out"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img src={expandedImage} alt="Expanded Artwork" className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] text-white/60 font-mono mt-4 text-center">Naciśnij obrazek, aby powrócić</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tab Bar */}
        <div className="px-4 pb-4 sm:pb-6 pt-2 bg-black/40 border-t border-white/5 z-20 flex justify-around items-center select-none shrink-0 text-white">
          <button 
            onClick={() => handleTabChange('chat')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'chat' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">SMS</span>
          </button>

          <button 
            onClick={() => handleTabChange('contacts')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'contacts' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">Kontakty</span>
          </button>

          <button 
            onClick={() => handleTabChange('calls')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'calls' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <PhoneCall className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">Połączenia</span>
          </button>

          <button 
            onClick={() => handleTabChange('gallery')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'gallery' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">Galeria</span>
          </button>

          <button 
            onClick={() => handleTabChange('notes')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'notes' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">Zapiski</span>
          </button>

          <button 
            onClick={() => handleTabChange('game')}
            className={`flex flex-col items-center gap-1 transition ${activeTab === 'game' ? 'text-amber-400 scale-105' : 'text-white/50 hover:text-white/80'}`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span className="text-[8px] font-bold tracking-wider font-mono">Gra</span>
          </button>
        </div>
      </motion.div>

      {/* Game Overlay */}
      <AnimatePresence>
        {showMinigame && (
          <DiamondAttack
            playerProfile={playerProfile}
            opponentId="lysy_kierownik"
            opponentLevel={1}
            isTraining={true}
            onClose={(rewards) => {
              sound.playClick();
              setShowMinigame(false);
              if (rewards && rewards.trainingScore !== undefined) {
                const currentHighScore = playerProfile.stats.trainingHighScore || 0;
                if (rewards.trainingScore > currentHighScore) {
                  // Update playerProfile mutated object
                  playerProfile.stats.trainingHighScore = rewards.trainingScore;
                  
                  // Persist to local storage so other views pick it up on refresh or next load
                  localStorage.setItem('koloryduszek_current_profile_v2', JSON.stringify(playerProfile));
                  
                  // Also update in profiles list
                  const savedProfiles = localStorage.getItem('koloryduszek_profiles_v2');
                  if (savedProfiles) {
                    try {
                      const list = JSON.parse(savedProfiles);
                      const idx = list.findIndex((p: any) => p.username === playerProfile.username);
                      if (idx !== -1) {
                        list[idx].stats.trainingHighScore = rewards.trainingScore;
                        localStorage.setItem('koloryduszek_profiles_v2', JSON.stringify(list));
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  
                  // Trigger a custom event or window storage dispatch to notify parent components of state changes
                  window.dispatchEvent(new Event('storage'));
                }
              }
            }}
          />
        )}

        {showSnake && (
          <PhoneSnake
            username={playerProfile.username}
            onClose={() => {
              sound.playClick();
              setShowSnake(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-icons used internally
function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
