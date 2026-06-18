import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import CustomerDashboard from './CustomerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'ADMIN' || user.role === 'SELLER') return <AdminDashboard />;
  return <CustomerDashboard />;
}
