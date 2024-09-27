export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4 mx-auto" style={{ maxWidth: "600px" }}>

      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" className="form-control" />
      </div>

      <div className="mb-3">
        <textarea id="wd-description" cols={60} rows={8} className="form-control">
          The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.
          The landing page should include the following: Your full name and section, Links to each of the lab assignments,
          Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should
          include a link to navigate back to the landing page.
        </textarea>
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
        <div className="col-sm-3 text-sm-end">
         
        </div>
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
      
      {/* Assign to */}
      <div className="mb-3">
        <label htmlFor="wd-assign-to">Assign to</label>
        <input id="wd-assign-to" value="Everyone" className="form-control" />
      </div>

      {/* Due Date */}
      <div className="mb-3">
        <label htmlFor="wd-due-date">Due</label>
        <input id="wd-due-date" type="date" value="2024-05-13" className="form-control" style={{ width: "150px" }} />
      </div>

      {/* Available from and Until */}
      <div className="row mb-3">
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-available-from">Available from</label>
        </div>
        <div className="col-sm-3">
          <input id="wd-available-from" type="date" value="2024-05-06" className="form-control" />
        </div>
        <div className="col-sm-3 text-sm-end">
          <label htmlFor="wd-available-until">Until</label>
        </div>
        <div className="col-sm-3">
          <input id="wd-available-until" type="date" value="2024-05-20" className="form-control" />
        </div>
      </div>

      <hr />
      <div className="text-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>
    
  );
}
