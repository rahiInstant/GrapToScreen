import { Accessor, Component, For, Setter } from "solid-js";
import style from "./style.module.css";
import PlusIcon from "./PlusIcon";
import useStateContext from "../../BoardComponent/useStateContext";
import { c } from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";

interface VertexProps {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  // inputVertexIds: Record<string, HTMLElement | undefined>;
  // outputVertexIds: Record<string, HTMLElement | undefined>;
  inputVertexIds: Array<string>;
  outputVertexIds: Array<string>;
  busyIndex: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
    vertexId: string
  ) => void;
  onMouseEnterInput: (
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    inputIndex: number
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
}

const Vertex: Component<VertexProps> = (props) => {
  const { newEdge, edgeLength, setIsOpen, isOpen } = useStateContext();
  function handleMouseEnterInput(inputRef: any, index: number) {
    const { left, right, top, bottom } = inputRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    props.onMouseEnterInput(centerX, centerY, props.id, index);
  }
  function handleMouseLeaveInput(index: number) {
    props.onMouseLeaveInput(props.id, index);
  }
  function handleMouseDownOutput(
    outputRef: any,
    event: any,
    outputIndex: number,
    vertexId: string
  ) {
    // console.log(props.busyIndex.get());
    event.stopPropagation();
    console.log(event.clientX, event.clientY);
    const { left, right, top, bottom } = outputRef.getBoundingClientRect();
    // console.log(left, right, top, bottom);
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    console.log({ centerX, centerY });
    props.onMouseDownOutput(centerX, centerY, props.id, outputIndex, vertexId);
  }
  // console.log(props.isInputVertex, props.isOutputVertex)
  return (
    <div>
      {props.isInputVertex ? (
        <div class={style.inputsWrapper}>
          <For each={props.inputVertexIds}>
            {(id, index: Accessor<number>) => {
              let inputRef: any = null;
              let bufferRef: any = null;
              return (
                <div
                id={`input-${id}`}
                  onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                  onMouseLeave={() => handleMouseLeaveInput(index())}
                >
                  <div id={id} ref={inputRef} class={style.input}></div>
                </div>
              );
            }}
          </For>
        </div>
      ) : (
        <div></div>
      )}
      {props.isOutputVertex && (
        <div class={style.outputsWrapper}>
          <For each={props.outputVertexIds}>
            {(id, index: Accessor<number>) => {
              let outputRef: any = null;
              // console.log(props.busyIndex.get());
              return (
                <div
                  id={`output-${id}`}
                  class={style.output}
                  onClick={(event) => {
                    event.stopPropagation();
                    const sidebarContent =
                      document.getElementById("sidebar-content");
                    if (sidebarContent) {
                      sidebarContent.style.right = "0px";
                    }
                    setIsOpen(true);
                  }}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(outputRef, event, index(), id)
                  }
                >
                  <div id={id} ref={outputRef} class={style.outputCircle}></div>
                  <div
                    // class={style.plusLine}
                    classList={{
                      [style.plusLine]: true,
                      [style.plusLineHidden]:
                        (newEdge()?.outputVertexId == id &&
                          edgeLength() > 80) ||
                        props.busyIndex.get().includes(id),
                    }}
                  >
                    {props.numberOutputs > 1 && (
                      <div class={style.vertexNum}>{index()}</div>
                    )}
                    <div class={style.outputLine}></div>
                    <div
                      class={style.outputPlus}
                      id="plus"
                      // onClick={(event: any) => {
                      //   event.stopPropagation();
                      //   const sidebarContent =
                      //     document.getElementById("sidebar-content");
                      //   if (sidebarContent) {
                      //     sidebarContent.style.right = "0px";
                      //   }
                      //   setIsOpen(true);
                      // }}
                    >
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      )}
    </div>
  );
};

export default Vertex;
