
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("enrollments") || "[]");

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      const isEnrolled = state.some(
        (enrollment: any) => enrollment.user === userId && enrollment.course === courseId
      );

      if (isEnrolled) {
        return state.filter(
          (enrollment: any) => !(enrollment.user === userId && enrollment.course === courseId)
        );
      } else {
        state.push({ user: userId, course: courseId });
      }
    },
  },
});

const persistEnrollments = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = storeAPI.getState().enrollmentsReducer;
  localStorage.setItem("enrollments", JSON.stringify(state));
  return result;
};

export const { toggleEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
export { persistEnrollments };
