import { cn } from "@/lib/utils";
import { ReactNode } from "react";



// we wrrape all section with this 
export default function SectionWrapper({ children, styles }: { children: ReactNode; styles?:string }) {
  return (
    <section
      className={cn(
        
        styles && styles,"bg-white shadow-md rounded-md w-full h-full  px-3  py-6"
      )}
    >
      {children}
    </section>
  );
}
