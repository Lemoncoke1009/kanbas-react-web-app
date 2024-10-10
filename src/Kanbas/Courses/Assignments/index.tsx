import { useParams } from "react-router";
import * as db from "../../Database";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControlButtons";
import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

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
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any, index: number) => (
                <li key={assignment._id} className="wd-assignment-item list-group-item p-3 ps-1 d-flex align-items-center">
                  <div className="d-flex align-items-center me-3">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-2 fs-3" />
                  </div>
                  <div className="flex-grow-1">
                  <Link
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark"
                  >
                    {assignment._id}
                    <LessonControlButtons />
                  </Link>
                  <br />
                  <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong>{" "}
                  {getAvailableDate(index)} at 11:59pm
                  <br />
                  <span>
                    <strong>Due</strong> {getDueDate(index)} at 11:59pm | 100 pts
                  </span>
                  </div>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}




// Helper functions to determine the due date and availability date based on the assignment index.
function getAvailableDate(index: number): string {
  const dates = ["May 6", "May 13", "May 20"];
  return dates[index % dates.length];
}

function getDueDate(index: number): string {
  const dueDates = ["May 13", "May 20", "May 27"];
  return dueDates[index % dueDates.length];
}
