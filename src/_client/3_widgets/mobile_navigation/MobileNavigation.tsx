"use client";

import React from "react";
import MobileLink from "./ui/MobileLink";
import {
  DashboardFillIcon,
  DashboardIcon,
  HomeFillIcon,
  HomeIcon,
  paths,
  PiggyFillIcon,
  PiggyIcon,
  SettingsFillIcon,
  SettingsIcon,
} from "@/_client/6_shared";
import { usePathname } from "next/navigation";

const mobileLinks = [
  {
    copy: "Home",
    href: paths.app.home.root,
    icon: HomeIcon,
    fillIcon: HomeFillIcon,
  },
  {
    copy: "Budget",
    href: paths.app.budget.root,
    icon: PiggyIcon,
    fillIcon: PiggyFillIcon,
  },
  {
    copy: "Dashboard",
    href: paths.app.dashboard.root,
    icon: DashboardIcon,
    fillIcon: DashboardFillIcon,
  },
  {
    copy: "Settings",
    href: paths.app.settings.root,
    icon: SettingsIcon,
    fillIcon: SettingsFillIcon,
  },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="bg-sidebar-background flex h-[80px] justify-center gap-2 p-6 pt-2 sm:hidden">
      {mobileLinks.map((link) => {
        const isLinkActive = pathname.includes(link.copy.toLowerCase());
        const IconComponent = isLinkActive ? link.fillIcon : link.icon;

        return (
          <MobileLink key={link.copy}>
            <IconComponent width={32} height={32} />
          </MobileLink>
        );
      })}
    </div>
  );
}
