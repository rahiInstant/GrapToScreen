import { Component } from "solid-js";

const BoxArrowUpLeft: Component<{}> = (props) => {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      style="overflow: visible; color: currentcolor;"
      data--h-bstatus="0OBSERVED"
    >
      <path
        fill-rule="evenodd"
        d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"
      ></path>
      <path
        fill-rule="evenodd"
        d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"
      ></path>
    </svg>
  );
};

export default BoxArrowUpLeft;
