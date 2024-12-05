import { useParams, useNavigate } from "react-router-dom";
import { updateAssignment, addAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: { _id: string; }) => a._id === aid));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      title: (document.getElementById("wd-name") as HTMLInputElement)?.value,
      description: (document.getElementById("wd-description") as HTMLInputElement)?.value,
      dueDate: (document.getElementById("wd-due-date") as HTMLInputElement)?.value,
      availableFrom: (document.getElementById("wd-available-from") as HTMLInputElement)?.value,
      untilDate: (document.getElementById("wd-available-until") as HTMLInputElement)?.value,
      points: (document.getElementById("wd-points") as HTMLInputElement)?.value
    };
    const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(assignment));
  };

  const saveAssignment = async () => {
    const assignment = {
      _id: aid || new Date().getTime().toString(),
      title: (document.getElementById("wd-name") as HTMLInputElement)?.value,
      description: (document.getElementById("wd-description") as HTMLInputElement)?.value,
      dueDate: (document.getElementById("wd-due-date") as HTMLInputElement)?.value,
      availableFrom: (document.getElementById("wd-available-from") as HTMLInputElement)?.value,
      untilDate: (document.getElementById("wd-available-until") as HTMLInputElement)?.value,
      points: (document.getElementById("wd-points") as HTMLInputElement)?.value
    };
    if (aid) {
      await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    }
    else {
      createAssignmentForCourse();
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  }

  return (
    <div id="wd-assignments-editor" className="container">
      <div>
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control"
          defaultValue={assignment?.title} placeholder="Enter assignment name" />
      </div>
      <textarea id="wd-description" className="form-control mt-3 mb-3"
        placeholder="Enter assignment description" defaultValue={assignment?.description}>
      </textarea>

      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-points" className="form-label p-1">Points</label>
        </div>
        <div className="col">
          <input id="wd-points" className="form-control" defaultValue={assignment?.points} placeholder="Points" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-group" className="form-label">Assignment Group</label>
        </div>
        <div className="col">
          <select id="wd-group" className="form-select">
            <option value="Assignment">ASSIGNMENTS</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
        </div>
        <div className="col">
          <select id="wd-display-grade-as" className="form-select">
            <option value="Percentage">Percentage</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
        </div>
        <div className="col border p-3">
          <select id="wd-submission-type" className="form-select mb-3">
            <option value="Online">Online</option>
          </select>
          Online Entry Options
          <div className="form-check mt-1">
            <input type="checkbox" name="online-submission" id="wd-text-entry" className="form-check-input" />
            <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="online-submission" id="wd-website-url" className="form-check-input" />
            <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="online-submission" id="wd-media-recordings" className="form-check-input" />
            <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="online-submission" id="wd-student-annotation" className="form-check-input" />
            <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
          </div>
          <div className="form-check">
            <input type="checkbox" name="online-submission" id="wd-file-upload" className="form-check-input" />
            <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-end">
          <label htmlFor="wd-assign-to" className="form-label">Assign</label>
        </div>
        <div className="col border p-3">
          <div className="mb-3">
            <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
            <select id="wd-assign-to" className="form-select">
              <option value="Everyone">Everyone</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="wd-due-date" className="form-label">Due</label>
            <input type="datetime-local" id="wd-due-date" className="form-control" value={assignment?.dueDate} />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="wd-available-from" className="form-label">Available from</label>
              <input type="datetime-local" id="wd-available-from" className="form-control" value={assignment?.availableFrom} />
            </div>
            <div className="col">
              <label htmlFor="wd-available-until" className="form-label">Until</label>
              <input type="datetime-local" id="wd-available-until" className="form-control" value={assignment?.untilDate} />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5"></hr>
      <div className="row mb-3 float-end">
        <div className="col mb-3">
          <button className="btn btn-secondary me-2"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>Cancel</button>
          <button className="btn btn-danger me-2" onClick={saveAssignment}>Save</button>
        </div>
      </div>
    </div>
  );
}
