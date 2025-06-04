export const gmailNodeDataFormatter = (gmailData: any, nodeId?: string) => {

  
  const transFormPoolTimeData = (data: any) =>
    Object.values(
      Object.entries(data)
        .filter(([k, v]) => k.startsWith("poolTime_"))
        .reduce((acc, [key, value]: [string, string]) => {
          const parts = key.split("_");
          const baseKey = `${parts[0]}_${parts[1]}`;
          const field = parts[2];

          acc[baseKey] ??= {};

          if (!field) {
            acc[baseKey].mode = value
          } else if (field === "Hour") {
            acc[baseKey].hour = value;
          } else if (field === "Minute") {
            acc[baseKey].minute = value;
          } else if (field === "Day of Month") {
            acc[baseKey].dayOfMonth = value;
          } else if (field === "Weekday") {
            acc[baseKey].weekday = value
          } else if (field === "Value") {
            acc[baseKey].value = value;
          } else if (field === "Unit") {
            acc[baseKey].unit = value
          } else if (field === "Cron Expression") {
            acc[baseKey].cronExpression = value;
          }
          return acc;
        }, {})
    );
  // console.log(transFormPoolTimeData(gmailData));
  return {
    id: nodeId,
    name: "Gmail Trigger",
    description: "Gmail reader",
    type: "GmailReader",
    parameters: {
      credentials: {
        id: "d0esgqltcbthv6156tjg",
        name: "Gmail Account",
        provider: "gmail",
        ctype: "oauth2",
      },
      pollTimes: transFormPoolTimeData(gmailData),
      simple: !!gmailData?.simplify,
      filters: {
        includeSpamTrash: !!gmailData?.includeSpamTrash,
        includeDrafts: !!gmailData?.includeDrafts,
        labelIds: gmailData?.labelNamesOrIds || "",
        q: gmailData?.Search || "",
        readStatus: gmailData?.readStatus || "",
        sender: gmailData?.sender || "",
      },
      options: {
        downloadAttachments: !!gmailData?.downloadAttachments,
        attachmentPrefix: gmailData?.attachmentPrefix || "",
      },
    },
    position: {
      x: 200,
      y: 200,
    },
    inputs: [],
    outputs: [
      {
        id: "output",
        name: "Last Email",
        description: "Read last email from your gmail inbox",
        type: "object",
      },
    ],
  };
};
