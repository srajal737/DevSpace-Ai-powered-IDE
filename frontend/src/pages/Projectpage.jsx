import React, { useEffect, useState } from 'react'
import TopbarIDE from '../components/TopbarIDE'
import Sideacitivitybar from '../components/Sideacitivitybar'
import { VscFiles, VscSparkle, VscTerminal } from 'react-icons/vsc'
import { AnimatePresence, motion } from 'motion/react'
import FileExplorer from '../components/FileExplorer'
import { useNavigate, useParams } from 'react-router-dom'
import { getprojectbyid } from '../services/projectdetails'
import { setcurrentProject } from '../redux/projectslice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { createRootFolder, getFileTree } from '../services/fileservices'
import { MdOutlineFullscreenExit } from "react-icons/md";

import { MdOutlineFullscreen } from "react-icons/md";
import { FaCode } from 'react-icons/fa'
import { FaEye, FaFile } from 'react-icons/fa6'
import Preview from '../components/coding/Preview'
import EditorIDE from '../components/coding/EditorIDE'
import Terminal from '../components/coding/Terminal'
import Aichat from '../components/coding/Aichat'
import { useRef } from 'react'
import MobileFileExplorer from '../components/MobileFileExplorer'
const Projectpage = () => {
  const [mobileactiveTab, setmobileactiveTab] = useState("")
  const [activetabs, setactivetab] = useState(['explorer']);
  const [preview, setPreview] = useState(false);
  const tabs = [
    { id: 'explorer', label: 'Explorer', icon: VscFiles },
    { id: 'terminal', label: 'Terminal', icon: VscTerminal },
    { id: 'ai', label: 'AI Assistant', icon: VscSparkle },
  ];
  const { currentProject } = useSelector(state => state.project);
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tree, settree] = useState([]);
  const [ispreviewfullscreen, setispreviewfullscreen] = useState(false);
  const [editoropenTabs, seteditoropenTabs] = useState([]);
  const [editoractiveTab, seteditorActiveTab] = useState(null);

  const openFiles = (file) => {
    const isfound = editoropenTabs.find(tab => tab._id == file._id);
    if (!isfound) {
      seteditoropenTabs(prev => [...prev, file]);
    }
    seteditorActiveTab(file);
    setPreview(false);
    setmobileactiveTab('editor');
  }
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setloading(true);
        const result = await getprojectbyid(id);
        dispatch(setcurrentProject(result));
        const createRoot = await createRootFolder({
          projectId: id,
          projectName: result.name,
        });
        const treeResult = await getFileTree(id);

        settree(treeResult);

      }
      catch (e) {
        navigate("/dashboard/project", { replace: true });
      }
      setloading(false);
    }

    if (id) {
      fetchProject();
    }
  }, [id])

  const reloadtree = async () => {
    try {
      const treeResult = await getFileTree(id);
      settree(treeResult);

    } catch (error) {
      console.error("Failed to reload file tree:", error);
    }
  };


  return (
    <div className='h-screen flex bg-[#0D1117]  relative flex-col overflow-hidden'>
      <div className='h-150 w-150 rounded-full absolute left-1/2 -translate-x-1/2 -top-1/2 bg-sky-500/30 blur-[400px] pointer-events-none' />
      {
        loading ? <div className='flex-1 flex justify-center text-white items-center'> <Loader /> </div> : <>
          <TopbarIDE preview={preview} setPreview={setPreview} />
          
          <div className='flex flex-1 min-h-0  overflow-hidden'>
            <div className="relative z-50 shrink-0 hidden md:block">
              <Sideacitivitybar
                activetabs={activetabs}
                setactivetab={setactivetab}
                tabs={tabs}
              />
            </div>

            {
              <div className="lg:hidden fixed bottom-0 left-0 z-[100] w-full border-t border-gray-700 bg-black">
                <div className="flex items-center justify-around px-2 py-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setmobileactiveTab(tab.id)}
                        className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 ${mobileactiveTab == tab.id
                          ? 'text-sky-400'
                          : 'text-gray-400 hover:text-white'
                          }`}
                      >
                        <Icon size={21} />
                        <span className="text-[11px]">{tab.label}</span>
                      </button>
                    );
                  })}
                </div></div>
            }
            
              {mobileactiveTab === "ai" && (
  <div className=" pb-20  md:hidden min-w-0 min-h-0 w-full h-full overflow-hidden bg-black">
    <Aichat projectId={id} reloadtree={reloadtree} />
  </div>
)}

    {mobileactiveTab == "explorer" && (
  <div className=" pb-20 z-10 md:hidden min-w-0 min-h-0 w-full h-full overflow-hidden bg-black">
    <MobileFileExplorer editoropenTabs={editoropenTabs}
                  seteditoropenTabs={seteditoropenTabs}
                  editoractiveTab={editoractiveTab}
                  seteditorActiveTab={seteditorActiveTab} openFiles={openFiles} projectId={id} reload={reloadtree} tree={tree} settree={settree}   />
  </div>
)}
    {mobileactiveTab == "terminal" && (
  <div className=" pb-20 z-10 md:hidden min-w-0 min-h-0 w-full h-full overflow-hidden bg-black">
   <Terminal
                      activetabs={activetabs}
                      setactivetab={setactivetab}
                      projectId={id}

                    />
  </div>
)}
    {mobileactiveTab == "editor" && (
  <div className=" pb-20 z-10 md:hidden min-w-0 min-h-0 w-full h-full overflow-hidden bg-black">
   { editoropenTabs?.length > 0 &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preview ? "preview" : "editor"}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.985 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                    }}
                    className="flex min-h-0 h-full w-full flex-1 overflow-hidden md:hidden"
                  >
                    {preview ? (
                      <Preview tree={tree} />
                    ) : (
                      <EditorIDE
                        editoractiveTab={editoractiveTab}
                        editoropenTabs={editoropenTabs}
                        seteditorActiveTab={seteditorActiveTab}
                        seteditoropenTabs={seteditoropenTabs}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>}
  </div>
)}
            
            <AnimatePresence initial={false} >
              {
                activetabs.includes('explorer') && <FileExplorer  editoropenTabs={editoropenTabs}
                  seteditoropenTabs={seteditoropenTabs}
                  editoractiveTab={editoractiveTab}
                  seteditorActiveTab={seteditorActiveTab} openFiles={openFiles} projectId={id} reload={reloadtree} tree={tree} settree={settree} />
              }
            </AnimatePresence>


            <div className='relative flex w-full min-w-0 flex-1 flex-col overflow-hidden border-x border-gray-600 '>


              {editoropenTabs.length === 0 && (
                <div className="md:flex flex-1 items-center justify-center text-center hidden">
                  <div className="rounded-xl border border-gray-700 bg-[#1e1e1e] px-8 py-6 shadow-lg">
                    <p className='text-center'><FaFile className='text-white font-bold text-2xl inline' /></p>
                    <p className="text-lg font-medium text-gray-200">
                      No file selected
                    </p>
                    <p className="mt-1 text-md text-gray-400">
                      Select a file to view its code or preview.
                    </p>
                  </div>
                </div>
              )}

              <div className='absolute right-2 top-2 z-40 flex items-center gap-1.5'>
                {
                  preview && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} type='button' onClick={() => setispreviewfullscreen((v) => !v)} title={ispreviewfullscreen ? "Exit Fullscreen" : "Fullscreen Preview"} className='flex items-center justify-center rounded-lg border border-white/10 bg-gray-950/90  text-gray-400 shadow-lg shadow-black/40 backdrop:blur hover:text-white p-2 text-2xl font-bold cursor-pointer'>

                      {
                        ispreviewfullscreen ? <MdOutlineFullscreenExit /> : <MdOutlineFullscreen />
                      }
                    </motion.div>
                  )
                }

                <div className='flex items-center shadow-lg shadow-black/40 rounded-lg border border-white/10 bg-zinc-900 p-1  backdrop-blue-xl  gap-1'>

                  <button onClick={() => {
                    setPreview(false);
                    setispreviewfullscreen(false);

                  }} className={`flex relative items-center px-2 py-1 text-lg font-semibold transition-colors duration-100  gap-1.5 rounded-md ${preview ? "text-gray-400" : "text-white hover:text-gray-300 bg-gradient-to-b from-gray-700 to-gray-900 "}`}>


                    <div className='flex items-center hover:scale-102 transition-all duration-100 active:scale-98'>
                      <FaCode /> Editor
                    </div>
                  </button>


                  <button onClick={() => setPreview(true)} className={`flex relative items-center px-2 py-1 text-lg font-semibold transition-colors duration-100  gap-1.5 rounded-md ${preview ? "text-white bg-gradient-to-b from-gray-700 to-gray-900" : "text-gray-400 hover:text-gray-300"}`}>



                    <div className='flex items-center hover:scale-102 transition-all duration-100 active:scale-98'>
                      <FaEye /> Preview
                    </div>
                  </button>

                </div>
              </div>

              {
                editoropenTabs?.length > 0 &&
                <AnimatePresence mode="wait">
                  <motion.div
                    key={preview ? "preview" : "editor"}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.985 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                    }}
                    className="md:flex min-h-0 flex-1 overflow-hidden hidden"
                  >
                    {preview ? (
                      <Preview tree={tree} />
                    ) : (
                      <EditorIDE
                        editoractiveTab={editoractiveTab}
                        editoropenTabs={editoropenTabs}
                        seteditorActiveTab={seteditorActiveTab}
                        seteditoropenTabs={seteditoropenTabs}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

              }


              <AnimatePresence>
                {preview && ispreviewfullscreen && editoropenTabs?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className='fixed  inset-0 z-[100] bg-white'
                  >
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} type='button' onClick={() => setispreviewfullscreen((v) => !v)} title="Exit Fullscreen" className=' absolute right-0 top-2  rounded-lg border border-white/10 bg-white/20  text-gray-400 shadow-lg shadow-black/40 backdrop:blur hover:text-white p-2 text-2xl font-bold cursor-pointer'>

                      {
                        <MdOutlineFullscreenExit />
                      }
                    </motion.div>
                    <Preview tree={tree} />
                  </motion.div>
                )}
              </AnimatePresence>



              <AnimatePresence>
                {
                  activetabs.includes('terminal') &&
                  <div className='max-h-[40vh]'>
                    <Terminal
                      activetabs={activetabs}
                      setactivetab={setactivetab}
                      projectId={id}

                    />
                  </div>
                }
              </AnimatePresence>


            </div>
       
            <AnimatePresence initial={false}>
              {activetabs.includes('ai') && (
                <motion.div
                  key="ai-chat"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 350, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    width: { duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.2 },
                  }}
                  className="h-full shrink-0 overflow-hidden"
                >
                  <Aichat projectId={id} reloadtree={reloadtree} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
        </>
      }

          
    </div>
  )
}

export default Projectpage