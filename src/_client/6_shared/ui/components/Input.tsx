import { cn } from "../../lib";
import { CheckIcon } from "../svgs";

interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  inputType?: string;
  placeholder?: string;
  required?: boolean;
  isValid?: boolean | null;
  errorMsg?: string;
  disabled?: boolean;
}

export function Input({
  value,
  defaultValue,
  onChange,
  name,
  label,
  inputType = "text",
  placeholder,
  required = true,
  isValid = null,
  errorMsg = "",
  disabled = false,
}: InputProps) {
  return (
    <div className="relative flex w-full flex-col gap-2">
      {label && (
        <div className="text-normal/tight flex justify-between">
          {label && <label htmlFor="userEmail">{label}</label>}
          {isValid === false && <p className="text-destructive">{errorMsg}</p>}
        </div>
      )}

      <input
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        type={inputType}
        id="userEmail"
        name={name}
        placeholder={placeholder}
        required={required}
        className={cn(
          "bg-input placeholder:text-normal/tight border-border h-[48px] w-full rounded-md border-[1px] p-4 outline-transparent transition-all duration-200 ease-out focus:outline-[5px]",
          {
            "border-destructive focus:outline-destructive/25 focus:border-destructive":
              isValid === false,
            "focus:outline-primary/24 focus:border-primary": isValid === true,
            "focus:outline-primary/25 focus:border-primary": isValid === null,
            "bg-muted text-muted-foreground": disabled,
            "hover:bg-input/80": !disabled,
          },
        )}
        disabled={disabled}
        autoComplete="off"
      />

      {isValid && (
        <CheckIcon
          className={cn(
            "text-success bg-input absolute top-[19px] right-[17px] h-[24px] w-[24px]",
            { "bg-muted": disabled, "top-[39px]": !!label },
          )}
        />
      )}
    </div>
  );
}
