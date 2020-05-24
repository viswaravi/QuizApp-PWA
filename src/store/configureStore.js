import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import dataReducer from "./reducers/data.reducer";

const rootReducer = combineReducers({
  data: dataReducer,
});

const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default Store;
