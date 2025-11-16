"use client";

import { cn } from "@/_client/6_shared";
import type { ReactNode } from "react";

interface NavigationLinkProps {
  children: ReactNode;
  isActive?: boolean;
}

export function SidenavigationLink({
  children,
  isActive = true,
}: NavigationLinkProps) {
  return (
    <button
      className={cn(
        "text-sidebar-foreground text-normal hover:bg-sidebar-accent hover:text-accent-foreground focus:border-primary focus:outline-primary/25 focus:bg-sidebar-accent flex items-center justify-start gap-4 rounded-full border-[1px] border-transparent px-3 py-2 font-semibold transition-all duration-200 ease-out focus:outline-[3px]",
      )}
    >
      {children}
    </button>
  );
}
