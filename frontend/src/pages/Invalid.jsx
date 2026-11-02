import React from 'react'
import { Link } from 'react-router-dom'
const Invalid = () => { 
    return ( 
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
     <h1 className="text-6xl font-bold text-red-500">404</h1> 
     <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2"> Sorry, the page you are looking for does not exist. </p> 
      <Link
to="/"
className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
> Go to Home </Link> </div> 
) 

}

export default Invalid