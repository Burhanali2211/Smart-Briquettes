import { createContext, useContext, useState } from 'react';
import { MOCK_AUTH_USERS } from '../lib/mockData';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sb_user')); } catch { return null; }
  });
  const [loading] = useState(false);

  const login = async (email, password) => {
    const found = MOCK_AUTH_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) throw new Error('No account found with that email');
    localStorage.setItem('sb_user', JSON.stringify(found));
    setUser(found);
    return true;
  };

  const register = async (name, email, password, role) => {
    const newUser = { id: `u${Date.now()}`, name, email, role: role || 'CUSTOMER', bio: '', location: '' };
    localStorage.setItem('sb_user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('sb_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
