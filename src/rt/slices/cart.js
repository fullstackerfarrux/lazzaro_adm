import { createSlice } from "@reduxjs/toolkit";
const cartLocale = localStorage.getItem("cart");

const initialState = {
  sidebar: true,
};

const cartSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    changeSidebar(state, action) {
      state.sidebar = action.payload;
    },
  },
});

export const { changeSidebar } = cartSlice.actions;
export default cartSlice.reducer;
