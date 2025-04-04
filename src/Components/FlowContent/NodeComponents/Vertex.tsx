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
    inputBuffX: number,
    inputBuffY: number,
    nodeId: string,
    inputIndex: number
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
}

const Vertex: Component<VertexProps> = (props) => {
  const { newEdge, edgeLength, setIsOpen, isOpen } = useStateContext();
  function handleMouseEnterInput(inputRef: any, bufferRef: any, index: number) {
    const { left, right, top, bottom } = inputRef.getBoundingClientRect();
    const {
      left: leftB,
      right: rightB,
      top: topB,
      bottom: bottomB,
    } = bufferRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    // console.log({ inputX:centerX, inputY:centerY });
    const centerXB = leftB + Math.abs(leftB - rightB) / 2;
    const centerYB = topB + Math.abs(topB - bottomB) / 2;
    // console.log(centerXB, centerYB)
    props.onMouseEnterInput(
      centerX,
      centerY,
      centerXB,
      centerYB,
      props.id,
      index
    );
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
    const { left, right, top, bottom } = outputRef.getBoundingClientRect();
    // console.log(left, right, top, bottom);  
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    console.log({centerX, centerY})
    props.onMouseDownOutput(centerX, centerY, props.id, outputIndex, vertexId);
  }
  // console.log(props.isInputVertex, props.isOutputVertex)
  return (
    <div>
      {props.isInputVertex ? (
        <div class={style.inputsWrapper}>
          <For each={props.inputVertexIds}>
            {(_, index: Accessor<number>) => {
              let inputRef: any = null;
              let bufferRef: any = null;
              return (
                <div
                  onMouseEnter={() =>
                    handleMouseEnterInput(inputRef, bufferRef, index())
                  }
                  onMouseLeave={() => handleMouseLeaveInput(index())}
                >
                  <div
                    class={style.snapping}
                    ref={bufferRef}
                    onpointerdown={(e) => e.stopPropagation()}
                  ></div>
                  <div ref={inputRef} class={style.input}></div>
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
                  class={style.output}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(outputRef, event, index(), id)
                  }
                >
                  <div ref={outputRef} class={style.outputCircle}></div>
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
                      onClick={(event: any) => {
                        event.stopPropagation();
                        const sidebarContent =
                          document.getElementById("sidebar-content");
                        if (sidebarContent) {
                          sidebarContent.style.right = "0px";
                        }
                      }}
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
