import React from "react";
import { useState } from "react";
import * as icon from "react-feather";
import { ChangeNameInput } from "./ChangeNameInput";

export function ProfileTab(props) {
  const [changeName, setChangeName] = useState(false);

  const _userData = props.profileData;
  

  return (
    <div className="w-[49%] h-[450px] flex flex-col justify-between bg-color-grey rounded-3xl p-10 text-color-primary">
      <div className="flex gap-5 mb-3">
        <div className="h-[140px] w-[140px] rounded-full">
           <img src="https://doodleipsum.com/500x500/avatar-2" /> 
        </div>
        <div className="flex flex-col gap-4">
          {changeName ? (
            <ChangeNameInput oldName={_userData.username} state={setChangeName} />
          ) : (
            <h1 className="text-5xl font-semibold text-left flex justify-between items-start">
              {_userData.username}
              <button
                onClick={() =>
                  setChangeName((prev) => {
                    return true;
                  })
                }
              >
                <icon.Edit size={16} />
              </button>
            </h1>
          )}
          <p className="text-xl text-left">{_userData.email}</p>
          <p className="text-xl text-left">{_userData.identity}</p>
        </div>
      </div>
      <div className=" flex flex-col w-1/2 justify-between text-4xl font-semibold text-color-primary">
        <div className="relative h-20 items-center justify-between w-36 flex p-3">
          <div>
            <hr className="bg-color-tercelary2 h-[60px] w-1 border-none rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 absolute left-6 top-0">
              <p className="text-base">To-Do</p>
              <icon.Book size={18} />
            </div>
            <h3 className="absolute bottom-2 left-8 font-semibold">
              {_userData.notesStatus.todo}
            </h3>
          </div>
        </div>
        <div className="relative h-20 items-center justify-between w-36 flex p-3">
          <div>
            <hr className="bg-color-tercelary2 h-[60px] w-1 border-none rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 absolute left-6 top-0">
              <p className="text-base">In progress</p>
              <icon.BookOpen size={18} />
            </div>
            <h3 className="absolute bottom-2 left-8 font-semibold">
              {_userData.notesStatus.progress}
            </h3>
          </div>
        </div>
        <div className="relative h-20 items-center justify-between w-36 flex p-3">
          <div>
            <hr className="bg-color-tercelary2 h-[60px] w-1 border-none rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 absolute left-6 top-0">
              <p className="text-base">Completed</p>
              <icon.Archive size={18} />
            </div>
            <h3 className="absolute bottom-2 left-8 font-semibold">
              {_userData.notesStatus.complete}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
