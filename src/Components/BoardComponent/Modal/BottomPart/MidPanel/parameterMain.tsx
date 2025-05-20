import { Component, createSignal, For, Show } from "solid-js";
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import CrossIcon from "./CrossIcon";
import Button from "./Button";
import MoveIcon from "../../Icons/MoveIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import style from "./style.module.css";
import useStateContext from "../../../useStateContext";
import SwitchNodeParameter from "./Parameters/SwitchNodeParameter";
import EditNodeParameter from "./Parameters/EditNodeParameter";
import GmailTrigger from "../../../../FlowContent/NodeComponents/GmailTrigger/GmailTrigger";
import GmailNodeParameter from "./Parameters/GmailParameter";

const Parameters: Component = () => {
  const { formConfig } = useStateContext();

  return (
    <div
      id="parameter"
      class={`mt-0 px-5 py-4 `}
      classList={{ [style.param]: true }}
    >
      <Show when={formConfig().name === "switch"}>
        <SwitchNodeParameter />
      </Show>
      <Show when={formConfig().name === "edit"}>
        <EditNodeParameter/>
      </Show>
      <Show when={formConfig().name === "gmail-trigger"}>
        <GmailNodeParameter/>
      </Show>
    </div>
  );
};

export default Parameters;
