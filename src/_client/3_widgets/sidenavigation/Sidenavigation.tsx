"use client";

import { useEffect, useState } from "react";
import { Logo, ExpandBtn, SidenavigationLink, ThemeBtn } from "./ui";
import {
  cn,
  DashboardFillIcon,
  DashboardIcon,
  HomeFillIcon,
  HomeIcon,
  LogoutIcon,
  paths,
  PiggyFillIcon,
  PiggyIcon,
  SettingsFillIcon,
  SettingsIcon,
} from "@/_client/6_shared";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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

const COLLAPSE_BREAKPOINT = 1024;
const SIDENAV_EXPANDED_KEY = "finsona:sidenav-expanded";

export default function Sidenavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [forceCollapse, setForceCollapse] = useState<boolean>(false);

  const isActuallyExpanded = isExpanded && !forceCollapse;

  // useEffect for storing state in local storage for is sidenavigation expanded
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(SIDENAV_EXPANDED_KEY);
    if (stored === "true") setIsExpanded(true);
    if (stored === "false") setIsExpanded(false);
  }, []);

  // useEffect for adding event for force collapsing sidenavigation
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;

      setForceCollapse(window.innerWidth < COLLAPSE_BREAKPOINT);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // function that setts up new state and saves it to a local storage
  const setExpandedWithPersist = (
    value: boolean | ((prev: boolean) => boolean),
  ) => {
    setIsExpanded((prev) => {
      const next =
        typeof value === "function"
          ? (value as (p: boolean) => boolean)(prev)
          : value;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          SIDENAV_EXPANDED_KEY,
          next ? "true" : "false",
        );
      }

      return next;
    });
  };

  return (
    <div
      className={cn(
        "bg-sidebar-background hidden shrink-0 flex-col gap-8 px-3 py-6 sm:flex",
        "w-[66px]",
        isExpanded ? "lg:w-[220px]" : "lg:w-[66px]",
      )}
    >
      {/* Logo and Expand btn */}
      <div
        className={cn("flex items-center justify-between", {
          "flex-col gap-8": !isActuallyExpanded,
        })}
      >
        <Logo shrink={!isActuallyExpanded} />

        <ExpandBtn
          isExpanded={isActuallyExpanded}
          setIsExpanded={setExpandedWithPersist}
          remove={forceCollapse}
        />
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
              isShrinked={!isActuallyExpanded}
              onClick={() => router.push(link.href)}
            >
              <IconComponent width={24} height={24} />
              {isActuallyExpanded ? link.copy : null}
            </SidenavigationLink>
          );
        })}
      </div>

      {/* Bottom Nav Links */}
      <div className="flex flex-1 flex-col justify-end gap-2">
        <ThemeBtn isShrinked={!isActuallyExpanded} />
        <SidenavigationLink
          isShrinked={!isActuallyExpanded}
          onClick={() => {
            console.log("bok");
            signOut({ redirectTo: "/login" });
          }}
        >
          <LogoutIcon width={24} height={24} />
          {isActuallyExpanded && "Logout"}
        </SidenavigationLink>
      </div>
    </div>
  );
}
