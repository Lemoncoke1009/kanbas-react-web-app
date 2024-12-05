import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const enrollCourse = async (userId: string, courseId: string) => {
  try {
    console.log("Client: Enrolling user", userId, "in course", courseId);
    const response = await axiosWithCredentials.post(
      `${REMOTE_SERVER}/api/courses/${userId}/${courseId}/enroll`
    );
    return response.data;
  } catch (error) {
    console.error("Enrollment API error:", error);
    throw error;
  }
};


export const unenrollCourse = async (userId: string, courseId: string) => {
  try {
    const response = await axiosWithCredentials.delete(
      `${REMOTE_SERVER}/api/courses/${userId}/${courseId}/unenroll`
    );
    return response.data;
  } catch (error) {
    console.error("Unenrollment API error:", error);
    throw error;
  }
};

export const fetchEnrolledCourses = async (userId: string) => {
  try {
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/users/${userId}/courses`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};