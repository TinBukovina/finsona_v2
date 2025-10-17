import { IconProps } from ".";

export function EmailFillIcon({ ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m2.904 7.06 9.596 4.798 9.596-4.798A2.4 2.4 0 0 0 19.7 4.8H5.3a2.4 2.4 0 0 0-2.396 2.26Z"
      />
      <path
        fill="currentColor"
        d="m22.1 9.741-9.6 4.8-9.6-4.8V16.8a2.4 2.4 0 0 0 2.4 2.4h14.4a2.4 2.4 0 0 0 2.4-2.4V9.74Z"
      />
    </svg>
  );
}
