import React from 'react';
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import Session from './Account/Session';

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
 

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
 

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);
 
  
  const updateCourse = async () => {
    console.log("Current course state before update:", course);
    console.log("Course ID before update:", course?._id); // Add this line
    
    try {
        if (!course?._id) {
            console.error('Invalid course or missing course ID');
            return;
        }

        const updatedCourse = await courseClient.updateCourse({
            ...course,
            _id: course._id 
        });
        
        setCourses(courses.map((c) => 
            c._id === course._id ? updatedCourse : c
        ));

    } catch (error) {
        console.error('Failed to update course:', error);
    }
};




const [course, setCourse] = useState<any>({
  name: "New Course",
  number: "New Number",
  startDate: "2023-09-10",
  endDate: "2023-12-15",
  description: "New Description",
});

  const addNewCourse = async () => {
    //const newCourse = await courseClient.createCourse(course);
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };



  return (
    <Session>
        <div id="wd-kanbas">
          <KanbasNavigation />
          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                      enrolling={enrolling} 
                      setEnrolling={setEnrolling}
                      updateEnrollment={updateEnrollment}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Courses/:cid/*"
                element={
                  <ProtectedRoute>
                    <Courses courses={courses} />
                  </ProtectedRoute>
                }
              />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
        </Session>
  );
}
