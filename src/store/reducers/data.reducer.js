import {
  LOAD_QUIZ,
  LOAD_QUESTIONS,
  STORE_USER_ID,
} from "../actions/data.action";

const initialState = {
  // Auth
  userID: null,

  // QUIZ DATA
  quiz: [],
  quizID: null,
  questions: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_USER_ID:
      return {
        ...state,
        userID: action.payload,
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
      };
  }
  return state;
}
