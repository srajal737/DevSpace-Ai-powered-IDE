
import React, { useEffect, useState } from "react";
import { getPaymentHistory } from "../services/payment";
import Loader from "../components/Loader";

const History = () => {
  const [payments, setPayments] = useState([]);
  const [loading,setloading] =useState(false);
  useEffect(() => {
    const fetchHistory = async () => {
        setloading(true);
      try {
        const result = await getPaymentHistory();
        console.log(result);
        setPayments(result.payments || []);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };

    fetchHistory();
  }, []);

  if(loading){
    return <div className="flex  my-[40vh] justify-center text-black dark:text-white ">
        <Loader/>
    </div>
  }
  return (
   
<div className="min-h-screen  p-6 bg-gray-50 dark:bg-[#0b0f19]/30 text-gray-900 dark:text-white transition-colors">

  <h1 className="text-2xl font-bold mb-6">
    Payment History
  </h1>

  {payments.length === 0 ? (
    <p className="text-gray-500 dark:text-gray-400">
      No payment history found.
    </p>
  ) : (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div
          key={payment._id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex justify-between items-center shadow-sm dark:shadow-none hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
        >
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {payment.plan} Plan
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {payment.credits} Credits
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-white">
              ₹{payment.amount / 100}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                payment.status === "paid"
                  ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                  : payment.status === "failed"
                  ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
              }`}
            >
              {payment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default History;
