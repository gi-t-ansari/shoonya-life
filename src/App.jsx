import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";
import { Layout } from "./common";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.HOME} element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
