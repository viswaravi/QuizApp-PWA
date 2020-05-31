import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Slider from "react-animated-slider";
import "./styles.css";
import "react-animated-slider/build/horizontal.css";
import axiosInstance from "../../api";

const Questions = (props) => {
  const [questionIndex, setquestionIndex] = useState(0);
  const [answerDetails, setAnswerDetails] = useState([]);

  useEffect(() => {
    if (props.questions.length > 0) {
      console.log(props.questions);
    }
  }, [props.questions]);

  const nextQuestion = () => {
    if (questionIndex < props.questions.length - 1) {
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
      console.log(answerDetails);
      axiosInstance({
        method: "post",
        url: `answer`,
        timeout: 5000,
        data: {
          answer: answerDetails,
        },
      })
        .then((response) => {
          console.log("Question Submitted:", response.data);
        })
        .catch((error) => {
          console.log("Question Submit Fail :", error);
        });
    }
  };

  return (
    <div id="questionContainer">
      {props.questions.length > 0 ? (
        <div key={questionIndex}>
          <div className="question">
            <h1> {props.questions[questionIndex]["question_text"]}</h1>
            <br />
          </div>
          <div className="answerContainer">
            {props.questions[questionIndex].question_type == "SINGLECHOICE" ? (
              <div>
                {props.questions[questionIndex].answers.map(
                  (answer, aindex) => {
                    return (
                      <label
                        className="propContainer radioContainer"
                        style={
                          isSelected(answer["id"])
                            ? { borderColor: "#0288d1" }
                            : null
                        }
                        key={answer["answer_text"]}
                      >
                        {answer["answer_text"]}
                        <input
                          type="radio"
                          value={answer["answer_text"]}
                          name={props.questions[questionIndex]["question_text"]}
                          onChange={() => {
                            optionSelectHandler(
                              props.questions[questionIndex].id,
                              answer["id"],
                              "SINGLECHOICE"
                            );
                          }}
                        />
                        <span className="customCheck"></span>
                      </label>
                    );
                  }
                )}
              </div>
            ) : (
              // Check Box
              <div>
                {props.questions[questionIndex].answers.map(
                  (answer, aindex) => {
                    return (
                      <div>
                        <label
                          className="propContainer checkContainer"
                          style={
                            isSelected(answer["id"])
                              ? {
                                  borderColor: "#0288d1",
                                  backgroundColor: "#eeeeee !important",
                                }
                              : null
                          }
                          key={answer["answer_text"]}
                        >
                          {answer["answer_text"]}
                          <input
                            type="checkbox"
                            value={answer["answer_text"]}
                            name={
                              props.questions[questionIndex]["question_text"]
                            }
                            onChange={() => {
                              optionSelectHandler(
                                props.questions[questionIndex].id,
                                answer["id"],
                                "MULTIPLECHOICE"
                              );
                            }}
                          />
                          <span className="customCheck"></span>
                        </label>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
          <div className="btnContainer">
            <img
              src={require("../../assets/images/back.png")}
              alt="Loading..."
              width="6%"
              height="10%"
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
              width="6%"
              height="10%"
              onClick={nextQuestion}
            />
          </div>
        </div>
      ) : (
        <div class="ui active transition visible inverted dimmer">
          <div class="content">
            <div class="ui inverted text loader">Loading</div>
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
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
