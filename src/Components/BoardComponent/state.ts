import { createSignal } from "solid-js";

export const [draggable, setDraggable] = createSignal<boolean>(false);
export const [isCtrlPressed, setIsCtrlPressed] = createSignal<boolean>(false);
export const [isSpacePressed, setIsSpacePressed] = createSignal<boolean>(false);
export const [scale, setScale] = createSignal<number>(1);
