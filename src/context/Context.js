import React, { createContext, useReducer } from "react";
import { reducer } from "./Reducer";

export const GlobalContext = createContext("Initial Value");

let data = {
  darkTheme: true,
  user: {},
  AllTexts: [],
  isLogin: false,
  isAdmin: false,
  isVerify: false,

  baseUrl:
    window.location.href.split(":")[0] === "http"
      ? "http://localhost:5001/api/v1"
      : "https://1f7c-202-47-52-217.ngrok-free.app/api/v1",

  baseUrlSocketIo: window.location.href.includes("localhost")
    ? `http://localhost:5001`
    : `https://1f7c-202-47-52-217.ngrok-free.app/api/v1`,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
