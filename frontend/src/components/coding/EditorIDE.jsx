import { AnimatePresence, motion, setDragLock } from 'motion/react'
import React, { useEffect, useState } from 'react'
import FileIcon from '../../utils/FileIcon';
import { FaCheck, FaLightbulb, FaX } from 'react-icons/fa6';
import { updateFile } from '../../services/fileservices';
import Editor from '@monaco-editor/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';

const EditorIDE = ({ editoractiveTab, editoropenTabs, seteditorActiveTab, seteditoropenTabs }) => {

  const handlecut = (canceltab) => {
    const newopentabs = editoropenTabs.filter((tab) => tab._id != canceltab._id);
    seteditoropenTabs(newopentabs);
    if(editoractiveTab?._id == canceltab?._id){
      if(newopentabs.length){
        seteditorActiveTab(newopentabs[newopentabs.length-1]);
        setcode(newopentabs[newopentabs.length-1]?.content);
        return ;
      }
      else{
        seteditorActiveTab(null);
        setcode("");
      }
    }

  
  }
  
  const [saving, setsaving] = useState(false);
  const [saved, setsaved] = useState(false);
  const [editorthemedark,seteditorthemedark] = useState(true)
  const [code, setcode] = useState("");

 useEffect(()=>{
    setcode(editoractiveTab?.content)
  },[editoractiveTab])

  const save = async () => {
    if (!editoractiveTab) return;
    try {
      setsaving(true);
      const res = await updateFile({ name: editoractiveTab?.name, content: code, id: editoractiveTab?._id })
      seteditorActiveTab({ ...editoractiveTab, content: code })
      seteditoropenTabs((tabs) => tabs.map((tab) => tab._id == editoractiveTab._id ? { ...tab, content: code } : tab))

      setsaving(false);
      setsaved(true);
      setTimeout(() => {
        setsaved(false);
      }, 1500);
    } catch (e) {
      setsaving(false);
      console.log(e);
    }
  }
  return (
    <div className='flex flex-1 w-full  flex-col bg-black/90'>
      <div className='flex py-0.5 px-2  items-center overflow-x-auto border-b border-gray-700 bg-gray-500/50 h-11 shrink-0 
[&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar]:h-1
[&::-webkit-scrollbar-track]:bg-transparent
[&::-webkit-scrollbar-thumb]:rounded-full
hover:[&::-webkit-scrollbar-thumb]:bg-white/50
hover:[&::-webkit-scrollbar-thumb]:bg-white/20'>
        <AnimatePresence initial={false}>
          {
            editoropenTabs.map((tab) => {
              const isactive = tab?._id == editoractiveTab?._id;

              return (
                <motion.div
                key={tab?._id}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => seteditorActiveTab(tab)}
                  className={`relative  shrink-0 flex h-full cursor-pointer rounded-md  items-center whitespace-nowrap gap-2 group border-r px-3.5 transition-colors text-md py-1 ${isactive ? "text-white bg-black " : "text-gray-300 hover:bg-gray-400/50 hover:text-gray-100"}`}
                >

                  <FileIcon name={tab?.name} />
                  <p>{tab?.name}</p>
                  <FaX onClick={(e) => {
                    e.stopPropagation();
                    handlecut(tab)
                    }} className='hover:bg-gray-400/30 text-xl p-1 rounded-md ' />
                </motion.div>
              )
            })
          }
        </AnimatePresence>
      </div>

      <div className='h-11 shrink-0 gap-5 flex justify-center bg-gray-700/40 items-center border-b border-gray-500'>

      <div className='flex items-center gap-2 text-white'>
        <FileIcon name={editoractiveTab?.name || "No file"}/>
        <p>{editoractiveTab?.name}</p>
      </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={saving}
          onClick={save}
          className='flex items-center bg-gradient-to-b from-sky-500 to-sky-800 px-3 py-1 font-medium text-md disabled:opacity-50 w-fit  shadow shadow-blue-500 hover:text-blue-300 gap-2 rounded-lg'
        >
          {
            saving?(
              <>
              <span className='w-5 h-5 border border-x-transparent rounded-full border-black animate-spin'></span>
          <span>saving..</span>
           </> ):(
              saved?(
                <span className='flex items-center gap-2'>saved <FaCheck className='inline'/></span>
              ):(
                <span className='flex items-center gap-2'><FaSave/>save</span>
              )
            )
          }
        </motion.button>

        <div className='cursor-pointer bg-gray-500/40 py-1 px-2 rounded-md text-white flex gap-2 items-center ml-6' onClick={()=>seteditorthemedark((prev)=>!prev)}>
         <span>Editor theme  </span> 
         {
          editorthemedark ? <MdLightMode/>
         :<MdDarkMode/>
         }
        </div>
      </div>

      <div className='min-h-0 flex-1'>
      <Editor
      height="100%"
      theme={editorthemedark ?'vs-dark' :'vs'}
      language={editoractiveTab?.language || "plaintext"}
      value={code}
      onChange={(value)=>setcode(value || "")}
      options={{
        fontSize:18,
        automaticLayout:true,
        minimap:{enabled:false},
        wordWrap:"on",
        scrollBeyondLastLine:false,
        padding:{top:12},
        }
      }
      />
      </div>
    </div>
  )
}

export default EditorIDE