
import { motion } from "framer-motion";
import {
    FiZap,
    FiCheck,
    FiArrowRight,
    FiStar,
    FiCreditCard,
    FiShield,
    FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PaymentCreate, PaymentVerify } from "../services/payment";
import { useState } from "react";
import toast from "react-hot-toast";

const plans = {
    basic: {
        name: "Basic",
        amount: 19900,
        credits: 2000,
    },
    pro: {
        name: "Pro",
        amount: 49900,
        credits: 5000,
    },
};

const Plan = () => {
    const navigate = useNavigate();

    const formatPrice = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount / 100);

    const [loading, setloading] = useState(false);
    const handleSelectPlan = async (planKey) => {
        try {
            setloading(true);
            const data = await PaymentCreate(planKey);
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: "INR",
                name: "Devspace IDE",
                description: `${data.plan.name}`,
                order_id: data.order.id,
                handler: async (res) => {
                    try {
                        const {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        } = res;

                        // Verify payment on backend
                        await PaymentVerify({
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        });

                        toast.success("Payment Done!");
                    } catch (error) {
                        toast.error("Payment verification failed");
                        console.error(error);
                    } finally {
                        setloading(false);
                    }

                },
                modal: {
                    ondismiss: () => {
                        setloading(false);
                    },
                },

                theme: {
                    color: "#3399cc",
                },
            }

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", (response) => {
                toast.error(response.error.description || "Payment failed");
                setloading(false);
            });
            razorpay.open()
        }
        catch (error) {
            console.error("Payment error:", error);
            toast.error("Something went wrong!");
            setloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-12
      dark:bg-[#09090f]/30 sm:px-6 lg:px-8 ">

            {/* Background Decoration */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 h-96 w-96
          -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80
          rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14 text-center"
                >
                    <div className="mb-5 inline-flex items-center gap-2
            rounded-full border border-violet-500/20
            bg-violet-500/10 px-4 py-2 text-xs font-semibold
            text-violet-600 dark:text-violet-300">
                        <FiZap />
                        SIMPLE & FLEXIBLE PRICING
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight
            text-slate-900 dark:text-white sm:text-5xl">
                        Choose the perfect{" "}
                        <span className="bg-gradient-to-r from-violet-600
              to-indigo-500 bg-clip-text text-transparent">
                            plan for you
                        </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7
            text-slate-500 dark:text-slate-400 sm:text-base">
                        Get the credits you need and unlock more possibilities.
                        Choose a plan that fits your workflow.
                    </p>
                </motion.div>

                {/* Plans */}
                <div className="mx-auto grid max-w-4xl gap-7
          md:grid-cols-2 md:gap-8">

                    {/* Basic Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -6 }}
                        className="relative flex flex-col overflow-hidden
              rounded-3xl border border-slate-200
              bg-white p-7 shadow-xl shadow-slate-200/40
              dark:border-white/10 dark:bg-[#12121c]
              dark:shadow-black/20 sm:p-8"
                    >
                        <div className="mb-6">
                            <div className="mb-4 flex h-12 w-12 items-center
                justify-center rounded-2xl bg-slate-100
                text-slate-700 dark:bg-white/10
                dark:text-slate-200">
                                <FiZap size={23} />
                            </div>

                            <h2 className="text-2xl font-bold
                text-slate-900 dark:text-white">
                                {plans.basic.name}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500
                dark:text-slate-400">
                                Perfect to get started.
                            </p>
                        </div>

                        <div className="mb-7">
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-extrabold
                  tracking-tight text-slate-900
                  dark:text-white">
                                    {formatPrice(plans.basic.amount)}
                                </span>

                                <span className="mb-1 text-sm text-slate-500">
                                    / plan
                                </span>
                            </div>
                        </div>

                        <div className="mb-7 rounded-2xl bg-slate-50 p-5
              dark:bg-white/5">
                            <p className="text-xs font-medium uppercase
                tracking-wider text-slate-500
                dark:text-slate-400">
                                Included credits
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                                <FiZap className="text-violet-500" size={22} />

                                <span className="text-3xl font-bold
                  text-slate-900 dark:text-white">
                                    {plans.basic.credits.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-500
                dark:text-slate-400">
                                Credits included with this plan
                            </p>
                        </div>

                        <div className="mb-8 flex-1">
                            <p className="mb-4 text-sm font-semibold
                text-slate-800 dark:text-white">
                                What's included
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "2,000 credits",
                                    "Access to basic features",
                                    "Secure payment",
                                    "Credit balance tracking",
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <span className="flex h-5 w-5 items-center
                      justify-center rounded-full bg-emerald-500/10
                      text-emerald-600 dark:text-emerald-400">
                                            <FiCheck size={12} />
                                        </span>

                                        <span className="text-sm text-slate-600
                      dark:text-slate-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileFocus={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            disabled={loading}
                            onClick={() => handleSelectPlan("Basic")}
                            className="flex w-full items-center justify-center
                gap-2 rounded-xl border border-violet-500/30
                bg-violet-500/5 py-3.5 text-sm font-semibold
                text-violet-600 transition-all hover:bg-violet-500
                hover:text-white dark:text-violet-300"
                        >
                            Choose Basic
                            <FiArrowRight size={16} />
                        </motion.button>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -6 }}
                        className="relative flex flex-col overflow-hidden
              rounded-3xl border border-violet-500/40
              bg-white p-7 shadow-2xl shadow-violet-500/10
              dark:bg-[#151326] sm:p-8"
                    >
                        {/* Popular Badge */}
                        <div className="absolute right-0 top-0 rounded-bl-2xl
              bg-gradient-to-r from-violet-600 to-indigo-600
              px-5 py-2 text-xs font-bold text-white">
                            <FiStar className="mr-1 inline" size={12} />
                            POPULAR
                        </div>

                        <div className="mb-6">
                            <div className="mb-4 flex h-12 w-12 items-center
                justify-center rounded-2xl bg-gradient-to-br
                from-violet-600 to-indigo-600 text-white
                shadow-lg shadow-violet-500/25">
                                <FiStar size={23} />
                            </div>

                            <h2 className="text-2xl font-bold
                text-slate-900 dark:text-white">
                                {plans.pro.name}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500
                dark:text-slate-400">
                                More credits for greater possibilities.
                            </p>
                        </div>

                        <div className="mb-7">
                            <div className="flex items-end gap-1">
                                <span className="text-4xl font-extrabold
                  tracking-tight text-slate-900
                  dark:text-white">
                                    {formatPrice(plans.pro.amount)}
                                </span>

                                <span className="mb-1 text-sm text-slate-500">
                                    / plan
                                </span>
                            </div>
                        </div>

                        <div className="mb-7 rounded-2xl border
              border-violet-500/20 bg-gradient-to-br
              from-violet-500/10 to-indigo-500/10 p-5">
                            <p className="text-xs font-medium uppercase
                tracking-wider text-violet-600
                dark:text-violet-300">
                                Included credits
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                                <FiZap className="text-violet-500" size={22} />

                                <span className="text-3xl font-bold
                  text-slate-900 dark:text-white">
                                    {plans.pro.credits.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-500
                dark:text-slate-400">
                                Credits included with this plan
                            </p>
                        </div>

                        <div className="mb-8 flex-1">
                            <p className="mb-4 text-sm font-semibold
                text-slate-800 dark:text-white">
                                Everything in Basic, plus
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "5,000 credits",
                                    "More credits for extended usage",
                                    "Access to basic features",
                                    "Secure payment",
                                    "Credit balance tracking",
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <span className="flex h-5 w-5 items-center
                      justify-center rounded-full bg-violet-500/10
                      text-violet-600 dark:text-violet-300">
                                            <FiCheck size={12} />
                                        </span>

                                        <span className="text-sm text-slate-600
                      dark:text-slate-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileFocus={{ scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            disabled={loading}
                            onClick={() => handleSelectPlan("Pro")}
                            className="flex w-full items-center justify-center
                gap-2 rounded-xl bg-gradient-to-r
                from-violet-600 to-indigo-600 py-3.5
                text-sm font-semibold text-white
                shadow-lg shadow-violet-600/25
                transition-all hover:from-violet-500
                hover:to-indigo-500"
                        >
                            Get Pro Plan
                            <FiArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Bottom Trust Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex flex-wrap items-center
            justify-center gap-x-8 gap-y-4"
                >
                    <div className="flex items-center gap-2 text-xs
            text-slate-500 dark:text-slate-400">
                        <FiShield className="text-emerald-500" size={16} />
                        Secure payments
                    </div>

                    <div className="flex items-center gap-2 text-xs
            text-slate-500 dark:text-slate-400">
                        <FiCreditCard className="text-violet-500" size={16} />
                        Easy checkout
                    </div>

                    <div className="flex items-center gap-2 text-xs
            text-slate-500 dark:text-slate-400">
                        <FiRefreshCw className="text-indigo-500" size={16} />
                        Flexible recharges
                    </div>
                </motion.div>

                <p className="mt-6 text-center text-xs
          text-slate-400 dark:text-slate-500">
                    Choose a plan that works best for you.
                </p>

            </div>
        </div>
    );
};

export default Plan;
