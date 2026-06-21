import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  text: string;
  className?: string;
  speed?: number; // duration in seconds for one loop
  repeat?: number; // how many times to repeat the text in the row to ensure seamless scrolling
}

export function Marquee({ text, className, speed = 20, repeat = 10 }: MarqueeProps) {
  return (
    <div className={cn("relative flex w-full overflow-hidden bg-background py-6 border-y border-border/50", className)}>
      <div 
        className="flex whitespace-nowrap animate-marquee items-center"
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-4 text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-widest opacity-20 hover:opacity-100 hover:text-primary transition-opacity duration-300">
            {text}
          </span>
        ))}
      </div>
      <div 
        className="flex whitespace-nowrap animate-marquee items-center absolute top-0 py-6"
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-4 text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-widest opacity-20 hover:opacity-100 hover:text-primary transition-opacity duration-300">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
