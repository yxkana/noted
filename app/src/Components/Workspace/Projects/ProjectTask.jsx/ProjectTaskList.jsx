import React from "react";
import { ProjectTaskItem } from "./ProjectTaskItem";

export function ProjectTaskList(props) {
  return (
    <div className="notesScrollBar w-1/3 shadow-[inset_0px_10px_15px_-3px_rgba(0,0,0,0.1)] p-12 flex flex-col gap-12  text-color-secondary ">
      {props.data.map((item, index) => {
        console.log(item);
        if (props.type === "todo") {
          if (item.status === "todo") {
            return <ProjectTaskItem key={index} projectId={props.projectId} index={index} item={item} />;
          } else {
            null;
          }
        } else if (props.type === "progress") {
          if (item.status === "progress") {
            return <ProjectTaskItem key={index} projectId={props.projectId} index={index} item={item} />;
          } else {
            null;
          }
        } else if (props.type === "complete") {
          if (item.status === "complete") {
            return <ProjectTaskItem key={index} projectId={props.projectId} index={index} item={item} />;
          } else {
            null;
          }
        }
      })}
    </div>
  );
}
