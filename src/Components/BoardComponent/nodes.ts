import { nodeType } from "../ButtonComponents/Types";
import SwitchNode from "../FlowContent/NodeComponents/Switch/SwitchNode";
import ChatNode from "../FlowContent/NodeComponents/ChatNode/ChatNode";
import EditNode from "../FlowContent/NodeComponents/EditNode/EditNode";
import FilterNode from "../FlowContent/NodeComponents/FilterNode/FilterNode";
import AiAgent from "../FlowContent/NodeComponents/AIAgent/AIAgent";
import SendEmail from "../FlowContent/NodeComponents/SendMail/SentGmail";
import VectorStore from "../FlowContent/NodeComponents/VectorStore/VectorStore";
import PgVector from "../FlowContent/NodeComponents/PgVector/PgVector";
import OllamaChatNode from "../FlowContent/NodeComponents/OllamaChatNode/OllamaChatNode";
import GmailTrigger from "../FlowContent/NodeComponents/GmailTrigger/GmailTrigger";
import CreateDraft from "../FlowContent/NodeComponents/CreateDraft/CreateDraft";
import Embedding from "../FlowContent/NodeComponents/Embedding/Embedding";

export const node: nodeType = {
  chat: {
    name: "chat",
    numberInputs: 0,
    numberOutputs: 1,
    isInputVertex: false,
    isOutputVertex: true,
    content: ChatNode,
  },
  switch: {
    name: "switch",
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 3,
    content: SwitchNode,
  },
  edit: {
    name: "edit",
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    content: EditNode,
  },
  filter: {
    name: "filter",
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    content: FilterNode,
  },
  "ai-agent": {
    name: "ai-agent",
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    isDownVertex: true,
    downVertexNumber: 3,
    downVertexOrientation: "1 1 2",
    content: AiAgent,
  },
  "send-email": {
    name: "send-email",
    isInputVertex: true,
    numberInputs: 1,
    isOutputVertex: true,
    numberOutputs: 1,
    content: SendEmail,
  },
  "vector-store": {
    name: "vector-store",
    isInputVertex: false,
    numberInputs: 0,
    isOutputVertex: false,
    numberOutputs: 0,
    isDownVertex: true,
    isUpVertex: true,
    upVertexNumber: 1,
    downVertexNumber: 2,
    downVertexOrientation: "1 1",
    content: VectorStore,
  },
  "pg-vector": {
    name: "pg-vector",
    isInputVertex: false,
    numberInputs: 0,
    isOutputVertex: false,
    numberOutputs: 0,
    isDownVertex: true,
    isUpVertex: true,
    upVertexNumber: 1,
    downVertexNumber: 1,
    downVertexOrientation: "1",
    content: PgVector,
  },
  "ollama-chat": {
    name: "ollama-chat",
    isInputVertex: false,
    numberInputs: 1,
    isOutputVertex: false,
    numberOutputs: 0,
    isUpVertex: true,
    upVertexNumber: 1,
    content: OllamaChatNode,
  },
  "gmail-trigger": {
    name: "gmail-trigger",
    numberInputs: 0,
    numberOutputs: 1,
    isInputVertex: false,
    isOutputVertex: true,
    content: GmailTrigger,
  },
  "create-draft": {
    name: "create-draft",
    isInputVertex: false,
    numberInputs: 1,
    isOutputVertex: false,
    numberOutputs: 0,
    isUpVertex: true,
    upVertexNumber: 1,
    content: CreateDraft,
  },
  "embedding": {
    name: "embedding",
    isInputVertex: false,
    numberInputs: 1,
    isOutputVertex: false,
    numberOutputs: 0,
    isUpVertex: true,
    upVertexNumber: 1,
    content: Embedding,
  },
};
