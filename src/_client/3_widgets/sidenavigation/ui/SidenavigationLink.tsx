"use client";

import { cn } from "@/_client/6_shared";
import { ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

interface NavigationLinkProps extends ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  isActive?: boolean;
  isShrinked?: boolean;
}

export function SidenavigationLink({
  children,
  disabled = false,
  isActive = false,
  isShrinked = false,
  ...rest
}: NavigationLinkProps) {
  return (
    <button
      className={cn(
        "text-sidebar-foreground text-normal flex items-center justify-start gap-4 rounded-full border-[1px] border-transparent px-2 py-2 font-semibold outline-[0px] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        {
          "bg-primary text-primary-foreground outline-[1px]":
            isActive && !disabled,
          "hover:text-accent-foreground focus-visible:outline-primary/25 focus-visible:border-primary hover:bg-sidebar-accent focus-visible:bg-sidebar-accent focus-visible:outline-[3px]":
            !isActive && !disabled,
          "px-2 py-2": isShrinked,
          "px-3 py-2": !isShrinked,
          "text-muted-foreground bg-muted": disabled,
          "cursor-pointer": !disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
