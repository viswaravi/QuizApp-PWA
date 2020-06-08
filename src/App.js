import React, { useEffect } from "react";
import { Provider } from "react-redux";
import "./App.css";
import Store from "./store/configureStore";
import "semantic-ui-css/semantic.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import Welcome from "./components/welcome";
import Protected from "./components/protected-hoc";
import Home from "./components/home/index";

const App = (props) => {
  return (
    <Provider store={Store}>
      <div id="App">
        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Protected path="/" component={Home} />
          <Route path="*">
            <Redirect
              to={{
                pathname: "/welcome", // Redirect to Welcome Page
                state: {
                  from: props.location,
                },
              }}
            />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
};

export default App;
