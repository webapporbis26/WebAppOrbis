import { Phone, Mail, MessageCircle } from "lucide-react";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-[calc(2.75rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] w-full md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.15)] font-sans">
      {/* Call Us */}
      <a 
        href="tel:+917736003018" 
        className="flex-1 flex items-center justify-center gap-2 bg-[#6b72ff] text-white text-[12px] font-bold tracking-wide hover:bg-[#565cef] transition-colors"
      >
        <Phone className="w-4 h-4" strokeWidth={2.5} />
        CALL US
      </a>
      
      {/* Mail Us */}
      <a 
        href="mailto:info@webapporbis.com" 
        className="flex-1 flex items-center justify-center gap-2 bg-[#1cd4ff] text-white text-[12px] font-bold tracking-wide hover:bg-[#0bbde6] transition-colors"
      >
        <Mail className="w-4 h-4" strokeWidth={2.5} />
        MAIL US
      </a>
      
      {/* WhatsApp */}
      <a 
        href="https://wa.me/917736003018" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-[#ffcc00] text-black text-[12px] font-bold tracking-wide hover:bg-[#e6b800] transition-colors"
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
        WHATSAPP
      </a>
    </div>
  );
}
