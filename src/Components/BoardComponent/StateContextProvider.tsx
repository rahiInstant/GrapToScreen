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
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
