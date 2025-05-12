import { Component, createEffect, createSignal, onMount } from "solid-js";
import TopPart from "./TopPart/TopPart";
import BottomPart from "./BottomPart/BottomPart";
import useStateContext from "../useStateContext";

const Modal: Component<{}> = (props) => {
  // const [isModalOpen, setIsModalOpen] = createSignal(false);
  const { isModalOpen, setIsModalOpen } = useStateContext();

  createEffect(() => {
    // console.log(isModalOpen());
  });

  onMount(() => {
    const modal = document.getElementById("modal");
    window.addEventListener("click", (e) => {
      // console.log(e.target === modal);
      if (e.target === modal) {
        setIsModalOpen(false);
      }
    });
  });

  function handleOnClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    setIsModalOpen(true);
  }

  return (
    <div
      id="modal"
      // onClick={handleOnClick}
      class={`fixed inset-0 z-[9999] w-full h-full bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
        isModalOpen() ? "block" : "hidden"
      }`}
    >
      <div class="border border-white/20 rounded-[9px]">
        <div class="w-[90vw] max-w-[1000px] h-[95vh] max-h-[90vh] border border-purple-500/20 rounded-[9px] flex flex-col">
          <TopPart />
          <BottomPart />
        </div>
      </div>
    </div>
  );
};

export default Modal;
