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
      d="M11 21v-1a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0Zm-5.364-4.05a1.001 1.001 0 0 1 1.415 1.414l-.708.707a1 1 0 0 1-1.414-1.414l.707-.707Zm11.314 0a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414ZM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0ZM4 11a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.414 0l.707.707A1 1 0 1 1 5.636 7.05l-.707-.707a1 1 0 0 1 0-1.414Zm12.728 0a1 1 0 0 1 1.414 1.414l-.707.708a1 1 0 0 1-1.414-1.415l.707-.707ZM11 4V3a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0Zm6 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
    />
  </svg>
);
export default SvgComponent;
