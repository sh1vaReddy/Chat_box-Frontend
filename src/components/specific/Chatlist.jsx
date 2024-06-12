import { Stack } from "@mui/material";
import ChartItem from "../shared/ChartItem";
const Chatlist = ({
  w = "100%",
  chats,
  chatId,
  OnlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <>
      <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
        {chats?.map((data) => {
          const { _id, Name, groupChat, members, avatar } = data;
          const newMessageAlert = newMessagesAlert.find(
            ({ chatId }) => chatId === _id
          );

          const isOnline = members?.some((member) => OnlineUsers.includes(member));

          return (
            <ChartItem
              newMessageAlert={newMessageAlert}
              isOnline={isOnline}
              avatar={avatar}
              name={Name}
              _id={_id}
              key={_id}
              groupChat={groupChat}
              sameSender={chatId === _id}
              handleDeleteChat={handleDeleteChat}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default Chatlist;
