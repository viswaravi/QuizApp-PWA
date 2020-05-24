import { LOAD_QUIZ, LOAD_QUESTIONS } from "../actions/data.action";

const initialState = {
  // QUIZ DATA
  quiz: [],
  questions: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_QUIZ:
      return {
        ...state,
        quiz: action.payload,
      };
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
  }
  return state;
}
