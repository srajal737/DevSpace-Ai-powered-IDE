
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import {
  FaEye,
  FaEyeSlash,
  FaFolder,
  FaChevronRight,
  FaCode,
  FaWandMagicSparkles,
} from 'react-icons/fa6';

const TopbarIDE = ({preview,setPreview}) => {
  const { currentProject } = useSelector((state) => state.project);
  

  const projectName = currentProject?.name || 'Untitled Project';

  const displayName =
    projectName.length > 30
      ? `${projectName.slice(0, 27)}...`
      : projectName;

  return (
    <motion.div
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative z-30 flex h-15 items-center justify-between border-b border-[#30363D] bg-black px-4 sm:px-6"
    >
     


      <div className="flex  items-center gap-5">


        <motion.div
          className="flex shrink-0 items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
       
          <div className="leading-tight">
            <h1 className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
              Devspace
            </h1>

            <p className="mt-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B949E]">
              <FaWandMagicSparkles className="text-[10px] text-violet-400" />
              AI Powered IDE
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden h-10 w-px bg-[#30363D] sm:block" />

       
        <div
          
          className="flex  items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.035)]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#30363D] bg-[#0D1117]">
            <FaFolder className="text-sm text-blue-400" />
          </div>

          <div className="min-w-0">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-[#8B949E]">
              Current project
            </p>

            <div className="flex min-w-0 items-center gap-1.5">
              <span
                title={projectName}
                className="max-w-[120px] truncate text-sm font-semibold text-[#E6EDF3] sm:max-w-[220px]"
              >
                {displayName}
              </span>

            </div>
          </div>
        </div>
      </div>

      
      <div className="ml-2 flex shrink-0 items-center gap-3 ">

     

     
        <motion.button
          type="button"
          onClick={() => setPreview((prev) => !prev)}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.94 }}
          title={preview ? 'Close preview' : 'Show preview'}
         
          className={`relative flex h-9 items-center gap-2 overflow-hidden rounded-lg border px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 ${
            preview
              ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
              : 'border-[#30363D] bg-[#0D1117] text-[#C9D1D9] hover:border-[#484F58] hover:bg-[#21262D] hover:text-white'
          }`}
        >
          
            <span
          
              className="flex items-center"
            >
              {preview ? (
                <FaEyeSlash className="text-sm" />
              ) : (
                <FaEye className="text-sm" />
              )}
            </span>
 

          <span className="hidden sm:inline">
            {preview ? 'Hide Preview' : 'Preview'}
          </span>
        </motion.button>

        <motion.div>
            
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopbarIDE;