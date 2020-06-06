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
        <div id="logo"></div>
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
        <div className="menuOption">
          <img
            className="menuIcon"
            src={require("../../assets/images/leaderboard.png")}
          />
          <h2>Leaderboard</h2>{" "}
        </div>
        <div className="menuOption">
          <img
            className="menuIcon"
            src={require("../../assets/images/feedback.png")}
          />
          <h2>Feedback</h2>{" "}
        </div>
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
          <Route path="/questions" component={Questions} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/feedback" component={Feedback} />
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
