import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("theme") || "light",
  theme: localStorage.getItem("theme") || "light",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.setAttribute("data-theme", state.theme);
    },
  },
});

export default modeSlice.reducer;

export const { toggleTheme } = modeSlice.actions;
