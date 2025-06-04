export const ollamaChatNodeDataFormatter = (
  ollamaChatNodeData: any,
  nodeId: string
) => {
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
      modal: ollamaChatNodeData?.model || "",
      options: {
        temperature: ollamaChatNodeData?.samplingTemperature,
        topK: ollamaChatNodeData?.topK,
        topP: ollamaChatNodeData?.topP,
        frequencyPenalty: ollamaChatNodeData?.frequencyPenalty,
        keepAlive: ollamaChatNodeData?.keepAlive,
        lowVram: ollamaChatNodeData?.lowVramMode,
        mainGpu: ollamaChatNodeData?.mainGpuId,
        numBatch: ollamaChatNodeData?.contextBatchSize,
        numCtx: ollamaChatNodeData?.contextLength,
        numGpu: ollamaChatNodeData?.numGpus,
        // numPredict: ollamaChatNodeData,
        numThread: ollamaChatNodeData?.numCpuThreads,
        penalizeNewline: ollamaChatNodeData?.penalizeNewlines,
        presencePenalty: ollamaChatNodeData?.presencePenalty,
        repeatPenalty: ollamaChatNodeData?.repetitionPenalty,
        useMLock: ollamaChatNodeData?.UseMemoryLocking,
        useMMap: ollamaChatNodeData?.useMemoryMapping,
        vocabOnly: ollamaChatNodeData?.loadVocabularyOnly,
        format: ollamaChatNodeData?.outputFormat,
      },
    },
    position: {
      x: -16060,
      y: -440,
    },
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
