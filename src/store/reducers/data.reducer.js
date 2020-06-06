import {
  LOAD_QUIZ,
  LOAD_QUESTIONS,
  STORE_USER_ID,
  DELETE_USER_ID,
  STORE_CURRENT_QUIZ,
} from "../actions/data.action";

const initialState = {
  // Auth
  userID: null,

  // QUIZ DATA
  quiz: [],
  questions: [],

  // Current Data
  quizID: null,
  quizData: {},
  answered_questions_count: 0,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case DELETE_USER_ID:
      return {
        ...state,
        userID: null,
      };
    case LOAD_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        quizID: action.payload.quizID,
        answered_questions_count: action.payload.answered_questions_count,
      };
    case STORE_CURRENT_QUIZ:
      return {
        ...state,
        quizData: action.payload,
      };
  }
  return state;
}
