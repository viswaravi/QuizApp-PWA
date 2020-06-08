import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import dataReducer from "./reducers/data.reducer";

// Session Management
import { sessionReducer } from "redux-react-session";
import { sessionService } from "redux-react-session";

const rootReducer = combineReducers({
  data: dataReducer,
  // Session Reducer
  session: sessionReducer,
});

const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const options = {
  refreshOnCheckAuth: true,
  redirectPath: "/welcome",
  driver: "INDEXEDDB",
};

// Initiate Session Service
sessionService
  .initSessionService(Store, options)
  .then(() =>
    console
      .log
      //   "Redux React Session is ready and a session was refreshed from your storage"
      ()
  )
  .catch(() =>
    console
      .log
      //  "Redux React Session is ready and there is no session in your storage"
      ()
  );

export default Store;
