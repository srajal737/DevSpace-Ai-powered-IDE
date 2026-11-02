import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import {
  MdOutlineStarBorder,
  MdDeleteOutline,
} from "react-icons/md";

import {
  deleteproject,
  togglestar,
} from "../services/projectdetails";

import {
  removeproject,
  setcurrentProject,
  updatestar,
} from '../redux/projectslice'

import Confirmationmodal from "./Confirmationmodal";
import { useNavigate } from "react-router-dom";

const Projectcard = ({ project, index = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [starloading, setstarloading] = useState(false);
  const [deleteloading, setdeleteloading] = useState(false);
  const [deletemodaldata, setdeletemodaldata] = useState(null);

  const handletogglestart = async (e) => {
    e.stopPropagation();
    if (starloading || deleteloading) return;

    setstarloading(true);

    try {
      const result = await togglestar(project._id);

      // Update Redux only after the API succeeds
      dispatch(
        updatestar({
          id: project._id,
          starMark: result.starMark,
        })
      );

      toast.success("Favorite updated");
    } catch (error) {
      toast.error("Failed to update favorite");
    } finally {
      setstarloading(false);
    }
  };

  const handledelete = async () => {
    if (deleteloading || starloading) return;

    setdeleteloading(true);

    try {
      await deleteproject(project._id);

      // Remove project from Redux after successful deletion
      dispatch(removeproject(project._id));

      setdeletemodaldata(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setdeleteloading(false);
    }
  };
  const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
  return (
    <>
      <motion.div
      onClick={()=>{
        navigate(`/project/${project._id}`)
      }}
        variants={cardVariants}
        whileHover={{ y: -4 }}
        className="relative rounded-2xl border border-gray-200
          bg-white p-5 shadow-sm transition-all duration-300
          hover:border-blue-400 hover:shadow-lg
          dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1">
         
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            disabled={starloading || deleteloading}
            onClick={handletogglestart}
            aria-label="Toggle favorite"
            className={`rounded-lg p-1.5 transition-colors
              hover:bg-amber-50 hover:text-amber-500
              dark:hover:bg-amber-500/10
              ${
                project?.starMark
                  ? "text-amber-400"
                  : "text-zinc-400"
              }
              ${starloading ? "opacity-50" : ""}`}
          >
            {starloading ? (
              <span className="block h-6 w-6 animate-spin rounded-full
                border-2 border-amber-400 border-t-transparent" />
            ) : (
              <MdOutlineStarBorder
                size={25}
                className={project?.starMark ? "fill-amber-400" : ""}
              />
            )}
          </motion.button>

          {/* Delete */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            disabled={deleteloading || starloading}
            onClick={(e) =>{
              e.stopPropagation();
              setdeletemodaldata({
                text1: "Delete project?",
                text2: `Are you sure you want to delete "${project?.name}"?`,
                btn1: "Delete",
                btn2: "Cancel",
                btnhandle1: handledelete,
                btnhandle2: () => setdeletemodaldata(null),
              })}
            }
            aria-label="Delete project"
            className="rounded-lg p-1.5 text-zinc-400
              transition-colors hover:bg-red-50 hover:text-red-500
              dark:hover:bg-red-500/10"
          >
            {deleteloading ? (
              <span className="block h-6 w-6 animate-spin rounded-full
                border-2 border-red-400 border-t-transparent" />
            ) : (
              <MdDeleteOutline size={25} />
            )}
          </motion.button>
        </div>

        {/* Project icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center
          rounded-xl bg-blue-500/10 text-xl text-blue-500">
          📁
        </div>

        <h2 className="pr-16 text-lg font-semibold text-gray-900 dark:text-white">
          {project?.name || "Untitled project"}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm leading-6
          text-gray-500 dark:text-gray-400">
          {project?.description || "No description available."}
        </p>
      </motion.div>

      {deletemodaldata && (
        <Confirmationmodal
          data={deletemodaldata}
          setdata={setdeletemodaldata}
        />
      )}
    </>
  );
};

export default Projectcard;