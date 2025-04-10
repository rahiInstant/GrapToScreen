import { Component, createEffect, createSignal } from "solid-js";
import style from "./style.module.css";
import useStateContext from "../../BoardComponent/useStateContext";

interface EdgeProps {
  selected: boolean;
  isNew: boolean;
  position: { x0: number; y0: number; x1: number; y1: number };
  onMouseDownEdge: () => void;
  onClickDeleteEdge: () => void;
}

const EdgeComponent: Component<EdgeProps> = (props) => {
  const [middlePoint, setMiddlePoint] = createSignal<{ x: number; y: number }>({
    x: props.position.x0 + (props.position.x1 - props.position.x0) / 2,
    y: props.position.y0 + (props.position.y1 - props.position.y0) / 2,
  });
  const board = document.getElementById("board");

  const { setEdgeLength, setEdgeEnd, scale, transform, edgeLength } =
    useStateContext();

  createEffect(() => {
    const middleX =
      props.position.x0 + (props.position.x1 - props.position.x0) / 2;
    const middleY =
      props.position.y0 + (props.position.y1 - props.position.y0) / 2;
    setMiddlePoint({ x: middleX, y: middleY });

    const dx = props.position.x1 - props.position.x0;
    const dy = props.position.y1 - props.position.y0;
    const length = Math.sqrt(dx * dx + dy * dy);
    console.log(props.position.x0, props.position.y0);
    // console.log({px:props.position.x1, py:props.position.y1});

    console.log("edgelength", edgeLength());

    setEdgeLength(length);
    setEdgeEnd({ x: props.position.x1, y: props.position.y1 });
  });

  const handleOnMouseDownEdge = (event: any) => {
    console.log("transform", transform().x, transform().y);
    event.stopPropagation();
    props.onMouseDownEdge();
    console.log(document.getElementById("boardWrapper")?.offsetHeight);
  };

  const handleOnMouseDeleteEdge = (event: any) => {
    event.stopPropagation();
    props.onClickDeleteEdge();
  };

  const extra = () => Math.abs(props.position.x1 - props.position.x0) / 2;

  const getPath = (x0: number, y0: number, x1: number, y1: number) => {
    const corner = 10;

    // Define horizontal positions
    const midTopX = x0 + 40; // right offset from source
    const midLeftX = x1 - 40; // left offset from target

    // Define vertical midpoint
    const midY = (y0 + y1) / 2;

    const dx = x1 - x0;
    const dy = y1 - y0;
    const midTopY = y0 + 40; // top offset from source
    const midLeftY = y1 - 40; // bottom offset from target
    const midX = (x0 + x1) / 2;
    const verticalBuffer = 120;
    const edgeDirectionChangeThreshold = 105;
    console.log(dx, dy);
    let buffer = 20;

    function getCorner() {
      if (dy > 105 && dy < 135) {
        return 0;
      }
      return corner;
    }

    if (dx < 40 && edgeLength() > 70) {
      return `
      M ${x0} ${y0}
      L ${midTopX - corner} ${y0}
      Q ${midTopX} ${y0} ${midTopX} ${y0 + corner}
  
      L ${midTopX} ${y0 + verticalBuffer - corner}
      Q ${midTopX} ${y0 + verticalBuffer} ${midTopX - corner} ${
        y0 + verticalBuffer
      }
  
      L ${midLeftX + corner} ${y0 + verticalBuffer}
      Q ${midLeftX} ${y0 + verticalBuffer} ${midLeftX} ${
        dy > edgeDirectionChangeThreshold
          ? y0 + verticalBuffer + getCorner()
          : y0 + verticalBuffer - getCorner()
      }
  
      L ${midLeftX} ${
        dy > edgeDirectionChangeThreshold ? y1 - getCorner() : y1 + getCorner()
      }
      Q ${midLeftX} ${y1} ${midLeftX + corner} ${y1}
  
      L ${x1} ${y1}
    `;
    }

    return `M ${props.position.x0} ${props.position.y0} C ${
      props.position.x0 + extra()
    } ${props.position.y0}, ${props.position.x1 - extra()} ${
      props.position.y1
    }, ${props.position.x1} ${props.position.y1}`;
  };

  return (
    <svg class={style.wrapper}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 6 3 L 0 6 z" fill="#c3c9d5" />
        </marker>
      </defs>
      <path
        class={
          props.isNew
            ? style.edgeNew
            : props.selected
            ? style.edgeSelected
            : style.edge
        }
        d={getPath(
          props.position.x0,
          props.position.y0,
          props.position.x1,
          props.position.y1
        )}
        marker-end="url(#arrowhead)"
        onMouseDown={handleOnMouseDownEdge}
      ></path>

      <g
        class={props.selected ? style.delete : style.deleteHidden}
        transform={`translate(${middlePoint().x}, ${
          middlePoint().y - (props.selected ? 24 : 0)
        })`}
        onMouseDown={handleOnMouseDeleteEdge}
      >
        <circle class={style.circle}></circle>
        <svg
          fill="currentColor"
          stroke-width="0"
          width="30"
          height="30"
          viewBox="210 240 1000 1000"
          style="overflow: visible;"
          class={style.icon}
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </g>
    </svg>
  );
};

export default EdgeComponent;
