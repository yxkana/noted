import React, { useState } from "react";
import * as _ from "lodash";
import * as icons from "react-feather";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export function SideBar(props) {
  const iconSize = 32;
  const iconColor = "#F9F5EB";

  function handleFriendsButton() {
    setFriendsTabOpen((prev) => {
      return !prev;
    });
  }

  return (
    <div className="fixed justify-between p-5 flex flex-col bg-color-grey top-0 left-0 h-screen w-28 text-white shadow-[5px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div>
        <SideBarButton
          icon={
            <icons.BarChart2
              color={iconColor}
              size={iconSize}
              strokeWidth={"2px"}
            />
          }
          text={"Dashboard"}
        />
        <SideBarButton
          icon={
            <icons.Layers
              color={iconColor}
              size={iconSize}
              strokeWidth={"2px"}
            />
          }
          text={"Projects"}
        />
        <SideBarButton
          icon={
            <icons.Bell color={iconColor} size={iconSize} strokeWidth={"2px"} />
          }
          text={"Notification"}
        />
        <SideBarButton
          icon={
            <icons.File color={iconColor} size={iconSize} strokeWidth={"2px"} />
          }
          text={"Tasks"}
        />
      </div>
      <div>
        <FriendList
          icon={
            <icons.Users
              color={iconColor}
              size={iconSize}
              strokeWidth={"2px"}
            />
          }
          func={props.showFriendsFunc}
          text={"Friends"}
        />

        <LogOut
          icon={
            <icons.LogOut
              color={iconColor}
              size={iconSize}
              strokeWidth={"2px"}
            />
          }
          text={"Log Out"}
        />
      </div>
    </div>
  );
}

function SideBarButton(props) {
  const to = "/" + _.lowerFirst(props.text);
  const navigate = useNavigate();

  const route = () => {
    return navigate(to, { replace: true });
  };

  return (
    <div
      className="sidebar-icon h-16 w-16 mb-5 group cursor-pointer"
      onClick={route}
    >
      {props.icon}
      <span className="sidebar-tooltip group group-hover:scale-100 whitespace-nowrap">
        {props.text}
      </span>
    </div>
  );
}

function LogOut(props) {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className="sidebar-icon h-16 w-16 group cursor-pointer"
      onClick={signOut}
    >
      {props.icon}
      <span className="sidebar-tooltip group-hover:scale-100 whitespace-nowrap">
        {props.text}
      </span>
    </div>
  );
}

function FriendList(props) {

  const [friendsTabOpen, setFriendsTabOpen] = useState(false);

  const activeButton =
    "sidebar-icon-active h-16 w-16 mb-5 group cursor-pointer";

  return (
    <div
      className={friendsTabOpen ? "sidebar-icon h-16 w-16 mb-5 group cursor-pointer" :activeButton}
      onClick={() => {
		setFriendsTabOpen((prev)=>{
			return !prev;
		})

        return props.func();
      }}
    >
      {props.icon}
      <span className="sidebar-tooltip group-hover:scale-100 whitespace-nowrap">
        {props.text}
      </span>
    </div>
  );
}
