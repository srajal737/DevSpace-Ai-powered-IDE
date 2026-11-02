import React, { useRef } from 'react'
import { useEffect } from 'react';
const Confirmationmodal = ({ data,setdata }) => {
const ref = useRef();

     useEffect(()=>{
            function handleclickoutside(e){
                if(ref.current && !ref.current.contains(e.target)){
                    setdata(null);
                }
            }
    
            document.addEventListener("mousedown",handleclickoutside);
           return () => {
          document.removeEventListener("mousedown", handleclickoutside)
        }
        },[]);
  return (
    <div className=' fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50'>
      
      <div ref={ref} className='bg-black/70 scale-105 p-6 rounded-lg shadow-lg text-center min-w-[300px] border-2 border-slate-400'>
        <p className='text-xl font-bold text-white'>{data.text1}</p>
        <p className=' text-gray-400  mt-2'>{data.text2}</p>

        <div className='flex justify-center gap-4 mt-4'>
          <button
            className='bg-red-500 font-medium px-4 py-2 rounded cursor-pointer text-black'
            onClick={data.btnhandle1}
          >
            {data.btn1}
          </button>

          <button
            className='bg-gray-500 px-4 py-2 font-medium rounded cursor-pointer text-black'
            onClick={data.btnhandle2}
          >
            {data.btn2}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Confirmationmodal