import { configureStore } from '@reduxjs/toolkit'
import authSLice from './reducers/auth';
import miscslic from './reducers/miscs'
import api from './api/api';
import profileSlice from './reducers/profile'
import chatSlice from './reducers/chat';

const store = configureStore({
    reducer:{
        [authSLice.name]:authSLice.reducer,
        [profileSlice.name]:profileSlice.reducer,
        [miscslic.name]:miscslic.reducer,
        [api.reducerPath]:api.reducer,
        [chatSlice.name]:chatSlice.reducer
    },
   middleware:(defaultMiddleWare)=>[...defaultMiddleWare(),api.middleware]
})


export default store;