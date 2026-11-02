import React from 'react'
import { motion } from 'motion/react'
import { IoReload } from "react-icons/io5";
import { FaFolder } from 'react-icons/fa6';
import Folder from './Folder';

const FileExplorer = ({ projectId, openFiles, editoropenTabs,
  seteditoropenTabs,
  editoractiveTab,
  seteditorActiveTab, tree, settree, reload }) => {

  return (
    <motion.div
      initial={{ opacity: 0, x: -15, width: 0 }}
      animate={{ opacity: 1, x: 0, width: 290 }}
      exit={{ opacity: 0, x: -16, width: 0 }} //works due to animate presence which is used when leaving dom
      transition={{ duration: 0.2, ease: "easeOut" }}
      className='overflow-x-hidden overflow-y-auto hidden md:flex flex-col backdrop-blur-xl bg-zinc-900/90 rounded-md  border-r border-[#343D4D] z-0  '>

      <div className='flex h-10 text-center shrink-0 items-center justify-between border-b border-white/[0.06] px-3'>
        <span className='text-xl  font-semibold tracking-wider text-white'>EXPLORER</span>
        <motion.button whileHover={{ rotate: 60 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }} onClick={reload} className='text-xl font-bold text-white cursor-pointer'><IoReload /></motion.button>
      </div>

      <div className="w-full min-w-0 min-h-0 flex-1 overflow-auto px-1 py-2
[&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar]:h-1.5
[&::-webkit-scrollbar-track]:bg-transparent
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-white/10
hover:[&::-webkit-scrollbar-thumb]:bg-white/20">


        {
          tree.map((node) => (
            <Folder
              openFiles={openFiles}
              key={node._id}
              node={node}
              tree={tree}
              projectId={projectId}
              reload={reload}
              editoropenTabs={editoropenTabs}
  seteditoropenTabs={seteditoropenTabs}
  editoractiveTab={editoractiveTab}
  seteditorActiveTab={seteditorActiveTab}
            />
          ))
        }

      </div>

    </motion.div>
  )
}

export default FileExplorer