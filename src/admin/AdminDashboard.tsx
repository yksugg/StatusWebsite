import { useState } from 'react';
import { getAdminSession } from '../mock-backend/admin-auth';
import ProductsAdmin from './sections/ProductsAdmin';
import OrdersAdmin from './sections/OrdersAdmin';
import StockAdmin from './sections/StockAdmin';
import SettingsAdmin from './sections/SettingsAdmin';

type Tab = 'products' | 'orders' | 'stock' | 'settings';

type Props = {
  onLogout: () => void;
};

const TABS: { id: Tab; label: string }[] = [
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders' },
  { id: 'stock', label: 'Stock' },
  { id: 'settings', label: 'Settings / Dev tools' },
];

export default function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('products');
  const session = getAdminSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#004B87] text-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-blue-200">Mock admin panel</p>
            <h1 className="text-xl font-semibold">Status Ecommerce Admin</h1>
            {session && (
              <p className="text-sm text-blue-100 mt-1">Signed in as {session.username}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={import.meta.env.BASE_URL}
              className="text-sm px-3 py-2 rounded border border-white/30 hover:bg-white/10"
            >
              View storefront
            </a>
            <button
              type="button"
              onClick={onLogout}
              className="text-sm px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap ${
                tab === item.id
                  ? 'border-[#00B3E3] text-[#004B87]'
                  : 'border-transparent text-gray-600 hover:text-[#004B87]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'products' && <ProductsAdmin />}
        {tab === 'orders' && <OrdersAdmin />}
        {tab === 'stock' && <StockAdmin />}
        {tab === 'settings' && <SettingsAdmin />}
      </main>
    </div>
  );
}
