import { Sidenavigation } from "@/_client/3_widgets";
import type { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden">
      <Sidenavigation />
      {children}
    </div>
  );
}
