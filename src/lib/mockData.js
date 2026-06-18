// Mutable arrays — mutations persist within the browser session
export const mockProducts = [
  { id: 'p1', title: 'Premium Biomass Briquettes', description: 'High-quality biomass briquettes made from agricultural waste. Eco-friendly, long-burning, and low smoke emission. Perfect for industrial boilers.', price: 4500, stock: 200, category: 'Briquettes', image: null, seller: 'u2', created: '2026-05-10T10:00:00.000Z' },
  { id: 'p2', title: 'Charcoal Briquettes 25kg', description: 'Premium charcoal briquettes for industrial and domestic use. High calorific value, uniform size, and very low ash content.', price: 2800, stock: 350, category: 'Charcoal', image: null, seller: 'u2', created: '2026-05-15T10:00:00.000Z' },
  { id: 'p3', title: 'Eco Fuel Pellets', description: 'Compressed wood pellets for biomass boilers and stoves. Certified sustainable sourcing with consistent moisture content below 10%.', price: 3200, stock: 500, category: 'Eco Fuel', image: null, seller: 'u4', created: '2026-05-20T10:00:00.000Z' },
  { id: 'p4', title: 'Industrial Biomass Logs', description: 'Dense biomass logs engineered for industrial furnaces and kilns. Consistent dimensions ensure reliable burn rates and heat output.', price: 6000, stock: 120, category: 'Industrial', image: null, seller: 'u4', created: '2026-05-25T10:00:00.000Z' },
  { id: 'p5', title: 'Rice Husk Briquettes', description: 'Sustainably made from rice husk agricultural waste. Ideal for small industries, restaurants, and household cooking applications.', price: 1800, stock: 800, category: 'Biomass', image: null, seller: 'u2', created: '2026-06-01T10:00:00.000Z' },
];

export const mockOrders = [
  {
    id: 'ord001abcde', totalAmount: 9000, status: 'DELIVERED',
    created: '2026-06-01T10:00:00.000Z', customer: 'u3',
    expand: {
      customer: { id: 'u3', name: 'Priya Sharma' },
      orderItems: [{ id: 'oi1', quantity: 2, price: 4500, expand: { product: { id: 'p1', title: 'Premium Biomass Briquettes' } } }]
    }
  },
  {
    id: 'ord002defgh', totalAmount: 5600, status: 'SHIPPED',
    created: '2026-06-10T10:00:00.000Z', customer: 'u3',
    expand: {
      customer: { id: 'u3', name: 'Priya Sharma' },
      orderItems: [{ id: 'oi2', quantity: 2, price: 2800, expand: { product: { id: 'p2', title: 'Charcoal Briquettes 25kg' } } }]
    }
  },
  {
    id: 'ord003ghijk', totalAmount: 6400, status: 'PENDING',
    created: '2026-06-16T10:00:00.000Z', customer: 'u5',
    expand: {
      customer: { id: 'u5', name: 'Arjun Mehta' },
      orderItems: [{ id: 'oi3', quantity: 2, price: 3200, expand: { product: { id: 'p3', title: 'Eco Fuel Pellets' } } }]
    }
  },
  {
    id: 'ord004lmnop', totalAmount: 12000, status: 'PENDING',
    created: '2026-06-17T10:00:00.000Z', customer: 'u6',
    expand: {
      customer: { id: 'u6', name: 'Sunita Industries' },
      orderItems: [{ id: 'oi4', quantity: 2, price: 6000, expand: { product: { id: 'p4', title: 'Industrial Biomass Logs' } } }]
    }
  },
];

export const mockUsersList = [
  { id: 'u1', name: 'Admin User',       email: 'admin@smartbriqquetes.com',  role: 'ADMIN',    created: '2026-01-01T10:00:00.000Z' },
  { id: 'u2', name: 'Ravi Briquettes',  email: 'ravi@seller.com',             role: 'SELLER',   created: '2026-02-15T10:00:00.000Z' },
  { id: 'u3', name: 'Priya Sharma',     email: 'priya@customer.com',          role: 'CUSTOMER', created: '2026-03-10T10:00:00.000Z' },
  { id: 'u4', name: 'Arjun Industries', email: 'arjun@industries.com',        role: 'SELLER',   created: '2026-04-05T10:00:00.000Z' },
  { id: 'u5', name: 'Arjun Mehta',      email: 'arjun.m@example.com',         role: 'CUSTOMER', created: '2026-05-20T10:00:00.000Z' },
  { id: 'u6', name: 'Sunita Industries',email: 'sunita@industries.com',        role: 'CUSTOMER', created: '2026-06-01T10:00:00.000Z' },
];

// These users can log in. Any password works.
export const MOCK_AUTH_USERS = [
  { id: 'u1', name: 'Admin User',      email: 'admin@smartbriqquetes.com', role: 'ADMIN',    bio: 'Platform administrator', location: 'New Delhi, India' },
  { id: 'u2', name: 'Ravi Briquettes', email: 'seller@smartbriqquetes.com', role: 'SELLER',  bio: 'Premium briquette manufacturer', location: 'Mumbai, India' },
  { id: 'u3', name: 'Priya Sharma',    email: 'customer@smartbriqquetes.com', role: 'CUSTOMER', bio: '', location: '' },
];
