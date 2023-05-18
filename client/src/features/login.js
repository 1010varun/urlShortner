import { createSlice } from "@reduxjs/toolkit";

const initialState = { "login": false, "user" : "" };

export const userSlice = createSlice({
    name: "userLogin",
    initialState: { value: initialState },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialState;
        }
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;