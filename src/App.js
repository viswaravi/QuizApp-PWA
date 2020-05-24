import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import "./App.css";
import Store from "./store/configureStore";
import Quiz from "./components/quiz/index";
import "semantic-ui-css/semantic.min.css";
import { Route, Switch } from "react-router-dom";
import Questions from "./components/question/index";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import Welcome from "./components/welcome";

const App = () => {
  return (
    <Provider store={Store}>
      <div id="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/questions" component={Questions} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/" component={Welcome} />
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
