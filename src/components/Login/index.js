import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axiosInstance from "../../api";
import { storeUser } from "../../store/actions/data.action";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { sessionService } from "redux-react-session";

function Login(props) {
  let history = useHistory();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  const [pass, setPass] = useState(null);
  const [roll, setRoll] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (pass && roll) {
      setIsEnabled(true);
    }
  }, [pass, roll]);

  const login = () => {
   
    axiosInstance({
      method: "post",
      url: `user/login`,
      timeout: 5000,
      data: {
        user: {
          username: roll,
          password: pass,
        },
      },
    })
      .then((response) => {
     //   console.log("Login SUCCESS :", response.data);

        if (response.data.password == true) {
          // Store in Session
          const token = response.data.user_id;
          sessionService
            .saveSession({ token })   // Authenticated
            .then(() => {
              sessionService
                .saveUser(response.data.user_id)  // Checked
                .then(() => {
                  // Store in Redux
                  props.storeUser(response.data.user_id);
                  // Move to Quiz
                  history.replace("/");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        } else {
          // Try Later
          setValid(false);
        }
      })
      .catch((error) => {
       // console.log("Log In FAIL :", error);
      });
  };

  return (
    <div id="loginContainer">
      <br />
      {!isDesktopOrLaptop ? (
        <img
          src={require("../../assets/images/back.png")}
          width="20"
          height="27"
          id="backBtn"
          style={{ float: "left", marginBottom: "30%", cursor: "pointer" }}
        />
      ) : null}

      <h1 className="heading">Login</h1>
      <div id="form">
        <div className="formElt">
          <input
            type="text"
            placeholder="Roll number"
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>
        <div className="formElt">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <br />
        {!valid ? (
          <p className="validationText">Enter a Valid Credential</p>
        ) : null}
        <div className="btnLogin" onClick={login}>
          Login
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  storeUser: (data) => dispatch(storeUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
