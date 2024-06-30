import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { createBrowserHistory } from "history";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "con",
});

const history = createBrowserHistory();

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={isLoggedIn} onSignOut={() => setIsLoggedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path={"/auth"}>
              <AuthLazy onSignIn={() => setIsLoggedIn(true)} />
            </Route>
            <Route path={"/dashboard"}>
              {!isLoggedIn && <Redirect to="/" />}
              <DashboardLazy />
            </Route>
            <Route path={"/"} component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
