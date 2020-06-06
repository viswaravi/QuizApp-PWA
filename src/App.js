import React, { useEffect } from "react";
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
import Protected from "./components/protected-hoc";
import Home from "./components/home/index";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

const App = () => {
  return (
    <Provider store={Store}>
      <div id="App">
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Protected path="/" component={Home} />
        </Switch>
        {/**
          <Protected exact path="/quiz" component={Quiz} />
          <Protected exact path="/questions" component={Questions} />
         */}
      </div>
    </Provider>
  );
};

export default App;
