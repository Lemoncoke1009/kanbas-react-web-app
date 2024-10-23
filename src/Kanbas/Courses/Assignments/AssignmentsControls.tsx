import { FaPlus } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams(); 

  const createAssignment = () => {
    if (!cid) {
      console.error("No course ID found for assignment creation.");
      return;
    }

    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center">
      <div className="input-group" style={{ width: "300px" }}>
        <span className="input-group-text bg-white border-end-0">
          <BsSearch className="text-secondary" />
        </span>
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="form-control border-start-0"
          style={{ borderRadius: "0 5px 5px 0" }}
        />
      </div>

      <div>
        <button
          id="wd-add-assignment-group"
          className="btn btn-outline-secondary btn-lg me-2"
        >
          + Group
        </button>

        <button id="wd-add-assignment" className="btn btn-danger btn-lg" onClick={createAssignment}>
          <FaPlus className="me-2" /> Assignment
        </button>
      </div>
    </div>
  );
}
