import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Splits text in a node into lines/words and animates on scroll */
export function useTextReveal(ref: React.RefObject<HTMLElement | null>, opts: { stagger?: number; delay?: number } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!targets.length) return;
      gsap.set(targets, { y: 30, opacity: 0 });
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: opts.stagger ?? 0.14,
        delay: opts.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [ref, opts.stagger, opts.delay]);
}

export function RevealLine({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`block overflow-hidden py-2 -my-2 ${className}`}>
      <span data-reveal className="inline-block will-change-transform pb-1">
        {children}
      </span>
    </span>
  );
}

export function useFadeUp(selector: string, scope?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope?.current ?? document;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.from(el, {
          y: 140,
          opacity: 0,
          scale: 0.92,
          filter: "blur(12px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, root as Element);
    return () => ctx.revert();
  }, [selector, scope]);
}

export function useSerenityText(ref: React.RefObject<HTMLElement | null>, opts: { stagger?: number; delay?: number } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>(".serenity-word");
      if (!targets.length) return;
      gsap.set(targets, { y: 30, scale: 0.8, opacity: 0, filter: "blur(10px)" });
      gsap.to(targets, {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        stagger: opts.stagger ?? 0.15,
        delay: opts.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [ref, opts.stagger, opts.delay]);
}

export function useCounter(ref: React.RefObject<HTMLElement | null>, end: number, suffix = "") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.v).toString() + suffix;
      },
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, end, suffix]);
}

export { gsap, ScrollTrigger };
