import { Component, createSignal } from "solid-js";
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import CrossIcon from "./CrossIcon";
import Button from "./Button";

const Parameters: Component<{}> = (props) => {
  const [ruleNo, setRuleNO] = createSignal([]);
  return (
    <div
      // value="parameters"
      class="mt-0 px-5 py-4 h-full overflow-y-auto bg-gradient-to-b from-[#2A2A3A] to-[#232333]"
    >
      <div class="space-y-6">
        <div>
          <label class="text-white text-sm block mb-2">Mode</label>
          <Dropdown /> {/* 01 */}
        </div>

        <div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible">
          <h3 class="text-white text-sm mb-4 flex items-center">
            <span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
            Routing Rules
          </h3>

          <div>

            <div class="flex gap-2 mb-2 items-center">
              <InputField />
              <div class="flex-1">
                <Dropdown /> {/* 02 */}
              </div>
              <button
                title="cross"
                class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <CrossIcon />
              </button>
            </div>
          </div>

          <div>
            <Button title="Add Routing Rule" width="w-full" />
          </div>

          <div class="mt-6">
            <div class="flex items-center mb-2">
              <span class="text-sm text-gray-300 mr-2">
                Convert types where required
              </span>
              {/* <Switch /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
