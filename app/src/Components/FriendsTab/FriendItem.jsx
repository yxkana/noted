import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import * as icon from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import { UserFriends } from "../../api/UserData";
import { SendNoteToFriend } from "./SendNoteToFriend";

export function FriendItem(props) {
  console.log(props.item)
  const [open, setOpen] = React.useState(false);
  const friendApi = new UserFriends();
  const extendedItemStyle =
    "bg-color-truewhite my-2 relative z-40 mx-3 p-3 rounded-md flex justify-between shadow-md shadow-color-tercelary2 hover:cursor-pointer  hover:z-40 ";
  const itemStyle =
    "bg-color-truewhite my-2 relative z-40 mx-3 p-3 rounded-md flex justify-between shadow-sm shadow-color-shadow hover:shadow-color-tercelary2 hover:shadow-md hover:cursor-pointer  hover:z-40";

  const handleClick = () => {
    setOpen(!open);
  };

  const deleteFriend = useMutation({
    mutationFn: (data) => {
      return friendApi.sendNote(data);
    },
  });

  return (
    <>
      <div
        onClick={handleClick}
        className={open ? extendedItemStyle : itemStyle}
      >
        <div>
          <h2>{props.item.userName}</h2>
        </div>
      </div>
      {open ? (
        <div className="mx-6 flex flex-col bg-color-truewhite rounded-md z-10 shadow-sm shadow-color-tercelary2 border border-color-tercelary2">
          <SendNoteToFriend reciver={props.item.userId} />
          <div className="flex items-center justify-between py-3 px-5 rounded-b-md hover:bg-color-grey hover:bg-opacity-25 hover:cursor-pointer">
            <p>Remove friend</p>
            <icon.UserMinus size={20} />
          </div>
        </div>
      ) : null}
    </>
  );
}
