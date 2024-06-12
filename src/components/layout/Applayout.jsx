import { Drawer, Grid, Skeleton } from "@mui/material";
import Title from "../shared/Title";
import Header from "./Header";
import Chatlist from "../specific/Chatlist";
import { useNavigate, useParams } from "react-router-dom";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobileMenuFriend,
  setSelectedDeletechat,
} from "../../redux/reducers/miscs";
import { useError, useSocketEvents } from "../../hooks/hook";
import { getsocket } from "../../Socket";
import {
  New_Message_Alert,
  ONLINE_USERS,
  Refetch_Chats,
} from "../../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import { setNewMessagesAlert } from "../../redux/reducers/chat";
import { getorsaveFromStronage } from "../../lib/features";
import DeleteChatMenu from "../diglogs/DeleteChatMenu";

const Applayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const socket = getsocket();

    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const [OnlineUsers, setOnlineUsers] = useState([]);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    const { user } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.profile);
    const { isMobileMenuFriend } = useSelector((state) => state.miscs);
    const { newMessagesAlert } = useSelector((state) => state.Chat);
    useEffect(() => {
      getorsaveFromStronage({
        key: New_Message_Alert,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);
    useError([{ isError, error }]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeletechat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobile = () => {
      dispatch(setIsMobileMenuFriend(false));
    };

    const newMessageAlertHandler = useCallback(
      (data) => {
        if (data.chatId !== chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const refetchListener = useCallback(() => {
      refetch();
      nav("/");
    }, [refetch, nav]);

    const OnlineUserLister = useCallback((data) => {
      setOnlineUsers(data);
    });

    const eventHandlers = {
      [New_Message_Alert]: newMessageAlertHandler,
      [Refetch_Chats]: refetchListener,
      [ONLINE_USERS]: OnlineUserLister,
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenuFriend} onClose={handleMobile}>
            <Chatlist
              w="70vw"
              chats={data?.Chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              user={user.data}
              newMessagesAlert={newMessagesAlert}
              OnlineUsers={OnlineUsers}
            />
          </Drawer>
        )}

        <Grid
          container
          sx={{
            height: "calc(100vh - 4rem)",
            padding: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
              padding: "1rem",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Chatlist
                chats={data?.Chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                user={user.data}
                newMessagesAlert={newMessagesAlert}
                OnlineUsers={OnlineUsers} // Changed to match the state variable name
              />
            )}
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={9}
            sx={{
              height: "100%",
              padding: "2rem",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <WrappedComponent {...props} chatId={chatId} users={users} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default Applayout;
