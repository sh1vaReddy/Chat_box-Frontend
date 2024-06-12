import { createSlice } from "@reduxjs/toolkit";
import {getorsaveFromStronage} from '../../lib/features'
import {New_Message_Alert}  from '../../constants/events'
const initialState = {
  newMessagesAlert:[
    {
      chatId: "",
      count: 0,
    },
  ],
};
 
const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setNewMessagesAlert: (state, action) => {
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
    removeNewMessageAlert:(state,action)=>{
      state.newMessagesAlert=state.newMessagesAlert.filter(
        item=>item.chatId!==action.payload
      )
    }
  },
});

export default chatSlice;

export const { setNewMessagesAlert,removeNewMessageAlert} = chatSlice.actions;
