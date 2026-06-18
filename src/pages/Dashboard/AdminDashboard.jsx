import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import pb from '../../lib/pb';

const NAV = [
  { id: 'overview', label: 'Overview', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { id: 'products', label: 'Products', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )},
  { id: 'orders', label: 'Orders', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )},
  { id: 'users', label: 'Users', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'settings', label: 'Settings', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  )},
];

const STATUS_COLORS = {
  PENDING:   { bg: '#fff8e6', color: '#b45309' },
  SHIPPED:   { bg: '#e6f7ef', color: '#15803d' },
  DELIVERED: { bg: '#e6f0ff', color: '#1d4ed8' },
  CANCELLED: { bg: '#fee2e2', color: '#b91c1c' },
};

const emptyProduct = { title: '', description: '', price: '', stock: '1', category: 'Briquettes', imageUrl: '' };

// ─── Reusable input/label ─────────────────────────────────────────────────────
const FLabel = ({ children }) => (
  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem', display: 'block', fontFamily: 'var(--font-sans)' }}>
    {children}
  </label>
);

const FInput = ({ style, ...rest }) => (
  <input
    style={{
      width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e5e5e5',
      borderRadius: '10px', fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
      background: '#fafafa', color: 'var(--text-main)', outline: 'none', boxSizing: 'border-box',
      transition: 'border-color 0.2s',
      ...style,
    }}
    onFocus={e => e.currentTarget.style.borderColor = 'var(--brand-rust)'}
    onBlur={e => e.currentTarget.style.borderColor = '#e5e5e5'}
    {...rest}
  />
);

const FTextarea = ({ style, ...rest }) => (
  <textarea
    style={{
      width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e5e5e5',
      borderRadius: '10px', fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
      background: '#fafafa', color: 'var(--text-main)', outline: 'none', boxSizing: 'border-box',
      resize: 'vertical', minHeight: '100px', transition: 'border-color 0.2s',
      ...style,
    }}
    onFocus={e => e.currentTarget.style.borderColor = 'var(--brand-rust)'}
    onBlur={e => e.currentTarget.style.borderColor = '#e5e5e5'}
    {...rest}
  />
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px',
    padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
    borderLeft: `3px solid ${accent || 'var(--brand-rust)'}`,
  }}>
    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.6rem', fontFamily: 'var(--font-sans)' }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{sub}</div>}
  </div>
);

