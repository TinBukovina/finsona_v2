"use client";

import {
  cn,
  LeftArrowIcon,
  RightArrowIcon,
  SplitScreenIcon,
} from "@/_client/6_shared";
import React, { useRef, useState } from "react";

interface ExpandBtnProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  remove?: boolean;
}

export function ExpandBtn({
  isExpanded,
  setIsExpanded,
  remove = false,
}: ExpandBtnProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const IconComponent = isHovering
    ? isExpanded
      ? RightArrowIcon
      : LeftArrowIcon
    : SplitScreenIcon;

  return (
    <button
      ref={buttonRef}
      className={cn(
        "text-sidebar-foreground hover:bg-secondary focus-visible:border-primary focus-visible:outline-primary/25 box-border h-[40px] w-[40px] items-center justify-center rounded-full border border-transparent transition-all duration-200 ease-out focus-visible:outline-[3px]",
        "hidden",
        remove ? "lg:hidden" : "lg:flex",
      )}
      onClick={() => {
        setIsHovering(false);
        setIsExpanded((prev) => !prev);
        setTimeout(() => {
          buttonRef.current?.blur();
        }, 0);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <IconComponent className="h-6 w-6" />
    </button>
  );
}
