import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupScreen from "./screens/SignupScreen";
import LoginPage from "./screens/LoginPage";
import Home from "./screens/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Navigation from "./screens/Navigation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Navigation/></ProtectedRoute>} />
        <Route path="/signin" element={<SignupScreen />} />
        <Route path="/login" element={<LoginPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
