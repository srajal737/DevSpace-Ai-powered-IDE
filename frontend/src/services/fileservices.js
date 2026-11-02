import { CREATEFILEAPI, CREATEFOLDERAPI, CREATEROOTFOLDERAPI, UPDATEFILEAPI } from "../utils/api";
import apiconnector from "../utils/apiconnector";
const BASEURL = import.meta.env.VITE_BACKEND_URL;


export const createRootFolder = async ({ projectId, projectName }) => {
  try {
    const result = await apiconnector(
      "post",
      CREATEROOTFOLDERAPI,
      { projectId, projectName }
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};



export const createFolder = async ({projectId , name ,parentId}) => {
  try {
    const result = await apiconnector(
      "post",
      CREATEFOLDERAPI,
    {projectId , name ,parentId}
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};


export const createFile = async ({projectId , name ,parentId,content="" , language="plaintext"}) => {
  try {
    const result = await apiconnector(
      "post",
      CREATEFILEAPI,
    {projectId , name ,parentId,content , language}
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};


export const updateFile = async ({name ,content,id}) => {
  try {
    const result = await apiconnector(
      "post",
      `${BASEURL}/api/project/updatefile/${id}`
      ,
    {name ,content},
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};

export const deleteFile = async (id) => {
  try {
    const result = await apiconnector(
      "delete",
      `${BASEURL}/api/project/deletefile/${id}`
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};

export const getFile = async (id) => {
  try {
    const result = await apiconnector(
      "get",
      `${BASEURL}/api/project/getfile/${id}`
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};
export const getFileTree = async (projectId) => {
  try {
    const result = await apiconnector(
      "get",
      `${BASEURL}/api/project/getTree/${projectId}`
    );

    return result.data.data;
  } catch (error) {
    console.error("Create project failed:", error);
    throw error;
  }
};

