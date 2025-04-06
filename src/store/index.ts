import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./reducers/modeSlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
  },
});
