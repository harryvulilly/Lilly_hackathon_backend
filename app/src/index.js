import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import DefaultPage from "./components/DefaultPage";
import OwnerPage from "./components/OwnerPage";
import NewHirePage from "./components/NewHire/NewHirePage";
import TemplateHistory from "./components/NewHire/TemplateHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <DefaultPage />,
  },
  {
    path: "/home/owner",
    element: <OwnerPage />,
  },
  {
    path: "/home/new-hire",
    element: <NewHirePage />,
  },
  {
    path: "home/new-hire/templates",
    element: <TemplateHistory />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
