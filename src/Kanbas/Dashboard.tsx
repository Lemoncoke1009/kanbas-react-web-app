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
      
      <div id="wd-dashboard-courses" className="row">
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {/* Course 1 */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/course1.jpg" width="100%" height={160}/>
            <div className="card-body">
              <h5 className="wd-dashboard-course-title card-title">
                 CS1234 React JS
              </h5> <hr />
              <p className="wd-dashboard-course-title card-text">
                  Full Stack software developer
              </p>
              <button className="btn btn-primary"> Go </button>
            </div>
          </Link>
        </div>
        </div>
        
{/* Course 2 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/5678/Home">
      <img src="/images/course2.jpg" width="100%" height={160} alt="Course 2" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5002 React 2</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Web Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>

{/* Course 3 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/9101/Home">
      <img src="/images/course3.jpg" width="100%" height={160} alt="Course 3" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5003 React 3</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Web Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>


{/* Course 4 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/1213/Home">
      <img src="/images/course4.jpg" width="100%" height={160} alt="Course 4" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5004 React 4</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Web Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>

{/* Course 5 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/1415/Home">
      <img src="/images/course5.jpg" width="100%" height={160} alt="Course 5" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5005 React 5</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Web Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>

{/* Course 6 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/1617/Home">
      <img src="/images/course6.jpg" width="100%" height={160} alt="Course 6" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5006 React 6</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Backend Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>

{/* Course 7 */}
<div className="wd-dashboard-course col" style={{ width: "300px" }}>
  <div className="card rounded-3 overflow-hidden">
    <Link className="wd-dashboard-course-link text-decoration-none text-dark" 
          to="/Kanbas/Courses/1819/Home">
      <img src="/images/course7.jpg" width="100%" height={160} alt="Course 7" />
      <div className="card-body">
        <h5 className="wd-dashboard-course-title card-title">CS5007 React 7</h5>
        <hr />
        <p className="wd-dashboard-course-title card-text">Web Development</p>
        <button className="btn btn-primary">Go</button>
      </div>
    </Link>
  </div>
</div>
    </div>
    </div>
    </div>
  
  );
}
