import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import axiosInstance from "../../api";
import { storeUser } from "../../store/actions/data.action";
import { connect } from "react-redux";

function Login(props) {
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
    console.log(roll, pass);

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
        console.log("Login SUCCESS :", response.data);

        if (response.data.password == true) {
          // Move to Quiz
          props.storeUser(response.data.user_id);
          props.history.replace("/quiz");
        } else {
          // Try Later
          setValid(false);
        }
      })
      .catch((error) => {
        console.log("Log In FAIL :", error);
      });
  };

  return (
    <div id="loginContainer">
      <br />
      <img
        src={require("../../assets/images/back.png")}
        width="20"
        height="27"
        id="backBtn"
        style={{ float: "left", marginBottom: "30%" }}
      />

      <h4 className="heading">Login</h4>
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
