import { Component } from "solid-js";

const Tooltip: Component<{
  showTooltip: () => boolean;
  toolTipContent: {
    label: string;
    text: string;
  };
}> = ({ showTooltip, toolTipContent }) => {
  return (
    <div
      class={`absolute bottom-full z-[999999] mb-2 left-1/2 -translate-x-1/2 bg-[#58585e] text-white text-sm rounded-md px-3 py-2
        transition-opacity duration-200 font-normal w-[300px] max-w-[400px]
        ${showTooltip() ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div class=" w-full">
        <b>{toolTipContent.label}</b> {toolTipContent.text}
      </div>

      {/* Arrow stays at bottom of tooltip, pointing at trigger */}
      <div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#666769]" />
    </div>
  );
};


export default Tooltip
