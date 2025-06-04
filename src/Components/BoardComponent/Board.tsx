import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Setter,
} from "solid-js";
import style from "./style.module.css";
import NodeMain from "../FlowContent/NodeComponents";
import useStateContext from "./useStateContext";
import EdgeComponent from "../FlowContent/EdgeComponents";
import { customNodeProps, Edge, Node } from "../ButtonComponents/Types";

// ***************
// node data type
// ***************
// interface Node {
//   id: string;
//   name: string;
//   numberInputs: number;
//   numberOutputs: number;
//   isInputVertex: boolean;
//   isOutputVertex: boolean;
//   isDownVertex?: boolean;
//   isUpVertex?: boolean;
//   downVertexNumber?: number;
//   upVertexNumber?: number;
//   downVertexOrientation?: string;
//   inputVertexIds: Array<string>;
//   outputVertexIds: Array<string>;
//   downVertexIds: Array<string>;
//   upVertexIds: Array<string>;
//   // inputVertexIds: Record<string, HTMLElement | undefined>;
//   // outputVertexIds: Record<string, HTMLElement | undefined>;
//   busyIndex: {
//     get: Accessor<string[]>;
//     set: Setter<string[]>;
//   };
//   content: Component<customNodeProps>;
//   prevPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
//   currPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
//   inputEdgeIds: {
//     get: Accessor<string[]>;
//     set: Setter<string[]>;
//   };
//   outputEdgeIds: {
//     get: Accessor<string[]>;
//     set: Setter<string[]>;
//   };
// }

// ***************
// edge data type
// ***************
// interface Edge {
//   id: string;
//   nodeStartId: string;
//   typeOfEdge: string;
//   nodeEndId: string;
//   inputIndex: number;
//   outputIndex: number;
//   nodeEndInputIndex?: number;
//   outputVertexId: string;
//   prevStartPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
//   prevEndPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
//   currStartPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
//   currEndPosition: {
//     get: Accessor<{ x: number; y: number }>;
//     set: Setter<{ x: number; y: number }>;
//   };
// }

interface BoardComponent {
  // nodes: Accessor<Node[]>;
  // setNodes: (nodes: Node[]) => void;
}

