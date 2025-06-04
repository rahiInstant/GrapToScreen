import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { embeddingNodeDataFormatter } from "./embeddingDataFormatter";

const [embeddingStoreNodeData, setEmbeddingNodeData] = createSignal<
  Record<string, any>
>({});
const { currentFormConfig, formData, setFormData } = useStateContext();
export const embeddingNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setEmbeddingNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedEmbeddingNodeData = embeddingNodeDataFormatter(
    embeddingStoreNodeData(),
    currentFormConfig().id
  );
  console.log(formattedEmbeddingNodeData);
  setFormData({
    ...formData(),
    [currentFormConfig().id]: formattedEmbeddingNodeData,
  });
};
