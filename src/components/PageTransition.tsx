import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { gsap } from "gsap";

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isFirst = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    const label = labelRef.current;
    if (!overlay || !label) return;

    if (isFirst.current) {
      isFirst.current = false;
      gsap.set(overlay, { yPercent: -100 });
      return;
    }

    const tl = gsap.timeline();
    tl.set(overlay, { yPercent: 100 })
      .set(label, { opacity: 0, y: 30 })
      .to(overlay, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
      .to(label, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .to(label, { opacity: 0, y: -30, duration: 0.4, ease: "power3.in" }, "+=0.2")
      .to(overlay, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=0.2");
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] grid place-items-center pointer-events-none"
      style={{ background: "var(--grad-primary)", transform: "translateY(-100%)" }}
    >
      <div ref={labelRef} className="text-display text-6xl text-white sm:text-8xl tracking-tight">
        WebApp Orbis<span className="opacity-60">.</span>
      </div>
    </div>
  );
}
