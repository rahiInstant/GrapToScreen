import { Accessor, Component, Setter } from "solid-js";

export type nodeMarkType = {
  name: string;
  title: string;
  description: string;
  icon: Component;
};

export type nodeType = {
  [key: string]: {
    name: string;
    numberInputs: number;
    numberOutputs: number;
    isInputVertex: boolean;
    isOutputVertex: boolean;
    isDownVertex?: boolean;
    downVertexNumber?: number;
    upVertexNumber?: number;
    downVertexOrientation?: string;
    isUpVertex?: boolean;
    content: Component<customNodeProps>;
  };
};

export interface customNodeProps {
  selected: boolean;
}

export interface Edge {
  id: string;
  nodeStartId: string;
  typeOfEdge: string;
  nodeEndId: string;
  inputIndex: number;
  outputIndex: number;
  nodeEndInputIndex?: number;
  outputVertexId: string;
  inputVertexId: string;
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

export interface Node {
  id: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  isDownVertex: boolean;
  isUpVertex: boolean;

  inputVertexIds: Array<string>;
  outputVertexIds: Array<string>;
  busyIndex: {
    get: Accessor<number[]>;
    set: Setter<number[]>;
  };
  content: Component<customNodeProps>;
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

export interface CustomNode {
  id: string;
  name: string;
  numberInputs: number;
  numberOutputs: number;
  isInputVertex: boolean;
  isOutputVertex: boolean;
  isDownVertex?: boolean;
  isUpVertex?: boolean;
  downVertexNumber?: number;
  upVertexNumber?: number;
  downVertexOrientation?: string;
  inputVertexIds: Array<string>;
  outputVertexIds: Array<string>;
  downVertexIds: Array<string>;
  upVertexIds: Array<string>;
  // inputVertexIds: Record<string, HTMLElement | undefined>;
  // outputVertexIds: Record<string, HTMLElement | undefined>;
  busyIndex: {
    get: Accessor<string[]>;
    set: Setter<string[]>;
  };
  content: Component<customNodeProps>;
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

export interface outputVertexDuty {
  [key: string]: string[];
}

export interface finalJSON {
  
}


