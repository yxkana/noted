import React, { useState, useEffect, Fragment } from "react";

import * as icon from "react-feather";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import { useMutation, useQueryClient } from "react-query";

import { AddTag } from "../Workspace/Tasks/add_tag";
import { Tag } from "../Workspace/Tasks/tag";
import { UserFriends } from "../../api/UserData";
import { AddPriority } from "../Workspace/Tasks/add_priority";

import { v4 } from "uuid";

export function SendNoteToFriend(props) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Priority");
  const [tagList, setTagList] = useState(new Set());
  const [alertOpacity, setAlertOpacity] = useState("opacity-0");
  const friendsApi = new UserFriends();
  const _id = v4();

  const sendNote = useMutation({
    mutationFn: (data) => {
      return friendsApi.sendNote(data);
    },
  });

  const _alertStyle =
    "flex gap-2 items-center absolute right-6 top-6 text-xs border bg-color-white shadow-rounded shadow-color-tercelary2  border-color-tercelary2 rounded-md p-1 ";
  const _alertOpacity = " opacity-0";
  const removeTag = (name) => {
    setTagList((prev) => {
      prev.delete(name);
      return new Set([...prev]);
    });
  };

  const handleAlert = () => {
    if (selectedPriority === "Priority") {
      setAlertOpacity((prev) => {
        return (prev = "opacity-100");
      });
    } else {
      setAlertOpacity("opacity-0");
    }
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
    setTagList(new Set());
  }

  return (
    <div>
      <div
        onClick={openModal}
        className="flex justify-between items-center py-3 px-5 rounded-t-md hover:bg-color-grey hover:bg-opacity-25 hover:cursor-pointer"
      >
        <p>Send note</p>
        <icon.Send size={20} />
      </div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
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
          <div className="flex flex-col font-semibold text-3xl">
            <div className="flex justify-between">
              <p>Send Note</p>
              <AddPriority
                priority={selectedPriority}
                setPriority={setSelectedPriority}
              />
            </div>
            <div className="flex gap-3">
              <p>To </p>
              <p className="text-color-tercelary2 font-semibold">
                {props.reciver}
              </p>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-2 text-lg">
            <label htmlFor="title">Title:</label>
            <input
              placeholder="Note title."
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
              placeholder="Note description."
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
                    sendNote.mutate({
                      id: _id,
                      title,
					  status: "todo",
                      content: note,
                      priority: selectedPriority.name,
                      tags: [...tagList],
                      reciver: props.reciver,
                    });
                    removeState();
                    closeModal();
                  }
                }}
              >
                Send Note.
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
