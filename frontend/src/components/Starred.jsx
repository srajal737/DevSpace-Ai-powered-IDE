import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { getallstarredprojects } from '../services/projectdetails';
import {  setprojects } from '../redux/projectslice';
import { FiFolder} from 'react-icons/fi'
import Loader from './Loader';
import {motion} from 'motion/react'
import Projectcard from './Projectcard';
const Starred = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user);
  const [loading , setloading] = useState(false);
  const {projects} = useSelector(state=>state.project);
  const fetchstarredProjects = async()=>{
    setloading(true);
      const data  =await getallstarredprojects();
      dispatch(setprojects(data));
      setloading(false);
    }
   useEffect(()=>{
       fetchstarredProjects();
     },[])

     
const containerVariants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

  return (
     <div className='text-black dark:text-white my-6 mx-2'>
          <div className='flex gap-3 flex-col lg:flex-row lg:justify-between'>
            <div>
              <p className='text-3xl font-bold'>Welcome Back, {userData?.name || "Guest"}</p>
              <p className='text-lg dark:text-gray-400'>Take a look at your Starred Projects</p>
            </div>
            <div className="group cursor-pointer relative flex w-fit items-center gap-2
      overflow-hidden rounded-xl border border-white/20
      bg-gray-600/10 px-4 py-2.5 text-lg font-medium
      text-slate-800 shadow-lg shadow-black/5
       transition-all duration-300
      hover:bg-white/20 hover:shadow-violet-500/10
      dark:border-white/15 dark:bg-white/[0.08]
      dark:text-white dark:hover:bg-white/[0.14]">
    
              {/* Glass glow */}
              <div className="pointer-events-none absolute -left-5 -top-8
        h-16 w-16 rounded-full bg-violet-500/30
        blur-2xl transition-all duration-300
        group-hover:bg-violet-400/50" />
    
              <FaPlus className="relative z-10 transition-transform
        duration-300 group-hover:rotate-90" />
    
              <span className="relative z-10">New Project</span>
            </div>
          </div>
    
    
          <p className='text-xl mt-8 my-3 font-medium'>Starred Projects ⭐</p>

          {
        loading?<div className='flex h-[50vh] justify-center items-center'><Loader/></div> : <div>
            {
              !projects || projects?.length ==0?<div className='my-12 dark:text-white text-gray-700 flex justify-center items-center flex-col gap-2  '>
              <div className=' h-14 w-14 bg-black dark:bg-white/40 text-2xl rounded-full flex items-center justify-center '> <FiFolder /></div>
              
               <p className='text-2xl font-bold'> No Starred Project</p>
               <p>Add to Favourite, to see here </p>
              </div>:<div>
                {
                 
                    <motion.div  variants={containerVariants} initial="hidden" animate="show" className='grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2'>
                       {
                        projects.map((p,i)=>(
                         p.starMark && <Projectcard project={p} index={i} key={i}/>
                        ))
                       }
                    </motion.div>
                  
                }
              </div>
            }
          
        </div>
      }

        </div>
  )
}

export default Starred