import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const inputStyle = (focused) => ({
  width: '100%',
  padding: '0.75rem 1rem',
  border: `1.5px solid ${focused ? 'var(--brand-rust)' : '#e5e5e5'}`,
  borderRadius: '10px',
  fontSize: '0.875rem',
  fontFamily: 'var(--font-sans)',
  background: '#fff',
  color: 'var(--text-main)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
});

const Label = ({ children }) => (
  <span style={{
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.35rem',
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
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
    <div style={{
      width: '30px', height: '30px', borderRadius: '8px',
      background: 'var(--brand-rust-light)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {icon}
    </div>
    <h2 style={{
      fontFamily: 'var(--font-heading)', fontSize: '1.05rem',
      fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0,
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
  };

  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-light)',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '0 2rem', height: '58px', flexShrink: 0,
        background: '#fff', borderBottom: '1px solid #eaeaea',
        gap: '1.5rem',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: '0.85rem', color: 'var(--text-muted)',
            padding: '0.35rem 0', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-main)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back
        </button>

        <span style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--brand-rust-dark)',
        }}>
          Smart Briqquetes
        </span>

        {/* Steps */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {['Shipping', 'Payment', 'Confirm'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: paid && i === 2 ? 'var(--brand-rust)' : i === 0 && !paid ? 'var(--text-main)' : '#eaeaea',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700,
                  color: (i === 0 && !paid) || (paid && i === 2) ? '#fff' : '#aaa',
                  transition: 'background 0.4s',
                }}>{i + 1}</div>
                <span style={{
                  fontSize: '0.72rem', fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? 'var(--text-main)' : '#bbb',
                }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: '24px', height: '1px', background: '#e5e5e5' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {paid ? (
          /* ── Success screen ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '1.5rem', padding: '2rem', textAlign: 'center',
            }}
          >
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'var(--brand-rust-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-rust)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', marginBottom: '0.5rem',
              }}>Order Confirmed!</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '400px' }}>
                Your Pashmina shawl is on its way. You'll receive a confirmation at <strong style={{ color: 'var(--text-main)' }}>{form.email || 'your email'}</strong>.
              </p>
            </div>
            <div style={{
              background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px',
              padding: '1.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
              minWidth: '280px',
            }}>
              {[['Order ID', '#SB-20260618'], ['Amount Paid', '₹367.50'], ['Est. Delivery', '3–5 business days']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
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
              flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0,
              padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem)',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            {/* Left — Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: 1, borderRadius: '20px',
                background: '#fff', border: '1px solid #eaeaea',
                boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden', minWidth: 0,
              }}
            >
              <div style={{
                flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
              }}>

                {/* Shipping */}
                <div>
                  <SectionHead
                    title="Shipping Information"
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-rust)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    }
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <Field label="First Name"><input type="text" placeholder="Riya" {...inp('fn')} /></Field>
                      <Field label="Last Name"><input type="text" placeholder="Sharma" {...inp('ln')} /></Field>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <Field label="Email"><input type="email" placeholder="riya@example.com" {...inp('email')} /></Field>
                      <Field label="Phone"><input type="tel" placeholder="+91 98765 43210" {...inp('phone')} /></Field>
                    </div>
                    <Field label="Street Address"><input type="text" placeholder="123 MG Road, Apartment 4B" {...inp('addr')} /></Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <Field label="City"><input type="text" placeholder="Jaipur" {...inp('city')} /></Field>
                      <Field label="Postal Code"><input type="text" placeholder="302001" {...inp('pin')} /></Field>
                    </div>
                  </div>
                </div>

                <div style={{ height: '1px', background: '#f0f0f0' }} />

                {/* Payment */}
                <div>
                  <SectionHead
                    title="Payment Details"
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-rust)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    }
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <Field label="Card Number">
                      <input type="text" placeholder="1234  5678  9012  3456" {...inp('card')} />
                    </Field>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
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
                  style={{
                    width: '100%', padding: '1rem',
                    background: allFilled ? 'var(--text-main)' : '#e5e5e5',
                    color: allFilled ? '#fff' : '#aaa',
                    border: 'none', borderRadius: '100px',
                    fontSize: '0.9rem', fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    cursor: allFilled ? 'pointer' : 'not-allowed',
                    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                  onMouseEnter={e => { if (allFilled) e.currentTarget.style.background = 'var(--brand-rust)'; }}
                  onMouseLeave={e => { if (allFilled) e.currentTarget.style.background = 'var(--text-main)'; }}
                >
                  {loading ? (
                    <>
                      <svg style={{ animation: 'spin 0.8s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Processing…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      {allFilled ? 'Pay ₹367.50 Securely' : 'Fill all fields to continue'}
                    </>
                  )}
                </button>

              </div>
            </motion.div>

            {/* Right — Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'clamp(260px, 28vw, 340px)', flexShrink: 0,
                borderRadius: '20px',
                background: 'var(--text-main)',
                border: '1px solid rgba(255,255,255,0.04)',
                boxShadow: '0 2px 24px rgba(0,0,0,0.12)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{
                flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
              }}>

                <div className="overline-text" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                  Order Summary
                </div>

                {/* Product */}
                <div style={{
                  display: 'flex', gap: '0.9rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)', flexShrink: 0, overflow: 'hidden',
                  }}>
                    <img src="/shawl.png" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: '0.2rem' }}>
                      Authentic Hand-Spun Pashmina Shawl
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem' }}>
                      Zoya Weavers Co-op
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-rust)' }}>₹350.00</div>
                  </div>
                </div>

                {/* Promo */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text" placeholder="Promo code"
                    style={{
                      flex: 1, padding: '0.6rem 0.85rem', borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)', color: '#fff',
                      fontSize: '0.8rem', fontFamily: 'var(--font-sans)', outline: 'none',
                    }}
                  />
                  <button style={{
                    padding: '0.6rem 0.9rem', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem',
                    cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                  }}>Apply</button>
                </div>

                {/* Line items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[['Subtotal', '₹350.00'], ['Shipping', 'Free'], ['Tax (5%)', '₹17.50']].map(([k, v]) => (
                    <div key={k} style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)',
                    }}>
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    fontSize: '0.95rem', color: '#fff',
                  }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontWeight: 800,
                    fontSize: '1.35rem', color: 'var(--brand-rust)', letterSpacing: '-0.02em',
                  }}>₹367.50</span>
                </div>

                {/* Trust */}
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    '100% Authentic Product Guarantee',
                    'Direct Support to Seller Community',
                    'Secure 256-bit SSL Encryption',
                  ].map(text => (
                    <div key={text} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                      fontSize: '0.76rem', color: 'rgba(255,255,255,0.3)',
                    }}>
                      <span style={{ color: 'var(--brand-rust)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        input::placeholder { color: #c0c0c0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
