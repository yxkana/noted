import React from "react";

export function ItemTag(props) {
  const _coding =
    "bg-tag-coding rounded-md text-sm  py-2 px-4 font-medium fonte-medium text-color-white";
  const _work =
    "bg-tag-work rounded-md text-sm  py-2 px-4 font-medium fonte-medium text-color-white";
  const _design =
    "bg-tag-design rounded-md text-sm  py-2 px-4 font-medium fonte-medium text-color-white";
  const _personal =
    "bg-tag-personal rounded-md text-sm  py-2 px-4 font-medium fonte-medium text-color-white";
  const _bug =
    "bg-tag-bug rounded-md text-sm  py-2 px-4 font-medium fonte-medium text-color-white";

  return (
    <div
      className={
        props.name === "Coding"
          ? _coding
          : props.name === "Work"
          ? _work
          : props.name === "Design"
          ? _design
          : props.name === "Personal"
          ? _personal
          : _bug
      }
    >
      <p>{props.name}</p>
    </div>
  );
}
