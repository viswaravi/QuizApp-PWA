import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { loadQuiz, loadQuestions } from "../../store/actions/data.action";
import "./styles.css";
import { useHistory } from "react-router-dom";

const Quiz = (props) => {
  let history = useHistory();
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

  return (
    <div id="quizContainer">
      <h1>
        {" "}
        <img
          src={require("../../assets/images/quiz.png")}
          height={40}
          width={40}
          style={{ marginRight: "15px  " }}
        />{" "}
        Quiz
      </h1>
      <div className="ui cards">
        {props.quiz.length > 0 ? (
          props.quiz.map((quizData) => {
            return (
              <div className="ui card" key={quizData.id}>
                <div className="content">
                  <div className="header">
                    {quizData.image_url != null ? (
                      <Fragment>
                        <img
                          src={
                            "http://localhost:8000/static/" + quizData.image_url
                          }
                          alt="Couldn't load"
                          className="ui larger image"
                        />
                      </Fragment>
                    ) : null}
                    {quizData.name}
                  </div>
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
                <div className="extra content">
                  <button
                    className="ui medium primary button"
                    disabled={quizData["attended"] ? true : false}
                    onClick={() => {
                      if (!quizData["attended"]) {
                        props.loadQuestions(quizData);
                        history.push("/questions");
                      }
                    }}
                  >
                    {quizData.resume ? "Resume Quiz" : "Start Quiz"}
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
});

const mapDispatchToProps = (dispatch) => ({
  loadQuiz: () => dispatch(loadQuiz()),
  loadQuestions: (data) => dispatch(loadQuestions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
