import { useCallback, useRef, useEffect, useState } from "react";
import Applayout from "../components/layout/Applayout";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/Stylecomponent";
import FielMenu from "../components/diglogs/FielMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getsocket } from "../Socket";
import { Alert, CHAT_EXIT, CHAT_JOINED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useGetChatDetailsQuery, useGetMyMessageQuery } from "../redux/api/api";
import { useError, useSocketEvents } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../redux/reducers/miscs";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import TypingLoader from "../components/layout/TypingLoader";

const Chart = ({ chatId, users }) => {
  const containerRef = useRef(null);
  const socket = getsocket();
  const dispatch = useDispatch();
  const {user}=useSelector((state)=>state.auth)

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [FileMenuAnch, setFileMenuAnch] = useState(null);
  const[Iamtyping,setIamtyping]=useState(false)
  const[userTyping,setuserTyping]=useState(false)
  const typingTimeOut=useRef(null)
  const bottomRef=useRef(null)
  const chatDetails = useGetChatDetailsQuery({ chatId, page });
  const oldMessages = useGetMyMessageQuery({ chatId });

  const { data: oldmessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessages.data?.totalPages,
    page,
    setPage,
    oldMessages.data?.messages
  );

  const members = chatDetails?.data?.chat?.members;
  const messagehandler = (e) => {
    setMessage(e.target.value);
    if(!Iamtyping)
    {
      socket.emit(START_TYPING, { members, chatId });
      setIamtyping(true)
    }

    if(typingTimeOut.current)
      clearTimeout(typingTimeOut.current)

    typingTimeOut.current=setTimeout(()=>{
      socket.emit(STOP_TYPING,{members,chatId})
      setIamtyping(false)
    },2000)
  };
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessages.isError, error: oldMessages.error },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessage = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const startTypingLister = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setuserTyping(true)
    },
    [chatId]
  );

  const stopTypingLister = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setuserTyping(false)
    },
    [chatId]
  );
 
  const alertHandler = useCallback((data)=>{
    if(data.chatId!==chatId) return;
    const messageForAlert={
      content:data.message,
      sender:{
        _id:"km;smld",
        name:"Admin"
      },
      chat:chatId,
      createdAt:new Date().toISOString(),
    }

    setMessages((prev)=>[...prev,messageForAlert])

  })

  const eventHandlers = {
    [Alert]:alertHandler,
    [NEW_MESSAGE]: newMessage,
    [START_TYPING]: startTypingLister,
    [STOP_TYPING]:stopTypingLister
  };
  useSocketEvents(socket, eventHandlers);
  useError(errors);

  useEffect(() => {
    if (oldMessages.data) {
      setMessages([...oldMessages.data.messages]);
    }
  }, [oldMessages.data]);
  useEffect(() => { 
    socket.emit(CHAT_JOINED,{userId:user._id,members});
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_EXIT,{userId:user._id,members });
    };
  }, [chatId]);

  const alertLister=useCallback(()=>{})

  useEffect(()=>{
    if(bottomRef.current)
      bottomRef.current.scrollIntoView({behavior:"smooth"})
  },[messages])

  const handleFile = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnch(e.currentTarget);
  };

  const allMessages = [...oldmessages, ...messages];

  return chatDetails.isLoading ? (
    <Applayout />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {allMessages.map((message) => (
          <MessageComponent key={message.id} message={message} user={users} />
        ))}
        {userTyping && <TypingLoader/>}
        <div ref={bottomRef}/>
      </Stack>
      <form
        style={{
          borderWidth: "0.25rem",
          borderStyle: "solid",
          borderRadius: "25rem",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          alignItems="center"
          height={"100%"}
          padding={"0.5rem"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFile}
          >
            <Tooltip title="Attach File">
              <AttachFile />
            </Tooltip>
          </IconButton>
          <InputBox
            placeholder="Message"
            value={message}
            onChange={messagehandler}
            sx={{
              flexGrow: 1,
              minWidth: 200,
              minHeight: 40,
              fontSize: "1.1rem",
            }}
          />
          <IconButton
            onClick={submitHandler}
            sx={{
              rotate: "-30deg",
              backgroundColor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Tooltip title="Send Message">
              <Send />
            </Tooltip>
          </IconButton>
        </Stack>
      </form>
      <FielMenu anchorEl={FileMenuAnch} onClose={() => setFileMenuAnch(null)} />
    </>
  );
};

export default Applayout(Chart);
