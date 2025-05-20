import { Component, createSignal } from "solid-js";
import Tooltip from "./Tooltip";

const Switch: Component<{
  switchText: string;
  toolTipContent: {
    label: string;
    text: string;
  } | null;
  name: string;
  onChange?: (state: boolean) => void;
}> = ({ switchText, toolTipContent, onChange, name }) => {
  const [showTooltip, setShowTooltip] = createSignal(false);

  const handleChange = (e: Event) => {
    onChange?.((e.target as HTMLInputElement).checked);
  };

  return (
    <div class="text-white bg-[#1e1e2f] p-2 rounded">
      <div class="flex flex-col gap-2">
        {/* Label + Tooltip */}
        <div class="flex items-center justify-between">
          <div class="text-sm flex items-center gap-1 group">
            <div>{switchText}</div>
            {toolTipContent && (
              <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                class="relative w-3 h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto"
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

        {/* Toggle with Tailwind */}
        <label class="relative inline-block w-12 h-6">
          <input
          name={name}
            title="switch"
            type="checkbox"
            class="sr-only peer"
            onChange={handleChange}
          />
          <div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div>
          <div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6"></div>
        </label>
      </div>
    </div>
  );
};

export default Switch;
