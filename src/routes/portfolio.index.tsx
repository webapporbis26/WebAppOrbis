import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { Lightbulb, Image as ImageIcon, Play } from "lucide-react";
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

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  useFadeUp("[data-fade]");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tag === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-white min-h-screen pt-28 pb-28 font-sans">
      
      {/* HERO SECTION */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div data-fade>
            <h1 className="leading-none mb-8">
              <span className="block text-5xl sm:text-6xl md:text-[80px] font-light text-gray-400 tracking-tight mb-2 uppercase">Our</span>
              <span className="block text-7xl sm:text-8xl md:text-[120px] font-black text-[#1a1a1a] tracking-tight uppercase">Works</span>
            </h1>
            <p className="text-[#1a1a1a] text-lg sm:text-xl font-semibold uppercase tracking-wide max-w-lg leading-relaxed">
              TURNING VISION INTO REALITY: A PORTFOLIO OF OUR COMPLETED PROJECTS
            </p>
          </div>

          {/* Right Animated Image Collage */}
          <div data-fade className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center mt-10 lg:mt-0">
            <div className="relative w-[90%] h-[90%]">
              
              {/* Background decorative blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f5f5f5] rounded-full blur-3xl opacity-80" />

              {/* Main Image (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-[4/3] z-20 rounded-2xl overflow-hidden shadow-2xl border-4 border-white animate-float">
                <img 
                  src={projects[0]?.img} 
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary Image (Top Left) */}
              <div className="absolute top-[10%] left-[5%] w-[45%] aspect-[4/3] z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white -rotate-6 animate-float-slow">
                <img 
                  src={projects[1]?.img} 
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
                {/* Overlay Play Button */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg">
                    <Play className="w-5 h-5 text-[#1a1a1a] fill-[#1a1a1a]" />
                  </div>
                </div>
              </div>

              {/* Tertiary Image (Bottom Right) */}
              <div className="absolute bottom-[10%] right-[5%] w-[50%] aspect-square z-30 rounded-full overflow-hidden shadow-2xl border-4 border-white rotate-6 animate-float" style={{ animationDelay: "2s" }}>
                <img 
                  src={projects[2]?.img} 
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-[20%] right-[10%] w-12 h-12 bg-[#FFD700] rounded-full border-2 border-[#1a1a1a] flex items-center justify-center shadow-[4px_4px_0_#1a1a1a] animate-float" style={{ animationDelay: "1s" }}>
                 <Lightbulb className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <div className="absolute bottom-[25%] left-[5%] w-16 h-16 bg-[#00E5FF] rounded-xl border-2 border-[#1a1a1a] flex items-center justify-center -rotate-12 shadow-[4px_4px_0_#1a1a1a] animate-float-slow" style={{ animationDelay: "3s" }}>
                <ImageIcon className="w-7 h-7 text-[#1a1a1a]" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-12">
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
