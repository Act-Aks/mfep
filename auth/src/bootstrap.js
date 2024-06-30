import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathname }) => {
      const { pathname: currentPathname } = history.location;

      if (currentPathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const rootDiv = document.querySelector("#auth-dev-root");

  if (rootDiv) {
    mount(rootDiv, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
