import bestImg from "@/assets/project/best.png";
import candleImg from "@/assets/project/candle.png";
import dhanaImg from "@/assets/project/dhana.jpeg";
import eventImg from "@/assets/project/event.png";
import malluImg from "@/assets/project/mallu.jpeg";
import resortImg from "@/assets/project/resort.jpeg";

import bestVideo from "@/assets/project/best.mp4";
import candleVideo from "@/assets/project/candle.mp4";
import dhnaVideo from "@/assets/project/dhna.mp4";
import eventVideo from "@/assets/project/event.mp4";
import malluVideo from "@/assets/project/mallu.mp4";
import resortVideo from "@/assets/project/resort.mp4";

export type Project = {
  slug: string;
  img: string;
  video: string;
  title: string;
  tag: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  stack: string[];
  intro: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  gallery: string[];
  liveUrl?: string;
  next: string;
};

export const projects: Project[] = [
  {
    slug: "dreamweaver-events",
    img: eventImg,
    video: eventVideo,
    title: "Dreamweaver Events",
    tag: "Web Design",
    year: "2024",
    client: "Dreamweaver",
    role: "UI/UX, Full Stack",
    duration: "6 weeks",
    stack: ["React", "Node.js"],
    intro: "A premium event management platform.",
    challenge: "Creating an immersive online booking experience.",
    solution: "A visually stunning, high-performance website.",
    outcome: "Increased online bookings by 40%.",
    metrics: [{ label: "Bookings", value: "+40%" }],
    gallery: [eventImg],
    liveUrl: "https://dreamweaverevents.co.in",
    next: "nazareth-candles",
  },
  {
    slug: "nazareth-candles",
    img: candleImg,
    video: candleVideo,
    title: "Nazareth Candles",
    tag: "E-commerce",
    year: "2024",
    client: "Nazareth",
    role: "E-commerce Development",
    duration: "8 weeks",
    stack: ["Shopify", "React"],
    intro: "Elegant e-commerce for a premium candle brand.",
    challenge: "Reflecting the brand's tactile quality digitally.",
    solution: "A bespoke Shopify storefront with rich media.",
    outcome: "Tripled online sales within 3 months.",
    metrics: [{ label: "Sales", value: "3x" }],
    gallery: [candleImg],
    liveUrl: "https://nazarethcandles.com",
    next: "chandys-resorts",
  },
  {
    slug: "chandys-resorts",
    img: resortImg,
    video: resortVideo,
    title: "Chandys Hotels & Resorts",
    tag: "Hospitality",
    year: "2023",
    client: "Chandys",
    role: "Web Development",
    duration: "10 weeks",
    stack: ["Next.js", "TailwindCSS"],
    intro: "A luxurious digital experience for a premium resort.",
    challenge: "Showcasing the property's beauty with fast loading speeds.",
    solution: "Next.js optimized image rendering and elegant animations.",
    outcome: "Reduced bounce rate and increased direct bookings.",
    metrics: [{ label: "Bounce Rate", value: "-20%" }],
    gallery: [resortImg],
    liveUrl: "https://chandyshotelsandresorts.com",
    next: "mallu-project",
  },
  {
    slug: "mallu-project",
    img: malluImg,
    video: malluVideo,
    title: "Mallu",
    tag: "Web App",
    year: "2023",
    client: "Mallu",
    role: "Full Stack",
    duration: "12 weeks",
    stack: ["React", "Node.js"],
    intro: "A dynamic web platform.",
    challenge: "Building a scalable user interface.",
    solution: "Component-driven architecture.",
    outcome: "High user engagement.",
    metrics: [{ label: "Users", value: "10k+" }],
    gallery: [malluImg],
    liveUrl: "#",
    next: "dhana-project",
  },
  {
    slug: "dhana-project",
    img: dhanaImg,
    video: dhnaVideo,
    title: "Dhana",
    tag: "Web Design",
    year: "2023",
    client: "Dhana",
    role: "UI/UX",
    duration: "4 weeks",
    stack: ["Figma", "React"],
    intro: "A modern web interface.",
    challenge: "Refreshing a legacy brand.",
    solution: "A complete visual overhaul.",
    outcome: "Improved brand perception.",
    metrics: [{ label: "Engagement", value: "+25%" }],
    gallery: [dhanaImg],
    liveUrl: "#",
    next: "best-project",
  },
  {
    slug: "best-project",
    img: bestImg,
    video: bestVideo,
    title: "Best Project",
    tag: "Platform",
    year: "2024",
    client: "Best Co.",
    role: "Development",
    duration: "8 weeks",
    stack: ["TypeScript", "Next.js"],
    intro: "An innovative digital platform.",
    challenge: "Handling complex data visualizations.",
    solution: "Custom D3 integrations.",
    outcome: "Award-winning design.",
    metrics: [{ label: "Awards", value: "2" }],
    gallery: [bestImg],
    liveUrl: "#",
    next: "dreamweaver-events",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
