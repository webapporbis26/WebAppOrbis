import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const logoModules = import.meta.glob("@/assets/MBWS clients/*.{png,jpg,jpeg,webp}", { eager: true });
const LOGOS = Object.values(logoModules).map((mod: any) => mod.default);

type LogoCloudProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  subtitle?: string;
  limit?: number;
};

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function LogoCloud({ className, title, subtitle, limit = 12, ...props }: LogoCloudProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const perView = isMobile ? 2 : 5;
  const slides = chunk(LOGOS.slice(0, limit), perView);

  useEffect(() => {
    setCurrent(0);
  }, [perView, limit]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slides.length]);

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

        <div className="relative w-full mt-2">
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((group, si) => (
                <div
                  key={si}
                  className="flex-none w-full grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 px-1"
                >
                  {group.map((logoUrl, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center bg-white dark:bg-card rounded-2xl border border-border/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-4 h-20 sm:h-24"
                    >
                      <img
                        src={logoUrl}
                        alt={`Client logo ${si * perView + i + 1}`}
                        className="max-h-12 sm:max-h-14 max-w-[85%] object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
