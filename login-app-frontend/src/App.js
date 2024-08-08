import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome";
import SlideNavbar from "./Components/Signup";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SlideNavbar />} />
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
