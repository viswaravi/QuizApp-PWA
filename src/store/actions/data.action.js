import axiosInstance from "../../api";
import { sessionService } from "redux-react-session";

export const LOAD_QUIZ = "LOAD_QUIZ";
export const STORE_CURRENT_QUIZ = "STORE_CURRENT_QUIZ";

export const SUBMIT_QUIZ = "SUBMIT_QUIZ";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";

export const STORE_USER_ID = "STORE_USER_ID";
export const DELETE_USER_ID = "DELETE_USER_ID";

//Action Where the Business Logic is Present

export const storeUser = (uid) => (dispatch) => {
  dispatch({ type: STORE_USER_ID, payload: uid });
};

export const submitQuiz = (data) => (dispatch) => {
  console.log("SQ :", data.uid, data.qid);

  axiosInstance({
    method: "post",
    url: `answer/submit`,
    timeout: 5000,
    data: {
      answer: { user_id: data.uid, quiz_id: data.qid },
    },
  })
    .then((response) => {
      console.log("QUIZ SUBMIT SUCCESS :", response.data);
    })
    .catch((error) => {
      console.log("QUIZ SUBMIT FAIL :", error);
    });
};

export const logOutUser = () => (dispatch) => {
  sessionService.deleteUser().then(() => {
    dispatch({ type: DELETE_USER_ID });
  });
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

export const loadQuestions = (quizData) => (dispatch, getState) => {
  // console.log("Question ID :", quizData.id);

  dispatch({ type: STORE_CURRENT_QUIZ, payload: quizData });

  axiosInstance({
    method: "get",
    url: `questions/` + getState().data.userID + "/" + quizData.id,
    timeout: 5000,
  })
    .then((response) => {
      console.log("QUESTIONS FETCH SUCCESS :", response.data.question);

      dispatch({
        type: LOAD_QUESTIONS,
        payload: {
          questions: response.data.question,
          quizID: quizData.id,
          answered_questions_count: response.data.answered_questions_count,
        },
      });
    })
    .catch((error) => {
      console.log("QUESTION FETCH FAIL :", error);

      dispatch({ type: LOAD_QUESTIONS, payload: [] });
    });
};
