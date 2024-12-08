import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Quizzes from "./Quizzes";
import QuizList from "./Quizzes/QuizList";
import NewQuiz from "./Quizzes/NewQuiz";
import QuizDetail from "./Quizzes/QuizDetail";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizStart from "./Quizzes/QuizStart";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="" element={<Home />}  />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes" element={<Quizzes />}>
              <Route path="" element={<QuizList />} />
              <Route path="New" element={<NewQuiz />} />
              <Route path="New/:qid" element={<NewQuiz />} />
              <Route path="Preview/:qid" element={<QuizPreview />} />
              <Route path="Testing/:qid" element={<QuizStart />} />
              <Route path="Detail/:qid" element={<QuizDetail />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}


