import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { IoIosSearch } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { VscNotebook } from "react-icons/vsc";
import DeleteDialog from "./DeleteDialog";
import { useParams } from "react-router-dom";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import BSGripVertical from "../Modules/BsGripVertical";
import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import AssignmentsControl from "./AssignmentsControl";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setShowDeleteDialog(true);
  };

  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
    setSelectedAssignmentId(null);
    setShowDeleteDialog(false);
  };

  return (
    <div>
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <div className="d-flex align-items-center">
            <IoIosSearch className="me-2" />
            <input id="wd-search-assignment" className="form-control" placeholder="Search for Assignment" />
          </div>
        </div>
        {currentUser.role === "FACULTY" && <AssignmentsControl />}
      </div>
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-group list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary align-items-center">
            {currentUser.role === "FACULTY" && <BSGripVertical />}
            ASSIGNMENTS
            {currentUser.role === "FACULTY" && <AssignmentHeaderButtons />}
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .map((assignment: any) => {
                const dueDate = new Date(assignment.dueDate);
                const availableDate = new Date(assignment.availableFrom);
                const formattedAvailableFromDate = availableDate.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });
                const formattedDueDate = dueDate.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });
                return (
                  <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center">
                    {currentUser.role === "FACULTY" && <BsGripVertical />}
                    <VscNotebook color="green" className="me-3" />
                    <div className="me-5">
                      <a className="wd-assignment-link text-dark text-decoration-none" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                        {assignment.title}
                      </a>
                      <div className="text-muted small">
                        <strong>Not available until</strong> {formattedAvailableFromDate} | <strong> Due</strong> {formattedDueDate} | {assignment.points} pts
                      </div>
                    </div>
                    {currentUser.role === "FACULTY" && (
                      <div className="ms-auto">
                        <FaTrash
                          className="text-danger me-2 mb-1"
                          onClick={() => handleDeleteClick(assignment._id)}
                        />
                        <LessonControlButtons />
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </li>
      </ul>
      <DeleteDialog
        assignmentId={selectedAssignmentId}
        onConfirm={removeAssignment}
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
