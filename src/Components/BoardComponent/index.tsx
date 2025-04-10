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
import {
  customNodeProps,
  nodeType,
  outputVertexDuty,
} from "../ButtonComponents/Types";
import useStateContext from "./useStateContext";
import Background from "./Background";
interface CustomNode {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  inputVertexIds: Array<string>;
  outputVertexIds: Array<string>;
  busyIndex: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  content: Component<customNodeProps>;
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
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    // console.log();
    const [nodePrev, setNodePrev] = createSignal<{ x: number; y: number }>({
      x: randomX,
      y: randomY,
    });
    const [nodeCurr, setNodeCurr] = createSignal<{ x: number; y: number }>({
      x: randomX,
      y: randomY,
    });
    // console.log(nodeName)
    // console.log(node[nodeName].content)

    const [inputsEdgeIds, setInputsEdgeIds] = createSignal<string[]>([]);
    const [outputsEdgeIds, setOutputsEdgeIds] = createSignal<string[]>([]);
    const [busyIndex, setBusyIndex] = createSignal<string[]>([]);
    createRoot(() => {
      setNodes([
        ...nodes(),
        {
          id: `nodes_${Math.random().toString(36).substring(2, 8)}`,
          numberInputs: node[nodeName].numberInputs,
          numberOutputs: node[nodeName].numberOutputs,
          isInputVertex: node[nodeName].isInputVertex,
          isOutputVertex: node[nodeName].isOutputVertex,
          inputVertexIds: [
            ...Array(Number(node[nodeName].numberInputs))
              .keys()
              .map(
                (v, i) => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          outputVertexIds: [
            ...Array(Number(node[nodeName].numberOutputs))
              .keys()
              .map(
                (v, i) => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          busyIndex: { get: busyIndex, set: setBusyIndex },
          content: node[nodeName].content,
          prevPosition: { get: nodePrev, set: setNodePrev },
          currPosition: { get: nodeCurr, set: setNodeCurr },
          inputEdgeIds: { get: inputsEdgeIds, set: setInputsEdgeIds },
          outputEdgeIds: { get: outputsEdgeIds, set: setOutputsEdgeIds },
        },
      ]);
    });
  }

  return (
    <div
      id="boardWrapper"
      class="w-screen h-screen overflow-hidden relative z-0"
      tabIndex={0}
    >
      {/* <Background/> */}
      <SideBar
        onClickAdd={handleOnClickAddNode}
        // onClickDelete={handleOnClickDeleteNode}
        nodeMark={nodeMark}
      />
      <StateContextProvider>
        <Zoom />
      </StateContextProvider>
      <StateContextProvider>
        <Board nodes={nodes} setNodes={setNodes} />
      </StateContextProvider>
    </div>
  );
};

export default BoardComponent;
