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
  formConfig,
  setFormConfig,
  isModalOpen2,
  setIsModalOpen2,
  credentialOptions,
  setCredentialOptions,
  selectedCredential,
  setSelectedCredential,
  formData,
  setFormData,
  settingConfig,
  setSettingConfig,
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
  isModalOpen2: () => boolean;
  setIsModalOpen2: (isModalOpen: boolean) => void;
  typeOfVertex: () => string;
  setTypeOfVertex: (typeOfVertex: string) => void;
  formConfig: () => {
    name: string;
    id: string;
  };
  setFormConfig: (formConfig: { name: string; id: string }) => void;
  credentialOptions: () => any[];
  setCredentialOptions: (credentialOptions: any[]) => void;
  selectedCredential: () => any;
  setSelectedCredential: (selectedCredential: any) => void;
  formData: () => {
    [key: string]: {
      [key: string]: any;
    };
  };
  setFormData: (formData: {
    [key: string]: {
      [key: string]: any;
    };
  }) => void;
  settingConfig: () => {
    parameters: any[];
    settings: any[];
  } | null;
  setSettingConfig: (
    settingConfig: {
      parameters: any[];
      settings: any[];
    } | null
  ) => void;
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
  formConfig,
  setFormConfig,
  isModalOpen2,
  setIsModalOpen2,
  credentialOptions,
  setCredentialOptions,
  selectedCredential,
  setSelectedCredential,
  formData,
  setFormData,
  settingConfig,
  setSettingConfig,
});
