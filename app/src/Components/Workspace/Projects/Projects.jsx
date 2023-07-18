import React from "react";
import * as icon from "react-feather";
import { CreateProject } from "./NewProject/NewProject";
import { useQuery } from "react-query";
import { ProjectApiHandle } from "../../../api/UserData";
import { ProjectItem } from "./ProjectItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export function Projects() {
  const project = new ProjectApiHandle();
  const fetchProject = useQuery({
    queryKey: ["fetchProject"],
    queryFn: () => {
      return project.getProjetct();
    },
  });

  

  return (
    <div className="px-16 w-[2000px] flex flex-col">
      <div className="flex gap-4 mb-10">
        <h1 className="font-bold text-5xl text-left text-color-primary">
          Projects
        </h1>
        <CreateProject />
      </div>
      <div className="bg-color-white p-6 rounded-2xl  flex-1 grid grid-cols-1 shadow-[inset_0px_10px_15px_-3px_rgba(0,0,0,0.1)] md:grid-cols-1 lg:grid-cols-2  sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3">
        {fetchProject.status === "loading"
          ? null
          : fetchProject.data.map((item, index) => {
              return <ProjectItem key={index} data={item} />;
            })}
      </div>
    </div>
  );
}
