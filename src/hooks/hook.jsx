import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useError = (errors=[]) =>{
    useEffect(()=>{
       errors.forEach(({isError,error,fallback})=>{
             if(isError)
                {
                    if(fallback) fallback(); 
                    else toast.error(error?.data?.message || "Faile To Load")
                }
       })
      },[errors])
}

const useAsyncMutation=(mutationHook)=>{
 
    const[isLoading,setisLoading]=useState(false);
    const[data,setdata]=useState(null)
    const [mutate] =mutationHook();

    const executeMutation=async (toastMessage,...args) =>{
        setisLoading(true)
        const toastId=toast.loading(toastMessage || "Updating data...")
        try{
            const res=await mutate(...args);
            if(res.data)
              {
                toast.success( res.data.message ||"updated data Sucesfully",{id:toastId});
                setdata(res.data)
              }
              else{
                toast.error(res?.error?.data?.message,{id:toastId})
              }}
        catch(error)
        {
            toast.error(error?.data?.message || "Something Went Wrong",{id:toastId})
        }
        finally{
                 setisLoading(false)
        }

    };
  

    return[executeMutation,isLoading,data];
};
   

const useSocketEvents=async(socket,handlers)=>{
  useEffect(()=>{
    Object.entries(handlers).forEach(([event,handlers])=>{
      socket.on(event,handlers);
    })
    
    return () =>
      {
        Object.entries(handlers).forEach(([event,handlers])=>{
          socket.off(event,handlers);
        })

      }
  },[socket,handlers])
}
    

export {useError,useAsyncMutation,useSocketEvents}