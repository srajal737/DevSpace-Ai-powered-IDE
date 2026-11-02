import React from 'react'
import { motion } from 'motion/react'
import { FaTerminal, FaX } from 'react-icons/fa6'
import Actualterminal from './Actualterminal'
const Terminal = ({setactivetab ,projectId }) => {
  return (
    <motion.div initial={{height:0 , opacity:0}}
     animate={{height:256 , opacity:1}}
     exit={{height:0 , opacity:0}}
     transition={{duration:0.2 , ease:"easeOut"}}

     className='flex shrink-0 flex-col overflow-hidden border-t border-gray-700 bg-[#111113]'
    >
      <div className='h-8 shrink-0 items-center flex justify-between border-b px-3 border-gray-800'>
      <div className='flex items-center gap-2 text-white font-semibold'>
        <FaTerminal/>
        <p>Terminal</p>
      </div>
      <div className='flex items-center'>
        <button className='text-white flex items-center justify-center font-bold cursor-pointer hover:bg-gray-500/50 p-1 rounded-full text-md' onClick={()=>setactivetab((prev)=>prev.filter((tab)=>tab!='terminal'))}> <FaX/></button>
      </div>
      </div>

      <div className='flex-1 min-h-0'>
          <Actualterminal projectId={projectId} />
      </div>
    
    </motion.div>
  )
}

export default Terminal