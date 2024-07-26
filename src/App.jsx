import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";
import { requireAuth } from "./common";
import { Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.HOME} element={requireAuth(Home)} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
