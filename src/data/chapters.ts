/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'Rozdział 1: Pierwszy dzień',
    summary: 'Rozpoczynasz pracę jako asystentka w przedszkolu "Tęczowy Zakątek". Szybko dostrzegasz, że pod uśmiechami kryje się napięcie.',
    startSceneId: 'ch1_intro',
    scenes: {
      ch1_intro: {
        id: 'ch1_intro',
        title: 'Brama Tęczowego Zakątka',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Stoisz przed bramą przedszkola "Tęczowy Zakątek". Kolorowe flagi łopoczą na wietrze, a z wnętrza dobiega stłumiony śmiech dzieci.' },
          { speakerId: 'player', text: 'Moja nowa praca... Wygląda uroczo. Mam nadzieję, że dzieciaki mnie polubią.' },
          { speakerId: 'basia', text: 'O! Ty musisz być naszą nową asystentką! Witaj w królestwie wyobraźni i wiecznej zabawy! Jestem Basia.' },
          { speakerId: 'calm', text: 'Dzień dobry. Proszę nie podnosić głosu, Basiu. Poziom decybeli przekracza już normę o 12%. Witaj, asystentko. Jestem Pani Calm.' }
        ],
        choices: [
          {
            id: 'ch1_c1_freedom',
            text: 'Uśmiechnij się szeroko i przybij piątkę z Panią Basią.',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch1_teachers_path',
            consequenceText: 'Pani Basia promienieje, a Pani Calm z powagą notuje coś na swojej srebrnej podkładce.'
          },
          {
            id: 'ch1_c1_order',
            text: 'Ukłoń się uprzejmie i podziękuj Pani Calm za profesjonalne powitanie.',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch1_therapists_path',
            consequenceText: 'Pani Calm kiwa głową z aprobatą. Pani Basia puszcza do Ciebie oko i lekko wzdycha.'
          }
        ]
      },
      ch1_teachers_path: {
        id: 'ch1_teachers_path',
        title: 'Szalona sala maluchów',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Świetnie! Prawdziwa asystentka musi mieć energię! Chodź, pokażę ci naszą salę. Mamy tu kącik malarski, teatr lalek Hani i klocki!' },
          { speakerId: 'hania', text: 'Witaj, duszyczko! Właśnie przygotowujemy wielki napad piratów na wyspę skarbów. Potrzebujemy kogoś, kto potrafi ryczeć jak prawdziwy potwór morski!' },
          { speakerId: 'system', text: 'Z szafy obok wyskakuje Pani Zosia, uśmiechnięta od ucha do ucha, trzymając w rękach papierowy miecz.' },
          { speakerId: 'zosia', text: 'Ahoj, kamratko! Chcesz dołączyć do załogi, czy wolisz pomóc nam ułożyć wielką stertę klocków dla naszych więźniów?' }
        ],
        choices: [
          {
            id: 'ch1_c2_block_creative',
            text: '"Ułóżmy klocki w gigantyczny, kreatywny zamek piratów!"',
            impactFreedom: 15,
            impactOrder: -10,
            nextSceneId: 'ch1_minigame_blocks_creative',
            consequenceText: 'Czas na minigrę! Pomóż dzieciom ułożyć najbardziej szalony zamek z klocków!'
          },
          {
            id: 'ch1_c2_block_orderly',
            text: '"Może najpierw poukładajmy klocki według kolorów i kształtów, żeby nikt się nie potknął?"',
            impactFreedom: -10,
            impactOrder: 15,
            nextSceneId: 'ch1_minigame_blocks_orderly',
            consequenceText: 'Pani Zosia robi zdziwioną minę, ale dzieci posłusznie zaczynają segregować klocki.'
          }
        ]
      },
      ch1_therapists_path: {
        id: 'ch1_therapists_path',
        title: 'Sterylny Gabinet Wyciszenia',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'calm', text: 'Dobry wybór. Profesjonalizm i spokój to klucz do zrównoważonego rozwoju mózgu dziecka.' },
          { speakerId: 'whisper', text: 'Szaaa... Witaj, droga asystentko. Właśnie przygotowujemy kącik wyciszenia sensorycznego. Każdy klocek musi leżeć w swojej przegródce.' },
          { speakerId: 'harmony', text: 'Tak, symetria geometryczna stymuluje logiczne myślenie. Te chaotyczne nauczycielki rzucają klocki na podłogę. My wprowadzamy ład.' },
          { speakerId: 'calm', text: 'Pomożesz nam posortować te drewniane bryły w idealnym, terapeutycznym porządku?' }
        ],
        choices: [
          {
            id: 'ch1_c3_block_orderly_direct',
            text: '"Oczywiście, posortujmy je idealnie geometrycznie!"',
            impactFreedom: -15,
            impactOrder: 20,
            nextSceneId: 'ch1_minigame_blocks_orderly',
            consequenceText: 'Terapeutki patrzą na Ciebie z dumą. Czas na wyzwanie segregacji klocków!'
          },
          {
            id: 'ch1_c3_block_rebel',
            text: '"A może zmieszajmy je i zbudujmy coś asymetrycznego i szalonego?"',
            impactFreedom: 20,
            impactOrder: -15,
            nextSceneId: 'ch1_minigame_blocks_creative',
            consequenceText: 'Pani Harmony lekko drży jej lewa brew, ale zgadza się na Twoje wyzwanie budowania.'
          }
        ]
      },
      ch1_minigame_blocks_creative: {
        id: 'ch1_minigame_blocks_creative',
        title: 'Zabawa w układanie klocków',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzieci patrzą na Ciebie z błyskiem w oku. Pomóż im dopasować i ułożyć niesymetryczne klocki w pełną wyobraźni konstrukcję!' }
        ],
        choices: [],
        minigameType: 'BLOCKS',
        nextSceneIdOnMinigameWin: 'ch1_end'
      },
      ch1_minigame_blocks_orderly: {
        id: 'ch1_minigame_blocks_orderly',
        title: 'Terapeutyczne Sortowanie',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Sala jest cicha. Pomóż dzieciom ułożyć geometryczne klocki w perfekcyjnie dopasowane przegródki kolorystyczne!' }
        ],
        choices: [],
        minigameType: 'BLOCKS',
        nextSceneIdOnMinigameWin: 'ch1_end'
      },
      ch1_end: {
        id: 'ch1_end',
        title: 'Koniec pierwszego dnia',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pierwszy dzień dobiega końca. Rodzice odbierają dzieci, a w salach gaśnie światło.' },
          { speakerId: 'system', text: 'Gdy zbierasz swoje rzeczy, zauważasz małego, kolorowego i świecącego duszka przelatującego przez korytarz...' },
          { speakerId: 'system', text: 'To Koloryduszek! Puszcza do Ciebie oko, pozostawiając za sobą ślad lśniących iskier, a potem znika za drzwiami gabinetu dyrekcji.' },
          { speakerId: 'player', text: 'Co to było?! Czy ja śnię? To przedszkole naprawdę skrywa jakąś tajemnicę...' }
        ],
        choices: [
          {
            id: 'ch1_finish',
            text: 'Zakończ dzień i przygotuj się na jutro.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch2_intro'
          }
        ]
      }
    }
  },
  {
    id: 2,
    title: 'Rozdział 2: Pierwsze podejrzenia',
    summary: 'Konflikt narasta. Podczas zajęć z malowania dzieci chcą stworzyć wielki mural, czemu gwałtownie sprzeciwia się Pani Whisper.',
    startSceneId: 'ch2_intro',
    scenes: {
      ch2_intro: {
        id: 'ch2_intro',
        title: 'Poranny kryzys malarski',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Drugi dzień rozpoczyna się od głośnej debaty w korytarzu przedszkola.' },
          { speakerId: 'basia', text: 'Mural na całą ścianę! Dzieci chcą namalować tęczę, zwierzęta i Koloryduszkowa! To rozwinie ich ekspresję emocjonalną!' },
          { speakerId: 'whisper', text: 'Szaaa... Basiu. Taki nadmiar bodźców wizualnych uszkodzi ich integrację sensoryczną. Ściany powinny być beżowe, jednolite i uspokajające.' },
          { speakerId: 'hania', text: 'Beżowe?! To nie przedszkole, to poczekalnia u dentysty! Nasza asystentka na pewno poprze wolność twórczą!' }
        ],
        choices: [
          {
            id: 'ch2_c1_mural_full',
            text: '"Wielki, szalony mural z farbami! Niech dzieci wyrażą siebie!"',
            impactFreedom: 20,
            impactOrder: -10,
            nextSceneId: 'ch2_mural_creative_scene',
            consequenceText: 'Pani Basia krzyczy z zachwytu. Dzieci chwytają pędzle i wałki!'
          },
          {
            id: 'ch2_c1_mural_pastel',
            text: '"Zróbmy to dyskretnie. Może mały, geometryczny, pastelowy wzór?"',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch2_mural_orderly_scene',
            consequenceText: 'Pani Whisper uśmiecha się lekko i podaje dzieciom stonowane, szare i niebieskie farby.'
          }
        ]
      },
      ch2_mural_creative_scene: {
        id: 'ch2_mural_creative_scene',
        title: 'Wielkie Malowanie Muralu',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzieci biegają z pędzlami, a Pani Basia rzuca kolorowymi iskrami radości! Pomóż im pokolorować mural duszka w zwariowane barwy!' }
        ],
        choices: [],
        minigameType: 'PAINT',
        nextSceneIdOnMinigameWin: 'ch2_mural_done'
      },
      ch2_mural_orderly_scene: {
        id: 'ch2_mural_orderly_scene',
        title: 'Symetryczny Wzór Sensoryczny',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W ciszy i pod okiem Pani Whisper dzieci precyzyjnie nanoszą geometryczne, stonowane kolory. Wypełnij ten minimalistyczny wzór!' }
        ],
        choices: [],
        minigameType: 'PAINT',
        nextSceneIdOnMinigameWin: 'ch2_mural_done'
      },
      ch2_mural_done: {
        id: 'ch2_mural_done',
        title: 'Mural ukończony!',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ściana wygląda imponująco! Koloryduszek na muralu wydaje się niemal pulsować własnym życiem.' },
          { speakerId: 'whisper', text: 'Cóż... To było bardzo... intensywne. Muszę teraz przeprowadzić z dziećmi sesję medytacyjną, aby obniżyć tętno.' },
          { speakerId: 'zosia', text: 'Sesję medytacyjną? Raczej puszczę im muzykę do tańca! Chodź z nami, asystentko, potańczyć!' }
        ],
        choices: [
          {
            id: 'ch2_c2_dance',
            text: 'Dołącz do szalonego tańca Pani Zosi z dziećmi. (Rytmika)',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch2_dance_game'
          },
          {
            id: 'ch2_c2_meditate',
            text: 'Usiądź w kręgu z Panią Whisper i weź głęboki, terapeutyczny oddech.',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch2_meditate_scene'
          }
        ]
      },
      ch2_dance_game: {
        id: 'ch2_dance_game',
        title: 'Taniec Kolorów',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zaczyna grać energetyczna muzyka! Pomóż dzieciom skakać i tańczyć w odpowiednim rytmie w tej zabawie ruchowej!' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch2_end'
      },
      ch2_meditate_scene: {
        id: 'ch2_meditate_scene',
        title: 'Kojąca Sesja Rytmiczna',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pani Whisper uderza w tybetańską misę. Skoncentruj się i pomóż dzieciom zsynchronizować oddech w rytmie misy!' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch2_end'
      },
      ch2_end: {
        id: 'ch2_end',
        title: 'Cień na korytarzu',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Po zajęciach zauważasz, że Pani Harmony nerwowo rozmawia przez telefon szeptem w kącie szatni.' },
          { speakerId: 'harmony', text: '...tak, asystentka zaczyna węszyć. Jeśli odkryje nasz Tajny Pokój za szafką numer 7, cały plan uciszenia przedszkola runie...' },
          { speakerId: 'player', text: '(Szafka numer 7? Tajny pokój? Muszę to sprawdzić podczas dzisiejszej drzemki dzieci!)' }
        ],
        choices: [
          {
            id: 'ch2_finish',
            text: 'Rozpocznij tajne śledztwo.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch3_intro'
          }
        ]
      }
    }
  },
  {
    id: 3,
    title: 'Rozdział 3: Tajny pokój',
    summary: 'Czas na drzemkę. Dzieci śpią, a Ty zakradasz się do szatni, by zbadać tajemniczą szafkę numer 7.',
    startSceneId: 'ch3_intro',
    scenes: {
      ch3_intro: {
        id: 'ch3_intro',
        title: 'Szatnia o zmierzchu drzemki',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W całym przedszkolu panuje cisza. Dzieci śpią w sali obok. Zakradasz się do opuszczonej szatni.' },
          { speakerId: 'player', text: 'Oto szafka numer 7. Należy do Pani Calm. Jest zamknięta na skomplikowany, cyfrowy zamek szyfrowy.' },
          { speakerId: 'system', text: 'Zza rogu nagle wyłania się migoczący Koloryduszek. Wskazuje swoim świecącym paluszkiem na ukryte wskazówki porozrzucane po szatni.' },
          { speakerId: 'system', text: 'Musisz znaleźć 4 ukryte przedmioty, które pomogą Ci złamać kod i otworzyć tajne przejście!' }
        ],
        choices: [],
        minigameType: 'HIDDEN',
        nextSceneIdOnMinigameWin: 'ch3_secret_room_entered'
      },
      ch3_secret_room_entered: {
        id: 'ch3_secret_room_entered',
        title: 'Wnętrze Tajnego Pokoju',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Klik! Szafka odsuwa się z cichym szumem, odsłaniając wejście do podziemnego schronu.' },
          { speakerId: 'player', text: 'Niewiarygodne... To wygląda jak centrum dowodzenia! Ekrany, plany przedszkola, tajne teczki.' },
          { speakerId: 'system', text: 'Na centralnym stole leży "Dziennik Terapeutek" oraz "Złoty Zeszyt Nauczycielek", który najwyraźniej został skradziony.' },
          { speakerId: 'player', text: 'Mam tylko chwilę! Co powinnam skopiować lub zabezpieczyć w pierwszej kolejności?' }
        ],
        choices: [
          {
            id: 'ch3_c1_save_teachers',
            text: 'Zabezpiecz i zabierz skradziony "Złoty Zeszyt Nauczycielek" z ich kreatywnymi planami.',
            impactFreedom: 25,
            impactOrder: -10,
            nextSceneId: 'ch3_escape_teachers',
            gainItem: 'Złoty Zeszyt'
          },
          {
            id: 'ch3_c1_save_therapists',
            text: 'Skopiuj plany "Generatora Sfery Spokoju" Terapeutek, by zrozumieć ich logikę i porządek.',
            impactFreedom: -10,
            impactOrder: 25,
            nextSceneId: 'ch3_escape_therapists',
            gainItem: 'Plany Generatora'
          }
        ]
      },
      ch3_escape_teachers: {
        id: 'ch3_escape_teachers',
        title: 'Ucieczka ze Złotym Zeszytem',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Chowasz ciężki, ozdobiony brokatem zeszyt do plecaka. Nagle na ekranach dowodzenia zapala się czerwone światło!' },
          { speakerId: 'system', text: 'Słychać kroki na schodach! Ktoś schodzi na dół!' },
          { speakerId: 'player', text: 'O nie, muszę szybko ułożyć bezpieczniki na panelu awaryjnym, żeby zablokować drzwi wejściowe i uciec klapą wentylacyjną!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch3_end'
      },
      ch3_escape_therapists: {
        id: 'ch3_escape_therapists',
        title: 'Zabezpieczanie Planów Generatora',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zgrywasz plany techniczne na pendrive. Wyglądają niesamowicie precyzyjnie. Nagle system bezpieczeństwa wykrywa pobieranie!' },
          { speakerId: 'system', text: 'Syrena alarmowa zaczyna cicho wyć. Drzwi automatyczne zaczynają się zamykać!' },
          { speakerId: 'player', text: 'Muszę rozwiązać ten geometryczny obwód na panelu ściennym, by przywrócić zasilanie i otworzyć wyjście awaryjne!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch3_end'
      },
      ch3_end: {
        id: 'ch3_end',
        title: 'Bezpieczny odwrót',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Z hukem zatrzaskujesz klapę i lądujesz na miękkim trawniku w ogrodzie przedszkola.' },
          { speakerId: 'player', text: 'Uff... To było niesamowicie blisko. Moje serce bije jak szalone.' },
          { speakerId: 'system', text: 'Z cienia drzew wyłania się Koloryduszek. Świeci ciepłym różowo-fioletowym światłem, jakby gratulował Ci odwagi.' },
          { speakerId: 'player', text: 'Teraz już wiem wszystko. Terapeutki planują użyć technologii fal dźwiękowych, by usunąć wszelkie "głośne emocje". Muszę zdecydować, co z tym zrobię.' }
        ],
        choices: [
          {
            id: 'ch3_finish',
            text: 'Przejdź do kolejnego dnia śledztwa.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch4_intro'
          }
        ]
      }
    }
  },
  {
    id: 4,
    title: 'Rozdział 4: Odkrycie planu',
    summary: 'Czas położyć karty na stół. Odkrywasz plany obu frakcji na nadchodzący "Dzień Kolorów" i musisz dokonać kluczowego wyboru.',
    startSceneId: 'ch4_intro',
    scenes: {
      ch4_intro: {
        id: 'ch4_intro',
        title: 'Konfrontacja w tajemnicy',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Rano podchodzisz do liderów obu frakcji, dając im do zrozumienia, że znasz prawdę.' },
          { speakerId: 'basia', text: 'Znalazłaś nasz zeszyt?! O niebiosa, dziękuję! Terapeutki chcą zamontować "Kapsuły Ciszy" w klasach! Musimy zbudować wielki, kolorowy Fort Wolności w ogrodzie, by dzieci miały bezpieczny azyl!' },
          { speakerId: 'calm', text: 'Widzę, że byłaś w naszym pokoju dowodzenia, asystentko. Nie chcemy skrzywdzić dzieci. Chcemy tylko uchronić je przed chaosem i stresem. Pomóż nam uruchomić "Emiter Harmonii" na dachu.' }
        ],
        choices: [
          {
            id: 'ch4_join_teachers',
            text: '"Staję po stronie Nauczycielek! Pomogę wam zbudować gigantyczny fort!"',
            impactFreedom: 30,
            impactOrder: -15,
            nextSceneId: 'ch4_build_fort_game',
            consequenceText: 'Wybierasz oficjalnie frakcję NAUCZYCIELKI! Dzieci ruszają do budowy!'
          },
          {
            id: 'ch4_join_therapists',
            text: '"Staję po stronie Terapeutek. Przedszkolu potrzebny jest ład i spokój."',
            impactFreedom: -15,
            impactOrder: 30,
            nextSceneId: 'ch4_calibrate_emitter_game',
            consequenceText: 'Wybierasz oficjalnie frakcję TERAPEUTKI! Przystępujecie do kalibracji urządzenia.'
          }
        ]
      },
      ch4_build_fort_game: {
        id: 'ch4_build_fort_game',
        title: 'Budowanie Fortu Wolności',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pani Basia i Pani Hania przynoszą materace, krzesła, poduszki i kartony. Pomóż dzieciom ułożyć stabilną wieżę z poduszek i krzeseł!' }
        ],
        choices: [],
        minigameType: 'FORT',
        nextSceneIdOnMinigameWin: 'ch4_end'
      },
      ch4_calibrate_emitter_game: {
        id: 'ch4_calibrate_emitter_game',
        title: 'Ustawianie Emitera Harmonii',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pani Calm i Pani Harmony montują lśniące, geometryczne kryształy na dachu. Pomóż im dopasować elementy obwodu, by emiter działał idealnie!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch4_end'
      },
      ch4_end: {
        id: 'ch4_end',
        title: 'Przed wielkim starciem',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wszystko jest przygotowane. Jutro odbędzie się coroczny "Dzień Kolorów" – wielkie święto, na którym rozstrzygnie się los przedszkola.' },
          { speakerId: 'system', text: 'Koloryduszek krąży nad budynkiem. Jego barwa zależy od Twoich dotychczasowych wyborów.' },
          { speakerId: 'player', text: 'Jutro rano wszystko się wyjaśni. Nie ma już odwrotu...' }
        ],
        choices: [
          {
            id: 'ch4_finish',
            text: 'Rozpocznij finałowy Dzień Kolorów.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch5_intro'
          }
        ]
      }
    }
  },
  {
    id: 5,
    title: 'Rozdział 5: Wielki finał',
    summary: 'Dzień Kolorów nadszedł! Przedszkole tętni emocjami, a obie strony szykują się do ostatecznego kroku.',
    startSceneId: 'ch5_intro',
    scenes: {
      ch5_intro: {
        id: 'ch5_intro',
        title: 'Dzień Kolorów w Ogrodzie',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Słońce świeci wysoko. Ogród przedszkola jest przystrojony we wszystkie barwy tęczy. Rodzice zebrali się na widowni.' },
          { speakerId: 'basia', text: 'To nasza chwila! Dzieci, rozpoczynamy Wielki Taniec Ekspresji! Niech wasz śmiech rozbije wszelkie klatki!' },
          { speakerId: 'calm', text: 'Włączam Emiter Harmonii. Czas na wyciszenie i sterylną, spokojną przestrzeń. Żadnego hałasu, żadnego chaosu.' },
          { speakerId: 'system', text: 'Urządzenie na dachu zaczyna pulsować głębokim, niebieskim światłem, a z fortu nauczycielek wybucha fala tęczowych konfetti!' },
          { speakerId: 'system', text: 'Koloryduszek materializuje się na środku sceny, błyszcząc i czekając na Twój ostateczny gest!' }
        ],
        choices: [
          {
            id: 'ch5_final_freedom',
            text: '🌈 POMÓŻ NAUCZYCIELKOM: Zainicjuj szalony taniec, który przeciąży emiter fal i uwolni pełną swobodę!',
            impactFreedom: 40,
            impactOrder: -20,
            nextSceneId: 'ch5_final_dance_game',
            requiredFaction: 'NAUCZYCIELKI'
          },
          {
            id: 'ch5_final_order',
            text: '🔷 POMÓŻ TERAPEUTKOM: Aktywuj ostateczny kod emitera, by zapanował błogi, nieskazitelny spokój!',
            impactFreedom: -20,
            impactOrder: 40,
            nextSceneId: 'ch5_final_breathing_game',
            requiredFaction: 'TERAPEUTKI'
          },
          {
            id: 'ch5_final_neutral',
            text: '☯️ POGÓDŹ OBIE STRONY: Wykorzystaj moc Koloryduszka, by połączyć kreatywny taniec z głębokim wyciszeniem!',
            impactFreedom: 20,
            impactOrder: 20,
            nextSceneId: 'ch5_final_harmony_game'
          }
        ]
      },
      ch5_final_dance_game: {
        id: 'ch5_final_dance_game',
        title: 'Teczowy Taniec Wolności',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Muzyka osiąga apogeum! Pomóż dzieciom tańczyć, skakać i biegać, by stworzyć najgłośniejszą i najbardziej radosną falę energii w historii!' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch5_ending_freedom'
      },
      ch5_final_breathing_game: {
        id: 'ch5_final_breathing_game',
        title: 'Idealny Rytm Ciszy',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Emiter działa z pełną mocą, otaczając przedszkole bąblem idealnego spokoju. Pomóż dzieciom zsynchronizować ruchy w idealnie symetrycznym rytmie.' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch5_ending_order'
      },
      ch5_final_harmony_game: {
        id: 'ch5_final_harmony_game',
        title: 'Złoty Balans Koloryduszka',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Łączysz ogień i wodę! Pomóż dzieciom tańczyć kreatywnie, a potem wyciszać się w rytm duszka, tworząc idealny balans wyobraźni i spokoju!' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch5_ending_neutral'
      },
      ch5_ending_freedom: {
        id: 'ch5_ending_freedom',
        title: 'Epilog: Królestwo Wyobraźni',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Emiter Terapeutek przeciąża się i eksploduje chmurą kolorowego brokatu! Pani Calm upuszcza swoją podkładkę, patrząc z niedowierzaniem na tańczących rodziców i uradowane dzieci.' },
          { speakerId: 'basia', text: 'Udało się! Wolność, sztuka i głośny śmiech wygrały! Przedszkole na zawsze pozostanie krainą nieskrępowanej wyobraźni!' },
          { speakerId: 'system', text: 'Terapeutki zgadzają się schować swoje emitery do szafy. Od teraz "Tęczowy Zakątek" słynie z najbardziej kreatywnych i szalonych dzieci w kraju.' },
          { speakerId: 'player', text: 'Wybraliśmy wolność. Być może bywa tu głośno i chaotycznie, ale uśmiech dzieci i ich błyszczące oczy są tego warte.' },
          { speakerId: 'system', text: 'Koloryduszek krąży nad Tobą radosny, lśniąc wszystkimi barwami tęczy. Gratulacje! Ukończyłaś pierwszą kampanię po stronie Nauczycielek!' }
        ],
        choices: [
          {
            id: 'ch5_to_ch6_freedom',
            text: '✨ ROZPOCZNIJ NOWĄ KAMPANIĘ (ROZDZIAŁY 6–10)',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch6_intro',
            consequenceText: 'Przechodzisz do nowej kampanii...'
          }
        ]
      },
      ch5_ending_order: {
        id: 'ch5_ending_order',
        title: 'Epilog: Oaza Spokoju',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Emiter emituje łagodną, niesłyszalną falę harmonii. Dzieci siadają na dywanie z uśmiechami, idealnie skupione, budując piękne geometryczne mozaiki. Pani Basia odkłada pędzel i ze zdumieniem zauważa, jak bardzo uspokoiły się jej własne myśli.' },
          { speakerId: 'calm', text: 'Cel osiągnięty. Harmonia, ład i stymulacja strefowa przyniosły owoce. Koniec ze stresem i przebodźcowaniem.' },
          { speakerId: 'system', text: 'Nauczycielki dostrzegają wartość spokoju i zgadzają się na ustrukturyzowane zajęcia. "Tęczowy Zakątek" staje się wzorcową placówką edukacyjną, oazą ciszy i logicznego myślenia.' },
          { speakerId: 'player', text: 'Wybraliśmy porządek. Życie stało się przewidywalne i bezpieczne, a dzieci rozwijają swoje talenty w skupieniu i harmonii.' },
          { speakerId: 'system', text: 'Koloryduszek pulsuje łagodnym, błękitnym światłem, zasypiając spokojnie w centrum ogrodu. Gratulacje! Ukończyłaś pierwszą kampanię po stronie Terapeutek!' }
        ],
        choices: [
          {
            id: 'ch5_to_ch6_order',
            text: '✨ ROZPOCZNIJ NOWĄ KAMPANIĘ (ROZDZIAŁY 6–10)',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch6_intro',
            consequenceText: 'Przechodzisz do nowej kampanii...'
          }
        ]
      },
      ch5_ending_neutral: {
        id: 'ch5_ending_neutral',
        title: 'Epilog: Złota Harmonia',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Koloryduszek rozbłyska oślepiającym, złotym światłem, łącząc energię obu stron. Emiter Terapeutek zaczyna grać piękną, melodyjną muzykę do tańca Nauczycielek, a po szalonych harcach dzieci kładą się na kolorowych materacach, idealnie zrelaksowane.' },
          { speakerId: 'basia', text: 'To niesamowite... Nasza ekspresja połączyła się z waszym spokojem. To jest to, czego dzieci naprawdę potrzebowały!' },
          { speakerId: 'calm', text: 'Zgadzam się. Wolność bez granic to chaos, ale ład bez wolności to więzienie. Razem stworzyliśmy coś doskonałego.' },
          { speakerId: 'system', text: 'Obie frakcje podają sobie ręce. Przedszkole "Tęczowy Zakątek" staje się legendarnym miejscem, gdzie kreatywność i spokój współistnieją w doskonałej symbiozie.' },
          { speakerId: 'player', text: 'Wybraliśmy drogę balansu. Pokazaliśmy wszystkim, że nie trzeba wybierać między zabawą a wyciszeniem.' },
          { speakerId: 'system', text: 'Koloryduszek unika nad przedszkolem, mieniąc się złotem i tęczą. Stworzyłaś idealną przyszłość dla dzieci. Gratulacje! Osiągnęłaś legendarne, neutralne zakończenie pierwszej kampanii!' }
        ],
        choices: [
          {
            id: 'ch5_to_ch6_neutral',
            text: '✨ ROZPOCZNIJ NOWĄ KAMPANIĘ (ROZDZIAŁY 6–10)',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch6_intro',
            consequenceText: 'Przechodzisz do nowej kampanii...'
          }
        ]
      }
    }
  },
  {
    id: 6,
    title: 'Rozdział 6: Nowa Nauczycielka',
    summary: 'Kilka tygodni po wydarzeniach z Dnia Kolorów do przedszkola przychodzi nowa nauczycielka – Pani Amelia. Szybko zdobywa zaufanie nauczycielek i pomaga w misjach.',
    startSceneId: 'ch6_intro',
    scenes: {
      ch6_intro: {
        id: 'ch6_intro',
        title: 'Witamy Panią Amelię',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Minęło kilka tygodni od burzliwego finału Dnia Kolorów. Życie w przedszkolu toczy się nowym rytmem.' },
          { speakerId: 'basia', text: 'Asystentko! Chodź szybko, musisz kogoś poznać! To jest nasza nowa nauczycielka, Pani Amelia!' },
          { speakerId: 'amelia', text: 'Dzień dobry wszystkim! Jestem zachwycona, że mogę do was dołączyć. Słyszałam tyle dobrego o waszej kreatywności!' },
          { speakerId: 'player', text: 'Dzień dobry, Pani Amelio. Miło Panią poznać. Skąd Pani do nas trafia?' },
          { speakerId: 'amelia', text: 'Zostałam przeniesiona z innego przedszkola rzekomo z przyczyn logistycznych. Chcę wam pomóc odbić kolejne sale!' }
        ],
        choices: [
          {
            id: 'ch6_choice_trust',
            text: 'Powitaj Amelię entuzjastycznie i zaproponuj współpracę w kąciku zabaw.',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch6_mission',
            consequenceText: 'Amelia uśmiecha się promiennie i natychmiast bierze się do pracy.'
          },
          {
            id: 'ch6_choice_observe',
            text: 'Powitaj ją grzecznie, ale zachowaj czujność i profesjonalizm.',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch6_mission',
            consequenceText: 'Amelia kiwa głową ze zrozumieniem, podziwiając Twoje zorganizowane podejście.'
          }
        ]
      },
      ch6_mission: {
        id: 'ch6_mission',
        title: 'Wspólna Misja Edukacyjna',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'amelia', text: 'Dzieci chcą dziś zbudować wielką, wspólną konstrukcję edukacyjną w sali maluchów! Czy pomożesz mi to zorganizować?' },
          { speakerId: 'system', text: 'Amelia z zaangażowaniem przygotowuje pudła z materiałami, pomagając dzieciom na każdym kroku.' }
        ],
        choices: [],
        minigameType: 'BLOCKS',
        nextSceneIdOnMinigameWin: 'ch6_end'
      },
      ch6_end: {
        id: 'ch6_end',
        title: 'Ciepły wieczór w przedszkolu',
        backgroundUrl: '/assets/images/game_cover_1783451874065.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzień dobiega końca. Ostatnie dziecko opuściło budynek. Rozmawiasz z Amelią przy herbacie.' },
          { speakerId: 'player', text: 'Świetnie sobie poradziłaś, Amelio. Dzieci cię uwielbiają.' },
          { speakerId: 'amelia', text: 'Dziękuję. To wszystko dzięki waszej cudownej atmosferze. Ale wiesz...' },
          { speakerId: 'amelia', text: 'To nie jest jedyne przedszkole na świecie, które boryka się z takimi problemami...' },
          { speakerId: 'player', text: 'Co masz na myśli? Czy są inne placówki Zakonu Ciszy?' },
          { speakerId: 'amelia', text: 'Och, nieważne, pewnie tylko tak gadam z przemęczenia. Do jutra!' }
        ],
        choices: [
          {
            id: 'ch6_finish',
            text: 'Zakończ dzień i przygotuj się na kolejny tydzień.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch7_intro'
          }
        ]
      }
    }
  },
  {
    id: 7,
    title: 'Rozdział 7: Tajemnica Basenu',
    summary: 'Na basenie przedszkolnym zaczynają dziać się dziwne rzeczy. Słyszysz niepokojące ostrzeżenie, które prowadzi Cię do podziemi.',
    startSceneId: 'ch7_intro',
    scenes: {
      ch7_intro: {
        id: 'ch7_intro',
        title: 'Podejrzany Basen',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zajęcia na basenie przedszkolnym odbywają się pod czujnym okiem instruktorek. Ich nerwowe spojrzenia budzą jednak Twój niepokój.' },
          { speakerId: 'system', text: 'Gdy przechodzisz obok szatni basenowej, jedna z instruktorek łapie Cię za ramię i szepcze do ucha:' },
          { speakerId: 'system', text: '"Jeżeli naprawdę chcesz poznać prawdę... zejdź pod basen. Klucz do włazu leży w skrzynce z kołami ratunkowymi."' },
          { speakerId: 'player', text: 'Pod basen? Co tam może być?' }
        ],
        choices: [
          {
            id: 'ch7_choice_down',
            text: 'Zaryzykuj i przeszukaj skrzynkę z kołami ratunkowymi w poszukiwaniu klucza.',
            impactFreedom: 10,
            impactOrder: 5,
            nextSceneId: 'ch7_descent',
            consequenceText: 'Udaje Ci się potajemnie odnaleźć ciężki mosiężny klucz!'
          }
        ]
      },
      ch7_descent: {
        id: 'ch7_descent',
        title: 'Zejście w Ciemność',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Schodzisz do wilgotnej maszynowni pod basenem. Ciężkie metalowe rury huczą od płynącej wody.' },
          { speakerId: 'system', text: 'Na środku podłogi zauważasz zardzewiały właz zabezpieczony starym, mechanicznym zamkiem hydraulicznym.' },
          { speakerId: 'player', text: 'Muszę to poprawnie połączyć, by odblokować przejście...' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch7_tunnels'
      },
      ch7_tunnels: {
        id: 'ch7_tunnels',
        title: 'Sieć starych tuneli',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Właz otwiera się z głośnym trzaskiem. Schodzisz po drabinie w dół, trafiając do rozległej sieci starych, podziemnych korytarzy.' },
          { speakerId: 'system', text: 'Wilgoć skrapla się na ścianach. Docierasz do ukrytego pomieszczenia ze stołem pełnym dokumentów.' },
          { speakerId: 'player', text: 'Mój Boże... Co to jest? To są dokumentacje dotyczące dziesiątek innych przedszkoli!' },
          { speakerId: 'system', text: 'Na ścianie wisi ogromna mapa kraju z zaznaczonymi czerwonymi punktami – kolejnymi celami Zakonu Ciszy.' },
          { speakerId: 'player', text: 'Tęczowy Zakątek był tylko jednym z wielu celów... To o wiele większy spisek, niż myśleliśmy!' }
        ],
        choices: [
          {
            id: 'ch7_finish',
            text: 'Zabierz najważniejsze akta i wróć na górę.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch8_intro'
          }
        ]
      }
    }
  },
  {
    id: 8,
    title: 'Rozdział 8: Większy Spisek',
    summary: 'Amelia prowadzi Cię do ukrytego archiwum Zakonu Ciszy. Gracz dowiaduje się o tajemniczym Kierowniku i jego wielkich planach.',
    startSceneId: 'ch8_intro',
    scenes: {
      ch8_intro: {
        id: 'ch8_intro',
        title: 'Ukryte Archiwum',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Gdy studiujesz mapę w tunelach, nagle słyszysz kroki na schodach. Odwracasz się z lękiem, ale to tylko... Pani Amelia!' },
          { speakerId: 'amelia', text: 'Ciii, asystentko, to ja! Wiedziałam, że tu zejdziesz. Chodź za mną, pokazać ci coś jeszcze ważniejszego.' },
          { speakerId: 'player', text: 'Amelio? Skąd o tym wiedziałaś?' },
          { speakerId: 'amelia', text: 'Też prowadziłam własne śledztwo. Tutaj, za tą ceglaną ścianą, znajduje się ściśle tajne archiwum Zakonu Ciszy.' }
        ],
        choices: [
          {
            id: 'ch8_choice_follow',
            text: 'Zaufaj Amelii i wejdź z nią do ukrytej komnaty archiwalnej.',
            impactFreedom: 10,
            impactOrder: 5,
            nextSceneId: 'ch8_archive',
            consequenceText: 'Amelia przesuwa obluzowaną cegłę, otwierając ciężkie żelazne drzwi.'
          }
        ]
      },
      ch8_archive: {
        id: 'ch8_archive',
        title: 'Zapiski z Cienia',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pomieszczenie wypełniają rzędy metalowych szaf z poufnymi teczkami personalnymi oraz planami operacyjnymi Zakonu.' },
          { speakerId: 'amelia', text: 'Spójrz na te dokumenty finansowe i rozkazy. Wszystkie mają ten sam podpis na dole.' },
          { speakerId: 'player', text: '"Zatwierdzono do wdrożenia – Kierownik" ... Kim jest ten człowiek?' },
          { speakerId: 'amelia', text: 'Nikt nie zna jego prawdziwego imienia ani wyglądu. Jest tylko ten symbol przedstawiający zarysy łysej sylwetki.' },
          { speakerId: 'player', text: 'Więc Pani Calm i terapeutki były jedynie pionkami w rękach tego Kierownika...' }
        ],
        choices: [],
        minigameType: 'HIDDEN',
        nextSceneIdOnMinigameWin: 'ch8_conspiracy'
      },
      ch8_conspiracy: {
        id: 'ch8_conspiracy',
        title: 'Uświadomienie zagrożenia',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wracacie na górę i zwołujecie tajną naradę w pokoju nauczycielskim z Panią Basią i resztą zespołu.' },
          { speakerId: 'basia', text: 'To niesamowite... Myślałyśmy, że walka skończyła się po Dniu Kolorów! A to dopiero wierzchołek góry lodowej!' },
          { speakerId: 'player', text: 'Zgadza się. Pokonanie Pani Calm to był dopiero początek. Cała sieć placówek jest sterowana przez Kierownika.' }
        ],
        choices: [
          {
            id: 'ch8_finish',
            text: 'Obiecaj nauczycielkom pomoc w rozpracowaniu spisku.',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch9_intro'
          }
        ]
      }
    }
  },
  {
    id: 9,
    title: 'Rozdział 9: Zdrada',
    summary: 'Pani Amelia nagle znika. Odkrywasz nagrania z monitoringu, które ujawniają jej prawdziwą tożsamość jako wysłanniczki Kierownika.',
    startSceneId: 'ch9_intro',
    scenes: {
      ch9_intro: {
        id: 'ch9_intro',
        title: 'Zniknięcie Amelii',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kilka dni później Pani Amelia nie pojawia się w pracy. Jej telefon nie odpowiada, a jej rzeczy zniknęły z szafki.' },
          { speakerId: 'basia', text: 'Asystentko! Coś jest bardzo nie tak. Znalazłam ślady włamania do systemu kamer pod basenem. Ktoś usunął nagrania z nocy!' },
          { speakerId: 'player', text: 'Musimy spróbować odzyskać te dane z zapasowego serwera w piwnicy.' }
        ],
        choices: [
          {
            id: 'ch9_choice_restore',
            text: 'Uruchom proces przywracania uszkodzonych nagrań z monitoringu.',
            impactFreedom: 5,
            impactOrder: 15,
            nextSceneId: 'ch9_sabotage',
            consequenceText: 'Serwer mruga czerwonymi diodami, po czym na ekranie pojawia się czarno-biały obraz.'
          }
        ]
      },
      ch9_sabotage: {
        id: 'ch9_sabotage',
        title: 'Prawda na ekranie',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Na odzyskanym nagraniu widzisz postać z latarką w tunelach pod basenem. To Amelia!' },
          { speakerId: 'system', text: 'Otwierała tajne zamki zabezpieczające, rozmawiała przez ukryte radio i celowo sabotowała instalacje wentylacyjne nauczycielek.' },
          { speakerId: 'basia', text: 'O mój Boże... Amelia! Ona od samego początku pracowała dla nich! Zdradziła nas!' },
          { speakerId: 'player', text: 'Nie była tu przypadkowo. Była wysłanniczką samego Kierownika, wysłaną by nas kontrolować...' }
        ],
        choices: [
          {
            id: 'ch9_choice_confront',
            text: 'Zejdź natychmiast do tuneli pod basenem, aby schwytać Amelię na gorącym uczynku.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch9_encounter',
            consequenceText: 'Biegniesz krętymi korytarzami piwnic, słysząc szum wody.'
          }
        ]
      },
      ch9_encounter: {
        id: 'ch9_encounter',
        title: 'Ostateczne spotkanie z Amelią',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W głębi tuneli, przy pulsującym czerwonym terminalu, dostrzegasz Panią Amelię w ciemnym płaszczu.' },
          { speakerId: 'player', text: 'Stój, Amelio! Wiemy wszystko. Wiemy, że pracujesz dla Kierownika!' },
          { speakerId: 'amelia', text: 'Ach, więc w końcu się domyśliliście... Przykro mi, asystentko. Polubiłam was, ale plany Kierownika są o wiele ważniejsze.' },
          { speakerId: 'amelia', text: 'Ten cały chaos i wolność, którą tu szerzycie, niszczy wydajność dzieci. Kierownik zaprowadzi tu idealny ład.' },
          { speakerId: 'player', text: 'Nie pozwolimy ci zniszczyć tego, co zbudowaliśmy!' }
        ],
        choices: [
          {
            id: 'ch9_choice_fight',
            text: '⚔️ STOCZ WALKĘ Z AMELIĄ: Rozegraj pojedynek diamentów, by powstrzymać zdradę!',
            impactFreedom: 15,
            impactOrder: -15,
            nextSceneId: 'ch9_boss'
          }
        ]
      },
      ch9_boss: {
        id: 'ch9_boss',
        title: 'Pojedynek z Panią Amelią',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Amelia uśmiecha się smutno i wyciąga swój kamerton wyciszenia. Czas na ostateczną batalię diamentów!' }
        ],
        choices: [],
        minigameType: 'DIAMOND',
        nextSceneIdOnMinigameWin: 'ch9_defeat'
      },
      ch9_defeat: {
        id: 'ch9_defeat',
        title: 'Ucieczka Amelii',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzięki Twojemu zapałowi i precyzyjnym połączeniom diamentów, urządzenie Amelii przegrzewa się i sypie iskrami!' },
          { speakerId: 'amelia', text: 'Ałć! Jesteś silniejsza, niż sądziłam... Ale to niczego nie zmieni!' },
          { speakerId: 'system', text: 'Amelia rzuca pod nogi granat dymny, oślepiając Cię na chwilę. Gdy dym opada, dziewczyny już nie ma, a drzwi windy towarowej są otwarte.' },
          { speakerId: 'player', text: 'Uciekła... Schodziła głębiej. Muszę ruszyć za nią!' }
        ],
        choices: [
          {
            id: 'ch9_finish',
            text: 'Wejdź do windy towarowej i zjedź na najniższy poziom podziemi.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch10_intro'
          }
        ]
      }
    }
  },
  {
    id: 10,
    title: 'Rozdział 10: Łysy Kierownik',
    summary: 'Docierasz do gigantycznego centrum dowodzenia pod ziemią, gdzie czeka na Ciebie tajemniczy Łysy Kierownik.',
    startSceneId: 'ch10_intro',
    scenes: {
      ch10_intro: {
        id: 'ch10_intro',
        title: 'Serce Syndykatu',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Winda zjeżdża głęboko pod ziemię przez kilkanaście sekund. Drzwi otwierają się z sykiem sprężonego powietrza.' },
          { speakerId: 'system', text: 'Wkraczasz do gigantycznego, mrocznego centrum dowodzenia naszpikowanego technologią i monitorami.' },
          { speakerId: 'system', text: 'Na dziesiątkach ekranów wyświetlane są przekazy na żywo z klas lekcyjnych i ogrodów przedszkoli z całego kraju.' },
          { speakerId: 'player', text: 'To jest przerażające... Oni monitorują tysiące niewinnych dzieci!' }
        ],
        choices: [
          {
            id: 'ch10_choice_center',
            text: 'Przejdź na środek sali dowodzenia przed wielki pulpit operatorski.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch10_command_center',
            consequenceText: 'Idziesz odważnym krokiem, a Twoje obcasy stukają o metalową podłogę.'
          }
        ]
      },
      ch10_command_center: {
        id: 'ch10_command_center',
        title: 'Spotkanie z Łysym Kierownikiem',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W centralnej części pomieszczenia, w wielkim skórzanym fotelu, siedzi postać ubrana w elegancki garnitur.' },
          { speakerId: 'system', text: 'Fotel obraca się powoli. Mężczyzna jest całkowicie łysy, a jego zimne oczy patrzą na Ciebie z absolutnym spokojem.' },
          { speakerId: 'lysy_kierownik', text: 'Witaj, asystentko. Naprawdę myślałaś, że Pani Calm kierowała tym wszystkim?' },
          { speakerId: 'player', text: 'Kim jesteś?! I po co to wszystko robisz?' },
          { speakerId: 'lysy_kierownik', text: 'Nazywają mnie Kierownikiem. Zarządzam tymi zasobami. Wychowujemy idealne pokolenie bez chaotycznych emocji. Czysta logika, zysk i porządek.' },
          { speakerId: 'player', text: 'Dzieci to nie maszyny do zysku! Nie pozwolimy wam odebrać im uśmiechu!' },
          { speakerId: 'lysy_kierownik', text: 'Zobaczymy, ile warta jest wasza kreatywność w zderzeniu z moim budżetem i algorytmami.' }
        ],
        choices: [
          {
            id: 'ch10_choice_boss',
            text: '⚔️ RZUĆ WYZWANIE KIEROWNIKOWI: Rozpocznij ostateczną rozgrywkę punktową!',
            impactFreedom: 20,
            impactOrder: -20,
            nextSceneId: 'ch10_boss'
          }
        ]
      },
      ch10_boss: {
        id: 'ch10_boss',
        title: 'Starcie z Łysym Kierownikiem',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kierownik podnosi dłoń i aktywuje kalkulator kosztów, tasując całą planszę diamentów. Pokaż mu siłę dziecięcej wolności!' }
        ],
        choices: [],
        minigameType: 'DIAMOND',
        nextSceneIdOnMinigameWin: 'ch10_ending'
      },
      ch10_ending: {
        id: 'ch10_ending',
        title: 'Koniec Pierwszej Kampanii',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: ' plansza eksploduje kaskadą dopasowań diamentów, przeciążając terminale na biurku Kierownika!' },
          { speakerId: 'lysy_kierownik', text: 'Heh... Imponujące. Masz talent, asystentko. Ale spójrz na ekrany.' },
          { speakerId: 'system', text: 'Na olbrzymich monitorach wokół Was zaczynają migać czerwone alarmy, ukazując setki innych przedszkoli, w których grupy porządkowe przejmują kontrolę.' },
          { speakerId: 'lysy_kierownik', text: 'Możesz ocalić jedno przedszkole. Ale syndykat jest wszędzie. To dopiero początek...' },
          { speakerId: 'system', text: 'Nagle rozlega się głośny sygnał alarmowy, a ciężkie pancerne drzwi centrum dowodzenia zatrzaskują się, odcinając windę.' },
          { speakerId: 'system', text: 'Ziemia zaczyna lekko drżeć, a na ekranie głównym pojawia się wielkie logo syndykatu. Gra kończy się pełnym napięcia zawieszeniem akcji...' },
          { speakerId: 'player', text: 'Nigdy się nie poddamy. Będziemy walczyć o uśmiech każdego dziecka!' },
          { speakerId: 'system', text: 'GRATULACJE! UKOŃCZYŁAŚ PIERWSZĄ KAMPANIĘ GRY!' }
        ],
        choices: [
          {
            id: 'ch10_next_campaign',
            text: 'Rozpocznij Drugą Kampanię: Rozdział 11',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch11_intro'
          }
        ]
      }
    }
  },
  {
    id: 11,
    title: 'Rozdział 11: Nowa nadzieja',
    summary: 'Pani Amelia wraca, by odkupić swoje błędy. Pojawia się także nowa nauczycielka angielskiego, która postanawia dołączyć do ruchu oporu.',
    startSceneId: 'ch11_intro',
    scenes: {
      ch11_intro: {
        id: 'ch11_intro',
        title: 'Powrót skruszonej Amelii',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kolejny dzień w Tęczowym Zakątku. Na podwórku przedszkola niespodziewanie pojawia się Pani Amelia.' },
          { speakerId: 'amelia', text: 'Proszę, wysłuchajcie mnie! Wiem, co zrobiłam... Sabotowałam waszą pracę, ale Kierownik mnie oszukał. Chcę naprawić swoje błędy i pomóc wam uratować to miejsce.' },
          { speakerId: 'basia', text: 'Amelio! Jak śmiesz tu wracać po tym wszystkim, co zrobiłaś?! Okłamałaś nas!' },
          { speakerId: 'hania', text: 'Dziewczyny, spokojnie. Może ona naprawdę żałuje? Decyzja należy do naszej asystentki.' }
        ],
        choices: [
          {
            id: 'ch11_trust_amelia',
            text: '„Dajmy jej szansę. Każdy zasługuje na drugą szansę na odkupienie.”',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch11_english_teacher_arrival',
            consequenceText: 'Amelia ociera łzę wdzięczności. Basia nadal patrzy na nią z ukosa.'
          },
          {
            id: 'ch11_reject_amelia',
            text: '„Musimy być bardzo ostrożne. Amelia może nadal grać na dwa fronty.”',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch11_english_teacher_arrival',
            consequenceText: 'Zgadzasz się na jej pomoc, ale pod ścisłym nadzorem. Porządek i ostrożność nade wszystko.'
          }
        ]
      },
      ch11_english_teacher_arrival: {
        id: 'ch11_english_teacher_arrival',
        title: 'Nowa siła: Nauczycielka Angielskiego',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nagle ze schodów zbiega nowa nauczycielka języka angielskiego, Pani Milena, ściskając w ręku kolorowe fiszki.' },
          { speakerId: 'milena', text: 'Good morning, everyone! Przepraszam, że dopiero teraz... Przez wiele miesięcy paraliżował mnie strach przed terapeutkami i ich wpływami u Kierownika.' },
          { speakerId: 'milena', text: 'Ale kiedy zobaczyłam waszą niezłomność, poczułam, że nie mogę dłużej milczeć. I can\'t hide anymore! Chcę dołączyć do waszego ruchu oporu!' },
          { speakerId: 'zosia', text: 'Milenka! Wiedziałam, że masz lwie serce! Witaj w zespole!' },
          { speakerId: 'player', text: 'Pomożesz nam przygotować kreatywną, śpiewaną lekcję angielskiego dla dzieci, żeby rozbudzić ich radość?' }
        ],
        choices: [
          {
            id: 'ch11_play_minigame',
            text: 'Rozpocznij kreatywną lekcję angielskiego: Dopasuj słówka w grze logicznej!',
            impactFreedom: 10,
            impactOrder: 5,
            nextSceneId: 'ch11_minigame'
          }
        ]
      },
      ch11_minigame: {
        id: 'ch11_minigame',
        title: 'Śpiewający Angielski',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Milena rozpoczyna wesołą piosenkę. Pomóż dzieciom ułożyć puzzle językowe i stworzyć piękne, kolorowe rysunki!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch11_end'
      },
      ch11_end: {
        id: 'ch11_end',
        title: 'Nowa nadzieja',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzięki udanej lekcji z Panią Mileną dzieci śpiewają i tańczą po angielsku, całkowicie ignorując nakazy ciszy terapeutek.' },
          { speakerId: 'milena', text: 'We did it! To było wspaniałe! Terapeutki próbowały nas uciszyć, ale energia dzieciaków była niesamowita.' },
          { speakerId: 'player', text: 'Mamy nową sojuszniczkę. Nasur ruch oporu rośnie w siłę, ale musimy być gotowe na kolejny krok.' }
        ],
        choices: [
          {
            id: 'ch11_finish',
            text: 'Przejdź do Rozdziału 12: Dyrektorka',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch12_intro'
          }
        ]
      }
    }
  },
  {
    id: 12,
    title: 'Rozdział 12: Dyrektorka',
    summary: 'Poznajesz starszą Dyrektorkę przedszkola. Jest dobrą osobą, ale wierzy w skargi terapeutek. Musisz zdobyć dowody prawdy.',
    startSceneId: 'ch12_intro',
    scenes: {
      ch12_intro: {
        id: 'ch12_intro',
        title: 'W gabinecie Dyrektorki Heleny',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wkraczasz do tradycyjnego, ciepłego gabinetu dyrekcji. Za biurkiem siedzi starsza, siwa kobieta o łagodnym spojrzeniu.' },
          { speakerId: 'dyrektorka', text: 'Dzień dobry, moje dziecko. Jestem Dyrektorka Helena. Tak bardzo martwię się o nasze przedszkole... Codziennie otrzymuję stosy raportów od terapeutek.' },
          { speakerId: 'dyrektorka', text: 'Piszą, że kreatywne nauczycielki wprowadzają niebezpieczny chaos, niszczą zabawki i stresują dzieci. Zaczynam wierzyć, że muszę podjąć drastyczne decyzje kadrowe...' },
          { speakerId: 'player', text: 'Pani dyrektor, to nieprawda! Terapeutki manipulują faktami, aby przejąć kontrolę nad placówką!' },
          { speakerId: 'dyrektorka', text: 'Słowa to za mało, asystentko. Potrzebuję twardych, namacalnych dowodów. Pomóż mi je znaleźć.' }
        ],
        choices: [
          {
            id: 'ch12_start_search',
            text: 'Rozpocznij poszukiwania dowodów w archiwach gabinetu.',
            impactFreedom: 5,
            impactOrder: 10,
            nextSceneId: 'ch12_minigame'
          }
        ]
      },
      ch12_minigame: {
        id: 'ch12_minigame',
        title: 'Poszukiwanie dowodów prawdy',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Przeszukaj szafy i szuflady, by odnaleźć sfałszowane przez terapeutki protokoły i prawdziwe zapiski z postępów maluchów!' }
        ],
        choices: [],
        minigameType: 'HIDDEN',
        nextSceneIdOnMinigameWin: 'ch12_confront'
      },
      ch12_confront: {
        id: 'ch12_confront',
        title: 'Oczy szeroko zamknięte',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kładziesz na biurku dyrektorki odnalezione, ukryte dokumenty terapeutyczne wykazujące celowe zaniżanie ocen dzieci.' },
          { speakerId: 'dyrektorka', text: 'O mój Boże... Te wykresy są sfałszowane. One celowo przedstawiały radosne zabawy ruchowe jako akty agresji!' },
          { speakerId: 'dyrektorka', text: 'Dziękuję ci, asystentko. Zaczynam rozumieć, jak bardzo dałam się omamić. Muszę bacznie się im przyglądać.' },
          { speakerId: 'player', text: 'To dopiero wierzchołek góry lodowej. Uratujemy to przedszkole razem.' }
        ],
        choices: [
          {
            id: 'ch12_finish',
            text: 'Przejdź do Rozdziału 13: Kucharz',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch13_intro'
          }
        ]
      }
    }
  },
  {
    id: 13,
    title: 'Rozdział 13: Kucharz',
    summary: 'Poznajesz poczciwego kucharza Janka. Jest zagubiony i nie wie komu ufać. Twoje decyzje zadecydują, po której stronie stanie.',
    startSceneId: 'ch13_intro',
    scenes: {
      ch13_intro: {
        id: 'ch13_intro',
        title: 'Zapach drożdżówek w kuchni',
        backgroundUrl: '/assets/images/kitchen_bg_1783533322488.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wchodzisz do przestronnej, lśniącej kuchni przedszkolnej. W powietrzu unosi się cudowny aromat pieczonych drożdżówek.' },
          { speakerId: 'kucharz', text: 'O, witaj asystentko! Jestem Janek, kucharz. Sam nie wiem, co robić... Terapeutki mówią, że moje słodkie bułeczki mają za dużo cukru i powonieniem serwować dzieciom tylko gorzkie kleiki sensoryczne.' },
          { speakerId: 'kucharz', text: 'Nauczycielki z kolei proszą o kolorowe desery pełne radości. Chcę dobrze dla dzieci, ale boję się zwolnienia z powodu łamania unijnych norm.' },
          { speakerId: 'player', text: 'Pomożemy ci upiec coś, co zachwyci dzieci i spełni normy bezpieczeństwa!' }
        ],
        choices: [
          {
            id: 'ch13_bake_creative',
            text: '„Upieczmy niesamowite, kolorowe drożdżówki w kształcie wesołych stworków!”',
            impactFreedom: 15,
            impactOrder: -10,
            nextSceneId: 'ch13_minigame_creative',
            consequenceText: 'Kuchnia zamienia się w festiwal kolorowej posypki i radości.'
          },
          {
            id: 'ch13_bake_orderly',
            text: '„Upieczmy perfekcyjnie równe, geometryczne ciasteczka z niską zawartością cukru.”',
            impactFreedom: -10,
            impactOrder: 15,
            nextSceneId: 'ch13_minigame_orderly',
            consequenceText: 'Kucharz z aprobatą waży każdy gram składnika, dbając o idealne proporcje.'
          }
        ]
      },
      ch13_minigame_creative: {
        id: 'ch13_minigame_creative',
        title: 'Wypiekanie Kreatywnych Słodkości',
        backgroundUrl: '/assets/images/kitchen_bg_1783533322488.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pora ozdobić pyszne wypieki! Użyj kolorowego lukru, aby stworzyć najbardziej fantazyjne bułeczki w historii przedszkola!' }
        ],
        choices: [],
        minigameType: 'PAINT',
        nextSceneIdOnMinigameWin: 'ch13_victory'
      },
      ch13_minigame_orderly: {
        id: 'ch13_minigame_orderly',
        title: 'Pieczenie Dietetycznych Ciastek',
        backgroundUrl: '/assets/images/kitchen_bg_1783533322488.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Układaj ciasteczka na blachach w idealnie równoległych rzędach, zachowując pełną symetrię!' }
        ],
        choices: [],
        minigameType: 'BLOCKS',
        nextSceneIdOnMinigameWin: 'ch13_victory'
      },
      ch13_victory: {
        id: 'ch13_victory',
        title: 'Zaufanie zdobyte',
        backgroundUrl: '/assets/images/kitchen_bg_1783533322488.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzieci z zachwytem zjadają pyszny podwieczorek, a na ich twarzach goszczą szerokie uśmiechy.' },
          { speakerId: 'kucharz', text: 'To było niesamowite! Widząc radość tych dzieciaków, zrozumiałem, że to wy macie rację. Od teraz możecie na mnie liczyć!' },
          { speakerId: 'player', text: 'Dziękuję, Janku. Twoje wsparcie w kuchni będzie kluczowe dla naszych dalszych misji.' }
        ],
        choices: [
          {
            id: 'ch13_finish',
            text: 'Przejdź do Rozdziału 14: Zastraszani',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch14_intro'
          }
        ]
      }
    }
  },
  {
    id: 14,
    title: 'Rozdział 14: Zastraszani',
    summary: 'Część pomocy nauczyciela żyje w ciągłym strachu z powodu tajemniczych gróźb i podsłuchów. Pomóż im odnaleźć źródło przecieku.',
    startSceneId: 'ch14_intro',
    scenes: {
      ch14_intro: {
        id: 'ch14_intro',
        title: 'Strach w kuluarach',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W bocznej kanciapie spotykasz zapłakaną pomoc nauczyciela, trzymającą drżący telefon.' },
          { speakerId: 'system', text: 'Pokazuje Ci ekran z anonimowymi groźbami: „Wiemy, co mówicie w pokoju socjalnym. Jeśli poprzecie nauczycielki, dyrekcja dowie się o waszych spóźnieniach.”' },
          { speakerId: 'player', text: 'Ktoś was nagrywa i szantażuje. Nie pozwólcie się zastraszyć, pomożemy wam rozwiązać tę sprawę!' },
          { speakerId: 'basia', text: 'Musimy namierzyć nadawcę tych wiadomości i sprawdzić, jak te nagrania trafiają w ręce terapeutek.' }
        ],
        choices: [
          {
            id: 'ch14_trace_msg',
            text: 'Rozpocznij deszyfrację i analizę sieciową sygnału telefonicznego.',
            impactFreedom: 5,
            impactOrder: 15,
            nextSceneId: 'ch14_minigame'
          }
        ]
      },
      ch14_minigame: {
        id: 'ch14_minigame',
        title: 'Łamanie kodu nadajnika',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Połącz rozproszone przekaźniki i odkoduj zakłócony sygnał, aby poznać współrzędne urządzenia wysyłającego pogróżki!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch14_reveal'
      },
      ch14_reveal: {
        id: 'ch14_reveal',
        title: 'Zdemaskowane intrygi',
        backgroundUrl: '/assets/images/secret_room_1783451926713.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Sygnał zostaje namierzony! Pochodzi z tajnego nadajnika ukrytego w klasowym wentylatorze.' },
          { speakerId: 'player', text: 'Terapeutki używały lokalnego routera do przechwytywania rozmów i wysyłania automatycznych SMS-ów szantażujących.' },
          { speakerId: 'system', text: 'Pomocnicy nauczyciela oddychają z ulgą. Wiedzą już, że nie są bezbronni wobec technologii syndykatu.' }
        ],
        choices: [
          {
            id: 'ch14_finish',
            text: 'Przejdź do Rozdziału 15: Ktoś słucha',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch15_intro'
          }
        ]
      }
    }
  },
  {
    id: 15,
    title: 'Rozdział 15: Ktoś słucha',
    summary: 'W przedszkolu znikają poufne dane, a każde spotkanie jest rejestrowane. Czas zmierzyć się ze Strażniczką Nasłuchu.',
    startSceneId: 'ch15_intro',
    scenes: {
      ch15_intro: {
        id: 'ch15_intro',
        title: 'Sieć pluskiew',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Podczas tajnego zebrania w piwnicy nagle słyszycie dziwny pisk wysokiej częstotliwości.' },
          { speakerId: 'hania', text: 'Słyszycie to? To brzmi jak... sprzężenie zwrotne z mikrofonu bezprzewodowego!' },
          { speakerId: 'player', text: 'Są tutaj. Całe przedszkole zostało naszpikowane mikrofonami przez ludzi Łysego Kierownika.' },
          { speakerId: 'system', text: 'Musicie zlokalizować i zneutralizować te podsłuchy, zanim ujawnią wasz kolejny krok!' }
        ],
        choices: [
          {
            id: 'ch15_sweep_room',
            text: 'Przeszukaj pomieszczenie za pomocą wykrywacza fal elektromagnetycznych.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch15_sweep'
          }
        ]
      },
      ch15_sweep: {
        id: 'ch15_sweep',
        title: 'Neutralizowanie podsłuchów',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Znajdź wszystkie sprytnie ukryte mikrofony i pluskwy schowane za plakatami, pod stołami i w zabawkach!' }
        ],
        choices: [],
        minigameType: 'HIDDEN',
        nextSceneIdOnMinigameWin: 'ch15_boss_encounter'
      },
      ch15_boss_encounter: {
        id: 'ch15_boss_encounter',
        title: 'Starcie ze Strażniczką Nasłuchu',
        backgroundUrl: '/assets/images/sonia_portrait_1783533307520.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Po zneutralizowaniu ostatniego podsłuchu, nagle z cienia wyłania się tajemnicza postać w ciemnym garniturze z zaawansowanymi słuchawkami.' },
          { speakerId: 'sonia', text: 'Myślałyście, że możecie bezkarnie szeptać w moim przedszkolu? Jestem Sonia, Strażniczka Nasłuchu.' },
          { speakerId: 'sonia', text: 'Każdy wasz oddech, każda piosenka i każda narada są zapisywane na moich serwerach. Wasz opór zostanie wyciszony.' },
          { speakerId: 'player', text: 'Nigdy nas nie uciszycie! Pora położyć kres waszej inwigilacji!' }
        ],
        choices: [
          {
            id: 'ch15_boss_fight',
            text: '⚔️ POKONAJ STRAŻNICZKĘ NASŁUCHU: Rozegraj pojedynek diamentów!',
            impactFreedom: 15,
            impactOrder: -15,
            nextSceneId: 'ch15_boss_game'
          }
        ]
      },
      ch15_boss_game: {
        id: 'ch15_boss_game',
        title: 'Symfonia wolnych głosów',
        backgroundUrl: '/assets/images/sonia_portrait_1783533307520.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Sonia aktywuje paraliżujący generator szumów. Połącz diamenty kreatywności, by przełamać jej barierę!' }
        ],
        choices: [],
        minigameType: 'DIAMOND',
        nextSceneIdOnMinigameWin: 'ch15_victory'
      },
      ch15_victory: {
        id: 'ch15_victory',
        title: 'Cisza przed burzą',
        backgroundUrl: '/assets/images/sonia_portrait_1783533307520.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Z potężnym hukiem sprzęt inwigilacyjny Soni przegrzewa się, a ekrany pokrywają się zakłóceniami.' },
          { speakerId: 'sonia', text: 'To... niemożliwe! Moje filtry audio... Moje nagrania zostały skasowane!' },
          { speakerId: 'player', text: 'Twoje uszy już nas nie dosięgną, Soniu. Przedszkole odzyskuje swój głos!' }
        ],
        choices: [
          {
            id: 'ch15_finish',
            text: 'Przejdź do Rozdziału 16: Sala Gimnastyczna',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch16_intro'
          }
        ]
      }
    }
  },
  {
    id: 16,
    title: 'Rozdział 16: Sala gimnastyczna',
    summary: 'Poznajesz spokojnego w-fistę Roberta. Pomóż mu odzyskać odwagę i uratować ważne dokumenty przed zniszczeniem.',
    startSceneId: 'ch16_intro',
    scenes: {
      ch16_intro: {
        id: 'ch16_intro',
        title: 'Dobroduszny w-fista',
        backgroundUrl: '/assets/images/gym_bg_1783533335722.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wchodzisz do dużej, dobrze oświetlonej sali gimnastycznej. Na środku stoi rosły, wysportowany mężczyzna, rzucając piłką do kosza.' },
          { speakerId: 'robert', text: 'Ach, cześć. Jestem Robert, uczę tu w-f. Widzę od dawna, co te terapeutki robią z dzieciakami... Zabraniają im biegać, skakać, krzyczeć z radości.' },
          { speakerId: 'robert', text: 'Zawsze milczałem, bo bałem się o pracę. Ale koniec z tym. Dowiedziałem się, że terapeutki niszczą w niszczarce stare archiwa przedszkola w kantorku sportowym!' },
          { speakerId: 'player', text: 'Musimy uratować te dokumenty! Mogą tam być kluczowe dowody przeciwko Kierownikowi!' }
        ],
        choices: [
          {
            id: 'ch16_save_docs',
            text: 'Pokonaj tor przeszkód w sali gimnastycznej i przechwyć dokumenty!',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch16_minigame'
          }
        ]
      },
      ch16_minigame: {
        id: 'ch16_minigame',
        title: 'Ratowanie dokumentów',
        backgroundUrl: '/assets/images/gym_bg_1783533335722.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Czas nagli! Przebiegnij przez slalom z pachołków, przeskocz materace i wyciągnij teczki przed ostrzami niszczarki!' }
        ],
        choices: [],
        minigameType: 'MOVEMENT',
        nextSceneIdOnMinigameWin: 'ch16_victory'
      },
      ch16_victory: {
        id: 'ch16_victory',
        title: 'Zwycięstwo fizyczne i moralne',
        backgroundUrl: '/assets/images/gym_bg_1783533335722.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W ostatniej chwili wyrywasz nienaruszone teczki z rąk asystentów terapeutek.' },
          { speakerId: 'robert', text: 'Świetny bieg! Masz niesamowitą formę! Cieszę się, że mogłem pomóc. Koniec z moim strachem. Od dziś w-f uczy odwagi i wolności!' },
          { speakerId: 'player', text: 'Te dokumenty są bezcenne. Zobaczmy, co w nich ukrywali.' }
        ],
        choices: [
          {
            id: 'ch16_finish',
            text: 'Przejdź do Rozdziału 17: Fałszywe oskarżenia',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch17_intro'
          }
        ]
      }
    }
  },
  {
    id: 17,
    title: 'Rozdział 17: Fałszywe oskarżenia',
    summary: 'Terapeutki podrzucają dowody obciążające Panią Hanię. Musisz przeprowadzić śledztwo i oczyścić ją z zarzutów.',
    startSceneId: 'ch17_intro',
    scenes: {
      ch17_intro: {
        id: 'ch17_intro',
        title: 'Intryga szyta grubymi nićmi',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'W gabinecie dyreccji panuje grobowa atmosfera. Roztrzęsiona Pani Hania stoi obok biurka.' },
          { speakerId: 'dyrektorka', text: 'Asystentko, to straszne... Terapeutki przyniosły mi raport wraz z nagraniem, z którego wynika, że Hania celowo zniszczyła drogi sprzęt sensoryczny w gabinecie.' },
          { speakerId: 'hania', text: 'To kłamstwo! Nigdy bym czegoś takiego nie zrobiła! Nawet nie było mnie wtedy w tej części budynku!' },
          { speakerId: 'player', text: 'Pani dyrektor, to kolejna intryga. Udowodnię, że te dowody zostały sfałszowane!' }
        ],
        choices: [
          {
            id: 'ch17_analyze_tape',
            text: 'Zbadaj uszkodzone nagranie wideo i znajdź ślady montażu.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch17_minigame'
          }
        ]
      },
      ch17_minigame: {
        id: 'ch17_minigame',
        title: 'Analiza dowodów cyfrowych',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ułóż klatki nagrania w odpowiednim porządku chronologicznym, by ujawnić manipulację czasem i prawdziwego sprawcę!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch17_victory'
      },
      ch17_victory: {
        id: 'ch17_victory',
        title: 'Niewinność dowiedziona',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ekrany pokazują bezsprzeczny dowód: na oryginalnym nagraniu to Pani Harmony niszczy sprzęt, by potem zmontować wideo z twarzą Hani.' },
          { speakerId: 'dyrektorka', text: 'Och... Haniu, tak bardzo cię przepraszam. Jak mogłam w to uwierzyć?! Moje zaufanie do terapeutek zostało bezpowrotnie zniszczone.' },
          { speakerId: 'player', text: 'Sprawiedliwość zwyciężyła, ale musimy uderzyć w serce ich operacji.' }
        ],
        choices: [
          {
            id: 'ch17_finish',
            text: 'Przejdź do Rozdziału 18: Ludzie basenu',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch18_intro'
          }
        ]
      }
    }
  },
  {
    id: 18,
    title: 'Rozdział 18: Ludzie basenu',
    summary: 'Odkrywasz tajną grupę pod basenem współpracującą z Kierownikiem. Niektórzy robią to pod przymusem. Przekonaj ich do buntu.',
    startSceneId: 'ch18_intro',
    scenes: {
      ch18_intro: {
        id: 'ch18_intro',
        title: 'Podziemne instalacje basenowe',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dzięki ocalałym dokumentom schodzisz głęboko pod basen, gdzie huczą wielkie pompy i filtry wody.' },
          { speakerId: 'system', text: 'W ciemnościach dostrzegasz grupę techników przedszkolnych, którzy potajemnie instalują dziwne rury dozujące „gaz uspokajający”.' },
          { speakerId: 'player', text: 'Stójcie! Co wy robicie?! Chcecie truć niewinne dzieci dla korporacyjnego ładu?' },
          { speakerId: 'system', text: 'Technicy obracają się spłoszeni. Jeden z nich opuszcza głowę: „Nie mamy wyboru. Kierownik szantażuje nas i nasze rodziny... Jeśli odmówimy, zniszczy nas.”' }
        ],
        choices: [
          {
            id: 'ch18_talk_heart',
            text: '„Zjednoczmy się! Ochronimy was przed Kierownikiem, jeśli pomożecie nam uratować dzieci.”',
            impactFreedom: 20,
            impactOrder: -10,
            nextSceneId: 'ch18_minigame',
            consequenceText: 'Twoje słowa trafiają do ich serc. Postanawiają stawić opór instalacjom.'
          },
          {
            id: 'ch18_force_stop',
            text: '„Natychmiast wyłączcie te urządzenia! Inaczej wezwiemy policję i dyrekcję.”',
            impactFreedom: -10,
            impactOrder: 20,
            nextSceneId: 'ch18_minigame',
            consequenceText: 'Działasz zdecydowanie, zmuszając ich do uległości za pomocą rygorystycznych procedur.'
          }
        ]
      },
      ch18_minigame: {
        id: 'ch18_minigame',
        title: 'Demontaż aparatury gazowej',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zablokuj zawory dopływowe i zdemontuj nielegalne dysze instalacji gazowej, układając potężną barierę z klocków ochronnych!' }
        ],
        choices: [],
        minigameType: 'FORT',
        nextSceneIdOnMinigameWin: 'ch18_victory'
      },
      ch18_victory: {
        id: 'ch18_victory',
        title: 'Sojusz pod basenem',
        backgroundUrl: '/assets/images/pool_tunnels_1783531581796.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Niebezpieczna aparatura zostaje całkowicie rozmontowana. Zawory są zabezpieczone kłódkami.' },
          { speakerId: 'player', text: 'Udało się. Jesteście wolni od ich wpływu, a dzieci są bezpieczne.' },
          { speakerId: 'system', text: 'Technicy uśmiechają się i przekazują Ci stary pęk kluczy deweloperskich. „To pomoże wam otworzyć najgłębsze archiwa.”' }
        ],
        choices: [
          {
            id: 'ch18_finish',
            text: 'Przejdź do Rozdziału 19: Plan Kierownika',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch19_intro'
          }
        ]
      }
    }
  },
  {
    id: 19,
    title: 'Rozdział 19: Plan Kierownika',
    summary: 'Pani Amelia odnajduje dawne plany przedszkola. Odkrywacie kolejny, tajny poziom podziemi z gigantyczną mapą sieci przejść.',
    startSceneId: 'ch19_intro',
    scenes: {
      ch19_intro: {
        id: 'ch19_intro',
        title: 'Tajemnica starego pergaminu',
        backgroundUrl: '/assets/images/blueprints_bg_1783533350195.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pani Amelia wbiega do pokoju nauczycielskiego z wielką, zakurzoną tubą na projekty.' },
          { speakerId: 'amelia', text: 'Spójrzcie, co znalazłam w starej kartotece budowlanej! To pierwotne plany architektoniczne tego budynku z lat 70.' },
          { speakerId: 'player', text: 'Czekaj... Ten rysunek pokazuje podwójne ściany i cały dodatkowy, najniższy poziom podziemi pod salą gimnastyczną!' },
          { speakerId: 'amelia', text: 'Dokładnie. Kierownik stworzył tam sieć tajnych korytarzy, którymi terapeutki przemieszczają się bez wiedzy dyrekcji. Musimy ułożyć te potargane plany w całość!' }
        ],
        choices: [
          {
            id: 'ch19_solve_blueprint',
            text: 'Zrekonstruuj starą mapę podziemi przedszkola.',
            impactFreedom: 5,
            impactOrder: 15,
            nextSceneId: 'ch19_minigame'
          }
        ]
      },
      ch19_minigame: {
        id: 'ch19_minigame',
        title: 'Rekonstrukcja planów budynków',
        backgroundUrl: '/assets/images/blueprints_bg_1783533350195.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ułóż fragmenty starego planu architektonicznego, aby poznać pełną sieć tajnych korytarzy i drzwi ewakuacyjnych!' }
        ],
        choices: [],
        minigameType: 'PUZZLE',
        nextSceneIdOnMinigameWin: 'ch19_victory'
      },
      ch19_victory: {
        id: 'ch19_victory',
        title: 'Mapowanie korytarzy cieni',
        backgroundUrl: '/assets/images/blueprints_bg_1783533350195.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kawałki mapy łączą się idealnie. Przed Waszymi oczami ukazuje się pełen schemat tajnych przejść syndykatu.' },
          { speakerId: 'player', text: 'Teraz znamy każdy ich krok. Wiemy, gdzie wejść i jak ich zaskoczyć!' },
          { speakerId: 'amelia', text: 'To nasza ostateczna szansa na przejęcie inicjatywy. Czas przygotować nauczycielki do decydującego starcia!' }
        ],
        choices: [
          {
            id: 'ch19_finish',
            text: 'Przejdź do Rozdziału 20: Przed burzą',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch20_intro'
          }
        ]
      }
    }
  },
  {
    id: 20,
    title: 'Rozdział 20: Przed burzą',
    summary: 'Nauczycielki odzyskują przewagę. Dyrektorka poznaje prawdę. Kucharz, w-fista i pomocnicy stają po waszej stronie. Lecz Kierownik rozpoczyna Etap Drugi.',
    startSceneId: 'ch20_intro',
    scenes: {
      ch20_intro: {
        id: 'ch20_intro',
        title: 'Zjednoczony ruch oporu',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Stajecie razem w ogrodzie przedszkolnym: Basia, Hania, Zosia, Milena, Robert, kucharz Janek, pomocnicy oraz Dyrektorka Helena.' },
          { speakerId: 'dyrektorka', text: 'Oficjalnie zawieszam wszystkie terapeutki w obowiązkach! Nasze przedszkole znowu będzie miejscem radosnego śmiechu i dziecięcej wolności!' },
          { speakerId: 'basia', text: 'Udało się! Wygraliśmy! Asystentko, to wszystko dzięki Twojej mądrości i odwadze!' },
          { speakerId: 'system', text: 'Nagle niebo nad przedszkolem ciemnieje. Rozlega się potężny, metaliczny dźwięk, a całe przedszkole pogrąża się w absolutnej ciemności.' }
        ],
        choices: [
          {
            id: 'ch20_investigate_dark',
            text: 'Zbadaj nagły zanik zasilania i sprawdź, co się dzieje z systemem.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch20_blackout'
          }
        ]
      },
      ch20_blackout: {
        id: 'ch20_blackout',
        title: 'Ciemność i monitory',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Cisza jest porażająca. Nagle setki ekranów i interfejsów w całym przedszkolu rozświetlają się jaskrawym neonowym zielonym światłem.' },
          { speakerId: 'system', text: 'Na wszystkich monitorach miga tylko jeden, przerażający napis:' },
          { speakerId: 'system', text: '„ETAP DRUGI ROZPOCZĘTY”' },
          { speakerId: 'player', text: 'To Kierownik... Odciął całe przedszkole od świata. Chce siłą przejąć budynek za pomocą swoich zdalnych systemów rygoru!' },
          { speakerId: 'basia', text: 'Musimy rzucić wszystkie nasze siły kreatywności do głównego serwerowni, by powstrzymać ten cybernetyczny atak!' }
        ],
        choices: [
          {
            id: 'ch20_final_game',
            text: '⚔️ ROZEGRAJ OSTATECZNY POJEDYNEK DIAMENTÓW: Powstrzymaj Etap Drugi!',
            impactFreedom: 25,
            impactOrder: -25,
            nextSceneId: 'ch20_minigame'
          }
        ]
      },
      ch20_minigame: {
        id: 'ch20_minigame',
        title: 'Cyber-batalia o Tęczowy Zakątek',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Systemy obronne Kierownika wysyłają fale paraliżującego kodu. Połącz diamenty w epickie kaskady, by uratować wolność dzieci!' }
        ],
        choices: [],
        minigameType: 'DIAMOND',
        nextSceneIdOnMinigameWin: 'ch20_ending'
      },
      ch20_ending: {
        id: 'ch20_ending',
        title: 'Koniec Drugiej Kampanii',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Z potężnym rozbłyskiem tęczowych barw cyfrowa blokada pęka, ratując rdzeń energetyczny przedszkola!' },
          { speakerId: 'player', text: 'Udało się powstrzymać pierwszą falę... ale prąd wciąż nie wraca, a na horyzoncie widzimy nadjeżdżające czarne vany syndykatu.' },
          { speakerId: 'basia', text: 'Trzymajmy się razem. Bez względu na to, co nadchodzi w Etapie Drugim, nie poddamy się. Jesteśmy rodziną.' },
          { speakerId: 'system', text: 'Ciemność powoli spowija przedszkole, a dalekie syreny zwiastują nadejście prawdziwej burzy...' },
          { speakerId: 'system', text: 'KONIEC DRUGIEJ KAMPANII GRY "KOLORYDUSZEK". DZIĘKUJEMY ZA GRĘ, SEBASTIANIE!' }
        ],
        choices: [
          {
            id: 'ch20_to_ch21',
            text: '„To jeszcze nie koniec…” — Rozpocznij nowy etap gry',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch21_intro'
          }
        ]
      }
    }
  },
  {
    id: 21,
    title: 'Rozdział 21: Telefon w ciemności',
    summary: 'Ciemność spowija przedszkole. Odkrywasz, że twój telefon zyskał nową funkcję i odbiera zaszyfrowane wiadomości od Koloryduszka oraz innych postaci. Musisz zdecydować, z kim nawiążesz kontakt jako pierwszym i jak pokierujesz śledztwem w zablokowanym budynku.',
    startSceneId: 'ch21_intro',
    scenes: {
      ch21_intro: {
        id: 'ch21_intro',
        title: 'Nagle w ciemności',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Światła gasną. Słychać metaliczny trzask rygli w drzwiach wejściowych. Tęczowy Zakątek został odcięty od świata.' },
          { speakerId: 'player', text: 'Wszystko zgasło... Nawet telefony stacjonarne nie działają.' },
          { speakerId: 'basia', text: 'Asystentko! Co robimy? To naprawdę koniec?' },
          { speakerId: 'system', text: 'Nagle Twój smartfon w kieszeni wibruje, emitując silny, tęczowy blask. Na ekranie pojawia się nowa aplikacja: „System Komunikacji Koloryduszek v2.0”.' },
          { speakerId: 'player', text: 'Mój telefon... on świeci! Koloryduszek wgrał nową aplikację!' }
        ],
        choices: [
          {
            id: 'ch21_c1_phone_check',
            text: 'Odblokuj telefon i sprawdź, jakie wiadomości otrzymałaś w aplikacji.',
            impactFreedom: 5,
            impactOrder: 5,
            nextSceneId: 'ch21_phone_unlocked'
          }
        ]
      },
      ch21_phone_unlocked: {
        id: 'ch21_phone_unlocked',
        title: 'Kanały informacyjne',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Telefon wyświetla listę kontaktów oraz aktywne czaty. Masz nieprzeczytane wiadomości od Basi, Pani Calm i samego Koloryduszka.' },
          { speakerId: 'player', text: 'Niesamowite, mam dostęp do pełnej bazy danych i komunikatora! Mogę pisać z nauczycielkami i terapeutkami, a także kontrolować nasze zadania.' },
          { speakerId: 'system', text: 'Z głębi korytarza dochodzi szelest kroków. Musisz podjąć decyzję, z którą grupą zjednoczysz siły, by zbadać sytuację.' }
        ],
        choices: [
          {
            id: 'ch21_c2_go_teachers',
            text: 'Pobiegnij z Panią Basią do głównej sali nauczycielskiej (Ścieżka Wolności).',
            impactFreedom: 20,
            impactOrder: -10,
            nextSceneId: 'ch21_teachers_route',
            consequenceText: 'Wybierasz walkę ramię w ramię z Nauczycielkami. Twój wybór został zapisany.'
          },
          {
            id: 'ch21_c2_go_therapists',
            text: 'Dołącz do Pani Calm, by zabezpieczyć procedury w sterylnym gabinecie (Ścieżka Uporządkowania).',
            impactFreedom: -10,
            impactOrder: 20,
            nextSceneId: 'ch21_therapists_route',
            consequenceText: 'Wybierasz współpracę z Terapeutkami dla przywrócenia stabilności. Twój wybór został zapisany.'
          }
        ]
      },
      ch21_teachers_route: {
        id: 'ch21_teachers_route',
        title: 'Zgromadzenie ruchu oporu',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Asystentko! Dobrze, że jesteś z nami. Hania i Zosia już zbierają zapasy świeczek i kredek fluorescencyjnych.' },
          { speakerId: 'hania', text: 'Musimy utrzymać kreatywnego ducha dzieci, nawet jeśli jesteśmy zamknięci! Zbudujemy wielki lampion przyjaźni.' },
          { speakerId: 'player', text: 'Świetny pomysł. Ale musimy też uważać na kamery Kierownika. Mój telefon pokazuje, że cyber-atak na serwerownię wciąż trwa.' },
          { speakerId: 'zosia', text: 'Pokażemy im, że wolność wygra nawet w ciemności!' }
        ],
        choices: [
          {
            id: 'ch21_finish_teachers',
            text: 'Przejdź do zakończenia rozdziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch21_teaser'
          }
        ]
      },
      ch21_therapists_route: {
        id: 'ch21_therapists_route',
        title: 'Zarządzanie kryzysowe',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'calm', text: 'Witaj, asystentko. Twoja obecność tutaj to dowód wysokiej dojrzałości. Panika jest najgorszym doradcą w czasie awarii.' },
          { speakerId: 'whisper', text: 'Wszyscy musimy zachować absolutną ciszę. W ten sposób systemy dźwiękowe syndykatu nie namierzą naszego położenia.' },
          { speakerId: 'harmony', text: 'Właśnie sporządziłam plan ewakuacji z zachowaniem pełnej symetrii kroków. Każdy musi iść parami w odstępach półtora metra.' },
          { speakerId: 'player', text: 'Zgadzam się, ład to podstawa. Ale mój telefon wykrywa, że w serwerowni zachodzą podejrzane procesy.' }
        ],
        choices: [
          {
            id: 'ch21_finish_therapists',
            text: 'Przejdź do zakończenia rozdziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch21_teaser'
          }
        ]
      },
      ch21_teaser: {
        id: 'ch21_teaser',
        title: '🎬 ZAPOWIEDŹ: Rozdział 22',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: '*** SCENKA PO ROZDZIALE 21: WIZJA CUDZYCH OCZU ***' },
          { speakerId: 'system', text: 'Ciszę nocną rozrywa pisk opon czarnego vana syndykatu pod bramą przedszkola.' },
          { speakerId: 'lysy_kierownik', text: 'Zablokować wszystkie wyjścia. Nie pozwólcie asystentce dotrzeć do terminalu głównego. Jeśli złamie kody serwera, cały nasz plan dla Tęczowego Zakątka legnie w gruzach.' },
          { speakerId: 'system', text: 'Na ekranie Twojego smartfona pojawia się czerwona ikona ostrzeżenia. Rozdział 22 zbliża się wielkimi krokami...' }
        ],
        choices: [
          {
            id: 'ch21_to_ch22',
            text: 'Rozpocznij Rozdział 22: Bitwa o serwery',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch22_intro'
          }
        ]
      }
    }
  },
  {
    id: 22,
    title: 'Rozdział 22: Śledztwo w serwerowni',
    summary: 'Docieracie do serwerowni, by zresetować główne systemy. Odkrywacie ukrytą bazę danych Kierownika i stajecie przed wyborem, który zaważy na przyszłości przedszkola.',
    startSceneId: 'ch22_intro',
    scenes: {
      ch22_intro: {
        id: 'ch22_intro',
        title: 'Próg Cyfrowego Labiryntu',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Stojicie przed ciężkimi, metalowymi drzwiami serwerowni. Czerwona dioda skanera miga miarowo w ciemności.' },
          { speakerId: 'player', text: 'Drzwi są zaryglowane cyfrowo. Mój smartfon pokazuje, że potrzebujemy specjalnego klucza deszyfrującego.' },
          { speakerId: 'basia', text: 'Asystentko, spójrz na swój telefon! Koloryduszek wysłał nam schemat obejścia tego panelu!' },
          { speakerId: 'calm', text: 'Zalecam ostrożność. Jeśli wyślemy zły sygnał, system przejdzie w tryb całkowitej samozniszczalności bazy danych.' }
        ],
        choices: [
          {
            id: 'ch22_c1_bypass',
            text: 'Użyj aplikacji Koloryduszka w smartfonie, aby złamać zabezpieczenia drzwi.',
            impactFreedom: 10,
            impactOrder: 10,
            nextSceneId: 'ch22_server_inside'
          }
        ]
      },
      ch22_server_inside: {
        id: 'ch22_server_inside',
        title: 'Rdzeń Serwerowni',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Drzwi syczą i otwierają się. Wewnątrz rzędy potężnych szaf serwerowych huczą cicho, a na centralnym terminalu świeci baza danych syndykatu.' },
          { speakerId: 'player', text: 'Mamy dostęp! Widzę tu rejestr wszystkich nielegalnych operacji terapeutek oraz raporty o dzieciach.' },
          { speakerId: 'basia', text: 'Szybko, skasujmy te okropne raporty o dzieciach! Żadne dziecko nie powinno być opisywane numerami i wykresami!' },
          { speakerId: 'calm', text: 'Czekaj! Te dane są kluczowym dowodem prawnym. Musimy je zapisać i przekazać kuratorium, by raz na zawsze zamknąć syndykat zgodnie z prawem.' }
        ],
        choices: [
          {
            id: 'ch22_c2_delete',
            text: 'Skasuj wszystkie raporty i bazy danych terapeutek (Ścieżka Wolności).',
            impactFreedom: 25,
            impactOrder: -15,
            nextSceneId: 'ch22_choice_delete_scene',
            consequenceText: 'Skasowano dane syndykatu, uwalniając dzieci od etykiet. Twój wybór został zapisany.'
          },
          {
            id: 'ch22_c2_save',
            text: 'Zabezpiecz i pobierz dane jako dowód dla kuratorium (Ścieżka Uporządkowania).',
            impactFreedom: -15,
            impactOrder: 25,
            nextSceneId: 'ch22_choice_save_scene',
            consequenceText: 'Pobrano dowody prawne przeciwko syndykatowi. Twój wybór został zapisany.'
          }
        ]
      },
      ch22_choice_delete_scene: {
        id: 'ch22_choice_delete_scene',
        title: 'Cyfrowe Oczyszczenie',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ekrany gasną jeden po drugim. Baza danych Kierownika przestaje istnieć.' },
          { speakerId: 'basia', text: 'Udało się! Dzieci są wreszcie wolne od tych zimnych, cyfrowych profili!' },
          { speakerId: 'player', text: 'Tak, to prawda. Ale Kierownik na pewno dowie się, że to my.' }
        ],
        choices: [
          {
            id: 'ch22_finish_delete',
            text: 'Przejdź do zakończenia rozdziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch22_teaser'
          }
        ]
      },
      ch22_choice_save_scene: {
        id: 'ch22_choice_save_scene',
        title: 'Archiwum Sprawiedliwości',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kopiowanie danych zakończone pomyślnie. Pliki zostają zaszyfrowane w Twojej pamięci telefonu.' },
          { speakerId: 'calm', text: 'Doskonale. Mamy teraz pełne podstawy prawne, by pociągnąć Kierownika do odpowiedzialności.' },
          { speakerId: 'player', text: 'Mam tylko nadzieję, że zdążymy je wysłać zanim nas zablokuje.' }
        ],
        choices: [
          {
            id: 'ch22_finish_save',
            text: 'Przejdź do zakończenia rozdziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch22_teaser'
          }
        ]
      },
      ch22_teaser: {
        id: 'ch22_teaser',
        title: '🎬 ZAPOWIEDŹ: Rozdział 23',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: '*** SCENKA PO ROZDZIALE 22: OKO KIEROWNIKA ***' },
          { speakerId: 'system', text: 'Centralny ekran w serwerowni nagle migocze i włącza się samodzielnie.' },
          { speakerId: 'system', text: 'Pojawia się na nim mroczna sylwetka Łysego Kierownika, który patrzy na Ciebie zimnym wzrokiem.' },
          { speakerId: 'lysy_kierownik', text: 'Myśleliście, że wygraliście? Ta serwerownia była tylko przynętą. Etap Drugi dopiero wchodzi w kluczową fazę. Do zobaczenia w sali gimnastycznej...' },
          { speakerId: 'system', text: 'Sygnał gaśnie. Telefon w Twojej dłoni wibruje, a na liście zadań pojawia się nowe, przerażające powiadomienie.' }
        ],
        choices: [
          {
            id: 'ch22_to_ch23',
            text: 'Kontynuuj grę...',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch23_intro'
          }
        ]
      }
    }
  },
  {
    id: 23,
    title: 'Rozdział 23: Konfrontacja w sali gimnastycznej',
    summary: 'Kierownik zastawia pułapkę w sali gimnastycznej. Zjednoczone siły ruchu oporu muszą stawić mu czoła i raz na zawsze obronić Tęczowy Zakątek.',
    startSceneId: 'ch23_intro',
    scenes: {
      ch23_intro: {
        id: 'ch23_intro',
        title: 'Ostatni Bastion',
        backgroundUrl: '/assets/images/gym_bg_1783533335722.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wkraczacie do zaciemnionej sali gimnastycznej. Na środku stoi Łysy Kierownik we własnej osobie, otoczony sterylnymi barierami sensorycznymi.' },
          { speakerId: 'lysy_kierownik', text: 'Witajcie, buntownicy. Czas zakończyć ten żałosny festiwal chaosu. Przedszkole zostanie zreorganizowane według najwyższych standardów porządku.' },
          { speakerId: 'basia', text: 'Nigdy na to nie pozwolimy! Dzieci mają prawo do zabawy, kolorów i marzeń!' },
          { speakerId: 'calm', text: 'Nawet my, terapeutki, widzimy teraz, że pańskie metody przekroczyły granice dobra dzieci. Stajemy po stronie wolności!' },
          { speakerId: 'player', text: 'To koniec, Kierowniku. Całe przedszkole jest zjednoczone!' }
        ],
        choices: [
          {
            id: 'ch23_final_victory',
            text: 'Aktywuj ostateczną fuzję Wolności i Porządku: Moc Koloryduszka!',
            impactFreedom: 50,
            impactOrder: 50,
            nextSceneId: 'ch23_ending'
          }
        ]
      },
      ch23_ending: {
        id: 'ch23_ending',
        title: 'Świt Nowego Zakątka',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Tęczowa aura eksploduje z Twojego telefonu, rozświetlając całą salę i niszcząc bariery rygoru. Kierownik cofa się w przerażeniu, po czym znika w cieniach.' },
          { speakerId: 'system', text: 'Światła powracają. Dzieci wbiegają radosne do ogrodu, a nauczycielki i terapeutki podają sobie ręce w geście prawdziwego porozumienia.' },
          { speakerId: 'dyrektorka', text: 'Od dziś Tęczowy Zakątek będzie uczył zarówno radosnej kreacji, jak i wzajemnego szacunku. Jesteśmy wolni i zjednoczeni!' },
          { speakerId: 'system', text: 'GRATULACJE! UKOŃCZYŁEŚ PEŁNĄ KAMPANIĘ GRY KOLORYDUSZEK!' }
        ],
        choices: [
          {
            id: 'ch23_to_ch24',
            text: 'Rozpocznij Akt II: Nowy Cień...',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch24_intro'
          }
        ]
      }
    }
  },
  {
    id: 24,
    title: 'Rozdział 24: Spokój przed burzą',
    summary: 'Po wydarzeniach w sali gimnastycznej atmosfera wyraźnie się uspokaja. Dyrektorka wprowadza zmiany, personel znów rozmawia, ale terapeutki zaczynają zapraszać pojedynczych pracowników na osobiste spotkania.',
    startSceneId: 'ch24_intro',
    scenes: {
      ch24_intro: {
        id: 'ch24_intro',
        title: 'Złudny Pokój',
        backgroundUrl: '/assets/images/kindergarten_garden_1783451914603.jpg',
        dialogue: [
          { speakerId: 'player', text: 'Wszystko wydaje się wracać do normy. Nauczycielki i terapeutki rozmawiają ze sobą na korytarzu z prawdziwym uśmiechem.' },
          { speakerId: 'basia', text: 'Asystentko! Nie do wiary, ale dyrektorka zatwierdziła nasz nowy kreatywny ogródek! Pracujemy spokojnie pierwszy raz od wielu tygodni.' },
          { speakerId: 'dyrektorka', text: 'Wprowadzamy spore zmiany organizacyjne, by nikt więcej nie czuł się wykluczony. Tęczowy Zakątek odzyskał równowagę.' }
        ],
        choices: [
          {
            id: 'ch24_c1_teachers',
            text: 'Pogawędź serdecznie z nauczycielkami i zaplanujcie nowe zabawy (Wolność).',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch24_signals'
          },
          {
            id: 'ch24_c1_order',
            text: 'Zrób krótki obchód korytarza, sprawdzając czystość i regulamin sal (Uporządkowanie).',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch24_signals'
          }
        ]
      },
      ch24_signals: {
        id: 'ch24_signals',
        title: 'Sygnały w mroku',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Twoje zaufanie zostaje zachwiane. Zauważasz, że jedna z terapeutek, Pani Whisper, coraz częściej zaprasza pojedynczych pracowników do gabinetu.' },
          { speakerId: 'whisper', text: 'Janek, czy mógłbyś wejść na moment do mojego gabinetu? Chciałabym omówić z tobą pewne prywatne, służbowe sprawy w cztery oczy...' },
          { speakerId: 'kucharz', text: 'Eee... no dobrze, pani Whisper. Już idę.' },
          { speakerId: 'system', text: 'Drzwi gabinetu zamykają się z cichym, złowrogim kliknięciem.' }
        ],
        choices: [
          {
            id: 'ch24_c2_spy',
            text: 'Zbliż się cicho do drzwi i spróbuj podsłuchać rozmowę (Wolność).',
            impactFreedom: 10,
            impactOrder: 0,
            nextSceneId: 'ch24_withdrawn'
          },
          {
            id: 'ch24_c2_wait',
            text: 'Czekaj cierpliwie na korytarzu, nie wzbudzając podejrzeń (Uporządkowanie).',
            impactFreedom: 0,
            impactOrder: 10,
            nextSceneId: 'ch24_withdrawn'
          }
        ]
      },
      ch24_withdrawn: {
        id: 'ch24_withdrawn',
        title: 'Zmieniona Twarz',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Po bardzo długiej rozmowie drzwi gabinetu otwierają się i wychodzi z nich Pan Kucharz Janek.' },
          { speakerId: 'player', text: 'Panie Janku! Wszystko w porządku? O czym rozmawialiście z terapeutką?' },
          { speakerId: 'kucharz', text: 'Tak, tak... w porządku. Bezpieczeństwo higieniczne jest po prostu... najważniejsze. Musimy przestrzegać zasad.' },
          { speakerId: 'system', text: 'Janek jest wycofany, unika Twojego wzroku i spieszy się do kuchni, odmawiając jakichkolwiek dalszych wyjaśnień.' }
        ],
        choices: [
          {
            id: 'ch24_to_ch25',
            text: 'Rozpocznij Rozdział 25: Dziwne zmiany',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch25_intro'
          }
        ]
      }
    }
  },
  {
    id: 25,
    title: 'Rozdział 25: Dziwne zmiany',
    summary: 'Kolejni pracownicy przedszkola zaczynają zmieniać zachowanie i wycofywać swoje poparcie dla nauczycielek, twierdząc, że wcześniej „przesadzali”.',
    startSceneId: 'ch25_intro',
    scenes: {
      ch25_intro: {
        id: 'ch25_intro',
        title: 'Spadek Zaufania',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'player', text: 'Wchodzę do pokoju nauczycielskiego. Pani Amelia, która zawsze była duszą towarzystwa, siedzi ponuro w kącie.' },
          { speakerId: 'player', text: 'Amelio, pomożesz nam przygotować wielki plakat z tęczą dla grupy maluchów?' },
          { speakerId: 'amelia', text: 'Ja... chyba nie powinnam. Wiesz, chyba przesadzaliśmy z tą całą wolnością. Metody terapeutek chronią dzieci przed chaosem.' },
          { speakerId: 'basia', text: 'Co ty mówisz, Amelio?! Przecież jeszcze wczoraj śpiewałaś z nami piosenki!' }
        ],
        choices: [
          {
            id: 'ch25_c1_convince',
            text: 'Przekonuj Amelię, przypominając jej radość dzieci na zajęciach (Wolność).',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch25_whispers'
          },
          {
            id: 'ch25_c1_accept',
            text: 'Zaakceptuj jej słowa i zapytaj, jakie konkretne reguły uważa za słuszne (Uporządkowanie).',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch25_whispers'
          }
        ]
      },
      ch25_whispers: {
        id: 'ch25_whispers',
        title: 'Gęstniejące Szepty',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nowe, niepokojące plotki zaczynają krążyć po przedszkolu, ale nikt nie jest w stanie wskazać ich bezpośredniego źródła.' },
          { speakerId: 'basia', text: 'Ktoś rozpowiada rodzicom, że nasze kreatywne zajęcia wywołują u dzieci nadpobudliwość. To absurd!' },
          { speakerId: 'player', text: 'Spójrzcie, terapeutki znów zbierają się za zamkniętymi drzwiami gabinetu Calm.' }
        ],
        choices: [
          {
            id: 'ch25_to_ch26',
            text: 'Rozpocznij Rozdział 26: Gabinet',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch26_intro'
          }
        ]
      }
    }
  },
  {
    id: 26,
    title: 'Rozdział 26: Gabinet',
    summary: 'Śledzisz kolejną ofiarę wchodzącą do gabinetu terapeutycznego i zdobywasz przerażające, ukryte przesłanie ostrzegawcze.',
    startSceneId: 'ch26_intro',
    scenes: {
      ch26_intro: {
        id: 'ch26_intro',
        title: 'Świadek Przemiany',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Przechodzisz korytarzem i zauważasz w-fistę Roberta wchodzącego do gabinetu Pani Whisper. Rozmowa ciągnie się godzinami.' },
          { speakerId: 'player', text: 'Robert zawsze głośno walczył o sport i swobodę dzieci. Co oni z nim robią za tymi zamkniętymi drzwiami?' }
        ],
        choices: [
          {
            id: 'ch26_c1_record',
            text: 'Wyciągnij smartfon i spróbuj nagrać dyktat rozmowy przez szparę w drzwiach (Wolność).',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch26_lost'
          },
          {
            id: 'ch26_c1_note',
            text: 'Notuj godziny wejść i wyjść pracowników jako dowód proceduralny (Uporządkowanie).',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch26_lost'
          }
        ]
      },
      ch26_lost: {
        id: 'ch26_lost',
        title: 'Nie Idź Tam Sam',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Drzwi otwierają się. Robert wychodzi z gabinetu z mętnym wzrokiem i dziwnie spokojnym, monotonnym krokiem.' },
          { speakerId: 'robert', text: 'Wychowanie fizyczne musi opierać się wyłącznie na symetrycznych ćwiczeniach rygorystycznych. Radosny ruch bez schematów to niepotrzebny chaos...' },
          { speakerId: 'milena', text: 'Asystentko... Słyszałaś go? Wśród kadry zaczyna krążyć jedno kluczowe ostrzeżenie: Nie idź z nimi sam do gabinetu.' }
        ],
        choices: [
          {
            id: 'ch26_c2_search',
            text: 'Przeszukaj korytarz wokół szafek w poszukiwaniu ukrytych śladów.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch26_note'
          }
        ]
      },
      ch26_note: {
        id: 'ch26_note',
        title: 'Odnaleziona Prawda',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pod szafką Roberta zauważasz mały, porzucony i pognieciony skrawek papieru. Podnosisz go pośpiesznie i czytasz jedno zdanie:' },
          { speakerId: 'player', text: '„Najpierw izolują. Potem przekonują.”' },
          { speakerId: 'system', text: 'Twoje serce bije szybciej. To nie są zwykłe spotkania kadrowe – to systematyczna presja i psychologiczna manipulacja!' }
        ],
        choices: [
          {
            id: 'ch26_to_ch27',
            text: 'Rozpocznij Rozdział 27: Nowa liderka',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch27_intro'
          }
        ]
      }
    }
  },
  {
    id: 27,
    title: 'Rozdział 27: Nowa liderka',
    summary: 'Odkrywasz, że dotychczas milcząca terapeutka przejmuje inicjatywę i buduje własną siłę wpływu opartą na powiązaniach z byłym Kierownikiem.',
    startSceneId: 'ch27_intro',
    scenes: {
      ch27_intro: {
        id: 'ch27_intro',
        title: 'Cień Wyłania się na Scenę',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Podkradasz się pod gabinet konferencyjny. Nowa postać, terapeutka Małgorzata, przemawia niezwykle pewnym siebie, chłodnym głosem.' },
          { speakerId: 'shadow_therapist', text: 'Łysy Kierownik przegrał, bo był zbyt tchórzliwy i ostrożny. Próbował bawić się w podchody techniczne. Ja nie popełnię tego samego błędu.' },
          { speakerId: 'whisper', text: 'Zgadzam się, Małgorzato. Twoja determinacja imponuje nam o wiele bardziej niż wahanie Calm.' }
        ],
        choices: [
          {
            id: 'ch27_c1_photo',
            text: 'Zrób ukradkiem zdjęcie Małgorzacie z jej dokumentami, by mieć dowód (Wolność).',
            impactFreedom: 15,
            impactOrder: -5,
            nextSceneId: 'ch27_revelation'
          },
          {
            id: 'ch27_c1_log',
            text: 'Zapisz szczegóły jej taktyki i słów w pamięci służbowej (Uporządkowanie).',
            impactFreedom: -5,
            impactOrder: 15,
            nextSceneId: 'ch27_revelation'
          }
        ]
      },
      ch27_revelation: {
        id: 'ch27_revelation',
        title: 'Więzi z Przeszłością',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Asystentko, dowiedziałam się czegoś strasznego! Małgorzata była bliską współpracowniczką, a nawet partnerką życiową Łysego Kierownika!' },
          { speakerId: 'player', text: 'To wszystko wyjaśnia! Ona nie chce tylko pokoju, ona realizuje jego dziedzictwo z podwojoną bezwzględnością.' },
          { speakerId: 'shadow_therapist', text: 'Tęczowy Zakątek zostanie zreorganizowany. Buduję własną, niezniszczalną sieć lojalności. Krok po kroku.' }
        ],
        choices: [
          {
            id: 'ch27_to_ch28',
            text: 'Rozpocznij Rozdział 28: Podział',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch28_intro'
          }
        ]
      }
    }
  },
  {
    id: 28,
    title: 'Rozdział 28: Podział',
    summary: 'Atmosfera staje się skrajnie napięta. Korytarze przedszkola pustoszeją, a ludzie dzielą się na małe grupy, które milkną na Twój widok.',
    startSceneId: 'ch28_intro',
    scenes: {
      ch28_intro: {
        id: 'ch28_intro',
        title: 'Szepty i Frakcje',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Gdy tylko przechodzisz obok szafek, wszelkie rozmowy urywają się gwałtownie. Ludzie odwracają wzrok.' },
          { speakerId: 'player', text: 'Zaczyna się głęboki podział kadry. Niektórzy panicznie boją się kontaktu z nauczycielkami, by nie podpaść Małgorzacie.' }
        ],
        choices: [
          {
            id: 'ch28_c1_teachers',
            text: 'Zjednocz się z uciskanymi nauczycielkami, stawiając na otwarty bunt (Wolność).',
            impactFreedom: 20,
            impactOrder: -10,
            nextSceneId: 'ch28_teachers_scene'
          },
          {
            id: 'ch28_c1_therapists',
            text: 'Spróbuj zbadać powody ludzi przechodzących na stronę terapeutek, by zachować ład (Uporządkowanie).',
            impactFreedom: -10,
            impactOrder: 20,
            nextSceneId: 'ch28_therapists_scene'
          }
        ]
      },
      ch28_teachers_scene: {
        id: 'ch28_teachers_scene',
        title: 'Frakcja Wolności',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Asystentko! Dobrze, że jesteś. Tracimy ludzi. Nawet Robert i Amelia przestają z nami rozmawiać. Jesteśmy spychane do defensywy.' },
          { speakerId: 'player', text: 'Nie poddamy się. Strach to ich jedyna broń, ale my mamy prawdę i miłość dzieci.' }
        ],
        choices: [
          {
            id: 'ch28_finish_teachers',
            text: 'Przejdź do kolejnego etapu podziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch28_transition'
          }
        ]
      },
      ch28_therapists_scene: {
        id: 'ch28_therapists_scene',
        title: 'Frakcja Porządku',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'kucharz', text: 'Asystentko... Małgorzata obiecuje nam stabilność zatrudnienia i pełną ochronę przed kontrolami. Może te procedury izolacji dają nam po prostu... święty spokój?' },
          { speakerId: 'player', text: 'Spokój kupiony strachem i milczeniem to nie jest prawdziwe bezpieczeństwo.' }
        ],
        choices: [
          {
            id: 'ch28_finish_therapists',
            text: 'Przejdź do kolejnego etapu podziału',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch28_transition'
          }
        ]
      },
      ch28_transition: {
        id: 'ch28_transition',
        title: 'Cicha Wojna',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nienawiść i nieufność pęcznieją. Trudno odróżnić tych, którzy ulegli manipulacji, od tych, którzy jedynie próbują przetrwać.' }
        ],
        choices: [
          {
            id: 'ch28_to_ch29',
            text: 'Rozpocznij Rozdział 29: Wpływ',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch29_intro'
          }
        ]
      }
    }
  },
  {
    id: 29,
    title: 'Rozdział 29: Wpływ',
    summary: 'Zdobywasz pierwsze twarde dowody na manipulacyjne instrukcje perswazyjne stosowane przez nową liderkę.',
    startSceneId: 'ch29_intro',
    scenes: {
      ch29_intro: {
        id: 'ch29_intro',
        title: 'Dowody Manipulacji',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'player', text: 'Mam to! Znalazłam dokument o nazwie „Metodologia Perswazji Behawioralnej”. To podręcznik manipulacji terapeutek!' },
          { speakerId: 'basia', text: 'Mój Boże... Oni rozpisali cały algorytm: jak izolować jednostki, jak siać wątpliwości i łamać charakter!' }
        ],
        choices: [
          {
            id: 'ch29_c1_expose',
            text: 'Upowszechnij dokument i wywieś go na tablicy dla wszystkich pracowników (Wolność).',
            impactFreedom: 20,
            impactOrder: -10,
            nextSceneId: 'ch29_paranoia'
          },
          {
            id: 'ch29_c1_keep',
            text: 'Zabezpiecz dokument i użyj go jako argumentu w poufnej rozmowie z Calm (Uporządkowanie).',
            impactFreedom: -10,
            impactOrder: 20,
            nextSceneId: 'ch29_paranoia'
          }
        ]
      },
      ch29_paranoia: {
        id: 'ch29_paranoia',
        title: 'Kto Jest Kim?',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pracownicy zaczynają powtarzać identyczne, wyuczone argumenty w obronie „standardów porządku sensorycznego”.' },
          { speakerId: 'player', text: 'To paranoja. Nie wiem już, kto rozmawia ze mną szczerze, a kto tylko recytuje narzucone formułki ze strachu przed Małgorzatą.' }
        ],
        choices: [
          {
            id: 'ch29_to_ch30',
            text: 'Rozpocznij Rozdział 30: Nowy plan',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch30_intro'
          }
        ]
      }
    }
  },
  {
    id: 30,
    title: 'Rozdział 30: Nowy plan',
    summary: 'Łysy Kierownik odszedł, ale jego sieć i mroczne plany trwają. Małgorzata układa własny plan absolutnego przejęcia przedszkola.',
    startSceneId: 'ch30_intro',
    scenes: {
      ch30_intro: {
        id: 'ch30_intro',
        title: 'Druga Faza Planu',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Wpływy Łysego Kierownika przetrwały jego odejście. Pozostawił po sobie ukryte kontakty, bazy danych i tajne raporty, które Małgorzata rozwija po swojemu.' },
          { speakerId: 'player', text: 'Zabezpieczyłam ślady. Ona nie chce jedynie kontynuować jego dzieła. Chce stworzyć całkowicie własny, przerażający porządek.' }
        ],
        choices: [
          {
            id: 'ch30_c1_cabinet',
            text: 'Wejdź wieczorem do gabinetu Małgorzaty, by stawić czoła prawdzie.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch30_liderka_cabinet'
          }
        ]
      },
      ch30_liderka_cabinet: {
        id: 'ch30_liderka_cabinet',
        title: 'Rozpoczęcie Mojego Planu',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pani Małgorzata siedzi samotnie w półmroku gabinetu. Na jej biurku spoczywa zamknięta czarna teczka pozostawiona przez Łysego Kierownika.' },
          { speakerId: 'system', text: 'Kobieta patrzy na teczkę z chłodną pogardą, po czym zdecydowanym ruchem odsuwa ją na sam skraj biurka.' },
          { speakerId: 'shadow_therapist', text: 'To był jego plan. Za mało bezwzględny, oparty wyłącznie na technokratycznych procedurach... Zapomniał, jak łatwo złamać ludzką wolę od środka.' },
          { speakerId: 'shadow_therapist', text: 'Teraz zaczyna się mój plan. I nikt – zwłaszcza ta mała asystentka – nie powstrzyma nadchodzącego cienia.' },
          { speakerId: 'system', text: 'Kobieta uśmiecha się lodowato, a ekran powoli wygasza się do czerni.' },
          { speakerId: 'system', text: 'Rozpoczyna się proces systematycznego łamania woli kadry...' }
        ],
        choices: [
          {
            id: 'ch30_to_ch31',
            text: 'Rozpocznij Rozdział 31: „Powiedzieli mi, jak jest”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch31_part1'
          }
        ]
      }
    }
  },
  {
    id: 31,
    title: 'Rozdział 31: „Powiedzieli mi, jak jest”',
    summary: 'Sytuacja po odejściu Łysego wydaje się niepokojąco spokojna. Pierwsza pomoc nauczyciela zostaje wezwana na długą rozmowę do gabinetu i zaczyna powtarzać narrację terapeutek.',
    startSceneId: 'ch31_part1',
    scenes: {
      ch31_part1: {
        id: 'ch31_part1',
        title: 'CZĘŚĆ I: Czas niepokoju',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Początkowo nie dzieje się nic spektakularnego. Właśnie dlatego sytuacja w przedszkolu jest wyjątkowo niepokojąca.' },
          { speakerId: 'system', text: 'Jedna z pomocy nauczyciela (Marta) zostaje zaproszona do gabinetu terapeutek. Drzwi zamykają się na długi czas.' },
          { speakerId: 'system', text: 'Kiedy wreszcie wychodzi, zachowuje się pozornie normalnie. Następnego dnia pojawia się jednak pierwsza pęknięta rysa.' },
          { speakerId: 'pomoc_nauczyciela', text: 'Może trochę za bardzo się na nich uwzięłyście?' },
          { speakerId: 'system', text: 'Zapada głęboka cisza. Jeszcze kilka dni wcześniej ta sama osoba otwarcie krytykowała terapeutki.' },
          { speakerId: 'basia', text: 'Przecież sama mówiłaś, co robiły.' },
          { speakerId: 'pomoc_nauczyciela', text: 'Wtedy nie znałam całej sytuacji.' },
          { speakerId: 'basia', text: 'A teraz znasz?' },
          { speakerId: 'pomoc_nauczyciela', text: 'Porozmawiały ze mną.' }
        ],
        choices: [
          {
            id: 'ch31_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego i porozmawiaj z pracownikami.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch31_free_time'
          }
        ]
      },
      ch31_free_time: {
        id: 'ch31_free_time',
        title: 'CZAS SWOBODNY: Obserwacja korytarzy',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Podczas czasu swobodnego masz okazję odwiedzić kluczowe miejsca w przedszkolu i zorientować się w nastrojach.' }
        ],
        choices: [
          {
            id: 'ch31_c_corridor',
            text: 'Korytarz: Zapytaj pomoc nauczyciela o spotkanie w gabinecie.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch31_corridor'
          },
          {
            id: 'ch31_c_staffroom',
            text: 'Pokój nauczycielski: Posłuchaj rozmowy zaniepokojonych nauczycielek.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch31_staffroom'
          }
        ]
      },
      ch31_corridor: {
        id: 'ch31_corridor',
        title: 'CZAS SWOBODNY – Korytarz',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'player', text: 'Co powiedziały ci w gabinecie?' },
          { speakerId: 'pomoc_nauczyciela', text: 'Nic złego. Po prostu wszystko mi wyjaśniły.' },
          { speakerId: 'pomoc_nauczyciela', text: 'Może ty też powinieneś z nimi kiedyś spokojnie porozmawiać.' }
        ],
        choices: [
          {
            id: 'ch31_c_part2a',
            text: 'Przejdź do kolejnych wydarzeń.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch31_part2'
          }
        ]
      },
      ch31_staffroom: {
        id: 'ch31_staffroom',
        title: 'CZAS SWOBODNY – Pokój nauczycielski',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nauczycielki zastanawiają się, dlaczego zachowanie pomocy tak szybko i drastycznie się zmieniło.' },
          { speakerId: 'hania', text: 'Nie podoba mi się to.' },
          { speakerId: 'basia', text: 'Mówi dokładnie to samo, co one... Jak wyuczoną formułkę.' }
        ],
        choices: [
          {
            id: 'ch31_c_part2b',
            text: 'Przejdź do kolejnych wydarzeń.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch31_part2'
          }
        ]
      },
      ch31_part2: {
        id: 'ch31_part2',
        title: 'CZĘŚĆ II: Odsuwanie się',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pomoc nauczyciela zaczyna unikać dawnych koleżanek. Terapeutki spoglądają z satysfakcją.' },
          { speakerId: 'player', text: 'To przemyślana manipulacja. Izolują pojedyncze osoby i sączą poczucie winy.' }
        ],
        choices: [
          {
            id: 'ch31_c_home',
            text: 'Wróć po pracy do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch31_home'
          }
        ]
      },
      ch31_home: {
        id: 'ch31_home',
        title: 'DOM: Wieczorne wiadomości',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Telefon, SMS-y, pamiętnik i rozważania z mężem.' },
          { speakerId: 'player', text: 'Nie poznaję już niektórych ludzi z pracy. Dziś pomoc po rozmowie w gabinecie całkiem zmieniła zdanie.' },
          { speakerId: 'husband', text: 'To psychologiczny nacisk. Chcą osłabić pozycję nauczycielek.' },
          { speakerId: 'system', text: 'Notatka w pamiętniku: „Pierwsza osoba uległa manipulacji w gabinecie.”' }
        ],
        choices: [
          {
            id: 'ch31_to_ch32',
            text: 'Rozpocznij Rozdział 32: „Za zamkniętymi drzwiami”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch32_part1'
          }
        ]
      }
    }
  },
  {
    id: 32,
    title: 'Rozdział 32: „Za zamkniętymi drzwiami”',
    summary: 'Do gabinetu trafiają kolejne osoby: woźna, pomoc i pracownicy administracji. Każdy wychodzi ze zmienionym nastawieniem i powtarza te same słowa.',
    startSceneId: 'ch32_part1',
    scenes: {
      ch32_part1: {
        id: 'ch32_part1',
        title: 'CZĘŚĆ I: Systematyczne rozmowy',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Do gabinetu zaczynają trafiać kolejne osoby. Zawsze pojedynczo. Nigdy kilka osób jednocześnie.' },
          { speakerId: 'system', text: 'Woźna. Pomoc nauczyciela. Pracownik administracji. Rozmowy trwają bardzo długo.' },
          { speakerId: 'system', text: 'Po każdym takim spotkaniu początkowo nie dzieje się nic. Dopiero później pojawiają się zmiany.' },
          { speakerId: 'wozna', text: 'Terapeutki wcale nie są takie złe.' },
          { speakerId: 'pomoc_nauczyciela', text: 'Może nauczycielki rzeczywiście przesadzają.' },
          { speakerId: 'system', text: 'Dokładnie te same osoby wcześniej mówiły coś zupełnie przeciwnego.' }
        ],
        choices: [
          {
            id: 'ch32_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch32_free_time'
          }
        ]
      },
      ch32_free_time: {
        id: 'ch32_free_time',
        title: 'CZAS SWOBODNY: Podsłuchana rozmowa',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Przechodzisz obok gabinetu. Drzwi są lekko uchylone.' }
        ],
        choices: [
          {
            id: 'ch32_c_eavesdrop',
            text: 'Jednorazowa Scena: Podsłuchaj fragment rozmowy w gabinecie.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch32_eavesdrop'
          }
        ]
      },
      ch32_eavesdrop: {
        id: 'ch32_eavesdrop',
        title: 'CZAS SWOBODNY – Uchylone drzwi',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Słychać głos partnerki Łysego:' },
          { speakerId: 'shadow_therapist', text: 'Pomyśl, ile problemów miałaś, odkąd zaczęłaś ich słuchać.' },
          { speakerId: 'system', text: 'Cisza.' },
          { speakerId: 'shadow_therapist', text: 'My nie jesteśmy twoim wrogiem.' },
          { speakerId: 'system', text: 'Po chwili:' },
          { speakerId: 'shadow_therapist', text: 'One wykorzystują cię przeciwko nam.' },
          { speakerId: 'system', text: 'Ktoś zdecydowanie zamyka drzwi.' }
        ],
        choices: [
          {
            id: 'ch32_c_part2',
            text: 'Przejdź do części drugiej fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch32_part2'
          }
        ]
      },
      ch32_part2: {
        id: 'ch32_part2',
        title: 'CZĘŚĆ II: Świadomość presji',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nauczycielki rozumieją, że w gabinecie odbywa się zorganizowane wywieranie presji.' },
          { speakerId: 'player', text: 'One wmówią każdemu, że to nauczycielki są źródłem całego zła.' }
        ],
        choices: [
          {
            id: 'ch32_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch32_home'
          }
        ]
      },
      ch32_home: {
        id: 'ch32_home',
        title: 'DOM: Rozmowa z mamą',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Rozmowa z mamą przez SMS.' },
          { speakerId: 'player', text: 'Mamo, oni wzywają ich pojedynczo do gabinetu i przekonują, że to nauczycielki są źródłem problemów.' },
          { speakerId: 'mom', text: 'To klasyczna manipulacja, izolują człowieka, żeby nie miał oparcia w grupie.' },
          { speakerId: 'system', text: 'Wpis w pamiętniku: „Brak wsparcia w grupie sprawia, że ludzie szybko ulegają presji.”' }
        ],
        choices: [
          {
            id: 'ch32_to_ch33',
            text: 'Rozpocznij Rozdział 33: „To już nie ta sama osoba”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch33_part1'
          }
        ]
      }
    }
  },
  {
    id: 33,
    title: 'Rozdział 33: „To już nie ta sama osoba”',
    summary: 'Zmiany stają się coraz głębsze. Dawni sprzymierzeńcy całkowicie odsuwają się od nauczycielek. Partnerka Łysego widzi skuteczność swoich metod.',
    startSceneId: 'ch33_part1',
    scenes: {
      ch33_part1: {
        id: 'ch33_part1',
        title: 'CZĘŚĆ I: Odstręczenie i konfrontacja',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zmiany stają się coraz bardziej widoczne. Jedna z osób, która wcześniej była blisko nauczycielek, całkowicie się od nich odsuwa.' },
          { speakerId: 'system', text: 'Nie przychodzi już do pokoju nauczycielskiego. Nie rozmawia podczas przerw. Przestaje przekazywać informacje.' },
          { speakerId: 'basia', text: 'Co się z tobą dzieje?' },
          { speakerId: 'pomoc_nauczyciela', text: 'Ze mną? Nic.' },
          { speakerId: 'pomoc_nauczyciela', text: 'To wy powinnyście się zastanowić, co robicie.' },
          { speakerId: 'basia', text: 'Przecież byłaś przy tym wszystkim. Sama widziałaś.' },
          { speakerId: 'pomoc_nauczyciela', text: 'Teraz wiem, że widziałam tylko to, co chciałyście, żebym zobaczyła.' }
        ],
        choices: [
          {
            id: 'ch33_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch33_free_time'
          }
        ]
      },
      ch33_free_time: {
        id: 'ch33_free_time',
        title: 'CZAS SWOBODNY: Terapeutki w korytarzu',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Obserwujesz korytarz przedszkola.' }
        ],
        choices: [
          {
            id: 'ch33_c_corridor',
            text: 'Korytarz: Terapeutki obserwujące odsuwanie się pracowników.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch33_corridor'
          }
        ]
      },
      ch33_corridor: {
        id: 'ch33_corridor',
        title: 'CZAS SWOBODNY – Korytarz',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'shadow_therapist', text: 'Widzicie? Nie trzeba walczyć otwarcie. Wystarczy, że inni wykonają za nas całą pracę.' },
          { speakerId: 'calm', text: 'Społeczność sama ich wykluczy.' }
        ],
        choices: [
          {
            id: 'ch33_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch33_part2'
          }
        ]
      },
      ch33_part2: {
        id: 'ch33_part2',
        title: 'CZĘŚĆ II: Nowa taktyka',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Partnerka Łysego zaczyna rozumieć, że jej metoda działa. Nie musi atakować nauczycielek bezpośrednio. Może sprawić, żeby robili to inni.' },
          { speakerId: 'player', text: 'To przerażające, jak szybko złamali ich solidarność.' }
        ],
        choices: [
          {
            id: 'ch33_c_home',
            text: 'Wróć wieczorem do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch33_home'
          }
        ]
      },
      ch33_home: {
        id: 'ch33_home',
        title: 'DOM: Rozmowa z mężem i mamą',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'player', text: 'Nie poznaję już niektórych ludzi z pracy.' },
          { speakerId: 'husband', text: 'Dlaczego? Co się stało?' },
          { speakerId: 'player', text: 'Po tych rozmowach w gabinecie wszyscy zaczynają mówić dokładnie to samo.' },
          { speakerId: 'player', text: 'Mam wrażenie, że nauczycielki zostają całkiem same.' },
          { speakerId: 'husband', text: 'Bądź ostrożna. Pętla wokół was się zaciska.' }
        ],
        choices: [
          {
            id: 'ch33_to_ch34',
            text: 'Rozpocznij Rozdział 34: „Pierwsza rezygnacja”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch34_part1'
          }
        ]
      }
    }
  },
  {
    id: 34,
    title: 'Rozdział 34: „Pierwsza rezygnacja”',
    summary: 'Wyczerpanie psychiczne sięga zenitu. Pierwsza z nauczycielek ulega presji i składa wypowiedzenie na ręce dyrektorki.',
    startSceneId: 'ch34_part1',
    scenes: {
      ch34_part1: {
        id: 'ch34_part1',
        title: 'CZĘŚĆ I: Psychiczne wyczerpanie',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nauczycielki zaczynają być psychicznie wyczerpane. Każdy dzień oznacza kolejną konfrontację.' },
          { speakerId: 'system', text: 'Osoby, którym wcześniej ufały, zaczynają traktować je jak problem.' },
          { speakerId: 'hania', text: 'Ja już nie wiem, komu tutaj można cokolwiek powiedzieć.' },
          { speakerId: 'basia', text: 'Nikomu.' },
          { speakerId: 'system', text: 'Tego samego dnia jedna z nauczycielek prosi dyrektorkę o rozmowę. Po spotkaniu wychodzi z gabinetu z dokumentem.' },
          { speakerId: 'system', text: 'Złożyła wypowiedzenie.' },
          { speakerId: 'basia', text: 'Nie odchodź! Proszę cię!' },
          { speakerId: 'hania', text: 'Ja wiem, że właśnie tego chcą. Ale ja już nie mam siły.' }
        ],
        choices: [
          {
            id: 'ch34_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch34_free_time'
          }
        ]
      },
      ch34_free_time: {
        id: 'ch34_free_time',
        title: 'CZAS SWOBODNY: Reakcja na odejście',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Reakcja terapeutek na pierwsze wypowiedzenie.' }
        ],
        choices: [
          {
            id: 'ch34_c_therapists',
            text: 'Korytarz przy gabinecie terapeutek.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch34_therapists_scene'
          }
        ]
      },
      ch34_therapists_scene: {
        id: 'ch34_therapists_scene',
        title: 'CZAS SWOBODNY – Reakcja Terapeutek',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'calm', text: 'Bardzo nam przykro. Nigdy nie chciałyśmy, żeby ktokolwiek odchodził.' },
          { speakerId: 'system', text: 'Jednak kiedy nauczycielki odchodzą... partnerka Łysego spogląda na pozostałe terapeutki. Nie mówi nic. Wystarczy uśmiech.' }
        ],
        choices: [
          {
            id: 'ch34_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch34_part2'
          }
        ]
      },
      ch34_part2: {
        id: 'ch34_part2',
        title: 'CZĘŚĆ II: Przełamany opór',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'To pierwsze odejście rani serce pozostałych nauczycielek. Bariera oporu pękła.' },
          { speakerId: 'player', text: 'Właśnie sprawili, że pierwsza z nas się poddała.' }
        ],
        choices: [
          {
            id: 'ch34_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch34_home'
          }
        ]
      },
      ch34_home: {
        id: 'ch34_home',
        title: 'DOM: Pamiętnik i SMS-y',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Wiadomości od Basi.' },
          { speakerId: 'basia', text: '(SMS) Hania naprawdę złożyła wypowiedzenie. Zostałyśmy we dwie...' },
          { speakerId: 'player', text: '(SMS) Trzymajmy się razem. To jedyne, co nam pozostało.' },
          { speakerId: 'system', text: 'Wpis w notatniku: „Pierwsza nauczycielka odeszła z przedszkola.”' }
        ],
        choices: [
          {
            id: 'ch34_to_ch35',
            text: 'Rozpocznij Rozdział 35: „Puste krzesło”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch35_part1'
          }
        ]
      }
    }
  },
  {
    id: 35,
    title: 'Rozdział 35: „Puste krzesło”',
    summary: 'W pokoju nauczycielskim stoi pierwsze puste krzesło. Pierwsi rodzice zaczynają zadawać niepokojące pytania o zmiany w kadrze.',
    startSceneId: 'ch35_part1',
    scenes: {
      ch35_part1: {
        id: 'ch35_part1',
        title: 'CZĘŚĆ I: Symboliczna pustka',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Następnego dnia w pokoju nauczycielskim jedno krzesło pozostaje puste.' },
          { speakerId: 'system', text: 'To pierwsza naprawdę widoczna konsekwencja całej sytuacji.' },
          { speakerId: 'zosia', text: 'Dziwnie.' },
          { speakerId: 'basia', text: 'Co?' },
          { speakerId: 'zosia', text: 'Jeszcze wczoraj tutaj siedziała.' },
          { speakerId: 'system', text: 'Nikt więcej nic nie mówi.' }
        ],
        choices: [
          {
            id: 'ch35_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch35_free_time'
          }
        ]
      },
      ch35_free_time: {
        id: 'ch35_free_time',
        title: 'CZAS SWOBODNY: Pytania rodziców',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Rodzice zauważają zmianę.' }
        ],
        choices: [
          {
            id: 'ch35_c_parents',
            text: 'Szatnia: Pytania zaniepokojonej matki.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch35_parents_scene'
          }
        ]
      },
      ch35_parents_scene: {
        id: 'ch35_parents_scene',
        title: 'CZAS SWOBODNY – Szatnia',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'parent', text: 'A gdzie jest pani Hania?' },
          { speakerId: 'basia', text: 'Pani Hania już tutaj nie pracuje.' },
          { speakerId: 'parent', text: 'Przecież dzieci ją uwielbiały... Co się tutaj dzieje?' }
        ],
        choices: [
          {
            id: 'ch35_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch35_part2'
          }
        ]
      },
      ch35_part2: {
        id: 'ch35_part2',
        title: 'CZĘŚĆ II: Narastający niepokój',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pojawiają się pierwsze pytania o sytuację kadrową. Jeszcze nikt masowo nie wypisuje dzieci, ale zaczyna się niepokój.' },
          { speakerId: 'player', text: 'Zaufanie rodziców zaczyna się chwiać.' }
        ],
        choices: [
          {
            id: 'ch35_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch35_home'
          }
        ]
      },
      ch35_home: {
        id: 'ch35_home',
        title: 'DOM: Nowa plotka',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Wieczorem pojawia się nowa plotka.' },
          { speakerId: 'system', text: 'PLOTKA: „Podobno kolejna nauczycielka rozgląda się za inną pracą.”' },
          { speakerId: 'player', text: 'Zapowiada się kolejna rezygnacja...' }
        ],
        choices: [
          {
            id: 'ch35_to_ch36',
            text: 'Rozpocznij Rozdział 36: „Efekt domina”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch36_part1'
          }
        ]
      }
    }
  },
  {
    id: 36,
    title: 'Rozdział 36: „Efekt domina”',
    summary: 'Kolejna nauczycielka rozważa odejście. Terapeutki wzmagają nacisk. Pierwsza rodzina informuje o zamiarze wypisania dziecka.',
    startSceneId: 'ch36_part1',
    scenes: {
      ch36_part1: {
        id: 'ch36_part1',
        title: 'CZĘŚĆ I: Potwierdzona plotka',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Plotka okazuje się prawdziwa. Kolejna nauczycielka przyznaje, że wysłała CV.' },
          { speakerId: 'zosia', text: 'Nie wiem jeszcze, czy odejdę. Ale pierwszy raz poważnie to rozważam.' },
          { speakerId: 'system', text: 'W tym samym czasie terapeutki intensyfikują rozmowy w gabinecie. Kolejne osoby zaczynają zmieniać zachowanie.' }
        ],
        choices: [
          {
            id: 'ch36_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch36_free_time'
          }
        ]
      },
      ch36_free_time: {
        id: 'ch36_free_time',
        title: 'CZAS SWOBODNY: Starcia na korytarzu',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Korytarz przedszkola.' }
        ],
        choices: [
          {
            id: 'ch36_c_confrontation',
            text: 'Korytarz: Ważna rozmowa z pomocą nauczyciela.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch36_confrontation'
          }
        ]
      },
      ch36_confrontation: {
        id: 'ch36_confrontation',
        title: 'CZAS SWOBODNY – Korytarz (Ważna Scena)',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'pomoc_nauczyciela', text: 'Może gdybyście po prostu przestały z nimi walczyć, wszystko wróciłoby do normy.' },
          { speakerId: 'basia', text: 'Do jakiej normy?' },
          { speakerId: 'system', text: 'Cisza.' },
          { speakerId: 'basia', text: 'Do takiej, w której mamy udawać, że nic się nie dzieje?' },
          { speakerId: 'system', text: 'Pomoc nie odpowiada.' }
        ],
        choices: [
          {
            id: 'ch36_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch36_part2'
          }
        ]
      },
      ch36_part2: {
        id: 'ch36_part2',
        title: 'CZĘŚĆ II: Rezygnacje rodziców',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Pierwsza rodzina informuje, że rozważa zmianę przedszkola.' },
          { speakerId: 'parent', text: 'Za dużo tu zmian personelu. Dziecko czuje się niestabilnie.' },
          { speakerId: 'player', text: 'Efekt domina właśnie się rozpoczął.' }
        ],
        choices: [
          {
            id: 'ch36_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch36_home'
          }
        ]
      },
      ch36_home: {
        id: 'ch36_home',
        title: 'DOM: Obawy przed jutrem',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Pamiętnik i rozmowa z mężem.' },
          { speakerId: 'player', text: 'Kolejna osoba chce odejść, a rodzice powoli tracą cierpliwość.' },
          { speakerId: 'husband', text: 'To się sypie na waszych oczach.' }
        ],
        choices: [
          {
            id: 'ch36_to_ch37',
            text: 'Rozpocznij Rozdział 37: „Coraz mniej”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch37_part1'
          }
        ]
      }
    }
  },
  {
    id: 37,
    title: 'Rozdział 37: „Coraz mniej”',
    summary: 'Odchodzi kolejna nauczycielka. W salach pojawiają się zastępstwa, a rodzice wypisują pierwsze dzieci.',
    startSceneId: 'ch37_part1',
    scenes: {
      ch37_part1: {
        id: 'ch37_part1',
        title: 'CZĘŚĆ I: Faza rezygnacji',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Odchodzi kolejna nauczycielka. Tym razem wiadomość nie wywołuje już szoku. Wywołuje rezygnację.' },
          { speakerId: 'system', text: 'W salach zaczyna brakować stałych nauczycieli. Pojawiają się zastępstwa.' },
          { speakerId: 'parent', text: 'Kto jutro będzie z dziećmi? Dlaczego ciągle ktoś odchodzi? Co się tutaj właściwie dzieje?' },
          { speakerId: 'system', text: 'Pierwsze dzieci zostają officially wypisane. Na liście obecności pojawiają się puste miejsca.' }
        ],
        choices: [
          {
            id: 'ch37_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch37_free_time'
          }
        ]
      },
      ch37_free_time: {
        id: 'ch37_free_time',
        title: 'CZAS SWOBODNY: Gabinet Dyrektorki',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dyrektorka zaczyna rozumieć skalę katastrofy.' }
        ],
        choices: [
          {
            id: 'ch37_c_director',
            text: 'Gabinet Dyrektorki: Rozmowa z Dyrektorką.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch37_director_scene'
          }
        ]
      },
      ch37_director_scene: {
        id: 'ch37_director_scene',
        title: 'CZAS SWOBODNY – Gabinet Dyrektorki',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'dyrektorka', text: 'My tracimy nie tylko pracowników.' },
          { speakerId: 'system', text: 'Patrzy na listę dzieci z przekreślonymi nazwiskami.' },
          { speakerId: 'dyrektorka', text: 'Tracimy dzieci.' }
        ],
        choices: [
          {
            id: 'ch37_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch37_part2'
          }
        ]
      },
      ch37_part2: {
        id: 'ch37_part2',
        title: 'CZĘŚĆ II: Zniechęcenie',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nowe zastępstwa nie radzą sobie z prowadzeniem grup. Pustka w przedszkolu pogłębia się.' },
          { speakerId: 'player', text: 'Dyrektorka widzi, że okręt tonie, ale jest sparaliżowana.' }
        ],
        choices: [
          {
            id: 'ch37_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch37_home'
          }
        ]
      },
      ch37_home: {
        id: 'ch37_home',
        title: 'DOM: SMS-y od rodziców',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Prywatny SMS od zaniepokojonej mamy.' },
          { speakerId: 'parent', text: '(SMS) Pani Asystentko, czy to prawda, że nie ma już pani Hani i Zosi? My też chyba przepiszemy synka...' },
          { speakerId: 'player', text: '(SMS) Rozumiem Panią. Sytuacja jest bardzo trudna.' }
        ],
        choices: [
          {
            id: 'ch37_to_ch38',
            text: 'Rozpocznij Rozdział 38: „Puste sale”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch38_part1'
          }
        ]
      }
    }
  },
  {
    id: 38,
    title: 'Rozdział 38: „Puste sale”',
    summary: 'Grupy w przedszkolu są łączone z powodu masowego wypisywania dzieci. Pierwsze wątpliwości u jednej z terapeutek.',
    startSceneId: 'ch38_part1',
    scenes: {
      ch38_part1: {
        id: 'ch38_part1',
        title: 'CZĘŚĆ I: Łączenie grup',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Proces przyspiesza. Kolejne rodziny wypisują dzieci.' },
          { speakerId: 'system', text: 'Niektóre grupy trzeba połączyć.' },
          { speakerId: 'system', text: 'W miejscach, które wcześniej były pełne dzieci, pojawia się coraz więcej pustych stolików.' },
          { speakerId: 'basia', text: 'Pamiętasz, jak jeszcze niedawno zastanawiałyśmy się, gdzie dostawić dodatkowe krzesło?' },
          { speakerId: 'system', text: 'Teraz patrzy na półpustą salę.' },
          { speakerId: 'basia', text: 'Teraz możemy zabrać połowę.' }
        ],
        choices: [
          {
            id: 'ch38_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch38_free_time'
          }
        ]
      },
      ch38_free_time: {
        id: 'ch38_free_time',
        title: 'CZAS SWOBODNY: Wątpliwości w gabinecie',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nawet wśród samych terapeutek zaczynają pojawiać się pierwsze wątpliwości.' }
        ],
        choices: [
          {
            id: 'ch38_c_doubts',
            text: 'Gabinet Terapeutek: Wątpliwości jednej z nich.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch38_doubts'
          }
        ]
      },
      ch38_doubts: {
        id: 'ch38_doubts',
        title: 'CZAS SWOBODNY – Gabinet Terapeutek',
        backgroundUrl: '/assets/images/therapists_trio_1783451898546.jpg',
        dialogue: [
          { speakerId: 'harmony', text: 'A jeżeli wszyscy naprawdę odejdą?' },
          { speakerId: 'shadow_therapist', text: 'Nie odejdą wszyscy.' },
          { speakerId: 'system', text: 'Partnerka Łysego nadal uważa, że sytuacja jest pod kontrolą.' }
        ],
        choices: [
          {
            id: 'ch38_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch38_part2'
          }
        ]
      },
      ch38_part2: {
        id: 'ch38_part2',
        title: 'CZĘŚĆ II: Pustka i chłód',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Salom brakuje dawnej energii. Cicha pustka wywołuje dreszcze.' },
          { speakerId: 'player', text: 'To nie jest już przedszkole. To sterylne cmentarzysko dziecięcych marzeń.' }
        ],
        choices: [
          {
            id: 'ch38_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch38_home'
          }
        ]
      },
      ch38_home: {
        id: 'ch38_home',
        title: 'DOM: Rozmowa z mamą',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Rozmowa telefoniczna z mamą.' },
          { speakerId: 'player', text: 'Łączą grupy, bo puste sale są przygnębiające...' },
          { speakerId: 'mom', text: 'To straszne, co tam się dzieje. Może czas poszukać bezpieczniejszego miejsca?' }
        ],
        choices: [
          {
            id: 'ch38_to_ch39',
            text: 'Rozpocznij Rozdział 39: „Ostatnie”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch39_part1'
          }
        ]
      }
    }
  },
  {
    id: 39,
    title: 'Rozdział 39: „Ostatnie”',
    summary: 'Nieliczne pozostałe nauczycielki są wyczerpane. Prowadzą dramatyczną rozmowę, a wieczorem zapada ostateczna decyzja.',
    startSceneId: 'ch39_part1',
    scenes: {
      ch39_part1: {
        id: 'ch39_part1',
        title: 'CZĘŚĆ I: Patrząc na umieranie',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zostało już bardzo niewiele nauczycielek. Są wyczerpane.' },
          { speakerId: 'basia', text: 'My już nie ratujemy tego miejsca.' },
          { speakerId: 'basia', text: 'My tylko patrzymy, jak ono umiera.' },
          { speakerId: 'system', text: 'Dyrektorka próbuje znaleźć nowych pracowników. Bezskutecznie.' },
          { speakerId: 'system', text: 'Informacje o problemach placówki zaczynają krążyć również poza nią. Rodzice nadal wypisują dzieci.' }
        ],
        choices: [
          {
            id: 'ch39_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch39_free_time'
          }
        ]
      },
      ch39_free_time: {
        id: 'ch39_free_time',
        title: 'CZAS SWOBODNY: Emocjonalne starcie',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ostatnie nauczycielki prowadzą bardzo emocjonalną rozmowę.' }
        ],
        choices: [
          {
            id: 'ch39_c_teachers',
            text: 'Pokój nauczycielski: Rozmowa Ostatnich Nauczycielek.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch39_teachers_convo'
          }
        ]
      },
      ch39_teachers_convo: {
        id: 'ch39_teachers_convo',
        title: 'CZAS SWOBODNY – Pokój nauczycielski',
        backgroundUrl: '/assets/images/teachers_trio_1783451887451.jpg',
        dialogue: [
          { speakerId: 'zosia', text: 'Jeżeli zostanę, niczego już nie zmienię.' },
          { speakerId: 'basia', text: 'A jeżeli odejdziemy wszystkie?' },
          { speakerId: 'system', text: 'Cisza.' },
          { speakerId: 'basia', text: 'To przedszkole może się zamknąć.' },
          { speakerId: 'zosia', text: 'Może już się zamknęło. Tylko jeszcze nikt nie zgasił światła.' }
        ],
        choices: [
          {
            id: 'ch39_c_part2',
            text: 'Przejdź do drugiej części fabuły.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch39_part2'
          }
        ]
      },
      ch39_part2: {
        id: 'ch39_part2',
        title: 'CZĘŚĆ II: Cisza przed burzą',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Ostatnie godziny pracy w tym składzie.' },
          { speakerId: 'player', text: 'Został nam ostatni krok.' }
        ],
        choices: [
          {
            id: 'ch39_c_home',
            text: 'Wróć do domu.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch39_home'
          }
        ]
      },
      ch39_home: {
        id: 'ch39_home',
        title: 'DOM: Decydujący SMS',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'DOM: Bohater otrzymuje wieczorem SMS-a:' },
          { speakerId: 'basia', text: '„Jutro składamy wypowiedzenia.”' },
          { speakerId: 'player', text: 'Jutro nastąpi koniec.' }
        ],
        choices: [
          {
            id: 'ch39_to_ch40',
            text: 'Rozpocznij Rozdział 40: „Ostatni dzień”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_part1'
          }
        ]
      }
    }
  },
  {
    id: 40,
    title: 'Rozdział 40: „Ostatni dzień”',
    summary: 'Ostatnie nauczycielki składają wypowiedzenia. Przedszkole Kolory Duszek zostaje opuszczone i zamknięte. Tajemniczy telefon w ostatniej scenie.',
    startSceneId: 'ch40_part1',
    scenes: {
      ch40_part1: {
        id: 'ch40_part1',
        title: 'CZĘŚĆ I: Złożenie wypowiedzeń',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Rano atmosfera jest zupełnie inna. Nie ma już wielkich kłótni. Nie ma krzyków. Jest cisza.' },
          { speakerId: 'system', text: 'Ostatnie nauczycielki przychodzą do pracy. Każda wie, co za chwilę nastąpi.' },
          { speakerId: 'system', text: 'Idą razem do gabinetu dyrektorki. Składają wypowiedzenia.' },
          { speakerId: 'dyrektorka', text: 'Jeżeli wy odejdziecie...' },
          { speakerId: 'basia', text: 'My już nie możemy tutaj zostać.' }
        ],
        choices: [
          {
            id: 'ch40_c1_freetime',
            text: 'Przejdź do Czasu Swobodnego (Pożegnanie).',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_free_time'
          }
        ]
      },
      ch40_free_time: {
        id: 'ch40_free_time',
        title: 'CZAS SWOBODNY: Ostatnie pakowanie',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Nauczycielki pakują swoje rzeczy.' }
        ],
        choices: [
          {
            id: 'ch40_c_farewell',
            text: 'Ostatni marsz korytarzem i pakowanie szafek.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_farewell'
          }
        ]
      },
      ch40_farewell: {
        id: 'ch40_farewell',
        title: 'POŻEGNANIE: Pakowanie i korytarze',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Zdejmują zdjęcia ze ścian. Zabierają kubki. Opróżniają szafki.' },
          { speakerId: 'system', text: 'Przechodzą ostatni raz przez korytarz. Niektóre dzieci żegnają swoje nauczycielki.' },
          { speakerId: 'system', text: 'Rodzice dowiadują się o sytuacji. W kolejnych dniach następuje fala wypisywania dzieci.' }
        ],
        choices: [
          {
            id: 'ch40_c_director',
            text: 'Gabinet Dyrektorki: Ostatnie spojrzenie na pustkę.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_director_scene'
          }
        ]
      },
      ch40_director_scene: {
        id: 'ch40_director_scene',
        title: 'DYREKTORKA: Samotność w gabinecie',
        backgroundUrl: '/assets/images/director_portrait_1783533268563.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Dyrektorka siedzi sama w gabinecie. Przed nią leżą:' },
          { speakerId: 'system', text: '• wypowiedzenia nauczycielek' },
          { speakerId: 'system', text: '• lista dzieci' },
          { speakerId: 'system', text: '• kolejne rezygnacje rodziców' },
          { speakerId: 'system', text: '• dokumenty finansowe' },
          { speakerId: 'dyrektorka', text: 'Wie już, że placówka nie jest w stanie dalej normalnie funkcjonować.' }
        ],
        choices: [
          {
            id: 'ch40_c_part2',
            text: 'Przejdź do ostatecznego upadku przedszkola.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_part2'
          }
        ]
      },
      ch40_part2: {
        id: 'ch40_part2',
        title: 'CZĘŚĆ II: UPADEK KOLORÓW DUSZEK',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Kilka dni później.' },
          { speakerId: 'system', text: 'Pusty korytarz. Puste sale. Pozostawione zabawki.' },
          { speakerId: 'system', text: 'Krzesła stoją na stolikach. Światła w kolejnych pomieszczeniach gasną.' },
          { speakerId: 'system', text: 'Na końcu widzimy wejście do: PRZEDSZKOLA KOLORY DUSZEK.' },
          { speakerId: 'system', text: 'Drzwi zostają zamknięte.' }
        ],
        choices: [
          {
            id: 'ch40_c_final',
            text: 'Zobacz Ostatnią Scenę przed budynkiem.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch40_final'
          }
        ]
      },
      ch40_final: {
        id: 'ch40_final',
        title: 'OSTATNIA SCENA – Tajemniczy Telefon',
        backgroundUrl: '/assets/images/dark_kinder_bg_1783533364360.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Partnerka Łysego stoi przed pustym budynkiem.' },
          { speakerId: 'system', text: 'Powinna wyglądać na zwyciężczynię. Ale po raz pierwszy nie wygląda na zadowoloną.' },
          { speakerId: 'harmony', text: 'I co teraz?' },
          { speakerId: 'system', text: 'Partnerka Łysego patrzy na zamknięte drzwi. Nie odpowiada.' },
          { speakerId: 'system', text: 'Telefon w jej kieszeni zaczyna dzwonić.' },
          { speakerId: 'system', text: 'Wyciąga go. Na ekranie widnieje: NUMER PRYWATNY.' },
          { speakerId: 'shadow_therapist', text: 'Halo?' },
          { speakerId: 'system', text: 'Cisza.' },
          { speakerId: 'system', text: 'Jej twarz nagle się zmienia.' },
          { speakerId: 'system', text: 'Ekran gaśnie.' },
          { speakerId: 'system', text: '*** KONIEC AKTU II ***' }
        ],
        choices: [
          {
            id: 'ch40_to_ch41',
            text: 'Rozpocznij Rozdział 41: „Poza Murami”',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch41_intro'
          }
        ]
      }
    }
  },
  {
    id: 41,
    title: 'Rozdział 41: Poza Murami',
    summary: 'Dwa tygodnie po opieczętowaniu drzwi Tęczowego Zakątka bohaterka spotyka się w kawiarni z byłą koleżanką z pracy. Razem rozmawiają o losach kadry i dzieci, analizują zniknięcie Małgorzaty i tworzą Pamiętnik Po Upadku.',
    startSceneId: 'ch41_intro',
    scenes: {
      ch41_intro: {
        id: 'ch41_intro',
        title: 'Spotkanie w Kawiarni Poza Murami',
        backgroundUrl: '/assets/images/home_cozy_bg_1783673202781.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Mijają dwa tygodnie od opieczętowania drzwi przedszkola Tęczowy Zakątek.' },
          { speakerId: 'system', text: 'Siedzisz w kameralnej kawiarni kawiarnianej „Kawa i Kolory” na obrzeżach parku. Zapach świeżo palonej kawy miesza się ze słodko-gorzkimi wspomnieniami.' },
          { speakerId: 'basia', text: 'Dziękuję, że przyszłaś... Wciąż czuję się dziwnie, kiedy budzę się rano i nie słyszę hałasu dzieci z korytarza.' },
          { speakerId: 'player', text: 'Ja też powoli oswajam tę ciszę, Pani Basiu. Ale przynajmniej uwolniłyśmy się od manipulacji Małgorzaty i terapeutek.' },
          { speakerId: 'basia', text: 'To prawda. Ale martwi mnie, co stało się z całą naszą kadrą i maluchami... I co robią te, które zniknęły w cieniu po zamknięciu.' }
        ],
        choices: [
          {
            id: 'ch41_c1_colleagues',
            text: 'Zapytaj o losy nauczycielek i dawnych współpracowników.',
            impactFreedom: 5,
            impactOrder: 0,
            nextSceneId: 'ch41_colleagues'
          },
          {
            id: 'ch41_c1_therapists',
            text: 'Porusz temat Małgorzaty i dalszych ruchów terapeutek.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch41_therapists'
          },
          {
            id: 'ch41_c1_journal',
            text: 'Wyciągnij i zaprezentuj „Pamiętnik Po Upadku”.',
            impactFreedom: 5,
            impactOrder: 5,
            nextSceneId: 'ch41_journal_intro'
          }
        ]
      },
      ch41_colleagues: {
        id: 'ch41_colleagues',
        title: 'Rozproszona Kadra',
        backgroundUrl: '/assets/images/home_cozy_bg_1783673202781.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Hania znalazła miejsce w przedszkolu na Słonecznym Osiedlu. Prowadzi tam zajęcia plastyczne i reaktywowała teatr pacynkowy.' },
          { speakerId: 'basia', text: 'Zosia na razie odpoczywa. Presja ze strony gabinetu Małgorzaty wywołała u niej spore załamanie, ale z każdym dniem wraca do sił.' },
          { speakerId: 'player', text: 'A maluchy? Rodzice musieli przenieść je w trybie pilnym...' },
          { speakerId: 'basia', text: 'Większość trafiła do bezpieczniejszych placówek. Tęsknią za dawną salą i koloryduszkiem, ale są wolne od wyciszaczy.' }
        ],
        choices: [
          {
            id: 'ch41_c2_to_therapists',
            text: 'Zapytaj teraz o tajemnicze działania Małgorzaty.',
            impactFreedom: 0,
            impactOrder: 5,
            nextSceneId: 'ch41_therapists'
          },
          {
            id: 'ch41_c2_to_journal',
            text: 'Otwórz Pamiętnik Po Upadku i uporządkuj te informacje.',
            impactFreedom: 5,
            impactOrder: 5,
            nextSceneId: 'ch41_journal_intro'
          }
        ]
      },
      ch41_therapists: {
        id: 'ch41_therapists',
        title: 'Cień Zakonu Porządku',
        backgroundUrl: '/assets/images/control_center_1783531596202.jpg',
        dialogue: [
          { speakerId: 'basia', text: 'Dyrektorka Helena całkowicie odsunęła się od spraw oświatowych. Ale widziałam Panią Calm i Małgorzatę kilka dni temu pod nowym biurowcem.' },
          { speakerId: 'player', text: 'Ten tajemniczy telefon od prywatnego numeru pod budynkiem... Zakon Porządku nie zniknął. On zmienia strukturę i szuka nowej placówki.' },
          { speakerId: 'basia', text: 'Masz rację. Musimy być czujne. Jeśli spróbują wdrożyć ten reżim gdzie indziej, będziemy gotowe pokazać prawdę.' }
        ],
        choices: [
          {
            id: 'ch41_c3_to_journal',
            text: 'Przejdź do opracowania Pamiętnika Po Upadku.',
            impactFreedom: 5,
            impactOrder: 5,
            nextSceneId: 'ch41_journal_intro'
          }
        ]
      },
      ch41_journal_intro: {
        id: 'ch41_journal_intro',
        title: 'MECHANIKA: PAMIĘTNIK PO UPADKU',
        backgroundUrl: '/assets/images/home_cozy_bg_1783673202781.jpg',
        dialogue: [
          { speakerId: 'system', text: '✨ ODBLOKOWANO NOWĄ MECHANIKĘ: „PAMIĘTNIK PO UPADKU”!' },
          { speakerId: 'system', text: 'Bohaterka wyciąga elegancki, skórzany notatnik. Od teraz możesz w nim przeglądać bilans ideologiczny, losy kadry i tworzyć własne wpisy.' },
          { speakerId: 'player', text: 'Ten Pamiętnik Po Upadku będzie naszą kroniką. Zapiszę w nim najważniejsze wnioski z Dnia Kolorów i oporu przeciw Małgorzacie.' },
          { speakerId: 'basia', text: 'Wspaniały pomysł! Wybierz myśl, która najlepiej podsumowuje nasze doświadczenia.' }
        ],
        choices: [
          {
            id: 'ch41_journal_choice_freedom',
            text: 'Wpis: Wolność twórcza dzieci jest wartością, której nikt nie zdoła zniszczyć.',
            impactFreedom: 10,
            impactOrder: 0,
            gainItem: 'Pamiętnik Po Upadku',
            consequenceText: '📖 Zapisano w Pamiętniku: Manifest Wolności!',
            nextSceneId: 'ch41_summary'
          },
          {
            id: 'ch41_journal_choice_order',
            text: 'Wpis: Zdrowy ład i dyscyplina są potrzebne, ale nie mogą stać się narzędziem niewoli.',
            impactFreedom: 0,
            impactOrder: 10,
            gainItem: 'Pamiętnik Po Upadku',
            consequenceText: '📖 Zapisano w Pamiętniku: Zasada Zrównoważonego Ładu!',
            nextSceneId: 'ch41_summary'
          },
          {
            id: 'ch41_journal_choice_vigilance',
            text: 'Wpis: Będziemy cichymi strażnikami. Jeśli Zakon Porządku powróci, będziemy gotowe.',
            impactFreedom: 5,
            impactOrder: 5,
            gainItem: 'Pamiętnik Po Upadku',
            consequenceText: '📖 Zapisano w Pamiętniku: Przysięga Wiecznej Czujności!',
            nextSceneId: 'ch41_summary'
          }
        ]
      },
      ch41_summary: {
        id: 'ch41_summary',
        title: 'Podsumowanie w Kawiarni',
        backgroundUrl: '/assets/images/home_cozy_bg_1783673202781.jpg',
        dialogue: [
          { speakerId: 'system', text: 'Twój wpis został trwale zapisany w Pamiętniku Po Upadku. Dostęp do niego masz zawsze w górnym panelu gry oraz aplikacji w telefonie.' },
          { speakerId: 'basia', text: 'Kawa wypita, ale mam poczucie, że to dopiero początek nowej drogi. Bez względu na wszystko, zyskałyśmy siłę i przyjaźń.' },
          { speakerId: 'player', text: 'Dziękuję za to spotkanie, Pani Basiu. Będziemy w kontakcie. Przedszkole zamknięto, ale nasza misja trwa nadal.' },
          { speakerId: 'system', text: 'Zamykasz Pamiętnik Po Upadku i wychodzicie razem z kawiarni na słoneczną aleję parku.' }
        ],
        choices: [
          {
            id: 'ch41_finish',
            text: 'Zakończ spotkanie w kawiarni i domknij Rozdział 41.',
            impactFreedom: 0,
            impactOrder: 0,
            nextSceneId: 'ch41_epilogue'
          }
        ]
      },
      ch41_epilogue: {
        id: 'ch41_epilogue',
        title: 'ZAKOŃCZENIE ROZDZIAŁU 41',
        backgroundUrl: '/assets/images/home_cozy_bg_1783673202781.jpg',
        dialogue: [
          { speakerId: 'system', text: '🎉 Ukończyłeś Rozdział 41: „Poza Murami” oraz odblokowałeś w pełni mechanikę „Pamiętnik Po Upadku”!' },
          { speakerId: 'system', text: 'Możesz teraz swobodnie przeglądać Pamiętnik Po Upadku, dopisywać własne notatki i śledzić losy bohaterów po upadku Tęczowego Zakątka.' }
        ],
        choices: []
      }
    }
  }
];

