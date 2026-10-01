import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { projects } from "@/lib/portfolio-data";
import { PortfolioHeroSlider } from "@/components/PortfolioHeroSlider";
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

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  useFadeUp("[data-fade]");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tag === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-white min-h-screen pb-28 font-sans">
      
      {/* HERO SLIDER */}
      <PortfolioHeroSlider />

      {/* FILTER BAR */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-12 pt-8">
        <div className="flex flex-wrap items-center justify-start gap-4" data-fade>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 border text-sm transition-colors duration-300 ${
                activeFilter === cat 
                  ? "border-[#1a1a1a] bg-transparent text-[#1a1a1a] font-bold" 
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
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
