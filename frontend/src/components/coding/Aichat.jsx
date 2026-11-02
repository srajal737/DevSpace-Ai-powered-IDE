import React, { useState } from 'react'
import { FaHandSparkles, FaRobot, FaUser } from 'react-icons/fa';

import {
  FiFolderPlus,
  FiFilePlus,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";

const icondata = {
  folder_created: {
    icon: FiFolderPlus,
    label: "Folder Created",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },

  file_creation_done: {
    icon: FiFilePlus,
    label: "File Created",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },

  file_updation_done: {
    icon: FiFileText,
    label: "File Updated",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },

  file_deletion_done: {
    icon: FiTrash2,
    label: "File Deleted",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
};


const ToolDetails = ({ toolType, detail }) => {
  const things = icondata[toolType];
  if (!things) return null;
  const Icon = things.icon
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-gray-200/70 bg-white/80 p-3 shadow-sm max-w-[50%] my-3 text-black">
      <div className={`rounded-lg p-2 ${things.bgColor}`}>
        <Icon size={17} className={things.color} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium ">
          {things.label}
        </p>
        {detail && (
          <p className="mt-0.5 truncate text-xs text-gray-900">
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  )
}




import { IoSend, IoSparkles } from 'react-icons/io5'
import { chatapi } from '../../services/Ai';
import { AnimatePresence, motion } from 'motion/react'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Aichat = ({ projectId ,reloadtree }) => {
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector(state=>state.user);
  const onEvents = async (toolType, data) => {
    if (toolType == 'folder_created') {
      setmessages((prev) => [...prev, { role: "tool", toolType: "folder_created", detail: data?.file?.name }])
      reloadtree();
    }
    if (toolType == 'file_creation_done') {
      setmessages((prev) => [...prev, { role: "tool", toolType: "file_creation_done", detail: data?.file?.name }])
      reloadtree();
    }
    if (toolType == 'file_updation_done') {
      setmessages((prev) => [...prev, { role: "tool", toolType: "file_updation_done", detail: data?.file?.name }])
      reloadtree();
    }
    if (toolType == 'file_deletion_done') {
      setmessages((prev) => [...prev, { role: "tool", toolType: "file_deletion_done", detail: data?.file?.name }])
      reloadtree()
    }

    if (toolType == 'message') {
      const content = data?.content;
      if (!content) return;

      setmessages((prev) => {
        let old = [...prev];
        let lastmsg = old[old.length - 1]
        if (lastmsg?.role == 'assistant') {
          old[old.length - 1] = { ...lastmsg, content };
        }
        else {
          old.push({ role: "assistant", content });
        }
        return old;
      })
    }


    if (toolType == 'error') {
      setmessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: data?.message || "Something went wrong. Please try again.",
      error: true,
    },
  ]);
  return 
    }
  }


  const handlechat = async () => {
    if(userData?.credits <=0){
      toast.error("InSufficient Credits , Recharge to continue");
      return ;
    }
    const currentMessage = message.trim();
    if (!currentMessage) return;

    setmessages(prev => [
      ...prev,
      { role: "user", content: currentMessage }
    ]);
   
    setmessage("");
    setIsLoading(true);
    try {
      await chatapi({
        projectId,
        message: currentMessage,
        history: messages,
        onEvents
      });
    } catch (e) {
      console.error(e);
       setmessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content:
        e?.message || "Something went wrong. Please try again.",
      error: true,
    },
  ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex h-full flex-col shrink-0 border-l border-gray-700/60 bg-black/70 backdrop-blur-2xl '>
      <div className='flex mb-6 h-10 shrink-0 text-white items-center gap-2 border-b border-gray-700/50 px-3'>
        <IoSparkles className='text-purple-500' />
        <p className='bg-clip-text font-bold bg-gradient-to-r from-blue-500 via-orange-600 to-yellow-500 text-transparent'>Devspace Ai Bot</p>
      </div>
    <div className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-1.5
[&::-webkit-scrollbar]:h-1.5
[&::-webkit-scrollbar-track]:bg-transparent
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-white/30
hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
  {messages?.length === 0 && (
    <div className="mt-10 text-center">
      <div className="h-12 w-12 mx-auto mb-3 border border-white/10 text-purple-700 flex items-center justify-center rounded-2xl text-xl">
        <FaHandSparkles />
      </div>
      <p className="my-3 mt-9 text-gray-500">What's in your mind?</p>
      <p className="text-gray-500">
        I can help you modify or create something in your project.
      </p>
    </div>
  )}

  <AnimatePresence initial={false}>
    {messages?.map((msg, i) => {
      if (msg.role === "tool") {
        return (
          <ToolDetails
            key={i}
            toolType={msg.toolType}
            detail={msg.detail}
          />
        );
      }

      const isUser = msg.role == "user";

      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.14 }}
          className={`flex items-start gap-2 mb-3 ${
            isUser ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`mt-0.5 rounded-full h-7 w-7 shrink-0 flex items-center justify-center ${
              isUser
                ? "text-gray-300 bg-white/10"
                : "bg-sky-500 text-white"
            }`}
          >
            {isUser ? <FaUser size={12} /> : <FaRobot size={12} />}
          </div>

          <div
            className={`max-w-[85%] break-words text-sm rounded-xl px-3 py-2 ${
              isUser
                ? "bg-gradient-to-b from-sky-400 to-sky-600 text-white"
                : msg.error
                ? "border border-red-500/30 bg-red-500/10 text-red-300"
                : "border border-white/10 bg-white/5 text-gray-200"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>


      <div className='border-t border-gray-600 p-2.5'>
        <div className='flex items-end border border-white/8 bg-white/6 p-2 focus-within:border-sky-600 gap-2 rounded-lg'>
          <textarea disabled={isLoading}
            placeholder={isLoading ? "AI is thinking..." : "Ask anything..."} onChange={(e) => setmessage(e.target.value)} value={message} rows={5} className='text-white placeholder:text-gray-400 bg-transparent text-[13px] flex-1 resize-none outline-none ' />

          <motion.button
            onClick={handlechat}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading || !message.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-sky-400 to-sky-700 text-white shadow outline-none transition-opacity disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <IoSend size={14} />
            )}
          </motion.button>
        </div>

      </div>
    </div>
  )
}

export default Aichat