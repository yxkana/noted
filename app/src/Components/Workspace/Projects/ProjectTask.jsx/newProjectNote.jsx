import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, Popover } from "@headlessui/react";
import * as icon from "react-feather";
import { UserInfo } from "../../../../api/UserData";
import { useMutation, useQueryClient, useQuery } from "react-query";

import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { axiosPrivate } from "../../../../api/axios";

import { ProjectTaskHandle } from "../../../../api/UserData";

import { AddTag } from "./add_tag";
import { Tag } from "./tag";
import { AddPriority } from "./add_priority";
import { set } from "lodash";
import { v4 } from "uuid";

export function CreateNote(props) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Priority");
  const [tagList, setTagList] = useState(new Set());
  const [alertOpacity, setAlertOpacity] = useState("opacity-0");

  const _id = v4();

  const _alertStyle =
    "flex gap-2 items-center absolute right-36 top-10 text-xs border bg-color-white shadow-rounded shadow-color-tercelary2  border-color-tercelary2 rounded-md p-1 ";
  const _alertOpacity = " opacity-0";
  const removeTag = (name) => {
    setTagList((prev) => {
      prev.delete(name);
      return new Set([...prev]);
    });
  };

  const handleAlert = () => {
    console.log("ssss");
    if (selectedPriority === "Priority") {
      setAlertOpacity((prev) => {
        return (prev = "opacity-100");
      });
    } else {
      setAlertOpacity("opacity-0");
    }
  };

  const _userData = new UserInfo();

  const profileInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => _userData.getProfileInfo(),
  });

  const queryClient = useQueryClient();
  const projectTask = new ProjectTaskHandle();
console.log(tagList);
  const createProjectNote = useMutation({
    mutationFn: () => {
      return projectTask.postTask({
        title: title,
        creator: queryClient.id,
        msg: note,
        priority: selectedPriority,
        status: "todo",
        tags: [...tagList],
        projectId: props.id,
        taskId: _id,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchProjectNotes");
      console.log("Note created->fetch notes");
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("ssss");
    createProjectNote.mutate();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function removeState() {
    setTitle("");
    setNote("");
    setSelectedPriority("Priority");
    setAlertOpacity("opacity-0");
    setTagList(new Set());
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="text-color-primary hover:text-color-tercelary2"
      >
        <icon.PlusSquare size={40} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => {
          removeState();
          closeModal();
        }}
        sx={{
          "& .MuiPaper-root": {
            bgcolor: "#fffefa",
            width: 500,
            borderRadius: 4,
            padding: 2,
          },
        }}
      >
        <DialogTitle>
          <div className="flex justify-between">
            <p className="font-semibold text-3xl">New Note</p>
            <AddPriority
              priority={selectedPriority}
              setPriority={setSelectedPriority}
              setAlertOpacity={setAlertOpacity}
              alert={handleAlert}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-2 text-lg">
            <label htmlFor="title">Title:</label>
            <input
              placeholder="Name your note."
              id="title"
              type="text"
              className="py-1 px-4 border rounded-md bg-color-white border-color-tercelary outline-color-tercelary2"
              onChange={function (e) {
                return setTitle((prev) => {
                  return (prev = e.target.value);
                });
              }}
              value={title}
            />
            <label htmlFor="content">Description:</label>
            <textarea
              placeholder="Describe your note"
              id="content"
              cols="30"
              rows="10"
              className="py-3 px-4 border rounded-md bg-color-white border-color-tercelary outline-color-tercelary2"
              onChange={function (e) {
                return setNote((prev) => {
                  return (prev = e.target.value);
                });
              }}
              value={note}
            ></textarea>

            <div className="mt-4 flex items-center justify-between py-3">
              <AddTag tagList={tagList} setTagList={setTagList} />

              <div className="flex-auto mx-3 h-12 text-color-white flex gap-3 overflow-x-auto py-2 tags">
                {[...tagList].map((tag, index) => {
                  return <Tag key={index} tag={tag} func={removeTag} />;
                })}
              </div>

              <button
                type="button"
                className="inline-flex bg-color-tercelary text-color-white justify-center rounded-md border border-transparent  px-4 py-2 text-base  hover:border-2 hover:border-color-tercelary2 hover:bg-color-tercelary2 font-medium"
                onClick={(e) => {
                  if (selectedPriority === "Priority") {
                    handleAlert();
                  } else {
                    handleSave(e);
                    removeState();
                    closeModal();
                  }
                }}
              >
                Save note.
              </button>
              <div className={_alertStyle + alertOpacity}>
                <p>Select priority</p>
                <icon.AlertCircle size={14} />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
