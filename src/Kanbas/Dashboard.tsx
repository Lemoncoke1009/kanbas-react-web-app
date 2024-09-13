import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      {/* Dashboard Title */}
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      
      {/* Published Courses Section */}
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      
      <div id="wd-dashboard-courses">
        {/* Course 1 */}
        <div className="wd-dashboard-course">
          <img src="/images/course1.jpg" width={200} alt="Course 1" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
            <Link to="/Kanbas/Courses/1234/Home">Go</Link>
          </div>
        </div>

        {/* Course 2 */}
        <div className="wd-dashboard-course">
          <img src="/images/course2.jpg" width={200} alt="Course 2" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/5678/Home">
              CS5002 React 2
            </Link>
            <p className="wd-dashboard-course-title">Web Development</p>
            <Link to="/Kanbas/Courses/5678/Home">Go</Link>
          </div>
        </div>

        {/* Course 3 */}
        <div className="wd-dashboard-course">
          <img src="/images/course3.jpg" width={200} alt="Course 3" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/9101/Home">
                CS5003 React 3
            </Link>
            <p className="wd-dashboard-course-title">Web Development</p>
            <Link to="/Kanbas/Courses/9101/Home">Go</Link>
          </div>
        </div>

        {/* Course 4 */}
        <div className="wd-dashboard-course">
          <img src="/images/course4.jpg" width={200} alt="Course 4" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1213/Home">
                CS5004 React 4
            </Link>
            <p className="wd-dashboard-course-title">Web Development</p>
            <Link to="/Kanbas/Courses/1213/Home">Go</Link>
          </div>
        </div>

        {/* Course 5 */}
        <div className="wd-dashboard-course">
          <img src="/images/course5.jpg" width={200} alt="Course 5" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1415/Home">
                CS5005 React 5
            </Link>
            <p className="wd-dashboard-course-title">Web Development</p>
            <Link to="/Kanbas/Courses/1415/Home">Go</Link>
          </div>
        </div>

        {/* Course 6 */}
        <div className="wd-dashboard-course">
          <img src="/images/course6.jpg" width={200} alt="Course 6" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1617/Home">
                CS5006 React 6
            </Link>
            <p className="wd-dashboard-course-title">Backend Development</p>
            <Link to="/Kanbas/Courses/1617/Home">Go</Link>
          </div>
        </div>

        {/* Course 7 */}
        <div className="wd-dashboard-course">
          <img src="/images/course7.jpg" width={200} alt="Course 7" />
          <div>
            <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1819/Home">
                CS5007 React 7
            </Link>
            <p className="wd-dashboard-course-title">Web Development</p>
            <Link to="/Kanbas/Courses/1819/Home">Go</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
