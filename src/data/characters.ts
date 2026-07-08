/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character } from '../types';

export const CHARACTERS: { [id: string]: Character } = {
  basia: {
    id: 'basia',
    name: 'Pani Basia',
    faction: 'NAUCZYCIELKI',
    role: 'Liderka Kreatywności',
    description: 'Nauczycielka z powołania, uśmiechnięta i wiecznie ubrudzona farbami. Wierzy, że najlepsza nauka płynie z radosnego chaosu.',
    portraitUrl: '/src/assets/images/basia_portrait_1783550806247.jpg',
    accentColor: '#fbbf24', // Amber
    secondaryColor: '#f59e0b',
    abilities: ['Mural Radości', 'Koralikowy Wybuch', 'Taniec Spontaniczny'],
    history: 'Pracuje w Tęczowym Zakątku od 10 lat. Zna każdy zakamarek przedszkola i stworzyła większość tutejszych zabawek z drewna. Nie znosi sterylnych sal i uciszania dzieci.',
    winPhrase: 'Kreatywność zawsze znajdzie drogę! Zobaczcie, jak pięknie wyszło!',
    requiredChapter: 1
  },
  hania: {
    id: 'hania',
    name: 'Pani Hania',
    faction: 'NAUCZYCIELKI',
    role: 'Mistrzyni Opowieści',
    description: 'Cicha, ale niezwykle charyzmatyczna miłośniczka teatru lalek i baśni. Potrafi zamienić stertę kartonów w latający zamek.',
    portraitUrl: '/src/assets/images/hania_portrait_1783550817665.jpg',
    accentColor: '#34d399', // Emerald
    secondaryColor: '#10b981',
    abilities: ['Teatrzyk Kukiełkowy', 'Baśniowa Tarcza', 'Zew Przygody'],
    history: 'Dawniej aktorka teatru dziecięcego, teraz uczy najmłodszych wyrażania emocji poprzez odgrywanie ról. Odkryła tajemnicze notatki Terapeutek na temat "Kapsuł Wyciszenia".',
    winPhrase: 'I żyli długo, szczęśliwie i... bardzo głośno! Bajka wygrywa!',
    requiredChapter: 1
  },
  zosia: {
    id: 'zosia',
    name: 'Pani Zosia',
    faction: 'NAUCZYCIELKI',
    role: 'Wulkan Energii',
    description: 'Najmłodsza w zespole, uczy tańca, rytmiki i uwielbia zabawy na świeżym powietrzu. Dzieci biegają za nią jak za prawdziwym superbohaterem.',
    portraitUrl: '/src/assets/images/zosia_portrait_1783550831052.jpg',
    accentColor: '#f87171', // Red/Rose
    secondaryColor: '#f43f5e',
    abilities: ['Rytmiczny Skok', 'Berek Kolorów', 'Tornado Śmiechu'],
    history: 'Absolwentka AWF i rytmiki. Przyszła do przedszkola rok temu i od razu zyskała miłość dzieci. To ona zapoczątkowała wielkie bitwy na poduszki pod nieobecność dyrekcji.',
    winPhrase: 'Ruch to radość, nikt nas nie zatrzyma w biegu!',
    requiredChapter: 1
  },
  calm: {
    id: 'calm',
    name: 'Pani Calm',
    faction: 'TERAPEUTKI',
    role: 'Wielka Mistrzyni Zakonu',
    description: 'Wielka Mistrzyni Zakonu. Nigdy nie podnosi głosu, zawsze mówi spokojnie i zawsze się uśmiecha. Jest niezwykle inteligentna i przewiduje ruchy przeciwników o kilka kroków naprzód.',
    portraitUrl: '/src/assets/images/calm_portrait_1783550841951.jpg',
    accentColor: '#60a5fa', // Blue
    secondaryColor: '#3b82f6',
    abilities: ['Bąbel Wykluczenia Dźwięków', 'Rytuał Srebrnego Krokodyla', 'Strefa Zero'],
    history: 'Założycielka tajnego kręgu Terapeutek w przedszkolu. Zarządza zakazem zza kulis, posługując się nienaganną uprzejmością i uśmiechem, skrywającym chłodną kalkulację przejęcia kontroli nad przedszkolem.',
    winPhrase: 'Porządek został przywrócony. Możecie teraz odetchnąć w ciszy.',
    requiredChapter: 1
  },
  whisper: {
    id: 'whisper',
    name: 'Pani Whisper',
    faction: 'TERAPEUTKI',
    role: 'Specjalistka od Intryg',
    description: 'Specjalistka od plotek i manipulacji. Potrafi skłócić każdego z każdym. Nigdy nie walczy bezpośrednio – jej największą bronią są intrygi.',
    portraitUrl: '/src/assets/images/whisper_portrait_1783550853186.jpg',
    accentColor: '#a78bfa', // Purple
    secondaryColor: '#8b5cf6',
    abilities: ['Szept ASMR', 'Lampa Lawowa Spokoju', 'Zegarmistrzowski Sen'],
    history: 'Doskonale opanowała technikę szeptu sensorycznego i siania wątpliwości. Szybko manipuluje rodzicami i skłóca personel pod pozorem troski o równowagę psychiczną dzieci.',
    winPhrase: 'Ćśś... słyszycie ten piękny, doskonały brak dźwięków?',
    requiredChapter: 1
  },
  harmony: {
    id: 'harmony',
    name: 'Pani Harmony',
    faction: 'TERAPEUTKI',
    role: 'Korektorka Przestrzeni',
    description: 'Odpowiada za bezpośrednią realizację planów zakonu. Tworzy sztywne zasady, regulaminy i ograniczenia mające utrudnić życie nauczycielkom oraz przygotowuje kolejne etapy przejęcia sal.',
    portraitUrl: '/src/assets/images/harmony_portrait_1783550862967.jpg',
    accentColor: '#2dd4bf', // Teal
    secondaryColor: '#0d9488',
    abilities: ['Symetryczny Dotyk', 'Kamerton Ładu', 'Wektor Czystości'],
    history: 'Dba o bezwzględną symetrię sal i zabawek. To ona przygotowuje restrykcyjne instrukcje przestrzenne, które pod pozorem ergonomii blokują dziecięcą kreatywność.',
    winPhrase: 'Gdy wszystko ma swoje symetryczne miejsce, dusza odnajduje ukojenie.',
    requiredChapter: 1
  },
  system: {
    id: 'system',
    name: 'Koloryduszek',
    faction: 'NEUTRAL',
    role: 'Duch Przedszkola',
    description: 'Magiczny, świecący duszek, który od wieków chroni dziecięcą energię, dbając o to, by w przedszkolu panował balans.',
    portraitUrl: '/src/assets/images/game_cover_1783451874065.jpg',
    accentColor: '#ec4899', // Pink
    secondaryColor: '#db2777',
    abilities: [],
    history: 'Zrodzony z dziecięcego śmiechu i marzeń. Reaguje na emocje panujące w salach. To on daje asystentce (graczowi) wizje dotyczące przyszłości przedszkola.',
    winPhrase: 'Balans i kolory powróciły do serc wszystkich!',
    requiredChapter: 1
  },
  amelia: {
    id: 'amelia',
    name: 'Pani Amelia',
    faction: 'NAUCZYCIELKI',
    role: 'Nowa Nauczycielka',
    description: 'Niezwykle życzliwa i ciepła nowa nauczycielka, która szybko zaskarbia sobie sympatię wszystkich w Tęczowym Zakątku. Skrywa jednak wielką tajemnicę.',
    portraitUrl: '/src/assets/images/amelia_portrait_1783531566501.jpg',
    accentColor: '#f472b6',
    secondaryColor: '#db2777',
    abilities: ['Uśmiech Zaufania', 'Serdeczna Dłoń', 'Słodki Sabotaż'],
    history: 'Przeniesiona z innego przedszkola rzekomo dla ratowania dziecięcej ekspresji. Nauczycielki natychmiast uznały ją za swoją sojuszniczkę.',
    winPhrase: 'To dla waszego... dobra. Naprawdę nie chciałam, żeby to się tak skończyło.',
    requiredChapter: 6
  },
  lysy_kierownik: {
    id: 'lysy_kierownik',
    name: 'Łysy Kierownik',
    faction: 'TERAPEUTKI',
    role: 'Prawdziwy Szef w Cieniu',
    description: 'Tajemniczy, charyzmatyczny dyrektor całego syndykatu, który kontroluje dziesiątki przedszkoli pod pozorem wprowadzania ładu.',
    portraitUrl: '/src/assets/images/bald_manager_portrait_1783529726331.jpg',
    accentColor: '#a78bfa',
    secondaryColor: '#7c3aed',
    abilities: ['Kalkulacja Kosztów', 'Cięcia Budżetowe', 'Zarządzanie Cieniem'],
    history: 'Stoi na czele Zakonu Ciszy i traktuje przedszkola jak korporacyjne komórki zysku. Nigdy wcześniej nie pokazał się nikomu bezpośrednio.',
    winPhrase: 'Wszystko przebiega zgodnie z budżetem i harmonogramem.',
    requiredChapter: 10
  },
  milena: {
    id: 'milena',
    name: 'Pani Milena',
    faction: 'NAUCZYCIELKI',
    role: 'Nauczycielka Angielskiego',
    description: 'Zawsze uśmiechnięta i kreatywna nauczycielka angielskiego, która przez długi czas bała się terapeutek, ale teraz otwarcie dołącza do ruchu oporu.',
    portraitUrl: '/src/assets/images/english_teacher_portrait_1783533253051.jpg',
    accentColor: '#ec4899', // Pinkish
    secondaryColor: '#db2777',
    abilities: ['Lekcja Odwagi', 'English Fun', 'Śpiewające Słówka'],
    history: 'Przez wiele miesięcy bała się sprzeciwić terapeutkom, obawiając się o swoją posadę. Kiedy jednak zobaczyła walkę asystentki i innych nauczycielek, postanowiła dołączyć do ruchu oporu.',
    winPhrase: 'Together we are strong! Angielski łączy pokolenia!',
    requiredChapter: 11
  },
  dyrektorka: {
    id: 'dyrektorka',
    name: 'Dyrektorka Helena',
    faction: 'NEUTRAL',
    role: 'Główna Dyrektorka',
    description: 'Starsza, bardzo serdeczna i dobra kobieta, która szczerze kocha dzieci, lecz przez brak rzetelnych informacji stała się ofiarą manipulacji terapeutek.',
    portraitUrl: '/src/assets/images/director_portrait_1783533268563.jpg',
    accentColor: '#f59e0b', // Amber
    secondaryColor: '#d97706',
    abilities: ['Matczyna Troska', 'Dyrektorski Dekret', 'Słuchanie Stron'],
    history: 'Pracuje jako dyrektorka od ponad trzydziestu lat. Niestety, ulegając kolejnym skargom przygotowywanym przez przebiegłe terapeutki, powoli zaczęła wierzyć, że to kreatywne nauczycielki są źródłem wszystkich problemów w placówce.',
    winPhrase: 'Prawda i dobro dzieci zawsze muszą zwyciężyć.',
    requiredChapter: 12
  },
  kucharz: {
    id: 'kucharz',
    name: 'Pan Kucharz Janek',
    faction: 'NEUTRAL',
    role: 'Szef Kuchni',
    description: 'Poczciwy kucharz, który od wielu lat karmi przedszkolaki. Nie wie już komu wierzyć, przez co błądzi między stronami konfliktu.',
    portraitUrl: '/src/assets/images/cook_portrait_1783533279630.jpg',
    accentColor: '#10b981', // Emerald
    secondaryColor: '#059669',
    abilities: ['Złoty Rosół', 'Tarcza z Pokrywki', 'Zapach Drożdżówki'],
    history: 'Pracuje w przedszkolu od dwudziestu lat. Jest zdezorientowany narastającym konfliktem. Chętnie pomaga nauczycielkom, ale czasem nieświadomie wykonuje polecenia Terapeutek z obawy o higieniczne regulaminy.',
    winPhrase: 'Najedzone dziecko to szczęśliwe dziecko! Smacznego!',
    requiredChapter: 13
  },
  robert: {
    id: 'robert',
    name: 'Pan Robert (W-Fista)',
    faction: 'NAUCZYCIELKI',
    role: 'Nauczyciel Wychowania Fizycznego',
    description: 'Spokojny, wysportowany i lubiany przez dzieci w-fista, który odzyskał odwagę, by stawić czoła uciskowi terapeutek.',
    portraitUrl: '/src/assets/images/pe_teacher_portrait_1783533293006.jpg',
    accentColor: '#3b82f6', // Blue
    secondaryColor: '#2563eb',
    abilities: ['Olimpijski Skok', 'Gwizdek Odwagi', 'Sportowy Duh'],
    history: 'Spokojny i dobroduszny człowiek, który od dawna widział nieprawidłowości ze strony terapeutek, ale dopiero rozmowa z nauczycielkami natchnęła go do aktywnego buntu.',
    winPhrase: 'Zdrowe ciało i wolny duch! Zwycięstwo!',
    requiredChapter: 16
  },
  sonia: {
    id: 'sonia',
    name: 'Strażniczka Nasłuchu Sonia',
    faction: 'TERAPEUTKI',
    role: 'Operatorka Podsłuchu',
    description: 'Bezwzględna i chłodna operatorka systemów podsłuchowych wysłana byle przez Łysego Kierownika do kontrolowania każdego szeptu w przedszkolu.',
    portraitUrl: '/src/assets/images/sonia_portrait_1783533307520.jpg',
    accentColor: '#8b5cf6', // Purple
    secondaryColor: '#6d28d9',
    abilities: ['Paraliżujący Szum', 'Bariera Dźwiękochłonna', 'Przechwycenie Częstotliwości'],
    history: 'Pracuje dla Łysego Kierownika w sekcji inwigilacji. Instaluje ukryte mikrofony i nagrywa prywatne rozmowy nauczycielek, aby terapeutki mogły ich szantażować.',
    winPhrase: 'Wszystkie wasze sekrety należą do mnie.',
    requiredChapter: 15
  },
  player: {
    id: 'player',
    name: 'Asystentka (Ty)',
    faction: 'NEUTRAL',
    role: 'Nowy Pracownik',
    description: 'Asystentka przedszkolna poszukująca swojej drogi. Twoje decyzje ukształtują przyszłość Tęczowego Zakątka.',
    portraitUrl: '/src/assets/images/game_cover_1783451874065.jpg',
    accentColor: '#94a3b8',
    secondaryColor: '#64748b',
    abilities: [],
    history: 'Zaczynasz swój pierwszy dzień pracy w tym na pozór uroczym przedszkolu. Szybko orientujesz się, że pod piosenkami kryje się walka o wpływy.',
    winPhrase: 'To była moja świadoma decyzja o losie dzieci!',
    requiredChapter: 1
  }
};
