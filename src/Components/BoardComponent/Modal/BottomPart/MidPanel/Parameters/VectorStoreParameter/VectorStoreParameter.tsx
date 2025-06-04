import { Component } from "solid-js";
import DynamicInput from "../../../../Component lib/Input/DynamicInput/DynamicInput";
import TextBox from "../../TextBox";
import TextArea from "../../../../Component lib/TextArea/TextArea";
import { vectorStoreNodeDataFormatter } from "./vectorStoreDataFormatter";
import useStateContext from "../../../../../useStateContext";
import { vectorStoreNodeDataManager } from "./vectorStoreDataManager";

const VectorStoreParameter: Component<{}> = (props) => {
  const { currentFormConfig, setFormData, formData } = useStateContext();
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const vectorStoreData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(vectorStoreData.entries());

    const formattedVectorStoreNodeData = vectorStoreNodeDataFormatter(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedVectorStoreNodeData,
    });
  };
  return (
    <form id="vector-storeForm" onSubmit={handleOnSubmit}>
      <div class="space-y-6">
        <DynamicInput
          name="dataName"
          title="Data Name"
          placeholder="e.g. user_info"
          toolTipText="Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question."
          isArrow
          onInput={(value) => {
            vectorStoreNodeDataManager("dataName", value);
          }}
        />
        <TextArea
          name="dataDescription"
          title="Description of Data"
          placeholder="[describe your data here, e.g. a user's name, email e.t.c]"
          toolTipText="Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question."
          onInput={(value) => {
            vectorStoreNodeDataManager("dataDescription", value);
          }}
        />
        <DynamicInput
          name="limit"
          title="Limit"
          toolTipText="The maximum number of results to return"
          isArrow
          isExpand
          onInput={(value) => {
            vectorStoreNodeDataManager("limit", value);
          }}
        />
      </div>
    </form>
  );
};

export default VectorStoreParameter;
