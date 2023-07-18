import React from "react";
import * as icon from "react-feather";

export function Tag(props) {
  const DeleteButton = (tag) => {
    return (
      <button onClick={()=>{
		return props.func(tag.tag);
	  }}>
        <icon.X size={16} />
      </button>
    );
  };

  return props.tag === "Bug" ? (
    <div className="gap-2 text-sm font-semibold flex items-center bg-tag-bug rounded-md py-1 px-4">
      <p>{props.tag}</p>
      <DeleteButton tag={props.tag} />
    </div>
  ) : props.tag === "Work" ? (
    <div className="gap-2 text-sm font-semibold flex items-center bg-tag-work border rounded-md py-1 px-4">
      <p>{props.tag}</p>
      <DeleteButton tag={props.tag} />
    </div>
  ) : props.tag === "Coding" ? (
    <div className="gap-2 text-sm font-semibold flex items-center bg-tag-coding border rounded-md py-1 px-4">
      <p>{props.tag}</p>
      <DeleteButton tag={props.tag} />
    </div>
  ) : props.tag === "Design" ? (
    <div className="gap-2 text-sm font-semibold flex items-center bg-tag-design border rounded-md py-1 px-4">
      <p>{props.tag}</p>
      <DeleteButton tag={props.tag} />
    </div>
  ) : (
    <div className="gap-2 text-sm font-semibold flex items-center bg-tag-personal border rounded-md py-1 px-4">
      <p>{props.tag}</p>
      <DeleteButton tag={props.tag} />
    </div>
  );
}
