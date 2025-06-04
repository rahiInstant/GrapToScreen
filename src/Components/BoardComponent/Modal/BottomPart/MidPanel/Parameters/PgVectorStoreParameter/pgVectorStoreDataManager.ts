import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { pgVectorStoreNodeDataFormatter } from "./pgVectorStoreDataFormatter";

const [pgVectorStoreNodeData, setPgVectorStoreNodeData] = createSignal<
  Record<string, any>
>({});
const { currentFormConfig, formData, setFormData } = useStateContext();
export const pgVectorStoreNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setPgVectorStoreNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedPgVectorStoreNodeData = pgVectorStoreNodeDataFormatter(
    pgVectorStoreNodeData(),
    currentFormConfig().id
  );
  console.log(formattedPgVectorStoreNodeData);
  setFormData({
    ...formData(),
    [currentFormConfig().id]: formattedPgVectorStoreNodeData,
  });
};
