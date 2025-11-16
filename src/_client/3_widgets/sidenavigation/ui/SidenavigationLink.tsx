"use client";

import { cn } from "@/_client/6_shared";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

interface NavigationLinkProps {
  children: ReactNode;
  isActive?: boolean;
  isShrinked?: boolean;
  handleClick?: () => void;
}

export function SidenavigationLink({
  children,
  isActive = false,
  isShrinked = false,
  handleClick,
}: NavigationLinkProps) {
  return (
    <button
      className={cn(
        "text-sidebar-foreground text-normal flex items-center justify-start gap-4 rounded-full border-[1px] border-transparent px-2 py-2 font-semibold outline-[0px] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        {
          "bg-primary text-primary-foreground outline-[1px]": isActive,
          "hover:text-accent-foreground focus:outline-primary/25 focus:border-primary hover:bg-sidebar-accent focus:bg-sidebar-accent focus:outline-[3px]":
            !isActive,
          "px-2 py-2": isShrinked,
          "px-3 py-2": !isShrinked,
        },
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
