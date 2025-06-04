import { createSignal, createMemo, createEffect } from "solid-js";
import { FilterOption } from "./GmailType";
import { filterStore, optionStore, poolTimesOptions } from "./GmailConfig";
import { gmailNodeDataFormatter } from "./gmailNodeDataFormatter";
import useStateContext from "../../../../../useStateContext";
import { ReproductiveChildren } from "../../../../Component lib/DropDown/ReproductiveDropDown/ReproductiveDropDown";

export default function useGmailParameterState(nodeId: string) {
  const { formData, setFormData, previousFormConfig, currentFormConfig } =
    useStateContext();

  const [poolTimes, setPoolTimes] = createSignal<string[]>([]);
  const [mode, setMode] = createSignal<Record<string, string>>({});
  const [modeChild, setModeChild] = createSignal<Record<string, any>>({});
  const [modeChildValue, setModeChildValue] = createSignal<
    Record<string, string | number | boolean>
  >({});
  const [selectedOptions, setSelectedOptions] = createSignal<FilterOption[]>(
    []
  );
  const [selectedFilter, setSelectedFilter] = createSignal<FilterOption[]>([]);
  const [submittedData, setSubmittedData] = createSignal<Record<string, any>>(
    {}
  );
  const [previousData, setPreviousData] = createSignal<Record<string, any>>({});
  const [parsedData, setParsedData] = createSignal<Record<string, any>>({});

  const triggerKey = new Set();

  const reset = () => {
    setParsedData({});
    setSubmittedData({});
    setPoolTimes([]);
    setMode({});
    setModeChild({});
    // setSelectedFilter([]);
    // setSelectedOptions([]);
    setPreviousData({});
  };

  const dataHandler = (fieldName: string, data: any) => {
    // const isKeyExistInPreviousData = previousData()[fieldName];
    console.log("from data handler raw >>>> ", fieldName, " >>>>> ", data);
    if (fieldName in previousData()) {
      if (previousData()[fieldName] === data) {
        console.log(
          "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
          previousData()
        );
        return;
      } else if (previousData()[fieldName] !== data) {
        console.log(
          "from data handler, 2,>>> key unchanged but data changed",
          previousData()
        );
        console.log(
          "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
          submittedData()
        );
        setSubmittedData((prev) => ({
          ...prev,
          [fieldName]: data,
        }));
        console.log(
          "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
          submittedData()
        );

        const formatted = gmailNodeDataFormatter(
          submittedData(),
          currentFormConfig().id
        );
        console.log(
          "from data handler:::: >> formatted key >>>  unchanged but data changed",
          formatted
        );

        setFormData({
          ...formData(),
          [currentFormConfig().id]: formatted,
        });
        console.log(
          "from data handler:::: >> formData() >>> key unchanged but data changed",
          formData()
        );
      }
    } else {
      console.log(
        "from data handler, 2 >>> both key and data changed",
        previousData()
      );
      console.log(
        "from data handler:::: >> submitted data 1  >>> both key and data changed",
        submittedData()
      );
      setSubmittedData((prev) => ({
        ...prev,
        [fieldName]: data,
      }));
      console.log(
        "from data handler:::: >> submitted data 2 >>> both key and data changed",
        submittedData()
      );

      const formatted = gmailNodeDataFormatter(
        submittedData(),
        currentFormConfig().id
      );
      console.log(
        "from data handler:::: >> formatted >>> both key and data changed",
        formatted
      );

      setFormData({
        ...formData(),
        [currentFormConfig().id]: formatted,
      });
      console.log(
        "from data handler:::: >> formData() >>> both key and data changed",
        formData()
      );
    }
  };


  const decode = (data: any) => {
    if (data) {
      const { parameters } = data;
      const poolTimes = parameters.pollTimes;
      const parsedPoolTimes: string[] = [];
      const parsedModes: Record<string, string> = {};
      const parseModesData: Record<string, string | number | boolean> = {};

      if (poolTimes) {
        poolTimes.forEach((item: any) => {
          const pollTimeId = `poolTime_${Math.random()
            .toString(36)
            .substring(2, 8)}`;
          parsedPoolTimes.push(pollTimeId);
          parsedModes[pollTimeId] = item.mode;
          parseModesData[pollTimeId] = item.mode;


          // if(item.hour) {
          //   parseModesData[`${pollTimeId}_Hour`] = item.hour;
          // } 
          // if(item.minute) {
          //   parseModesData[`${pollTimeId}_Minute`] = item.minute;

          // }
          // if(item.dayOfMonth) {
          //   parseModesData[`${pollTimeId}_Day of Month`] = item.dayOfMonth;
          // }
          // if(item.weekday) {
          //   parseModesData[`${pollTimeId}_Weekday`] = item.weekday;
          // }

          if ("hour" in item) {
            parseModesData[`${pollTimeId}_Hour`] = item["hour"];
          }
          if ("minute" in item) {
            parseModesData[`${pollTimeId}_Minute`] = item["minute"];
          }
          if ("dayOfMonth" in item) {
            parseModesData[`${pollTimeId}_Day of Month`] = item["dayOfMonth"];
          }
          if ("weekday" in item) {
            parseModesData[`${pollTimeId}_Weekday`] = item["weekday"];
          }
          if ("value" in item) {
            parseModesData[`${pollTimeId}_Value`] = item["value"];
          }
          if ("unit" in item) {
            parseModesData[`${pollTimeId}_Unit`] = item["unit"];
          }
          if ("cronExpression" in item) {
            parseModesData[`${pollTimeId}_Cron Expression`] =
              item["cronExpression"];
          }
        });
        // console.log(parsedModes);
        // console.log(parsedPoolTimes);
      }

      return {
        simplify: parameters.simple,
        poolTimes: parsedPoolTimes,
        modes: parsedModes,
        modesData: parseModesData,
      };
    }
  };

  createEffect(() => {
    // const previousFormId = previousFormConfig().id;
    // if (previousFormId) {
    //   if (previousFormId !== nodeId) {
    //     reset();
    //   }
    // }
    // if(triggerKey.has(nodeId)) {
    //   reset()
    // }
    // console.log(
    //   "check has trigger",
    //   triggerKey.has(currentFormConfig().id),
    //   triggerKey
    // );
    console.log(
      currentFormConfig().id,
      "  >  node data  >  ",
      "\n",
      poolTimes(),
      "\n",
      mode()
    );
    console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>");
    if (!triggerKey.has(currentFormConfig().id)) {
      triggerKey.clear();
      triggerKey.add(currentFormConfig().id);
      const data = formData()[currentFormConfig().id];
      console.log("data1", data);
      if (!data) {
        reset();
        return;
      }
      reset()
      // setPreviousData({});
      // setPoolTimes([]);
      // setMode({});
      // setModeChild({});
      // setSubmittedData({});
      // setParsedData({});
      // console.log("data2", data);
      const decoded = decode(data);
      if (decoded) {
        console.log(
          "decoded from observer, >>>>>> ",
          currentFormConfig().id,
          decoded?.modes,
          decoded.modesData
        );
        setPreviousData((prev) => ({
          ...prev,
          simplify: decoded.simplify,
          ...decoded.modesData,
        }));
        setParsedData(decoded ?? {});
        setPoolTimes(decoded?.poolTimes ?? []);
        setMode(decoded?.modes ?? {});
      }
      // setSelectedFilter(decoded.selectedFilter);
      // setSelectedOptions(decoded.selectedOptions);
    }
  });

  return {
    poolTimes,
    setPoolTimes,
    mode,
    setMode,
    selectedOptions,
    setSelectedOptions,
    selectedFilter,
    setSelectedFilter,
    submittedData,
    parsedData,
    dataHandler,
    modeChild,
    setModeChild,
  };
}
