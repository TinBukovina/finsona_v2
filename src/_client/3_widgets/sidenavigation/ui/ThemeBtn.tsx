import { MoonIcon, SunIcon } from "@/_client/6_shared";
import { SidenavigationLink } from "./SidenavigationLink";
import { useState } from "react";
import { is } from "drizzle-orm";

const SunIconComponent = SunIcon;
const MoonIconComponent = MoonIcon;

interface ThemeBtnProps {
  isShrinked?: boolean;
}

export function ThemeBtn({ isShrinked = false }: ThemeBtnProps) {
  const mod = "dark";
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const IconComponent =
    mod === "dark"
      ? isHovering
        ? SunIconComponent
        : MoonIconComponent
      : isHovering
        ? MoonIconComponent
        : SunIconComponent;

  const copy =
    mod === "dark"
      ? isHovering
        ? "Light"
        : "Dark"
      : isHovering
        ? "Dark"
        : "Light";

  console.log(isHovering);
  return (
    <SidenavigationLink
      isShrinked={isShrinked}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <IconComponent width={24} height={24} />
      {!isShrinked && copy}
    </SidenavigationLink>
  );
}
