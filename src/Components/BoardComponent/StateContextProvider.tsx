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
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
