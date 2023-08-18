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
      : "https://mern-sysborg.vercel.app/api/v1",

  baseUrlSocketIo: window.location.href.includes("localhost")
    ? `http://localhost:5001`
    : `mern-sysborg.vercel.app`,
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
