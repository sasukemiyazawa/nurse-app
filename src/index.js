import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import App from "./App";
import Ga from "./Ga";
import Result from "./Result";

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Sans JP"],
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Link to={"suchi"}>数値解析(閉鎖中)</Link>,
      <Link to={"ga"}>遺伝的アルゴリズム</Link>
    </>
  },
  // {
  //   path: "/suchi",
  //   element: <App />
  // },
  {
    path: "/ga",
    element: <Ga />
  },
  {
    path: "/ga/result",
    element: <Result />
  }
])
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>

    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
