"use client";

import { useState } from "react";
import { Logo, ExpandBtn, SidenavigationLink } from "./ui";
import {
  cn,
  DashboardFillIcon,
  DashboardIcon,
  HomeFillIcon,
  HomeIcon,
  PiggyFillIcon,
  PiggyIcon,
  SettingsFillIcon,
  SettingsIcon,
} from "@/_client/6_shared";

const NAV_LINKS = [
  { copy: "Home", icon: HomeIcon, fillIcon: HomeFillIcon },
  { copy: "budget", icon: PiggyIcon, fillIcon: PiggyFillIcon },
  { copy: "dashboard", icon: DashboardIcon, fillIcon: DashboardFillIcon },
  { copy: "settings", icon: SettingsIcon, fillIcon: SettingsFillIcon },
];

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

      {/* Top Nav Links */}
      <div className="flex flex-col gap-2">
        {NAV_LINKS.map((link, index) => (
          <SidenavigationLink key={link.copy}>{link.copy}</SidenavigationLink>
        ))}
      </div>
    </div>
  );
}
