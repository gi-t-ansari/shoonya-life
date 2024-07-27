import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_URL } from "./config";
import { requireAuth } from "./common";
import { Home, RetreatDetails } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_URL.HOME} element={requireAuth(Home)} />
        <Route
          path={APP_URL.RETREAT_DETAILS}
          element={requireAuth(RetreatDetails)}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
