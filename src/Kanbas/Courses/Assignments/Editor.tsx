import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer"; 

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer);
  
  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  const [assignedTo, setAssignedTo] = useState(["Everyone"]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (aid && aid !== 'new') {
      const foundAssignment = assignments.find(
        (assignment: any) => assignment._id === aid
      );
      if (foundAssignment) {
        setAssignment(foundAssignment);
      }
    }
  }, [aid, assignments]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setAssignedTo([...assignedTo, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleSave = () => {
    console.log('Saving assignment...', assignment);
    if (aid && aid !== 'new') {
      dispatch(updateAssignment({ ...assignment, _id: aid }));
    } else {
      const newAssignment = {
        ...assignment,
        _id: new Date().getTime().toString(),
        course: cid,
      };
      console.log('Adding new assignment:', newAssignment);
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    assignment && (
      <div id="wd-assignments-editor" className="p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label htmlFor="wd-name" className="form-label fw-bold">
            Assignment Name
          </label>
          <input
            id="wd-name"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <div className="form-control" id="wd-description">
            <p>The assignment is <span className="text-danger">available online</span>.</p>
            <p>
              Submit a link to the landing page of your Web application running on{" "}
              <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
                Netlify
              </a>.
            </p>
            <p>The landing page should include the following:</p>
            <ul>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>
                Link to the{" "}
                <a href="#https://www.netlify.com/" target="_blank" rel="noreferrer">
                  Kanbas application
                </a>
              </li>
              <li>Links to all relevant source code repositories</li>
            </ul>
            <p>
              The{" "}
              <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
                Kanbas application
              </a>{" "}
              should include a link to navigate back to the landing page.
            </p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-3 text-sm-end">
            <label htmlFor="wd-points" className="form-label fw-bold">Points</label>
          </div>
          <div className="col-sm-9">
            <input
              id="wd-points"
              type="number"
              value={assignment.points}
              onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-3 text-sm-end">
            <label htmlFor="wd-submission-type" className="form-label fw-bold">Submission Type</label>
          </div>
          <div className="col-sm-9">
            <select id="wd-submission-type" className="form-select">
              <option value="online">Online</option>
              <option value="paper">On Paper</option>
              <option value="external">External Tool</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-3 text-sm-end">
            <label htmlFor="wd-assignment-group" className="form-label fw-bold">Assignment Group</label>
          </div>
          <div className="col-sm-9">
            <select id="wd-assignment-group" className="form-select">
              <option value="labs">Labs</option>
              <option value="quizzes">Quizzes</option>
              <option value="projects">Projects</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-3 text-sm-end">
            <label className="form-label fw-bold">Assign</label>
          </div>
          <div className="col-sm-9">
            <div className="p-3 border rounded">
              <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
                <input
                  id="wd-assign-to"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={addTag}
                  className="form-control mb-3"
                  placeholder="Assign to..."
                />
                <div className="row g-3">
                  <div className="col-md-12">
                    <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                    <input
                      id="wd-due-date"
                      type="datetime-local"
                      value={assignment.dueDate}
                      onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mt-3">
                    <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                    <input
                      id="wd-available-from"
                      type="datetime-local"
                      value={assignment.availableFrom}
                      onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mt-3">
                    <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                    <input
                      id="wd-available-until"
                      type="datetime-local"
                      value={assignment.availableUntil}
                      onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger">Save</button>
        </div>
      </div>
    )
  );
}
