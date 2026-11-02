

import { createSlice, current } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: [],
    currentProject:null
  },

  reducers: {
    setprojects: (state, action) => {
      state.projects = action.payload;
    },

    addnewproject: (state, action) => {
      state.projects.unshift(action.payload);
    },

    removeproject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },

    setcurrentProject:(state,action)=>{
      state.currentProject = action.payload
    }
    ,

    updatestar: (state, action) => {
      const { id, starMark } = action.payload;

      const project = state.projects.find(
        (project) => project._id === id
      );

      if (project) {
        project.starMark = starMark;
      }
    },
  },
});

export const {
  setprojects,
  addnewproject,
  removeproject,
  updatestar,
  setcurrentProject
} = projectSlice.actions;

export default projectSlice.reducer;