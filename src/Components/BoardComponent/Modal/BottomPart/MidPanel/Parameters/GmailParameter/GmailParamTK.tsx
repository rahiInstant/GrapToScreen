import {
  Component,
  createEffect,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
import "../parameters.css";
import Switch from "../../../../Component lib/Switch/Switch";
import DeleteIcon from "../../../../Icons/DeleteIcon";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import DropDownMultiple from "../../../../Component lib/DropDown/DropDownMultiple/DropDownMultiple";
import DropDownFilter from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import ButtonSolid from "../../../../Component lib/Button/ButtonSolid";
import ReproductiveDropDown, {
  ReproductiveChildren,
} from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";
import { FilterOption } from "./GmailType";
import { filterStore, optionStore, poolTimesOptions } from "./GmailConfig";
import useStateContext from "../../../../../useStateContext";
import { gmailNodeDataFormatter } from "./gmailNodeDataFormatter";
import {
  gmailNodeDataDecodeHelper,
  gmailNodeDataManager,
} from "./gmailNodeDataManager";
import { gmailNodeDataParser } from "./gmailNodeDataParser";

const GmailNodeParameterTK: Component<{}> = (props) => {
  const [selectedFilter, setSelectedFilter] = createSignal<FilterOption[]>([]);
  const [filters, setFilters] = createSignal<FilterOption[]>([]);
  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [options, setOptions] = createSignal<FilterOption[]>([]);
  const [poolTimes, setPoolTimes] = createSignal<string[]>([]);

  const [mode, setMode] = createSignal<Record<string, ReproductiveChildren[]>>(
    {}
  );

  const { setFormData, formData, currentFormConfig } = useStateContext();
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [parsedData, setParsedData] = createSignal<Record<string, any>>({});
  
  // Add a flag to track if we're initializing from parsed data
  const [isInitializing, setIsInitializing] = createSignal(false);

  onMount(() => {
    setFilters(filterStore);
    setOptions(optionStore);
  });

  // SOLUTION 1: Use a more specific dependency and prevent recursive updates
  createEffect(() => {
    const configId = currentFormConfig().id;
    
    // Only parse if we're not currently initializing and config ID changed
    if (!isInitializing()) {
      setIsInitializing(true);
      
      setParsedData({});
      setMode({});
      
      const data = gmailNodeDataParser(configId);
      if (data && data.poolTimes) {
        // Only update poolTimes if they're different to prevent loops
        const currentPoolTimes = poolTimes();
        const newPoolTimes = data.poolTimes;
        
        if (JSON.stringify(currentPoolTimes) !== JSON.stringify(newPoolTimes)) {
          setPoolTimes(newPoolTimes);
        }
        
        setParsedData(data);
      }
      
      setIsInitializing(false);
    }
  });

  const dataHandler = (fieldName: string, data: any) => {
    // Prevent data handler from running during initialization
    if (isInitializing()) return;
    
    setSubmittedData((prev) => ({
      ...prev,
      [fieldName]: data,
    }));

    const formattedGmailNodeData = gmailNodeDataFormatter(
      submittedData(),
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedGmailNodeData,
    });

    console.log(formData());
  };

  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const gmailData = new FormData(e.target as HTMLFormElement);
    let data = {
      ...Object.fromEntries(gmailData.entries()),
      labelNamesOrIds: gmailData.getAll("labelNamesOrIds"),
    };
    console.log("unformatted data", data);

    const nodeData = gmailNodeDataFormatter(data, currentFormConfig()?.id);

    setFormData({
      ...formData(),
      GmailReader: nodeData,
    });

    console.log("formattedData", nodeData);

    const customEvent = new CustomEvent("RIN", {
      detail: data,
      bubbles: true,
    });
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.dispatchEvent(customEvent);
    }
  };

  // SOLUTION 2: Separate the add pool time logic to prevent interference
  const addPoolTime = () => {
    const newPoolTimeId = `poolTime_${Math.random().toString(36).substring(2, 8)}`;
    const updatedPoolTimes = [...poolTimes(), newPoolTimeId];
    
    setPoolTimes(updatedPoolTimes);
    
    // Update the form data directly without triggering the parser
    dataHandler("poolTimes", updatedPoolTimes);
  };

  const removePoolTime = (itemToRemove: string) => {
    const updatedPoolTimes = poolTimes().filter((i) => i !== itemToRemove);
    const newMode = { ...mode() };
    delete newMode[itemToRemove];
    
    setPoolTimes(updatedPoolTimes);
    setMode(newMode);
    
    // Update the form data
    dataHandler("poolTimes", updatedPoolTimes);
  };

  return (
    <div>
      <form class="form" id="gmail-triggerForm" onSubmit={handleOnSubmit}>
        <div class="space-y-5">
          <DependentDropDown
            name="credential"
            title="Credential to connect with"
            placeholder="Create credential..."
          />
          <div>
            <div class="label hr-solid-line">Pool Times</div>
            <div class="mt-5">
              {poolTimes().length <= 0 && (
                <div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">
                  Currently no items exist
                </div>
              )}
              <For each={poolTimes()}>
                {(item, index) => {
                  return (
                    <div
                      class={`mb-10 flex flex-row gap-1.5 items-top group ${
                        index() !== 0
                          ? "border-t border-dashed border-[#727171] pt-3"
                          : ""
                      }`}
                    >
                      <div class="pt-9">
                        <div
                          onClick={() => removePoolTime(item)}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                      <div class="w-full">
                        <ReproductiveDropDown
                          name={item}
                          defaultValue={poolTimesOptions[0].value}
                          options={poolTimesOptions}
                          title="Mode"
                          toolTipText="How often to trigger."
                          onChange={(selectedOption) => {
                            setMode((prev) => {
                              const newMode = { ...prev };
                              newMode[item] = selectedOption.children ?? [];
                              return newMode;
                            });

                            dataHandler(item, selectedOption.value);
                          }}
                        />
                        <Show when={mode()[item]}>
                          <div class={`space-y-4 mt-5`}>
                            <For each={mode()[item]}>
                              {(child, index) => {
                                if (child.type === "input") {
                                  return (
                                    <DynamicInput
                                      name={`${item}_${child.title}`}
                                      title={child.title}
                                      toolTipText={child.toolTipText}
                                      isArrow
                                      value={child.value ?? ""}
                                      onInput={(value, event) => {
                                        dataHandler(
                                          `${item}_${child.title}`,
                                          value
                                        );
                                      }}
                                    />
                                  );
                                } else if (child.type === "dropdownN") {
                                  return (
                                    <DropDownN
                                      name={`${item}_${child.title}`}
                                      title={child.title}
                                      options={child.options ?? []}
                                      defaultValue={child.options?.[0]?.value}
                                      toolTipText={child.toolTipText}
                                      onChange={(selectedOption) => {
                                        dataHandler(
                                          `${item}_${child.title}`,
                                          selectedOption.value
                                        );
                                      }}
                                    />
                                  );
                                }
                              }}
                            </For>
                          </div>
                        </Show>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
            <ButtonSolid
              onClick={addPoolTime}
              label="Add Pool Time"
            />
          </div>
          <div>
            <DropDownN
              name="Event"
              title="Event"
              defaultValue="Message received"
              options={[
                { label: "Message received", value: "Message received" },
              ]}
              onChange={(selectedOption) => {
                dataHandler("Event", selectedOption.value);
              }}
            />
          </div>
          <div>
            <Switch
              title="Simplify"
              name="simplify"
              checked={parsedData()["simplify"] ?? false}
              toolTipText="Whether to return a simplified version of the response instead of the raw data."
              onChange={(state) => {
                dataHandler("simplify", state);
              }}
            />
          </div>
          <div>
            <div class="label hr-solid-line">Filters</div>
            <div class="space-y-6 mt-5">
              <For each={selectedFilter()}>
                {(item: FilterOption, index) => {
                  if (item.content.type === "switch") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <Switch
                          name={item.content.name}
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          onChange={(state) => {
                            dataHandler(item.content.name, state);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dynamicInput") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DynamicInput
                          name={item.content.name}
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          isArrow
                          footNote={item.content.footNote}
                          placeholder={item.content.placeholder ?? ""}
                          onInput={(value) => {
                            dataHandler(item.content.name, value);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dropdownMultiple") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DropDownMultiple
                          name={item.content.name}
                          title={item.content.title}
                          options={item.content.options}
                          toolTipText={item.content.toolTipText}
                          footNote={item.content.footNote}
                          onChange={(selectedOptions) => {
                            dataHandler(
                              item.content.name,
                              selectedOptions.map((opt) => opt.value)
                            );
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dropdownN") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedFilter().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedFilter(newSelectedOption);
                            setFilters([...filters(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DropDownN
                          placeholder={item.content.options[0].label}
                          name={item.content.name}
                          title={item.content.title}
                          options={item.content.options}
                          toolTipText={item.content.toolTipText}
                          footNote={item.content.footNote}
                          onChange={(selectedOption) => {
                            dataHandler(
                              item.content.name,
                              selectedOption.value
                            );
                          }}
                        />
                      </div>
                    );
                  }
                }}
              </For>
            </div>

            <div class="mt-6">
              <DropDownFilter
                name="filter"
                dropdownOptions={filters}
                setDropdownOptions={setFilters}
                selectedOptions={selectedFilter}
                setSelectedOptions={setSelectedFilter}
                placeholder="Add filter"
                onChange={(item) => {}}
              />
            </div>
          </div>
          <div>
            <div class="label hr-solid-line">Options</div>
            <div class="space-y-6 mt-5">
              <For each={selectedOptions()}>
                {(item: FilterOption, index) => {
                  if (item.content.type === "switch") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <Switch
                          name={item.content.name}
                          title={item.content.title}
                          toolTipText={item.content.toolTipValue}
                          onChange={(state) => {
                            dataHandler(item.content.name, state);
                          }}
                        />
                      </div>
                    );
                  } else if (item.content.type === "dynamicInput") {
                    return (
                      <div class="group flex items-start gap-1.5 w-full">
                        <div
                          onClick={() => {
                            const newSelectedOption = selectedOptions().filter(
                              (opt) => opt.value !== item.value
                            );
                            setSelectedOptions(newSelectedOption);
                            setOptions([...options(), item]);
                          }}
                          class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                        <DynamicInput
                          name={item.content.name}
                          title={item.content.title}
                          toolTipText={item.content.toolTipText}
                          isArrow
                          footNote={item.content.footNote}
                          value={item.content.value ?? ""}
                          onInput={(value) => {
                            dataHandler(item.content.name, value);
                          }}
                        />
                      </div>
                    );
                  }
                }}
              </For>
            </div>

            <div class="mt-6">
              <DropDownFilter
                name="options_gmail_node"
                dropdownOptions={options}
                setDropdownOptions={setOptions}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                placeholder="Add Options"
                onChange={(item) => {}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GmailNodeParameterTK;