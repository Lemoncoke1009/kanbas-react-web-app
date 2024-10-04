import React, { useState } from 'react';


export default function AssignmentEditor() {
  const [assignedTo, setAssignedTo] = useState(["Everyone"]);
  const [inputValue, setInputValue] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setAssignedTo([...assignedTo, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setAssignedTo(assignedTo.filter((t) => t !== tag));
  };

  return (
    <div id="wd-assignments-editor" className="p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" className="form-control" />
      </div>

      <div className="mb-3">
        <div className="form-control" id="wd-description">
          <p>
            The assignment is <span className="text-danger">available online</span>.
          </p>
          <p>
            Submit a link to the landing page of your Web application running on
            <a href="https://www.netlify.com/" target="_blank" rel="noreferrer"> Netlify</a>.
          </p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>
              Link to the
              <a href="#https://www.netlify.com/" target="_blank" rel="noreferrer"> Kanbas application</a>
            </li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The
            <a href="https://www.netlify.com/" target="_blank" rel="noreferrer"> Kanbas application</a>
            should include a link to navigate back to the landing page.
          </p>
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-sm-9">
          <input id="wd-points" type="number" value={100} className="form-control" />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-group">Assignment Group</label>
        </div>
        <div className="col-sm-9">
          <select id="wd-group" className="form-control">
            <option value="assignments">ASSIGNMENTS</option>
          </select>
        </div>
      </div>

      {/* Display Grade as */}
      <div className="row mb-3">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-display-grade-as">Display Grade as</label>
        </div>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" className="form-control">
            <option value="percentage">Percentage</option>
            <option value="points">Points</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-submission-type">Submission Type</label>
        </div>
        <div className="border p-3 mb-3">
          <div className="col-sm-9">
            <select id="wd-submission-type" className="form-control">
              <option value="online">Online</option>
            </select>
          </div>

          {/* Online Entry Options */}
          <div className="row mb-3">
            <div className="col-sm-9">
              <label>Online Entry Options</label><br />
              <div className="form-check">
                <input type="checkbox" id="wd-text-entry" className="form-check-input" />
                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-website-url" className="form-check-input" />
                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
              </div>
              <div className="form-check">
                <input type="checkbox" id="wd-file-upload" className="form-check-input" />
                <label htmlFor="wd-file-upload" className="form-check-label">File Upload</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Assign</label>
        <div className="p-3 border rounded">
          {/* Assign to */}
          <div className="mb-3">
            <label htmlFor="wd-assign-to" className="form-label fw-bold">
              Assign to
            </label>
            <div className="d-flex align-items-center flex-wrap border p-2 rounded">
              {assignedTo.map((tag, index) => (
                <span key={index} className="badge bg-light text-dark me-2">
                  {tag}{" "}
                  <button
                    type="button"
                    className="btn-close ms-1"
                    aria-label="Remove"
                    onClick={() => removeTag(tag)}
                    style={{ fontSize: "0.75em" }}
                  ></button>
                </span>
              ))}
              <input
                id="wd-assign-to"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={addTag}
                className="form-control border-0"
                placeholder="Assign to..."
                style={{ boxShadow: "none", width: "auto" }}
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="wd-due-date" className="form-label fw-bold">
                Due
              </label>
              <input
                id="wd-due-date"
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
                className="form-control"
              />
            </div>

            {/* Available from */}
            <div className="col-md-6">
              <label htmlFor="wd-available-from" className="form-label fw-bold">
                Available from
              </label>
              <input
                id="wd-available-from"
                type="datetime-local"
                defaultValue="2024-05-06T00:00"
                className="form-control"
              />
            </div>

            {/* Available until */}
            <div className="col-md-6 mt-3">
              <label htmlFor="wd-available-until" className="form-label fw-bold">
                Until
              </label>
              <input
                id="wd-available-until"
                type="datetime-local"
                defaultValue="2024-05-20T00:00"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
  );
}
