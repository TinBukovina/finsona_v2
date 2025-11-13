"use client";

import { cn, paths } from "@/_client/6_shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface LogoProps {
  disabled?: boolean;
}

export function Logo({ disabled = false }: LogoProps) {
  const route = useRouter();

  function handleLogoClick() {
    route.push(paths.app.home.root);
  }
  return (
    <div
      className="flex w-fit items-center gap-3 pl-3"
      onClick={handleLogoClick}
      aria-hidden="true"
    >
      <div className="transition-all duration-200 ease-out hover:scale-105 hover:cursor-pointer">
        <Image src={"/svgs/logo.svg"} alt="logo" width={32} height={32} />
      </div>
      <button
        className={cn(
          "text-h6 text-sidebar-foreground outline-0 transition-all duration-200 ease-out hover:cursor-pointer",
          {
            "text-muted-foreground text-h6": disabled,
            "focus:text-shadow-primary focus:text-primary hover:text-primary hover:cursor-pointer focus:text-shadow-2xs active:scale-95":
              !disabled,
          },
        )}
      >
        Finsona
      </button>
    </div>
  );
}
