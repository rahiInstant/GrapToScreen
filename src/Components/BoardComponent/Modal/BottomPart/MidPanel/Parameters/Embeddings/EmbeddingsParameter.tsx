import { Component } from "solid-js";
import DependentDropDown from "../../../../Component lib/DropDown/DependentDropDown/DependentDropDown";
import DropDownN from "../../../../Component lib/DropDown/DropDownN/DropDownN";
import { modelConfig } from "./EmbeddingsParameterConfig";
import useStateContext from "../../../../../useStateContext";
import { embeddingNodeDataFormatter } from "./embeddingDataFormatter";
import { embeddingNodeDataManager } from "./embeddingDataManager";

const EmbeddingsParameter: Component<{}> = (props) => {
  const { currentFormConfig, formData, setFormData } = useStateContext();
  const handleOnSubmit = (e: Event) => {
    e.preventDefault();
    const pgVectorStoreData = new FormData(e.target as HTMLFormElement);
    let data = Object.fromEntries(pgVectorStoreData.entries());

    const formattedEmbeddingNodeData = embeddingNodeDataFormatter(
      data,
      currentFormConfig().id
    );

    setFormData({
      ...formData(),
      [currentFormConfig().id]: formattedEmbeddingNodeData,
    });
  };

  return (
    <form id="embeddingForm" onSubmit={handleOnSubmit}>
      <div class="space-y-5">
        <DependentDropDown
          name="credential"
          placeholder="Select Credential"
          title="Credential to connect with"
        />
        <DropDownN
          name="model"
          title="Model"
          options={modelConfig}
          defaultValue={modelConfig[0].value}
          onChange={(selected) => {
            embeddingNodeDataManager("model", selected);
          }}
        />
      </div>
    </form>
  );
};

export default EmbeddingsParameter;
