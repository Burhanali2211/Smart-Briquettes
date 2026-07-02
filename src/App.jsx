import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home as HomeIcon, Compass, ShoppingBag, User } from 'lucide-react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import SmoothScroll from './components/SmoothScroll';

function ScrollToTopEffect() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { pathname } = useLocation();
  const hideNavbar = ['/checkout', '/login', '/register'].includes(pathname) || pathname.startsWith('/dashboard');
  const hideFooter = hideNavbar || pathname === '/';

  return (
    <AuthProvider>
      <CartProvider>
        <SmoothScroll>
          <ScrollToTopEffect />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
          {!hideNavbar && <Navbar />}

          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </div>

          {!hideFooter && (
            <footer style={{ padding: '6rem 0 3rem 0', position: 'relative', overflow: 'hidden', background: '#fff', borderTop: '1px solid #eaeaea' }}>
              <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

                  {/* Brand Column */}
                  <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: '1 / -1', maxWidth: '400px', marginBottom: '2rem' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 10vw, 2.5rem)', fontWeight: 800, color: 'var(--brand-rust-dark)', letterSpacing: '-1px' }}>
                      Smart briquettes.
                    </div>
                    <p style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-muted)' }}>
                      Your trusted platform to buy and sell sustainable, high-quality briquettes online.
                    </p>
                  </motion.div>

                  {/* Links Columns */}
                  <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div className="overline-text" style={{ color: 'var(--text-main)' }}>Platform</div>
                    <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Marketplace</Link>
                    <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Become a Seller</Link>
                  </motion.div>

                  <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div className="overline-text" style={{ color: 'var(--text-main)' }}>Company</div>
                    <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Our Story</Link>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Contact Support</a>
                  </motion.div>

                  <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div className="overline-text" style={{ color: 'var(--text-main)' }}>Legal</div>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Terms of Service</a>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Refund Policy</a>
                  </motion.div>

                </motion.div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  <div>© 2026 Smart briquettes. All Rights Reserved.</div>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                    <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Right Blue Splash */}
              <div style={{
                position: 'absolute',
                bottom: '-150px',
                right: '5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, rgba(147, 197, 253, 0) 60%)',
                filter: 'blur(25px)',
                borderRadius: '50%',
                zIndex: 1
              }}></div>
            </footer>
          )}

          {!hideNavbar && (
            <nav className="m3-bottom-nav">
              <Link to="/" className="m3-nav-item active">
                <div className="m3-nav-icon-container">
                  <HomeIcon size={24} />
                </div>
                <span className="m3-nav-label">Home</span>
              </Link>
              <Link to="/about" className="m3-nav-item">
                <div className="m3-nav-icon-container">
                  <Compass size={24} />
                </div>
                <span className="m3-nav-label">About</span>
              </Link>
              <Link to="/checkout" className="m3-nav-item">
                <div className="m3-nav-icon-container">
                  <ShoppingBag size={24} />
                </div>
                <span className="m3-nav-label">Cart</span>
              </Link>
              <Link to="/login" className="m3-nav-item">
                <div className="m3-nav-icon-container">
                  <User size={24} />
                </div>
                <span className="m3-nav-label">Profile</span>
              </Link>
            </nav>
          )}
        </div>
        </SmoothScroll>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
