import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  sideBar: boolean;
}

const initialState = { sideBar: false } satisfies ThemeState as ThemeState;

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleSidebar(state) {
      console.count('time')
      state.sideBar = !state.sideBar;
    },
    
  },
});

export const { toggleSidebar } = ThemeSlice.actions;
export default ThemeSlice.reducer;
