import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, HelpCircle } from 'lucide-react';

const HINTS = [
  "Kucharka pani Melisa parzy specjalną melisę sensoryczną, która potrafi uspokoić nawet najbardziej rozbrykanego duszka.",
  "Łysy Kierownik nie lubi, gdy ktoś biega po korytarzach bez ważnego identyfikatora duszka.",
  "Pani Basia słynie ze swojej żelaznej dyscypliny, ale w głębi duszy troszczy się o każdego malucha.",
  "Pani Hania zawsze nosi w kieszeni zapasowe naklejki z uśmiechniętym słoneczkiem dla grzecznych dzieci.",
  "Przedszkolny Wężyk porusza się najsprawniej, gdy nie wpada na ściany ani szafki.",
  "Zasada pięciu sekund w przedszkolnej stołówce nie obowiązuje w obecności pani salowej.",
  "Kącik wyciszenia to idealne miejsce na schowanie się przed dodatkowymi zajęciami z rytmiki.",
  "Plac zabaw skrywa tajemnicę zakopanej kapsuły czasu z roku 2012. Podobno jest tam złoty brokat i stare żetony.",
  "Szeptane rozmowy w pokoju nauczycielskim często dotyczą tajemniczego zniknięcia czwartkowego budyniu waniliowego.",
  "Szatnia to prawdziwy trójkąt bermudzki dla lewych kapci. Zawsze w tajemniczy sposób ginie tylko jeden.",
  "Zajęcia z rytmiki to ulubiony czas dla zwolenników Frakcji Wolności. Można tam legalnie i głośno hałasować!",
  "Podczas leżakowania najlepiej zamknąć oczy – unikniesz wtedy dociekliwego wzroku pani wychowawczyni.",
  "Jeśli zbierzesz odpowiednią liczbę dzieci w wężyku, otworzą się tajne drzwi do kolejnej sali.",
  "Niebieskie diamenty i złote gwiazdki w grze Wężyk dają znacznie więcej punktów niż zwykłe duszki!",
  "Frakcja Ładu preferuje idealnie ułożone klocki, podczas gdy Frakcja Wolności woli bento-wieże chaosu.",
  "Zosia jest bardzo cicha, ale jej rysunki zdają się przewidywać przyszłość przedszkolnych wydarzeń..."
];

export default function WskazowkaPrzedszkolna() {
  const [currentHint, setCurrentHint] = useState("");

  useEffect(() => {
    // Select a random hint when component mounts
    const randomIndex = Math.floor(Math.random() * HINTS.length);
    setCurrentHint(HINTS[randomIndex]);
  }, []);

  return (
    <div id="wskazowka-przedszkolna" className="w-full max-w-md mx-auto bg-black/60 border border-[#ffdfa0]/20 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md text-center space-y-3">
      <div className="flex items-center justify-center gap-1.5 text-[#ffdfa0] text-[10px] md:text-xs font-black uppercase tracking-widest font-mono">
        <BookOpen className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Wskazówka przedszkolna</span>
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-bounce" />
      </div>
      
      <p className="text-xs md:text-sm text-slate-200 leading-relaxed italic px-2 font-medium">
        "{currentHint}"
      </p>

      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#ffdfa0]/40 to-transparent mx-auto" />
    </div>
  );
}
