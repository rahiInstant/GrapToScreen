export const vectorStoreNodeDataFormatter = (
  vectorStoreNodeData: any,
  nodeId: string
) => {
  return {
    id: nodeId,
    name: "Vector Store Tool",
    description: "vectore store tool customerSuppertDocs",
    type: "VectoreStoreTool",
    parameters: {
      name: vectorStoreNodeData?.dataName,
      description: vectorStoreNodeData?.dataDescription,
      limit: vectorStoreNodeData?.limit,
    },
    position: {
      x: -14460,
      y: -360,
    },
    inputs: [
      {
        id: "vectorStore",
        name: "fromPGVectoreStore",
        description: "data coming from pg vector store node",
        type: "object",
      },
      {
        id: "chatModel",
        name: "fromOllamaChatModel3",
        description: "data coming from ollama model 3",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "vector store output",
        description: "tools agent",
        type: "tool",
      },
    ],
  };
};
