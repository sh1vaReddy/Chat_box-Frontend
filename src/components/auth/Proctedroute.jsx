import { Navigate, Outlet } from "react-router-dom"


const Proctedroute = ({children,user,redirect='/login'}) => {
  if(!user)
  {
    return <Navigate to={redirect}/>
  
  }
  return children ?  children : <Outlet/>
}

export default Proctedroute