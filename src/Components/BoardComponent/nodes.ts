import { nodeType } from "../ButtonComponents/Types";
import SwitchNode from "../FlowContent/NodeComponents/Switch/SwitchNode";
import ChatNode from "../FlowContent/NodeComponents/ChatNode/ChatNode";
import EditNode from "../FlowContent/NodeComponents/EditNode/EditNode";
import FilterNode from "../FlowContent/NodeComponents/FilterNode/FilterNode";

export const node: nodeType = {
  chat: {
    numberInputs: 0,
    numberOutputs: 1,
    isInputVertex: false,
    isOutputVertex: true,
    content: ChatNode,
  },
  switch: {
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 3,
    content: SwitchNode,
  },
  edit: {
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    content: EditNode,
  },
  filter: {
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    content: FilterNode,
  },
};
