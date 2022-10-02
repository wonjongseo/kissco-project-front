import { atom } from "recoil";

export const isLoginVar = atom({
  key: "isLogin",
  default: false,
});

export const windowWidthVar = atom({
  key: "window_width",
  default: window.innerWidth || 1000,
});

export const userIdVar = atom({
  key: "userId",
  default: sessionStorage.getItem("userId"),
});
