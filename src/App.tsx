import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './mock-backend';
import AdminApp from './admin/AdminApp';
import StatusEcommerce from './figma/main';
import { isAdminRoute } from './utils/routing';

function Root() {
  const [pathname, setPathname] = useState(
    () => window.location.pathname,
  );

  useEffect(() => {
    const onNavigate = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, []);

  if (isAdminRoute(pathname)) {
    return <AdminApp />;
  }

  return <StatusEcommerce />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
