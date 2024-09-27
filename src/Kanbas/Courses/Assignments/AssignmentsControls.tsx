import { FaPlus } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="text-nowrap d-flex justify-content-between align-items-center">
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

        <button id="wd-add-assignment" className="btn btn-danger btn-lg">
          <FaPlus className="me-2" /> Assignment
        </button>
      </div>
    </div>
  );
}
