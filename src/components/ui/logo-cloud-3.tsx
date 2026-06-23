import { useState } from "react";
import { cn } from "@/lib/utils";

const logoModules = import.meta.glob("@/assets/MBWS clients/*.{png,jpg,jpeg,webp}", { eager: true });
const LOGOS = Object.values(logoModules).map((mod: any) => mod.default);

type LogoCloudProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  subtitle?: string;
  limit?: number;
};

export function LogoCloud({ className, title, subtitle, limit = 12, ...props }: LogoCloudProps) {
  const [expanded, setExpanded] = useState(false);

  const displayLogos = expanded ? LOGOS : LOGOS.slice(0, limit);

  return (
    <div
      className={cn(
        "w-full",
        title ? "py-12 bg-muted/20 dark:bg-muted/5" : "py-4",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header Section (Only if title is provided) */}
        {title && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[2.5rem] font-light text-foreground mb-3 leading-tight tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto font-medium">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid Section */}
        <div className="relative rounded-[2rem] border border-border/80 bg-border/40 dark:bg-border/20 gap-[1px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 overflow-hidden transition-all duration-500 shadow-soft">
          {displayLogos.map((logoUrl, i) => (
            <div
              key={i}
              className="group flex items-center justify-center bg-white dark:bg-card px-4 py-8 h-28 hover:bg-slate-50 dark:hover:bg-muted/40 transition-colors duration-300"
            >
              <img
                src={logoUrl}
                alt={`Client logo ${i + 1}`}
                className="max-h-16 max-w-[75%] object-contain transition-all duration-300 transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {LOGOS.length > limit && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center justify-center bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted border border-border px-8 py-3 rounded-full text-xs font-bold tracking-wider text-foreground hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md uppercase cursor-pointer"
            >
              {expanded ? "Show Less" : "See All Clients"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
