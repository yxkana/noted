import React from "react";

export function Priority(props) {

	const low = (" text-sm  py-2 px-4 h-fit rounded-md text-color-whitesh font-medium bg-priority-low-secondary")
	const medium = ("text-sm py-2 px-4 h-fit rounded-md text-color-whitesh font-medium bg-priority-medium-primary")
	const high = (" text-sm  py-2 px-4 h-fit rounded-md text-color-whitesh font-medium bg-priority-high-primary")

	
  return (
    <div className={props.name === "Low" ? low : props.name === "Medium" ? medium : high}  >
      <h3>{props.name}</h3>
    </div>
  );
}
