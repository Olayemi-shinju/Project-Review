import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


import { isAdmin } from '../../utils/isAdmin';
import { observeAuthState } from '../../firebase/services/authService';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#64748B]">Checking authentication...</p>
      </div>
    );
  }

  if (!user || !isAdmin(user)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
