import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControlButtons";
import { MdAssignment } from "react-icons/md";

export default function Assignments() {
  return (
    <div id="wd-assignments-section">

      <AssignmentsControls />
     <br /><br /><br /><br />
      
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS 


        <button id="wd-add-assignment-btn" className="btn btn-outline-secondary btn-sm ms-2 float-end">
        40% of Total <ModuleControlButtons />
        
        </button>

            
          </div>
          
          <ul className="wd-assignments-list list-group rounded-0">
   
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment />
              <a className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123">
              A1 - ENV + HTML 
              <LessonControlButtons />
              </a>
              <br />
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am
              <br />
              <span><strong>Due</strong> May 13 at 11:59pm | 100 pts</span>
            </li>
 
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment />
              <a className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123">
              A2 - CSS + BOOTSTRAP 
              <LessonControlButtons />
              </a>
              <br />
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am
              <br />
              <span><strong>Due</strong> May 20 at 11:59pm | 100 pts</span>
            </li>
 
            <li className="wd-assignment-item list-group-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <MdAssignment />
              <a className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123">
              A2 - CSS + BOOTSTRAP 
              A3 - JAVASCRIPT + REACT 
              <LessonControlButtons />
              </a>
              <br />
              <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am
              <br />
              <span><strong>Due</strong> May 27 at 11:59pm | 100 pts</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

