import { cn } from "../../lib";

interface ButtonProps {
  children: React.ReactNode;
  type?: "secondary" | "primary" | "destructive";
  action?: "submit";
  disabled?: boolean;
  ariaDisabled?: boolean;
  handleClick?: () => void;
}

export function Button({
  children,
  type = "secondary",
  action,
  disabled = false,
  ariaDisabled = false,
  handleClick,
}: ButtonProps) {
  return (
    <button
      type={action}
      className={cn(
        "h-[40px] w-full rounded-full border border-transparent px-4 py-3 font-bold outline-transparent transition-all duration-200 ease-out hover:cursor-pointer focus:outline-[3px] active:scale-98",
        {
          "bg-secondary border-border hover:bg-secondary/80 text-secondary-foreground text-normal/[16px] focus:outline-primary/25 focus:border-primary border-[1px]":
            type === "secondary",
          "bg-primary text-primary-foreground text-normal/[16px] hover:bg-primary/80 focus:outline-primary/25 focus:border-primary":
            type === "primary",
          "bg-destructive hover:bg-destructive/80 text-destructive-foreground text-normal/[16px] focus:outline-destructive/25 focus:border-destructive":
            type === "destructive",
          "bg-muted text-muted-foreground border-border border-[1px]": disabled,
        },
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={ariaDisabled}
    >
      {children}
    </button>
  );
}
