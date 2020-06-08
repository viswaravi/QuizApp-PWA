import React, { useState, useEffect } from "react";
import "./styles.css";
import axiosInstance from "../../api";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadLeaderboard,
  loadQuizLeaderboard,
} from "../../store/actions/data.action";
function Leaderboard(props) {
  let history = useHistory();
  let location = useLocation();
  // Render Table

  const [info, setInfo] = useState([]);

  useEffect(() => {
    // Load OverAll LeaderBaoard

    if (location.pathname == "/leaderboard") {
      props.loadLeaderboard(props.userID);
    } else if (location.pathname == "/leaderboard/quiz") {
      props.loadQuizLeaderboard({ uid: props.userID, qid: props.quizID });
    }
  }, []);

  useEffect(() => {
    //   console.log(props.leaderBoard);
    if (Object.keys(props.leaderBoard).length > 0) {
      if (props.leaderBoard["leaderboard"].length > 0) {
        setInfo(props.leaderBoard["leaderboard"]);
      }
    }
  }, [props.leaderBoard]);

  const renderCurrentRows = () => {
    if (info.length > 0) {
      return info.map((details, index) => {
        const {
          first_name,
          year,
          score,
          is_current_user,
          department,
        } = details;
        // console.log(details);
        return (
          <tr className={is_current_user ? "userActive" : ""}>
            <td>{index + 1} </td>
            <td>{first_name}</td>
            <td>{year}</td>
            <td>{department}</td>
            <td> {score} </td>
          </tr>
        );
      });
    }
  };
  return (
    <div>
      <div className="container">
        <span className="pageheading">{location.pathname == "/leaderboard"?'LeaderBoard':'Quiz LeaderBoard'} </span>
      </div>
      <br />
      <div id="tableContainer">
        <table class="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Year</th>
              <th>Department</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {renderCurrentRows()}
            {props.leaderBoard["user"] != null ? (
              <tr className={"userActive"}>
                <td>{props.leaderBoard["user"]["rank"]} </td>
                <td>{props.leaderBoard["user"]["first_name"]}</td>
                <td>{props.leaderBoard["user"]["year"]}</td>
                <td> {props.leaderBoard["user"]["department"]} </td>
                <td> {props.leaderBoard["user"]["score"]} </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  leaderBoard: state.data.leaderBoard,
  userID: state.data.userID,
  quizID: state.data.quizID,
});

const mapDispatchToProps = (dispatch) => ({
  loadLeaderboard: (data) => dispatch(loadLeaderboard(data)),
  loadQuizLeaderboard: (data) => dispatch(loadQuizLeaderboard(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
