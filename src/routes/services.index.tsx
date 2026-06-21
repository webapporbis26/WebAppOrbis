import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Globe,
  Smartphone,
  Database,
  ArrowUpRight,
  Check,
  Sparkles,
  Search,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
  Star,
} from "lucide-react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceErp from "@/assets/service-erp.jpg";
import { FaqPro } from "@/components/ui/faq-pro";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Web, Mobile & ERP | WebApp Orbis" },
      { name: "description", content: "Website design & development, mobile apps and ERP systems built end-to-end." },
      { property: "og:title", content: "Services — WebApp Orbis" },
      { property: "og:description", content: "Website design & development, mobile apps and ERP systems built end-to-end." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "From marketing sites that convert to web apps that scale — designed in-house and engineered to last.",
    image: serviceWeb,
    tag: "Web Platforms",
    price: "From $4,800",
    timeline: "3–8 weeks",
    items: [
      "Brand & marketing sites",
      "Headless commerce",
      "Custom web applications",
      "Editorial & content platforms",
      "Design systems",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for iOS and Android, with the polish and performance the stores reward.",
    image: serviceMobile,
    tag: "iOS · Android",
    price: "From $12,000",
    timeline: "6–14 weeks",
    items: [
      "iOS & Android native",
      "React Native / Flutter",
      "Offline-first architecture",
      "App store optimization",
      "Long-term maintenance",
    ],
    stack: ["Swift", "Kotlin", "React Native", "Expo", "Firebase"],
  },
  {
    icon: Database,
    title: "ERP Software Solutions",
    desc: "Custom ERP systems that mirror how your team actually works — fully integrated and infinitely flexible.",
    image: serviceErp,
    tag: "Enterprise",
    price: "From $24,000",
    timeline: "8–20 weeks",
    items: [
      "Inventory & operations",
      "Finance & accounting",
      "HR & payroll",
      "Custom workflows",
      "Third-party integrations",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
];

const stats = [
  { value: "120+", label: "Products shipped" },
  { value: "38", label: "Active clients" },
  { value: "14", label: "Countries served" },
  { value: "9 yrs", label: "Building software" },
];

const process = [
  { icon: Search, title: "Discover", desc: "Workshops, audits & a roadmap rooted in your business goals." },
  { icon: PenTool, title: "Design", desc: "Brand-aligned interfaces, prototyped and tested before a line of code." },
  { icon: Code2, title: "Build", desc: "Engineered in two-week sprints with weekly demos and live previews." },
  { icon: Rocket, title: "Launch", desc: "Performance, SEO & analytics dialed in before we flip the switch." },
  { icon: LifeBuoy, title: "Evolve", desc: "Ongoing iteration, support and SLAs to keep things compounding." },
];

const testimonials = [
  {
    quote: "They rebuilt our platform in 9 weeks and doubled our checkout conversion. Genuinely the best agency we've worked with.",
    name: "Amelia Crane",
    role: "Head of Product, Lumen Goods",
  },
  {
    quote: "An ERP that our team actually enjoys using. The level of craft in the workflows is unreal.",
    name: "Mateo Rivera",
    role: "COO, Northwind Logistics",
  },
  {
    quote: "Our App Store rating jumped from 3.4 to 4.8 after the rewrite. Worth every dollar.",
    name: "Priya Shah",
    role: "Founder, Quill Health",
  },
];

const faqs = [
  { q: "How do engagements typically start?", a: "A 30-minute discovery call, followed by a fixed-fee discovery sprint to scope the work in detail." },
  { q: "Do you work with in-house teams?", a: "Yes — we frequently embed with internal product, design or engineering teams." },
  { q: "What about post-launch?", a: "Every project includes a 30-day warranty. Most clients continue on a monthly retainer." },
  { q: "Where are you based?", a: "A distributed team across London, Lisbon and Bengaluru — overlapping hours with EU and US clients." },
];

function Services() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { delay: 0.2 });
  useFadeUp("[data-fade]");

  // Parallax on service card images
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Horizontal marquee for stack chips
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        gsap.to(el, {
          xPercent: -50,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
      });
    }, cardsRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pt-40 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-40"
          style={{ background: "var(--grad-primary)" }}
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> Services
          </p>
          <SplitText tag="h1" className="text-hero">
            Three things,<br/>
            done <span className="gradient-text">properly.</span>
          </SplitText>
          <p data-fade className="mt-10 max-w-2xl text-lg text-muted-foreground">
            We focus on the disciplines where craft compounds. Every engagement gets senior
            attention from people who've shipped at scale.
          </p>

          {/* Stats */}
          <div data-fade className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-display text-3xl sm:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards with images */}
      <section ref={cardsRef} className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-10">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-fade
              className={`group grid gap-10 rounded-3xl border border-border bg-card overflow-hidden transition-all hover:shadow-elegant md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-72 md:h-auto overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  data-parallax
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/10 to-transparent" />
                <span className="absolute top-6 left-6 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs uppercase tracking-[0.2em]">
                  {s.tag}
                </span>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-4">
                  <span className="text-display text-sm text-muted-foreground">0{i + 1}</span>
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground"
                    style={{ background: "var(--grad-primary)" }}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
                <SplitText tag="h2" className="text-display mt-6 text-3xl sm:text-4xl leading-tight">{s.title}</SplitText>
                <p className="mt-4 text-base text-muted-foreground">{s.desc}</p>

                <div className="mt-6 flex flex-wrap gap-6 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Investment</div>
                    <div className="mt-1 font-medium">{s.price}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Timeline</div>
                    <div className="mt-1 font-medium">{s.timeline}</div>
                  </div>
                </div>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                How we work
              </p>
              <SplitText tag="h2" className="text-display text-4xl sm:text-5xl max-w-2xl leading-[1.05]">
                A process designed to keep momentum high and surprises low.
              </SplitText>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {process.map((p, i) => (
              <div
                key={p.title}
                data-fade
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="text-xs text-muted-foreground">0{i + 1}</div>
                <div className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-display mt-5 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            What clients say
          </p>
          <SplitText tag="h2" className="text-display text-4xl sm:text-5xl max-w-2xl leading-[1.05]">
            Words from teams we've shipped with.
          </SplitText>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                data-fade
                className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <SplitText tag="h2" className="text-display text-4xl sm:text-5xl leading-[1.05]">
              The usual questions, answered.
            </SplitText>
          </div>
          <div data-fade className="w-full">
            <FaqPro 
              items={faqs.map((f, i) => ({ id: String(i), question: f.q, answer: f.a }))} 
              defaultOpenFirst 
              searchPlaceholder="Search questions..." 
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="rounded-3xl p-12 sm:p-20 text-primary-foreground relative overflow-hidden"
            style={{ background: "var(--grad-primary)" }}
          >
            <SplitText tag="h2" className="text-display text-4xl sm:text-6xl max-w-3xl leading-[1]">
              Ready to start something<br /> people will talk about?
            </SplitText>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground transition-transform hover:scale-105"
            >
              Book a discovery call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
