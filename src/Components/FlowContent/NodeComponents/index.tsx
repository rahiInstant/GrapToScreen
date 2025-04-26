import {
  Accessor,
  Component,
  createSignal,
  JSX,
  onMount,
  ParentComponent,
  Setter,
} from "solid-js";
import style from "./style.module.css";
import Vertex from "./Vertex";
import { customNodeProps } from "../../ButtonComponents/Types";
import PlayIcon from "./PlayIcon";
import PowerIcon from "./PowerIcon";
import DeleteIcon from "./DeleteIcon";
import OptionIcon from "./OptionIcon";

interface NodeProps {
  id: string;
  x: number;
  y: number;
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
  content: Component<customNodeProps>;
  selected: boolean;
  onMouseDownNode: (event: any, id: string) => void;
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
    // inputBuffX: number,
    // inputBuffY: number,
    nodeId: string,
    inputIndex: number
  ) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;
  onClickDeleteNode: (nodeId: string) => void;
}

const NodeMain: Component<NodeProps> = (props) => {
  return (
    <div
      id={props.id}
      class={props.selected ? style.nodeSelected : style.node}
      // classList={{
      //   [style.nodeSelected]: props.selected,
      //   [style.node]: !props.selected,
      // }}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onPointerDown={(event: any) => {
        // console.log(props.inputVertexIds, props.outputVertexIds);
        event.stopPropagation();
        props.onMouseDownNode(event, props.id);
      }}
    >
      <div class={style.functionWrapper}>
        <div id="function" class={style.function}>
          <div onClick={(e) => e.stopPropagation()}>
            <PlayIcon />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <PowerIcon />
          </div>
          <div
            onPointerDown={(event: any) => {
              event.stopPropagation();
              props.onClickDeleteNode(props.id);
            }}
          >
            <DeleteIcon />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <OptionIcon />
          </div>
        </div>
      </div>
      <div>
        <props.content selected={props.selected} />
      </div>
      {/* <TestNode selected={props.selected} onMouseDownNode={props.onMouseDownNode} id={props.id}/> */}
      <Vertex
        id={props.id}
        numberInputs={props.numberInputs}
        numberOutputs={props.numberOutputs}
        isInputVertex={props.isInputVertex}
        isOutputVertex={props.isOutputVertex}
        inputVertexIds={props.inputVertexIds}
        outputVertexIds={props.outputVertexIds}
        busyIndex={props.busyIndex}
        onMouseDownOutput={props.onMouseDownOutput}
        onMouseEnterInput={props.onMouseEnterInput}
        onMouseLeaveInput={props.onMouseLeaveInput}
      />
    </div>
  );
};

export default NodeMain;
