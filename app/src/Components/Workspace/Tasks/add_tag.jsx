import React from "react";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import * as icon from "react-feather";

const tags = [
  { id: 1, name: "Work", unavailable: false },
  { id: 2, name: "Personal", unavailable: false },
  { id: 3, name: "Coding", unavailable: false },
  { id: 4, name: "Design", unavailable: false },
  { id: 5, name: "Bug", unavailable: false },
];

export function AddTag(props) {
  

  return (
    <Listbox value={"Tag"}>
      <Listbox.Button
        className={
          "rounded-full text-sm font-semibold shadow-md bg-color-tercelary2 p-3 flex flex-row items-center gap-1"
        }
      >
        <icon.Plus size={20} color={"white"} />
      </Listbox.Button>
      <Listbox.Options
        className={
          "absolute font-semibold bottom-[16%] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.1)] rounded-md bg-color-white z-30"
        }
      >
        {tags.map((tag) => (
          <Listbox.Option
            className={
              tag.id === 1
                ? "text-sm py-2 px-5 text-tag-work hover:bg-tag-work hover:bg-opacity-30 rounded-t-md hover:cursor-pointer"
                : tag.id === 2
                ? "text-sm py-2 px-5 text-tag-personal hover:bg-tag-personal hover:bg-opacity-30 hover:cursor-pointer"
                : tag.id === 3
                ? "text-sm py-2 px-5 text-tag-coding hover:bg-tag-coding hover:bg-opacity-30 hover:cursor-pointer"
                : tag.id === 4
                ? "text-sm py-2 px-5 text-tag-design hover:bg-tag-design hover:bg-opacity-30 hover:cursor-pointer"
                : tag.id === 5
                ? "text-sm py-2 px-5 text-tag-bug hover:bg-tag-bug hover:bg-opacity-30 rounded-b-md hover:cursor-pointer"
                : ""
            }
            key={tag.id}
            onClick={() => {
              props.setTagList((prev) => {
				prev.add(tag.name);
				console.log(prev);
                return new Set([...prev]);
              });
            }}
            value={tag}
            disabled={tag.unavailable}
          >
            {tag.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
