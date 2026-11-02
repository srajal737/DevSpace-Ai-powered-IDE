
import React from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/login";
import {
  FiFolder,
  FiStar,
  FiCreditCard,
  FiLogOut,
  FiLayers,
  FiZap,
  FiChevronRight,
  FiClock,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ onLogout }) => {
  const {userData} = useSelector(state=>state.user)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandle = async () => {
    try {
      await logout(dispatch);
    } catch (e) {
      console.log("something went wrong while logout");
    }
  }
  const items = [
    {
      name: "Projects",
      icon: FiFolder,
      path: "/dashboard/project",
    },
    {
      name: "Starred Projects",
      icon: FiStar,
      path: "/dashboard/starred",
    },
    {
      name: "Plan Details",
      icon: FiCreditCard,
      path: "/dashboard/plan", // Change if your route differs
    },
     {
      name: "Payment History",
      icon: FiClock,
      path: "/dashboard/history",
    },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-[89vh] w-68 flex-col rounded-r-2xl
        border-r border-slate-300/70 bg-white/60 px-3 py-5
        shadow-lg shadow-slate-900/5 backdrop-blur-xl
        transition-colors duration-300
        dark:border-white/10 dark:bg-white/[0.06]"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mb-10 flex items-center gap-3 px-3"
      >
        <div className="rounded-xl bg-blue-600 p-2.5 text-white
          shadow-lg shadow-violet-600/25">
          <FiLayers size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight
            text-slate-800 dark:text-white">
            ProjectHub
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your workspace
          </p>
        </div>
      </motion.div>

      <p className="mb-3 px-3 text-[11px] font-semibold
        uppercase tracking-[0.16em] text-slate-400">
        Workspace
      </p>

      <div className="space-y-1.5">
        {items.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <motion.button
              key={name}
              type="button"
              onClick={() => navigate(path)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex w-full items-center gap-3
                overflow-hidden rounded-xl px-3.5 py-3
                text-sm font-medium transition-colors
                ${isActive
                  ? "text-white"
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
                }`}
            >
              {/* Animated active background */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute inset-0 rounded-xl
                    bg-gradient-to-r from-violet-600 to-indigo-600
                    shadow-lg shadow-violet-600/20"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}


              <motion.span
                className="relative z-10 flex"
                animate={{
                  scale: isActive ? 1.08 : 1,
                  rotate:
                    isActive && name === "Starred Projects"
                      ? -8
                      : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
              </motion.span>

              <span className="relative z-10 flex-1 text-left">
                {name}
              </span>

              {/* Active arrow */}
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10"
                >
                  <FiChevronRight size={16} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="my-4 h-px bg-gray-500 dark:bg-gray-700"></div>
      {/* Bottom section */}
      <div className="mt-auto space-y-4">

        {/* Plan card */}

        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-violet-400/20
    bg-gradient-to-br from-violet-500/10
    via-indigo-500/5 to-transparent p-4
    dark:border-white/10 dark:from-violet-500/15"
        >
          <div className="mb-4 flex items-center gap-2.5">
            <div
              className="rounded-lg bg-violet-500/15 p-2.5
        text-violet-600 dark:text-violet-300"
            >
              <FiZap size={19} />
            </div>

            <div>
              <h3
                className="text-sm font-semibold
          text-slate-800 dark:text-white"
              >
                Plan Details
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current subscription
              </p>
            </div>
          </div>

          {/* Available Credits */}
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Available Credits
              </p>

              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-3xl font-bold  ${userData?.credits<=0? "text-red-500":" text-slate-800 dark:text-white"}`}>
               {
                userData?.credits
               }
                </span>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  credits remaining
                </span>
              </div>
            </div>

            <div
              className="rounded-full flex items-center justify-center bg-violet-500/10 px-3 py-1.5
        text-xs font-semibold text-violet-600
        dark:text-violet-300"
            >
              <FiZap className="mr-1 inline" size={12} />
              Available
            </div>
          </div>

          {/* Balance Indicator */}
          <div className="h-1.5 overflow-hidden rounded-full
    bg-slate-200 dark:bg-white/10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full rounded-full
        bg-gradient-to-r from-violet-600 to-indigo-500"
            />
          </div>

          {/* Manage Plan Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard/plan")}
            className="mt-4 flex w-full items-center justify-center
      gap-2 rounded-lg bg-violet-600 py-2.5 text-xs
      font-semibold text-white shadow-md
      shadow-violet-600/20 transition-colors
      hover:bg-violet-500"
          >
            Manage Plan
            <FiChevronRight size={14} />
          </motion.button>
        </motion.div>


        {/* Logout */}
        <motion.button
          type="button"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          onClick={logouthandle}
          className="flex w-full items-center gap-3 rounded-xl
            px-3.5 py-3 text-sm font-medium text-red-500
            transition-colors hover:bg-red-500/10
            dark:text-red-400"
        >
          <FiLogOut size={19} />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;