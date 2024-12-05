import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="d-flex justify-content-end mb-3">
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-secondary me-2"
      >
        View Progress
      </button>

      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-secondary me-2"
      >
        Collapse All
      </button>

      <div className="dropdown me-2">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <button id="wd-publish-all-modules-and-items-btn" className="dropdown-item">
              <GreenCheckmark />
              Publish all modules and items
            </button>
          </li>
          <li>
            <button id="wd-publish-modules-only-button" className="dropdown-item">
              <GreenCheckmark />
              Publish modules only
            </button>
          </li>
          <li>
            <button id="wd-unpublish-all-modules-and-items" className="dropdown-item">
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish all modules and items
            </button>
          </li>
          <li>
            <button id="wd-unpublish-modules-only" className="dropdown-item">
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish modules only
            </button>
          </li>
        </ul>
      </div>

      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-module-dialog"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>

      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
