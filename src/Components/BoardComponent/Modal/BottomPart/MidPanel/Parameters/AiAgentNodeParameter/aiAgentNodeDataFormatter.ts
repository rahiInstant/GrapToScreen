export const aiAgentNodeDataFormatter = (
  aiAgentNodeData: any,
  nodeId: string
) => {
  return {
    id: nodeId,
    name: "AI Agent",
    description: "AI Agent",
    type: "LangChainAgent",
    parameters: {
      agent: aiAgentNodeData?.agent,
      promptType: aiAgentNodeData?.sourceForPrompt,
      text:
        aiAgentNodeData?.promptDefineBelow ||
        aiAgentNodeData?.promptConnectedChatTriggerNode ||
        "",
      options: {
        systemMessage: aiAgentNodeData?.systemMessage || "",
        maxIterations: aiAgentNodeData?.maxIterations || 0,
        returnIntermediateSteps: !!aiAgentNodeData?.returnIntermediateSteps,
        passthroughBinaryImages:
          !!aiAgentNodeData?.automaticallyPassthroughBinaryImages,
      },
    },
    position: {
      x: -16060,
      y: -440,
    },
    inputs: [
      {
        id: "input",
        name: "fromEdit",
        description: "data coming from previous node",
        type: "object",
      },
      {
        id: "chatModel",
        name: "from ollamaChatModel1",
        description: "data coming from ollama node",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "agent output",
        description: "reAct agent",
        type: "object",
      },
    ],
  };
};
