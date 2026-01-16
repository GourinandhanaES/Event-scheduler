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
      <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
        <Navbar />
            <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
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
            </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

