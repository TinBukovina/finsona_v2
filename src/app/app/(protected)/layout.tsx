"use client";

import { MobileNavigation, Sidenavigation } from "@/_client/3_widgets";
import type { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden sm:flex-row">
      <Sidenavigation />
      {children}
      <MobileNavigation />
    </div>
  );
}
