import React, { useEffect, useState, Fragment } from "react";
import Quiz from "../quiz/index";
import Questions from "../question/index";
import Feedback from "../feedback/index";
import Leaderboard from "../leaderboard/index";
import Protected from "../protected-hoc/index";
import styles from "./styles.css";
import { logOutUser } from "../../store/actions/data.action";
import { connect } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Score from "../score/index";

const Home = (props) => {
  let history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (props.userID == null) {
      // history.replace("/");
    }
  }, [props.userID]);

  return (
    <div id="home">
      <div id="navBar">
        <div id="logo">
          <img src={require("../../assets/images/logo.jpeg")}  width="40" height="40"/>
        </div>
        <div>
          <label
            onClick={(e) => {
              setShowMenu(!showMenu);
              e.preventDefault();
            }}
          >
            <input type="checkbox" />
            <img src="https://img.icons8.com/cotton/40/000000/gender-neutral-user--v1.png" />
          </label>
        </div>
      </div>

      <div id="sideMenu" className={showMenu && "optionShow"}>
        <div
          className="menuOption"
          onClick={() => {
            history.replace("/");
            setShowMenu(false);
          }}
        >
          <img
            className="menuIcon"
            src={require("../../assets/images/home.png")}
          />
          <h2>Home</h2>{" "}
        </div>
        <div
          className="menuOption"
          onClick={() => {
            setShowMenu(false);
            history.replace("/leaderboard");
          }}
        >
          <img
            className="menuIcon"
            src={require("../../assets/images/leaderboard.png")}
          />
          <h2>Leaderboard</h2>{" "}
        </div>
        {/**
        <div className="menuOption">
          <img
            className="menuIcon"
            src={require("../../assets/images/feedback.png")}
          />
          <h2>Feedback</h2>{" "}
        </div>
        */}
        <div
          className="menuOption"
          onClick={() => {
            props.logOutUser();
          }}
        >
          <img
            className="menuIcon"
            src={require("../../assets/images/logout.png")}
          />
          <h2>Logout</h2>
        </div>
      </div>

      <Fragment>
        <Switch>
          <Route exact path="/" component={Quiz} />
          <Route exact path="/questions" component={Questions} />
          <Route exact path="/questions/score" component={Score} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/leaderboard/quiz" component={Leaderboard} />
          <Route exact path="/feedback" component={Feedback} />
        </Switch>
      </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userID: state.data.userID,
});

const mapDispatchToProps = (dispatch) => ({
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
