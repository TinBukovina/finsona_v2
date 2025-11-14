"use client";

import { cn } from "@/_client/6_shared";
import HomeIocn from "@/_client/6_shared/svgs/HomeIcon";
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
        "text-sidebar-foreground text-normal hover:bg-sidebar-accent hover:text-accent-foreground flex items-center justify-start gap-4 rounded-full px-3 py-2 font-semibold",
        {
          "": isActive,
        },
      )}
    >
      {children}
    </button>
  );
}
