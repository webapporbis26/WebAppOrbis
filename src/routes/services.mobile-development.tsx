import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Smartphone,
  CheckCircle,
  MonitorSmartphone,
  Gauge,
  ArrowRightLeft,
  LayoutTemplate,
  Code2,
  Database,
  Rocket,
  Shield,
} from "lucide-react";
import { gsap, useTextReveal, useFadeUp } from "@/lib/anim";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Marquee } from "@/components/ui/marquee";

export const Route = createFileRoute("/services/mobile-development")({
  head: () => ({
    meta: [
      { title: "Mobile App Development — WebApp Orbis" },
      {
        name: "description",
        content: "Revolutionize your business with our stellar Mobile App Development services. We build custom iOS, Android, and cross-platform mobile applications.",
      },
    ],
  }),
  component: MobileDevelopment,
});

const services = [
  {
    icon: Smartphone,
    title: "Android app development",
    desc: "We develop customized, high-performance Android applications tailored to meet your unique business requirements and engage a vast user base.",
  },
  {
    icon: CheckCircle,
    title: "iOS app development",
    desc: "Premium, scalable iOS applications built with the latest technologies to provide seamless, intuitive experiences for Apple users.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-platform mobile applications",
    desc: "Cost-effective, highly functional apps that work flawlessly across both iOS and Android platforms from a single codebase.",
  },
  {
    icon: Gauge,
    title: "Business application development",
    desc: "Enterprise-grade mobile applications designed to streamline your business operations and improve internal team productivity.",
  },
  {
    icon: ArrowRightLeft,
    title: "E-commerce mobile applications",
    desc: "Feature-rich mobile storefronts that offer secure, fast, and highly intuitive shopping experiences to drive sales.",
  },
  {
    icon: LayoutTemplate,
    title: "Custom application interfaces",
    desc: "Bespoke, user-friendly UI/UX designs focused on intuitive navigation and maximizing user retention.",
  },
  {
    icon: Code2,
    title: "App maintenance and updates",
    desc: "Reliable technical support, bug fixing, and continuous updates to ensure your application performs optimally at all times.",
  },
  {
    icon: Shield,
    title: "Secure and scalable app architecture",
    desc: "Robust architectural design that prioritizes data security and seamlessly scales as your user base and business grow.",
  },
];

