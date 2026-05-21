import { useState } from 'react';
import { clearCart } from '../../mock-backend/cart';
import {
  clearMockOrders,
  resetMockBackend,
  resetStock,
} from '../../mock-backend';
import { clearProductOverrides } from '../../mock-backend/product-overrides';
import { MOCK_STORAGE_KEYS } from '../../mock-backend/storage';

export default function SettingsAdmin() {
  const [message, setMessage] = useState<string | null>(null);

  const notify = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const actions = [
    {
      label: 'Reset mock backend',
      description: 'Clears cart, orders, stock overrides, and product edits. Restores seed stock.',
      onClick: () => {
        resetMockBackend();
        notify('Mock backend reset.');
      },
      variant: 'danger' as const,
    },
    {
      label: 'Reset stock only',
      description: 'Restores stock quantities from seed data.',
      onClick: () => {
        resetStock();
        notify('Stock reset to seed values.');
      },
      variant: 'default' as const,
    },
    {
      label: 'Clear mock orders',
      description: 'Removes all orders from localStorage.',
      onClick: () => {
        clearMockOrders();
        notify('Mock orders cleared.');
      },
      variant: 'default' as const,
    },
    {
      label: 'Clear cart',
      description: 'Empties the storefront shopping cart.',
      onClick: () => {
        clearCart();
        notify('Cart cleared.');
      },
      variant: 'default' as const,
    },
    {
      label: 'Clear product edits',
      description: 'Removes admin product overrides only (keeps stock/orders/cart).',
      onClick: () => {
        clearProductOverrides();
        notify('Product overrides cleared.');
      },
      variant: 'default' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#004B87]">Settings / Dev tools</h2>
        <p className="text-sm text-gray-600 mt-1">
          Destructive actions affect localStorage only. Use during local testing.
        </p>
      </div>

      {message && (
        <p className="text-sm text-green-800 bg-green-50 border border-green-200 rounded px-4 py-2">
          {message}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <div key={action.label} className="bg-white border rounded-lg p-4 flex flex-col">
            <h3 className="font-medium mb-1">{action.label}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-1">{action.description}</p>
            <button
              type="button"
              onClick={action.onClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                action.variant === 'danger'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border hover:bg-gray-50'
              }`}
            >
              Run
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-medium mb-2">localStorage keys</h3>
        <ul className="text-sm font-mono text-gray-700 space-y-1">
          {Object.entries(MOCK_STORAGE_KEYS).map(([label, key]) => (
            <li key={key}>
              <span className="text-gray-500">{label}:</span> {key}
            </li>
          ))}
          <li>
            <span className="text-gray-500">wishlist / recent / legacy user:</span> separate
            figma keys
          </li>
        </ul>
      </div>

      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
        Admin login uses hard-coded credentials for prototyping only. Never deploy this auth to
        production.
      </p>
    </div>
  );
}
