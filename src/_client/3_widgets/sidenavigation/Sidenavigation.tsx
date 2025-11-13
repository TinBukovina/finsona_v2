"use client";

import { Logo, ExpandBtn } from "./ui";

export default function Sidenavigation() {
  return (
    <div className="bg-sidebar-background flex w-[220px] shrink-0 flex-col gap-8 py-6 pr-4 pl-2">
      {/* Logo and Expand btn */}
      <div className="flex items-center justify-between">
        <Logo />

        <ExpandBtn isExpanded={false} setIsExpanded={() => {}} />
      </div>
      <p>bok</p>
      <p>bok</p>
      <p>bok</p>
    </div>
  );
}
