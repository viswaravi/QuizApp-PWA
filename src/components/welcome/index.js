import React, { useEffect } from "react";
import "./styles.css";

const Welcome = (props) => {
  return (
    <div id="homeContainer">
      <div id="clubHead">
        <div>
          Literary Association <br /> And Tamil Mandram
        </div>
        <p>presents</p>
      </div>
      <div id="appName">
        <div>Quiz Up</div>
        <br />
        <p>The Lockdown Quiz</p>
      </div>
      <div id="welcome">
        <p>
          Welcome to <b> QuizUp.</b>
        </p>
        <div className="btnOption dm">Discover More</div>
        <div
          className="btnOption ca"
          onClick={() => {
            props.history.push("/register");
          }}
        >
          Create Account
        </div>
        <div id="login">
          Have an account already?{" "}
          <a
            onClick={() => {
              props.history.push("/login");
            }}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
