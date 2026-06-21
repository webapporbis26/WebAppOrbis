import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealLine, useTextReveal, useFadeUp } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { getProject, projects } from "@/lib/portfolio-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project — WebApp Orbis" }] };
    return {
      meta: [
        { title: `${p.title} — Case Study | WebApp Orbis` },
        { name: "description", content: p.intro },
        { property: "og:title", content: `${p.title} — WebApp Orbis` },
        { property: "og:description", content: p.intro },
        { property: "og:image", content: p.img },
        { name: "twitter:image", content: p.img },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="text-display mt-4 text-5xl">Project not found.</h1>
        <Link to="/portfolio" className="mt-8 inline-flex items-center gap-2 text-sm underline">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-display text-3xl">Something broke.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full border px-5 py-2 text-sm">Retry</button>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { delay: 0.15 });
  useFadeUp("[data-fade]");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      gsap.from("[data-metric]", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-metric]", start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [project.slug]);

  const nextProject = projects.find((p) => p.slug === project.next) ?? projects[0];

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {project.tag} · {project.year}
          </p>
          <SplitText tag="h1" className="text-hero">
            {project.title}<br/>
            <span className="gradient-text">{project.tag}</span>
          </SplitText>
          <div className="mt-10 max-w-2xl">
            <RevealLine>
              <p className="text-xl text-muted-foreground sm:text-2xl">{project.intro}</p>
            </RevealLine>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl bg-muted">
            <img
              ref={heroImgRef}
              src={project.img}
              alt={project.title}
              className="aspect-[16/9] w-full scale-110 object-cover"
            />
          </div>
        </div>
      </section>

      {/* META GRID */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 border-y border-border py-12 md:grid-cols-4">
            {[
              { label: "Client", value: project.client },
              { label: "Role", value: project.role },
              { label: "Timeline", value: project.duration },
              { label: "Year", value: project.year },
            ].map((m) => (
              <div key={m.label} data-fade>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{m.label}</p>
                <p className="mt-3 text-lg">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2" data-fade>
            {project.stack.map((s: string) => (
              <span key={s} className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="sticky top-28 text-xs uppercase tracking-[0.3em] text-muted-foreground">The work</p>
          </div>
          <div className="space-y-16 md:col-span-8">
            {[
              { h: "Challenge", p: project.challenge },
              { h: "Solution", p: project.solution },
              { h: "Outcome", p: project.outcome },
            ].map((b) => (
              <div key={b.h} data-fade>
                <SplitText tag="h2" className="text-display text-3xl sm:text-4xl">{b.h}</SplitText>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {project.metrics.map((m: { label: string; value: string }) => (
              <div key={m.label} data-metric className="bg-background p-8 sm:p-10">
                <p className="text-display text-4xl sm:text-5xl">
                  <span className="gradient-text">{m.value}</span>
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={galleryRef} className="pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-6">
            <div className="md:col-span-4 overflow-hidden rounded-3xl bg-muted">
              <img data-parallax-img src={project.gallery[0]} alt="" className="aspect-[16/10] w-full object-cover" />
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-3xl bg-muted">
              <img data-parallax-img src={project.gallery[1]} alt="" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="md:col-span-6 overflow-hidden rounded-3xl bg-muted">
              <img data-parallax-img src={project.gallery[2]} alt="" className="aspect-[21/9] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* NEXT */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Next project</p>
          <Link
            to="/portfolio/$slug"
            params={{ slug: nextProject.slug }}
            className="group mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <SplitText tag="h3" className="text-display text-5xl sm:text-7xl">
                {nextProject.title}
              </SplitText>
              <ArrowUpRight className="h-10 w-10 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {nextProject.tag}
            </span>
          </Link>
          <div className="mt-12 flex items-center justify-between">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm hover:underline">
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:opacity-90">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
