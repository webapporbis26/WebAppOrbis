import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const BRANDS = [
  "BYD", "Indel Money", "UFC GYM UAE", "GEMS Education", "Jayalakshmi", 
  "Ford", "Muthoot Group", "Wipro", "Synthite", "Bharatbenz", 
  "Yokohama", "Apollo Hospitals", "D'LIFE", "Rajagiri", "Keralavision"
];

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  // We'll use 5 columns on md+, 3 on sm, 2 on default
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-x bg-white",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      {BRANDS.map((brand, index) => {
        // Calculate borders to make a perfect grid
        // Last item in a row doesn't need a right border
        // For mobile (2 cols), tablet (3 cols), desktop (5 cols)
        // We'll use CSS to handle the right borders gracefully, but standard tailwind:
        const isRightEdgeLg = (index + 1) % 5 === 0;
        const isBottomRowLg = index >= BRANDS.length - 5;

        return (
          <LogoCard
            key={index}
            className={cn(
              "relative border-b",
              "border-r", // default right border
              // On lg, remove right border for every 5th element
              isRightEdgeLg && "lg:border-r-0",
              // We'll just let border-b be on all except maybe last row if we want, but the wrapper has bottom border
            )}
            name={brand}
          >
            {/* Add PlusIcons randomly or at specific intersections for the tech look */}
            {!isRightEdgeLg && !isBottomRowLg && (index % 2 === 0) && (
              <PlusIcon
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden lg:block size-6 text-muted-foreground/30"
                strokeWidth={1}
              />
            )}
          </LogoCard>
        );
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  name: string;
};

function LogoCard({ name, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white px-4 py-8 sm:py-10 lg:py-12 hover:bg-slate-50 transition-colors",
        className
      )}
      {...props}
    >
      <span className="text-foreground/40 font-bold text-sm sm:text-base lg:text-lg text-center px-2 select-none">
        {name}
      </span>
      {children}
    </div>
  );
}
