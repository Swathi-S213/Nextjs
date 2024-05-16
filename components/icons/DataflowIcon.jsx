import * as React from "react";

function DataFlowIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7a1 1 0 011-1h8V4a1 1 0 112 0v2h8a1 1 0 011 1v10a1 1 0 01-1 1h-8v2a1 1 0 11-2 0v-2H4a1 1 0 01-1-1V7zm10-3v3h8V4h-8zm8 16v-3h-8v3h8zM4 17v-3h8v3H4z"
        fill={fill}
      />
    </svg>
  );
}

export default DataFlowIcon;
