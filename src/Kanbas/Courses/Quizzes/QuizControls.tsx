import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls() {
    return (
        <div id="wd-quiz-controls" className="text-nowrap">
            <div className="dropdown d-inline me-1 float-end">
                <button id="wd-quiz-menu" className="btn btn-lg btn-secondary"
                    type="button" data-bs-toggle="dropdown">
                    <IoEllipsisVertical className="fs-4" />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-quiz-edit" className="dropdown-item" href="#">
                            Edit Quiz</a>
                    </li>
                    <li>
                        <a id="wd-publish-quizzes-only-button" className="dropdown-item" href="#">
                            <GreenCheckmark />
                            Publish quizzes only</a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-quizzes-and-items" className="dropdown-item" href="#">
                            Unpublish all quizzes and items</a>
                    </li>
                    <li>
                        <a id="wd-unpublish-quizzes-only" className="dropdown-item" href="#">
                            Unpublish quizzes only</a>
                    </li>
                </ul>
            </div>
            <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>
        </div>
    );
}