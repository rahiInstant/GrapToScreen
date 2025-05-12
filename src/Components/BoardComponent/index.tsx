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
  CustomNode,
  customNodeProps,
  nodeType,
  outputVertexDuty,
} from "../ButtonComponents/Types";
import useStateContext from "./useStateContext";
import Background from "./Background";
import SendData from "./SendData";
import Modal from "./Modal";

interface DotFlowProps {
  node: nodeType;
}

const BoardComponent: ParentComponent<DotFlowProps> = ({ node }) => {
  // const [nodes, setNodes] = createSignal<CustomNode[]>([]);
  const [baseNode, setBaseNode] = createSignal<CustomNode>();
  const {
    nodes,
    setNodes,
    selectedNode,
    setSelectedNode,
    pendingOutput,
    lastClickPosition,
    setEdges,
    edges,
    transform,
    scale,
    isShowModal,
    setIsModalOpen,
  } = useStateContext();

  //==================================================
  // inject node in the board,
  // dynamic node injection also, node inject based on
  // ---> random screen cord
  // ---> selected node
  // ---> pending trigger (when click on output vertex side panel trigger)
  // ---> last click position
  //==================================================

  function handleOnClickAddNode(nodeName: string) {
    let nodeX = window.innerWidth / 2;
    let nodeY = window.innerHeight / 2;
    // console.log(nodes());
    // console.log(edges());
    const selected = selectedNode();
    const pending = pendingOutput();
    const lastClick = lastClickPosition();

    function getOffsetPositionFromNode(
      nodeId: string,
      offsetX = 200,
      offsetY = 0
    ): { x: number; y: number } | null {
      const selectedNodeData = nodes().find((n) => n.id === nodeId);
      // setBaseNode(baseNode);
      setBaseNode(selectedNodeData);
      if (!selectedNodeData) return null;

      const pos = selectedNodeData.currPosition.get();
      return {
        x: pos.x + offsetX,
        y: pos.y + offsetY,
      };
    }

    if (selected) {
      let position = getOffsetPositionFromNode(selected);
      if (position) {
        nodeX = position.x;
        nodeY = position.y;
      }
    } else if (pending) {
      let position = getOffsetPositionFromNode(pending.nodeId);
      if (position) {
        nodeX = position.x;
        nodeY = position.y;
      }
    } else if (lastClick) {
      nodeX = (lastClick.x - transform().x) / scale();
      nodeY = (lastClick.y - transform().y) / scale();
    }

    const [nodePrev, setNodePrev] = createSignal<{ x: number; y: number }>({
      x: nodeX,
      y: nodeY,
    });
    const [nodeCurr, setNodeCurr] = createSignal<{ x: number; y: number }>({
      x: nodeX,
      y: nodeY,
    });

    const [inputsEdgeIds, setInputsEdgeIds] = createSignal<string[]>([]);
    const [outputsEdgeIds, setOutputsEdgeIds] = createSignal<string[]>([]);
    const [busyIndex, setBusyIndex] = createSignal<string[]>([]);
    const inputVertexIds = [
      ...Array(Number(node[nodeName].numberInputs))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const outputVertexIds = [
      ...Array(Number(node[nodeName].numberOutputs))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    const downVertexIds = [
      ...Array(Number(node[nodeName].downVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];

    const upVertexIds = [
      ...Array(Number(node[nodeName].upVertexNumber || 0))
        .keys()
        .map(() => {
          const id = `vertex_${Math.random().toString(36).substring(2, 8)}`;
          return id;
        }),
    ];
    // **** node injection
    createRoot(() => {
      setNodes([
        ...nodes(),
        {
          id: `node_${Math.random().toString(36).substring(2, 8)}_${nodeName}`,
          name: nodeName,
          numberInputs: node[nodeName].numberInputs,
          numberOutputs: node[nodeName].numberOutputs,
          isInputVertex: node[nodeName].isInputVertex,
          isOutputVertex: node[nodeName].isOutputVertex,
          inputVertexIds: inputVertexIds,
          outputVertexIds: outputVertexIds,
          isDownVertex: node[nodeName].isDownVertex || false,
          isUpVertex: node[nodeName].isUpVertex || false,
          downVertexNumber: node[nodeName].downVertexNumber || 0,
          upVertexNumber: node[nodeName].upVertexNumber || 0,
          downVertexIds: downVertexIds,
          upVertexIds: upVertexIds,
          downVertexOrientation: node[nodeName].downVertexOrientation,
          busyIndex: { get: busyIndex, set: setBusyIndex },
          content: node[nodeName].content,
          prevPosition: { get: nodePrev, set: setNodePrev },
          currPosition: { get: nodeCurr, set: setNodeCurr },
          inputEdgeIds: { get: inputsEdgeIds, set: setInputsEdgeIds },
          outputEdgeIds: { get: outputsEdgeIds, set: setOutputsEdgeIds },
        },
      ]);
    });

    // connect with base node
    // console.log(baseNode()!.outputVertexIds);

    //==================================================
    // connect edge of selected/pending node with new node
    //==================================================
    const newNode = nodes()[nodes().length - 1];
    function autoConnectEdge(outputVertexIndex: number = 0) {
      const outputVertexRef = document.getElementById(
        baseNode()!.outputVertexIds[outputVertexIndex]
      );
      // console.log(outputVertexRef);

      const { left, right, top, bottom } =
        outputVertexRef!.getBoundingClientRect();
      const centerX = left + Math.abs(left - right) / 2;
      const centerY = top + Math.abs(top - bottom) / 2;
      const inputVertexRef = document.getElementById(newNode.inputVertexIds[0]);
      const {
        left: left2,
        right: right2,
        top: top2,
        bottom: bottom2,
      } = inputVertexRef!.getBoundingClientRect();
      const centerX2 = left2 + Math.abs(left2 - right2) / 2;
      const centerY2 = top2 + Math.abs(top2 - bottom2) / 2;
      const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (centerX - transform().x) / scale(),
        y: (centerY - transform().y) / scale(),
      });
      const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (centerX2 - transform().x) / scale(),
        y: (centerY2 - transform().y) / scale(),
      });
      const [currEdgeStart, setCurrEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (centerX - transform().x) / scale(),
        y: (centerY - transform().y) / scale(),
      });
      const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (centerX2 - transform().x) / scale(),
        y: (centerY2 - transform().y) / scale(),
      });

      const edgeId = `edge_${baseNode()!.id}_${outputVertexIndex}_${
        newNode.id
      }_${0}`;

      baseNode()!.outputEdgeIds.set([
        ...baseNode()!.outputEdgeIds.get(),
        edgeId,
      ]);

      newNode.inputEdgeIds.set([...newNode.inputEdgeIds.get(), edgeId]);

      setEdges([
        ...edges(),
        {
          id: edgeId,
          nodeStartId: baseNode()!.id,
          nodeEndId: newNode.id,
          inputIndex: 0,
          typeOfEdge: "solid",
          outputIndex: outputVertexIndex,
          inputVertexId: newNode.inputVertexIds[0],
          outputVertexId: baseNode()!.outputVertexIds[outputVertexIndex],
          prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
          prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
          currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
          currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
        },
      ]);

      // ******** block vertex ********
      baseNode()!.busyIndex.set([
        ...baseNode()!.busyIndex.get(),
        baseNode()!.outputVertexIds[outputVertexIndex],
      ]);
    }

    if (selected) {
      baseNode()?.isOutputVertex && newNode.isInputVertex
        ? autoConnectEdge()
        : "";
    } else if (pending) {
      baseNode()?.isOutputVertex && newNode.isInputVertex
        ? autoConnectEdge(pending!.outputVertexIndex)
        : "";
    }

    if (nodes().length <= 1 && nodes()[0].isOutputVertex) {
      setSelectedNode(nodes()[0].id);
    } else if (baseNode()?.isOutputVertex && newNode.isInputVertex) {
      setSelectedNode(newNode.id);
    }

    // baseNode()?.isOutputVertex && newNode.isInputVertex
    //   ? setSelectedNode(newNode.id)
    //   : "";
  }

  const handleModalClose = () => {
    const modal = document.getElementById("modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
      setIsModalOpen(false);
    }
  };

  return (
    <div
      id="boardWrapper"
      class="w-screen h-screen overflow-hidden relative z-0"
      tabIndex={0}
    >
      {/* <ModalForm isShowModal={isShowModal}/> */}
      <StateContextProvider>
        <SendData />
      </StateContextProvider>
      <StateContextProvider>
        {/* <DialogForm handleModalClose={handleModalClose} /> */}
        <Modal />
        {/* <Effect /> */}
      </StateContextProvider>
      <StateContextProvider>
        <SideBar onClickAdd={handleOnClickAddNode} nodeMark={nodeMark} />
      </StateContextProvider>
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
