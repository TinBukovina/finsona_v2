import { MoonIcon, SunIcon } from "@/_client/6_shared";
import { SidenavigationLink } from "./SidenavigationLink";
import { useState } from "react";
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
  const effectiveTheme = theme === "system" ? "light" : theme;

  const IconComponent =
    theme === "dark" && !isUpdating
      ? isHovering
        ? SunIconComponent
        : MoonIconComponent
      : isHovering
        ? MoonIconComponent
        : SunIconComponent;

  const copy =
    theme === "dark" && !isUpdating
      ? isHovering
        ? "Light"
        : "Dark"
      : isHovering
        ? "Dark"
        : "Light";

  const handleClick = () => {
    const nextTheme = effectiveTheme === "dark" ? "light" : "dark";

    updateSettings({ theme: nextTheme });

    if (typeof document !== "undefined") {
      const root = document.documentElement;
      console.log(root.classList);
      if (nextTheme === "dark") {
        root.classList.add("dark");
      } else root.classList.remove("dark");
    }
  };

  return (
    <SidenavigationLink
      isShrinked={isShrinked}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
      disabled={isUpdating}
    >
      <IconComponent width={24} height={24} />
      {!isShrinked && copy}
    </SidenavigationLink>
  );
}
