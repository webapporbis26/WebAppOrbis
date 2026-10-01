import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ExternalLink, ArrowRight, MessageSquareText, Monitor, Smartphone } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { useFadeUp } from "@/lib/anim";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Our Work | WebApp Orbis" },
      { name: "description", content: "A showcase of websites and digital solutions we've built for businesses across different industries." },
    ],
  }),
  component: Portfolio,
});

const FILTERS = ["All", "Websites", "Mobile Apps", "Digital Marketing", "SEO"] as const;

function badgeIcon(badge: string) {
  if (badge.toLowerCase().includes("mobile")) return <Smartphone className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
}

function ProjectCard({ p }: { p: Project }) {
  const hasLiveUrl = p.liveUrl && p.liveUrl !== "#";

  return (
    <article
      data-fade
      className="group bg-white rounded-[1.75rem] overflow-hidden border border-slate-100 shadow-[0_8px_32px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_56px_rgb(0,0,0,0.10)] transition-shadow duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={p.img}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full text-[12px] font-semibold text-blue-700 shadow-sm">
          {badgeIcon(p.badge)}
          {p.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
        <h3 className="text-[19px] font-bold text-slate-900 mb-1.5">{p.title}</h3>
        <p className="text-[14px] leading-relaxed text-slate-500 mb-5 flex-1">{p.cardDesc}</p>

        <div className="flex items-center gap-3">
          {hasLiveUrl ? (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-blue-600 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full opacity-90">
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </span>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border-[1.5px] border-blue-600 text-blue-600 hover:bg-blue-50 text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <MessageSquareText className="w-4 h-4" />
            Get a Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
  useFadeUp("[data-fade]");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-[#f7fafd] min-h-screen pb-24 sm:pb-28 font-sans pt-32 sm:pt-40">
      {/* HEADER */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-10 sm:mb-12">
        <div className="flex flex-wrap items-start justify-between gap-8" data-fade>
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[12px] font-bold tracking-[0.22em] text-blue-600 mb-4">
              <span className="inline-block w-8 h-[2px] bg-blue-600" />
              OUR PORTFOLIO
            </p>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
              <span className="text-slate-900">Our </span>
              <span className="text-blue-600">Work</span>
            </h1>
            <p className="text-[15px] sm:text-base text-slate-500 leading-relaxed">
              A showcase of websites and digital solutions we've built for businesses across different industries.
            </p>
          </div>

          {/* Filter pills */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 bg-white border border-slate-100 rounded-full p-1.5 shadow-[0_4px_20px_rgb(0,0,0,0.04)] self-center w-max sm:w-auto">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[12.5px] sm:text-[13.5px] font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeFilter === f
                      ? "bg-blue-600 text-white shadow-[0_4px_14px_rgb(37,99,235,0.35)]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-20 text-[15px]">
            No projects in this category yet — check back soon.
          </p>
        )}
      </section>
    </div>
  );
}
