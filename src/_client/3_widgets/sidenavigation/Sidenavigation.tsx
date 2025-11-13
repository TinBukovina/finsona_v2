"use client";

import { useState } from "react";
import { Logo, ExpandBtn } from "./ui";
import { cn } from "@/_client/6_shared";

export default function Sidenavigation() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div
      className={cn(
        "bg-sidebar-background flex w-[220px] shrink-0 flex-col gap-8 py-6 pr-4 pl-2",
        {
          "w-fit px-3": !isExpanded,
        },
      )}
    >
      {/* Logo and Expand btn */}
      <div
        className={cn("flex items-center justify-between", {
          "flex-col gap-8": !isExpanded,
        })}
      >
        <Logo shrink={!isExpanded} />

        <ExpandBtn isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>
      <p>bok</p>
      <p>bok</p>
      <p>bok</p>
    </div>
  );
}
