import { Component, createSignal, For } from "solid-js";
import Dropdown from "../Dropdown";
import style from "../style.module.css";
import MoveIcon from "../../../Icons/MoveIcon";
import DeleteIcon from "../../../Icons/DeleteIcon";
import InputField from "../InputField";
import CrossIcon from "../CrossIcon";
import Button from "../Button";
import Switch from "../Switch";
import useStateContext from "../../../../useStateContext";
import CredentialDropDown from "../CredentialDropDown";

const GmailNodeParameter: Component<{}> = (props) => {
  const { setIsModalOpen2 } = useStateContext();
  const [ruleNo, setRuleNo] = createSignal([1]);
  const [draggedIndex, setDraggedIndex] = createSignal<number | null>(null);
  const [paramData, setParamData] = createSignal<
    Array<{
      key: string;
      renameOutput: boolean;
    }>
  >([]);
  const [getOption, setOption] = createSignal<
    Array<{ label: string; value: string; description?: string }>
  >([
    // {
    //   label: "fallback output",
    //   value: "fallback output",
    //   description: "",
    // },
    // {
    //   label: "ignore case",
    //   value: "ignore case",
    //   description: "",
    // },
    // {
    //   label: "send data to all matching outputs",
    //   value: "send data to all matching outputs",
    //   description: "",
    // },
  ]);
  const [activeOption, setActiveOption] = createSignal<
    Array<{ label: string; value: string; description?: string }>
  >([]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    const from = draggedIndex();
    const to = index;

    if (from === null || from === to) return;

    const items = [...ruleNo()];
    const [movedItem] = items.splice(from, 1);
    items.splice(to, 0, movedItem);

    setRuleNo(items);
    setDraggedIndex(to); // Update new index as the dragged item moves
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  return (
    <div>
      <div class="space-y-6">
        <div>
          <label class="text-white text-sm block mb-2">Mode</label>
          <CredentialDropDown/>
        </div>

        <div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible">
          <h3 class="text-white text-sm mb-4 flex items-center">
            <span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
            Field to set
          </h3>

          <div class="routing-rules-wrapper space-y-2 w-full">
            <For each={ruleNo()}>
              {(item, index) => {
                setParamData([
                  ...paramData(),
                  { key: `key${index}`, renameOutput: false },
                ]);
                return (
                  <div
                    id=""
                    classList={{
                      [style.ruleItem]: true,
                      dragging: draggedIndex() === index(),
                    }}
                    class={`transition-all duration-200 w-full ${
                      index() !== 0
                        ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                        : ""
                    }`}
                    draggable="true"
                    onDragStart={() => handleDragStart(index())}
                    onDragEnter={() => handleDragEnter(index())}
                    onDragEnd={handleDragEnd}
                  >
                    <div class="flex flex-row gap-1.5 ">
                      <div class="flex flex-col items-center gap-1">
                        <div
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"
                          title="Drag to move"
                        >
                          <MoveIcon />
                        </div>
                        <div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md">
                          <DeleteIcon />
                        </div>
                        <div class="w-0.5 h-full bg-[#36373d] rounded-md"></div>
                      </div>

                      <div class="w-full">
                        <div class="flex gap-2 mb-2 items-center">
                          <InputField />
                          <div class="flex-1">
                            <Dropdown
                              options={[
                                { label: "String", value: "String" },
                                { label: "Number", value: "Number" },
                                { label: "Array", value: "Array" },
                                { label: "Boolean", value: "Boolean" },
                                { label: "Object", value: "Object" },
                              ]}
                            />
                          </div>
                          <button
                            title="cross"
                            class="text-gray-400 cursor-pointer hover:text-white hover:bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                          >
                            <CrossIcon />
                          </button>
                        </div>
                        <div>
                          <InputField />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>

        <div
          onClick={() => {
            setRuleNo([...ruleNo(), ruleNo().length + 1]);
          }}
        >
          <Button title="Add Routing Rule" width="w-full" />
        </div>

        <Switch
          switchText="Include other input fields."
          toolTipContent={{
            label: "",
            text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
          }}
        />
        <div>
          <div class="text-[#c2c4c7] text-sm">Options</div>
          <hr class="border-[#414142]" />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default GmailNodeParameter;
