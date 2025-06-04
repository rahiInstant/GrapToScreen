import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { switchNodeDataFormatter } from "./switchNodeDataFormatter";

const [switchNodeData, setSwitchNodeData] = createSignal<Record<string, any>>(
  {}
);
const { currentFormConfig, setFormData, formData } = useStateContext();

export const switchNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setSwitchNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));

  const formattedSwitchData = switchNodeDataFormatter(
    switchNodeData(),
    currentFormConfig().id
  );
  setFormData({
    ...formData(),
    switchNode: formattedSwitchData,
  });
  console.log(formData());
};
