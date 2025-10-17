import { IconProps } from ".";

export function EmailIcon({ ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m20 9.868-6.336 4.225a3 3 0 0 1-3.328 0L4 9.868V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.868ZM20 7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v.465l7.445 4.964a1 1 0 0 0 1.11 0L20 7.465V7Zm2 10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10Z"
      />
    </svg>
  );
}
