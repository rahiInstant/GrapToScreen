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
} from "./state";

export const StateContext = createContext<{
  scale: () => number;
  setScale:(scale:number) => void
  draggable: () => boolean;
  setDraggable: (draggable: boolean) => void;
  isCtrlPressed: () => boolean;
  isSpacePressed: () => boolean;
  setIsCtrlPressed: (isCtrlPressed: boolean) => void;
  setIsSpacePressed: (isSpacePressed: boolean) => void;
}>({
  scale,
  setScale,
  draggable,
  setDraggable,
  isCtrlPressed,
  setIsCtrlPressed,
  isSpacePressed,
  setIsSpacePressed,
});
