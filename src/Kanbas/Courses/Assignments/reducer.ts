import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

const initialState = [...db.assignments];  // Ensure a copy of the original assignments

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: [...db.assignments],
  reducers: {
    addAssignment: (state, action) => {
      console.log('Current state:', state);
      console.log('New assignment:', action.payload);
      return [...state, action.payload];  
    },
    deleteAssignment: (state, action) => {
      console.log('Deleting assignment:', action.payload);
      return state.filter((assignment) => assignment._id !== action.payload);
    },
    updateAssignment: (state, action) => {
      const index = state.findIndex(
        (assignment) => assignment._id === action.payload._id
      );
      if (index !== -1) {
        console.log('Updating assignment at index:', index);
        state[index] = action.payload;
      }
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
