import { createSignal } from "solid-js";

export const switchNodeDataFormatter = (switchNodeData: any, nodeId: string) => {
  const transformRuleData = (data: any) => {
    const [fieldNo, setFieldNo] = createSignal(1);
    return Object.values(
      Object.entries(data)
        .filter(([k, v]) => k.startsWith("rule_"))
        .reduce((acc, [key, value]: [string, string]) => {
          const parts = key.split("_");
          const baseKey = `${parts[0]}_${parts[1]}`;
          const field = parts[2];

          acc[baseKey] ??= {};

          if (!acc[baseKey].id) {
            acc[baseKey].id = fieldNo();
            setFieldNo((prev) => prev + 1);
          }

          if (field === "name") {
            acc[baseKey].leftValue = value;
          } else if (field === "value") {
            acc[baseKey].rightValue = value;
          } 
          else if (field === "type") {
            acc[baseKey].type = value;
          }
          else if (field === "isRename") {
            acc[baseKey].renameOutput = value;
          }
          else if (field === "renameOutput") {
            acc[baseKey].outputKey = value;
          }
          return acc;
        }, {})
    );
  };

  return {
    id: "switchNode1",
    name: "Switch",
    description: "Route items depending on defined expression or rules.",
    type: "SwitchNode",
    parameters: {
      rules: transformRuleData(switchNodeData),
    },
    position: {
      x: -340,
      y: -1040,
    },
    inputs: [
      {
        id: "input",
        name: "Input",
        description: "Data to filter",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "0",
        name: "Output port0",
        description: "Switch output port",
        type: "object",
      },
      {
        id: "1",
        name: "Output port1",
        description: "Switch output port",
        type: "object",
      },
    ],
  };
};
