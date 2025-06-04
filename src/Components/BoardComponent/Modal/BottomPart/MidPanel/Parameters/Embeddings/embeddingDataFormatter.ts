export const embeddingNodeDataFormatter = (
  embeddingNodeData: any,
  nodeId: string
) => {
  return {
    id: nodeId,
    name: "Embeddings",
    description: "embeddings for PGVectore Store",
    type: "Ollama",
    parameters: {
      credentials: {
        id: "d0rvblltcbtlha4jl3n0",
        name: "Ollama account",
        provider: "ollama",
        ctype: "url",
      },
      model: "nomic-embed-text:latest",
    },
    position: {
      x: -14600,
      y: -100,
    },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "embeddings vector as output",
        description: "turn text into vectors",
        type: "object",
      },
    ],
  };
};
