"use client";

import { useState } from "react";
import { Logo, ExpandBtn, SidenavigationLink } from "./ui";
import {
  cn,
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
import { usePathname, useRouter } from "next/navigation";

const topNavLinks = [
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

export default function Sidenavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div
      className={cn(
        "bg-sidebar-background flex w-[220px] shrink-0 flex-col gap-8 py-6 pr-4 pl-3",
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
        {topNavLinks.map((link) => {
          const isLinkActive = pathname.includes(link.copy.toLowerCase());
          const IconComponent = isLinkActive ? link.fillIcon : link.icon;

          return (
            <SidenavigationLink
              key={link.copy}
              isActive={isLinkActive}
              isShrinked={!isExpanded}
              handleClick={() => router.push(link.href)}
            >
              <IconComponent width={24} height={24} />
              {isExpanded ? link.copy : null}
            </SidenavigationLink>
          );
        })}
      </div>

      {/* Bottom Nav Links */}
      <div className="flex flex-1 flex-col justify-end gap-2 bg-red-300">
        <p>bok1</p>
        <p>bok2</p>
      </div>
    </div>
  );
}
