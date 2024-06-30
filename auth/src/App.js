import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

const generateClassName = createGenerateClassName({
  productionPrefix: "aut",
});

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route exact path="/auth/sign-in">
              <SignIn onSignIn={onSignIn} />
            </Route>
            <Route exact path="/auth/sign-up">
              <SignUp onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
