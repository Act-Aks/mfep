import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (el) => {
  const app = createApp(Dashboard);

  app.mount(el);
};

if (process.env.NODE_ENV === "development") {
  const rootDiv = document.querySelector("#dashboard-dev-root");

  if (rootDiv) {
    mount(rootDiv);
  }
}

export { mount };
