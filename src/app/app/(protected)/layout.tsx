"use client";

import { Sidenavigation } from "@/_client/3_widgets";
import type { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row">
      <Sidenavigation />
      {children}
    </div>
  );
}
