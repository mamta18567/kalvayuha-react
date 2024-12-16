import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signupUser, } =
  userSlice.actions;
export default userSlice.reducer;
