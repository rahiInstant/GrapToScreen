import { createSignal } from "solid-js";
import { Edge } from "../ButtonComponents/Types";

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
