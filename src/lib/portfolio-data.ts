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
  category: "Websites" | "Mobile Apps" | "Digital Marketing" | "SEO";
  badge: string;
  cardDesc: string;
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
    category: "Websites",
    badge: "Website",
    cardDesc: "A modern and elegant website for a premium event management company.",
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
    tag: "Web Design",
    category: "Websites",
    badge: "Website",
    cardDesc: "A feature-rich website with masterclass registration and resource management.",
    year: "2024",
    client: "Nazareth",
    role: "Landing Page Design & Development",
    duration: "8 weeks",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    intro: "High-converting course funnel for a candle-making masterclass.",
    challenge: "Turning ad and social traffic into masterclass registrations.",
    solution: "A focused single-offer funnel page — bold hero creative, clear value bullets, urgency triggers and a frictionless registration CTA.",
    outcome: "A live funnel driving masterclass registrations.",
    metrics: [],
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
    category: "Websites",
    badge: "Website",
    cardDesc: "A premium website showcasing their resorts with elegant design and booking integration.",
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
    next: "bestchoice-qatar",
  },
  {
    slug: "bestchoice-qatar",
    img: bestImg,
    video: bestVideo,
    title: "BestChoice Qatar",
    tag: "Platform",
    category: "Websites",
    badge: "Website + SEO",
    cardDesc: "A product-focused website with SEO for portable cabins and industrial solutions.",
    year: "2024",
    client: "BestChoice Qatar",
    role: "Development & SEO",
    duration: "8 weeks",
    stack: ["TypeScript", "Next.js"],
    intro: "An innovative digital platform.",
    challenge: "Handling complex data visualizations.",
    solution: "Custom D3 integrations.",
    outcome: "Award-winning design.",
    metrics: [{ label: "Awards", value: "2" }],
    gallery: [bestImg],
    liveUrl: "https://bestchoiceqatar.net/",
    next: "dreamweaver-events-app",
  },
  {
    slug: "dreamweaver-events-app",
    img: eventImg,
    video: eventVideo,
    title: "Dreamweaver Events App",
    tag: "Mobile App",
    category: "Mobile Apps",
    badge: "Mobile App",
    cardDesc: "A mobile application to manage events, bookings and customer engagement.",
    year: "2024",
    client: "Dreamweaver",
    role: "Mobile App Design & Development",
    duration: "10 weeks",
    stack: ["React Native"],
    intro: "A mobile app for event management.",
    challenge: "Building a seamless mobile booking experience.",
    solution: "Native-feel cross-platform app.",
    outcome: "Streamlined event operations.",
    metrics: [],
    gallery: [eventImg],
    liveUrl: "#",
    next: "eden-retreat",
  },
  {
    slug: "eden-retreat",
    img: malluImg,
    video: malluVideo,
    title: "Eden Retreat",
    tag: "Web Design",
    category: "Websites",
    badge: "Website",
    cardDesc: "A beautiful website for a mud house resort and homestay with SEO-focused content.",
    year: "2024",
    client: "Eden Retreat",
    role: "Web Design & Development",
    duration: "8 weeks",
    stack: ["React", "TailwindCSS"],
    intro: "A serene digital presence for a nature retreat.",
    challenge: "Capturing the tranquility of the retreat online.",
    solution: "Immersive visuals with SEO-focused content.",
    outcome: "Increased direct bookings.",
    metrics: [],
    gallery: [malluImg],
    liveUrl: "#",
    next: "dreamweaver-events",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
