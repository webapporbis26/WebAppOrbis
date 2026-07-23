import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Start exit animation and unmount after 3.5 seconds
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3500);

    return () => {
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} // Smooth cinematic easing
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-6 select-none relative">
            {/* Subtle glow effect behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse" />
            
            <motion.img
              src="/logo.png"
              alt="Weborbis Logo"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl relative z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
