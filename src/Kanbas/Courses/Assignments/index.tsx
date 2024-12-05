import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer"; 
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModulesControlButtons";
import { MdAssignment } from "react-icons/md";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div id="wd-assignments-section">

      {currentUser?.role === "FACULTY" && <AssignmentsControls />}
      
      <br /><br /><br /><br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            {currentUser?.role === "FACULTY" && (
              <button id="wd-add-assignment-btn" className="btn btn-outline-secondary btn-sm ms-2 float-end">
                40% of Total <ModuleControlButtons />
              </button>
            )}
          </div>
          <ul className="wd-assignments-list list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
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
                      {assignment.title}
                    </Link>
                    <br />
                    <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong>{" "}
                    {assignment.availableFrom}
                    <br />
                    <span>
                      <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                    </span>
                  </div>
                  
               
                  {currentUser?.role === "FACULTY" && (
                    <button
                      onClick={() => handleDelete(assignment._id)}
                      className="btn btn-danger btn-sm float-end"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
