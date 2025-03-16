import { Accessor, Component, createSignal, For, JSX, Setter } from "solid-js";
import style from "./style.module.css";
import NodeMain from "../FlowContent/NodeComponents";
import useStateContext from "./useStateContext";
import EdgeComponent from "../FlowContent/EdgeComponents";

interface Node {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  content: Component;
  prevPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  inputEdgeIds: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  outputEdgeIds: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
}

interface Edge {
  id: string;
  nodeStartId: string;
  nodeEndId: string;
  inputIndex: number;
  outputIndex: number;
  nodeEndInputIndex?: number; // Added property
  prevStartPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  prevEndPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currStartPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
  currEndPosition: {
    get: Accessor<{ x: number; y: number }>;
    set: Setter<{ x: number; y: number }>;
  };
}

interface BoardComponent {
  nodes: Accessor<Node[]>;
  // selectedNode: () => string | null
  // setSelectedNode: (selectedNode: string|null) => void
  // edges:() => Edge[]
  // setEdges: (edge: Edge[]) => void
}

const Board: Component<BoardComponent> = ({ nodes}) => {
  const [clickedPosition, setClickedPosition] = createSignal<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const [boardDragging, setBoardDragging] = createSignal<boolean>(false);
  const [selectedNode, setSelectedNode] = createSignal<string | null>(null);
  const [edges, setEdges] = createSignal<Edge[]>([]);
  const [newEdge, setNewEdge] = createSignal<Edge | null>(null);
  const { draggable, isCtrlPressed, isSpacePressed, scale } = useStateContext();
  
  const [selectedEdge, setSelectedEdge] = createSignal<string | null>(null);
  const [insideInput, setInsideInput] = createSignal<{
    nodeId: string;
    inputIndex: number;
    positionX: number;
    positionY: number;
  } | null>(null);
  // console.log(draggable())
  const handleOnMouseMove = (event: any) => {
    const isKeyPress = isCtrlPressed() || isSpacePressed();
    const clickedPositionOk =
      clickedPosition().x >= 0 && clickedPosition().y >= 0;
    // const isSelectedNode = selectedNode()
    if (clickedPositionOk && selectedNode() !== null) {
      const deltaX = event.x - clickedPosition().x;
        const deltaY = event.y - clickedPosition().y;

        const node = nodes().find((node) => node.id === selectedNode());
        if (node) {
          // Update node position
          node.currPosition.set((_) => {
            return {
              x: (node.prevPosition.get().x + deltaX) / scale(),
              y: (node.prevPosition.get().y + deltaY) / scale(),
            };
          });

          // Update input edges positions
          for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
            const edgeId = node.inputEdgeIds.get()[i];
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              // console.log(edge, "input");
              edge.currEndPosition.set((_) => {
                return {
                  x: (edge.prevEndPosition.get().x + deltaX) / scale(),
                  y: (edge.prevEndPosition.get().y + deltaY) / scale(),
                };
              });
            }
          }

          // Update output edges positions
          for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
            const edgeId = node.outputEdgeIds.get()[i];
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              // console.log(edge, "output");
              edge.currStartPosition.set((_) => {
                return {
                  x: (edge.prevStartPosition.get().x + deltaX) / scale(),
                  y: (edge.prevStartPosition.get().y + deltaY) / scale(),
                };
              });
            }
          }
        }
    } else if (isKeyPress && clickedPositionOk && selectedNode() === null) {
      event.preventDefault();
      const deltaX = event.x - clickedPosition().x;
      const deltaY = event.y - clickedPosition().y;
      console.log(clickedPosition());

      const boardWrapperElement = document.getElementById("boardWrapper");
      if (boardWrapperElement) {
        boardWrapperElement.scrollBy(-deltaX, -deltaY);
        setClickedPosition({ x: event.x, y: event.y });
      }
    }

    if (newEdge() !== null) {
      const boardWrapperElement = document.getElementById("boardWrapper");
      if (boardWrapperElement) {
        newEdge()?.currEndPosition.set({
          x: (event.x + boardWrapperElement.scrollLeft) / scale(),
          y: (event.y + +boardWrapperElement.scrollTop) / scale(),
        });
      }
    }
  };

  const handleOnMouseUp = () => {
    setClickedPosition({ x: -1, y: -1 });

    // Stop grabbing board
    setBoardDragging(false);

    // If a new edge is being set and is not inside input
    if (newEdge() !== null && insideInput() === null) {
      setNewEdge(null);
    }

    // If a new edge is being set and is inside input
    if (newEdge() !== null && insideInput() !== null) {
      const nodeStartId = newEdge()!.nodeStartId;
      const nodeEndId = insideInput()!.nodeId;

      const nodeStart = nodes().find((node) => node.id === nodeStartId);
      const nodeEnd = nodes().find((node) => node.id === nodeEndId);

      const boardWrapperElement = document.getElementById("boardWrapper");

      if (nodeStart && nodeEnd && boardWrapperElement) {
        const edgeId = `edge_${nodeStart.id}_${newEdge()?.outputIndex}_${
          nodeEnd.id
        }_${insideInput()?.inputIndex}`;

        if (
          nodeStart.outputEdgeIds.get().includes(edgeId) &&
          nodeEnd.inputEdgeIds.get().includes(edgeId)
        ) {
          setNewEdge(null);
          return;
        }

        nodeStart.outputEdgeIds.set([...nodeStart.outputEdgeIds.get(), edgeId]);
        nodeEnd.inputEdgeIds.set([...nodeEnd.inputEdgeIds.get(), edgeId]);

        // Update edge current positions
        newEdge()!.prevStartPosition.set((_) => {
          return {
            x:
              (newEdge()!.currStartPosition.get().x +
                boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (newEdge()!.currStartPosition.get().y +
                boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        newEdge()!.prevEndPosition.set((_) => {
          return {
            x:
              (insideInput()!.positionX + boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (insideInput()!.positionY + boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        newEdge()!.currEndPosition.set((_) => {
          return {
            x:
              (insideInput()!.positionX + boardWrapperElement.scrollLeft) /
              scale(),
            y:
              (insideInput()!.positionY + boardWrapperElement.scrollTop) /
              scale(),
          };
        });

        // Add new edge
        setEdges([
          ...edges(),
          {
            ...newEdge()!,
            id: edgeId,
            nodeEndId: nodeEnd.id,
            nodeEndInputIndex: insideInput()!.inputIndex,
          },
        ]);
        setNewEdge(null);
      }
    }
  };

  const handleOnMouseDown = (event: any) => {
    setSelectedNode(null);
    setSelectedEdge(null);
    if (isCtrlPressed() || isSpacePressed()) {
      // console.log(clickedPosition());

      setBoardDragging(true);
      setClickedPosition({ x: event.x, y: event.y });
    }
  };

  function handleOnMouseDownNode(event: any, id: string) {
    setSelectedNode(id);
    setClickedPosition({ x: event.x, y: event.y });
    const node = nodes().find((node) => node.id == selectedNode());
    if (node) {
      node.prevPosition.set((_) => {
        return {
          x: node.currPosition.get().x,
          y: node.currPosition.get().y,
        };
      });
      // Update input edges positions
      for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
        const edgeId = node.inputEdgeIds.get()[i];
        const edge = edges().find((edge) => edge.id === edgeId);

        if (edge) {
          edge.prevEndPosition.set(() => {
            return {
              x: edge.currEndPosition.get().x * scale(),
              y: edge.currEndPosition.get().y * scale(),
            };
          });
        }
      }

      // Update output edges positions
      for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
        const edgeId = node.outputEdgeIds.get()[i];
        const edge = edges().find((edge) => edge.id === edgeId);

        if (edge) {
          edge.prevStartPosition.set(() => {
            return {
              x: edge.currStartPosition.get().x * scale(),
              y: edge.currStartPosition.get().y * scale(),
            };
          });
        }
      }
    }
  }
  function handleOnMouseDownOutput(
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number
  ) {
    setSelectedNode(null);
    const boardWrapperElement = document.getElementById("boardWrapper");

    if (boardWrapperElement) {
      const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: outputPositionX + boardWrapperElement.scrollLeft / scale(),
        y: outputPositionY + boardWrapperElement.scrollTop / scale(),
      });
      const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: outputPositionX + boardWrapperElement.scrollLeft / scale(),
        y: outputPositionY + boardWrapperElement.scrollTop / scale(),
      });
      const [currEdgeStart, setCurrEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: outputPositionX + boardWrapperElement.scrollLeft / scale(),
        y: outputPositionY + boardWrapperElement.scrollTop / scale(),
      });
      const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: outputPositionX + boardWrapperElement.scrollLeft / scale(),
        y: outputPositionY + boardWrapperElement.scrollTop / scale(),
      });

      setNewEdge({
        id: "",
        nodeStartId: nodeId,
        outputIndex: outputIndex,
        nodeEndId: "",
        inputIndex: -1,
        prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
        prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
        currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
        currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
      });
    }
  }
  function handleOnMouseEnterInput(
    inputPositionX: number,
    inputPositionY: number,
    nodeId: string,
    inputIndex: number
  ) {
    setInsideInput({
      nodeId,
      inputIndex,
      positionX: inputPositionX,
      positionY: inputPositionY,
    });
  }
  function handleOnMouseLeaveInput(nodeId: string, inputIndex: number) {
    if (
      insideInput()?.nodeId == nodeId &&
      insideInput()?.inputIndex == inputIndex
    ) {
      setInsideInput(null);
    }
  }
  function handleOnMouseDownEdge(edgeId: string) {
    setSelectedNode(null);
    setSelectedEdge(edgeId);
  }
  function handleOnDeleteEdge(edgeId: string) {
    const edge = edges().find((e) => e.id === edgeId);

    if (edge) {
      const nodeStart = nodes().find((n) => n.id == edge.nodeStartId);
      if (nodeStart) {
        nodeStart.outputEdgeIds.set([
          ...nodeStart.outputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== edge.id),
        ]);
      }
      const nodeEnd = nodes().find((n) => n.id === edge.nodeEndId);
      if (nodeEnd) {
        nodeEnd.inputEdgeIds.set([
          ...nodeEnd.inputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== edge.nodeEndId),
        ]);
      }

      setEdges([...edges().filter((e) => e.id !== edge.id)]);
    }
  }

  return (
    <div>
      <canvas
        id="board"
        class={
          boardDragging()
            ? style.boardDragging
            : draggable()
            ? style.draggable
            : style.board
        }
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onMouseMove={handleOnMouseMove}
      >
        <For each={nodes()}>
          {(node: Node) => (
            <NodeMain
              id={node.id}
              x={node.currPosition.get().x}
              y={node.currPosition.get().y}
              numberInputs={node.numberInputs}
              numberOutputs={node.numberOutputs}
              isInputVertex={node.isInputVertex}
              isOutputVertex={node.isOutputVertex}
              content={node.content}
              selected={selectedNode() == node.id}
              onMouseDownNode={handleOnMouseDownNode}
              onMouseDownOutput={handleOnMouseDownOutput}
              onMouseEnterInput={handleOnMouseEnterInput}
              onMouseLeaveInput={handleOnMouseLeaveInput}
            />
          )}
        </For>
        {newEdge() !== null && (
          <EdgeComponent
            selected={false}
            isNew={true}
            position={{
              x0: newEdge()!.currStartPosition.get().x,
              y0: newEdge()!.currStartPosition.get().y,
              x1: newEdge()!.currEndPosition.get().x,
              y1: newEdge()!.currEndPosition.get().y,
            }}
            onMouseDownEdge={() => {}}
            onClickDeleteEdge={() => {}}
          />
        )}

        <For each={edges()}>
          {(edges: Edge) => (
            <EdgeComponent
              selected={selectedEdge() === edges.id}
              isNew={false}
              position={{
                x0: edges.currStartPosition.get().x,
                y0: edges.currStartPosition.get().y,
                x1: edges.currEndPosition.get().x,
                y1: edges.currEndPosition.get().y,
              }}
              onMouseDownEdge={() => handleOnMouseDownEdge(edges.id)}
              onClickDeleteEdge={() => handleOnDeleteEdge(edges.id)}
            />
          )}
        </For>
      </canvas>
    </div>
  );
};

export default Board;
