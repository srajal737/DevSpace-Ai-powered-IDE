import apiconnector from "../utils/apiconnector";

import {
  getAllProjectAPI,
  GETSTARREDPROJECTAPI,
  GETPROJECTBYIDAPI,
  CREATEPROJECTAPI,
  DELETEPROJECTAPI,
} from "../utils/api";

const BASEURL = import.meta.env.VITE_BACKEND_URL;


export const createProject = async ({ name, description }) => {
  try {
    const result = await apiconnector(
      "post",
      CREATEPROJECTAPI,
      { name, description }
    );

    return result.data.project;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};

export const getallprojects = async () => {
  try {
    const result = await apiconnector(
      "get",
      getAllProjectAPI
    );

    return result.data.projects;
  } catch (error) {
    console.error("Fetching projects failed:", error);
    throw error;
  }
};

// Get project by ID
export const getprojectbyid = async (id) => {
  try {
    const result = await apiconnector(
      "get",
      `${BASEURL}/api/project/getprojectbyid/${id}`
    );

    return result.data;
  } catch (error) {
    console.error("Fetching project by ID failed:", error);
    throw error;
  }
};


export const getallstarredprojects = async () => {
  try {
    const result = await apiconnector(
      "get",
      GETSTARREDPROJECTAPI
    );

    return result.data.projects;
  } catch (error) {
    console.error("Fetching starred projects failed:", error);
    throw error;
  }
};

export const togglestar = async (id) => {
  try {
    const result = await apiconnector(
      "patch",
      `${BASEURL}/api/project/togglestar/${id}`
    );

    return result.data;
  } catch (error) {
    console.error("Toggling project star failed:", error);
    throw error;
  }
};


export const deleteproject = async (id) => {
  try {
    const result = await apiconnector(
      "delete",
      `${BASEURL}/api/project/deleteproject/${id}`
    );

    return result.data;
  } catch (error) {
    console.error("Deleting project failed:", error);
    throw error;
  }
};