import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // ISPRAVAK: Grupa za veličinu fonta se zove 'font-size'
      "font-size": [
        "text-xs",
        "text-sm",
        "text-normal",
        "text-h6",
        "text-h5",
        "text-h4",
        "text-h3",
        "text-h2",
        "text-h1",
      ],
      // ISPRAVAK: Grupa za radijus ruba se zove 'rounded'
      rounded: ["rounded-none", "rounded-sm", "rounded-md", "rounded-card"],

      // Proširujemo SVE grupe koje koriste boje s vašim custom varijablama
      // Ovo je kompletna lista na temelju vašeg CSS-a
      "bg-color": [
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "accent",
        "accent-foreground",
        "background",
        "card",
        "popover",
        "muted",
        "destructive",
        "success",
        "sidebar-background",
        "sidebar-primary",
        "sidebar-accent",
        "chart-clr1",
        "chart-clr2",
        "chart-clr3",
        "chart-clr4",
        "chart-clr5",
      ],
      "text-color": [
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "accent-foreground",
        "foreground",
        "card-foreground",
        "popover-foreground",
        "muted-foreground",
        "destructive-foreground",
        "success-foreground",
        "sidebar-foreground",
        "sidebar-primary-foreground",
        "sidebar-accent-foreground",
      ],
      "border-color": ["primary", "secondary", "border", "input", "ring"],
      "ring-color": ["primary", "ring"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
