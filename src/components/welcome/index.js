import React, { useEffect, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import "./styles.css";
import Particles from "react-particles-js";
import { sessionService } from "redux-react-session";
import { storeUser } from "../../store/actions/data.action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Welcome = (props) => {
  let history = useHistory();
  useEffect(() => {
    sessionService
      .loadUser()
      .then((currentUser) => {
        props.storeUser(currentUser);
        if (currentUser) {
          history.replace("/");
        }
      })
      .catch((err) =>{
       //console.log(err)
      });
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  return (
    <div id="homeContainer">
      <div id="clubHead">
        {isDesktopOrLaptop ? (
          <Fragment>
            Literary Association And Tamil Mandram
            <p>presents</p>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              Literary Association <br /> And Tamil Mandram
            </div>
            <p>presents</p>
          </Fragment>
        )}
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
            history.push("/register");
          }}
        >
          Create Account
        </div>
        <div id="login">
          Have an account already?{" "}
          <a
            onClick={() => {
              history.push("/login");
            }}
          >
            <b> Log in</b>
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  storeUser: (data) => dispatch(storeUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
