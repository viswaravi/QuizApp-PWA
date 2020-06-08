import {
  LOAD_QUIZ,
  LOAD_QUESTIONS,
  STORE_USER_ID,
  DELETE_USER_ID,
  STORE_CURRENT_QUIZ,
  LOAD_QUIZ_LEADERBOARD,
  LOAD_LEADERBOARD,
  SUBMIT_QUIZ,
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

  // LeaderBoard
  leaderBoard: {},
  score: 0,
  /**
   * {
    "leaderboard": [
        {
            "first_name": "Viswa",
            "last_name": "Ravichandran",
            "year": "Fourth",
            "department": "IT",
            "section": "A",
            "score": 8.0,
            "quizzes_attended": 2,
            "is_current_user": true
        },
        {
            "first_name": "Kalathiappan",
            "last_name": "Viswanathan",
            "year": "Fourth",
            "department": "CSE",
            "section": "B",
            "score": 4.0,
            "quizzes_attended": 1,
            "is_current_user": false
        }
    ],
    "user": {
        "rank": 1,
        "first_name": "Viswa",
        "last_name": "Ravichandran",
        "year": "Fourth",
        "department": "IT",
        "section": "A",
        "score": 8.0,
        "quizzes_attended": 2
    }
}
   */
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
    case LOAD_QUIZ_LEADERBOARD:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case LOAD_LEADERBOARD:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case SUBMIT_QUIZ:
      return {
        ...state,
        score: action.payload,
      };
  }
  return state;
}