function MobileDevelopment() {
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
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20">
      {/* HERO SECTION */}
      <section ref={heroRef} className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight mb-6">
              Mobile App Development<br/>
              <span className="font-medium">Company</span>
            </h1>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4 max-w-xl">
              We develop customised mobile applications designed to improve customer accessibility and business operations. Our applications are built with modern technologies to ensure smooth performance, security, and scalability.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-xl font-medium">
              We focus on delivering user-friendly mobile experiences that support business growth and customer interaction.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <span className="font-bold text-[#1a1a1a] text-lg">Turn Your App Idea into Reality!</span>
              <Link
                to="/contact"
                className="text-[#9333EA] font-medium text-sm tracking-wide uppercase px-8 py-4 border border-[#9333EA] hover:bg-[#9333EA] hover:text-white transition-colors"
              >
                SCHEDULE A CALL TODAY
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
            <div className="bg-[#FFC107] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2">15<span className="text-2xl">+</span></h3>
              <p className="text-[#1a1a1a] font-medium text-sm">Years of Experience</p>
            </div>
            <div className="bg-[#8c8c8c] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">1500<span className="text-2xl">+</span></h3>
              <p className="text-white font-medium text-sm">Trusted Clients Worldwide</p>
            </div>
            <div className="bg-[#8c8c8c] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">14<span className="text-2xl">+</span></h3>
              <p className="text-white font-medium text-sm">Experienced App Developers</p>
            </div>
            <div className="bg-[#FFC107] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2">4.5<span className="text-2xl">+</span></h3>
              <p className="text-[#1a1a1a] font-medium text-sm">Average App Store Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS / LOGOS */}
      <section className="bg-white py-12 border-y border-gray-100 mb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <LogoCloud />
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <Marquee text="✦ NATIVE ✦ CROSS-PLATFORM ✦ SCALABLE ✦ SECURE ✦ HIGH-PERFORMANCE " speed={25} />

      {/* TECH STACK BENTO GRID */}
      <section className="bg-white py-32 border-b border-gray-100">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-16" data-fade>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
              Our Mobile <span className="font-bold">Tech Stack</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We utilize top-tier frameworks and native languages to build apps that users love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-fade>
            {/* Native Bento */}
            <div className="md:col-span-2 bg-[#f4f7ff] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Native Development</h3>
                <p className="text-gray-600 mb-8 max-w-md">Uncompromising performance and deep hardware integration for iOS and Android.</p>
                <div className="flex flex-wrap gap-3">
                  {['Swift', 'Kotlin', 'Objective-C', 'Java', 'iOS SDK'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#0055FF] shadow-sm border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Code2 className="w-64 h-64 text-[#0055FF]" />
              </div>
            </div>

            {/* Cross Platform Bento */}
            <div className="bg-[#1a1a1a] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Cross-Platform</h3>
                <p className="text-gray-400 mb-8 text-sm">One codebase, multiple platforms. Faster time to market.</p>
                <div className="flex flex-wrap gap-2">
                  {['Flutter', 'React Native', 'Ionic'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Rocket className="w-32 h-32" />
              </div>
            </div>

            {/* Backend / APIs Bento */}
            <div className="bg-[#FFC107] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">Mobile Backend</h3>
                <p className="text-[#1a1a1a] mb-8 text-sm font-medium">Real-time sync, auth, and secure cloud storage.</p>
                <div className="flex flex-wrap gap-2">
                  {['Firebase', 'AWS Amplify', 'Supabase', 'GraphQL'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs font-bold text-[#FFC107]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-5 -bottom-5 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Database className="w-40 h-40 text-[#1a1a1a]" />
              </div>
            </div>

            {/* App Store Bento */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 flex items-center justify-between group overflow-hidden relative text-white">
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-bold mb-4">App Store Optimization (ASO)</h3>
                <p className="text-blue-100 text-sm">We don't just build your app; we ensure it gets discovered. Our experts optimize your app store listings to drive organic downloads and improve retention rates.</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <Shield className="w-20 h-20 text-blue-200 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-32 pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                data-service-card
                className="bg-white p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="mb-8">
                  <Icon className="w-12 h-12 text-[#1a1a1a]" strokeWidth={1.2} />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] text-center uppercase tracking-wide mb-20" data-fade>
            MOBILE APP DEVELOPMENT COMPANY FOR ALL STARTUP TO BIG SCALE BUSINESS
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-fade className="relative bg-[#f4f7ff] rounded-2xl p-8 aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden">
              {/* Abstract App Illustration representation */}
              <div className="relative w-full max-w-md h-[400px]">
                <div className="absolute inset-x-8 top-10 bottom-0 bg-[#0055FF] rounded-t-3xl shadow-2xl flex flex-col items-center pt-8 px-6">
                  <div className="w-16 h-2 bg-white/20 rounded-full mb-8"></div>
                  <div className="w-full h-12 bg-white/10 rounded-lg mb-4"></div>
                  <div className="w-full h-12 bg-white/10 rounded-lg mb-4"></div>
                  <div className="w-full h-12 bg-white/10 rounded-lg mb-4"></div>
                  <div className="w-full h-32 bg-white/10 rounded-lg mt-4 flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-white/30" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -left-4 top-1/3 bg-white p-4 rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-[#0055FF] font-bold">&lt;html&gt;</span>
                </div>
                <div className="absolute -right-4 bottom-1/3 bg-white p-4 rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-[#0055FF] font-bold">&lt;css&gt;</span>
                </div>
                <div className="absolute right-12 top-1/4 bg-white p-4 rounded-full shadow-xl flex items-center justify-center">
                  <span className="text-[#0055FF] font-bold">&lt;/&gt;</span>
                </div>
              </div>
            </div>
            
            <div data-fade className="space-y-8">
              <p className="text-gray-600 leading-relaxed">
                As a leading <strong>mobile app development company</strong>, we have experience developing effective applications for organisations of all sizes and types. Having worked with several startup projects and large-scale enterprises, we provide a comprehensive range of services for business mobile app development based on the tailor-made needs of businesses. We have a team of experienced developers and designers who work seamlessly together to deliver high-quality projects on time. We use the most cutting-edge techniques and technology like IoT, artificial intelligence, and machine learning, to create world-class apps.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With so many methods to build mobile apps, we've honed our skills in determining the optimum solution for your mobile app development approach, whether it's in Flutter or native iOS or Android. As features and resources of the apps we develop are isolated, we make sure that they can be scaled without hitting roadblocks. We are dedicated to delivering outstanding quality work within the given deadlines in order to ensure complete client satisfaction. We go the extra mile to make sure that the projects we handle reach their goals targetted by our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
