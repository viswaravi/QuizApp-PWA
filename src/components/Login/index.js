import React, { useState, useEffect } from "react";
import "./styles.css";
import axiosInstance from "../../api";

function Login() {
  const [pass, setPass] = useState(null);
  const [roll, setRoll] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (pass && roll) {
      setIsEnabled(true);
    }
  }, [pass, roll]);

  const login = () => {
    axiosInstance({
      method: "get",
      url: `user`,
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
        } else {
          // Try Later
        }
      })
      .catch((error) => {
        console.log("Log In FAIL :", error);
      });
  };

  return (
    <div id="loginContainer">
      <form>
        <h4 className="heading">Login</h4>
        <br />
        <div className="formElt">
          <input
            type="text"
            placeholder="Roll number"
           // onChange={(e) => setRoll(e.target.value)}
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
        <div className="btnLogin" onClick={login} >
          Login
        </div>
      </form>
    </div>
  );
}
export default Login;
