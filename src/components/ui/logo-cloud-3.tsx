import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const logoModules = import.meta.glob("@/assets/MBWS clients/*.{png,jpg,jpeg,webp}", { eager: true });
const LOGOS = Object.values(logoModules).map((mod: any) => mod.default);

type LogoCloudProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  subtitle?: string;
  limit?: number;
};

export function LogoCloud({ className, title, subtitle, limit = 12, ...props }: LogoCloudProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "w-full",
        title ? "py-1 bg-muted/20 dark:bg-muted/5" : "py-1",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header Section (Only if title is provided) */}
        {title && (
          <div className="text-center mb-4 sm:mb-4">
            <h2 className="text-display text-2xl sm:text-3xl lg:text-[2.25rem] font-light text-foreground mb-2 leading-tight tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto font-medium">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative w-full group/logos mt-2">
          {/* Mobile Swipe Container (Snap scrolling) */}
          <div className="md:hidden relative w-full">
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-none pb-4 px-4 -mx-4 w-[calc(100%+2rem)]"
            >
              {LOGOS.map((logoUrl, i) => (
                <div 
                  key={i} 
                  className="flex-none w-[160px] snap-center flex items-center justify-center bg-white dark:bg-card rounded-2xl border border-border/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-4 h-20"
                >
                  <img
                    src={logoUrl}
                    alt={`Client logo ${i + 1}`}
                    className="max-h-12 max-w-[85%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Auto-scrolling Marquee */}
          <div className="hidden md:flex relative w-full flex-col items-center justify-center overflow-hidden py-2">
            <div className="flex w-full group overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:160s]">
              <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                {[...Array(4)].map((_, setIdx) => (
                  LOGOS.map((logoUrl, i) => (
                    <div 
                      key={`${setIdx}-${i}`} 
                      className="flex items-center justify-center bg-white dark:bg-card rounded-2xl border border-border/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-4 w-36 h-20 shrink-0 hover:bg-slate-50 transition-colors"
                    >
                      <img
                        src={logoUrl}
                        alt={`Client logo ${i + 1}`}
                        className="max-h-12 max-w-[85%] object-contain"
                      />
                    </div>
                  ))
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/6 bg-gradient-to-r from-background md:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/6 bg-gradient-to-l from-background md:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
