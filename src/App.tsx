import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import JoinAIMUNSOC from './pages/JoinAIMUNSOC';
import Committees from './pages/Committees';
import Register from './pages/Register';
import Board from './pages/Board';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { isLoggedIn } from './utils/auth';

// ── Protect /admin — redirect to login if no valid token ─────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Admin routes (no Navbar/Footer) ───── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ── Public routes (with Navbar/Footer) ── */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-navy flex flex-col">
              <Navbar />
              <main className="flex-1 pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/join" element={<JoinAIMUNSOC />} />
                  <Route path="/committees" element={<Committees />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/board" element={<Board />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
