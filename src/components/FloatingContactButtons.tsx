import { Mail } from "lucide-react";

export function FloatingContactButtons() {
  return (
    <div className="hidden md:flex flex-col gap-4 fixed bottom-8 right-8 z-50">
      {/* Mail Button */}
      <a
        href="mailto:info@webapporbis.com"
        aria-label="Email Us"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#0bbde6] to-[#1cd4ff] text-white rounded-full shadow-[0_8px_30px_rgb(28,212,255,0.3)] hover:shadow-[0_8px_30px_rgb(28,212,255,0.5)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none">
          Email Us
        </span>
        <Mail className="w-6 h-6 stroke-[2]" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917736003018"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#20ba5a] to-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgb(37,211,102,0.5)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
        {/* WhatsApp Official SVG */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.597-1.009-5.04-2.846-6.88S14.004 1.108 12.01 1.108c-5.398 0-9.786 4.393-9.79 9.799-.002 1.802.488 3.561 1.448 5.168L2.68 21.36l5.228-1.378zm11.388-5.882c-.3-.15-1.774-.875-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.488-.89-.795-1.49-1.77-1.665-2.07-.175-.3-.019-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525C9.53 9.4 8.93 7.925 8.68 7.325c-.244-.589-.49-.58-.675-.589-.175-.008-.375-.01-.575-.01s-.525.075-.8 1.012c-.275.937-.8 2.285-.875 2.435-.075.15-.15.3-.075.45.075.15.657 1.096 1.625 1.958 1.253 1.117 2.3 1.463 3.125 1.813.825.35 1.35.2 1.85-.35.5-.55 2.05-2.65 2.5-3.55.05-.1.1-.3-.05-.45z" />
        </svg>
      </a>
    </div>
  );
}
