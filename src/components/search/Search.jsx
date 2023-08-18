import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/Context.js";
import axios from "axios";
import { io } from "socket.io-client";
import "./search.css";

export default function Search() {
  let [classId, setClassID] = useState("");
  let [text, setText] = useState("");
  let { state, dispatch } = useContext(GlobalContext);



  useEffect(() => {
    const socket = io(state.baseUrlSocketIo, {
      withCredentials: true, credentials: "include"
    });

    socket.on("connect", function () {
      console.log("connected");
    });
    socket.on("disconnect", function (message) {
      console.log("Socket disconnected from server: ", message);
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    console.log("subscribed: ", `${classId}`);
    socket.on(`${classId}`, function (data) {

       dispatch({
         type: "ALL_MESSAGE",
         messages: data.reverse(),
       });

    });

    return () => {
      socket.close();
    };
  }, [dispatch, state.baseUrlSocketIo]);


  const logout = async () => {
    try {
      const res = await axios.post(`${state.baseUrl}/logout`, {}, {withCredentials: true , credentials: "include"});

      if (res) {
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////////////////////////
  const idSub = async () => {

    if (classId === "") {
      alert("Please enter a class id");
    } else {
      const res = await axios.get(`${state.baseUrl}/class/${classId}` ,{withCredentials: true , credentials: "include"});
     
      if (res) {
        dispatch({
          type: "ALL_MESSAGE",
          messages: res.data.data,
        });
          

      console.log("state" , state.AllTexts);
        
      }

    }

  };

  /////////////////////////////////////////
  const submitHandler = async () => {

    if (text === "") {
      alert("Please enter any text");
      return;
    }

    let name = state.user.name;
    let ip = state.user.ip;
    let userId = state.user._id;
    let email = state.user.email;

    try {
      const res = await axios.post(
        `${state.baseUrl}/text/${classId}`,
        { name, ip, text, classId, userId , email },
        { withCredentials: true, credentials: "include" }
      );

        if (res) {   
          console.log("successfully posted");
          setText("");
        }

        else {
        console.log("server did not respond");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <hr />

      <div className="input">
        <div className="inputs">
          <input
            type="text"
            onChange={(e) => {
              setClassID(e.target.value);
            }}
            value={classId}
            placeholder="Class ID"
            className="height first-input"
          />
          <button onClick={idSub} className="classBtn" id="classBtn">
            &#10003;
          </button>
        </div>

        <div className="inputs second">
          <input
            type="text"
            placeholder="Enter Any Text Or Link"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            className="height Assignment"
          />

          <button
            className="height btn btn-primary m-l3"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>

        <div className="inputs">
          <button className="height btn btn-primary last" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
}
