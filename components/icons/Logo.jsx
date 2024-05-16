import * as React from "react";

function DashboardIcon({ fill = "#3B81F6", ...rest }) {
  return (
    <svg
      width={40}
      height={40}
      fill="none"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M22.5 32.5h10V35h-10v-2.5zm0-5h15V30h-15v-2.5zm0-5h15V25h-15v-2.5z"
        fill={fill}
      />
      <path
        d="M32.15 10.473l-12-7.5c-.394-.247-.894-.247-1.288 0l-12 7.5C6.213 10.892 6 11.392 6 12v16c0 .608.213 1.108.562 1.527l12 7.5c.197.123.426.193.666.193.24 0 .469-.07.666-.193l12-7.5c.349-.419.562-.919.562-1.527v-16c0-.608-.213-1.108-.562-1.527zM20 4.935l8.95 5.593L20 16.069l-8.95-5.541L20 4.935zm12 20.792l-10 6.25v-12.34l10-6.25v12.34z"
        fill={fill}
      />
    </svg>
  );
}

export default DashboardIcon;
