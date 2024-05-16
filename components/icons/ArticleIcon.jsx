import * as React from "react";

function ArticleIcon ({ fill = "#6C7281", ...rest }) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect x="4" y="6" width="4" height="12" fill={fill} />
      <rect x="10" y="3" width="4" height="15" fill={fill} />
      <rect x="16" y="8" width="4" height="10" fill={fill} />
    </svg>
  );
}

export default ArticleIcon;
