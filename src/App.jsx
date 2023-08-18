import { useEffect, useContext } from "react";
import { GlobalContext } from "./context/Context.js";
import axios from "axios";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  let { state, dispatch } = useContext(GlobalContext);

  // const changeStatus = ()=>{
  //   dispatch({
  //     type: "USER_LOGOUT",
  //   });
  // }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = axios.get(`${state.baseUrl}/profile`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (res) {
          dispatch({
            type: "USER_LOGIN",
            payload: res.data.user,
            verify: res.data.user.isVerify,
          });
        }
      } catch (error) {
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };

    getUser();
  }, [dispatch, state.baseUrl]);

  useEffect(() => {
    const setupAxiosInterceptors = () => {
      // Add a request interceptor
      axios.interceptors.request.use(
        (config) => {
          // You can modify the request config here (e.g., adding headers, logging)
         console.log("Request interceptor:", config);
          return config;
        },
        (error) => {
          // Handle request error (e.g., logging, showing an error message)
          console.error("Request interceptor error:", error);
          return Promise.reject(error);
        }
      );

      // Add a response interceptor
      axios.interceptors.response.use(
        (response) => {
          // You can modify the response data here (e.g., transforming data)
         console.log("Response interceptor:", response);
          return response;
        },
        (error) => {
          // Handle response error (e.g., logging, showing an error message)
          // console.error("Response interceptor error:", error);
          return Promise.reject(error);
        }
      );
    };

    setupAxiosInterceptors();
  }, []);

  return state?.isLogin === false || null ? (
    <Routes>
      <Route path="/" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  ) : (
    //  ( state?.isVerify === false) ?

    //   <div className="verifyDiv">
    //     <p>please verify your email !</p>
    //     <Link className="p" onClick={changeStatus} to="/login">If you verify your email then click to login !</Link>
    //   </div>

    //   :

    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
}

export default App;
