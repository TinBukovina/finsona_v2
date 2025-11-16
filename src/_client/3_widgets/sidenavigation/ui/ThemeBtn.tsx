import { MoonIcon, SunIcon } from "@/_client/6_shared";
import { SidenavigationLink } from "./SidenavigationLink";
import { useState } from "react";
import { is } from "drizzle-orm";
import { useSettings } from "@/_client/1_app";

const SunIconComponent = SunIcon;
const MoonIconComponent = MoonIcon;

interface ThemeBtnProps {
  isShrinked?: boolean;
}

export function ThemeBtn({ isShrinked = false }: ThemeBtnProps) {
  const { settings, updateSettings, isUpdating } = useSettings();
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const theme = settings.theme;

  const IconComponent =
    theme === "dark"
      ? isHovering
        ? SunIconComponent
        : MoonIconComponent
      : isHovering
        ? MoonIconComponent
        : SunIconComponent;

  const copy =
    theme === "dark"
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
