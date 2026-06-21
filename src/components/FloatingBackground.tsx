import { useEffect, useRef } from "react";

export function FloatingBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId: number | null = null;
    const onMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        rafId = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--mx" as string]: "0px", ["--my" as string]: "0px" }}
    >
      {/* Blob 1 */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "55vw",
          height: "55vw",
          transform: "translate(var(--mx), var(--my))",
          willChange: "transform",
        }}
      >
        <div
          className="blob"
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, #2563EB55, transparent 65%)",
            animation: "blob-float 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* Blob 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          transform: "translate(calc(var(--mx) * -1), calc(var(--my) * -1))",
          willChange: "transform",
        }}
      >
        <div
          className="blob"
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle, #0EA5E944, transparent 65%)",
            animation: "blob-float 22s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Blob 3 */}
      <div
        className="blob"
        style={{
          top: "40%",
          left: "55%",
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(circle, #818CF833, transparent 65%)",
          animation: "blob-float 28s ease-in-out infinite",
        }}
      />
    </div>
  );
}
