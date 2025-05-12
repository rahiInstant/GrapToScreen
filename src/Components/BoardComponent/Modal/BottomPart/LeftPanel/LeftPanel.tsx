import { Component } from "solid-js";
import Button from "../MidPanel/Button";

const LeftPanel: Component<{}> = (props) => {
  return (
    <div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg flex-1">
      <div class="p-4 text-white h-full border-r border-gray-700/30">
        <h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">
          Input
        </h3>
        <div class="h-full flex items-center justify-center text-center">
          <div>
            <p class="font-medium mb-3">No input data yet</p>
            <Button title="Execute previous nodes"/>
            <p class="text-xs text-gray-400 mt-3">
              (From the earliest node that has no output data yet)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
