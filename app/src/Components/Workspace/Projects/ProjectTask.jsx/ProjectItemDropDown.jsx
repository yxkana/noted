import { Menu, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";

import * as icon from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import { ProjectTaskHandle } from "../../../../api/UserData";

export function ProjectItemDropdown(props) {
  const [isPressed, setIsPressed] = useState(false);
  const tasks = new ProjectTaskHandle();
  const queryClient = useQueryClient();
  const _style =
    "flex justify-between gap-4 rounded-md px-5 py-1 hover:bg-color-grey";
  const _activeMenu =
    "p-1 items-center justify-center flex rounded-full text-color-white bg-color-tercelary2 hover:shadow-md";
  const _menu =
    "p-1 items-center justify-center flex rounded-full hover:bg-color-tercelary hover:shadow-md hover:bg-opacity-40";

  const changeState = () => {
    setIsPressed((prev) => {
      return !prev;
    });
  };

  const moveProjectTask = useMutation({
    mutationFn: (data) => {
      return tasks.moveTask(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchProjectNotes");
    },
  });

  const deleteProjectTask = useMutation({
    mutationFn: (data) => {
      return tasks.deleteTask(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchProjectNotes");
    },
  });

  return (
    <Menu as={"div"} className={"absolute right-5 top-3 h-8 w-8"}>
      <Menu.Button
        defaultChecked={isPressed}
        onClick={isPressed ? {} : changeState}
        className={isPressed === false ? _menu : _activeMenu}
      >
        <icon.MoreHorizontal size={26} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        beforeLeave={changeState}
      >
        <Menu.Items
          className={
            "absolute right-2 mt-2 w-auto text-color-primary  border p-1 border-color-tercelary bg-color-white  rounded-md shadow-color-tercelary shadow-md flex flex-col gap-2"
          }
        >
          {props.status === "todo" ? (
            <Menu.Item>
              <button
                onClick={() => {
                  console.log(props.taskId);
                  moveProjectTask.mutate({
                    projectId: props.projectId,
                    taskId: props.taskId,
                    status: "progress",
                  });
                }}
                className={_style}
              >
                Start <icon.BookOpen size={18} className="relative top-1" />
              </button>
            </Menu.Item>
          ) : props.status === "progress" ? (
            <Menu.Item>
              <button
                onClick={() => {
                  moveProjectTask.mutate({
                    projectId: props.projectId,
                    taskId: props.taskId,
                    status: "complete",
                  });
                }}
                className={_style}
              >
                Complete <icon.Archive size={18} className="relative top-1" />
              </button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <button
                onClick={() => {
                  moveProjectTask.mutate({
                    projectId: props.projectId,
                    taskId: props.taskId,
                    status: "sending",
                  });
                }}
                className={_style}
              >
                Send <icon.Send size={18} className="relative top-1" />
              </button>
            </Menu.Item>
          )}

          <Menu.Item>
            <button
              onClick={() => {
	
                return deleteProjectTask.mutate({
                  projectId: props.projectId,
                  taskId: props.taskId,
                  index: props.index,
				          status: props.status
                }); 
              }}
              className={_style}
            >
              Delete <icon.Trash size={18} className="relative top-1" />
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
