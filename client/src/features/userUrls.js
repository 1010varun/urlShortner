import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: "", urls: [] };

export const userUrls = createSlice({
  name: "userUrls",
  initialState: { value: initialState },
  reducers: {
    fetchUrls: (state, action) => {
      state.value = action.payload;
    },
    eraseUrls: (state) => {
      state.value = initialState;
    },
  },
});

export const { fetchUrls, eraseUrls } = userUrls.actions;

export default userUrls.reducer;
