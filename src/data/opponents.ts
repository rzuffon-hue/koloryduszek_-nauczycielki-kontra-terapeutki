/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Opponent {
  name: string;
  maxHp: number;
  role: string;
  desc: string;
  portraitUrl: string;
  phraseStart: string;
  phraseHurt: string[];
  phraseSkill: string;
  color: string;
  abilityName: string;
}

export const OPPONENTS: { [key: string]: Opponent } = {
  calm: {
    name: 'Pani Calm',
    maxHp: 1200,
    role: 'Wielka Mistrzyni Zakonu',
    desc: 'Wierzy, że dzieciom potrzebny jest wyłącznie sterylny spokój pod kluczem.',
    portraitUrl: '/assets/images/calm_portrait_1783550841951.jpg',
    phraseStart: 'Zasady to podstawa. Czas uporządkować wasze zabawki.',
    phraseHurt: ['Ałć! Kto dopuścił te bezładne kolory?!', 'Regulamin nie przewiduje takiego chaosu!', 'Cisza! Proszę o natychmiastowe uspokojenie!'],
    phraseSkill: 'Uśmiech Kontroli: Blokuję losowe pola planszy!',
    color: 'border-cyan-500 bg-cyan-950/40 text-cyan-200',
    abilityName: 'Uśmiech Kontroli'
  },
  whisper: {
    name: 'Pani Whisper',
    maxHp: 1500,
    role: 'Specjalistka od Intryg',
    desc: 'Manipuluje otoczeniem za pomocą szeptów i siania wątpliwości.',
    portraitUrl: '/assets/images/whisper_portrait_1783550853186.jpg',
    phraseStart: 'Śśś... słyszycie tę piękną plotkę o waszych nauczycielkach?',
    phraseHurt: ['Moje uszy! Jaki głośny bunt!', 'Próbujesz krzyczeć? To bardzo niekulturalne.', 'Moje intrygi i tak was przerosną!'],
    phraseSkill: 'Plotka w Korytarzu: Mieszam wszystkie diamenty na planszy!',
    color: 'border-purple-500 bg-purple-950/40 text-purple-200',
    abilityName: 'Plotka w Korytarzu'
  },
  harmony: {
    name: 'Pani Harmony',
    maxHp: 1800,
    role: 'Korektorka Przestrzeni',
    desc: 'Bezwzględnie pilnuje restrykcyjnych instrukcji przestrzennych.',
    portraitUrl: '/assets/images/harmony_portrait_1783550862967.jpg',
    phraseStart: 'Wszystko musi leżeć idealnie symetrycznie. Wasza wolność burzy harmonię!',
    phraseHurt: ['Niesymetryczny atak! Poprawić to!', 'Zaburzyłaś geometrię mojego porządku!', 'Wyrównać linie rzędów!'],
    phraseSkill: 'Regulamin Ciszy: Blokuję czerwone diamenty na planszy!',
    color: 'border-emerald-500 bg-emerald-950/40 text-emerald-200',
    abilityName: 'Regulamin Ciszy'
  },
  echo: {
    name: 'Pani Echo',
    maxHp: 2200,
    role: 'Echo-Maniseryczna',
    desc: 'Kopiuje każdy ruch przeciwnika, obracając jego broń przeciwko niemu.',
    portraitUrl: '/assets/images/therapists_trio_1783451898546.jpg',
    phraseStart: 'Wasz krzyk powróci do was z podwójną siłą...',
    phraseHurt: ['Słyszę was... i odpowiadam tym samym!', 'Taki atak to żaden problem.', 'Wasze emocje to moje paliwo!'],
    phraseSkill: 'Maniseryczne Echo: Kopiuję twój ostatni atak z podwójną mocą!',
    color: 'border-blue-400 bg-blue-950/40 text-blue-200',
    abilityName: 'Maniseryczne Echo'
  },
  mirror: {
    name: 'Pani Mirror',
    maxHp: 2600,
    role: 'Odbiciowa Intrygantka',
    desc: 'Wielka tarcza z chłodnego szkła, która odbija ból spowrotem.',
    portraitUrl: '/assets/images/therapists_trio_1783451898546.jpg',
    phraseStart: 'Spójrzcie w zwierciadło prawdy – wasz zapał jest waszą zgubą.',
    phraseHurt: ['Au! Lustro pękło, ale wy ucierpicie bardziej!', 'Odbijam to z chłodem!', 'Za każdy cios uderzasz samą siebie.'],
    phraseSkill: 'Zwierciadło Bólu: Odbijam część twoich obrażeń!',
    color: 'border-rose-400 bg-rose-950/40 text-rose-200',
    abilityName: 'Zwierciadło Bólu'
  },
  silence: {
    name: 'Pani Silence',
    maxHp: 3000,
    role: 'Główna Archiwistka Ciszy',
    desc: 'Wyłącza i wycisza wszelkie radosne przejawy energii w mgnieniu oka.',
    portraitUrl: '/assets/images/therapists_trio_1783451898546.jpg',
    phraseStart: 'Zasłaniam kurtynę dźwięków. Cisza absolutna.',
    phraseHurt: ['Słowa są zbędne!', 'Przerwany spokój boli najmocniej.', 'Nigdy nie zagłuszycie mojego zakazu.'],
    phraseSkill: 'Kurtyna Milczenia: Blokuję umiejętności nauczycielek!',
    color: 'border-slate-400 bg-slate-900/40 text-slate-200',
    abilityName: 'Kurtyna Milczenia'
  },
  principal: {
    name: 'Pani Przełożona Generalna',
    maxHp: 4500,
    role: 'Naczelny Autorytet Zakonu',
    desc: 'Absolutna władczyni chłodnego rygoru przedszkola.',
    portraitUrl: '/assets/images/therapists_trio_1783451898546.jpg',
    phraseStart: 'To ja stworzyłam ten rygor! Wasz śmiech zostanie wygaszony na zawsze!',
    phraseHurt: ['Niesubordynacja! Wezwę rodziców!', 'To jest rażące złamanie statutu!', 'Nie zniszczycie mojego imperium spokoju!'],
    phraseSkill: 'Wielkie Kółeczko: Odbieram graczowi następną turę!',
    color: 'border-red-600 bg-red-950/50 text-red-200',
    abilityName: 'Wielkie Kółeczko'
  },
  lysy_kierownik: {
    name: 'Łysy Kierownik',
    maxHp: 999999,
    role: 'Prawdziwy Szef w Cieniu',
    desc: 'Oligarcha porządku, który pociąga za sznurki i nienawidzi kolorów. W tym trybie atakujesz go tylko po to, by zdobyć jak najwięcej punktów.',
    portraitUrl: '/assets/images/bald_manager_portrait_1783529726331.jpg',
    phraseStart: 'Czas przeliczyć waszą radosną kreatywność na czysty chłodny zysk i porządek. Pokaż, ile potrafisz zdobyć punktów!',
    phraseHurt: [
      'Moje udziały spadają!', 
      'Zarząd nie będzie zadowolony z tego koloru!', 
      'To niesymetryczne! Wyliczyć koszty!',
      'Mój budżet cierpi przez wasz hałas!',
      'Twoje punkty to tylko cyfry w moim arkuszu!'
    ],
    phraseSkill: 'Kalkulacja Kosztów: Tasuję i blokuję niektóre diamenty!',
    color: 'border-purple-600 bg-purple-950/50 text-purple-200',
    abilityName: 'Kalkulacja Kosztów'
  },
  amelia: {
    name: 'Pani Amelia',
    maxHp: 5000,
    role: 'Wysłanniczka Kierownika',
    desc: 'Używa swojego wdzięku i zaufania, by ukryć swoje sabotaże i zatrzymać postęp nauczycielek.',
    portraitUrl: '/assets/images/amelia_portrait_1783531566501.jpg',
    phraseStart: 'Przykro mi, ale ten porządek musi zostać utrzymany. Nie pozwólcie mi was skrzywdzić.',
    phraseHurt: [
      'Ojej! To naprawdę nie było w planie!',
      'Dlaczego nie chcecie po prostu spokoju?',
      'Przecież tylko wam pomagam!',
      'To tylko jedno z przedszkoli, nie dacie rady wszystkim!'
    ],
    phraseSkill: 'Uśmiech Zaufania: Tasuję planszę i blokuję losowe diamenty!',
    color: 'border-pink-500 bg-pink-950/40 text-pink-200',
    abilityName: 'Uśmiech Zaufania'
  }
};
