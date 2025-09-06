import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from './pages/login';
import Signup from './pages/singup';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from './pages/contact';
import Productdetailpage from './pages/productdetailpage';
import Profile from './pages/Profile';
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./pages/PrivateRoute";

const App = () => {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          {/* Public / Auth pages */}
          <Route path="/singup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected pages */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar />
                <Home />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <Navbar />
                <About />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Navbar />
                <Contact />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Navbar />
                <Profile />
                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <Productdetailpage />
                <Footer />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
