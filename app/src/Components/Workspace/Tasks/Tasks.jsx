import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import * as icon from "react-feather";

import { TaskItem } from "./TaskItem";
import useAxiosPrivate from "../../../hooks/usePrivateAxios";

import { CreateNote } from "./newNote";
import { TaskList } from "./TaskList";

export function Tasks() {
  //TODO data
  const [taskData, taskDataState] = useState([]);
  //INPROGRESS data
  const [progressData, progressDataState] = useState([]);
  //Completed data
  const [completeData, completeDataState] = useState([]);

  const [isLoading, isLoadingState] = useState(true);

  const [toggleCreate, setToggleCreate] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function getData() {
      try {
        await axiosPrivate
          .get("/notes")
          .then(function (response) {
            console.log(response.data);
            [...response.data].map((item) => {
              if (item.status === "todo") {
                taskDataState((prev) => {
                  return [item, ...prev];
                });
              } else if (item.status === "progress") {
                progressDataState((prev) => {
                  return [item, ...prev];
                });
              } else if (item.status === "complete") {
                completeDataState((prev) => {
                  return [item, ...prev];
                });
              }
            });
          })
          .then(() => isLoadingState(() => false));
      } catch (err) {
        console.log("sss");
        navigate("/login", { state: { from: location }, replace: true });
      }
    }
    getData();
  }, []);

  const moveItemToProgress = (index) => {
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
  };

  if (isLoading === false) {
    return (
      <div className="px-16 w-[2000px] ">
        <div className="mb-10 flex justify-start gap-4">
          <h1 className="font-bold text-5xl items-center text-color-primary">
            Tasks
          </h1>
          <CreateNote state={toggleCreate} data={taskDataState} />
        </div>
        <div className="flex   mx-auto  h-16 shadow-md rounded-md bg-color-grey">
          <div className="flex w-full text-color-whitesh">
            <div className="flex items-center rounded-l-md border-r-4 border-color-grey px-4 text-xl font-semibold justify-between  gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                To-Do
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9 items-center">
                  {taskData.length}
                </div>
              </div>
              <icon.Book size={22} />
            </div>
            <div className="flex items-center text-xl px-4 border-r-4 border-color-grey font-semibold justify-between gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                In Progress
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9 items-center">
                  {progressData.length}
                </div>
              </div>
              <icon.BookOpen size={22} />
            </div>
            <div className="flex items-center rounded-r-md px-4 text-xl font-semibold justify-between gap-6 w-1/3 bg-color-tercelary hover:bg-color-tercelary2">
              <div className="flex gap-3 items-center">
                Completed
                <div className=" rounded-full bg-color-whitesh bg-opacity-25 shadow-md p-1 w-9 h-9 items-center">
                  {completeData.length}
                </div>
              </div>
              <icon.Archive size={22} />
            </div>
          </div>
        </div>
        <div className="mx-auto  h-[83vh] notesList flex">
          <TaskList
            data={taskData}
            move={moveItemToProgress}
            state={taskDataState}
            type={"todo"}
          />
          <TaskList
            data={progressData}
            state={progressDataState}
            move={moveItemToComplete}
            type={"progress"}
          />
          <TaskList
            data={completeData}
            state={completeDataState}
            move={sendTask}
            type={"complete"}
          />
        </div>
      </div>
    );
  } else if (isLoading === true) {
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
