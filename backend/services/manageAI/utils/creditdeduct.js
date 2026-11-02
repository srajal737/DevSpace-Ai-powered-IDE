 const BASEURL = process.env.AUTH_SERVICE_URL;
import apiconnector from "./apiconnector.js";
 
export const deductCredits = async ({  userId , amount}) => {
  try {
    const res = await apiconnector(
      "post",`${BASEURL}/user/credit-minus`,{  userId , amount },
    );

    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.error("Create folder failed:", e.response?.data || e.message);
    throw e;
  }
};

export const getCredits = async ({  userId }) => {
  try {
    const res = await apiconnector(
      "get",`${BASEURL}/user/getCredits`,{  userId  },
    );

    return res.data.data;
  } catch (e) {
    console.error("Create folder failed:", e.response?.data || e.message);
    throw e;
  }
};
