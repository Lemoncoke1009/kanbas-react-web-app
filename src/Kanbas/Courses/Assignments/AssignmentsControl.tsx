import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

export default function AssignmentsControl() {
  const { cid } = useParams();

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <Link to={`/Kanbas/Courses/${cid}/Assignments/A000`}>
        <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
      </Link>
      <button id="wd-add-group" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
    </div>
  );
}
