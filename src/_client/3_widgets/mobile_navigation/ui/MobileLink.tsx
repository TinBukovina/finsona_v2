import { cn } from "@/_client/6_shared";
import clsx from "clsx";
import React from "react";

export default function MobileLink({ children }: React.PropsWithChildren) {
  return (
    <button
      className={clsx(
        "text-sidebar-foreground flex h-fit cursor-pointer items-center justify-center rounded-md border border-transparent p-2",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:border-primary focus-visible:outline-primary/25 focus-visible:outline-[3px]",
      )}
    >
      {children}
    </button>
  );
}
