import { Component } from "solid-js";
import LeftPanel from "./LeftPanel/LeftPanel";
import MidPanel from "./MidPanel/MidPanel";
import RightPanel from "./RightPanel/RightPanel";

const BottomPart: Component<{}> = (props) => {
  return (
    <div class="flex items-start flex-1">
      <LeftPanel />
      <MidPanel />
      <RightPanel />
    </div>
  );
};

export default BottomPart;
