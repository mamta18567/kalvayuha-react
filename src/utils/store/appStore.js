import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice'

export const appStore = configureStore({
  reducer: {
    user: userSlice,
  },
});