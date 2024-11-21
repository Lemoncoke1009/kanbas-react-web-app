import axios from "axios";

const api = axios.create({ 
  withCredentials: true,
  baseURL: process.env.REACT_APP_REMOTE_SERVER 
});

export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await api.post(`/api/courses/${userId}/${courseId}/enroll`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await api.delete(`/api/courses/${userId}/${courseId}/unenroll`);
  return response.data;
};

export const checkEnrollmentStatus = async (userId: string, courseId: string) => {
  const response = await api.get(`/api/courses/${userId}/${courseId}/enrollment`);
  return response.data;
};

export {};