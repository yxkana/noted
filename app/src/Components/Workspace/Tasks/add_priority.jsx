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
          "absolute shadow-md shadow-color-shadow border border-color-shadow  rounded-md bg-color-white right-12 top-[68px] mt-1"
        }
      >
        {priorities.map((priority) => (
          <Listbox.Option
            className={
              priority.id === 1
                ? "text-sm flex flex-col py-[6px] rounded-t-md px-5 font-semibold text-priority-low-primary  hover:cursor-pointer hover:bg-priority-low-tercelary hover:bg-opacity-50"
                : priority.id === 2
                ? "text-sm flex flex-col py-[6px] px-5 font-semibold text-priority-medium-primary hover:cursor-pointer  hover:bg-priority-medium-secondary  hover:bg-opacity-50"
                : "text-sm flex flex-col rounded-b-md py-[6px] font-semibold px-5 text-priority-high-secondary hover:cursor-pointer hover:bg-priority-high-primary hover:bg-opacity-40"
            }
            key={priority.id}
            value={priority}
            onClick={() => {
              props.setPriority((prev) => {
                return priority;
              });
              props.setAlertOpacity((prev) => {
                return "opacity-0";
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
