import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const MOCK_PRODUCTS = [
  { id: '1', title: 'Premium Hardwood Briquettes', price: 450, description: 'High heat, long-lasting hardwood briquettes. Perfect for grilling and heating.', stock: 50, imageUrl: 'https://images.unsplash.com/photo-1560014525-41e9766cdde5?auto=format&fit=crop&w=800&q=80', category: 'Wood Briquettes' },
  { id: '2', title: 'Eco-friendly Sawdust Briquettes', price: 300, description: 'Made from 100% recycled sawdust. Clean burn with minimal ash.', stock: 120, imageUrl: 'https://images.unsplash.com/photo-1615599818816-2ce52654efbe?auto=format&fit=crop&w=800&q=80', category: 'Sawdust Briquettes' },
  { id: '3', title: 'Industrial Biomass Briquettes', price: 550, description: 'Dense biomass briquettes designed for industrial boilers and furnaces.', stock: 200, imageUrl: 'https://images.unsplash.com/photo-1456574808732-158e8b61c402?auto=format&fit=crop&w=800&q=80', category: 'Biomass Briquettes' },
  { id: '4', title: 'BBQ Charcoal Briquettes', price: 600, description: 'Premium charcoal briquettes that provide consistent heat for the perfect barbecue.', stock: 85, imageUrl: 'https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?auto=format&fit=crop&w=800&q=80', category: 'Charcoal Briquettes' },
  { id: '5', title: 'Coconut Shell Briquettes', price: 750, description: 'Smokeless and odorless briquettes perfect for indoor use.', stock: 40, imageUrl: 'https://images.unsplash.com/photo-1588636400936-22a08ce121fa?auto=format&fit=crop&w=800&q=80', category: 'Charcoal Briquettes' },
  { id: '6', title: 'Agri-Waste Biomass Briquettes', price: 250, description: 'Affordable and highly sustainable briquettes made from compressed agricultural waste.', stock: 300, imageUrl: 'https://images.unsplash.com/photo-1508269784381-42095cebc21d?auto=format&fit=crop&w=800&q=80', category: 'Biomass Briquettes' },
  { id: '7', title: 'Oak Wood Heating Logs', price: 480, description: '100% pure oak wood briquettes. High calorific value for cold winter nights.', stock: 75, imageUrl: 'https://images.unsplash.com/photo-1596767562692-0701198e3489?auto=format&fit=crop&w=800&q=80', category: 'Wood Briquettes' },
  { id: '8', title: 'Restaurant Grade Shisha Charcoal', price: 900, description: 'Premium cubes made specifically for long, clean burns in shisha/hookah.', stock: 25, imageUrl: 'https://images.unsplash.com/photo-1498063401574-13cbee350467?auto=format&fit=crop&w=800&q=80', category: 'Charcoal Briquettes' },
  { id: '9', title: 'Pine Sawdust Logs', price: 280, description: 'Lightweight and highly flammable, ideal for quick fire starting.', stock: 150, imageUrl: 'https://images.unsplash.com/photo-1551020084-3c87e491c944?auto=format&fit=crop&w=800&q=80', category: 'Sawdust Briquettes' },
  { id: '10', title: 'Peanut Shell Biomass', price: 320, description: 'Innovative eco-fuel made from crushed peanut shells. Great for small-scale heating.', stock: 400, imageUrl: 'https://images.unsplash.com/photo-1533206482115-4122d2568ea1?auto=format&fit=crop&w=800&q=80', category: 'Biomass Briquettes' }
];

const Storefronts = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wood Briquettes', 'Charcoal Briquettes', 'Biomass Briquettes', 'Sawdust Briquettes'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{
          position: 'relative',
          padding: '4rem 2rem',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
          border: '1px solid rgba(255,255,255,0.6)'
        }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-main)', letterSpacing: '-1px' }}>
            Available Briquettes
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 2.5rem 0', fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.6 }}>
            Discover high-quality, sustainable fuel alternatives for your specific needs. From industrial heating to the perfect BBQ.
          </p>

          {/* Filters/Categories */}
          <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
            {categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.1)', 
                  background: selectedCategory === cat ? 'var(--text-main)' : 'rgba(255,255,255,0.8)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
                  borderRadius: '30px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCategory === cat ? '0 8px 20px rgba(0,0,0,0.15)' : 'none'
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading briquettes...</div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: 'clamp(2rem, 4vw, 4rem)' 
          }}>
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #f0f0f0' }}>
                <div style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#f0f0f0', aspectRatio: '4/3' }}>
                    {product.imageUrl ? (
                      <motion.img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <motion.div 
                        style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #e0e0e0, #f5f5f5)' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {product.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, margin: 0, paddingRight: '1rem', lineHeight: 1.3 }}>{product.title}</h3>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--brand-rust-dark)', marginBottom: '1rem', fontWeight: 800 }}>
                      ₹{product.price} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ ton</span>
                    </div>
                    {product.description && (
                      <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                        {product.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{product.stock} in stock</span>
                       <Link to="/checkout" className="btn-primary" style={{ padding: '0.6rem 1.5rem', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                         Buy Now
                       </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {products.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>No products available right now.</div>
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Storefronts;
