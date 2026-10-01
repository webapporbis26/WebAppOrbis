import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import showcaseNazareth from "@/assets/showcase-nazareth.webp";
import showcaseBestchoice from "@/assets/showcase-bestchoice.webp";
import showcaseDreamweaver from "@/assets/showcase-dreamweaver.webp";
import showcaseMallusmart from "@/assets/showcase-mallusmart.png";
import showcaseDenahalaya from "@/assets/showcase-denahalaya.png";
import showcaseChandys from "@/assets/showcase-chandys.png";
import showcaseNazarethM from "@/assets/showcase-nazareth-m.jpg";
import showcaseBestchoiceM from "@/assets/showcase-bestchoice-m.jpg";
import showcaseDreamweaverM from "@/assets/showcase-dreamweaver-m.jpg";
import showcaseMallusmartM from "@/assets/showcase-mallusmart-m.jpg";
import showcaseDenahalayaM from "@/assets/showcase-denahalaya-m.jpg";
import showcaseChandysM from "@/assets/showcase-chandys-m.jpg";

const SLIDES = [
  { img: showcaseNazareth, imgM: showcaseNazarethM, alt: "Nazareth Candles website showcase" },
  { img: showcaseBestchoice, imgM: showcaseBestchoiceM, alt: "Bestchoice Contracting website showcase" },
  { img: showcaseDreamweaver, imgM: showcaseDreamweaverM, alt: "Dream Weaver Events website showcase" },
  { img: showcaseMallusmart, imgM: showcaseMallusmartM, alt: "Mallu's Mart eCommerce website showcase" },
  { img: showcaseDenahalaya, imgM: showcaseDenahalayaM, alt: "Denahalaya website showcase" },
  { img: showcaseChandys, imgM: showcaseChandysM, alt: "Chandy's Hotels and Resorts website showcase" },
];

export function PortfolioHeroSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIdx((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      className="relative pt-36 sm:pt-44 overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[520px] sm:min-h-[560px] flex items-center">
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div
            key={s.alt}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === idx ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
            aria-hidden={i !== idx}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={s.imgM} />
              <img
                src={s.img}
                alt={s.alt}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </picture>
          </div>
        ))}

        {/* Light scrim on the left for text readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-white via-white/85 to-white/5 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 z-[2] bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />

        {/* Text content */}
        <div className="relative z-[3] mx-auto w-full max-w-[1400px] px-5 sm:px-8 pb-16">
          <div data-fade className="max-w-xl">
            <div className="w-12 h-[3px] bg-blue-600 mb-5" />
            <h1 className="leading-[0.95] mb-6">
              <span className="block text-5xl sm:text-6xl md:text-[76px] font-light text-slate-400 tracking-tight uppercase">Our</span>
              <span className="block text-7xl sm:text-8xl md:text-[110px] font-black tracking-tight uppercase bg-gradient-to-r from-[#0a2472] via-[#1e40af] to-[#2563eb] bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-slate-500 text-[17px] sm:text-lg leading-[1.7] max-w-md">
              Turning vision into reality with a portfolio of our completed digital projects.
            </p>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute z-[4] left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow-lg grid place-items-center text-slate-700 hover:bg-white hover:scale-105 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute z-[4] right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 shadow-lg grid place-items-center text-slate-700 hover:bg-white hover:scale-105 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute z-[4] bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.alt}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
