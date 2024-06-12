import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: null,
    loader: true,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.users= action.payload;
            state.loader = false;
        },
    },
});

export  default profileSlice;

export const{setProfile}=profileSlice.actions;