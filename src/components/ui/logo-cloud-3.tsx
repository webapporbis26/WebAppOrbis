import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

const logoModules = import.meta.glob("@/assets/MBWS clients/*.{png,jpg,jpeg,webp}", { eager: true });
const LOGOS = Object.values(logoModules).map((mod: any) => mod.default);

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-6",
        className
      )}
    >
      <InfiniteSlider gap={96} duration={60} durationOnHover={120}>
        {LOGOS.map((logoUrl, i) => (
          <div 
            key={i} 
            className="flex items-center justify-center px-6 py-4 min-w-[240px] h-28"
          >
            <img 
              src={logoUrl} 
              alt={`Client logo ${i + 1}`} 
              className="max-h-24 max-w-[240px] object-contain filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
