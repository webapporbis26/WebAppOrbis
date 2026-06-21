import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setShow(false), 350);
      }
      setProgress(p);
    }, 110);
    return () => clearInterval(id);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="text-display text-2xl tracking-tight">
          <span className="gradient-text">WebApp Orbis</span>
          <span className="text-foreground">.studio</span>
        </div>
        <div className="h-[2px] w-[220px] overflow-hidden rounded-full bg-border">
          <div
            className="h-full origin-left rounded-full"
            style={{
              width: `${progress}%`,
              background: "var(--grad-primary)",
              transition: "width 120ms ease-out",
            }}
          />
        </div>
        <div className="text-xs tracking-[0.3em] text-muted-foreground">
          {String(Math.round(progress)).padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
