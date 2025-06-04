const anyThing = {
  name: "Email Analyzer",
  description: "A workflow demonstrating multiple inputs and outputs per node",
  nodes: [
    {
      id: "gmailReader1",
      description: "Gmail reader",
      type: "GmailReader",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        pollTimes: [
          {
            mode: "everyMonth",
            hour: 10,
            minute: 5,
            dayOfMonth: 2,
          },
          {
            mode: "custom",
            cronExpression: "* 5 * * * *",
          },
        ],
        simple: false,
        filters: {
          includeSpamTrash: true,
          includeDrafts: true,
          labelIds: ["INBOX", "IMPORTANT"],
          q: "is:unread",
          readStatus: "both",
          sender: "bill.rassel@gmail.com",
        },
        options: {
          downloadAttachments: true,
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
    },
    {
      id: "editNode1",
      description: "Filter even numbers",
      type: "EditNode",
      parameters: {
        mode: "manual_mapping",
        assignments: [
          {
            id: "1",
            name: "sender",
            value: "{{ $json.from.value[0].address }}",
            type: "string",
          },
          {
            id: "2",
            name: "threadId",
            value: "{{ $json.threadId }}",
            type: "string",
          },
          {
            id: "3",
            name: "messageId",
            value: "{{ $json.id }}",
            type: "string",
          },
          {
            id: "4",
            name: "body",
            value: "{{ $json.text }}",
            type: "string",
          },
        ],
      },
      position: {
        x: 400,
        y: 100,
      },
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "Data to filter",
          type: "array",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "Output",
          description: "Outcode of the node after process",
          type: "object",
        },
      ],
    },
    {
      id: "langchainAgent1",
      description: "AI Agent",
      type: "LangchainAgent",
      parameters: {
        agent: "toolsAgent",
        promptType: "define",
        text: "{{ $json.body }}",
        options: {
          systemMessage:
            'Analyze the content of the provided email and determine if it is related to customer support. Use the following guidelines to make your decision:\n\n### **Customer Support Topics Include:**\n- Questions about order status, tracking, or changes.\n- Issues with damaged or defective products.\n- Refund or return requests.\n- Subscription cancellation or adjustments.\n- Technical issues with products, website, or app.\n- Payment or billing inquiries.\n- Requests to speak with a support representative.\n\n### **Output Format:**\n- Provide the result **strictly in JSON format** with a single field named `"customerSupport"` set to `true` or `false`.\n- Do not include any additional text, explanations, or commentary in the response.\n\n### **Example 1:**\n**Email:**  \n"Hi, I placed an order last week and haven’t received a tracking number yet. Can you help?"\n\n**Output:**  \n{"customerSupport": true}\n\n### **Example 2:**\n**Email:**  \n"Hello, I’m interested in learning more about your pricing plans for enterprise customers."\n\n**Output:**  \n{"customerSupport": false}\n\n### Example 3:**\nHey, I have ordered one item, My order is not delivered yet, I need to talk to you, please cooperate with me.\n\n**Output:**  \n{"customerSupport": true}\n\n**Instructions:**\n1. Carefully read the email content.\n2. Determine if the email relates to any of the specified customer support topics.\n3. Output the result in JSON format **only**, with the field `"customerSupport"` set to `true` or `false`.\n4. Do not include any additional text or explanations.',
          maxIterations: 10,
          returnIntermediateSteps: true,
          passthroughBinaryImages: true,
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
          name: "fromOllama",
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
    },
    {
      id: "ollamaChatModel1",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: "llama3.2:1b",
        options: {
          temperature: 0.7,
          topK: -1,
          topP: 1,
          frequencyPenalty: 0,
          keepAlive: "5m",
          lowVram: false,
          mainGpu: 0,
          numBatch: 512,
          numCtx: 2048,
          numGpu: -1,
          numPredict: -1,
          numThread: 0,
          penalizeNewline: true,
          presencePenalty: 0,
          repeatPenalty: 1,
          useMLock: true,
          useMMap: true,
          vocabOnly: true,
          format: "default",
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
    },
  ],
  connections: [
    {
      id: "conn1",
      sourceNodeId: "gmailReader1",
      sourcePortId: "output",
      targetNodeId: "editNode1",
      targetPortId: "input",
    },
    {
      id: "conn2",
      sourceNodeId: "editNode1",
      sourcePortId: "output",
      targetNodeId: "langchainAgent1",
      targetPortId: "input",
    },
    {
      id: "conn3",
      sourceNodeId: "ollamaChatModel1",
      sourcePortId: "output",
      targetNodeId: "langchainAgent1",
      targetPortId: "chatModel",
    },
  ],
};


////********************** */
// {
//   "name": "Email Analyzer",
//   "description": "A workflow demonstrating multiple inputs and outputs per node",
//   "nodes": [
//     {
//       "id": "gmailReader1",
//       "description": "Gmail reader",
//       "type": "GmailReader",
//       "parameters": {
//         "credentials": {
//           "id": "d0esgqltcbthv6156tjg",
//           "name": "Gmail Account",
//           "provider": "gmail",
//           "ctype": "oauth2"
//         },
//         "pollTimes": [
//           {
//             "mode": "everyMonth",
//             "hour": 10,
//             "minute": 5,
//             "dayOfMonth": 2
//           },
//           {
//             "mode": "custom",
//             "cronExpression": "* 5 * * * *"
//           }
//         ],
//         "simple": false,
//         "filters": {
//           "includeSpamTrash": true,
//           "includeDrafts": true,
//           "labelIds": [
//             "INBOX",
//             "IMPORTANT"
//           ],
//           "q": "is:unread",
//           "readStatus": "both",
//           "sender": "bill.rassel@gmail.com"
//         },
//         "options": {
//           "downloadAttachments": true
//         }
//       },
//       "position": {
//         "x": 200,
//         "y": 200
//       },
//       "inputs": [],
//       "outputs": [
//         {
//           "id": "output",
//           "name": "Last Email",
//           "description": "Read last email from your gmail inbox",
//           "type": "object"
//         }
//       ]
//     },
//     {
//       "id": "editNode1",
//       "description": "Modify,add,or remove item fields.",
//       "type": "EditNode",
//       "parameters": {
//         "mode": "manual_mapping",
//         "assignments": [
//           {
//             "id": "1",
//             "name": "sender",
//             "value": "{{ $json.from.value[0].address }}",
//             "type": "string"
//           },
//           {
//             "id": "2",
//             "name": "threadId",
//             "value": "{{ $json.threadId }}",
//             "type": "string"
//           },
//           {
//             "id": "3",
//             "name": "messageId",
//             "value": "{{ $json.id }}",
//             "type": "string"
//           },
//           {
//             "id": "4",
//             "name": "body",
//             "value": "{{ $json.text }}",
//             "type": "string"
//           }
//         ]
//       },
//       "position": {
//         "x": 400,
//         "y": 100
//       },
//       "inputs": [
//         {
//           "id": "input",
//           "name": "Input",
//           "description": "Data to filter",
//           "type": "array"
//         }
//       ],
//       "outputs": [
//         {
//           "id": "output",
//           "name": "Output",
//           "description": "Outcode of the node after process",
//           "type": "object"
//         }
//       ]
//     }
//   ],
//   "connections": [
//     {
//       "id": "conn1",
//       "sourceNodeId": "gmailReader1",
//       "sourcePortId": "output",
//       "targetNodeId": "editNode1",
//       "targetPortId": "input"
//     },
//     {
//       "id": "conn2",
//       "sourceNodeId": "editNode1",
//       "sourcePortId": "output",
//       "targetNodeId": "langchainAgent1",
//       "targetPortId": "input"
//     }
//   ]
// }


