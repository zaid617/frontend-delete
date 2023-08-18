import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/Context.js";
import axios from "axios";
import "./pages.css";

export default function Login() {
  let [isError, setIsError] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { state, dispatch } = useContext(GlobalContext);

  const login = async () => {
    try {
      const res = await axios.post(
        `${state.baseUrl}/login`,
        { email, password },
        { withCredentials: true, credentials: "include" }
      );

      if (res) {
        console.log("login successful");
        dispatch({
          type: "USER_LOGIN",
          payload: res.data.user,
          verify: res.data.user.isVerify,
        });
      }
    } catch (error) {
     
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 1500);

    }
  };

  return (
    <div>
      <div className="mainSection2">
        <div className="leftSection">
          Share Clipboard Over <br />
          Air-By SysBorg
        </div>

        <div className="rightSection">
          <fieldset>
            <legend>Login </legend>
            <input
              type="email"
              name="email"
              placeholder="Enter your email "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password "
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button onClick={login} className="btn1">
              Submit
            </button>
            <p className={`error2 ${(isError) ? "visible" : "hide"}`}>invalid information</p>
          </fieldset>
          <Link className="link" to="/">
            Don't have account !
          </Link>
        </div>
      </div>
    </div>
  );
}
