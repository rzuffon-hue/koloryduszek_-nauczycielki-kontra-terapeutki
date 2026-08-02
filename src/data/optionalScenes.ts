/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OptionalScene {
  id: string;
  location: 'kitchen' | 'teachers_lounge' | 'hallway' | 'locker_room' | 'secretariat' | 'gym' | 'playground';
  title: string;
  backgroundUrl: string;
  dialogue: {
    speakerId: string;
    text: string;
  }[];
}

export const OPTIONAL_SCENES: OptionalScene[] = [
  // --- KITCHEN (Kuchnia) ---
  {
    id: 'oneoff_kitchen_cook',
    location: 'kitchen',
    title: 'Rozmowa z Kucharzem Janem',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Wchodzisz do kuchni, gdzie unosi się słodki zapach cynamonu i pieczonych jabłek.' },
      { speakerId: 'system', text: 'Kucharz Janek miesza wielką chochlą w garze, nucąc pod nosem wesołą melodię.' },
      { speakerId: 'player', text: 'Dzień dobry, panie Janie! Pachnie nieziemsko.' },
      { speakerId: 'system', text: 'Janek odwraca się, uśmiechając się szeroko.' },
      { speakerId: 'system', text: 'A, to nasza dzielna asystentka! Słuchaj, powiem ci coś w tajemnicy... W nocy widziałem, jak jedna z terapeutek wnosiła do szatni dziwne czarne pudła. Szepczą o jakiejś "terapii dźwiękowej". Mnie to pachnie rygorem, a dzieci potrzebują słodyczy i swobody, a nie maszyn!' },
      { speakerId: 'player', text: 'Dziękuję za ostrzeżenie, panie Janie. Będę miała oczy otwarte.' }
    ]
  },
  {
    id: 'oneoff_kitchen_tea',
    location: 'kitchen',
    title: 'Tajemnica sensorycznych ziół',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Na blacie w kuchni leży zapomniana, otwarta szafka z dostawami.' },
      { speakerId: 'player', text: 'Co to za paczki ziół? "Melisa sensoryczna - partia 3B".' },
      { speakerId: 'system', text: 'Wczytujesz się w mały druk na etykiecie: "Modyfikator koncentracji. Stosować wyłącznie według instrukcji Pani Calm".' },
      { speakerId: 'player', text: 'A więc nawet herbata dla dzieci ma ich uspokajać za wszelką cenę... To niesamowite.' }
    ]
  },

  // --- TEACHERS' LOUNGE (Pokój nauczycielski) ---
  {
    id: 'oneoff_lounge_basia',
    location: 'teachers_lounge',
    title: 'Chwila szczerości z Basią',
    backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
    dialogue: [
      { speakerId: 'system', text: 'W pokoju nauczycielskim zastajesz Panią Basię, która opiera głowę o dłonie, patrząc na kubek zimnej kawy.' },
      { speakerId: 'player', text: 'Wszystko w porządku, Pani Basiu?' },
      { speakerId: 'basia', text: 'Och, cześć... Tak, tylko... ta cała papierologia i rygory terapeutek mnie wykończą. Dzieci tracą iskrę, gdy każe im się siedzieć w idealnych rzędach. Przedszkole powinno być pełne kolorów i śmiechu!' },
      { speakerId: 'player', text: 'Też tak uważam. Państwa praca z dziećmi jest niesamowita.' },
      { speakerId: 'basia', text: 'Dziękuję... Dobrze mieć w Tobie oparcie.' }
    ]
  },
  {
    id: 'oneoff_lounge_shredder',
    location: 'teachers_lounge',
    title: 'Niedomknięta niszczarka',
    backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Niszczarka dokumentów w kącie pokoju nauczycielskiego jest przepełniona.' },
      { speakerId: 'player', text: 'Co to za wystające skrawki papieru?' },
      { speakerId: 'system', text: 'Wyciągasz niedoszatkowany kawałek: "...wdrożenie programu eliminacji głośnych ekspresji w grupie starszaków..." Pod spodem widnieje dopisek Basia: "NIGDY NA TO NIE POZWOLĘ!"' },
      { speakerId: 'player', text: 'Wojna między nimi trwa na każdym froncie...' }
    ]
  },

  // --- HWLLWAY (Korytarz) ---
  {
    id: 'oneoff_hallway_notice',
    location: 'hallway',
    title: 'Nowa tablica ogłoszeń',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Przechodzisz korytarzem i zauważasz świeżo powieszony plakat z logo Terapeutek.' },
      { speakerId: 'player', text: 'Co tu pisze?' },
      { speakerId: 'system', text: '"Regulamin Emocjonalny Przedszkolaka: 1. Unikaj zbędnych krzyków. 2. Zachowaj symetrię podczas zabawy. 3. Zgłoś każdy przypadek nadmiernej radości koordynatorowi sensorycznemu."' },
      { speakerId: 'player', text: '"Zgłoś przypadek nadmiernej radości"? To brzmi jak ponury żart...' }
    ]
  },
  {
    id: 'oneoff_hallway_flicker',
    location: 'hallway',
    title: 'Migoczący mrok',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Światło na korytarzu nagle zaczyna dziwnie migotać, rzucając długie cienie.' },
      { speakerId: 'player', text: 'Co to za dźwięk? Jakby cichy, rytmiczny pisk...' },
      { speakerId: 'system', text: 'Zauważasz małe czarne urządzenie zamontowane tuż pod sufitem, którego dioda mruga w takt pisku.' },
      { speakerId: 'player', text: 'Czy to kolejny emiter? Muszę zachować ostrożność.' }
    ]
  },

  // --- LOCKER ROOM (Szatnia) ---
  {
    id: 'oneoff_locker_bear',
    location: 'locker_room',
    title: 'Zgubiony miś',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'W kącie szatni, za szafką numer 4, dostrzegasz porzuconą pluszową maskotkę.' },
      { speakerId: 'player', text: 'O, biedny miś. Ktoś go tu zostawił.' },
      { speakerId: 'system', text: 'Podnosisz misia i zauważasz, że jego ucho jest nienaturalnie twarde. Rozchylasz materiał i widzisz mały, metalowy mikrochip!' },
      { speakerId: 'player', text: 'Co?! Pluszak z podsłuchem? Kto mógłby zrobić coś takiego dzieciom?!' }
    ]
  },
  {
    id: 'oneoff_locker_note',
    location: 'locker_room',
    title: 'Dziwna kartka',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Pani Stasia, woźna, zamiata podłogę szatni i nagle schyla się po coś.' },
      { speakerId: 'system', text: 'Pokazuje Ci małą, pogniecioną karteczkę z symetrycznymi rysunkami.' },
      { speakerId: 'player', text: 'Pani Stasiu, co to?' },
      { speakerId: 'system', text: 'Woźna kręci głową: "Asystentko, te nowe panie terapeutki ciągle gubią te swoje notatki. Tu są jakieś kody i numery szafek. Wolę się w to nie mieszać, weź to."' },
      { speakerId: 'player', text: 'To może być bardzo przydatne przy moim śledztwie...' }
    ]
  },

  // --- SECRETARIAT (Sekretariat) ---
  {
    id: 'oneoff_sec_drawer',
    location: 'secretariat',
    title: 'Niedomknięta szuflada dyrektorki',
    backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Drzwi do sekretariatu są uchylone, a w środku nikogo nie ma. Na biurku leży na wpół otwarta szuflada.' },
      { speakerId: 'player', text: 'Nie powinnam... ale muszę zerknąć.' },
      { speakerId: 'system', text: 'W środku leży teczka z napisem "RESTRUKTURYZACJA EMOCJONALNA". Twoje własne nazwisko jest tam zakreślone czerwonym pisakiem z dopiskiem: "Zbytnio sprzyja kreatywnemu chaosowi. Obserwować".' },
      { speakerId: 'player', text: 'Wiedzą o mnie więcej, niż myślałam. Muszę działać ostrożnie.' }
    ]
  },
  {
    id: 'oneoff_sec_voices',
    location: 'secretariat',
    title: 'Głosy za drzwiami gabinetu',
    backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Podchodzisz do sekretariatu i słyszysz stłumiony, ostry głos Dyrektorki Heleny zza zamkniętych drzwi gabinetu.' },
      { speakerId: 'system', text: 'Helena: "...tak, rozumiem. Jeśli asystentka dowie się o badaniach nad wyciszeniem, natychmiast ją zwolnię. Kuratorium nie może wejść przed końcem eksperymentu..."' },
      { speakerId: 'player', text: 'Eksperyment? Badania? To przedszkole to jedno wielkie laboratorium!' }
    ]
  },

  // --- GYM (Sala gimnastyczna) ---
  {
    id: 'oneoff_gym_speakers',
    location: 'gym',
    title: 'Urwane kalibracje',
    backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Wchodzisz do sali gimnastycznej. Na środku stoją Pani Whisper i Pani Harmony, podłączając kable do wielkich głośników.' },
      { speakerId: 'system', text: 'Słysząc Twoje kroki, Whisper natychmiast wyciąga wtyczkę z kontaktu. Głośniki wydają głośny pisk i milkną.' },
      { speakerId: 'whisper', text: 'Asystentko! Co tu robisz? Sala gimnastyczna jest obecnie zamknięta na kalibrację... spokoju ruchowego.' },
      { speakerId: 'player', text: 'Przepraszam, szukałam skakanki. Już wychodzę.' },
      { speakerId: 'system', text: 'Terapeutki odprowadzają Cię zimnym, badawczym wzrokiem.' }
    ]
  },
  {
    id: 'oneoff_gym_balls',
    location: 'gym',
    title: 'Sensoryczne kule',
    backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Sala gimnastyczna jest pusta. W koszu leżą nowe, matowo-niebieskie piłki.' },
      { speakerId: 'player', text: 'Dziwne te piłki. Są niezwykle ciężkie i niemal całkowicie pochłaniają dźwięk, gdy uderzają o parkiet.' },
      { speakerId: 'system', text: 'Na boku kosza widnieje logo "SilentSphere Labs".' },
      { speakerId: 'player', text: 'Kolejny element układanki rygoru...' }
    ]
  },

  // --- PLAYGROUND (Plac zabaw) ---
  {
    id: 'oneoff_play_zosia',
    location: 'playground',
    title: 'Rozmowa z Zosią przy huśtawce',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Na placu zabaw spotykasz Panią Zosię, która naprawia zerwany łańcuch huśtawki.' },
      { speakerId: 'player', text: 'Pomóc w czymś, Zosiu?' },
      { speakerId: 'system', text: 'Zosia uśmiecha się wdzięcznie.' },
      { speakerId: 'system', text: 'Och, dziękuję! Wiesz, ta huśtawka nie zerwała się sama. Ktoś celowo poluzował śruby. Terapeutki nie chcą, by dzieci biegały i huśtały się za wysoko. Mówią, że to "niekontrolowany wyrzut dopaminy". Chcą zamienić plac zabaw w strefę siedzącej jogi...' },
      { speakerId: 'player', text: 'To absurdalne, dzieci muszą się wybiegać!' },
      { speakerId: 'system', text: 'Zosia: "Dokładnie! Nie pozwolę im odebrać dzieciom dzieciństwa."' }
    ]
  },
  {
    id: 'oneoff_play_circles',
    location: 'playground',
    title: 'Symetryczna piaskownica',
    backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
    dialogue: [
      { speakerId: 'system', text: 'Podchodzisz do piaskownicy. Zamiast zwykłych zamków z piasku, widzisz idealne, geometryczne kręgi wyryte w piasku.' },
      { speakerId: 'player', text: 'Kto to zrobił?' },
      { speakerId: 'system', text: 'Obok leży plastikowy szablon z logo Terapeutek.' },
      { speakerId: 'player', text: 'Nawet zabawa w piasku musi być sformatowana pod linijkę...' }
    ]
  }
];
