import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddFood from './pages/AddFood/AddFood';
import ListFood from './pages/ListFood/ListFood';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  // const url = "https://fooddeliverybackend-29bk.onrender.com";
 const url = " http://localhost:4000";

  useEffect(() => {
    // Check if the token exists in localStorage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // After successful login, update the authentication state
    localStorage.setItem("token", "your-token"); // Save a token in localStorage
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Handle logout by clearing the token and updating the authentication state
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <ToastContainer />
      {isAuthenticated && <Navbar onLogout={handleLogout} />} {/* Pass handleLogout to Navbar */}
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/addfood" replace /> // Redirect to protected route if already logged in
            ) : (
              <Login onLogin={handleLogin} /> // Pass the login handler to Login component
            )
          }
        />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        {isAuthenticated && (
          <>
            <Route path="/addfood" element={<AddFood url={url} />} />
            <Route path="/listfood" element={<ListFood url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </>
        )}

        {/* Wildcard route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
