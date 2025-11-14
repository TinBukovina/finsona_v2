import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 7c0-.445.03-.883.087-1.313a8 8 0 1 0 11.227 11.225c-.43.056-.869.088-1.314.088-5.523 0-10-4.477-10-10Zm2 0a8 8 0 0 0 10.981 7.426 1 1 0 0 1 1.301 1.3A10.004 10.004 0 0 1 12 22C6.477 22 2 17.523 2 12c0-4.207 2.597-7.805 6.272-9.282a1 1 0 0 1 1.301 1.3A7.977 7.977 0 0 0 9 7Z"
    />
  </svg>
);
export default SvgComponent;
