import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/Context.js";
import axios from "axios";
import "./pages.css";

export default function Signup() {
  let [isError, setIsError] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { state, dispatch } = useContext(GlobalContext);

  const signup = async () => {
    try {
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then(async (data) => {
          const ip = data.ip;

          const res = await axios.post(
            `${state.baseUrl}/signup`,
            { name, email, password, ip },
            { withCredentials: true, credentials: "include" }
          );

          if (res) {
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.user,
              verify: res.data.user.isVerify,
            });
          }
        });
    } catch (error) {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 1500);
    }
  };

  return (
    <div className="mainSection2">
      <div className="leftSection">
        Share Clipboard Over <br />
        Air-By SysBorg
      </div>

      <div className="rightSection">
        <fieldset>
          <legend>Sign-Up </legend>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Enter your name "
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your email "
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Enter your new password "
          />
          <button onClick={signup} className="btn1">
            Submit
          </button>
          <p className={`error2 ${(isError) ? "visible" : "hide"}`}>Invalid Information</p>
        </fieldset>
        <Link className="link" to="/login">
          already have account !
        </Link>
      </div>
    </div>
  );
}
