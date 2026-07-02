import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const horizontalCards = [
  { id: '1', category: 'Wood Briquettes', subtitle: 'Sustainable', title: 'Coconut Shell Briquettes', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1615599818816-2ce52654efbe?auto=format&fit=crop&w=1600&q=80', stock: 50, description: 'High heat coconut shell briquettes for grilling.' },
  { id: '2', category: 'Charcoal Briquettes', subtitle: 'Premium', title: 'Hardwood Charcoal', price: 18.50, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', stock: 120, description: 'Premium long-lasting hardwood charcoal.' },
  { id: '3', category: 'Sawdust Briquettes', subtitle: 'Local', title: 'Sawdust Briquettes', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', stock: 200, description: 'Eco-friendly sawdust briquettes made locally.' },
  { id: '4', category: 'Biomass Briquettes', subtitle: 'Accessories', title: 'Eco Fire Starters', price: 5.00, imageUrl: 'https://images.unsplash.com/photo-1498063401574-13cbee350467?auto=format&fit=crop&w=800&q=80', stock: 85, description: 'Natural fire starters for quick ignition.' },
];

const platformFeatures = [
  { subtitle: 'The Struggle', title: 'The Hidden Cost', desc: 'Despite immense value in sustainable energy, producers struggle. Intermediaries take the lions share, leaving creators with a fraction of their true worth.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
  { subtitle: 'The Solution', title: 'Enter Smart briquettes', desc: 'We eliminate unnecessary middlemen, enabling sellers to showcase products, set fair prices, and sell directly.', img: 'https://images.unsplash.com/photo-1615599818816-2ce52654efbe?auto=format&fit=crop&w=1600&q=80' },
  { subtitle: 'Feature 01', title: 'Direct Market', desc: 'A centralized platform to list briquettes, set prices, and receive orders directly with complete business control.', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
  { subtitle: 'Feature 02', title: 'Verified Profiles', desc: 'Strict verification to guarantee quality and build deep trust with buyers looking for sustainable fuel.', img: 'https://images.unsplash.com/photo-1498063401574-13cbee350467?auto=format&fit=crop&w=800&q=80' },
];

const chips = ['All', 'Sustainable', 'Premium', 'Local', 'Accessories', 'Wholesale'];

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' } }
};

const Home = () => {
  const [activeChip, setActiveChip] = useState('All');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <main style={{ paddingBottom: '100px', paddingTop: '100px' }}> {/* Padding top for desktop navbar */}
      
      <div className="container">
        
        {/* Hero Card */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
          style={{ marginBottom: '4rem' }}
        >
          <div className="m3-card" style={{ 
            position: 'relative', 
            padding: '3rem', 
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            overflow: 'hidden',
            borderRadius: 'clamp(24px, 4vw, 40px)',
            backgroundColor: '#1D1B1A'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1615599818816-2ce52654efbe?auto=format&fit=crop&w=1600&q=80" 
              alt="" 
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                filter: 'brightness(0.4)'
              }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div style={{ position: 'relative', zIndex: 1, color: '#fff', maxWidth: '800px' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="overline-text" style={{ color: 'var(--md-sys-color-primary-container)', marginBottom: '1rem' }}>Empowering Sustainable Energy</motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Bridging Producers and Buyers.
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ color: '#fff', opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem', marginInline: 'auto' }}>
                Connecting sustainable briquette producers directly with buyers, eliminating middlemen and providing clean energy alternatives.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <a href="#products" className="btn-primary" style={{ backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)', height: '56px', padding: '0 32px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  Discover Briquettes
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Mission (Restored) */}
        <section className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ flex: '1 1 400px' }}>
              <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: '1rem' }}>Our Mission</motion.div>
              <motion.h2 variants={fadeUpItem} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>A Commitment to Sustainability</motion.h2>
              <motion.p variants={fadeUpItem}>
                We are dedicated to providing sustainable, clean-burning briquettes that reduce reliance on fossil fuels. Our platform empowers local producers to reach a wider audience, promoting environmental responsibility and economic growth.
              </motion.p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ flex: '1 1 400px' }}>
              <div className="m3-card" style={{ padding: 0, borderRadius: '32px' }}>
                <img src="https://images.unsplash.com/photo-1508269784381-42095cebc21d?auto=format&fit=crop&w=800&q=80" alt="Artisan Crafting" style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Chips */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            overflowX: 'auto', 
            paddingBottom: '1rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            {chips.map(chip => (
              <button 
                key={chip}
                className={`m3-chip ${activeChip === chip ? 'active' : ''}`}
                onClick={() => setActiveChip(chip)}
                style={{ flexShrink: 0 }}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Featured Products</h2>
            <button style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-primary)', fontWeight: 600, cursor: 'pointer' }}>See all</button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            marginRight: '-1rem', // Allow edge bleed on mobile
            paddingRight: '1rem',
            snapType: 'x mandatory'
          }}>
            {horizontalCards.map((card, idx) => (
              <motion.div 
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: 'spring' }}
                className="m3-card"
                style={{ 
                  flex: '0 0 auto',
                  width: 'clamp(260px, 70vw, 300px)', // Better size for phones
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  scrollSnapAlign: 'start'
                }}
              >
                <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                  <img src={card.imageUrl} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div className="overline-text" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{card.subtitle}</div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--md-sys-color-primary)' }}>₹{card.price.toFixed(2)}</span>
                    <button style={{ 
                      background: 'var(--md-sys-color-secondary-container)',
                      color: 'var(--md-sys-color-on-secondary-container)',
                      border: 'none',
                      width: '40px', height: '40px',
                      borderRadius: '20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => {
                      addToCart(card);
                      navigate('/checkout');
                    }}
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Platform / Features (Restored) */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div className="overline-text" style={{ marginBottom: '0.5rem' }}>The Platform</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>The Smart Briquettes Journey</h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto',
            paddingBottom: '2rem',
            snapType: 'x mandatory',
            marginRight: '-1rem',
            paddingRight: '1rem'
          }}>
            {platformFeatures.map((feature, idx) => (
              <div 
                key={idx}
                className="m3-card"
                style={{ 
                  flex: '0 0 auto',
                  width: 'clamp(280px, 80vw, 380px)', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  scrollSnapAlign: 'start'
                }}
              >
                <img src={feature.img} alt={feature.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
                <div>
                  <div className="overline-text" style={{ marginBottom: '0.5rem' }}>{feature.subtitle}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Sellers (Restored) */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '3rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ flex: '1 1 400px' }}>
              <div className="m3-card" style={{ padding: 0, borderRadius: '32px' }}>
                <img src="https://images.unsplash.com/photo-1456574808732-158e8b61c402?auto=format&fit=crop&w=800&q=80" alt="Sellers" style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ flex: '1 1 400px' }}>
              <motion.div variants={fadeUpItem} className="overline-text" style={{ marginBottom: '1rem' }}>Our Sellers</motion.div>
              <motion.h2 variants={fadeUpItem} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>The Producers</motion.h2>
              <motion.p variants={fadeUpItem} style={{ marginBottom: '2rem' }}>
                Our primary focus is on the local producers of sustainable briquettes, helping them turn agricultural waste into clean energy and providing them with a platform to reach buyers directly.
              </motion.p>
              <motion.div variants={fadeUpItem}>
                <Link to="/about" className="btn-primary">Learn About Our Mission</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Home;
