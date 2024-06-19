import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import DashboardPage from "./pages/dashboard/index";
import ProtectedRoute from "./components/Auth/protectedRoute";
import AddCarPage from "./pages/dashboard/addCar";
import UpdateCarPage from "./pages/dashboard/updateCar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/cars/add" element={<AddCarPage />} />
                <Route path="/dashboard/cars/update/:id" element={<UpdateCarPage />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
