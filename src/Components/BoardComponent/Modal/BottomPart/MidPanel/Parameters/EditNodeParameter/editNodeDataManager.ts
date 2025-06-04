import { createSignal } from "solid-js";
import { editNodeDataFormatter } from "./editNodeDataFormatter";
import useStateContext from "../../../../../useStateContext";

const [editNodeData, setEditNodeData] = createSignal<Record<string, any>>({});
const { currentFormConfig, formData, setFormData } = useStateContext();

export const editNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setEditNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedEditNodeData = editNodeDataFormatter(
    editNodeData(),
    currentFormConfig().id
  );
  // console.log('formatted',formattedEditNodeData)
  setFormData({
    ...formData(),
    EditNodeData: formattedEditNodeData,
  });
};
