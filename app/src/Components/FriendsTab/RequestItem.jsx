import React from "react";
import * as icon from "react-feather";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

export function RequestItem(props) {
  const axiosPrivate = useAxiosPrivate();

  const acceptRequest = async () => {
    try {
      await axiosPrivate.post(
        "/notes/acceptFriend",
        JSON.stringify({
          senderId: props.item.userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("user Accepted friend");
    } catch (err) {
      console.log(err);
    }
  };

  const denyRequest = async () => {
    try {
      await axiosPrivate.post(
        "/notes/denyFriend",
        JSON.stringify({
          senderId: props.item.userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("user Deny friend");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-color-truewhite mx-3 my-2 p-3 rounded-md flex justify-between shadow-md">
      <div>
        <h2>{props.item.userId}</h2>
      </div>
      <div className="flex gap-5">
        <button
          onClick={acceptRequest}
          className="bg-priority-low-secondary w-6 h-6 grid items-center justify-center rounded-md"
        >
          <icon.Check size={16} color="white" />
        </button>
        <button className="bg-priority-high-primary w-6 h-6 grid items-center justify-center rounded-md">
          <icon.X size={16} color="white" />
        </button>
      </div>
    </div>
  );
}
