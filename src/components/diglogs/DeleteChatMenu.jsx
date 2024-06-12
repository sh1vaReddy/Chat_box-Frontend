import { Menu, Stack, Typography } from "@mui/material"
import { setIsDeleteMenu } from "../../redux/reducers/miscs"
import { useSelector } from "react-redux"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteChatMutation ,useDeleteGroupMutation} from "../../redux/api/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DeleteChatMenu = ({dispatch,deleteMenuAnchor}) => {
     const{isDeleteMenu,selectedDeletechat}=useSelector((state)=>state.miscs)
     const [deleteChat,_,deleteChatData]=useAsyncMutation(useDeleteChatMutation)
     const [deleteGroup]=useAsyncMutation(useDeleteGroupMutation)
     const nav=useNavigate();

    const  closeHandler = () =>{
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current=null;

    }

    const leveagrouphandler=()=>{
     closeHandler();
     deleteGroup("Deleting Group....",selectedDeletechat.chatId)
    }

    const deletechat=()=>{
      closeHandler();
      deleteChat("Deleteing Chat...",selectedDeletechat.chatId)
    }

    useEffect(()=>{

      if(deleteChatData)
           nav("/")
    },[deleteChatData])
 
  return (
    <Menu open={isDeleteMenu}  
    onClose={closeHandler} 
    anchorEl={deleteMenuAnchor.current}
    anchorOrigin={{
      vertical:"bottom",
      horizontal:"right"
    }}
    transformOrigin={{
      vertical:"center",
      horizontal:"center"
    }}
    >
        <Stack
        sx={{
            width:"10rem",
            padding:"0.5rem",
            cursor:"pointer"
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={selectedDeletechat.groupChat ? leveagrouphandler : deletechat }
        >
            {selectedDeletechat.groupChat ? <><ExitToAppIcon/>
             <Typography>Leave Group</Typography>
            </>:<><DeleteIcon/>
            <Typography>Delete Chat</Typography>
            </>}
        </Stack>

    </Menu>
  )
}

export default DeleteChatMenu;