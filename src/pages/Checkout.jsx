import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const inputStyle = (focused) => ({
  width: '100%',
  padding: '1rem',
  border: `1.5px solid ${focused ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)'}`,
  borderRadius: '12px',
  fontSize: '1rem',
  fontFamily: 'var(--font-sans)',
  background: 'var(--md-sys-color-surface)',
  color: 'var(--md-sys-color-on-surface)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
});

const Label = ({ children }) => (
  <span style={{
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--md-sys-color-on-surface-variant)',
    marginBottom: '0.4rem',
    fontFamily: 'var(--font-sans)',
  }}>{children}</span>
);

const Field = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Label>{label}</Label>
    {children}
  </div>
);

const SectionHead = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
    <div style={{
      width: '40px', height: '40px', borderRadius: '12px',
      background: 'var(--md-sys-color-primary-container)',
      color: 'var(--md-sys-color-on-primary-container)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {icon}
    </div>
    <h2 style={{
      fontFamily: 'var(--font-heading)', fontSize: '1.25rem',
      fontWeight: 700, color: 'var(--md-sys-color-on-background)', margin: 0,
    }}>{title}</h2>
  </div>
);

export default function Checkout() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [form, setForm] = useState({
    fn: '', ln: '', email: '', phone: '',
    addr: '', city: '', pin: '',
    card: '', mm: '', yy: '', cvc: '',
  });
  
  const { cart, getCartSubtotal, clearCart } = useCart();
  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inp = (name) => ({
    style: inputStyle(focused === name),
    value: form[name],
    onChange: set(name),
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  const allFilled = Object.values(form).every(v => v.trim().length > 0);

  const handlePay = async () => {
    if (!allFilled) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setPaid(true);
    clearCart();
  };

  if (cart.length === 0 && !paid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--md-sys-color-background)', gap: '1rem' }}>
        <ShoppingBag size={64} color="var(--md-sys-color-outline)" />
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--md-sys-color-on-background)' }}>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate('/storefronts')} style={{ marginTop: '1rem' }}>Browse Products</button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--md-sys-color-background)',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '2rem'
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(1rem, 3vw, 2rem)', height: '64px',
        background: 'var(--md-sys-color-surface)',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        gap: '1.5rem',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)',
            padding: '0.5rem', borderRadius: '8px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        <span style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: '1.1rem', color: 'var(--md-sys-color-primary)',
        }}>
          Checkout
        </span>
      </div>

      {/* ── Content ── */}
      <div className="container" style={{ flex: 1, padding: 'clamp(1rem, 3vw, 2rem) 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <AnimatePresence mode="wait">
          {paid ? (
            /* ── Success screen ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1.5rem', padding: '4rem 1rem', textAlign: 'center',
                background: 'var(--md-sys-color-surface)', borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <CheckCircle2 size={64} color="var(--md-sys-color-primary)" />
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.5rem',
                }}>Order Confirmed!</h1>
                <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1.1rem', maxWidth: '400px' }}>
                  Your briquettes are on their way. A receipt has been sent to <strong style={{ color: 'var(--md-sys-color-on-surface)' }}>{form.email}</strong>.
                </p>
              </div>
              <div className="m3-card" style={{
                padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                minWidth: 'min(100%, 340px)', background: 'var(--md-sys-color-surface-container)'
              }}>
                {[['Order ID', '#SB-20260618'], ['Amount Paid', `₹${total.toFixed(2)}`], ['Est. Delivery', '3–5 business days']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                    <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{k}</span>
                    <span style={{ fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>{v}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
                style={{ marginTop: '1rem', padding: '0 32px' }}
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            /* ── Checkout form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                alignItems: 'flex-start'
              }}
            >
              {/* Left — Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="m3-card"
                style={{
                  flex: '1 1 600px',
                  display: 'flex', flexDirection: 'column', gap: '2rem',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  background: 'var(--md-sys-color-surface)'
                }}
              >
                {/* Shipping */}
                <div>
                  <SectionHead title="Shipping Information" icon={<Truck size={20} />} />
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <Field label="First Name"><input type="text" placeholder="Riya" {...inp('fn')} /></Field>
                      <Field label="Last Name"><input type="text" placeholder="Sharma" {...inp('ln')} /></Field>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <Field label="Email"><input type="email" placeholder="riya@example.com" {...inp('email')} /></Field>
                      <Field label="Phone"><input type="tel" placeholder="+91 98765 43210" {...inp('phone')} /></Field>
                    </div>
                    <Field label="Street Address"><input type="text" placeholder="123 MG Road, Apartment 4B" {...inp('addr')} /></Field>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                      <Field label="City"><input type="text" placeholder="Jaipur" {...inp('city')} /></Field>
                      <Field label="Postal Code"><input type="text" placeholder="302001" {...inp('pin')} /></Field>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', background: 'var(--md-sys-color-outline-variant)' }} />

                {/* Payment */}
                <div>
                  <SectionHead title="Payment Details" icon={<CreditCard size={20} />} />
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <Field label="Card Number">
                      <input type="text" placeholder="1234  5678  9012  3456" {...inp('card')} />
                    </Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <Field label="Month"><input type="text" placeholder="MM" {...inp('mm')} /></Field>
                      <Field label="Year"><input type="text" placeholder="YY" {...inp('yy')} /></Field>
                      <Field label="CVC"><input type="text" placeholder="123" {...inp('cvc')} /></Field>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={loading || !allFilled}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    height: '56px',
                    fontSize: '1.1rem',
                    background: allFilled ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
                    color: allFilled ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                    opacity: allFilled ? 1 : 0.7,
                    cursor: allFilled ? 'pointer' : 'not-allowed',
                    marginTop: '1rem'
                  }}
                >
                  {loading ? 'Processing…' : (allFilled ? `Pay ₹${total.toFixed(2)} Securely` : 'Fill all fields to continue')}
                </button>
              </motion.div>

              {/* Right — Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="m3-card"
                style={{
                  flex: '1 1 300px',
                  background: 'var(--md-sys-color-surface-container-high)',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  display: 'flex', flexDirection: 'column', gap: '1.5rem',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--md-sys-color-on-surface)' }}>Order Summary</h3>

                {/* Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '8px',
                        background: 'var(--md-sys-color-surface-container-highest)', flexShrink: 0, overflow: 'hidden',
                      }}>
                        {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)', lineHeight: 1.2, marginBottom: '0.2rem' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.4rem' }}>
                          Qty: {item.quantity}
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Line items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[['Subtotal', `₹${subtotal.toFixed(2)}`], ['Shipping', 'Free'], ['Tax (5%)', `₹${tax.toFixed(2)}`]].map(([k, v]) => (
                    <div key={k} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: '0.95rem', color: 'var(--md-sys-color-on-surface-variant)',
                    }}>
                      <span>{k}</span><span style={{ color: 'var(--md-sys-color-on-surface)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1.5rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    fontSize: '1.1rem', color: 'var(--md-sys-color-on-surface)',
                  }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: '1.5rem', color: 'var(--md-sys-color-primary)',
                  }}>₹{total.toFixed(2)}</span>
                </div>

                {/* Trust */}
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'var(--md-sys-color-surface-container)', padding: '1rem', borderRadius: '12px' }}>
                  {[
                    '100% Authentic Product Guarantee',
                    'Direct Support to Seller Community',
                    'Secure 256-bit SSL Encryption',
                  ].map(text => (
                    <div key={text} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                      fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)',
                    }}>
                      <CheckCircle2 size={16} color="var(--md-sys-color-primary)" style={{ flexShrink: 0 }} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        input::placeholder { color: var(--md-sys-color-on-surface-variant); opacity: 0.6; }
      `}</style>
    </div>
  );
}
