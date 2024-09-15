export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" style={{ padding: "20px", maxWidth: "600px" }}>
        
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
    
        <textarea id="wd-description" cols={60} rows={8}>
          The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. 
          The landing page should include the following: Your full name and section, Links to each of the lab assignments, 
          Link to the Kanbas application, Links to all relevant source code repositories. The Kanbas application should 
          include a link to navigate back to the landing page.
        </textarea>
        <br />
  
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
              </select>
            </td>
          </tr>
            <br />
  
            <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-submission-type" >Submission Type</label>
            </td>
            <td>
            <select id="wd-submission-type" >
            <option value="online">Online</option>
            </select>
            </td>
            </tr>
        
       <br />

       <tr>
       <td align="right" valign="top"></td> 
          <label>Online Entry Options </label><br />
          <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
          <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
          <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
          <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br />
          <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Upload</label>
          
        <br />
        <br />
  
        <label htmlFor="wd-assign-to">Assign to</label><br />
        <input id="wd-assign-to" value="Everyone" style={{ width: "100%" }} /><br /><br />
      
        <label htmlFor="wd-due-date">Due</label><br />
        <input id="wd-due-date" type="date" value="2024-05-13" style={{ width: "150px", marginRight: "10px" }} />
         <br />
         <br />

        <label htmlFor="wd-available-from" style={{ display: "inline-block", width: "135px"}}>Available from</label>
        <label htmlFor="wd-available-until" style={{ display: "inline-block"}}>Until</label><br />
        <input id="wd-available-from" type="date" value="2024-05-06" style={{marginRight: "20px" }} />
        <input id="wd-available-until" type="date" value="2024-05-20" />
        <br />
        <br />

        <hr />
        <div style={{ textAlign: "right" }}>
        <button style={{ marginRight: "10px" }}>Cancel</button>
        <button>Save</button>
      </div>
      </tr>
      </table>
      </div>
    );
  }
  
  