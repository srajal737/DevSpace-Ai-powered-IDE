import { signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth,googleProvider } from '../firebase'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { sessionget } from './services/session'
import { useDispatch } from 'react-redux'
import { setuserData } from './redux/userslice'
import Protectedroute from './Auth/Protectedroute'
import Project from './components/Project'
import Starred from './components/Starred'
import Login from './pages/Login'
import Openroute from './Auth/Openroute'
import Home from './pages/Home'
import Projectpage from './pages/Projectpage'
import Plan from './pages/Plan'
import History from './pages/History'
import Invalid from './pages/Invalid'
const App = () => {
  const dispatch = useDispatch();
  const [sessionloading,setsessionloading] = useState(true);
//Session loading: sessionget() is asynchronous. If userData is initially empty, Protectedroute might redirect to /login before the session loads.

  useEffect(() => {
    const getsession = async () => {
      try {
        const data = await sessionget();

        if (data?.data) {
          dispatch(setuserData(data.data));
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        // Runs whether the request succeeds or fails
        setsessionloading(false);
      }
    };

    getsession();
  }, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path="*" element={<Invalid/>} />
        <Route path='/login' element={<Openroute sessionloading={sessionloading}><Login/></Openroute>}/>
     

        <Route path='/dashboard' element={
          <Protectedroute sessionloading={sessionloading}>
            <Dashboard/>
          </Protectedroute>
        }>

          <Route path='/dashboard/project' element={<Protectedroute sessionloading={sessionloading}><Project/></Protectedroute>}/>
          <Route path='/dashboard/starred' element={<Protectedroute sessionloading={sessionloading}><Starred/></Protectedroute>}/>
          <Route path='/dashboard/plan' element={<Protectedroute sessionloading={sessionloading}><Plan/></Protectedroute>}/>
          <Route path='/dashboard/history' element={<Protectedroute sessionloading={sessionloading}><History/></Protectedroute>}/>

        </Route>

       
        <Route path='/project/:id' element={<Protectedroute sessionloading={sessionloading}><Projectpage/></Protectedroute>}
        />
   {/* <Route path='/project/:id' element={<Projectpage/>}
        /> */}


      </Routes>
    </BrowserRouter>
  )
}

export default App
