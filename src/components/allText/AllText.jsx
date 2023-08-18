import moment from "moment";
import { useContext } from "react";
import { GlobalContext } from "../../context/Context.js";
import axios from "axios";
import "./AllText.css";

export default function AllText() {

  
  let { state, dispatch } = useContext(GlobalContext);

  const deleted = async(id , classId , userId) => {
    
    if (userId !== state.user._id ) {
      alert("you can only delete your own text !");
      return
    }

    try {
      
      const res = await axios.delete(`${state.baseUrl}/text/${id}/${classId}`, {withCredentials: true , credentials : "include"})
      
      if (res) {
        console.log("res from delete");    
      }
    } catch (error) {
      console.log("Error in deleting text");
    }

  };

  return (
    <div className="m-5">
      <p className="error" id="error">
        Enter Your Class Id !
      </p>

{(!state.AllTexts)? <div>no text found</div> :<div className="mainBox">
        {state.AllTexts.map((elem, i) => {
          return (
          <div className={`mainSection ${(elem.userId === state.user._id)? "reverse": "" }`} key={i}>
              <div className="box1">
                <div className="user">{(elem.userId === state.user._id)? "You": `${elem.name}` }</div>
                <div>
                  <strong>{elem.ip}</strong>
                </div>
                <div className="date">{moment(elem.date).fromNow()}</div>
                <div>
                  <input
                    className="red"
                    readOnly
                    type="text"
                    onClick={()=>deleted(elem._id , elem.classId , elem.userId)}
                    value={"Delete"}
                  />
                </div>
              </div>

              <div className={`box2 ${(elem.userId === state.user._id)? "borderRight": "borderLeft" }`}>
                 {(elem.text.slice(0,8)==="link")? <p><a href={elem.text} rel="noreferrer" target="_blank">{elem.text}</a></p>:<p>{elem.text}</p>}               
              </div>
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}
