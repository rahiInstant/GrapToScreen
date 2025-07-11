import { Accessor, Component, createEffect, For, Setter } from "solid-js";
import style from "./style.module.css";
import PlusIcon from "./PlusIcon";
import useStateContext from "../../BoardComponent/useStateContext";

interface VertexProps {
  id: string;
  name: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  isDownVertex: boolean;
  isUpVertex: boolean;
  downVertexNumber: number;
  upVertexNumber: number;
  downVertexIds: Array<string>;
  upVertexIds: Array<string>;
  downVertexOrientation: string;
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
    vertexId: string,
    typeOfEdge: string
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
  const { newEdge, edgeLength, setIsOpen, setPendingOutput } =
    useStateContext();

  //==================================================
  // handle all things related to when cursor with edge
  // come into input vertex area of the node (any node)
  //==================================================
  function handleMouseEnterInput(inputRef: any, index: number) {
    const { left, right, top, bottom } = inputRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    props.onMouseEnterInput(centerX, centerY, props.id, index);
    // console.log(inputRef);
  }

  //=====================================================
  // handle all things related to when cursor with edge
  // goes out of input vertex area of the node (any node)
  function handleMouseLeaveInput(index: number) {
    props.onMouseLeaveInput(props.id, index);
  }

  //==================================================
  // handle all things related to when mouse down
  // output vertex of the node (any node)
  //==================================================
  function handleMouseDownOutput(
    outputRef: any,
    event: any,
    outputIndex: number,
    vertexId: string,
    typeOfEdge: string
  ) {
    // console.log(props.busyIndex.get());
    // console.log(typeOfEdge)
    event.stopPropagation();
    const { left, right, top, bottom } = outputRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    // console.log({ centerX, centerY });
    props.onMouseDownOutput(
      centerX,
      centerY,
      props.id,
      outputIndex,
      vertexId,
      typeOfEdge
    );
  }

  // createEffect(() => {
  //   console.log("from vertex", props.outputVertexIds)
  // })

  return (
    <div>
      {/* render all input vertex of a node */}
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

      {/* render all output vertex of a node */}
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
                    setIsOpen(true);
                    setPendingOutput({
                      nodeId: props.id,
                      outputVertexIndex: index(),
                    });
                  }}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(outputRef, event, index(), id, "solid")
                  }
                >
                  <div id={id} ref={outputRef} class={style.outputCircle}></div>
                  <div
                    // class={style.plusLine}
                    classList={{
                      [style.plusLine]: true,
                      [style.plusLineHidden]:
                        (newEdge()?.outputVertexId == id &&
                          edgeLength() > 10) ||
                        props.busyIndex.get().includes(id),
                    }}
                  >
                    {props.numberOutputs > 1 && (
                      <div class={style.vertexNum}>{index()}</div>
                    )}
                    <div class={style.outputLine}></div>
                    <div class={style.outputPlus} id="plus">
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      )}
      {/* render down vertex */}
      {props.isDownVertex && (
        <div class={`${style.outputsDownWrapper} `}>
          <For each={props.downVertexIds}>
            {(id, index: Accessor<number>) => {
              let outputRef: any = null;
              // console.log(props.busyIndex.get());
              return (
                <div
                  id={`output-${id}`}
                  class={style.outputDown}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(true);
                    setPendingOutput({
                      nodeId: props.id,
                      outputVertexIndex: index(),
                    });
                  }}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(outputRef, event, index(), id, "dash")
                  }
                >
                  <div
                    id={id}
                    ref={outputRef}
                    class={style.outputDownVertex}
                  ></div>
                  <div
                    // class={style.plusLine}
                    classList={{
                      [style.downPlusLine]: true,
                      // [style.plusLineHidden]:
                      //   (newEdge()?.outputVertexId == id &&
                      //     edgeLength() > 10) ||
                      //   props.busyIndex.get().includes(id),
                    }}
                  >
                    {/* {props.numberOutputs > 1 && (
                      <div class={style.vertexNum}>{index()}</div>
                    )} */}
                    <div class={style.downOutputLine}></div>
                    <div class={style.outputPlus} id="plus">
                      <PlusIcon />
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      )}
      {/* render up vertex */}
      {props.isUpVertex ? (
        <div class={style.inputsUPWrapper}>
          <For each={props.upVertexIds}>
            {(id, index: Accessor<number>) => {
              let inputRef: any = null;
              let bufferRef: any = null;
              return (
                <div
                  id={`input-${id}`}
                  onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                  onMouseLeave={() => handleMouseLeaveInput(index())}
                >
                  <div id={id} ref={inputRef} class={style.inputUp}></div>
                </div>
              );
            }}
          </For>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Vertex;
