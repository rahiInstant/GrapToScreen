import { Component, createSignal } from "solid-js";
import style from "./style.module.css";
import useStateContext from "./useStateContext";

const SendData: Component<{}> = (props) => {
  const { nodes, edges } = useStateContext();
  const [backendUrl, setBackendUrl] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);
  interface nodeDataType {
    id: string;
    description: string;
    type: string;
    parameters: {
      credentials: string;
    };
    position: {
      x: number;
      y: number;
    };
    inputs: any[];
    outputs: any[];
  }
  interface edgeDataType {
    id: string;
    sourceNodeId: string;
    sourcePortId: string;
    targetNodeId: string;
    targetPortId: string;
  }
  const [nodeData, setNodeData] = createSignal<nodeDataType[]>([]);
  const [edgeData, setEdgeData] = createSignal<edgeDataType[]>([]);

  const handleSendingData = async () => {
    setLoading(true);
    nodes().forEach((value) => {
      setNodeData([
        ...nodeData(),
        {
          id: value.id,
          description: "no description",
          type: value.name,
          parameters: {
            credentials: "no credentials",
          },
          position: {
            x: Math.round(value.currPosition.get().x),
            y: Math.round(value.currPosition.get().y),
          },
          inputs: [],
          outputs: [],
        },
      ]);
    });
    edges().forEach((value) => {
      setEdgeData([
        ...edgeData(),
        {
          id: value.id,
          sourceNodeId: value.nodeStartId,
          sourcePortId: value.outputVertexId,
          targetNodeId: value.nodeEndId,
          targetPortId: value.inputVertexId,
        },
      ]);
    });
    const finalData = {
      name: "Your workflow",
      description: "no description",
      nodes: nodeData(),
      connections: edgeData(),
    };

    try {
      const response = await fetch(backendUrl(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) throw new Error("Failed to send data");

      const result = await response.json();
      setTimeout(() => {
        console.log(result);
      }, 400);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setNodeData([]);
        setEdgeData([]);
      }, 400);
    }
  };
  return (
    <div class={style.testWorkFlow}>
      <div
        class={`fixed ${
          loading() ? "top-2" : "-top-20"
        } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`}
      >
        <span class={style.loader}></span>
        Data processing...
      </div>
      <div>
        <input
          onChange={(e) => {
            setBackendUrl(e.target.value);
          }}
          class="border rounded-md px-4 py-2 outline-none border-white"
          title="backendUrl"
          name="url"
          type="text"
        />
      </div>
      <div onClick={handleSendingData} class={style.testButton}>
        Test WorkFlow
      </div>
    </div>
  );
};

export default SendData;

// {
//     "id": "conn1",
//     "sourceNodeId": "gmailReader1",
//     "sourcePortId": "output",
//     "targetNodeId": "editNode1",
//     "targetPortId": "input"
//   }

// const anyData = {
//     id: "gmailReader1",
//     description: "Gmail reader",
//     type: "GmailReader",
//     parameters: {
//       credentials: "fsIEE2hNt589Dkye",
//     },
//     position: {
//       x: 0,
//       y: 0,
//     },
//     inputs: [],
//     outputs: [],
//   };
