import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import Dropdown from "../Dropdown";
import style from "../style.module.css";
import Button from "../Button";
import Switch from "../Switch";
import useStateContext from "../../../../useStateContext";
import CredentialDropDown from "../CredentialDropDown";
import DynamicDropdown from "../DynamicDropdown";
import MoveIcon from "../../../Icons/MoveIcon";
import DeleteIcon from "../../../Icons/DeleteIcon";
import InputField from "../InputField";
import CrossIcon from "../CrossIcon";
import FilteredDropDown from "../FilteredDropdown";

const GmailNodeParameter: Component<{}> = (props) => {
  const { setFormData, formConfig, formData } = useStateContext();
  const [filter, setFilter] = createSignal<string[]>([]);
  const [options, setOptions] = createSignal<string[]>([]);
  const [ruleNo, setRuleNo] = createSignal([1]);
  const [draggedIndex, setDraggedIndex] = createSignal<number | null>(null);
  const [paramData, setParamData] = createSignal<
    Array<{
      key: string;
      renameOutput: boolean;
    }>
  >([]);

  const [gmailNodeData, setGmailNodeData] = createSignal<
    Array<{
      mode: string;
    }>
  >([
    {
      mode: "Every minute",
    },
  ]);

  const [getOption, setOption] = createSignal<
    Array<{ label: string; value: string; description?: string }>
  >([]);

  const [activeOption, setActiveOption] = createSignal<
    Array<{ label: string; value: string; description?: string }>
  >([]);

  createEffect(() => {
    setParamData(
      ruleNo().map((_, i) => ({
        key: `key${i}`,
        renameOutput: false,
      }))
    );
  });

  createEffect(() => {
    console.log(formData());
  });

  const updateFormData = (newData: { mode: string }[]) => {
    const id = formConfig().id;
    const prev = formData();
    const current = prev[id]?.items;

    if (JSON.stringify(current) !== JSON.stringify(newData)) {
      setFormData({
        ...prev,
        [id]: {
          ...prev[id],
          poolTime: newData,
        },
      });
    }
  };
  onMount(() => {
    updateFormData(gmailNodeData());
  });

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
    setDraggedIndex(to);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  return (
    <div>
      <form
        id="gmailParam"
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(e.target);
          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());
          const customEvent = new CustomEvent("formSubmitEvent", {
            detail: data,
            bubbles: true,
          });
          const submitBtn = document.getElementById('submitBtn')
          if(submitBtn) {
            submitBtn.dispatchEvent(customEvent)
          }
        }}
      >
        <div class="space-y-6">
          <div>
            <label class="text-white text-sm block mb-2">Mode</label>
            <CredentialDropDown />
          </div>

          <div class="bg-[#1E1E2E]/40 p-4 rounded-lg border border-gray-700/30 overflow-visible">
            <h3 class="text-white text-sm mb-4 flex items-center">
              <span class="mr-2 w-1 h-5 bg-purple-500 rounded-full inline-block"></span>
              Field to set
            </h3>

            <div class="routing-rules-wrapper space-y-2 w-full">
              <For each={ruleNo()}>
                {(item, index) => {
                  // setParamData([
                  //   ...paramData(),
                  //   { key: `key${index}`, renameOutput: false },
                  // ]);
                  return (
                    <div
                      id=""
                      classList={{
                        [style.ruleItem]: true,
                        dragging: draggedIndex() === index(),
                      }}
                      class={`transition-all duration-200 w-full flex gap-2 ${
                        index() !== 0
                          ? "border-t border-dashed border-[#4e4e52] pt-3 mt-3"
                          : ""
                      }`}
                      draggable="true"
                      onDragStart={() => handleDragStart(index())}
                      onDragEnter={() => handleDragEnter(index())}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
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
                      </div>
                      <div class="w-full">
                        <Dropdown
                          name={`poolTimeCondition_${index()}`}
                          options={[
                            {
                              label: "Every minute",
                              value: "Every minute",
                            },
                            {
                              label: "Every hour",
                              value: "Every hour",
                            },
                          ]}
                        />
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
            <Button title="Add poll time" width="w-full" />
          </div>

          <Dropdown
            name="triggerType"
            options={[
              {
                label: "Message Received",
                value: "Message Received",
              },
            ]}
            onOption={(option) => {
              setFormData({
                ...formData(),
                [formConfig().id]: {
                  ...formData()[formConfig().id],
                  triggerType: option.value,
                },
              });
              // setFormData(formConfig().id, "triggerType", option.value);
            }}
          />

          <Switch
            name="simplify"
            switchText="Simplify"
            toolTipContent={{
              label: "",
              text: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false`,
            }}
            onChange={(state) => {
              setFormData({
                ...formData(),
                [formConfig().id]: {
                  ...formData()[formConfig().id],
                  simplify: state,
                },
              });
              // setFormData(formConfig().id, "simplify", state);
            }}
          />

          <div>
            <div class="text-[#c2c4c7] text-sm">Filter</div>
            <hr class="border-[#414142] mb-2" />
            <Show when={filter().includes("includeSpamTrash")}>
              <Switch
                name="includeSpamTrash"
                switchText="Include Spam and Trash"
                toolTipContent={{
                  label: "",
                  text: "",
                }}
                onChange={(state) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      includeSpamTrash: state,
                    },
                  });
                }}
              />
            </Show>
            <Show when={filter().includes("includeDrafts")}>
              <Switch
                name="includeDrafts"
                switchText="include drafts"
                toolTipContent={{
                  label: "",
                  text: "",
                }}
                onChange={(state) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      includeDrafts: state,
                    },
                  });
                }}
              />
            </Show>
            <Show when={filter().includes("labelNamesOrIds")}>
              <FilteredDropDown
                name="labelNamesOrIds"
                options={[
                  {
                    label: "INBOX",
                    value: "INBOX",
                  },
                  {
                    label: "UNREAD",
                    value: "UNREAD",
                  },
                  {
                    label: "STARRED",
                    value: "STARRED",
                  },
                  {
                    label: "IMPORTANT",
                    value: "IMPORTANT",
                  },
                ]}
                onOptionChange={(options) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      labelNamesOrIds: options.map((item) => item.value),
                    },
                  });
                }}
              />
            </Show>
            <Show when={filter().includes("search")}>
              <InputField
                name="search"
                onInput={(value) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      search: value,
                    },
                  });
                }}
              />
            </Show>
            <Show when={filter().includes("readStatus")}>
              <Dropdown
                name="readStatus"
                options={[
                  {
                    label: "unread and read email",
                    value: "unread and read email",
                  },
                  {
                    label: "read email only",
                    value: "read email only",
                  },
                  {
                    label: "read emails only",
                    value: "read emails only",
                  },
                ]}
                onOption={(option) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      readStatus: option.value,
                    },
                  });
                }}
              />
            </Show>
            <Show when={filter().includes("sender")}>
              <InputField
                name="sender"
                onInput={(value) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      sender: value,
                    },
                  });
                }}
              />
            </Show>

            <div class="mt-2">
              <FilteredDropDown
                name="filter"
                options={[
                  {
                    label: "Include Spam and Trash",
                    value: "includeSpamTrash",
                  },
                  {
                    label: "Include Drafts",
                    value: "includeDrafts",
                  },
                  {
                    label: "Label Names or IDs",
                    value: "labelNamesOrIds",
                  },
                  {
                    label: "Search",
                    value: "search",
                  },
                  {
                    label: "Read Status",
                    value: "readStatus",
                  },
                  {
                    label: "Sender",
                    value: "sender",
                  },
                ]}
                onOptionChange={(options) => {
                  options.map((item) =>
                    setFilter((prev) => [...prev, item.value])
                  );
                }}
              />
            </div>
          </div>
          <div>
            <div class="text-[#c2c4c7] text-sm">Options</div>
            <hr class="border-[#414142]" />
            <Show when={options().includes("attachmentsPrefix")}>
              <InputField
                name="attachmentsPrefix"
                onInput={(value) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      attachmentsPrefix: value,
                    },
                  });
                }}
              />
            </Show>
            <Show when={options().includes("downloadAttachments")}>
              <Switch
                name="downloadAttachments"
                switchText="Download attachments"
                toolTipContent={{
                  label: "",
                  text: "",
                }}
                onChange={(state) => {
                  setFormData({
                    ...formData(),
                    [formConfig().id]: {
                      ...formData()[formConfig().id],
                      downloadAttachments: state,
                    },
                  });
                }}
              />
            </Show>
            <div>
              <FilteredDropDown
                name="options"
                options={[
                  {
                    label: "Attachments prefix",
                    value: "attachmentsPrefix",
                  },
                  {
                    label: "Download attachments",
                    value: "downloadAttachments",
                  },
                ]}
                onOptionChange={(options) => {
                  options.map((item) =>
                    setOptions((prev) => [...prev, item.value])
                  );
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GmailNodeParameter;
