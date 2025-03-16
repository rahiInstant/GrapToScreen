import SwitchIcon from "./SwitchIcon";
import { nodeMarkType } from "./Types";
import ChatIcon from "./ChatIcon";
import EditIcon from "./EditIcon";
import FilterIcon from "./FilterIcon";

export const nodeMark: nodeMarkType[] = [
  {
    name: "chat",
    title: "On Chat Message",
    description:
      " Runs the flow when a user send a chat message. For use with AI nodes.",
    icon: ChatIcon,
  },
  {
    name: "switch",
    title: "Switch",
    description: "Routes items depending on defined expression or rules",
    icon: SwitchIcon,
  },
  {
    name: "edit",
    title: "Edit",
    description: "Modify, Add or Remove item fields.",
    icon: EditIcon
  }, 
  {
    name: "filter",
    title: "Filter",
    description:"Remove items matching a condition.",
    icon: FilterIcon
  }

];
