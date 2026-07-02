import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } }
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password, role || 'CUSTOMER');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 'clamp(80px, 10vh, 120px) 1rem 4rem 1rem' }}>
      
      {/* Parallax Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80" alt="Seller Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(253,251,250,0.9) 0%, rgba(253,251,250,0.7) 100%)', zIndex: -1 }}></div>

      <motion.div initial="hidden" animate="visible" variants={fadeUpItem} className="m3-card" style={{ 
        width: '100%', 
        maxWidth: '480px', 
        padding: 'clamp(2rem, 5vw, 3rem)',
        background: 'var(--md-sys-color-surface)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ width: '48px', height: '48px', background: 'var(--md-sys-color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--md-sys-color-on-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700 }}>S</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2, textAlign: 'center', color: 'var(--md-sys-color-on-background)' }}>
          Create Account
        </h1>
        <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          Join Smart Briqquetes today.
        </p>
        
        {error && <div style={{ background: 'var(--md-sys-color-error-container)', color: 'var(--md-sys-color-on-error-container)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', width: '100%', textAlign: 'center', border: '1px solid rgba(255,0,0,0.1)' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ 
                  height: '56px', padding: '0 1rem', 
                  background: 'var(--md-sys-color-surface-container)', 
                  border: '1px solid var(--md-sys-color-outline-variant)', 
                  borderRadius: '12px', color: 'var(--md-sys-color-on-surface)', 
                  fontSize: '1rem', outline: 'none', width: '100%',
                  fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline-variant)'}
              />

              <input 
                type="email" 
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  height: '56px', padding: '0 1rem', 
                  background: 'var(--md-sys-color-surface-container)', 
                  border: '1px solid var(--md-sys-color-outline-variant)', 
                  borderRadius: '12px', color: 'var(--md-sys-color-on-surface)', 
                  fontSize: '1rem', outline: 'none', width: '100%',
                  fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline-variant)'}
              />
              
              <input 
                type="password" 
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  height: '56px', padding: '0 1rem', 
                  background: 'var(--md-sys-color-surface-container)', 
                  border: '1px solid var(--md-sys-color-outline-variant)', 
                  borderRadius: '12px', color: 'var(--md-sys-color-on-surface)', 
                  fontSize: '1rem', outline: 'none', width: '100%',
                  fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline-variant)'}
              />

              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{ 
                  height: '56px', padding: '0 1rem', 
                  background: 'var(--md-sys-color-surface-container)', 
                  border: '1px solid var(--md-sys-color-outline-variant)', 
                  borderRadius: '12px', color: 'var(--md-sys-color-on-surface)', 
                  fontSize: '1rem', outline: 'none', width: '100%',
                  fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--md-sys-color-outline-variant)'}
              >
                <option value="" disabled>I am a...</option>
                <option value="CUSTOMER">Customer</option>
                <option value="SELLER">Seller</option>
              </select>
            </div>
          </motion.div>
          
          <button 
            type="submit" 
            className="btn-primary"
            style={{ 
              width: '100%', 
              height: '56px',
              fontSize: '1.1rem', 
              marginTop: '1rem'
            }}
          >
            Create Account
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--md-sys-color-primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </motion.div>

      <style>{`
        input::placeholder { color: var(--md-sys-color-on-surface-variant); opacity: 0.7; }
      `}</style>
    </div>
  );
}
