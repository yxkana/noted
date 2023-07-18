import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import * as icon from "react-feather";
import { AddPeopleMenu } from "./AddPeople";

import { axiosPrivate } from "../../../../api/axios";

import { set } from "lodash";
import { v4 } from "uuid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { ProjectApiHandle, UserFriends } from "../../../../api/UserData";

export function CreateProject(props) {
  const _newPost = new ProjectApiHandle();

  //State Managment
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const queryClient = useQueryClient();
  const user = new UserFriends();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function removeState() {
    setTitle("");
    setNote("");
    setTeamList([]);
  }

  // BackEnd calls
  const fetchFriends = useQuery({
    queryKey: ["fetchFriends"],
    queryFn: () => user.fetchFriends(),
  });


  const postProject = useMutation({
    mutationFn: () => {
      return _newPost.postProject({
        title: title,
        description: note,
        team: teamList,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("fetchProject");
      removeState();
      closeModal();
    },
  });

 

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
          <p className="font-semibold text-3xl">New Project</p>
        </DialogTitle>
        <DialogContent>
          <form className="flex flex-col gap-2 text-lg">
            <label htmlFor="title">Title:</label>
            <input
              placeholder="Name your project."
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
              placeholder="Describe your project"
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

            <div className="mt-4 flex justify-between py-3">
              {fetchFriends.status === "loading" ? null : (
                <AddPeopleMenu
                  friends={fetchFriends.data.data}
                  addToTeam={setTeamList}
                />
              )}

              <button
                type="button"
                className="inline-flex bg-color-tercelary text-color-white justify-center rounded-md border border-transparent  px-3 py-[13px] text-xl  hover:border-2 hover:border-color-tercelary2 hover:bg-color-tercelary2 hover:shadow-lg font-medium"
                onClick={(e) => {
                  console.log(title, note, teamList);
                  postProject.mutate();
                }}
              >
                Save project.
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
