"use client";

import HomeIocn from "@/_client/6_shared/svgs/HomeIcon";
import type { ReactNode } from "react";

interface NavigationLinkProps {
  children: ReactNode;
}

export function SidenavigationLink({ children }: NavigationLinkProps) {
  return (
    <button className="text-sidebar-foreground">
      <HomeIocn />
      {children}
    </button>
  );
}
