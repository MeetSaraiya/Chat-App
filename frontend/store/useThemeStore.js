import { create } from "zustand";
import { THEMES } from "../constants";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('chat-theme') || 'dracula',
  setTheme : (theme) => {
    localStorage.setItem('chat-theme' , theme);
    set({theme});
  },
}));

