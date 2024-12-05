import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,

  reducers: {
    enroll: (state, { payload: enrollment }) => {
      state.enrollments = [...state.enrollments, enrollment] as any;
    },
    unenroll: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;