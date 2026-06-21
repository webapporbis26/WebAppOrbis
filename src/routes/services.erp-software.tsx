import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Database,
  Box,
  Users,
  Briefcase,
  PieChart,
  GitBranch,
  Settings,
  Code2,
  ArrowRight
} from "lucide-react";
import { gsap, useTextReveal, useFadeUp } from "@/lib/anim";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Marquee } from "@/components/ui/marquee";

export const Route = createFileRoute("/services/erp-software")({
  head: () => ({
    meta: [
      { title: "ERP Software Development — WebApp Orbis" },
      {
        name: "description",
        content: "Simplify and automate business operations through integrated management systems with our custom ERP solutions.",
      },
    ],
  }),
  component: ERPDevelopment,
});

const services = [
  {
    icon: Code2,
    title: "Custom ERP software development",
    desc: "We build bespoke ERP systems perfectly tailored to your unique operational workflow and business structure.",
  },
  {
    icon: Box,
    title: "Inventory & stock management",
    desc: "Gain real-time visibility into your inventory, automate stock tracking, and optimize your entire supply chain.",
  },
  {
    icon: Users,
    title: "Human resource management",
    desc: "Centralize employee data, automate payroll, and streamline recruitment processes with an integrated HR module.",
  },
  {
    icon: Briefcase,
    title: "Accounting & finance modules",
    desc: "Maintain flawless financial records, automate invoicing, and ensure regulatory compliance effortlessly.",
  },
  {
    icon: Database,
    title: "CRM & customer management",
    desc: "Manage customer relationships, track sales pipelines, and improve customer satisfaction from one unified dashboard.",
  },
  {
    icon: PieChart,
    title: "Reporting & analytics",
    desc: "Generate comprehensive reports and leverage real-time data analytics for intelligent decision-making.",
  },
  {
    icon: GitBranch,
    title: "Workflow automation solutions",
    desc: "Eliminate repetitive manual tasks and accelerate productivity by automating critical business workflows.",
  },
  {
    icon: Settings,
    title: "ERP maintenance & support",
    desc: "Dedicated ongoing technical support to ensure your ERP system remains secure, updated, and highly performant.",
  },
];

function ERPDevelopment() {
  const heroRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { stagger: 0.1, delay: 0.2 });
  useFadeUp("[data-fade]");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f5f7fa] min-h-screen pt-32 pb-20">
      {/* HERO SECTION */}
      <section ref={heroRef} className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight mb-6">
              ERP Software <span className="text-[#FBBF24]">Development</span>
            </h1>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4 max-w-xl">
              Our ERP solutions are designed to simplify and automate business operations through integrated management systems. We develop customised ERP software that improves productivity, workflow efficiency, and data management across departments.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-xl font-medium">
              Our ERP platforms are designed to provide businesses with better operational control, real-time data access, and improved decision-making capabilities.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/contact"
                className="bg-[#1a1a1a] text-white font-bold text-sm tracking-wide uppercase px-8 py-4 hover:bg-[#FBBF24] hover:text-[#1a1a1a] transition-colors"
              >
                REQUEST A DEMO
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
             <div className="bg-[#1a1a1a] p-8 flex flex-col justify-center rounded-2xl transition-transform hover:-translate-y-1">
               <Database className="w-12 h-12 text-[#FBBF24] mb-4" />
               <h3 className="text-xl font-bold text-white mb-2">Centralized Data</h3>
               <p className="text-white/70 text-sm">One single source of truth for your entire enterprise.</p>
             </div>
             <div className="bg-white border border-gray-200 p-8 flex flex-col justify-center rounded-2xl transition-transform hover:-translate-y-1">
               <GitBranch className="w-12 h-12 text-[#1a1a1a] mb-4" />
               <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Automated Workflows</h3>
               <p className="text-gray-500 text-sm">Eliminate bottlenecks and speed up execution.</p>
             </div>
             <div className="bg-white border border-gray-200 p-8 flex flex-col justify-center rounded-2xl transition-transform hover:-translate-y-1">
               <PieChart className="w-12 h-12 text-[#1a1a1a] mb-4" />
               <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Real-time Analytics</h3>
               <p className="text-gray-500 text-sm">Make intelligent, data-driven business decisions.</p>
             </div>
             <div className="bg-[#FBBF24] p-8 flex flex-col justify-center rounded-2xl transition-transform hover:-translate-y-1">
               <Settings className="w-12 h-12 text-[#1a1a1a] mb-4" />
               <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Scalable Systems</h3>
               <p className="text-[#1a1a1a]/80 text-sm">Grows seamlessly alongside your business.</p>
             </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <Marquee text="✦ INVENTORY ✦ HR MANAGEMENT ✦ ACCOUNTING ✦ CRM ✦ ANALYTICS ✦ AUTOMATION " speed={25} />

      {/* SERVICES GRID */}
      <section className="bg-white py-32 border-b border-gray-100">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-16" data-fade>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
              Our ERP Services <span className="font-bold">Include</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We offer comprehensive, end-to-end ERP solutions that integrate multiple business functions into one efficient platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div 
                  key={i} 
                  data-service-card
                  className="bg-[#FAFAFA] p-8 rounded-2xl border border-gray-100 hover:border-[#FBBF24] transition-colors group"
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#1a1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CONTENT / CLOSING */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center text-white">
          <div data-fade className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#FBBF24]">Custom Digital Solutions</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              In addition to our core services, we provide customised digital solutions tailored to unique business requirements. We work closely with businesses to develop scalable platforms that support operational growth and digital transformation.
            </p>
          </div>
          
          <div data-fade>
            <h2 className="text-3xl font-bold mb-6 text-[#FBBF24]">Delivering Reliable Technology Solutions</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10">
              We are committed to providing innovative digital services that combine functionality, design quality, and long-term performance. Whether you require a professional website, a mobile application, or a complete ERP system, we deliver solutions designed to support your business success.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-8 py-4 uppercase tracking-wide hover:bg-[#FBBF24] transition-colors rounded-sm"
            >
              Start Your Transformation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
