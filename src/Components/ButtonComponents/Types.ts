import { Accessor, Component, Setter } from "solid-js";

export type nodeMarkType = {
  name: string;
  title: string;
  description: string;
  icon: Component;
};

export type nodeType = {
  [key: string]: {
    numberInputs: number;
    numberOutputs: number;
    isInputVertex: boolean;
    isOutputVertex: boolean;
    content: Component<customNodeProps>;
  };
};

export interface customNodeProps {
  selected: boolean;
}

export interface Edge {
  id: string;
  nodeStartId: string;
  nodeEndId: string;
  inputIndex: number;
  outputIndex: number;
  nodeEndInputIndex?: number; 
  outputVertexId: string
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



export interface outputVertexDuty {
  [key: string]: string[];
}