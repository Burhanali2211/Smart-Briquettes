import { motion } from 'framer-motion';
import { Leaf, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function About() {
  return (
    <div style={{ paddingTop: '80px', paddingBottom: '4rem', background: 'var(--md-sys-color-background)' }}>
      
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: 'clamp(4rem, 8vw, 6rem) 1rem', display: 'flex', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" alt="About Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} />
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <motion.div variants={fadeUpItem} className="overline-text" style={{ color: 'var(--md-sys-color-primary-container)', marginBottom: '1rem' }}>Our Story</motion.div>
          <motion.h1 variants={fadeUpItem} style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Fueling the Future, Responsibly.
          </motion.h1>
          <motion.p variants={fadeUpItem} style={{ color: '#e0e0e0', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Smart Briquettes was born out of a simple observation: billions of tons of agricultural waste are burned off every year, polluting our air, while simultaneously, we cut down ancient forests for fuel. We decided it was time to close the loop.
          </motion.p>
        </motion.div>
      </section>

      {/* The Problem & Solution */}
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--md-sys-color-on-background)' }}>The Global Fuel Crisis</h2>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Traditional charcoal and firewood dependency is devastating global ecosystems. Every year, massive swaths of forests are cleared just to meet the heating and cooking demands of growing populations. Meanwhile, the farmers growing our food are forced to burn excess biomass, creating massive carbon clouds.
            </p>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              We realized that the solution was already in the hands of rural communities. By compressing sawdust, coconut shells, and agricultural waste into high-density briquettes, we can create a fuel source that burns hotter, longer, and cleaner than traditional wood—with zero deforestation.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ flex: '1 1 400px' }}>
            <div className="m3-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
              <img src="https://images.unsplash.com/photo-1615599818816-2ce52654efbe?auto=format&fit=crop&w=800&q=80" alt="Biomass processing" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ background: 'var(--md-sys-color-surface-container)', padding: '5rem 1rem', marginTop: '3rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--md-sys-color-on-surface)' }}>Our Core Pillars</h2>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '600px', margin: '1rem auto 0' }}>
              Everything we do at Smart Briquettes is built on a foundation of sustainability, fairness, and technological innovation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Leaf size={32} />, title: "100% Sustainable", desc: "Every briquette sold on our platform is made from repurposed agricultural or industrial waste. No trees are harmed." },
              { icon: <Users size={32} />, title: "Empowering Locals", desc: "We cut out the middlemen. Rural producers get direct access to global markets and keep the lion's share of their profits." },
              { icon: <ShieldCheck size={32} />, title: "Verified Quality", desc: "Our platform ensures that every seller meets strict calorific value and low-ash emission standards before listing." },
              { icon: <TrendingUp size={32} />, title: "Economic Growth", desc: "By turning waste into wealth, we're helping to build circular economies in developing regions across the globe." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="m3-card"
                style={{ background: 'var(--md-sys-color-surface)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{ width: '64px', height: '64px', background: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {pillar.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>{pillar.title}</h3>
                <p style={{ color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact */}
      <section className="container" style={{ paddingTop: '5rem' }}>
        <div className="m3-card" style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--md-sys-color-on-primary)' }}>Our Impact So Far</h2>
            <p style={{ opacity: 0.9, fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Since our launch, we have successfully connected hundreds of local artisans and farmers with commercial buyers, restaurants, and eco-conscious families. The numbers speak for themselves.
            </p>
          </div>
          <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {[
              { stat: "50k+", label: "Tons of waste upcycled" },
              { stat: "2,400", label: "Trees saved monthly" },
              { stat: "850+", label: "Verified producers" },
              { stat: "12", label: "Countries reached" }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{item.stat}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
