import { Accessor, Component, For } from "solid-js";
import style from "./style.module.css";

interface VertexProps {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  onMouseDownOutput: (
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number
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
    outputIndex: number
  ) {
    event.stopPropagation();
    const { left, right, top, bottom } = outputRef.getBoundingClientRect();
    const centerX = left + Math.abs(left - right) / 2;
    const centerY = top + Math.abs(top - bottom) / 2;
    props.onMouseDownOutput(centerX, centerY, props.id, outputIndex);
  }
  // console.log(props.isInputVertex, props.isOutputVertex)
  return (
    <div>
      {props.isInputVertex ? (
        <div class={style.inputsWrapper}>
          <For each={[...Array(Number(props.numberInputs)).keys()]}>
            {(_, index: Accessor<number>) => {
              let inputRef: any = null;
              return (
                <div
                  ref={inputRef}
                  class={style.input}
                  onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                  onMouseLeave={() => handleMouseLeaveInput(index())}
                ></div>
              );
            }}
          </For>
        </div>
      ) : (
        <div></div>
      )}
      {props.isOutputVertex && (
        <div class={style.outputsWrapper}>
          <For each={[...Array(Number(props.numberOutputs)).keys()]}>
            {(_, index: Accessor<number>) => {
              let outputRef: any = null;
              return (
                <div
                  ref={outputRef}
                  class={style.output}
                  onMouseDown={(event: any) =>
                    handleMouseDownOutput(outputRef, event, index())
                  }
                ></div>
              );
            }}
          </For>
        </div>
      )}
    </div>
  );
};

export default Vertex;
