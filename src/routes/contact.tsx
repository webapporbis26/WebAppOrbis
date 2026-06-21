import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { RevealLine, useTextReveal, useFadeUp } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WebApp Orbis" },
      { name: "description", content: "Tell us about your project. We'll reply within one business day." },
      { property: "og:title", content: "Contact — WebApp Orbis" },
      { property: "og:description", content: "Tell us about your project. We'll reply within one business day." },
    ],
  }),
  component: Contact,
});

function Field({ label, type = "text", as = "input", required, name, options }: { label: string; type?: string; as?: "input" | "textarea" | "select"; required?: boolean; name: string; options?: string[] }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;
  const Tag = as as any;
  
  return (
    <div className="relative border-b border-border focus-within:border-foreground transition-colors pt-7">
      <label
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          active ? "top-0 text-xs text-muted-foreground" : "top-7 text-base text-muted-foreground"
        }`}
      >
        {label}{required && " *"}
      </label>
      {as === "select" ? (
        <>
          <select
            name={name}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
            className="w-full bg-transparent pb-3 text-base outline-none appearance-none cursor-pointer relative z-10"
          >
            <option value="" disabled hidden></option>
            {options?.map((opt) => (
              <option key={opt} value={opt} className="bg-background text-foreground">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 bottom-3 h-5 w-5 text-muted-foreground pointer-events-none z-0" />
        </>
      ) : (
        <Tag
          type={type}
          name={name}
          required={required}
          rows={as === "textarea" ? 3 : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          className="w-full resize-none bg-transparent pb-3 text-base outline-none"
        />
      )}
    </div>
  );
}

function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { delay: 0.2 });
  useFadeUp("[data-fade]");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section ref={heroRef} className="pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
          <SplitText tag="h1" className="text-hero">
            Let's make<br/>
            something <span className="gradient-text">good.</span>
          </SplitText>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
          <form
            data-fade
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-2"
          >
            <Field label="Your name" name="name" required />
            <Field label="Email address" name="email" type="email" required />
            <Field label="Company" name="company" />
            <Field 
              label="Source" 
              name="source" 
              as="select" 
              options={[
                "Direct Referral",
                "Google Search",
                "Google Maps",
                "Facebook",
                "Instagram",
                "WhatsApp Business",
                "LinkedIn",
                "Website",
                "Email",
                "Advertisement",
                "Existing Customer",
                "Other"
              ]} 
            />
            <Field label="Budget" name="budget" />
            <Field label="Tell us about your project" name="message" as="textarea" required />
            <div className="pt-8">
              <button
                type="submit"
                disabled={sent}
                className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-base font-medium text-primary-foreground transition-all hover:shadow-elegant disabled:opacity-70"
                style={{ background: "var(--grad-primary)" }}
              >
                {sent ? "Thanks — we'll reply within 24h" : "Send message"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>

          <aside data-fade className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio</p>
              <p className="mt-4 text-2xl text-display">
                548 Market Street<br />
                San Francisco, CA 94104
              </p>
            </div>
            <div className="space-y-4 text-base">
              <a href="mailto:hello@lumen.studio" className="flex items-center gap-3 link-underline">
                <Mail className="h-4 w-4 text-primary" /> hello@lumen.studio
              </a>
              <a href="tel:+14155550119" className="flex items-center gap-3 link-underline">
                <Phone className="h-4 w-4 text-primary" /> +1 (415) 555 0119
              </a>
              <p className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Mon — Fri · 9am to 6pm PT
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-border aspect-[4/3]">
              <iframe
                title="Studio location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.408%2C37.789%2C-122.396%2C37.795&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
