import { createContext, createSignal, ParentComponent } from "solid-js";
import { StateContext } from "./StateContext";
import {
  scale,
  setScale,
  draggable,
  setDraggable,
  isCtrlPressed,
  isSpacePressed,
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
  setLastClickPosition
} from "./state";

const StateContextProvider: ParentComponent = (props) => {
  // console.log(draggable())
  return (
    <StateContext.Provider
      value={{
        scale,
        setScale,
        draggable,
        setDraggable,
        isCtrlPressed,
        isSpacePressed,
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
        setLastClickPosition
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
