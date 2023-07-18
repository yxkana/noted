import React from "react";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import * as icon from "react-feather";
import { PriorityButton } from "./priority_button";

const priorities = [
  { id: 1, name: "Low", unavailable: false },
  { id: 2, name: "Medium", unavailable: false },
  { id: 3, name: "High", unavailable: false },
];

export function AddPriority(props) {
  return (
    <Listbox value={props.priority}>
      <PriorityButton priority={props.priority} />

      <Listbox.Options
        className={
          "absolute shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] rounded-md bg-color-white top-[68px] right-12 mt-1"
        }
      >
        {priorities.map((priority) => (
          <Listbox.Option
            className={
              priority.id === 1
                ? "text-sm flex flex-col py-[6px] rounded-t-md px-5 font-semibold text-priority-low-primary  hover:cursor-pointer hover:bg-priority-low-tercelary hover:bg-opacity-50"
                : priority.id === 2
                ? "text-sm flex flex-col py-[6px] px-5 text-priority-medium-primary hover:cursor-pointer  hover:bg-priority-medium-secondary  hover:bg-opacity-50"
                : "text-sm flex flex-col rounded-b-md py-[6px] px-5 text-priority-high-secondary hover:cursor-pointer hover:bg-priority-high-primary hover:bg-opacity-40"
            }
            key={priority.id}
            value={priority}
            onClick={() => {
              props.alert();
              props.setPriority((prev) => {
                return priority;
              });
            }}
            disabled={priority.unavailable}
          >
            {priority.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
