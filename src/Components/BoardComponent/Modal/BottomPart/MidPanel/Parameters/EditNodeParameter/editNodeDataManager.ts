import { createSignal } from "solid-js";
import { editNodeDataEncoder } from "./editNodeDataEncoder";
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
  const formattedEditNodeData = editNodeDataEncoder(
    editNodeData(),
    currentFormConfig().id
  );
  // console.log('formatted',formattedEditNodeData)
  setFormData({
    ...formData(),
    EditNodeData: formattedEditNodeData,
  });
};