const Board: Component<BoardComponent> = () => {
  const [clickedPosition, setClickedPosition] = createSignal<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const [boardDragging, setBoardDragging] = createSignal<boolean>(false);

  const {
    draggable,
    isCtrlPressed,
    isSpacePressed,
    scale,
    edges,
    newEdge,
    setEdges,
    setNewEdge,
    transform,
    setTransform,
    preTransform,
    setPreTransform,
    selectedNode,
    setSelectedNode,
    setLastClickPosition,
    setEdgeLength,
    nodes,
    setNodes,
  } = useStateContext();

  createEffect(() => {
    // console.log("from board", nodes());
    // console.log(edges());
  });
  // const [cursor, setCursor] = createSignal({ x: 0, y: 0 });

  const [selectedEdge, setSelectedEdge] = createSignal<string | null>(null);
  const [insideInput, setInsideInput] = createSignal<{
    nodeId: string;
    inputIndex: number;
    positionX: number;
    positionY: number;
  } | null>(null);

  const [selectionBox, setSelectionBox] = createSignal<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);

  const [selectedNodesGroup, setSelectedNodesGroup] = createSignal<string[]>(
    []
  );

  const [groupBoundingBox, setGroupBoundingBox] = createSignal<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);

  const [lastPointer, setLastPointer] = createSignal<{
    x: number;
    y: number;
  } | null>(null);
  // const [edgeDragging, setEdgeDragging] = createSignal<boolean>(false);

  onMount(() => {
    const handleOnDeleteKeyDown = (event: any) => {
      if (event.code === "Delete") {
        if (selectedNodesGroup() && selectedNode() === null) {
          selectedNodesGroup().forEach((nodeId) => {
            const node = nodes().find((node) => node.id === nodeId);
            if (node) {
              handleOnClickDeleteNode(node.id);
            }
          });
          setGroupBoundingBox(null);
        } else if (selectedNode() !== null) {
          const node = nodes().find((node) => node.id === selectedNode());
          if (node) {
            handleOnClickDeleteNode(node.id);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    const paneElement = document.getElementById("pane");

    if (paneElement) {
      paneElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    // document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleOnDeleteKeyDown);

    onCleanup(() => {
      // document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleOnDeleteKeyDown);
      if (paneElement) {
        paneElement.removeEventListener("wheel", handleWheel);
      }
    });
  });

  //==================================================
  // This function for panning Guided by bounding box
  //==================================================

  function PanGuidedByNodeOrBoundingBox(event: MouseEvent) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let deltaX = 0;
    let deltaY = 0;
    const SCREEN_MARGIN = 60;
    const PAN_SPEED = 10;

    if (event.clientX < SCREEN_MARGIN) deltaX = PAN_SPEED;
    else if (event.clientX > windowWidth - SCREEN_MARGIN) deltaX = -PAN_SPEED;

    if (event.clientY < SCREEN_MARGIN) deltaY = PAN_SPEED;
    else if (event.clientY > windowHeight - SCREEN_MARGIN) deltaY = -PAN_SPEED;

    if (deltaX !== 0 || deltaY !== 0) {
      // ******* Move the board *********
      setTransform((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setPreTransform((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      // ********* Correct clickedPosition shifting depending on mode ********
      if (groupBoundingBox()) {
        setClickedPosition((prev) => ({
          x: prev.x - deltaX,
          y: prev.y - deltaY,
        }));
      } else {
        setClickedPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));
      }

      if (groupBoundingBox()) {
        setGroupBoundingBox((prev) => ({
          x: prev!.x - deltaX / scale(),
          y: prev!.y - deltaY / scale(),
          width: prev!.width,
          height: prev!.height,
        }));

        selectedNodesGroup().forEach((nodeId) => {
          const node = nodes().find((n) => n.id === nodeId);
          if (node) {
            const prevPos = node.currPosition.get();
            node.currPosition.set({
              x: prevPos.x - deltaX / scale(),
              y: prevPos.y - deltaY / scale(),
            });

            node.inputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevEnd = edge.currEndPosition.get();
                edge.currEndPosition.set({
                  x: prevEnd.x - deltaX / scale(),
                  y: prevEnd.y - deltaY / scale(),
                });
              }
            });

            node.outputEdgeIds.get().forEach((edgeId) => {
              const edge = edges().find((e) => e.id === edgeId);
              if (edge) {
                const prevStart = edge.currStartPosition.get();
                edge.currStartPosition.set({
                  x: prevStart.x - deltaX / scale(),
                  y: prevStart.y - deltaY / scale(),
                });
              }
            });
          }
        });
      } else if (selectedNode() !== null) {
        const node = nodes().find((n) => n.id === selectedNode());
        if (node) {
          const prevPos = node.currPosition.get();
          node.currPosition.set({
            x: prevPos.x - deltaX / scale(),
            y: prevPos.y - deltaY / scale(),
          });

          // *********** Move input edges for single node ************
          node.inputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((e) => e.id === edgeId);
            if (edge) {
              const prevEnd = edge.currEndPosition.get();
              edge.currEndPosition.set({
                x: prevEnd.x - deltaX / scale(),
                y: prevEnd.y - deltaY / scale(),
              });
            }
          });

          // ************ Move output edges for single node ************
          node.outputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((e) => e.id === edgeId);
            if (edge) {
              const prevStart = edge.currStartPosition.get();
              edge.currStartPosition.set({
                x: prevStart.x - deltaX / scale(),
                y: prevStart.y - deltaY / scale(),
              });
            }
          });
        }
      }
    }
  }

  //==================================================
  // This function for handling all mouse move on the board
  // like move board, move node/nodeGroup (bounding box)
  //==================================================

  const handleOnMouseMove = (event: MouseEvent) => {
    const isKeyPress = isCtrlPressed() || isSpacePressed();
    const deltaX = event.x - clickedPosition().x;
    const deltaY = event.y - clickedPosition().y;
    // setCursor({ x: event.x, y: event.y });

    // ********** selection box dragging and move multiple nodes ************
    if (selectionBox()) {
      const start = clickedPosition();
      const width = event.clientX - start.x;
      const height = event.clientY - start.y;

      setSelectionBox({
        x: start.x,
        y: start.y,
        width,
        height,
      });
      const box = {
        x: Math.min(start.x, event.clientX),
        y: Math.min(start.y, event.clientY),
        width: Math.abs(width),
        height: Math.abs(height),
      };
      const liveSelectedNodes = nodes().filter((node) => {
        const nodeRef = document.getElementById(node.id);
        if (!nodeRef) return false;

        const nodeX = node.currPosition.get().x * scale() + transform().x;
        const nodeY = node.currPosition.get().y * scale() + transform().y;
        const nodeWidth = nodeRef.offsetWidth;
        const nodeHeight = nodeRef.offsetHeight;

        return (
          nodeX + nodeWidth > box.x &&
          nodeX < box.x + box.width &&
          nodeY + nodeHeight > box.y &&
          nodeY < box.y + box.height
        );
      });
      setSelectedNodesGroup(liveSelectedNodes.map((node) => node.id));
    }
    // *********** move multiple nodes ************
    if (groupBoundingBox() && lastPointer()) {
      const dx = event.clientX - lastPointer()!.x;
      const dy = event.clientY - lastPointer()!.y;

      // ********** move groundBoundingBox (screen coords) *********
      const prev = groupBoundingBox()!;
      setGroupBoundingBox({
        x: prev.x + dx / scale(),
        y: prev.y + dy / scale(),
        width: prev.width,
        height: prev.height,
      });

      selectedNodesGroup().forEach((nodeId) => {
        const node = nodes().find((node) => node.id === nodeId);
        if (node) {
          const prevPos = node.currPosition.get();
          const newX = prevPos.x + dx / scale();
          const newY = prevPos.y + dy / scale();

          node.currPosition.set({ x: newX, y: newY });
          // ******** input edges ************
          node.inputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              const prevEnd = edge.currEndPosition.get();
              edge.currEndPosition.set(() => {
                return {
                  x: prevEnd.x + dx / scale(),
                  y: prevEnd.y + dy / scale(),
                };
              });
            }
          });
          // ************ output edges *************
          node.outputEdgeIds.get().forEach((edgeId) => {
            const edge = edges().find((edge) => edge.id === edgeId);
            if (edge) {
              const prevStart = edge.currStartPosition.get();
              edge.currStartPosition.set(() => {
                return {
                  x: prevStart.x + dx / scale(),
                  y: prevStart.y + dy / scale(),
                };
              });
            }
          });
        }
      });
      setLastPointer({ x: event.clientX, y: event.clientY });
      PanGuidedByNodeOrBoundingBox(event);
    }
    // ************ single node dragging ************
    else if (clickedPosition().x >= 0 && selectedNode() !== null) {
      const node = nodes().find((node) => node.id === selectedNode());
      // console.log(node)
      if (node) {
        // ************ Update node position ***************
        node.currPosition.set((_) => {
          return {
            x: (node.prevPosition.get().x + deltaX) / scale(),
            y: (node.prevPosition.get().y + deltaY) / scale(),
          };
        });

        // *********** input edges ************
        for (let i = 0; i < node.inputEdgeIds.get().length; i++) {
          const edgeId = node.inputEdgeIds.get()[i];
          // console.log(edgeId);
          const edge = edges().find((edge) => edge.id === edgeId);
          if (edge) {
            // console.log(edge, "input");
            edge.currEndPosition.set(() => {
              return {
                x: (edge.prevEndPosition.get().x + deltaX) / scale(),
                y: (edge.prevEndPosition.get().y + deltaY) / scale(),
              };
            });
          }
        }

        // ************ output edges **********
        for (let i = 0; i < node.outputEdgeIds.get().length; i++) {
          const edgeId = node.outputEdgeIds.get()[i];
          const edge = edges().find((edge) => edge.id === edgeId);
          if (edge) {
            // console.log(edge, "output");
            edge.currStartPosition.set(() => {
              return {
                x: (edge.prevStartPosition.get().x + deltaX) / scale(),
                y: (edge.prevStartPosition.get().y + deltaY) / scale(),
              };
            });
          }
        }

        PanGuidedByNodeOrBoundingBox(event);
      }
    }
    // ************ Board dragging **************
    else if (isKeyPress && boardDragging() && selectedNode() === null) {
      event.preventDefault();
      const deltaX = event.x - clickedPosition().x;
      const deltaY = event.y - clickedPosition().y;
      setTransform({
        x: deltaX + preTransform().x,
        y: deltaY + preTransform().y,
      });
    }

    // *********** new edge movement and snapping effect ************
    if (newEdge() !== null) {
      // console.log(newEdge(), "newEdge");
      setEdgeLength(getPathLength());
      const boardWrapperElement = document.getElementById("boardWrapper");
      const BUFFER_RADIUS = 50;
      if (boardWrapperElement) {
        const [foundInput, setFoundInput] = createSignal<{
          positionX: number;
          positionY: number;
          id: string;
        } | null>(null);

        // ************* check nearest input vertex ************
        for (const node of nodes()) {
          const leftOrTopInputVertex = node.isInputVertex || node.isUpVertex;
          if (node.id !== newEdge()!.nodeStartId && leftOrTopInputVertex) {
            // console.log(node);
            const inputVertexId = node.isInputVertex
              ? node.inputVertexIds[0]
              : node.upVertexIds[0];
            // console.log(inputVertexId, "inputVertexId");
            const inputVertexRef = document.getElementById(inputVertexId);
            const { left, right, top, bottom } =
              inputVertexRef!.getBoundingClientRect();
            const centerX = left + Math.abs(left - right) / 2;
            const centerY = top + Math.abs(top - bottom) / 2;

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // console.log(distance, "distance");
            if (distance < BUFFER_RADIUS) {
              setFoundInput({
                positionX: centerX,
                positionY: centerY,
                id: node.id,
              });
              break;
            }
          }
        }

        if (foundInput() !== null) {
          // console.log(foundInput(), "foundInput");
          //*********** Snap to input center ***********
          newEdge()?.currEndPosition.set({
            x: (foundInput()!.positionX - transform().x) / scale(),
            y: (foundInput()!.positionY - transform().y) / scale(),
          });

          // ********** save snapping input data **********
          setInsideInput({
            nodeId: foundInput()!.id,
            inputIndex: 0,
            positionX: foundInput()!.positionX,
            positionY: foundInput()!.positionY,
          });
        } else {
          setInsideInput(null);
          newEdge()?.currEndPosition.set({
            x: (event.x - transform().x) / scale(),
            y: (event.y - transform().y) / scale(),
          });
        }
      }
    }
  };

  const handleOnMouseUp = () => {
    setClickedPosition({ x: -1, y: -1 });

    // ************ Stop grabbing board ************
    setBoardDragging(false);
    setPreTransform(transform());
    // setEdgeDragging(false);

    //**
    // compute selected nodes and bounding box after creation of selection box
    //* *
    if (selectionBox()) {
      const box = selectionBox()!;
      let normalizedBox = {
        x: Math.min(box.x, box.x + box.width),
        y: Math.min(box.y, box.y + box.height),
        width: Math.abs(box.width),
        height: Math.abs(box.height),
      };

      const selected = nodes().filter((node) => {
        const nodeRef = document.getElementById(node.id);
        if (!nodeRef) return false;

        const nodeX = node.currPosition.get().x * scale() + transform().x;
        const nodeY = node.currPosition.get().y * scale() + transform().y;
        const width = nodeRef.offsetWidth;
        const height = nodeRef.offsetHeight;

        return (
          nodeX + width > normalizedBox.x &&
          nodeX < normalizedBox.x + normalizedBox.width &&
          nodeY + height > normalizedBox.y &&
          nodeY < normalizedBox.y + normalizedBox.height
        );
      });

      setSelectedNodesGroup(selected.map((n) => n.id));
      setSelectionBox(null);

      // ********** Set bounding box for selection ************
      if (selected.length > 0) {
        const nodeRects = selected.map((node) => {
          const el = document.getElementById(node.id);
          const rect = el?.getBoundingClientRect();
          if (!rect) return { x: 0, y: 0, width: 0, height: 0 };
          const graphX = (rect.left - transform().x) / scale();
          const graphY = (rect.top - transform().y) / scale();
          const graphWidth = rect.width / scale();
          const graphHeight = rect.height / scale();
          return {
            x: graphX,
            y: graphY,
            width: graphWidth,
            height: graphHeight,
          };
        });

        const minX = Math.min(...nodeRects.map((r) => r.x));
        const minY = Math.min(...nodeRects.map((r) => r.y));
        const maxX = Math.max(...nodeRects.map((r) => r.x + r.width));
        const maxY = Math.max(...nodeRects.map((r) => r.y + r.height));

        setGroupBoundingBox({
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        });

        // ************ Set prev position of selected nodes for smooth dragging ***********
        selected.forEach((node) => {
          node.prevPosition.set({
            x: node.currPosition.get().x * scale(),
            y: node.currPosition.get().y * scale(),
          });
        });
      }
    }
    // console.log(newEdge(), insideInput())

    // *********** If newEdge is not inside input, remove it ************
    if (newEdge() !== null && insideInput() === null) {
      setNewEdge(null);
      // setEdgeDragging(false)
    }

    // *****
    // If a new edge is inside input,
    // connect with both target and source node,
    // convert new edge to permanent edge
    // *****
    if (newEdge() !== null && insideInput() !== null) {
      // console.log(newEdge(), insideInput())
      const nodeStartId = newEdge()!.nodeStartId;
      const nodeEndId = insideInput()!.nodeId;

      // console.log(nodeStartId, "nodeStartId");
      // console.log(nodeEndId, "nodeEndId");

      const nodeStart = nodes().find((node) => node.id === nodeStartId);
      const nodeEnd = nodes().find((node) => node.id === nodeEndId);
      // console.log(nodeStart, "nodeStart");
      // console.log(nodeEnd, "nodeEnd");

      const boardWrapperElement = document.getElementById("boardWrapper");

      if (nodeStart && nodeEnd && boardWrapperElement) {
        const edgeId = `edge_${Math.random().toString(36).substring(2, 8)}_${
          nodeStart.id
        }_${newEdge()?.outputIndex}_${nodeEnd.id}_${insideInput()?.inputIndex}`;

        if (
          nodeStart.outputEdgeIds.get().includes(edgeId) &&
          nodeEnd.inputEdgeIds.get().includes(edgeId)
        ) {
          setNewEdge(null);
          return;
        }

        nodeStart.outputEdgeIds.set([...nodeStart.outputEdgeIds.get(), edgeId]);
        nodeEnd.inputEdgeIds.set([...nodeEnd.inputEdgeIds.get(), edgeId]);

        // ********** Update edge current positions ********
        newEdge()!.prevStartPosition.set(() => {
          return {
            x: (newEdge()!.currStartPosition.get().x - transform().x) / scale(),
            y: (newEdge()!.currStartPosition.get().y - transform().y) / scale(),
          };
        });

        newEdge()!.prevEndPosition.set(() => {
          return {
            x: (insideInput()!.positionX - transform().x) / scale(),
            y: (insideInput()!.positionY - transform().y) / scale(),
          };
        });

        newEdge()!.currEndPosition.set(() => {
          return {
            x: (insideInput()!.positionX - transform().x) / scale(),
            y: (insideInput()!.positionY - transform().y) / scale(),
          };
        });

        // ******** setup a new permanent edge **********
        setEdges([
          ...edges(),
          {
            ...newEdge()!,
            id: edgeId,
            nodeEndId: nodeEnd.id,
            inputVertexId: nodeEnd.inputVertexIds[0],
            nodeEndInputIndex: insideInput()!.inputIndex,
          },
        ]);
        const startNode = nodes().find(
          (node) => node.id == newEdge()?.nodeStartId
        );
        // console.log("startNode", newEdge());

        // ******** block vertex ********
        startNode!.busyIndex.set([
          ...startNode!.busyIndex.get(),
          newEdge()!.outputVertexId,
        ]);
        // if (startNode && newEdge()?.outputVertexId !== undefined) {
        // }
        // setEdgeDragging(false)
        setNewEdge(null);
        // console.log("edge", edges())
      }
    }

    // setNewEdge(null)
    setLastPointer(null);
  };

  //==================================================
  // handle all mouse down event, it may be
  // down on node, boundingBox etc
  //==================================================
  const handleOnMouseDown = (event: any) => {
    setLastClickPosition({ x: event.clientX, y: event.clientY });
    setSelectedNode(null);
    setSelectedEdge(null);
    if (isCtrlPressed() || isSpacePressed()) {
      setBoardDragging(true);
      setClickedPosition({ x: event.x, y: event.y });
    } else {
      setClickedPosition({ x: event.clientX, y: event.clientY });
      setSelectionBox({
        x: event.clientX,
        y: event.clientY,
        width: 0,
        height: 0,
      });
      setGroupBoundingBox(null);
      setSelectedNodesGroup([]);
    }
  };

  //==================================================
  // handle the mouse down event but only
  // specific for node, node position
  //==================================================

  function handleOnMouseDownNode(event: any, id: string) {
    // console.log(event);
    setSelectedNode(id);
    setClickedPosition({ x: event.x, y: event.y });
    const node = nodes().find((node) => node.id == selectedNode());
    if (node) {
      node.prevPosition.set((_) => {
        return {
          x: node.currPosition.get().x * scale(),
          y: node.currPosition.get().y * scale(),
        };
      });
      // ********** Update input edges positions ***********
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

      // *********** Update output edges positions *************
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

  //==================================================
  // handle all things related to when mouse down
  // output vertex of the node (any node)
  //==================================================

  function handleOnMouseDownOutput(
    outputPositionX: number,
    outputPositionY: number,
    nodeId: string,
    outputIndex: number,
    vertexId: string,
    typeOfEdge: string
  ) {
    // setEdgeDragging(true);
    // setTypeOfVertex(typeOfVertex);
    // console.log(typeOfVertex)

    setSelectedNode(null);
    const boardWrapperElement = document.getElementById("pane");
    // console.log(scale());
    // console.log("offset", offset().x, offset().y);
    if (boardWrapperElement) {
      const [prevEdgeStart, setPrevEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (outputPositionX - transform().x) / scale(),
        y: (outputPositionY - transform().y) / scale(),
      });
      const [prevEdgeEnd, setPrevEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (outputPositionX - transform().x) / scale(),
        y: (outputPositionY - transform().y) / scale(),
      });
      const [currEdgeStart, setCurrEdgeStart] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (outputPositionX - transform().x) / scale(),
        y: (outputPositionY - transform().y) / scale(),
      });
      const [currEdgeEnd, setCurrEdgeEnd] = createSignal<{
        x: number;
        y: number;
      }>({
        x: (outputPositionX - transform().x) / scale(),
        y: (outputPositionY - transform().y) / scale(),
      });

      setNewEdge({
        id: "",
        nodeStartId: nodeId,
        outputIndex: outputIndex,
        nodeEndId: "",
        inputIndex: -1,
        outputVertexId: vertexId,
        inputVertexId: "",
        typeOfEdge,
        prevStartPosition: { get: prevEdgeStart, set: setPrevEdgeStart },
        prevEndPosition: { get: prevEdgeEnd, set: setPrevEdgeEnd },
        currStartPosition: { get: currEdgeStart, set: setCurrEdgeStart },
        currEndPosition: { get: currEdgeEnd, set: setCurrEdgeEnd },
      });
    }
  }

  //==================================================
  // handle all things related to when cursor with edge
  // come into input vertex area of the node (any node)
  //==================================================

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
    // console.log(insideInput())

    // console.log({
    //   nodeId,
    //   inputIndex,
    //   positionX: inputPositionX,
    //   positionY: inputPositionY,
    // })
  }

  //=====================================================
  // handle all things related to when cursor with edge
  // goes out of input vertex area of the node (any node)
  //=====================================================
  function handleOnMouseLeaveInput(nodeId: string, inputIndex: number) {
    if (
      insideInput()?.nodeId == nodeId &&
      insideInput()?.inputIndex == inputIndex
    ) {
      setInsideInput(null);
    }
  }

  //=====================================================
  // everything related to when mouse click on edge
  //=====================================================
  function handleOnMouseDownEdge(edgeId: string) {
    setSelectedNode(null);
    setSelectedEdge(edgeId);
    const edge = edges().find((edge) => edge.id === edgeId);
    if (edge) {
      console.log(
        edge.currStartPosition.get().x,
        edge.currStartPosition.get().y
      );
    }
  }

  //=====================================================
  // for delete the permanent edge (one by one)
  //=====================================================
  function handleOnDeleteEdge(edgeId: string) {
    const edge = edges().find((e) => e.id === edgeId);

    if (edge) {
      const nodeStart = nodes().find((n) => n.id == edge.nodeStartId);
      if (nodeStart) {
        nodeStart.outputEdgeIds.set([
          ...nodeStart.outputEdgeIds.get().filter((id) => id !== edgeId),
        ]);
      }
      const nodeEnd = nodes().find((n) => n.id === edge.nodeEndId);
      if (nodeEnd) {
        nodeEnd.inputEdgeIds.set([
          ...nodeEnd.inputEdgeIds.get().filter((id) => id !== edgeId),
        ]);
      }

      const busyCheck = edges().filter(
        (e) => e.outputVertexId === edge.outputVertexId
      );

      // ******** release vertex ********
      if (busyCheck.length <= 1 && nodeStart) {
        nodeStart.busyIndex.set([
          ...nodeStart.busyIndex
            .get()
            .filter((vertexId) => vertexId !== edge.outputVertexId),
        ]);
      }
      // console.log(busyCheck, 'busyCheck');
      setEdges([...edges().filter((e) => e.id !== edgeId)]);
    }
  }

  //=====================================================
  // delete single node or many node at all
  //=====================================================
  function handleOnClickDeleteNode(id: string) {
    const node = nodes().find((node) => node.id == id);
    if (!node) {
      setSelectedNode(null);
      return;
    }
    // Delete node edges
    const inputs = node.inputEdgeIds.get();
    const outputs = node.outputEdgeIds.get();

    // Get all unique edges to delete
    const allEdges = [...inputs, ...outputs];
    const uniqueEdges = allEdges.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    // Delete edges from correspondent nodes data
    for (let i = 0; i < uniqueEdges.length; i++) {
      const edge = edges().find((edge) => edge.id === uniqueEdges[i]);
      if (edge) {
        const nodeStart = nodes().find((node) => node.id === edge.nodeStartId);
        const nodeEnd = nodes().find((node) => node.id === edge.nodeEndId);

        nodeStart?.outputEdgeIds.set([
          ...nodeStart.outputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== uniqueEdges[i]),
        ]);
        nodeEnd?.inputEdgeIds.set([
          ...nodeEnd.inputEdgeIds
            .get()
            .filter((edgeId) => edgeId !== uniqueEdges[i]),
        ]);

        const busyCheck = edges().filter(
          (e) => e.outputVertexId === edge.outputVertexId
        );

        // ******** block vertex ********
        if (busyCheck.length <= 1 && nodeStart) {
          nodeStart.busyIndex.set([
            ...nodeStart.busyIndex
              .get()
              .filter((vertexId) => vertexId !== edge.outputVertexId),
          ]);
        }

        // Delete edge from global data
        setEdges([...edges().filter((e) => edge.id !== e.id)]);
      }
    }

    setNodes([...nodes().filter((node) => node.id !== id)]);
    setSelectedNode(null);
  }

  //=====================================================
  // get the live edge length
  //=====================================================
  function getPathLength() {
    const dx =
      newEdge()!.currEndPosition.get().x - newEdge()!.currStartPosition.get().x;
    const dy =
      newEdge()!.currEndPosition.get().y - newEdge()!.currStartPosition.get().y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  return (
    // pane
    <div
      id="pane"
      class="absolute w-full h-full top-0 left-0 select-none cursor-default"
      classList={{
        [style["dot-flow__pane"]]: true,
        [style["draggable"]]: draggable(),
        [style["dragging"]]: boardDragging(),
        [style["selection"]]: false,
      }}
      // onWheel={(e) => e.preventDefault()}
      onPointerDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
    >
      {/* background */}
      <div
        class={style["dot-flow__background"]}
        style={{
          transform: `scale(${scale()})`,
          width: `calc(100vw / ${scale()})`,
          height: `calc(100vh / ${scale()})`,
          "transform-origin": "top left",
          "background-position": `${transform().x / scale()}px ${
            transform().y / scale()
          }px`,
        }}
      ></div>
      {/* selection box */}
      {selectionBox() && (
        <div
          style={{
            position: "absolute",
            left: `${Math.min(
              selectionBox()!.x,
              selectionBox()!.x + selectionBox()!.width
            )}px`,
            top: `${Math.min(
              selectionBox()!.y,
              selectionBox()!.y + selectionBox()!.height
            )}px`,
            width: `${Math.abs(selectionBox()!.width)}px`,
            height: `${Math.abs(selectionBox()!.height)}px`,
            border: "1px dashed #00aaff",
            background: "rgba(0, 170, 255, 0.1)",
            "z-index": 999,
            "pointer-events": "none",
          }}
        ></div>
      )}
      {/* bounding box */}
      {groupBoundingBox() && (
        <div
          style={{
            position: "absolute",
            left: `${groupBoundingBox()!.x * scale() + transform().x}px`,
            top: `${groupBoundingBox()!.y * scale() + transform().y}px`,
            width: `${groupBoundingBox()!.width * scale()}px`,
            height: `${groupBoundingBox()!.height * scale()}px`,
            border: "1px solid #00aaff",
            background: "rgba(0, 170, 255, 0.05)",
            "z-index": 998,
            cursor: "move",
            "transform-origin": "top left",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            setClickedPosition({ x: e.clientX, y: e.clientY });
            setLastPointer({ x: e.clientX, y: e.clientY });
          }}
        ></div>
      )}
      {/* bounding box --> main element */}
      <div
        id="board"
        class="w-screen h-screen absolute top-0 left-0"
        classList={{
          [style["dot-flow__viewport"]]: true,
          [style["dot-flow__viewport"]]: true,
        }}
        style={{
          transform: `translate(${transform().x}px, ${
            transform().y
          }px) scale(${scale()})`,
          "transform-origin": "top left",
        }}
      >
        {/* render all nodes */}
        <For each={nodes()}>
          {(node: Node) => (
            <NodeMain
              id={node.id}
              name={node.name}
              title={node.title}
              x={node.currPosition.get().x}
              y={node.currPosition.get().y}
              numberInputs={node.numberInputs}
              numberOutputs={node.numberOutputs}
              downVertexNumber={node.downVertexNumber || 0}
              upVertexNumber={node.upVertexNumber || 0}
              isInputVertex={node.isInputVertex}
              isOutputVertex={node.isOutputVertex}
              isDownVertex={node.isDownVertex || false}
              isUpVertex={node.isUpVertex || false}
              inputVertexIds={node.inputVertexIds}
              outputVertexIds={node.outputVertexIds}
              downVertexIds={node.downVertexIds || []}
              upVertexIds={node.upVertexIds || []}
              downVertexOrientation={node.downVertexOrientation || ""}
              busyIndex={node.busyIndex}
              content={node.content}
              selected={
                selectedNode() == node.id ||
                selectedNodesGroup().includes(node.id)
              }
              onMouseDownNode={handleOnMouseDownNode}
              onMouseDownOutput={handleOnMouseDownOutput}
              onMouseEnterInput={handleOnMouseEnterInput}
              onMouseLeaveInput={handleOnMouseLeaveInput}
              onClickDeleteNode={handleOnClickDeleteNode}
            />
          )}
        </For>

        {/* render only new edge */}
        {newEdge() !== null && (
          <EdgeComponent
            selected={false}
            isNew={true}
            edgeLength={() => getPathLength()}
            typeOfEdge={newEdge()!.typeOfEdge}
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

        {/* render all edges */}
        <For each={edges()}>
          {(edges: Edge) => (
            <EdgeComponent
              selected={selectedEdge() === edges.id}
              isNew={false}
              edgeLength={() => getPathLength()}
              typeOfEdge={edges.typeOfEdge}
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
      </div>
    </div>
  );
};

export default Board;
