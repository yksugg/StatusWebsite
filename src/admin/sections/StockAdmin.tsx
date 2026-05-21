import { useCallback, useEffect, useState } from 'react';
import { getAllProductsForAdmin, resetStockToSeed, setProductStock } from '../../mock-backend/products';
import type { MockProduct } from '../../mock-backend/types';

function statusLabel(p: MockProduct) {
  if (p.stockStatus === 'out-of-stock') return 'Out of stock';
  if (p.stockStatus === 'low-stock') return 'Low stock';
  return 'In stock';
}

function statusClass(p: MockProduct) {
  if (p.stockStatus === 'out-of-stock') return 'text-red-700';
  if (p.stockStatus === 'low-stock') return 'text-orange-700';
  return 'text-green-700';
}

export default function StockAdmin() {
  const [products, setProducts] = useState(() => getAllProductsForAdmin());
  const [draft, setDraft] = useState<Record<string, string>>({});

  const refresh = useCallback(() => {
    setProducts(getAllProductsForAdmin());
    setDraft({});
  }, []);

  useEffect(() => {
    window.addEventListener('stockUpdated', refresh);
    window.addEventListener('catalogUpdated', refresh);
    return () => {
      window.removeEventListener('stockUpdated', refresh);
      window.removeEventListener('catalogUpdated', refresh);
    };
  }, [refresh]);

  const applyStock = (id: string) => {
    const raw = draft[id];
    const qty = raw !== undefined ? parseInt(raw, 10) : NaN;
    if (Number.isNaN(qty) || qty < 0) return;
    setProductStock(id, qty);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-[#004B87]">Stock levels</h2>
        <button
          type="button"
          onClick={() => {
            resetStockToSeed();
            refresh();
          }}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          Reset all stock to seed values
        </button>
      </div>

      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3 font-medium">Product</th>
              <th className="text-left p-3 font-medium">SKU</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium w-32">Stock</th>
              <th className="p-3 w-24" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 max-w-xs">
                  <span className="line-clamp-2">{p.name}</span>
                </td>
                <td className="p-3 text-gray-600">{p.sku}</td>
                <td className={`p-3 font-medium ${statusClass(p)}`}>{statusLabel(p)}</td>
                <td className="p-3">
                  <input
                    type="number"
                    min={0}
                    className="w-full border rounded px-2 py-1"
                    value={draft[p.id] ?? String(p.stock)}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [p.id]: e.target.value }))
                    }
                  />
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={() => applyStock(p.id)}
                    className="text-[#008BB1] hover:underline text-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
