import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import React, { useState,  useEffect } from "react";
import ModulesControls from "./ModulesControls";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../../Account/ProtectedRoute";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    try {
      if (!cid) {
        console.warn("No course ID provided");
        return;
      }
      console.log("Fetching modules for course:", cid);
      const modules = await coursesClient.findModulesForCourse(cid);
      console.log("Fetched modules:", modules);
      if (!Array.isArray(modules)) {
        console.warn("Received non-array response:", modules);
        dispatch(setModules([]));
      } else {
        dispatch(setModules(modules));
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
      dispatch(setModules([]));
    }
  };
  useEffect(() => {
    if (cid) {
      console.log("useEffect triggered with cid:", cid);
      fetchModules();
    }
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!cid) return;
    
    try {
      const newModule = { name: moduleName, course: cid };
      const createdModule = await coursesClient.createModuleForCourse(cid, newModule);
      console.log("Created module:", createdModule); 
      
      if (createdModule && createdModule._id) {
        dispatch(addModule(createdModule));
        setModuleName(""); 
      }
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };



  return (
    <div className="wd-modules">
    
      <ProtectedRoute roleRequired="FACULTY">
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={
            createModuleForCourse}
        />
      </ProtectedRoute>

      <ul id="wd-modules" className="list-group rounded-0">
  {(() => {
    console.log("Current modules in render:", modules);
    return Array.isArray(modules) && modules.length > 0 ? (
      modules.map((module: any) => (
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={module._id}>
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
            </div>

            <ProtectedRoute roleRequired="FACULTY">
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </ProtectedRoute>
          </div>

          {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1" key={lesson._id}>
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                  <LessonControlButtons />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))
    ) : (
      <li className="list-group-item">No modules found</li>
    );
  })()}
</ul>
    </div>
  );
}
