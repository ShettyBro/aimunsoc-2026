import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import GlobalBackground from './components/layout/GlobalBackground';

// ── ScrollToTop — must live INSIDE Router to use useLocation ─────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// ── Protect /admin — redirect to login if no valid token ─────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/ad-login" replace />;
  }
  return <>{children}</>;
};

// ── Public layout (Navbar + Footer) with ScrollToTop inside ──────────────────
const PublicLayout: React.FC = () => (
  <div className="relative z-[1] min-h-screen flex flex-col">
    <ScrollToTop />
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
);

function App() {
  return (
    <Router>
      <GlobalBackground />
      <Routes>
        {/* ── Admin routes (no Navbar/Footer) ───── */}
        <Route path="/ad-login" element={<AdminLogin />} />
        <Route
          path="/ad"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ── Public routes (Navbar/Footer + ScrollToTop) ── */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
