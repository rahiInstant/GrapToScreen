import { Component } from "solid-js";

const RightPanel: Component<{}> = (props) => {
  return (
    <div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full flex-1 rounded-br-lg">
      <div class="p-4 text-white h-full border-l border-gray-700/30">
        <h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">
          Output
        </h3>
        <div class="h-full flex items-center justify-center text-center">
          <div>
            <p class="font-medium mb-1">Execute this node to view data</p>
            <p class="text-xs">
              or{" "}
              <a href="#" class="text-purple-400 hover:underline">
                set mock data
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
