import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { useFadeUp } from "@/lib/anim";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Works | WebApp Orbis" },
      { name: "description", content: "Turning vision into reality: a portfolio of our completed projects." },
    ],
  }),
  component: Portfolio,
});

const CATEGORIES = ["All", "Web Design", "E-commerce", "Web App", "Hospitality", "Platform"];

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 px-7 py-3.5 rounded-full border text-[15px] transition-all duration-200 ${
          open
            ? "border-slate-900 text-slate-900"
            : "border-gray-300 text-slate-800 hover:border-slate-900"
        }`}
      >
        <span className={value !== "All" ? "font-semibold" : ""}>
          {value === "All" ? label : value}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-[0_16px_48px_rgb(0,0,0,0.12)] border border-slate-100 py-2 z-30 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-5 py-3 text-left text-[15px] transition-colors ${
                value === opt
                  ? "text-slate-900 font-semibold bg-slate-50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {opt}
              {value === opt && <Check className="w-4 h-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  useFadeUp("[data-fade]");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tag === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-white min-h-screen pb-28 font-sans pt-36 sm:pt-44">

      {/* HEADER — title + dropdown filters */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-10 sm:mb-14">
        <div className="flex flex-wrap items-center justify-between gap-6" data-fade>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-slate-900 tracking-tight">
            Our Works
            <sup className="text-xl sm:text-2xl font-normal text-slate-900 ml-2">
              ({filteredProjects.length})
            </sup>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <FilterDropdown
              label="Categories"
              options={CATEGORIES}
              value={activeFilter}
              onChange={setActiveFilter}
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ p }: { p: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: p.slug }}
      className="group block"
      data-fade
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#f5f5f5] overflow-hidden mb-5 border border-gray-100 transition-shadow duration-500 group-hover:shadow-xl">
        <img 
          src={p.img} 
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-0 z-10"
          loading="lazy"
        />
        {p.video && (
          <video
            ref={videoRef}
            src={p.video}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 z-0"
          />
        )}
      </div>
      
      {/* Text Area */}
      <div className="px-1">
        <h3 className="text-[#1a1a1a] font-bold text-lg uppercase tracking-wide mb-1 transition-colors">
          {p.title}
        </h3>
        <p className="text-[#1a1a1a] text-[11px] font-medium uppercase tracking-widest">
          {p.tag} & DEVELOPMENT
        </p>
      </div>
    </Link>
  );
}
