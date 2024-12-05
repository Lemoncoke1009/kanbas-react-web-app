import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

interface Course {
  _id: string;
}

export const createModuleForCourse = async (courseId: string, module: any) => {
  try {
    console.log("Creating module for course:", courseId, module);
    const response = await axiosWithCredentials.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    console.log("Create module response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
 };
 

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  console.log("Fetched courses:", data);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  console.log("Client attempting to update course:", course); // Add this log
  if (!course._id) {
      throw new Error('Course ID is required');
  }

  try {
      const { data } = await axiosWithCredentials.put(
          `${COURSES_API}/${course._id}`,
          course
      );
      console.log("Update response from server:", data); // Add this log
      return data;
  } catch (error) {
      console.error('Error updating course:', error);
      throw error;
  }
};

export const findModulesForCourse = async (courseId: string) => {
  try {
    console.log("Finding modules for course:", courseId);
    const response = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/courses/${courseId}/modules`
    );
    
    if (Array.isArray(response.data)) {
      console.log("Received modules array:", response.data);
      return response.data;
    } else {
      console.warn("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error finding modules:", error);
    return [];
  }
};


export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};
export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments/new`,
    assignment
  );
  return response.data;
};



