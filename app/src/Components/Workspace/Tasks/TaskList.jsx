import React from "react";
import { TaskItem } from "./TaskItem";

export function TaskList(props) {

  return (
    <div className="notesScrollBar w-1/3 shadow-[inset_0px_10px_15px_-3px_rgba(0,0,0,0.1)] p-12 flex flex-col gap-12  text-color-secondary ">
      {props.data.map((item, index) => {
        return (
          <TaskItem
            key={index}
            state={props.state}
            index={index}
            item={item}
            move={props.move}
          />
        );
      })}
    </div>
  );
}
