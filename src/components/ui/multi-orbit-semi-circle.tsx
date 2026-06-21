"use client";
import React, { useState, useEffect } from "react";

const TECHNOLOGIES = [
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Apple", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" },
  { name: "Android", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
];

function SemiCircleOrbit({ radius, centerX, centerY, items, iconSize }: any) {
  const count = items.length;
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {items.map((tech: any, index: number) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
              animation: `orbit-float ${4 + (index % 3)}s ease-in-out infinite alternate`,
              animationDelay: `${(index % 5) * 0.4}s`
            }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer transition-transform hover:scale-110">
              <img
                src={tech.icon}
                alt={tech.name}
                width={iconSize}
                height={iconSize}
                className="object-contain"
                style={{ minWidth: iconSize, minHeight: iconSize }}
              />
            </div>

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
              } hidden group-hover:block w-32 rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white shadow-lg text-center`}
            >
              {tech.name}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black ${
                  tooltipAbove ? "top-full -mt-1.5" : "bottom-full -mb-1.5"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.9, 900);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(28, baseWidth * 0.05)
      : size.width < 768
      ? Math.max(32, baseWidth * 0.06)
      : Math.max(36, baseWidth * 0.07);

  // Split the 10 technologies into 2 orbits (4 and 6)
  const innerOrbitItems = TECHNOLOGIES.slice(0, 4);
  const outerOrbitItems = TECHNOLOGIES.slice(4, 10);

  return (
    <section className="py-24 relative w-full overflow-hidden bg-slate-50/50">
      <style>{`
        @keyframes orbit-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      <div className="relative flex flex-col items-center text-center z-10">
        <h2 data-fade className="text-[32px] sm:text-[40px] text-foreground font-light mb-16 tracking-tight">
          Technologies <span className="font-bold">We Used</span>
        </h2>

        <div
          className="relative mt-8"
          style={{ width: baseWidth, height: baseWidth * 0.5 }}
        >
          {/* Base decorative circle lines */}
          <div className="absolute inset-0 flex justify-center items-end overflow-hidden">
            <div className="w-[44%] h-[88%] border-t-2 border-dashed border-gray-300 rounded-t-full absolute bottom-0" />
            <div className="w-[80%] h-[160%] border-t-2 border-dashed border-gray-300 rounded-t-full absolute bottom-0" />
          </div>

          <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} items={innerOrbitItems} iconSize={iconSize} />
          <SemiCircleOrbit radius={baseWidth * 0.40} centerX={centerX} centerY={centerY} items={outerOrbitItems} iconSize={iconSize} />
        </div>
      </div>
    </section>
  );
}
