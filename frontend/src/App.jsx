import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

