import React, { useEffect, useState, useRef, Fragment } from "react";
import { connect } from "react-redux";
import Slider from "react-animated-slider";
import "./styles.css";
import "react-animated-slider/build/horizontal.css";
import axiosInstance from "../../api";
import { useHistory } from "react-router-dom";
import {
  submitQuiz,
  loadQuizLeaderboard,
} from "../../store/actions/data.action";

const Questions = (props) => {
  let history = useHistory();
  const [questionIndex, setquestionIndex] = useState(0);
  const [answerDetails, setAnswerDetails] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionsToAnswer, setQuestionsToAnswer] = useState([]);
  const [dispQuestions, setDispQuestions] = useState([]);

  const img_base_url =
    "http://mepcoquizapp.southeastasia.cloudapp.azure.com:8000/static/";

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (props.questions.length > 0) {
      //  console.log(props.questions);

      // Set Questions to Answer
      getQuestionsLimited();

      startTimer();
      // Watch for BackAction and Clear Timer
      history.listen((location) => {
        if (location.pathname == "/home") {
          clearTimer();
        }
      });
    } else {
      // setTimeout(goBack, 2000);
    }
  }, [props.questions]);

  const goBack = () => {
    history.goBack();
  };

  const getQuestionsLimited = () => {
    let qIndexes = [];
    let num = 0;
    let valid = false;

    for (
      let i = 0;
      i <
      props.quizData["no_of_answers_to_display"] -
        props.answered_questions_count;
      i++
    ) {
      valid = false;

      while (!valid) {
        num = getRandomIndex();
        if (!qIndexes.includes(num)) {
          qIndexes.push(num);
          valid = true;
        }
      }
    }

    let qs = [];
    qIndexes.map((qIx) => {
      qs.push(props.questions[qIx]);
    });

    // Set the Limited Question to Display
    setDispQuestions(qs);

    // Set IDS of that Questions
    let ids = [];
    qs.map((question) => {
      ids.push(question.id);
    });
    setQuestionsToAnswer(ids);
  };

  const getRandomIndex = () => {
    // Gen Random Number between 0 and N
    // N - Number of questions
    return Math.round(Math.random() * (props.questions.length - 1));
  };

  const startTimer = () => {
    const quizTotalTime = props.quizData.time * 60;
    const time_per_question =
      quizTotalTime / props.quizData.no_of_answers_to_display;
    const no_questions_to_answer =
      props.quizData.no_of_answers_to_display - props.answered_questions_count;

    const time_to_answer = no_questions_to_answer * time_per_question;

    console.log(
      quizTotalTime,
      time_per_question,
      no_questions_to_answer,
      time_to_answer
    );

    // Start the Timer
    setTimeLeft(time_to_answer);
  };

  // TImer
  useEffect(() => {
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  }, [timeLeft]);

  const clearTimer = () => {
    // Stop Timer
    setTimeLeft(0);
  };

  const nextQuestion = () => {
    if (questionIndex < dispQuestions.length - 1) {
      setAnswerDetails([]);
      setquestionIndex(questionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setAnswerDetails([]);
      setquestionIndex(questionIndex - 1);
    }
  };

  const optionSelectHandler = (qid, aid, qtype) => {
    if (qtype == "SINGLECHOICE") {
      setAnswerDetails([
        {
          user_id: props.userID,
          quiz_id: props.quizID,
          question_id: qid,
          answer_id: aid,
        },
      ]);
    } else if (qtype == "MULTIPLECHOICE") {
      let details = answerDetails;
      if (
        answerDetails.find((answerDetail, index) => {
          if (answerDetail.answer_id == aid) {
            details.splice(index, 1);
            return true;
          }
        })
      ) {
        //   console.log("Removed");
      } else {
        details.push({
          user_id: props.userID,
          quiz_id: props.quizID,
          question_id: qid,
          answer_id: aid,
        });
        //   console.log("Added");
      }
      // console.log(details);
      setAnswerDetails([...details]);
    }
  };

  const isSelected = (aid) => {
    // console.log("Answer Details :", answerDetails);
    let presence = false;
    answerDetails.map((answerDetail) => {
      if (answerDetail.answer_id == aid) {
        //     console.log(aid, "True");
        presence = true;
      }
    });
    // console.log(aid, "False");
    return presence;
  };

  const submitQuestion = () => {
    if (answerDetails.length > 0) {
      axiosInstance({
        method: "post",
        url: `answer`,
        timeout: 5000,
        data: {
          answer: answerDetails,
        },
      })
        .then((response) => {
          const qid = dispQuestions[questionIndex].id;

          // Remove answered Quetions
          let qids = questionsToAnswer;

          if (qids.includes(qid)) {
            qids.splice(qids.indexOf(qid), 1);
          }

          if (qids.length == 0) {
            // Submit Quiz Finish

            props.submitQuiz({ uid: props.userID, qid: props.quizID });

            history.replace("/questions/score");
          } else if (qids.length > 0) {
            setQuestionsToAnswer(qids);
            nextQuestion();
          }
        })
        .catch((error) => {
         // console.log("Question Submit Fail :", error);
        });
    }
  };

  const isAnswerImage = (answer) => {
    if (Object.keys(answer).includes("answer_image_name")) {
      if (answer["answer_image_name"] != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <div id="questionContainer">
      <div id="questionHeaderInfo">
        <div>
          {" "}
          <h3 style={{ marginRight: 20 }}>Questions</h3>
          <h1>{questionIndex + 1}</h1>
          <h3>/{dispQuestions.length}</h3>
        </div>
        <div>
          <h4 id="timer" className={timeLeft < 300 ? "dangerTime" : "safeTime"}>
            {Math.round(timeLeft / 60) + "m   "}
            {Math.round(timeLeft % 60) + "s"}
          </h4>
        </div>
      </div>
      {dispQuestions.length > 0 ? (
        <div key={questionIndex}>
          <div className="question">
            <h3> {dispQuestions[questionIndex]["question_text"]}</h3>
            <br />
            {dispQuestions[questionIndex]["question_image_name"] != null ? (
              <img
                className="qImage"
                src={
                  img_base_url +
                  dispQuestions[questionIndex]["question_image_name"]
                }
              />
            ) : null}
          </div>
          <div className="answerContainer">
            {dispQuestions[questionIndex].question_type == "SINGLECHOICE" ? (
              <Fragment>
                {dispQuestions[questionIndex].answers.map((answer, aindex) => {
                  return (
                    <label
                      className="propContainer radioContainer"
                      style={
                        isSelected(answer["id"])
                          ? { backgroundColor: "#FF9665", color: "white" }
                          : null
                      }
                      key={answer["answer_text"]}
                    >
                      {isAnswerImage(answer) ? (
                        <img
                          className="aImage"
                          src={img_base_url + answer["answer_image_name"]}
                        />
                      ) : null}
                      {answer["answer_text"]}
                      <input
                        type="radio"
                        value={answer["answer_text"]}
                        name={dispQuestions[questionIndex]["question_text"]}
                        onChange={() => {
                          optionSelectHandler(
                            dispQuestions[questionIndex].id,
                            answer["id"],
                            "SINGLECHOICE"
                          );
                        }}
                      />
                      <span className="customCheck"></span>
                    </label>
                  );
                })}
              </Fragment>
            ) : (
              // Check Box
              <Fragment>
                {dispQuestions[questionIndex].answers.map((answer, aindex) => {
                  return (
                    <Fragment>
                      <label
                        className="propContainer checkContainer"
                        style={
                          isSelected(answer["id"])
                            ? {
                                backgroundColor: "#FF9665",
                                color: "white",
                              }
                            : null
                        }
                        key={answer["answer_text"]}
                      >
                        {isAnswerImage(answer) ? (
                          <img
                            className="aImage"
                            src={img_base_url + answer["answer_image_name"]}
                          />
                        ) : null}
                        {answer["answer_text"]}
                        <input
                          type="checkbox"
                          value={answer["answer_text"]}
                          name={dispQuestions[questionIndex]["question_text"]}
                          onChange={() => {
                            optionSelectHandler(
                              dispQuestions[questionIndex].id,
                              answer["id"],
                              "MULTIPLECHOICE"
                            );
                          }}
                        />
                        <span className="customCheck"></span>
                      </label>
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          </div>
          <div className="btnContainer">
            <img
              src={require("../../assets/images/back.png")}
              alt="Loading..."
              width="20px"
              height="40px"
              onClick={prevQuestion}
            />
            <button
              className="ui medium green button submitBtn"
              onClick={submitQuestion}
            >
              Submit
            </button>
            <img
              src={require("../../assets/images/next.png")}
              alt="Loading..."
              width="20px"
              height="40px"
              onClick={nextQuestion}
            />
          </div>
        </div>
      ) : (
        <div className="ui active transition visible inverted dimmer">
          <div className="content">
            <div className="ui inverted text loader"> Loading</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.data.questions,
  quizID: state.data.quizID,
  userID: state.data.userID,
  quizData: state.data.quizData,
  answered_questions_count: state.data.answered_questions_count,
});

const mapDispatchToProps = (dispatch) => ({
  submitQuiz: (data) => dispatch(submitQuiz(data)),
  loadQuizLeaderboard: (data) => dispatch(loadQuizLeaderboard(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
