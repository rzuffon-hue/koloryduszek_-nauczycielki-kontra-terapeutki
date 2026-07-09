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
        choices: []
      }
    }
  }
];
