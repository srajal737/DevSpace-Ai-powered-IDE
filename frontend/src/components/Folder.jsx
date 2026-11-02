
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { VscChevronDownCompact } from 'react-icons/vsc';
import { getColor } from '../utils/Foldercolors';
import { FaFile, FaFolder, FaFolderPlus } from 'react-icons/fa';
import {
    createFolder,
    createFile,
    deleteFile,
    updateFile
} from '../services/fileservices';
import { FiFilePlus } from 'react-icons/fi';
import {
    FaFileCirclePlus,
    FaPencil,
    FaTrash
} from 'react-icons/fa6';
import { createPortal } from 'react-dom';
import Loader from './Loader';
import FileIcon from '../utils/FileIcon';

const Folder = ({ node, tree, openFiles, projectId, reload, editoropenTabs,
    seteditoropenTabs,
    editoractiveTab,
    seteditorActiveTab, }) => {
    const [open, setopen] = useState(true);
    const foldercolor = getColor(node.name);

    const [foldername, setfoldername] = useState('');
    const [filename, setfilename] = useState('');
    const [creatingfolderIn, setcreatingfolderIn] = useState(null);
    const [creatingfileIn, setcreatingfileIn] = useState(null);
    const [renaming, setrenaming] = useState(false);
    const [menu, setmenu] = useState(null);

    const [deleteloading, setdeleteloading] = useState(false);
    const [updateloading, setupdateloading] = useState(false);
    const [filecreatingloading, setfilecreatingloading] = useState(false);

    const [foldercreatingloading, setfoldercreatingloading] = useState(false);

    const loading =
        deleteloading || updateloading || filecreatingloading || foldercreatingloading;

    const handleCreateFolder = async () => {
        const name = foldername.trim();

        if (!name || loading) return;

        try {
            setfoldercreatingloading(true);

            await createFolder({
                projectId,
                name,
                parentId: node._id
            });

            setfoldername('');
            setcreatingfolderIn(null);
            setmenu(null);

            await reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to create folder'
            );
        } finally {
            setfoldercreatingloading(false);
        }
    };

    const handleCreateFile = async () => {
        const name = filename.trim();

        if (!name || loading) return;

        try {
            setfilecreatingloading(true);

            await createFile({
                projectId,
                name,
                parentId: node._id
            });

            setfilename('');
            setcreatingfileIn(null);
            setmenu(null);

            await reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to create file'
            );
        } finally {
            setfilecreatingloading(false);
        }
    };

    const handlenewfolder = (folder) => {
        if (loading) return;

        setfoldername('');
        setfilename('');
        setcreatingfolderIn(folder._id);
        setcreatingfileIn(null);
        setrenaming(false);
    };

    const handlenewfile = (folder) => {
        if (loading) return;

        setfilename('');
        setfoldername('');
        setcreatingfileIn(folder._id);
        setcreatingfolderIn(null);
        setrenaming(false);
    };



    //for editor tabs syn 
    const getAllFileIds = (folder) => {
  let ids = [];

  const traverse = (node) => {
    if (node.type === "file") {
      ids.push(node._id);
    }

    node.children?.forEach(traverse);
  };

  traverse(folder);
  return ids;
};
    const handledelete = async () => {
        if (loading) return;

        if (!window.confirm(`Delete "${node.name}"?`)) return;

        try {
            setdeleteloading(true);

            const deletedfileIds = node.type == 'file'?[node._id] : getAllFileIds(node);
            await deleteFile(node._id);
            //updataing the tabs
            if(node.type == 'folder'){
                seteditoropenTabs((prev)=>prev.filter((tab)=>!deletedfileIds.includes(tab._id)));

                if(editoractiveTab && deletedfileIds.includes(editoractiveTab._id)){
                    seteditorActiveTab(null);
                }
            }
            if(node.type === 'file'){
                seteditoropenTabs((prev)=>prev.filter((tab)=>tab._id !==node._id))
                if(editoractiveTab?._id === node._id){
                    seteditorActiveTab(null);
                }
            }
            setmenu(null);
            await reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to delete'
            );
        } finally {
            setdeleteloading(false);
        }
    };

    const handleupdate = async () => {
        const name = filename.trim();

        if (loading) return;

        if (!name) {
            alert('Name cannot be empty');
            return;
        }

        if (name === node.name) {
            setrenaming(false);
            setfilename('');
            setmenu(null);
            return;
        }

        try {
            setupdateloading(true);

            await updateFile({
                id: node._id,
                name
            });

            //updating int editor tabs
            if(node.type == 'file'){
               seteditoropenTabs((prev)=>prev.map((tab)=>tab._id == node._id ?{...tab,name} :tab))
              
               seteditorActiveTab((prev)=>prev?._id == node._id ? {...prev, name} : prev)
           
            }
            setrenaming(false);
            setfilename('');
            setmenu(null);

            await reload();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to rename'
            );
        } finally {
            setupdateloading(false);
        }
    };

    if (node?.type === 'file') {
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();

                    if (!loading && !renaming) {
                        setopen(!open);
                    }
                    openFiles(node);
                }}
                className="relative"
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!loading) {
                        setmenu({
                            x: e.clientX,
                            y: e.clientY
                        });
                    }
                }}
            >
                <div className="group flex w-max min-w-full items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors cursor-pointer duration-100">
                    <div className="flex items-center gap-1.5">
                        <div className="text-gray-200 gap-2 flex items-center">
                            <FileIcon name={node?.name} />
                            <p>{node.name}</p>
                        </div>
                    </div>
                </div>

                {menu && createPortal(
                    <AnimatePresence>
                        <>
                            <motion.div
                                className="fixed inset-0 z-40"
                                onClick={() => {
                                    if (!loading) setmenu(null);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: -6
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                    y: -6
                                }}
                                transition={{
                                    duration: 0.15,
                                    ease: 'easeOut'
                                }}
                                className="fixed z-50 w-50 rounded-xl border border-white/20 bg-black py-2 shadow-sm shadow-olive-800 backdrop-blur-xl overflow-hidden"
                                style={{
                                    left: Math.min(
                                        menu.x,
                                        window.innerWidth - 200
                                    ),
                                    top: Math.min(
                                        menu.y,
                                        window.innerHeight - 100
                                    )
                                }}
                            >
                                <div className="border-b border-gray-800" />

                                <button
                                    type="button"
                                    disabled={loading}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                    onClick={() => {
                                        if (loading) return;

                                        setfilename(node.name);
                                        setrenaming(true);
                                        setcreatingfileIn(null);
                                        setcreatingfolderIn(null);
                                        setmenu(null);
                                    }}
                                >
                                    {updateloading ? (
                                        <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                    ) : (
                                        <FaPencil />
                                    )}
                                    Rename
                                </button>

                                <button
                                    type="button"
                                    disabled={loading}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                    onClick={handledelete}
                                >
                                    {deleteloading ? (
                                        <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                    ) : (
                                        <FaTrash />
                                    )}
                                    Delete
                                </button>
                            </motion.div>
                        </>
                    </AnimatePresence>,
                    document.body
                )}

                {renaming && (
                    <form
                        className="py-1 pl-1"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleupdate();
                        }}
                    >
                        <motion.input
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            autoFocus
                            disabled={loading}
                            value={filename}
                            placeholder="File name, press Esc to cancel"
                            onChange={(e) => setfilename(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape' && !loading) {
                                    setfilename('');
                                    setrenaming(false);
                                }
                            }}
                            className="w-full text-white placeholder-zinc-400 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-400/50 rounded-md border border-white/10 bg-white/4 px-2.4 py-1.5"
                        />

                        <button
                            type="submit"
                            disabled={loading || !filename.trim()}
                            className="mt-1 cursor-pointer flex items-center gap-1 text-xs text-sky-400 disabled:opacity-50"
                        >
                            {updateloading ? <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" /> : 'Save'}
                        </button>
                    </form>
                )}

                {creatingfileIn === node._id && (
                    <form
                        className="py-1 pl-1"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateFile();
                        }}
                    >
                        <motion.input
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            autoFocus
                            disabled={loading}
                            value={filename}
                            placeholder="File name, press Esc to cancel"
                            onChange={(e) => setfilename(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape' && !loading) {
                                    setfilename('');
                                    setcreatingfileIn(null);
                                }
                            }}
                            className="w-full text-white placeholder-zinc-400 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-400/50 rounded-md border border-white/10 bg-white/4 px-2.4 py-1.5"
                        />

                        <button
                            type="submit"
                            disabled={loading || !filename.trim()}
                            className="mt-1 cursor-pointer flex items-center gap-1 text-xs text-sky-400 disabled:opacity-50"
                        >
                            {filecreatingloading ? (
                                <span className="block h-6 cursor-pointer w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                            ) : (
                                'Create file'
                            )}
                        </button>
                    </form>
                )}
            </div>
        );
    }


    return (
        <div
            className="relative"
            onClick={(e) => {
                e.stopPropagation();

                if (
                    !loading &&
                    creatingfolderIn !== node._id &&
                    creatingfileIn !== node._id &&
                    !renaming
                ) {
                    setopen(!open);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!loading) {
                    setmenu({
                        x: e.clientX,
                        y: e.clientY
                    });
                }
            }}
        >
            <div className="group flex w-max min-w-full items-center justify-between gap-2 rounded-lg px-2 py-2 hover:bg-white/5 transition-colors cursor-pointer duration-100">
                <div className="flex items-center gap-1.5">
                    <motion.div
                        animate={{ rotate: open ? 0 : -90 }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut'
                        }}
                        className="shrink-0"
                    >
                        <VscChevronDownCompact className="text-lg font-bold text-gray-300" />
                    </motion.div>

                    <div className="text-gray-200 gap-2 flex items-center">
                        <FaFolder
                            className={`shrink-0 text-lg ${foldercolor}`}
                        />
                        <p>{node.name}</p>
                    </div>
                </div>

                <div className="hidden items-center gap-1 group-hover:flex">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        title="New File"
                        className="rounded-md p-1 text-gray-300 hover:text-white hover:bg-gray-400/20 disabled:opacity-50"
                        onClick={(e) => {
                            e.stopPropagation();

                            handlenewfile(node);
                            setopen(true);
                        }}
                    >
                        {filecreatingloading ? (
                            <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                            <FaFileCirclePlus size={14} />
                        )}
                    </motion.button>

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                        title="New Folder"
                        className="rounded-md p-1 text-gray-300 hover:text-white hover:bg-gray-400/20 disabled:opacity-50"
                        onClick={(e) => {
                            e.stopPropagation();

                            handlenewfolder(node);
                            setopen(true);
                        }}
                    >
                        {foldercreatingloading ? (
                            <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                            <FaFolderPlus size={14} />
                        )}
                    </motion.button>
                </div>
            </div>

            {menu && createPortal(
                <AnimatePresence>
                    <>
                        <motion.div
                            className="fixed inset-0 z-40"
                            onClick={() => {
                                if (!loading) setmenu(null);
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: -6
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.96,
                                y: -6
                            }}
                            transition={{
                                duration: 0.15,
                                ease: 'easeOut'
                            }}
                            className="fixed z-50 w-50 rounded-xl border border-white/20 bg-black py-2 shadow-sm shadow-olive-800 backdrop-blur-xl overflow-hidden"
                            style={{
                                left: Math.min(
                                    menu.x,
                                    window.innerWidth - 200
                                ),
                                top: Math.min(
                                    menu.y,
                                    window.innerHeight - 175
                                )
                            }}
                        >
                            <button
                                type="button"
                                disabled={loading}
                                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                onClick={() => {
                                    setmenu(null);
                                    handlenewfile(node);
                                    setopen(true);
                                }}
                            >
                                {filecreatingloading ? (
                                    <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                ) : (
                                    <FaFileCirclePlus />
                                )}
                                New File
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                onClick={() => {
                                    setmenu(null);
                                    handlenewfolder(node);
                                    setopen(true);
                                }}
                            >
                                {foldercreatingloading ? (
                                    <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                ) : (
                                    <FaFolderPlus />
                                )}
                                New Folder
                            </button>

                            <div className="my-1 border-b border-gray-800" />

                            <button
                                type="button"
                                disabled={loading}
                                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                onClick={() => {
                                    if (loading) return;

                                    setfilename(node.name);
                                    setrenaming(true);
                                    setcreatingfileIn(null);
                                    setcreatingfolderIn(null);
                                    setmenu(null);
                                }}
                            >
                                {updateloading ? (
                                    <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                ) : (
                                    <FaPencil />
                                )}
                                Rename
                            </button>

                            <button
                                type="button"
                                disabled={loading}
                                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-500/20 w-[calc(100%-8px)] mx-1 px-2 py-1 text-sm cursor-pointer disabled:opacity-50"
                                onClick={handledelete}
                            >
                                {deleteloading ? (
                                    <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                                ) : (
                                    <FaTrash />
                                )}
                                Delete
                            </button>
                        </motion.div>
                    </>
                </AnimatePresence>,
                document.body
            )}

            {creatingfolderIn === node._id && (
                <form
                    className="py-1 pl-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateFolder();
                    }}
                >
                    <motion.input
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        autoFocus
                        disabled={loading}
                        value={foldername}
                        placeholder="Folder name, press Esc to cancel"
                        onChange={(e) => setfoldername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape' && !loading) {
                                setfoldername('');
                                setcreatingfolderIn(null);
                            }
                        }}
                        className="w-full text-white placeholder-zinc-400 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-400/50 rounded-md border border-white/10 bg-white/4 px-2.4 py-1.5"
                    />

                    <button
                        type="submit"
                        disabled={loading || !foldername.trim()}
                        className="mt-1 flex items-center cursor-pointer gap-1 text-xs text-sky-400 disabled:opacity-50"
                    >
                        {foldercreatingloading ? (
                            <span className="block  h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                            'Create folder'
                        )}
                    </button>
                </form>
            )}

            {creatingfileIn === node._id && (
                <form
                    className="py-1 pl-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateFile();
                    }}
                >
                    <motion.input
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        autoFocus
                        disabled={loading}
                        value={filename}
                        placeholder="File name, press Esc to cancel"
                        onChange={(e) => setfilename(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape' && !loading) {
                                setfilename('');
                                setcreatingfileIn(null);
                            }
                        }}
                        className="w-full text-white placeholder-zinc-400 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-400/50 rounded-md border border-white/10 bg-white/4 px-2.4 py-1.5"
                    />

                    <button
                        type="submit"
                        disabled={loading || !filename.trim()}
                        className="mt-1 flex items-center gap-1 cursor-pointer text-xs text-sky-400 disabled:opacity-50"
                    >
                        {filecreatingloading ? (
                            <span className="block  h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                            'Create file'
                        )}
                    </button>
                </form>
            )}

            {renaming && (
                <form
                    className="py-1 pl-1"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleupdate();
                    }}
                >
                    <motion.input
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        autoFocus
                        disabled={loading}
                        value={filename}
                        placeholder="Folder name, press Esc to cancel"
                        onChange={(e) => setfilename(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape' && !loading) {
                                setfilename('');
                                setrenaming(false);
                            }
                        }}
                        className="w-full text-white placeholder-zinc-400 outline-none transition-all focus:border-sky-500/50 focus:ring-2 focus:ring-sky-400/50 rounded-md border border-white/10 bg-white/4 px-2.4 py-1.5"
                    />

                    <button
                        type="submit"
                        disabled={loading || !filename.trim()}
                        className="mt-1 flex items-center gap-1 cursor-pointer text-xs text-sky-400 disabled:opacity-50"
                    >
                        {updateloading ? (
                            <span className="block h-6 w-6 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                            'Save'
                        )}
                    </button>
                </form>
            )}

            {open && (
                <AnimatePresence initial={false}>
                    <motion.div
                        key={`children-${node._id}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            duration: 0.15,
                            ease: 'easeOut'
                        }}
                        className="ml-5 pl-1 overflow-hidden"
                    >
                        {(node.children || []).map((child) => (
                            <Folder
                                key={child._id}
                                projectId={projectId}
                                tree={tree}
                                node={child}
                                reload={reload}
                                openFiles={openFiles}
                                editoropenTabs={editoropenTabs}
                                seteditoropenTabs={seteditoropenTabs}
                                editoractiveTab={editoractiveTab}
                                seteditorActiveTab={seteditorActiveTab}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default Folder;