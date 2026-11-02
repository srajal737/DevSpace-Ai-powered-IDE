
import dotenv from "dotenv";
import apiconnector from "./apiconnector.js";

dotenv.config();

const BASEURL = process.env.FILE_SERVICE_URL;

export const createFolder = async ({ projectId,name, parentId, userId,}) => {
  try {
    const res = await apiconnector(
      "post",`${BASEURL}/createFolder`,{ projectId, name, parentId },
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("Create folder failed:", e.response?.data || e.message);
    throw e;
  }
};





export const createFile = async ({projectId, name, parentId, content = "" , userId}) => {
  try {
    const res = await apiconnector(
      "post",`${BASEURL}/createfile`,{ projectId, name, parentId, content  },
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("Create file failed:", e.response?.data || e.message);
    throw e;
  }
};

export const updateFile = async ({ name,content="", userId ,id}) => {
  try {
    const res = await apiconnector(
      "post",`${BASEURL}/updatefile/${id}`,{ name,content },
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("update file failed:", e.response?.data || e.message);
    throw e;
  }
};




export const deleteFile = async ({ userId ,id}) => {
  try {
    const res = await apiconnector(
      "delete",`${BASEURL}/deletefile/${id}`,{},
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("delete file failed:", e.response?.data || e.message);
    throw e;
  }
};



export const getFileTree = async ({ userId ,projectId}) => {
  try {
    const res = await apiconnector(
      "get",`${BASEURL}/getTree/${projectId}`,{},
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("get file tree  failed:", e.response?.data || e.message);
    throw e;
  }
};



export const getFile = async ({ id , userId }) => {
  try {
    const res = await apiconnector(
      "get",`${BASEURL}/getfile/${id}`,{},
      {
        "x-user-id": String(userId),
      }
    );

    return res.data.data;
  } catch (e) {
    console.error("get file tree  failed:", e.response?.data || e.message);
    throw e;
  }
};





