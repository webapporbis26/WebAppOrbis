import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import showcaseNazareth from "@/assets/showcase-nazareth.webp";
import showcaseBestchoice from "@/assets/showcase-bestchoice.webp";
import showcaseDreamweaver from "@/assets/showcase-dreamweaver.webp";
import showcaseMallusmart from "@/assets/showcase-mallusmart.png";
import showcaseDenahalaya from "@/assets/showcase-denahalaya.png";

const slides = [
  { img: showcaseNazareth, alt: "Nazareth Candles website showcase" },
  { img: showcaseBestchoice, alt: "Bestchoice Contracting website showcase" },
  { img: showcaseDreamweaver, alt: "Dream Weaver Events website showcase" },
  { img: showcaseMallusmart, alt: "Mallu's Mart eCommerce website showcase" },
  { img: showcaseDenahalaya, alt: "Denahalaya Psycho-Spiritual Institute website showcase" },
];

export function FeaturedShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      className="relative py-10 sm:py-14 bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="text-center mb-8 sm:mb-10" data-fade>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">
              Featured Projects
            </span>
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            Client Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A closer look at some of the digital experiences we&apos;ve crafted.
          </p>
        </div>

        <div data-fade className="relative rounded-[24px] overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="w-full shrink-0">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-auto select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-slate-800" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-slate-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
