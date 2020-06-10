import React, { useEffect, useState, Fragment } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const Score = (props) => {
  let history = useHistory();

  return (
    <div id="scoreContainer">
      <img
        src={require("../../assets/images/score.png")}
        width="300"
        height="316"
      />
      <div>Answers's Submitted</div>
      <div>
        Your Score : {props.score}/{props.quizData["total_mark"]}
        {/** */}
      </div>
      <div>
        Your have {props.pass?'Passed':'Failed'} the Quiz
        {/** */}
      </div>
      <div></div>

      <button
        className="ui medium primary button"
        onClick={() => {
          history.replace("/leaderboard/quiz");
        }}
      >
        Check Quiz LeaderBoard
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  score: state.data.score,
  pass: state.data.pass,
  quizData: state.data.quizData,
});

export default connect(mapStateToProps, null)(Score);
