import React from "react";
import * as icon from "react-feather";
import { Listbox } from "@headlessui/react";

export function PriorityButton(props) {
  return props.priority?.id === 1 ? (
    <Listbox.Button
      className={
        "border-2 text-priority-low-primary bg-priority-low-tercelary bg-opacity-50 border-priority-low-secondary text-sm px-3 py-1 rounded-md flex flex-row items-center gap-1"
      }
    >
      {props.priority.name}
    </Listbox.Button>
  ) : props.priority?.id === 2 ? (
    <Listbox.Button
      className={
        "border-2 text-priority-medium-primary bg-priority-medium-secondary bg-opacity-50 border-priority-medium-secondary text-sm px-3 py-1 rounded-md flex flex-row items-center gap-1"
      }
    >
      {props.priority.name}
    </Listbox.Button>
  ) : props.priority?.id === 3 ? (
    <Listbox.Button
      className={
        "border-2 text-priority-high-secondary bg-priority-high-primary bg-opacity-30 border-priority-high-primary text-sm px-3 py-1 rounded-md flex flex-row items-center gap-1"
      }
    >
      {props.priority.name}
    </Listbox.Button>
  ) : (
    <Listbox.Button
      className={
        "border border-color-tercelary text-sm px-3 py-1 rounded-md flex flex-row items-center gap-1"
      }
    >
      {props.priority}
      <icon.Plus size={16} />
    </Listbox.Button>
  );
}
