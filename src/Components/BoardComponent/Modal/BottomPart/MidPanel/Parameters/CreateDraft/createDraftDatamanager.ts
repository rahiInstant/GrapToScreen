import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { createDraftNodeDataFormatter } from "./createDraftDataFormatter";

const [createDraftNodeData, setCreateDraftNodeData] = createSignal<Record<string, any>>(
  {}
);
const { currentFormConfig, formData, setFormData } = useStateContext();
export const createDraftDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setCreateDraftNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedCreateDraftNodeData = createDraftNodeDataFormatter(
    createDraftNodeData(),
    currentFormConfig().id
  );
console.log(formattedCreateDraftNodeData)
  setFormData({
    ...formData(),
    createDraft: formattedCreateDraftNodeData,
  });
};
