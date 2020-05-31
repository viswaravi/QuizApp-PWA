import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import dataReducer from "./reducers/data.reducer";

// Session Management
import { sessionReducer } from "redux-react-session";
import { sessionService } from 'redux-react-session';

const rootReducer = combineReducers({
  data: dataReducer,
  // Session Reducer
  session: sessionReducer,
});

const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Initiate Session Service
sessionService.initSessionService(Store);

export default Store;