// ─── Nav button ───────────────────────────────────────────────────────────────
const NavBtn = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    padding: '0.75rem 1rem', width: '100%', textAlign: 'left',
    background: active ? 'var(--brand-rust-light)' : 'transparent',
    color: active ? 'var(--brand-rust-dark)' : 'var(--text-muted)',
    border: 'none', borderRadius: '10px', cursor: 'pointer',
    fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
    fontWeight: active ? 600 : 400,
    transition: 'all 0.15s',
  }}
    onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#f5f5f3'; e.currentTarget.style.color = 'var(--text-main)'; } }}
    onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
  >
    {icon}
    {label}
  </button>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab]               = useState('overview');
  const [sidebarOpen, setSidebar]   = useState(false);

  // Data
  const [products, setProducts]     = useState([]);
  const [orders, setOrders]         = useState([]);
  const [users, setUsers]           = useState([]);
  const [stats, setStats]           = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [loading, setLoading]       = useState(false);

  // Product form
  const [showForm, setShowForm]     = useState(false);
  const [editId, setEditId]         = useState(null);
  const [product, setProduct]       = useState(emptyProduct);
  const [imgFile, setImgFile]       = useState(null);
  const [saving, setSaving]         = useState(false);

  // Profile / settings
  const [profile, setProfile]       = useState({ bio: '', location: '', profileImage: '', coverImage: '' });
  const [profFiles, setProfFiles]   = useState({ profile: null, cover: null });

  // Search / filter
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter]     = useState('ALL');

  useEffect(() => { fetchTab(); }, [tab]);

  const fetchTab = async () => {
    setLoading(true);
    try {
      if (tab === 'overview' || tab === 'products') {
        const records = await pb.collection('products').getFullList({ sort: '-created' });
        setProducts(records);
        setStats(s => ({ ...s, products: records.length }));
      }
      if (tab === 'overview' || tab === 'orders') {
        const records = await pb.collection('orders').getFullList({ sort: '-created', expand: 'customer,orderItems,orderItems.product' });
        setOrders(records);
        const revenue = records.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        setStats(s => ({ ...s, orders: records.length, revenue }));
      }
      if (tab === 'users') {
        const records = await pb.collection('users').getFullList({ sort: 'name' }).catch(() => []);
        setUsers(records);
        setStats(s => ({ ...s, users: records.length }));
      }
      if (tab === 'settings') {
        const m = pb.authStore.model || {};
        setProfile({ bio: m.bio || '', location: m.location || '', profileImage: m.profileImage || '', coverImage: m.coverImage || '' });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // ── Product CRUD ──────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditId(null);
    setProduct(emptyProduct);
    setImgFile(null);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setProduct({ title: p.title, description: p.description, price: String(p.price), stock: String(p.stock), category: p.category || 'Briquettes', imageUrl: p.image ? pb.files.getUrl(p, p.image) : '' });
    setImgFile(null);
    setShowForm(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', product.title);
      fd.append('description', product.description);
      fd.append('price', product.price);
      fd.append('stock', product.stock);
      fd.append('category', product.category);
      fd.append('seller', pb.authStore.model?.id);
      if (imgFile) fd.append('image', imgFile);
      if (editId) {
        await pb.collection('products').update(editId, fd);
      } else {
        await pb.collection('products').create(fd);
      }
      setShowForm(false);
      setEditId(null);
      setProduct(emptyProduct);
      fetchTab();
    } catch (err) {
      alert('Error saving product');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await pb.collection('products').delete(id).catch(() => alert('Error deleting'));
    fetchTab();
  };

  // ── Order status ──────────────────────────────────────────────────────────
  const updateOrderStatus = async (id, status) => {
    await pb.collection('orders').update(id, { status }).catch(() => alert('Error updating'));
    fetchTab();
  };

  // ── Profile ───────────────────────────────────────────────────────────────
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('bio', profile.bio);
      fd.append('location', profile.location);
      if (profFiles.profile) fd.append('profileImage', profFiles.profile);
      if (profFiles.cover) fd.append('coverImage', profFiles.cover);
      await pb.collection('users').update(pb.authStore.model?.id, fd);
      await pb.collection('users').authRefresh();
      setProfFiles({ profile: null, cover: null });
      alert('Settings saved!');
      fetchTab();
    } catch (err) {
      alert('Error saving settings');
    }
    setSaving(false);
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category?.toLowerCase().includes(productSearch.toLowerCase())
  );
  const filteredOrders = orderFilter === 'ALL' ? orders : orders.filter(o => o.status === orderFilter);

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const sidebar = (
    <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`} style={{ background: '#fff', borderRight: '1px solid #eaeaea' }}>
      {/* Brand */}
      <div className="dashboard-sidebar-header" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--brand-rust-dark)', letterSpacing: '-0.02em' }}>
          Smart Briqquetes
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-rust-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-rust-dark)' }}>
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="dashboard-nav" style={{ paddingTop: '0.75rem' }}>
        {NAV.map(n => (
          <NavBtn key={n.id} active={tab === n.id} onClick={() => { setTab(n.id); setSidebar(false); setShowForm(false); }} icon={n.icon} label={n.label} />
        ))}

        <div style={{ margin: '1rem 0 0.5rem', borderTop: '1px solid #f0f0f0', paddingTop: '0.75rem' }}>
          <div style={{ padding: '0 1rem', fontSize: '0.65rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Quick Links</div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', borderRadius: '10px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Homepage
          </Link>
        </div>
      </nav>

      <div className="dashboard-logout">
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem', width: '100%',
          background: '#fff1f1', color: '#e03131',
          border: 'none', borderRadius: '10px', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  // ── Tab: Overview ─────────────────────────────────────────────────────────
  const tabOverview = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard label="Total Products" value={stats.products} sub="Listed on platform" accent="var(--brand-rust)" />
        <StatCard label="Total Orders" value={stats.orders} sub="All time" accent="#6366f1" />
        <StatCard label="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} sub="Gross sales" accent="#15803d" />
        <StatCard label="Pending Orders" value={orders.filter(o => o.status === 'PENDING').length} sub="Awaiting action" accent="#b45309" />
      </div>

      {/* Recent orders */}
      <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Recent Orders</h3>
          <button onClick={() => setTab('orders')} style={{ background: 'none', border: 'none', color: 'var(--brand-rust)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>View all →</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Order ID', 'Customer', 'Items', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o, i) => (
                <tr key={o.id} style={{ borderTop: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '0.85rem 1.5rem', fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.8rem' }}>#{o.id?.slice(0, 8)}</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 500 }}>{o.expand?.customer?.name || '—'}</td>
                  <td style={{ padding: '0.85rem 1.5rem', color: 'var(--text-muted)' }}>{o.expand?.orderItems?.length || 0} item(s)</td>
                  <td style={{ padding: '0.85rem 1.5rem', fontWeight: 600 }}>₹{o.totalAmount?.toLocaleString() || '—'}</td>
                  <td style={{ padding: '0.85rem 1.5rem' }}>
                    <span style={{ padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, ...STATUS_COLORS[o.status] || STATUS_COLORS.PENDING }}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent products */}
      <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Recent Products</h3>
          <button onClick={() => setTab('products')} style={{ background: 'none', border: 'none', color: 'var(--brand-rust)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Manage →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: '#f0f0f0' }}>
          {products.slice(0, 6).map(p => (
            <div key={p.id} style={{ background: '#fff', padding: '1rem' }}>
              {p.image && <img src={pb.files.getUrl(p, p.image)} alt={p.title} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.6rem' }} />}
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--brand-rust)', fontWeight: 700 }}>₹{p.price?.toLocaleString()}</div>
            </div>
          ))}
          {products.length === 0 && <div style={{ padding: '2rem', color: 'var(--text-muted)', textAlign: 'center', gridColumn: '1/-1' }}>No products listed yet.</div>}
        </div>
      </div>
    </div>
  );

  // ── Tab: Products ─────────────────────────────────────────────────────────
  const tabProducts = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Product form */}
      {showForm && (
        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '20px', padding: 'clamp(1.5rem, 3vw, 2.5rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {editId ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button onClick={() => { setShowForm(false); setEditId(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
          </div>
          <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div><FLabel>Product Title *</FLabel><FInput type="text" placeholder="e.g. Premium Biomass Briquettes" required value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} /></div>
              <div>
                <FLabel>Category *</FLabel>
                <select required value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid #e5e5e5', borderRadius: '10px', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', background: '#fafafa', color: 'var(--text-main)', outline: 'none', appearance: 'none' }}>
                  <option>Briquettes</option>
                  <option>Biomass</option>
                  <option>Charcoal</option>
                  <option>Eco Fuel</option>
                  <option>Industrial</option>
                </select>
              </div>
              <div><FLabel>Price (₹) *</FLabel><FInput type="number" placeholder="0" required min="0" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} /></div>
              <div><FLabel>Stock *</FLabel><FInput type="number" placeholder="1" required min="0" value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} /></div>
            </div>
            <div>
              <FLabel>Product Image {!editId && '*'}</FLabel>
              <input type="file" accept="image/*" required={!editId && !product.imageUrl} onChange={e => setImgFile(e.target.files[0])} style={{ width: '100%', padding: '0.65rem 1rem', border: '1.5px solid #e5e5e5', borderRadius: '10px', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', background: '#fafafa', boxSizing: 'border-box' }} />
              {editId && product.imageUrl && <img src={product.imageUrl} alt="current" style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginTop: '0.5rem', border: '1px solid #eaeaea' }} />}
            </div>
            <div><FLabel>Description *</FLabel><FTextarea placeholder="Describe the product, materials, use-case, certifications…" required value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} /></div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} style={{ padding: '0.75rem 1.5rem', background: '#f5f5f3', color: 'var(--text-main)', border: '1px solid #e5e5e5', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>Cancel</button>
              <button type="submit" disabled={saving} style={{ padding: '0.75rem 1.75rem', background: saving ? '#ccc' : 'var(--text-main)', color: '#fff', border: 'none', borderRadius: '100px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', transition: 'background 0.2s' }}>
                {saving ? 'Saving…' : editId ? 'Save Changes' : 'Publish Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search bar */}
      <div style={{ position: 'relative', maxWidth: '360px' }}>
        <svg style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input placeholder="Search products…" value={productSearch} onChange={e => setProductSearch(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem', border: '1.5px solid #e5e5e5', borderRadius: '100px', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filteredProducts.map(p => (
          <div key={p.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
            {p.image
              ? <img src={pb.files.getUrl(p, p.image)} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '180px', background: 'var(--brand-rust-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-rust)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.05em' }}>NO IMAGE</div>
            }
            <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-main)', lineHeight: 1.3 }}>{p.title}</h4>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'var(--brand-rust-light)', color: 'var(--brand-rust-dark)', whiteSpace: 'nowrap', flexShrink: 0 }}>{p.category}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 700, color: 'var(--brand-rust)', fontSize: '1rem' }}>₹{p.price?.toLocaleString()}</span>
                <span>{p.stock} in stock</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => openEdit(p)} style={{ flex: 1, padding: '0.6rem', background: '#f5f5f3', color: 'var(--text-main)', border: '1px solid #eaeaea', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ flex: 1, padding: '0.6rem', background: '#fff1f1', color: '#e03131', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            {productSearch ? `No products matching "${productSearch}"` : 'No products yet. Click "Add Product" to get started.'}
          </div>
        )}
      </div>
    </div>
  );

  // ── Tab: Orders ────────────────────────────────────────────────────────────
  const tabOrders = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['ALL', 'PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => (
          <button key={s} onClick={() => setOrderFilter(s)} style={{
            padding: '0.4rem 1rem', borderRadius: '100px',
            border: '1.5px solid', fontSize: '0.75rem', fontWeight: 600,
            fontFamily: 'var(--font-sans)', cursor: 'pointer', transition: 'all 0.15s',
            borderColor: orderFilter === s ? 'var(--brand-rust)' : '#e5e5e5',
            background: orderFilter === s ? 'var(--brand-rust-light)' : '#fff',
            color: orderFilter === s ? 'var(--brand-rust-dark)' : 'var(--text-muted)',
          }}>{s}</button>
        ))}
      </div>

      {filteredOrders.length === 0
        ? <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No orders found.</div>
        : filteredOrders.map(o => (
          <div key={o.id} style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-muted)' }}>#{o.id?.slice(0, 8)}</span>
                  <span style={{ padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600, ...STATUS_COLORS[o.status] || STATUS_COLORS.PENDING }}>{o.status}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  <strong>Customer:</strong> {o.expand?.customer?.name || '—'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {(o.expand?.orderItems || []).map(i => `${i.quantity}× ${i.expand?.product?.title}`).join(', ')}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  ₹{o.totalAmount?.toLocaleString() || '—'}
                </span>
                {o.status === 'PENDING' && (
                  <button onClick={() => updateOrderStatus(o.id, 'SHIPPED')} style={{ padding: '0.55rem 1.1rem', background: 'var(--text-main)', color: '#fff', border: 'none', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                    Mark Shipped
                  </button>
                )}
                {o.status === 'SHIPPED' && (
                  <button onClick={() => updateOrderStatus(o.id, 'DELIVERED')} style={{ padding: '0.55rem 1.1rem', background: '#15803d', color: '#fff', border: 'none', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>
                    Mark Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );

  // ── Tab: Users ─────────────────────────────────────────────────────────────
  const tabUsers = (
    <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#fafafa', borderBottom: '1px solid #eaeaea' }}>
              {['Name', 'Email', 'Role', 'Joined'].map(h => (
                <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderTop: '1px solid #f5f5f5', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--brand-rust-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-rust-dark)', flexShrink: 0 }}>
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontWeight: 500 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{u.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600,
                    background: u.role === 'ADMIN' ? '#fff1f1' : u.role === 'SELLER' ? 'var(--brand-rust-light)' : '#f0f9ff',
                    color: u.role === 'ADMIN' ? '#e03131' : u.role === 'SELLER' ? 'var(--brand-rust-dark)' : '#1d4ed8',
                  }}>{u.role}</span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>
                  {u.created ? new Date(u.created).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users data available.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Tab: Settings ──────────────────────────────────────────────────────────
  const tabSettings = (
    <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '20px', padding: 'clamp(1.5rem, 3vw, 2rem)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ margin: '0 0 1.25rem', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Profile Settings</h3>
        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <FLabel>Profile Avatar</FLabel>
            <input type="file" accept="image/*" onChange={e => setProfFiles({ ...profFiles, profile: e.target.files[0] })} style={{ width: '100%', padding: '0.65rem 1rem', border: '1.5px solid #e5e5e5', borderRadius: '10px', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', background: '#fafafa', boxSizing: 'border-box' }} />
            {profile.profileImage && <img src={pb.files.getUrl(pb.authStore.model || {}, profile.profileImage)} alt="avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginTop: '0.6rem', border: '2px solid var(--brand-rust-light)' }} />}
          </div>
          <div>
            <FLabel>Cover Image</FLabel>
            <input type="file" accept="image/*" onChange={e => setProfFiles({ ...profFiles, cover: e.target.files[0] })} style={{ width: '100%', padding: '0.65rem 1rem', border: '1.5px solid #e5e5e5', borderRadius: '10px', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', background: '#fafafa', boxSizing: 'border-box' }} />
            {profile.coverImage && <img src={pb.files.getUrl(pb.authStore.model || {}, profile.coverImage)} alt="cover" style={{ width: '100%', height: '100px', borderRadius: '10px', objectFit: 'cover', marginTop: '0.6rem', border: '1px solid #eaeaea' }} />}
          </div>
          <div><FLabel>Location</FLabel><FInput type="text" placeholder="e.g. Delhi, India" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} /></div>
          <div><FLabel>Bio</FLabel><FTextarea placeholder="Tell buyers about your business…" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} /></div>
          <button type="submit" disabled={saving} style={{ padding: '0.85rem 1.75rem', background: saving ? '#ccc' : 'var(--text-main)', color: '#fff', border: 'none', borderRadius: '100px', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', alignSelf: 'flex-start', transition: 'background 0.2s' }}>
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </form>
      </div>

      {/* Account info */}
      <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Account Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[['Name', user.name], ['Email', user.email], ['Role', user.role]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.75rem 0', borderBottom: '1px solid #f5f5f5' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{k}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: '20px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: '#e03131' }}>Danger Zone</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Logging out will end your current session.</p>
        <button onClick={logout} style={{ padding: '0.7rem 1.5rem', background: '#fff1f1', color: '#e03131', border: '1px solid #fecaca', borderRadius: '100px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem' }}>
          Logout
        </button>
      </div>
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  const PAGE_TITLE = { overview: 'Overview', products: 'Products', orders: 'Orders', users: 'Users', settings: 'Settings' };

  return (
    <div className="dashboard-layout" style={{ background: 'var(--bg-light)' }}>
      <div className={`dashboard-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebar(false)} />
      {sidebar}

      <div data-lenis-prevent className="dashboard-main">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="hamburger-btn" onClick={() => setSidebar(true)}>☰</button>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                {PAGE_TITLE[tab]}
              </h1>
            </div>
          </div>

          {tab === 'products' && !showForm && (
            <button onClick={openAdd} style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.7rem 1.25rem', background: 'var(--text-main)', color: '#fff',
              border: 'none', borderRadius: '100px', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--brand-rust)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--text-main)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Product
            </button>
          )}
        </div>

        {loading
          ? <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>Loading…</div>
          : <>
              {tab === 'overview'  && tabOverview}
              {tab === 'products'  && tabProducts}
              {tab === 'orders'    && tabOrders}
              {tab === 'users'     && tabUsers}
              {tab === 'settings'  && tabSettings}
            </>
        }
      </div>
    </div>
  );
}
