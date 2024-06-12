import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/Config.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["Chats", "Users","Message"],
  endpoints: (builder) => ({
     Profile:builder.query({
       query:()=>({
        url:'/me',
        credentials:"include"
       }),
       providesTags:["Chats"]
    }),
    myChats: builder.query({
      query: () => ({
        url: "/my",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/serach?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),
    serachFirendRequesr: builder.mutation({
      query: (data) => ({
        url: "/SendRequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    getnotifications: builder.query({
      query: () => ({
        url: "/Notification",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFrienRequest:builder.mutation({
      query:(data)=>({
        url:"/Accept",
        method:"PUT",
        credentials: "include",
        body:data
      }),
      invalidatesTags:["Chats"]
    }),
    getChatDetails:builder.query({
      query:({chatId,populate=false})=>{
        let url=`group/chat/${chatId}`
        if(populate) 
          url+="?populate=true";
        return{
          url,
        credentials:"include"
        }; 
      },
      providesTags:["Chats"]
    }),
    getMyMessage: builder.query({
      query: ({ chatId, page }) => {
        const url = `/message/${chatId}?page=${page}`;

        return {
          url: url,
          credentials: "include"
        };
      }
    }),
    getmyGroups:builder.query({
      query:()=>({
        url:`/my/group`,
        credentials:"include"
      }),
      providesTags:["Chats"]
    }),
    avaliableFriends:builder.query({
      query:(chatId)=>{
        let url=`/friendlist`
        if(chatId) 
          url+=`?chatId=${chatId}`;
        return{
          url,
        credentials:"include"
        }; 
      },
      providesTags:["Chats"]
    }),
    addmembers:builder.mutation({
      query:({ chatId, members })=>({
        url:"/addmembers",
        method:"PUT",
        credentials: "include",
        body:{ chatId, members }
      }),
      invalidatesTags:["Chats"]
    }),
    newGroup:builder.mutation({
      query:({name,members})=>({
        url:'/chat',
        method:'POST',
        credentials:"include",
        body:{name,members}
      }),
      invalidatesTags:["Chats"]
    }),
    renameGroup:builder.mutation({
      query:({chatId,name})=>({
        url:`/group/chat/${chatId}`,
        method:"PUT",
        credentials:"include",
        body:{name},
      }),
      invalidatesTags:["Chats"]
    }),
    removeMembers:builder.mutation({
      query:({ userId, chatId })=>({
        url:'/removemember',
         method:"PUT",
        credentials:"include",
        body:{ userId, chatId }
      }),
      invalidatesTags:["Chats"]
    }),
    DeleteGroup:builder.mutation({
      query:(chatId)=>({
        url:`/leave/${chatId}`,
        method:"DELETE",
        credentials:"include",
      }),
      invalidatesTags:["Chats"]
    }),
    DeleteChat:builder.mutation({
      query:(chatId)=>({
        url:`/group/chat/${chatId}`,
        method:"DELETE",
        credentials:"include",
      }),
    })
   }),
});

export default api;
export const {
  useProfileQuery,
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSerachFirendRequesrMutation,
  useGetnotificationsQuery,
  useAcceptFrienRequestMutation,
  useGetChatDetailsQuery,
  useGetMyMessageQuery,
  useGetmyGroupsQuery,
  useAvaliableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveMembersMutation,
  useAddmembersMutation,
  useDeleteGroupMutation,
  useDeleteChatMutation
} = api;
