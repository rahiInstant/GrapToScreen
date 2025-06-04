import { createSignal } from "solid-js";
import { gmailNodeDataFormatter } from "./gmailNodeDataFormatter";
import useStateContext from "../../../../../useStateContext";


const { currentFormConfig, setFormData, formData } = useStateContext();

export const gmailNodeDataManager = (
  fieldName: string,
  data: any,
  nodeId?: string
) => {

  const formattedGmailNodeData = gmailNodeDataFormatter(
    gmailNodeData(),
    currentFormConfig().id
  );
  setFormData({
    ...formData(),
    GmailReader: formattedGmailNodeData,
  });
};

export const gmailNodeDataDecodeHelper = (nodeId:string) => {
  const gmailNodeData = formData()[nodeId]
  console.log(gmailNodeData)
  return {

  }
}

