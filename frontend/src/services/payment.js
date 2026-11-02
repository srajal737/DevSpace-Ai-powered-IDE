
import { CREATEORDER ,GETHISTORY,ORDERVERIFY} from "../utils/api";
import apiconnector from "../utils/apiconnector";

export const PaymentCreate = async (plan) => {
  try {
    const result = await apiconnector(
      "post",
       CREATEORDER,
       {plan},
    
    );

    return result.data;
  } catch (error) {
    console.error("Create order failed:", error);
    throw error;
  }
};


export const PaymentVerify = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  try {
    const result = await apiconnector(
      "post",
       ORDERVERIFY,
       { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    
    );

    return result.data;
  } catch (error) {
    console.error("verify order failed:", error);
    throw error;
  }
};


export const getPaymentHistory = async () => {
    try {
        const result = await apiconnector(
            "get",
            GETHISTORY
        );

        return result.data;
    } catch (error) {
        console.error("Fetch payment history failed:", error);
        throw error;
    }
};


