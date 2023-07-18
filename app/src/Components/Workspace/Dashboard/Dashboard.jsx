import React from "react";
import { useEffect } from "react";
import * as icon from "react-feather";
import { TaskGraph } from "./TaskGraph";
import { ProfileTab } from "./ProfileTab";
import { useQuery } from "react-query";
import { UserInfo } from "../../../api/UserData";

export function Dashboard() {
  const _userData = new UserInfo();

  const profileInfo = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => _userData.getProfileInfo(),
  });


  return (
    <div className="w-[2000px]">
      <div className="flex justify-between px-16">
        {
          /* TODO */
          /* Make here loading */
          profileInfo.status === "loading" ? null : (
            <ProfileTab profileData={profileInfo.data} />
          )
        }
        <div className="relative h-[450px] w-[49%] bg-color-grey rounded-3xl pr-14 py-10 text-color-primary">
          <div className="absolute right-14">
            <p>Past 7 days</p>
          </div>
          <TaskGraph />
        </div>
      </div>
      <div className="flex flex-col text-left p-16">
        <h1></h1>
      </div>
    </div>
  );
}
