import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/login';
import { FaAngleDown } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
const Sideacitivitybar = ({activetabs ,setactivetab , tabs}) => {
    

    const toggleTab = (id) => {
        setactivetab((prev) =>
            prev.includes(id)
                ? prev.filter((tab) => tab !== id)
                : [...prev, id]
        );
    };
    const dispatch = useDispatch();
     const { userData } = useSelector((state) => state.user);
       const [menuopen, setmenuopen] = useState(false);
    const name = userData?.name || 'Guest';
    const initialLetters = name.trim().split(/\s+/).filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase() || 'G';

    const email = userData?.email || "xyz@email.com"
    const navigate = useNavigate();
    const ref = useRef();
    
        useEffect(() => {
            const handleclickoutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    setmenuopen(false);
                }
            }
            document.addEventListener('mousedown', handleclickoutside);
    
            return () => {
                document.removeEventListener('mousedown', handleclickoutside);
            };
    
        }, [])

         const logouthandle = async () => {
                try {
                    await logout(dispatch);
                } catch (e) {
                    console.log(e);
                }
            }

    return (
        <motion.div
            initial={{ x: -14, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='flex relative w-16 shrink-0 flex-col items-center gap-5 border-r border-white/[0.08] bg-black/70 py-3 backdrop-blur-xl h-full justify-between'>
            <div className='flex items-center gap-5 flex-col'>
                {tabs.map(({ id, label, icon: Icon }) => {
                    const isActive = activetabs.includes(id);

                    return (
                        <motion.button
                            key={id}
                            type="button"
                            onClick={() => toggleTab(id)}
                            title={label}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.92 }}
                            className={`cursor-pointer relative flex  h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${isActive
                                    ? 'border-blue-400/20 bg-blue-600/20 text-blue-500'
                                    : 'border-transparent text-white rounded-full p-3 bg-gray-400/30 hover:bg-white/[0.06] hover:text-[#E6EDF3]'
                                }`}
                        >
                            {isActive && (
                                <motion.span

                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute -left-[13px] h-6 w-[5px] rounded-r-full bg-blue-400"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <Icon className="text-xl" />
                        </motion.button>
                    );
                })}
            </div>



            <div ref={ref} className='relative'>
                <div className='flex items-center'>
                   
                    <div onClick={(e) => setmenuopen(!menuopen)} className="relative cursor-pointer flex items-center ">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 p-[2px] shadow-md shadow-indigo-500/20 ">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-bold text-indigo-700 dark:bg-slate-950 dark:text-indigo-300">
                                {initialLetters}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    menuopen && (
                        <div className='absolute bottom-10 left-5 w-55 bg-white/95 dark:bg-gray-600  p-3 py-3 z-10 animate-[fadeIn_0.15s_ease-out] rounded-xl shadow-xl backdrop-blur-xl border border-gray-300'>
                            <div className='flex justify-center '>
                                <div className="h-15 w-15 rounded-full  p-[2px]  ">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-xl font-bold text-indigo-700 dark:bg-slate-950 dark:text-indigo-300">
                                        {initialLetters}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className='text-lg text-center fond-medium text-black dark:text-gray-300 '>{name}</p>
                                <p className='text-lg text-center fond-medium text-black dark:text-gray-300 '>{email}</p>
                            </div>

                            <div onClick={logouthandle} className='relative text-center mt-5 '>
                                <button className="group relative overflow-hidden rounded-lg bg-red-500 px-8 py-3 text-white cursor-pointer">
                                    <span className="relative z-10 group-hover:text-black">
                                        Logout <MdLogout className='inline' />
                                    </span>

                                    <span
                                        className="absolute left-0 top-0 h-[390%] w-0  rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white/80 transition-all duration-1000 group-hover:w-[200%]"
                                    ></span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>


        </motion.div>
    )
}

export default Sideacitivitybar