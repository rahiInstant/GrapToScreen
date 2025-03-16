import { Component } from "solid-js";

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
    content: Component;
  };
};
