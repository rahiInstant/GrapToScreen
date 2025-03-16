import { Component, JSX, ParentComponent } from "solid-js";
import style from "./style.module.css";
import Vertex from "./Vertex";
import TestNode from "./ChatNode/ChatNode";

interface NodeProps {
  id: string;
  x: number;
  y: number;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  content: Component;
  selected: boolean;
  onMouseDownNode: (event: any, id: string) => void;
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

const NodeMain: ParentComponent<NodeProps> = (props) => {
  // console.log(props.isInputVertex,props.isOutputVertex, 'node-main')

  return (
    <div
      class={props.selected ? style.nodeSelected : style.node}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseDown={(event: any) => {
        event.stopPropagation();
        props.onMouseDownNode(event, props.id);
      }}
    >
      <div class={style.content}><props.content/></div>
      {/* <TestNode selected={props.selected} onMouseDownNode={props.onMouseDownNode} id={props.id}/> */}
      <Vertex
        id={props.id}
        numberInputs={props.numberInputs}
        numberOutputs={props.numberOutputs}
        isInputVertex={props.isInputVertex}
        isOutputVertex={props.isOutputVertex}
        onMouseDownOutput={props.onMouseDownOutput}
        onMouseEnterInput={props.onMouseEnterInput}
        onMouseLeaveInput={props.onMouseLeaveInput}
      />
    </div>
  );
};

export default NodeMain;
