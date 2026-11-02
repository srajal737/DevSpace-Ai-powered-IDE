import React from 'react'
import { motion } from 'motion/react'
import { IoReload } from "react-icons/io5";
import Folder from './Folder';

const MobileFileExplorer = ({
    projectId,
    openFiles,
    editoropenTabs,
    seteditoropenTabs,
    editoractiveTab,
    seteditorActiveTab,
    tree,
    settree,
    reload,
     
}) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col w-full h-full min-w-0 min-h-0 overflow-hidden bg-zinc-900/95"
        >
         
            {/* Mobile Explorer Header */}
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">

                <span className="text-base font-semibold tracking-wider text-white">
                    EXPLORER
                </span>

                <motion.button
                    whileTap={{ scale: 0.9, rotate: 60 }}
                    transition={{ duration: 0.2 }}
                    onClick={reload}
                    className="p-2 text-xl text-gray-300 hover:text-white"
                >
                    <IoReload />
                </motion.button>
             
            </div>

            {/* File Tree */}
            <div className="flex-1 min-h-0 min-w-0 overflow-auto px-2 py-3">

                {tree.map((node) => (
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
                ))}
            </div>

           
        </motion.div>
    )
}

export default MobileFileExplorer