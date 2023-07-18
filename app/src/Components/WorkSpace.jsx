//React
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
  Routes,
  BrowserRouter,
} from "react-router-dom";

//Pages
import { Dashboard } from "./Workspace/Dashboard/Dashboard";
import { Tasks } from "./Workspace/Tasks/Tasks";
import { Projects } from "./Workspace/Projects/Projects";
import { Notification } from "./Workspace/Notification/Notification";
import { ProjectTasks } from "./Workspace/Projects/ProjectTask.jsx/ProjectTasks"; 

export function WorkSpace() {
  return (
    <div className="w-[80%] h-[98vh] overflow-clip flex p-10 justify-center">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
		  <Route path="/team/:id" element={<ProjectTasks />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      
    </div>
  );
}
