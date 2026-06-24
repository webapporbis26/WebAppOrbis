import { useEffect, useState } from "react";

export function Loader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fading out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 1800);

    // Completely unmount after 2.5 seconds
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div 
        className={`flex items-center gap-3 select-none scale-125 md:scale-150 transition-all duration-1000 ease-out ${
          fade ? "scale-150 md:scale-[1.8] blur-sm" : ""
        }`}
      >
        <div className="flex items-center border-[2.5px] border-[#222] rounded-lg px-2.5 py-1.5 relative">
          <span className="text-4xl font-extrabold tracking-tighter leading-none text-[#222]">D</span>
          <div className="flex flex-col text-[8.5px] font-black leading-tight tracking-[0.18em] pl-1.5 border-l border-[#222]/30 text-[#222]">
            <span>ESIGN</span>
            <span>EVELOP</span>
            <span>ELIVER</span>
          </div>
        </div>
        <span className="text-4xl font-black tracking-tight text-primary drop-shadow-sm">SMART</span>
      </div>
    </div>
  );
}
