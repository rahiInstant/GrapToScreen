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
} from "./state";
import { Edge } from "../ButtonComponents/Types";

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
  edgeEnd:() => {x: number, y: number}
  setEdgeEnd:(edgeEnd: {x: number, y: number}) => void
  transform: () => { x: number; y: number };
  setTransform: (transform: { x: number; y: number }) => void;
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
});
