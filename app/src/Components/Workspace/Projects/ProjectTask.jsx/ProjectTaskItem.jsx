import React from "react";
import * as icon from "react-feather";
import { axiosPrivate } from "../../../../api/axios";

import { Priority } from "./priority";
import { ProjectItemDropdown } from "./ProjectItemDropDown";
import { ItemTag } from "./item_tag";


export function ProjectTaskItem(props) {
  const item = props.item;
  console.log(item);
  console.log(item.id)
 

  return (
    <div key={props.key} className="bg-color-truewhite relative pt-4 px-5 rounded-md text-left flex-row shadow-[0px_0px_15px_5px_rgba(0,0,0,0.1)] text-lg">
      <ProjectItemDropdown
	  	taskId={item.id}
		projectId={props.projectId}
        index={item.index}
		status={item.status}
		
      />
      <div className="flex-grow p-3">
        <h2 className="font-bold text-color-primary text-2xl pb-4 underline">
          {item.title}
        </h2>
        <p className="pb-3">{item.msg}</p>
      </div>
      <hr className="border-b-1 border-t-0 h-2 shadow-md" />
      <div className="flex items-center my-5">
        <div className="flex-auto flex tags items-center overflow-x-auto scroll-m-4">
          <div className="flex flex-auto gap-4">
            {...item.tags.map((tag, index) => {
              return <ItemTag name={tag} key={index} />;
            })}
          </div>
        </div>
        <Priority name={item.priority.name} />
      </div>
    </div>
  );
}

