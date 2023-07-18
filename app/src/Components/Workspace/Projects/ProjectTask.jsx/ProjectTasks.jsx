import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router";
import * as icon from "react-feather";

import { ProjectTaskItem } from "./ProjectTaskItem";

import { ProjectApiHandle, ProjectTaskHandle } from "../../../../api/UserData";

import { CreateNote } from "./newProjectNote";
import { ProjectTaskList } from "./ProjectTaskList";
import { useQuery, useQueryClient } from "react-query";

export function ProjectTasks() {
  const { state } = useLocation();
  //TODO data
  const [todoStatus, todoStatusState] = useState(state.todo);
  const [idState, setIdState] = useState("");

  //INPROGRESS data
  const [progressStatus, progressStatusState] = useState(state.progress);
  //Completed data
  const [completeStatus, completeStatusState] = useState(state.complete);

  

  

  const project = new ProjectApiHandle();
  const projectTask = new ProjectTaskHandle();

  const fetchProjectNotes = useQuery({
    queryKey: ["fetchProjectNotes"],
    queryFn: () => {
      return project.getProjectNotes(state.id);
    },
  });


  

  /* const {title,tasks} = fetchProjectNotes.data.data; */

  /*  const moveItemToProgress = (index) => {
    const itemToMove = taskData[index];

    console.log(itemToMove);
    taskDataState((prev) => {
      const _list = [...prev];
      _list.splice(index, 1);
      return _list;
    });
    progressDataState((prev) => {
      return [itemToMove, ...prev];
    });
  };

  const moveItemToComplete = (index) => {
    const itemToMove = progressData[index];

    progressDataState((prev) => {
      const _list = [...prev];
      _list.splice(index, 1);
      return _list;
    });
    completeDataState((prev) => {
      return [itemToMove, ...prev];
    });
  };

  const sendTask = (content) => {
    return console.log("task send");
  }; */

  if (fetchProjectNotes.status === "success") {
    const { _id, title } = fetchProjectNotes.data.data;
    console.log(_id);

    let todo = 0;
    let progress = 0;
    let complete = 0;

    fetchProjectNotes.data.data.tasks.map((item) => {
      if (item.status === "todo") {
        todo += 1;
      } else if (item.status === "progress") {
        progress += 1;
      } else {
        complete += 1;
      }
    });

    return (
      <div className="px-16 w-[2000px]">
        <div className="mb-10 flex justify-start gap-4">
          <h1 className="font-bold text-5xl items-center text-color-primary">
            {title}
          </h1>
          <CreateNote id={_id} />
        </div>
        <div className="flex   mx-auto  h-16 shadow-md rounded-md bg-color-grey">
          <div className="flex w-full text-color-whitesh">
            <div className="flex items-center rounded-l-md border-r-4 border-color-grey px-4 text-xl font-semibold justify-between  gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                To-Do
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9">
                  {todo}
                </div>
              </div>
              <icon.Book size={22} />
            </div>
            <div className="flex items-center text-xl px-4 border-r-4 border-color-grey font-semibold justify-between gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                In Progress
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9">
                  {progress}
                </div>
              </div>
              <icon.BookOpen size={22} />
            </div>
            <div className="flex items-center rounded-r-md px-4 text-xl font-semibold justify-between gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                Completed
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9">
                  {complete}
                </div>
              </div>
              <icon.Archive size={22} />
            </div>
          </div>
        </div>
        <div className="mx-auto  h-[83vh] notesList flex">
          <ProjectTaskList data={fetchProjectNotes.data.data.tasks} projectId={_id} type={"todo"} />
          <ProjectTaskList
            data={fetchProjectNotes.data.data.tasks}
            projectId={_id}
            type={"progress"}
          />
          <ProjectTaskList
            data={fetchProjectNotes.data.data.tasks}
            projectId={_id}
            type={"complete"}
          />
        </div>
      </div>
    );
  } else if (fetchProjectNotes.status === "loading") {
    return <h1>Is loading</h1>;
  }
}

{
  /* <button className="flex items-center rounded-md px-4 text-xl font-semibold justify-between w-auto gap-6 h-auto bg-color-tercelary hover:bg-color-tercelary2"
              onClick={() => {
                return declere();
              }}
            >
              Create < icon.PlusSquare/>
            </button> */
}
