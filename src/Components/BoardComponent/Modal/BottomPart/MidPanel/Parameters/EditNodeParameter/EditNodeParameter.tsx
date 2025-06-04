import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import Switch from "../../../../Component lib/Switch/Switch";
import DropDownFilter, {
  FilterOption,
} from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DropDownN, {
  DropDownNOption,
} from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import JsonEditor from "../../../../Component lib/JsonEditor/JsonEditor";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import MoveIcon from "../../../../Icons/MoveIcon";
import {
  modeStore,
  optionStoreForJSON,
  optionStoreForManualMapping,
  typeStore,
} from "./EditNodeParameterConfig";
import useStateContext from "../../../../../useStateContext";
import { editNodeDataManager } from "./editNodeDataManager";
import { editNodeDataFormatter } from "./editNodeDataFormatter";

const EditNodeParameter: Component<{}> = (props) => {
  const { currentFormConfig } = useStateContext();
  const [currentMode, setCurrentMode] = createSignal<DropDownNOption>(
    modeStore[0]
  );
  const [field, setField] = createSignal<string[]>([]);
  const [] = createSignal();
  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [options, setOptions] = createSignal<FilterOption[]>([]);
  const { formData, setFormData } = useStateContext();

  onMount(() => {
    setOptions(optionStoreForManualMapping);
  });

  createEffect(() => {
    if (currentMode().value === "Manual Mapping") {
      setSelectedOptions([]);
      setOptions(optionStoreForManualMapping);
    } else {
      setSelectedOptions([]);
      setOptions(optionStoreForJSON);
    }
  });

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const editData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(editData.entries());
    console.log("unformatted data", data);

    const editNodeFormattedData = editNodeDataFormatter(data, currentFormConfig().id);
    console.log("formatted data", editNodeFormattedData);

    setFormData({
      ...formData(),
      EditNodeData: data,
    });
    const customEvent = new CustomEvent("formSubmitEvent", {
      detail: data,
      bubbles: true,
    });
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.dispatchEvent(customEvent);
    }
  };

  return (
    <form class="form" id="editForm" onSubmit={handleOnSubmit}>
      <div>
        <DropDownN
          name="mode"
          title="Mode"
          options={modeStore}
          defaultValue={modeStore[0].value}
          onChange={(selectedOption) => {
            setCurrentMode(selectedOption);
            editNodeDataManager("mode", selectedOption.value);
          }}
        />
        <div class="mt-5">
          {/* field to set */}
          <Show when={currentMode().value === "Manual Mapping"}>
            <div class="label hr-solid-line">Fields to Set</div>
            <div class="flex flex-col gap-6 mt-5">
              <For each={field()}>
                {(item, index) => {
                  return (
                    <div
                      class={`flex gap-1.5 ${
                        index() !== 0
                          ? "border-t pt-6 border-dashed border-[#575555]"
                          : ""
                      }`}
                    >
                      <div class="flex flex-col items-center gap-1">
                        <div
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"
                          title="Drag to move"
                        >
                          <MoveIcon />
                        </div>
                        <div
                          onClick={() => {
                            setField(field().filter((opt, _) => opt !== item));
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                        >
                          <DeleteIcon />
                        </div>
                        <div class="w-0.5 h-full bg-[#36373d] rounded-md"></div>
                      </div>
                      <div class="flex flex-col gap-1.5 w-full">
                        <div class="flex gap-1.5">
                          <div class="flex-1">
                            <DynamicInput
                              placeholder="name"
                              name={`${item}_name`}
                              value=""
                              isArrow
                              onInput={(value) => {
                                editNodeDataManager(`${item}_name`, value);
                              }}
                            />
                          </div>
                          <div class="min-w-[130px]">
                            <DropDownN
                              name={`${item}_type`}
                              options={typeStore}
                              defaultValue={typeStore[0].value}
                              onChange={(selectedOption) => {
                                editNodeDataManager(
                                  `${item}_type`,
                                  selectedOption.value
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <DynamicInput
                            placeholder="value"
                            name={`${item}_value`}
                            value=""
                            isArrow
                            onInput={(value) => {
                              editNodeDataManager(`${item}_value`, value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
            <div
              onClick={() => {
                setField([
                  ...field(),
                  `field_${Math.random().toString(36).substring(2, 8)}`,
                ]);
              }}
              class={`${
                field().length <= 0 ? "h-44" : "h-14 mt-5 "
              } p-4 flex text-center border border-dashed border-[#9c9c9e] rounded-md bg-[#252434] hover:border-[#ffa89d] hover:bg-[#fc7c6b13] cursor-pointer ${
                field().length <= 0 ? "flex-col" : "flex col"
              } items-center justify-center gap-1`}
            >
              <p class="text-[#ddd5d5]">Drag input fields here </p>
              <p class="text-[#9b9494]">or</p>
              <p class="text-[#df4c38]">Add Field</p>
            </div>
          </Show>
          <div class="mt-5">
            <Show when={currentMode().value === "JSON"}>
              <JsonEditor
                name="json_editor"
                placeholder="Enter JSON here"
                value={JSON.stringify(
                  {
                    field_xmynu3: "value1",
                    field_4g2j3k: "value2",
                    field_123456: "value3",
                  },
                  null,
                  2
                )}
                isArrow
                onInput={(value) => {
                  editNodeDataManager("json_editor", value);
                }}
              />
            </Show>
          </div>

          {/* switch */}
          <div class="mt-5">
            <Switch
              name="includeOtherInputFields"
              title="Include Other Input Fields"
              toolTipText="Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')"
              onChange={(state) => {
                editNodeDataManager("includeOtherInputFields", state);
              }}
            />
          </div>
          <div class="mt-5">
            <div class="label hr-solid-line">Options</div>
            {/* Options */}
            <div class="mt-5 flex flex-col gap-6">
              <For each={selectedOptions()}>
                {(item, index) => {
                  return (
                    <div class="flex gap-1.5">
                      <div
                        onClick={() => {
                          setSelectedOptions(
                            selectedOptions().filter((opt) => opt !== item)
                          );
                          setOptions([...options(), item]);
                        }}
                        class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"
                      >
                        <DeleteIcon />
                      </div>
                      <div class="flex-1">
                        <Switch
                          title={item.content.title ?? ""}
                          toolTipText={item.content.toolTipText ?? ""}
                          name={item.content.name}
                          onChange={(state) => {
                            editNodeDataManager(
                              "includeOtherInputFields",
                              state
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
            <div class={`${selectedOptions().length <= 0 ? "" : "mt-5"}`}>
              <DropDownFilter
                name="options_edit_node"
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                dropdownOptions={options}
                setDropdownOptions={setOptions}
                placeholder="Add options"
                onChange={(selectedOptions) => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditNodeParameter;
