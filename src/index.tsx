import App from "components/App.component";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ru from "antd/locale/ru_RU";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { faker } from "@faker-js/faker";

faker.setLocale("ru");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ConfigProvider locale={ru}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
