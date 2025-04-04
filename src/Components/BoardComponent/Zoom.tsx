import {
  Component,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import style from "./style.module.css";
import { StateContext } from "./StateContext";
import useStateContext from "./useStateContext";

interface ZoomProps {
  minScale?: number;
  maxScale?: number;
}

const Zoom: Component<ZoomProps> = ({ minScale = 1, maxScale = 2 }) => {
  // const [scale, setScale] = createSignal<number>(1);

  const {
    setDraggable,
    setIsCtrlPressed,
    setIsSpacePressed,
    isCtrlPressed,
    isSpacePressed,
    scale,
    setScale,
  } = useStateContext();

  onMount(() => {
    const boardElement = document.getElementById("pane");
    // const backgroundElement: HTMLElement | null =
    //   document.getElementById("background");

    const handleOnkeyUp = (event: any) => {
      // console.log(event)
      if (!event.ctrlKey) setIsCtrlPressed(false);
      if (event.code == "Space") {
        event.preventDefault();
        setIsSpacePressed(false);
      }
      setDraggable(false);
    };
    const handleOnkeyDown = (event: any) => {
      if (event.ctrlKey) setIsCtrlPressed(true);
      if (event.code == "Space") {
        event.preventDefault();
        setIsSpacePressed(true);
      }
      setDraggable(true);
      //   console.log(isSpacePressed());
    };

    if (boardElement) {
      const handleWheel = (event: any) => {
        event.preventDefault();
        if (isCtrlPressed() || isSpacePressed()) {
          console.log("good");
          handleScale(event, () => {
            return scale() + event.deltaY * -0.0001;
          });
        }
      };
      document.addEventListener("keyup", handleOnkeyUp);
      document.addEventListener("keydown", handleOnkeyDown);
      boardElement.addEventListener("wheel", handleWheel, { passive: false });
      // onCleanup(() => {
      //   document.removeEventListener("keydown", handleOnkeyDown);
      //   document.removeEventListener("keyup", handleOnkeyUp);
      //   boardElement.removeEventListener("wheel", handleWheel);
      // });
    }
  });

  const handleScale = (event: any, cb: Function) => {
    const boardElement = document.getElementById("pane");
    // const backgroundElement: HTMLElement | null =
    //   document.getElementById("background");
    if (boardElement) {
      event.preventDefault();
      setScale(cb());
      setScale(Math.min(Math.max(minScale, scale()), maxScale));
      boardElement.style.transform = `scale(${scale()})`;
      // boardElement.style.marginTop = `${(scale() - 1) * 50}vh`;
      // boardElement.style.marginLeft = `${(scale() - 1) * 50}vw`;
      // boardElement.style.marginTop = `${(scale() - 1) * 50}vh`;
      // boardElement.style.marginLeft = `${(scale() - 1) * 50}vw`;
      // if (backgroundElement) {
      //   backgroundElement.style.transform = `scale(${scale()})`;
      // }
    }
  };

  return (
    <div id="zoom-control" class={style.zoomControl}>
      <button title="fit" type="button" id="zoom-fit" class={style.zoomFit}>
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="1.5em"
          width="1.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path>
        </svg>
      </button>
      <button
        title="in"
        type="button"
        id="zoom-in"
        class={style.zoomIn}
        onclick={(e) => handleScale(e, () => scale() + 0.01)}
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          height="1.3em"
          width="1.3em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"
          ></path>
        </svg>
      </button>
      <button
        title="out"
        type="button"
        id="zoom-out"
        class={style.zoomOut}
        onclick={(e) => handleScale(e, () => Math.max(1, scale() - 0.01))}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          height="1.3em"
          width="1.3em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"
          ></path>
        </svg>
      </button>
      <button
        title="reset"
        type="button"
        id="zoom-reset"
        class={scale() > 1 ? style.zoomReset : style.zoomResetHide}
        onclick={(e) =>
          handleScale(e, () => {
            setScale(1);
            return scale();
          })
        }
      >
        <svg
          fill="none"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Zoom;
