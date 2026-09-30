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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceErp from "@/assets/service-erp.jpg";


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
    desc: "We create professional websites that combine modern design with advanced functionality. Our websites are developed to deliver fast performance, responsive layouts, and seamless user experiences across desktops, tablets, and mobile devices.",
    image: serviceWeb,
    tag: "Web Platforms",
    items: [
      "Corporate website development",
      "Business and portfolio websites",
      "E-commerce website development",
      "Responsive web design",
      "Custom web application development",
      "Website maintenance and support",
      "UI and UX design solutions",
      "SEO-friendly website structure",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "We develop customised mobile applications designed to improve customer accessibility and business operations. Our applications are built with modern technologies to ensure smooth performance, security, and scalability.",
    image: serviceMobile,
    tag: "iOS · Android",
    items: [
      "Android app development",
      "iOS app development",
      "Cross-platform mobile applications",
      "Business application development",
      "E-commerce mobile applications",
      "Custom application interfaces",
      "App maintenance and updates",
      "Secure and scalable app architecture",
    ],
    stack: ["Swift", "Kotlin", "React Native", "Expo", "Firebase"],
  },
  {
    icon: Database,
    title: "ERP Software Solutions",
    desc: "Our ERP solutions are designed to simplify and automate business operations through integrated management systems. We develop customised ERP software that improves productivity, workflow efficiency, and data management across departments.",
    image: serviceErp,
    tag: "Enterprise",
    items: [
      "Custom ERP software development",
      "Inventory and stock management systems",
      "Human resource management systems",
      "Accounting and finance modules",
      "CRM and customer management systems",
      "Reporting and analytics integration",
      "Workflow automation solutions",
      "ERP maintenance and support",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
]

const stats = [
  { value: "100+", label: "Projects shipped" },
  { value: "50+", label: "Happy clients" },
  { value: "5+", label: "Years experience" },
  { value: "98%", label: "Client retention" },
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
      <section ref={heroRef} className="pt-40 pb-16 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-40"
          style={{ background: "var(--grad-primary)" }}
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col items-start text-left">
              <h1 className="text-hero text-left" data-fade>
                Three things,<br/>
                done <span className="gradient-text">properly.</span>
              </h1>
              <p data-fade className="mt-8 max-w-xl text-lg text-muted-foreground">
                We provide comprehensive digital solutions designed to help businesses strengthen their online presence, improve operational efficiency, and enhance customer engagement. Our services combine modern technology, creative design, and strategic development to deliver reliable business solutions.
              </p>
            </div>

            <div data-fade className="w-full rounded-3xl overflow-hidden aspect-square sm:aspect-video lg:aspect-square xl:aspect-[4/3] relative shadow-elegant">
              <img src={serviceWeb} alt="Services Overview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Stats */}
          <div data-fade className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
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
      <section ref={cardsRef} className="py-10">
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

      {/* CTA */}
      <section className="py-12">
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
