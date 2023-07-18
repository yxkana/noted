import React, { useState } from "react";
import { ProjectGroupAvatars } from "./projectPeopleIcons";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import * as icon from "react-feather";

export function ProjectItem(props) {
  const { _id, title, desc, team, todo, progress, complete } = props.data;
  const allTasks = todo + complete + progress;
  const navigate = useNavigate();
  console.log(
    `w-[${(todo / allTasks) * 100}%] h-2 rounded-lg bg-color-tercelary`
  );
  const queryClient = useQueryClient();

  return (
    <div
      onClick={() => {
        navigate("/team/{_id}" + _id, {
          state: { id: _id },
        });
        queryClient.invalidateQueries("fetchProjectNotes");
      }}
      className="flex flex-col bg-color-truewhite rounded-lg p-8  h-96 w-auto m-6 shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)] hover:cursor-pointer"
    >
      <div className="flex justify-between">
        <h1 className="text-4xl">{title}</h1>
        <ProjectGroupAvatars team={team} />
      </div>
      <div className="flex flex-1">
        <h2 className="text-2xl flex justify-start my-9">{desc}</h2>
      </div>
      <div className="flex flex-col flex-auto justify-evenly font-semibold text-xl">
        {/* TODO bar */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <icon.Book />
            <h3 className="">{todo}</h3>
          </div>
          <TaskBar allTasks={allTasks} task={todo} />
        </div>
        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div className="flex  gap-3">
            <icon.BookOpen />
            <h3 className="">{progress}</h3>
          </div>

          <TaskBar allTasks={allTasks} task={progress} />
        </div>
        {/* Complete bar */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <icon.Archive />
            <h3>{complete}</h3>
          </div>
          <TaskBar allTasks={allTasks} task={complete} />
        </div>
      </div>
    </div>
  );
}

function TaskBar(props) {
  const barValue = (props.task / props.allTasks) * 100;
  console.log(barValue);
  const stylingClass =
    "w-[" + barValue + "%] h-2 rounded-lg bg-color-tercelary";
  if (isNaN(barValue)) {
    return <div className="w-[0%] h-2 rounded-lg bg-color-tercelary"></div>;
  } else {
    return <div className={stylingClass}></div>;
  }
}
