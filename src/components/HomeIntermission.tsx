/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Moon, MessageCircle, Heart, ShieldCheck, Sparkles, AlertCircle, Smartphone } from 'lucide-react';
import { sound } from './SoundManager';
import { GameState, PlayerProfile } from '../types';
import PhoneModal from './PhoneModal';

interface HomeIntermissionProps {
  completedChapterId: number;
  onFinishIntermission: () => void;
  freedomScore: number;
  orderScore: number;
  playerName?: string;
  gameState: GameState;
  playerProfile: PlayerProfile;
}

interface IntermissionTopic {
  id: string;
  title: string;
  playerText: string;
  husbandText: string;
  icon: React.ReactNode;
}

export default function HomeIntermission({
  completedChapterId,
  onFinishIntermission,
  freedomScore,
  orderScore,
  playerName = 'Asystentka',
  gameState,
  playerProfile
}: HomeIntermissionProps) {
  const [selectedTopic, setSelectedTopic] = useState<IntermissionTopic | null>(null);
  const [discussedTopicIds, setDiscussedTopicIds] = useState<string[]>([]);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Helper to compute unread count on the fly
  const calculateUnread = () => {
    let count = 0;
    if (gameState.currentChapterId >= 21) {
      const totalMsgs = 3;
      const readCountStr = localStorage.getItem('phone_read_chat_anonim');
      if (!readCountStr) {
        count++;
      } else {
        const readCount = parseInt(readCountStr, 10);
        if (totalMsgs > readCount) {
          count++;
        }
      }
    }

    let totalCalls = 2;
    if (gameState.currentChapterId >= 6) totalCalls++;
    if (gameState.currentChapterId >= 11) totalCalls++;
    if (gameState.currentChapterId >= 12) totalCalls++;
    if (gameState.currentChapterId >= 15) totalCalls++;
    if (gameState.currentChapterId >= 21) totalCalls += 3;

    const readCallsStr = localStorage.getItem('phone_read_calls_count');
    if (!readCallsStr) {
      count += (totalCalls > 0 ? 1 : 0);
    } else {
      const readCalls = parseInt(readCallsStr, 10);
      if (totalCalls > readCalls) {
        count++;
      }
    }
    return count;
  };

  React.useEffect(() => {
    setUnreadCount(calculateUnread());
    
    const handleStorageChange = () => {
      setUnreadCount(calculateUnread());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [gameState.currentChapterId]);

  // Sound triggers
  const handleSelectTopic = (topic: IntermissionTopic) => {
    sound.playChoice();
    setSelectedTopic(topic);
    if (!discussedTopicIds.includes(topic.id)) {
      setDiscussedTopicIds(prev => [...prev, topic.id]);
    }
  };

  const handleBackToTopics = () => {
    sound.playClick();
    setSelectedTopic(null);
  };

  const handleSleep = () => {
    sound.playAchievement();
    onFinishIntermission();
  };

  // Generate dynamic topics based on completed chapter ID
  const getTopicsForChapter = (chapterId: number): IntermissionTopic[] => {
    const defaultTopics: IntermissionTopic[] = [
      {
        id: 'tiredness',
        title: 'Podziel się zmęczeniem i stresem',
        playerText: 'Tomek, ta praca jest niesamowicie wycieńczająca. Codziennie czuję, jakbym stąpała po cienkim lodzie między dwiema zwalczającymi się grupami w kadrze...',
        husbandText: 'Widzę, jak bardzo się przejmujesz, kochanie. Pamiętaj, że nie jesteś tam po to, by zbawiać cały świat kosztem własnego zdrowia. Jestem z Ciebie dumny. Zrobiłem Ci melisę, napij się.',
        icon: <Coffee className="w-5 h-5 text-amber-400" />
      },
      {
        id: 'general_suspicion',
        title: 'Porozmawiaj o podejrzanych zachowaniach terapeutek',
        playerText: 'Terapeutki stale knują, manipulują, kłamią i próbują zdobywać wpływ na dzieci i nas. One nie chcą pomagać, one realizują jakąś zimną intrygę!',
        husbandText: 'Też to czuję z Twoich opowieści. Te kobiety działają jak chłodna korporacja. Bądź ostrożna, zbieraj dowody i nie daj się wciągnąć w ich manipulacje. Prawda zawsze wyjdzie na jaw.',
        icon: <AlertCircle className="w-5 h-5 text-rose-400" />
      }
    ];

    switch (chapterId) {
      case 1:
        return [
          {
            id: 'ch1_basia',
            title: 'Opowiedz o radosnym chaosie Pani Basi',
            playerText: 'Pani Basia to wspaniała nauczycielka, pełna ciepła i energii. W jej sali dzieci malują palcami i głośno się śmieją, ale terapeutki patrzą na nią jak na przestępcę...',
            husbandText: 'Prawdziwy nauczyciel z powołaniem to dziś rzadkość, kochanie. Dzieci potrzebują radości i swobody, a nie tylko sztywnej dyscypliny. Dobrze, że widzisz w niej dobro.',
            icon: <Sparkles className="w-5 h-5 text-emerald-400" />
          },
          {
            id: 'ch1_calm',
            title: 'Opowiedz o zimnym rygorze Pani Calm',
            playerText: 'Pani Calm uważa, że wszelkie emocje i hałas są szkodliwe. Wycisza dzieci za pomocą dziwnych, symetrycznych metod. To wygląda przerażająco sterylnie...',
            husbandText: 'Sterylna cisza w przedszkolu? Brzmi jak z jakiejś dystopii. Dzieci to nie roboty, które można zaprogramować na absolutny spokój. Trzymaj się od niej na dystans.',
            icon: <ShieldCheck className="w-5 h-5 text-blue-400" />
          },
          ...defaultTopics
        ];
      case 2:
        return [
          {
            id: 'ch2_mural',
            title: 'Opowiedz o bitwie o kolorowy mural',
            playerText: 'Chcieliśmy namalować na ścianie pięknego, kolorowego duszka, a terapeutki kazały zamalować wszystko smutnym, beżowym kolorem pod pretekstem "nadstymulacji"!',
            husbandText: 'Beżowy pokój dla dzieci? To brzmi potwornie przygnębiająco! Dobrze, że walczysz o kolory i wyobraźnię maluchów. Świat bez kolorów byłby strasznie nudny.',
            icon: <Sparkles className="w-5 h-5 text-amber-400" />
          },
          {
            id: 'ch2_harmony',
            title: 'Opowiedz o podsłuchanej tajemnicy Pani Harmony',
            playerText: 'Podsłuchałam Panią Harmony mówiącą o tajemniczym pokoju ukrytym za szafką numer 7 w szatni! Podobno montują tam jakiś emiter fal wyciszających...',
            husbandText: 'Co?! Ukryty pokój za szafką w przedszkolu? Kochanie, to robi się naprawdę niebezpieczne. Proszę, nie pakuj się tam sama po godzinach. Bądź niezwykle ostrożna.',
            icon: <AlertCircle className="w-5 h-5 text-rose-500" />
          },
          ...defaultTopics
        ];
      case 3:
        return [
          {
            id: 'ch3_secret_room',
            title: 'Opowiedz o tajnym podziemnym pokoju',
            playerText: 'Zakradłam się tam, Tomek! Za szafką numer 7 jest prawdziwe, podziemne centrum kontroli z emiterami, ekranami i skradzionymi planami nauczycielek!',
            husbandText: 'Żartujesz?! Centrum dowodzenia pod przedszkolem? To brzmi jak sprawa dla kuratorium albo nawet policji! Proszę cię, nie ryzykuj tak więcej. Bardzo się o Ciebie martwię.',
            icon: <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
          },
          {
            id: 'ch3_notebook',
            title: 'Pokaż skradziony Złoty Zeszyt',
            playerText: 'Udało mi się stamtąd wykraść "Złoty Zeszyt", który terapeutki odebrały nauczycielkom. Są w nim plany obrony przedszkola przed manipulacjami.',
            husbandText: 'To potężny dowód ich kradzieży i knucia. Jeśli nauczycielki chcą dobra dzieci, ten zeszyt pomoże im odeprzeć atak. Ale pamiętaj: działaj dyskretnie, nie daj się złapać.',
            icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />
          },
          ...defaultTopics
        ];
      case 4:
        return [
          {
            id: 'ch4_final_battle',
            title: 'Opowiedz o zbliżającym się Dniu Kolorów',
            playerText: 'Jutro rozstrzygnie się los przedszkola. Nauczycielki budują fort wolności, a terapeutki montują na dachu emiter harmonii, by przejąć całkowitą kontrolę nad umysłami dzieci...',
            husbandText: 'Brzmi jak absolutne starcie. Bez względu na to, co wybierzesz - wolność czy porządek - pamiętaj, że jestem z Tobą. Zrób to, co podpowiada Ci serce, wierzę w Twoją mądrość.',
            icon: <Heart className="w-5 h-5 text-rose-500" />
          },
          ...defaultTopics
        ];
      case 40:
      case 41:
        return [
          {
            id: 'ch41_cafe',
            title: 'Opowiedz o spotkaniu w kawiarni z Basią po zamknięciu',
            playerText: 'Tomek, spotkałam się z Basią w kawiarni „Kawa i Kolory”. Przedszkole zostało zamknięte i opieczętowane, ale nauczycielki trzymają się razem i nie dały się złamać.',
            husbandText: 'Cieszę się, kochanie, że masz w nich takie oparcie. Budynek można zamknąć, ale wartości i dobro, które dałyście dzieciom, będą procentować przez całe ich życie.',
            icon: <Coffee className="w-5 h-5 text-amber-400" />
          },
          {
            id: 'ch41_journal',
            title: 'Pokaż mężowi „Pamiętnik Po Upadku”',
            playerText: 'Stworzyłam Pamiętnik Po Upadku. Spisuję w nim losy kadry, analizuję działania Małgorzaty i zachowuję prawdę o tym, co naprawdę działo się w Tęczowym Zakątku.',
            husbandText: 'To genialny krok. Prawda jest najsilniejszą bronią. Jeżeli Zakon Porządku spróbuje znowu zaatakować w innej placówce, Twój Pamiętnik otworzy ludziom oczy.',
            icon: <Sparkles className="w-5 h-5 text-emerald-400" />
          },
          ...defaultTopics
        ];
      default:
        return [
          {
            id: 'conspiracy_growth',
            title: 'Podziel się obawami o nową intrygę',
            playerText: 'Myślałam, że po Dniu Kolorów wszystko się uspokoi, ale te terapeutki ciągle knują! Pojawiła się nowa nauczycielka Amelia, która dziwnie kręci się wokół nich...',
            husbandText: 'Czyli walka trwa nadal. Amelia może być wtyczką. Dobrze, że masz oczy szeroko otwarte, kochanie. Trzymaj się blisko prawdziwych przyjaciół i ufaj swojej intuicji.',
            icon: <AlertCircle className="w-5 h-5 text-rose-400" />
          },
          {
            id: 'director_pressure',
            title: 'Opowiedz o naciskach Dyrekcji i Kierownika',
            playerText: 'Dyrektorka i ten tajemniczy Łysy Kierownik z syndykatu wywierają na nas ogromną presję. Chcą całkowicie usunąć spontaniczność z przedszkola.',
            husbandText: 'Niebieskie kołnierzyki i syndykaty... To brzmi potężnie, ale pamiętaj: prawda i dobro maluchów są silniejsze niż ich tabelki i wpływy. Masz moje pełne wsparcie, kochanie.',
            icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
          },
          ...defaultTopics
        ];
    }
  };

  const topics = getTopicsForChapter(completedChapterId);

  // Determine advice summary line from Tomek
  const getTomekAdvice = () => {
    if (freedomScore > orderScore + 15) {
      return 'Kochanie, widzę, że mocno wspierasz wolność i kreatywność dzieciaków. To piękne. Pamiętaj tylko, by w tym całym radosnym chaosie nie dać się podejść chłodnym intrygom terapeutek.';
    } else if (orderScore > freedomScore + 15) {
      return 'Kochanie, rozumiem, że szukasz stabilizacji i spokoju w tym szaleństwie. Ale uważaj, by pod płaszczem harmonii terapeutki nie narzuciły dzieciom bezdusznego rygoru.';
    } else {
      return 'Świetnie balansujesz między radosną wolnością a zdrowym porządkiem. Ta neutralność i zbieranie dowodów to mądra taktyka. Nie daj im poznać, co planujesz.';
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black flex flex-col justify-between overflow-hidden select-none">
      {/* Background with warm brightness overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] saturate-[1.1] transition-all duration-1000"
        style={{ backgroundImage: `url('/assets/images/home_cozy_bg_1783673202781.jpg')` }}
      />
      
      {/* Ambient warm lamp light filter */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Top Header */}
      <div className="relative z-20 px-6 pt-5 pb-3 bg-gradient-to-b from-black/80 to-transparent flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0 border-b border-amber-500/10">
        <div className="flex items-center gap-2.5">
          <Moon className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <h2 className="text-xs font-black tracking-widest text-amber-400 uppercase font-mono">Wieczorny powrót do domu</h2>
            <p className="text-[10px] text-slate-300">Rozdział {completedChapterId} zakończony • Czas na rozmowę</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
              ☀️ Wolność: {freedomScore}%
            </div>
            <div className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400">
              🔷 Ład: {orderScore}%
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSwipe();
              setIsPhoneOpen(true);
            }}
            className="relative px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[9px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-amber-950/20 text-amber-300"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Telefon</span>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main content viewport */}
      <div className="relative z-20 flex-1 overflow-y-auto px-4 md:px-8 py-4 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full items-center justify-center">
        
        {/* Left side: Husband's Portrait (glowing, cozy style) */}
        <div className="w-40 h-52 md:w-56 md:h-72 shrink-0 relative rounded-3xl overflow-hidden border-2 border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)] bg-slate-900/50">
          <img 
            src="/assets/images/husband_portrait_1783673184069.jpg" 
            alt="Mąż Tomek" 
            className="w-full h-full object-cover object-top scale-102 hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3 text-center">
            <span className="text-xs font-black text-amber-200 tracking-wide block">Mąż Tomek</span>
            <span className="text-[9px] text-amber-400/80 font-mono">Twój stały bezpieczny port</span>
          </div>
        </div>

        {/* Right side: Conversation Box */}
        <div className="flex-1 w-full max-w-lg flex flex-col justify-between min-h-[300px] md:min-h-[340px] bg-black/75 backdrop-blur-md rounded-3xl border border-amber-500/10 p-5 md:p-6 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!selectedTopic ? (
              // STEP A: Choose conversation topic
              <motion.div 
                key="topic-selection"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-amber-400" />
                    O czym chcesz opowiedzieć mężowi?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Siedzicie w salonie przy gorącej herbacie. Tomek patrzy na Ciebie z troską i czeka, aż podzielisz się swoimi dzisiejszymi obawami i podejrzeniami.
                  </p>

                  <div className="space-y-2.5 max-h-[180px] md:max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                    {topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleSelectTopic(topic)}
                        className={`w-full text-left p-3 rounded-2xl border transition flex items-center gap-3 active:scale-98 ${
                          discussedTopicIds.includes(topic.id)
                            ? 'bg-amber-500/5 border-amber-500/20 text-slate-300 hover:bg-amber-500/10'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="p-1.5 rounded-xl bg-black/40 border border-white/5 shrink-0">
                          {topic.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{topic.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">Dziel się szczegółami</p>
                        </div>
                        <span className="text-xs text-amber-400/70 font-mono">→</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer advice / sleep action */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] text-amber-400/70 font-mono italic text-center sm:text-left max-w-[260px]">
                    {discussedTopicIds.length > 0 ? '✔ Przegadano obawy. Możesz teraz iść spać.' : 'Porozmawiaj z Tomkiem przed snem.'}
                  </p>
                  <button
                    onClick={handleSleep}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-black font-black text-xs tracking-widest uppercase shadow-lg transition active:scale-98 flex items-center justify-center gap-2 shrink-0"
                  >
                    <Moon className="w-3.5 h-3.5" />
                    Idź spać (Dalej)
                  </button>
                </div>
              </motion.div>
            ) : (
              // STEP B: Show topic dialogues
              <motion.div 
                key="topic-dialogue"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4 flex-1 overflow-y-auto max-h-[220px] md:max-h-[260px] pr-1 scrollbar-thin">
                  {/* Player speech bubble */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-wider text-amber-400 uppercase font-mono">{playerName} (Ty):</span>
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-100 leading-relaxed rounded-tl-none">
                      "{selectedTopic.playerText}"
                    </div>
                  </div>

                  {/* Husband speech bubble */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-wider text-sky-400 uppercase font-mono">Mąż Tomek:</span>
                    <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-100 leading-relaxed rounded-tr-none">
                      "{selectedTopic.husbandText}"
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 italic">Tomek podaje Ci kubek ciepłej herbaty...</span>
                  <button
                    onClick={handleBackToTopics}
                    className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition active:scale-98"
                  >
                    Porozmawiaj o czymś innym
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Tomek's global supportive wisdom banner */}
      <div className="relative z-20 px-6 py-3 bg-black/90 border-t border-amber-500/10 text-center shrink-0">
        <p className="text-[11px] text-amber-200/90 font-mono tracking-wide max-w-2xl mx-auto leading-relaxed">
          💡 <strong className="text-amber-400">Rada od Tomka:</strong> "{getTomekAdvice()}"
        </p>
      </div>

      {/* Phone Modal */}
      <AnimatePresence>
        {isPhoneOpen && (
          <PhoneModal
            isOpen={isPhoneOpen}
            onClose={() => setIsPhoneOpen(false)}
            gameState={gameState}
            playerProfile={playerProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
