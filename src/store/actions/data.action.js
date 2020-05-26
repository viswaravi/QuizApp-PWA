import axiosInstance from "../../api";

export const LOAD_QUIZ = "LOAD_QUIZ";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";

export const STORE_USER_ID = "STORE_USER_ID";

//Action Where the Business Logic is Present

export const storeUser = (uid) => (dispatch) => {
  dispatch({ type: STORE_USER_ID, payload: uid });
};

export const loadQuiz = (uid) => (dispatch, getState) => {
  axiosInstance({
    method: "get",
    url: `quiz/` + getState().data.userID,
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

export const loadQuestions = (qid) => (dispatch, getState) => {
  console.log("Question ID :", qid);
  axiosInstance({
    method: "get",
    url: `questions/` + getState().data.userID + "/" + qid,
    timeout: 5000,
  })
    .then((response) => {
      console.log("QUESTIONS FETCH SUCCESS :", response.data.question);

      dispatch({
        type: LOAD_QUESTIONS,
        payload: { questions: response.data.question, quizID: qid },
      });
    })
    .catch((error) => {
      console.log("QUESTION FETCH FAIL :", error);

      dispatch({ type: LOAD_QUESTIONS, payload: [] });
    });
};
