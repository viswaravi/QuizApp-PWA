import axiosInstance from "../../api";

export const LOAD_QUIZ = "LOAD_QUIZ";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";

//Action Where the Business Logic is Present
export const loadQuiz = () => (dispatch) => {
  axiosInstance({
    method: "get",
    url: `quiz`,
    timeout: 5000,
  })
    .then((response) => {
      console.log("QUIZ FETCH SUCCESS :", response.data.quiz);

      dispatch({ type: LOAD_QUIZ, payload: response.data.quiz });
    })
    .catch((error) => {
      console.log("QUIZ FETCH FAIL :", error);

      dispatch({ type: LOAD_QUIZ, payload: [] });
    });
};

export const loadQuestions = (qid) => (dispatch) => {
  console.log("Question ID :", qid);
  axiosInstance({
    method: "get",
    url: `questions/` + qid,
    timeout: 5000,
  })
    .then((response) => {
      console.log("QUESTIONS FETCH SUCCESS :", response.data.question);

      dispatch({ type: LOAD_QUESTIONS, payload: response.data.question });
    })
    .catch((error) => {
      console.log("QUESTION FETCH FAIL :", error);

      dispatch({ type: LOAD_QUESTIONS, payload: [] });
    });
};
