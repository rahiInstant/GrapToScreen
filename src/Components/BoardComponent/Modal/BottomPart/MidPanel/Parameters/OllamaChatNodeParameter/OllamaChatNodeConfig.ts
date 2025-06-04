import { FilterOption } from "../../../../Component lib/DropDown/DropDownFilter/DropDownFilter";
import { DropDownNOption } from "../../../../Component lib/DropDown/DropDownN/DropDownN";

const modelConfig: DropDownNOption[] = [
  {
    label: "deepseek-r1:r1.5b",
    value: "deepseek-r1:r1.5b",
  },
  {
    label: "llma 3.2:1b",
    value: "llma 3.2:1b",
  },
  {
    label: "llma 3.2:1b",
    value: "llma 3.2:1b",
  },
  {
    label: "phi4:latest",
    value: "phi4:latest",
  },
];

const optionStoreForOllamaNode: FilterOption[] = [
  {
    label: "Sampling Temperature",
    value: "samplingTemperature",
    content: {
      type: "dynamicInput",
      title: "Sampling Temperature",
      name: "samplingTemperature",
      value: ".7",
      toolTipText:
        "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
    },
  },
  {
    label: "Top K",
    value: "topK",
    content: {
      type: "dynamicInput",
      title: "Top K",
      name: "topK",
      value: "-1.0",
      toolTipText:
        "Limits the number of highest probability vocabulary tokens to consider at each step. A higher value increases diversity but may reduce coherence. Set to -1 to disable.",
    },
  },
  {
    label: "Top P",
    value: "topP",
    content: {
      type: "dynamicInput",
      title: "Top P",
      name: "topP",
      value: "1.0",
      toolTipText:
        "Chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions.",
    },
  },
  {
    label: "Frequency Penalty",
    value: "frequencyPenalty",
    content: {
      type: "dynamicInput",
      title: "Frequency Penalty",
      name: "frequencyPenalty",
      value: "0",
      toolTipText:
        "Adjusts the penalty for tokens that have already appeared in the generated text. Higher values discourage repetition.",
    },
  },
  // {
  //   label: "Sampling Temperature",
  //   value: "samplingTemperature",
  //   content: {
  //     type: "dynamicInput",
  //     title: "Sampling Temperature",
  //     name: "samplingTemperature",
  //     value: ".7",
  //     toolTipText:
  //       "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
  //   },
  // },
  {
    label: "Keep Alive",
    value: "keepAlive",
    content: {
      type: "dynamicInput",
      title: "Keep Alive",
      name: "keepAlive",
      value: "5m",
      toolTipText:
        "Specifies the duration to keep the loaded model in memory after use. Useful for frequently used models. Format: 1h30m (1 hour 30 minutes).",
    },
  },
  {
    label: "Low VRAM Mode",
    value: "lowVramMode",
    content: {
      type: "switch",
      title: "Low VRAM Mode",
      name: "lowVramMode",
      toolTipText:
        "Whether to Activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.",
    },
  },
  {
    label: "Main GPU ID",
    value: "mainGpuId",
    content: {
      type: "dynamicInput",
      title: "Main GPU ID",
      name: "mainGpuId",
      value: "1",
      toolTipText:
        "Specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.",
    },
  },
  {
    label: "Context Batch Size",
    value: "contextBatchSize",
    content: {
      type: "dynamicInput",
      title: "Context Batch Size",
      name: "contextBatchSize",
      value: "512",
      toolTipText:
        "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
    },
  },
  {
    label: "Context Length",
    value: "contextLength",
    content: {
      type: "dynamicInput",
      title: "Context Length",
      name: "contextLength",
      value: "2048",
      toolTipText:
        "The maximum number of tokens to use as context for generating the next token. Smaller values reduce memory usage, while larger values provide more context to the model.",
    },
  },
  {
    label: "Number of GPUs",
    value: "numGpus",
    content: {
      type: "dynamicInput",
      title: "Number of GPUs",
      name: "numGpus",
      value: "-1",
      toolTipText:
        "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
    },
  },
  {
    label: "Max Tokens to Generate",
    value: "maxTokensToGenerate",
    content: {
      type: "dynamicInput",
      title: "Max Tokens to Generate",
      name: "maxTokensToGenerate",
      value: "-1",
      toolTipText:
        "The maximum number of tokens to generate. Set to -1 for no limit. Be cautious when setting this to a large value, as it can lead to very long outputs.",
    },
  },
  {
    label: "Number of CPU Threads",
    value: "numCpuThreads",
    content: {
      type: "dynamicInput",
      title: "Number of CPU Threads",
      name: "numCpuThreads",
      value: "0",
      toolTipText:
        "Specifies the number of CPU threads to use for processing. Set to 0 for auto-detection.",
    },
  },

  {
    label: "Penalize Newlines",
    value: "penalizeNewlines",
    content: {
      type: "switch",
      title: "Penalize Newlines",
      name: "penalizeNewlines",
      toolTipText:
        "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
    },
  },
  {
    label: "Presence Penalty",
    value: "presencePenalty",
    content: {
      type: "dynamicInput",
      title: "Presence Penalty",
      name: "presencePenalty",
      value: "0",
      toolTipText:
        "Adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.",
    },
  },
  {
    label: "Repetition Penalty",
    value: "repetitionPenalty",
    content: {
      type: "dynamicInput",
      title: "Repetition Penalty",
      name: "repetitionPenalty",
      value: "1",
      toolTipText:
        "Adjusts the penalty factor for repeated tokens. Higher values more strongly discourage repetition. Set to 1.0 to disable repetition penalty.",
    },
  },
  {
    label: "Use Memory Locking",
    value: "UseMemoryLocking",
    content: {
      type: "switch",
      title: "Use Memory Locking",
      name: "UseMemoryLocking",
      toolTipText:
        "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
    },
  },
  {
    label: "Use Memory Mapping",
    value: "useMemoryMapping",
    content: {
      type: "switch",
      title: "Use Memory Mapping",
      name: "useMemoryMapping",
      toolTipText:
        "Whether to use memory mapping for loading the model. This can reduce memory usage but may impact performance. Recommended to keep enabled.",
    },
  },
  {
    label: "Load Vocabulary Only",
    value: "loadVocabularyOnly",
    content: {
      type: "switch",
      title: "Load Vocabulary Only",
      name: "loadVocabularyOnly",
      toolTipText:
        "Whether to only load the model vocabulary without the weights. Useful for quickly testing tokenization.",
    },
  },
  {
    label: "Output Format",
    value: "outputFormat",
    content: {
      type: "dropdownN",
      title: "Output Format",
      name: "outputFormat",
      options: [
        {
          label: "JSON",
          value: "JSON",
        },
        {
          label: "Default",
          value: "Default",
        },
      ],
      toolTipText:
        "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
    },
  },
];

export { modelConfig, optionStoreForOllamaNode };
