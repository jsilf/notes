import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { Posts } from "./components/Posts";
import { EditPost } from "./components/EditPost";
import { AddPost } from "./components/AddPost";
import { LoggedIn } from "./components/LoggedIn";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/loggedin/:id" element={<LoggedIn />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/posts/add/:id" element={<AddPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
