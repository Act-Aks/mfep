import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "con",
});

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={isLoggedIn} onSignOut={() => setIsLoggedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path={"/auth"}>
              <AuthLazy onSignIn={() => setIsLoggedIn(true)} />
            </Route>
            <Route path={"/"}>
              <MarketingLazy />
            </Route>
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
