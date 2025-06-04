import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { vectorStoreNodeDataFormatter } from "./vectorStoreDataFormatter";

const [vectorStoreNodeData, setVectorStoreNodeData] = createSignal<
  Record<string, any>
>({});
const { currentFormConfig, formData, setFormData } = useStateContext();
export const vectorStoreNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setVectorStoreNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedVectorStoreNodeData = vectorStoreNodeDataFormatter(
    vectorStoreNodeData(),
    currentFormConfig().id
  );
  console.log(formattedVectorStoreNodeData);
  setFormData({
    ...formData(),
    [currentFormConfig().id]: formattedVectorStoreNodeData,
  });
};
