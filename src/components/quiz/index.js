import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadQuiz, loadQuestions } from "../../store/actions/data.action";
import "./styles.css";

const Quiz = (props) => {
  const [Quiz, setQuiz] = useState([]);

  /**
   * [
    {
      id: 1,
      name: "Sports Quiz",
      description: "Sports related",
      domain_name: "Sports",
      no_of_questions: 10,
      no_of_answers_to_display: 5,
      pass_mark: 60,
      time: 60,
      hardness: "ADVANCE",
    },
    {
      id: 1,
      name: "Science Quiz",
      description: "Science related",
      domain_name: "Sports",
      no_of_questions: 10,
      no_of_answers_to_display: 5,
      pass_mark: 60,
      time: 60,
      hardness: "ADVANCE",
    },
  ]
   */
  useEffect(() => {
    props.loadQuiz();
  }, []);

  useEffect(() => {
    if (props.quiz.length > 0) {
      console.log(props.quiz);
    }
  }, [props.quiz]);

  return (
    <div id="quizContainer">
      <h1>Select a Quiz to Attend</h1>
      <div className="ui cards">
        {props.quiz.length > 0 ? (
          props.quiz.map((quizData) => {
            return (
              <div className="ui card" key={quizData.id}>
                <div className="content">
                  <div className="header">{quizData.name}</div>
                  <div className="meta">{quizData.hardness}</div>
                  <div className="description">
                    <div className="quizDetail">{quizData.description}</div>
                    <div className="quizDetail">
                      <span
                        className="quizDetail"
                        style={{ fontWeight: "bold" }}
                      >
                        {quizData.no_of_questions}
                      </span>{" "}
                      Questions
                    </div>
                    <div className="quizDetail">
                      <span
                        className="quizDetail"
                        style={{ fontWeight: "bold" }}
                      >
                        {quizData.time}
                      </span>{" "}
                      Mins
                    </div>
                  </div>
                </div>
                <div class="extra content">
                  <button
                    className="ui medium primary button"
                    onClick={() => {
                      props.loadQuestions(quizData.id);
                      props.history.push("/questions");
                    }}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Quiz to Show</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quiz: state.data.quiz,
  userID: state.data.userID,
});

const mapDispatchToProps = (dispatch) => ({
  loadQuiz: () => dispatch(loadQuiz()),
  loadQuestions: (data) => dispatch(loadQuestions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
