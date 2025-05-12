import { createContext } from "solid-js";
import {
  scale,
  setScale,
  draggable,
  isCtrlPressed,
  isSpacePressed,
  setDraggable,
  setIsCtrlPressed,
  setIsSpacePressed,
  edges,
  setEdges,
  newEdge,
  setNewEdge,
  busyIndex,
  setBusyIndex,
  edgeLength,
  setEdgeLength,
  isOpen,
  setIsOpen,
  inputRef,
  edgeEnd,
  setEdgeEnd,
  transform,
  setTransform,
  nodes,
  setNodes,
  preTransform,
  setPreTransform,
  selectedNode,
  setSelectedNode,
  pendingOutput,
  setPendingOutput,
  lastClickPosition,
  setLastClickPosition,
  isShowModal,
  setIsShowModal,
  setPositionButton,
  positionButton,
  isModalOpen,
  setIsModalOpen,
  isOpening,
  setIsOpening,
  typeOfVertex,
  setTypeOfVertex,
} from "./state";
import { CustomNode, Edge } from "../ButtonComponents/Types";

export const StateContext = createContext<{
  scale: () => number;
  setScale: (scale: number) => void;
  draggable: () => boolean;
  setDraggable: (draggable: boolean) => void;
  isCtrlPressed: () => boolean;
  isSpacePressed: () => boolean;
  setIsCtrlPressed: (isCtrlPressed: boolean) => void;
  setIsSpacePressed: (isSpacePressed: boolean) => void;
  edges: () => Edge[];
  setEdges: (edges: Edge[]) => void;
  newEdge: () => Edge | null;
  setNewEdge: (newEdge: Edge | null) => void;
  busyIndex: () => Array<number | null>;
  setBusyIndex: (busyIndex: Array<number | null>) => void;
  edgeLength: () => number;
  setEdgeLength: (edgeLength: number) => number;
  isOpen: () => boolean;
  setIsOpen: (isOpen: boolean) => void;
  inputRef: HTMLInputElement;
  edgeEnd: () => { x: number; y: number };
  setEdgeEnd: (edgeEnd: { x: number; y: number }) => void;
  transform: () => { x: number; y: number };
  setTransform: (
    transform:
      | { x: number; y: number }
      | ((prev: any) => { x: number; y: number })
  ) => void;
  nodes: () => CustomNode[];
  setNodes: (nodes: CustomNode[]) => void;
  preTransform: () => { x: number; y: number };
  setPreTransform: (
    preTransform:
      | { x: number; y: number }
      | ((prev: any) => { x: number; y: number })
  ) => void;
  selectedNode: () => string | null;
  setSelectedNode: (selectedNode: string | null) => void;
  pendingOutput: () => {
    nodeId: string;
    outputVertexIndex: number;
  } | null;
  setPendingOutput: (
    pendingOutput: {
      nodeId: string;
      outputVertexIndex: number;
    } | null
  ) => void;
  lastClickPosition: () => { x: number; y: number } | null;
  setLastClickPosition: (
    lastClickPosition: { x: number; y: number } | null
  ) => void;
  isShowModal: () => boolean;
  setIsShowModal: (isShowModal: boolean) => void;
  positionButton: () => { x: number; y: number };
  setPositionButton: (positionButton: { x: number; y: number }) => void;
  isOpening: () => boolean;
  setIsOpening: (isOpening: boolean) => void;
  isModalOpen: () => boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  typeOfVertex: () => string;
  setTypeOfVertex: (typeOfVertex: string) => void;
}>({
  scale,
  setScale,
  draggable,
  setDraggable,
  isCtrlPressed,
  setIsCtrlPressed,
  isSpacePressed,
  setIsSpacePressed,
  edges,
  setEdges,
  newEdge,
  setNewEdge,
  busyIndex,
  setBusyIndex,
  edgeLength,
  setEdgeLength,
  isOpen,
  setIsOpen,
  inputRef,
  edgeEnd,
  setEdgeEnd,
  transform,
  setTransform,
  nodes,
  setNodes,
  preTransform,
  setPreTransform,
  selectedNode,
  setSelectedNode,
  pendingOutput,
  setPendingOutput,
  lastClickPosition,
  setLastClickPosition,
  isShowModal,
  setIsShowModal,
  positionButton,
  setPositionButton,
  isOpening,
  setIsOpening,
  isModalOpen,
  setIsModalOpen,
  typeOfVertex,
  setTypeOfVertex,
});
