import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Protectedroute = ({children,sessionloading}) => {
    const navigate = useNavigate();
  const {userData} = useSelector(state=>state.user);
  if(sessionloading){
    return <Loader/>
  }
  if(userData){
    return children;
  }
  else{
   return <Navigate to='/' replace />
  }
}

export default Protectedroute