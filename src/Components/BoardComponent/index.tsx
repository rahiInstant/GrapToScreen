import {
  Accessor,
  Component,
  createRoot,
  createSignal,
  JSX,
  ParentComponent,
  Setter,
} from "solid-js";
import style from "./style.module.css";
import Zoom from "./Zoom";
import SideBar from "../ButtonComponents/index";
import Board from "./Board";
import StateContextProvider from "./StateContextProvider";
import { nodeMark } from "../ButtonComponents/nodeMark";
import { nodeType } from "../ButtonComponents/Types";
import useStateContext from "./useStateContext";
interface CustomNode {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  content: Component;
  prevPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  inputEdgeIds: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  outputEdgeIds: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
}

interface Edge {
  id: string;
  nodeStartId: string;
  nodeEndId: string;
  inputIndex: number;
  outputIndex: number;
  prevStartPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  prevEndPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currStartPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currEndPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
}

interface DotFlowProps {
  node: nodeType;
}

const BoardComponent: ParentComponent<DotFlowProps> = ({ node }) => {
  const [nodes, setNodes] = createSignal<CustomNode[]>([]);
  const {} = useStateContext();
  function handleOnClickAddNode(nodeName: string) {
    const randomX = (Math.random() * window.innerWidth) / 2;
    const randomY = (Math.random() * window.innerHeight) / 2;
    // console.log();
    const [nodePrev, setNodePrev] = createSignal<{ x: number; y: number }>({
      x: randomX,
      y: randomY,
    });
    const [nodeCurr, setNodeCurr] = createSignal<{ x: number; y: number }>({
      x: randomX,
      y: randomY,
    });
    console.log(nodeName)
    console.log(node[nodeName].content)

    const [inputsEdgeIds, setInputsEdgeIds] = createSignal<string[]>([]);
    const [outputsEdgeIds, setOutputsEdgeIds] = createSignal<string[]>([]);
    createRoot(() => {
      setNodes([
        ...nodes(),
        {
          id: `nodes_${Math.random().toString(36).substring(2, 8)}`,
          numberInputs: node[nodeName].numberInputs,
          numberOutputs: node[nodeName].numberOutputs,
          isInputVertex: node[nodeName].isInputVertex,
          isOutputVertex: node[nodeName].isOutputVertex,
          content: node[nodeName].content,
          prevPosition: { get: nodePrev, set: setNodePrev },
          currPosition: { get: nodeCurr, set: setNodeCurr },
          inputEdgeIds: { get: inputsEdgeIds, set: setInputsEdgeIds },
          outputEdgeIds: { get: outputsEdgeIds, set: setOutputsEdgeIds },
        },
      ]);
    });
  }
  // function handleOnClickDeleteNode() {
  //   const node = nodes().find((node) => node.id == selectedNode());
  //   if (!node) {
  //     setSelectedNode(null);
  //     return;
  //   }
  //   // Delete node edges
  //   const inputs = node.inputEdgeIds.get();
  //   const outputs = node.outputEdgeIds.get();

  //   // Get all unique edges to delete
  //   const allEdges = [...inputs, ...outputs];
  //   const uniqueEdges = allEdges.filter((value, index, array) => {
  //     return array.indexOf(value) === index;
  //   });

  //   // Delete edges from correspondent nodes data
  //   for (let i = 0; i < uniqueEdges.length; i++) {
  //     const edge = edges().find((edge) => edge.id === uniqueEdges[i]);
  //     if (edge) {
  //       const nodeStart = nodes().find((node) => node.id === edge.nodeStartId);
  //       const nodeEnd = nodes().find((node) => node.id === edge.nodeEndId);

  //       nodeStart?.outputEdgeIds.set([
  //         ...nodeStart.outputEdgeIds
  //           .get()
  //           .filter((edgeId) => edgeId !== uniqueEdges[i]),
  //       ]);
  //       nodeEnd?.inputEdgeIds.set([
  //         ...nodeEnd.inputEdgeIds
  //           .get()
  //           .filter((edgeId) => edgeId !== uniqueEdges[i]),
  //       ]);

  //       // Delete edge from global data
  //       setEdges([...edges().filter((e) => edge.id !== e.id)]);
  //     }
  //   }

  //   setNodes([...nodes().filter((node) => node.id !== selectedNode())]);
  //   setSelectedNode(null);
  // }
  return (
    <div id="boardWrapper" class={style.wrapper} tabIndex={0}>
      <SideBar
        onClickAdd={handleOnClickAddNode}
        // onClickDelete={handleOnClickDeleteNode}
        nodeMark={nodeMark}
      />
      <StateContextProvider>
        <Zoom />
      </StateContextProvider>
      <StateContextProvider>
        <Board nodes={nodes} />
      </StateContextProvider>
    </div>
  );
};

export default BoardComponent;
