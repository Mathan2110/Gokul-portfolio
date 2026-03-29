import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { user, token } = useApp();

  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Verifying..." />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}