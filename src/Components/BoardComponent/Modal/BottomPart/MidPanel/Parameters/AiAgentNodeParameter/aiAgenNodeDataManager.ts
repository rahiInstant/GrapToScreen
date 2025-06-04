import { createSignal } from "solid-js";
import useStateContext from "../../../../../useStateContext";
import { aiAgentNodeDataFormatter } from "./aiAgentNodeDataFormatter";

const [aiAgentNodeData, setAiAgentNodeData] = createSignal<Record<string, any>>(
  {}
);
const { currentFormConfig, formData, setFormData } = useStateContext();
export const aiAgentNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {
  setAiAgentNodeData((prev) => ({
    ...prev,
    [fieldName]: data,
  }));
  const formattedAiAgentNodeData = aiAgentNodeDataFormatter(
    aiAgentNodeData(),
    currentFormConfig().id
  );

  setFormData({
    ...formData(),
    AiAgent: formattedAiAgentNodeData,
  });
};
