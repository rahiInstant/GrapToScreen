export const createDraftNodeDataFormatter = (
  createDraftNodeData: any,
  nodeId: string
) => {
  return {
    id: nodeId,
    name: "createDraft",
    description: "create gmail Draft",
    type: "GmailTool",
    parameters: {
      credentials: {
        id: "d0esgqltcbthv6156tjg",
        name: "Gmail Account",
        provider: "gmail",
        ctype: "oauth2",
      },
      descriptionType: createDraftNodeData?.toolDescription,
      toolDescription: createDraftNodeData?.description,
      resource: createDraftNodeData?.resource,
      operation: createDraftNodeData?.operation,
      subject: createDraftNodeData?.subject,
      emailType: createDraftNodeData?.emailType,
      message: createDraftNodeData?.message,
      options: {
        threadId: createDraftNodeData?.threadId,
        sendTo: createDraftNodeData?.sendRepliesTo,
      },
    },
    position: {
      x: -13980,
      y: -400,
    },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "createDraft",
        description: "gmail tool output",
        type: "tool",
      },
    ],
  };
};
