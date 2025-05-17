import { Component, createSignal } from "solid-js";
import Tooltip from "./Tooltip";

const Switch: Component<{
  switchText: string;
  toolTipContent: {
    label: string;
    text: string;
  } | null;
  onChange?: (state: boolean) => void;
}> = ({ switchText, toolTipContent, onChange }) => {
  const [enabled, setEnabled] = createSignal(false);

  const [showTooltip, setShowTooltip] = createSignal(false);

  const toggle = () => {
    const newState = !enabled();
    setEnabled(newState);
    onChange?.(newState); // notify parent
  };

  return (
    <div class="text-white bg-[#1e1e2f] p-2 rounded justify-between">
      <div class="flex flex-col gap-2">
        {/* switch */}
        <div class="flex items-center justify-between">
          <div class="text-sm flex items-center gap-1 group">
            <div>{switchText}</div>

            {/* Hover Target with Tooltip inside */}
            {toolTipContent && (
              <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto"
              >
                ?
                <Tooltip
                  showTooltip={showTooltip}
                  toolTipContent={toolTipContent}
                />
              </div>
            )}
          </div>

          <div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">
            Reset value
          </div>
        </div>

        <button
          title="toggle"
          type="button"
          class={`w-12 h-6 flex items-center rounded-full transition-colors duration-100 cursor-pointer ${
            enabled() ? "bg-green-400" : "bg-gray-400"
          }`}
          onClick={() => toggle()}
        >
          <span
            class={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-100 ${
              enabled() ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Switch;
