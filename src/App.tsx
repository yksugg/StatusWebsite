import React from 'react';
import { createRoot } from 'react-dom/client';
import StatusEcommerce from './figma/main';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StatusEcommerce />
  </React.StrictMode>
);
