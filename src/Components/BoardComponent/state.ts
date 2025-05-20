import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { CustomNode, Edge } from "../ButtonComponents/Types";

export const [draggable, setDraggable] = createSignal<boolean>(false);
export const [isCtrlPressed, setIsCtrlPressed] = createSignal<boolean>(false);
export const [isSpacePressed, setIsSpacePressed] = createSignal<boolean>(false);
export const [scale, setScale] = createSignal<number>(1);
export const [edges, setEdges] = createSignal<Edge[]>([]);
export const [newEdge, setNewEdge] = createSignal<Edge | null>(null);
export const [busyIndex, setBusyIndex] = createSignal<Array<number | null>>([]);
export const [edgeLength, setEdgeLength] = createSignal<number>(0);
export let [isOpen, setIsOpen] = createSignal<boolean>(false);
export let inputRef: HTMLInputElement;
export const [edgeEnd, setEdgeEnd] = createSignal<{ x: number; y: number }>({
  x: 0,
  y: 0,
});
export const [transform, setTransform] = createSignal({ x: 0, y: 0 });
export const [nodes, setNodes] = createSignal<CustomNode[]>([]);
export const [preTransform, setPreTransform] = createSignal({ x: 0, y: 0 });
export const [selectedNode, setSelectedNode] = createSignal<string | null>(
  null
);

export const [pendingOutput, setPendingOutput] = createSignal<{
  nodeId: string;
  outputVertexIndex: number;
} | null>(null);

export const [lastClickPosition, setLastClickPosition] = createSignal<{
  x: number;
  y: number;
} | null>(null);
export const [isShowModal, setIsShowModal] = createSignal<boolean>(false);
export const [positionButton, setPositionButton] = createSignal<{
  x: number;
  y: number;
}>({ x: 0, y: 0 });
export const [isOpening, setIsOpening] = createSignal<boolean>(false);
export const [isModalOpen, setIsModalOpen] = createSignal<boolean>(false);
export const [isModalOpen2, setIsModalOpen2] = createSignal<boolean>(false);
export const [typeOfVertex, setTypeOfVertex] = createSignal<string>("");
export const [settingConfig, setSettingConfig] = createSignal<{
  parameters: any[];
  settings: any[];
} | null>(null);
export const [formConfig, setFormConfig] = createSignal<{
  name: string;
  id: string;
}>({
  name: "",
  id: "",
});
export const [credentialOptions, setCredentialOptions] = createSignal([]);
export const [selectedCredential, setSelectedCredential] = createSignal(null);
export const [formData, setFormData] = createSignal<{
  [key: string]: {
    [key: string]: any;
  };
}>({});
