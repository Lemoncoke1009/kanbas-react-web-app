import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import { toggleEnrollment } from "./reducer";
import { useState } from "react";

interface DashboardProps {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
}

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleShowCourses = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEnrollmentToggle = (courseId: string, event: React.MouseEvent) => {
    event.preventDefault(); 
    dispatch(toggleEnrollment({ userId: currentUser._id, courseId }));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />
      
      <ProtectedRoute roleRequired="FACULTY">
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => {
              console.log('Add Button Clicked');
              addNewCourse();
            }}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <hr />
        <br />
        <input
          defaultValue={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          defaultValue={course.description}
          className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </ProtectedRoute>

      {currentUser.role === "STUDENT" && (
        <div>
          <button
            className="btn btn-primary float-end"
            onClick={toggleShowCourses}
          >
            {showAllCourses ? "Show Enrollments" : "Show All Courses"}
          </button>
        </div>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2> 
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={course.image || "/images/default_course.jpg"}
                    alt={`${course.name}`}
                    width="100%"
                    height={160}
                  />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button className="btn btn-primary">Go</button>

                    <ProtectedRoute roleRequired="FACULTY">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>

                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    </ProtectedRoute>

                    {currentUser.role === "STUDENT" && (
                      <button
                        onClick={(event) => handleEnrollmentToggle(course._id, event)}
                        className="btn btn-success float-end"
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}