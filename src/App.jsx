import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Proctedroute from './components/auth/Proctedroute';
import { LayoutLoader } from './components/layout/Loaders';
import axios from 'axios'
import { server } from './constants/Config';
import {useDispatch, useSelector} from 'react-redux'
import {userExists, userNotExists} from './redux/reducers/auth'
import {Toaster} from 'react-hot-toast'
import Singup from './pages/Singup';
import {SocketProvider} from './Socket'



const Home=lazy(()=>import("./pages/Home"))
const Login=lazy(()=>import("./pages/Login"))
const Groups=lazy(()=>import("./pages/Group"))
const Chart=lazy(()=>import("./pages/Chart"))
const NotFound=lazy(()=>import("./pages/NotFounds"))
const Profile=lazy(()=>import("./components/specific/Profile"))





const App = () => {
 
const {user,loader}= useSelector((state)=>state.auth)

const dispatch=useDispatch()
  useEffect(()=>{
   axios.get(`${server}/me`,{withCredentials:true})
   .then((data)=>dispatch(userExists(data.data)))
   .catch(()=>dispatch(userNotExists()))
  },[dispatch])
  return loader ?(
    <LayoutLoader/>):
    (
      <>
      <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
   
      <Routes>
       <Route element={<SocketProvider>
        <Proctedroute user={user}/>
       </SocketProvider>
      }>
       <Route path='/' element={<Home/>}/>
       <Route path='/Groups' element={<Groups/>}/>
       <Route path="/chart/:chatId" element={<Chart/>}/>
       <Route path="/profile" element={<Profile/>}/>
       </Route>
       
       <Route path='/sing' element={<Singup/>}/>
       <Route path="/login" element={<Proctedroute user={!user} redirect='/'>
         <Login/>
       </Proctedroute>
       }/>
      
       <Route path='*' element={<NotFound/>}/>
  
      </Routes>
      </Suspense>
      <Toaster position='bottom-center'/>
      </BrowserRouter>
      </>
     
  )
   
}

export default App