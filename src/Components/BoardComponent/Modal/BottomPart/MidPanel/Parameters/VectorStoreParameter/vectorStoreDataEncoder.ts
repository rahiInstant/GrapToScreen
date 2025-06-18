import useStateContext from "../../../../../useStateContext";

export const vectorStoreNodeDataEncoder = (
  vectorStoreNodeData: any,
  nodeId: string
) => {
  const { nodes } = useStateContext();
  const getNodePosition = () => {
    const node = nodes().find((node) => node.id === nodeId);
    if (node) {
      return node.currPosition.get();
    }
  };
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
    position: getNodePosition(),
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
