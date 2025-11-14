"use client";

import {
  LeftArrowIcon,
  RightArrowIcon,
  SplitScreenIcon,
} from "@/_client/6_shared";
import React, { useRef, useState } from "react";

interface ExpandBtnProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExpandBtn({ isExpanded, setIsExpanded }: ExpandBtnProps) {
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
      className="text-sidebar-foreground hover:bg-secondary focus-visible: focus-visible:border-primary focus-visible:outline-primary/25 box-border flex h-[40px] w-[40px] items-center justify-center rounded-full border border-transparent transition-all duration-200 ease-out focus-visible:outline-[3px]"
      onClick={() => {
        setIsHovering(false);
        setIsExpanded(!isExpanded);
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
