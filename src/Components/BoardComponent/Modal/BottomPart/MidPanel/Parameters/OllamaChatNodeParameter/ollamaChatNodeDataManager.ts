import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { ollamaChatNodeDataFormatter } from "./ollamaChatNodeDataFormatter";

const [ollamaChatNodeData, setOllamaChatNodeData] = createSignal<Record<string, any>>({});
const { currentFormConfig, setFormData, formData } = useStateContext();

export const ollamaChatNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setOllamaChatNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedOllamaChatNodeData = ollamaChatNodeDataFormatter(
    ollamaChatNodeData(),
    currentFormConfig().id
  );
  setFormData({
    ...formData(),
    ollamaChat: formattedOllamaChatNodeData,
  });
};
