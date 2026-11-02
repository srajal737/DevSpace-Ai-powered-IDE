import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Openroute = ({children ,sessionloading}) => {
    const {userData} = useSelector(state=>state.user);
    const navigate = useNavigate();
    if(sessionloading){
        return <Loader/>
    }
    if(!userData){
        return children;
    }
    else{
        return <Navigate to='/dashboard/project' replace />
       
    }
}

export default Openroute