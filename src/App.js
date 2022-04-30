import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Survey from "./components/Survey";
import Welcome from "./components/Welcome";

import { useAuth } from "./context/UserContext";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/survey"
          element={
            <ProtectedRoute user={user}>
              <Survey />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
