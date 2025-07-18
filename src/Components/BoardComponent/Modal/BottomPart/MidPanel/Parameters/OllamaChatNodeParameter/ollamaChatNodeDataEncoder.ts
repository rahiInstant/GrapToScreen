import useStateContext from "../../../../../useStateContext";

export const ollamaChatNodeDataEncoder = (
  ollamaChatNodeData: any,
  nodeId: string
) => {
  const { nodes } = useStateContext();
  const extractParameterByKey = (keys: string[], booleanKeys: string[]) => {
    return keys.reduce((acc: Record<string, string | boolean>, key: string) => {
      if (key in ollamaChatNodeData) {
        if (booleanKeys.includes(key)) {
          acc[key] = !!ollamaChatNodeData[key];
        } else {
          acc[key] = ollamaChatNodeData[key];
        }
      }
      return acc;
    }, {} as Record<string, string | boolean>);
  };

  const transformedOptionData = () => {
    const filterKey = [
      "temperature",
      "topK",
      "topP",
      "frequencyPenalty",
      "keepAlive",
      "lowVram",
      "mainGpu",
      "numBatch",
      "numCtx",
      "numGpu",
      "numThread",
      "penalizeNewline",
      "presencePenalty",
      "repeatPenalty",
      "useMLock",
      "useMMap",
      "vocabOnly",
      "format",
    ];
    return extractParameterByKey(filterKey, [
      "penalizeNewline",
      "vocabOnly",
      "useMMap",
      "useMLock",
      "lowVram",
    ]);
  };

  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return {
        x: Math.trunc(node.currPosition.get().x),
        y: Math.trunc(node.currPosition.get().y),
      };
    }
  };

  return {
    id: nodeId,
    name: "Ollama Chat Model",
    description: "Ollama Chat Model",
    type: "Ollama",
    parameters: {
      credentials: {
        id: "d0rvblltcbtlha4jl3n0",
        name: "Ollama account",
        provider: "ollama",
        ctype: "url",
      },
      model: ollamaChatNodeData?.model || "",
      options: transformedOptionData(),
    },
    // numPredict: ollamaChatNodeData,
    position: getNodePosition(),
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "ollma_output",
        description: "ollama output port",
        type: "object",
      },
    ],
  };
};
