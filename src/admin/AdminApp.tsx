import { useEffect, useState } from 'react';
import { isAdminLoggedIn, logoutAdmin } from '../mock-backend/admin-auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());

  useEffect(() => {
    document.title = loggedIn
      ? 'Status Mock Admin'
      : 'Status Mock Admin — Login';
  }, [loggedIn]);

  if (!loggedIn) {
    return <AdminLogin onLoggedIn={() => setLoggedIn(true)} />;
  }

  return (
    <AdminDashboard
      onLogout={() => {
        logoutAdmin();
        setLoggedIn(false);
      }}
    />
  );
}
