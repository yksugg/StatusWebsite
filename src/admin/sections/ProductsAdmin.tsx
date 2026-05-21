import { useCallback, useEffect, useState } from 'react';
import { getProductOverride, saveProductOverride } from '../../mock-backend/product-overrides';
import { getAllProductsForAdmin } from '../../mock-backend/products';
import type { MockProduct, ProductOverride } from '../../mock-backend/types';

function stockBadge(status: MockProduct['stockStatus']) {
  if (status === 'out-of-stock') return 'bg-red-100 text-red-800';
  if (status === 'low-stock') return 'bg-orange-100 text-orange-800';
  return 'bg-green-100 text-green-800';
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<MockProduct[]>(() => getAllProductsForAdmin());
  const [selectedId, setSelectedId] = useState<string | null>(products[0]?.id ?? null);
  const [form, setForm] = useState<ProductOverride & { active: boolean }>({ active: true });
  const [saved, setSaved] = useState(false);

  const refresh = useCallback(() => {
    const list = getAllProductsForAdmin();
    setProducts(list);
    if (selectedId) {
      const p = list.find((x) => x.id === selectedId);
      if (p) loadForm(p);
    }
  }, [selectedId]);

  const loadForm = (product: MockProduct) => {
    const override = getProductOverride(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      imageUrl: product.images[0] ?? '',
      active: override?.active !== false,
    });
  };

  useEffect(() => {
    window.addEventListener('catalogUpdated', refresh);
    window.addEventListener('stockUpdated', refresh);
    return () => {
      window.removeEventListener('catalogUpdated', refresh);
      window.removeEventListener('stockUpdated', refresh);
    };
  }, [refresh]);

  const selected = products.find((p) => p.id === selectedId);

  useEffect(() => {
    if (selected) loadForm(selected);
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;
    saveProductOverride(selectedId, {
      name: form.name,
      sku: form.sku,
      category: form.category,
      subcategory: form.subcategory,
      price: Number(form.price),
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      imageUrl: form.imageUrl,
      active: form.active,
    });
    setSaved(true);
    refresh();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white border rounded-lg overflow-hidden">
        <div className="p-4 border-b font-semibold text-[#004B87]">All products ({products.length})</div>
        <ul className="max-h-[32rem] overflow-y-auto divide-y">
          {products.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => handleSelect(p.id)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                  selectedId === p.id ? 'bg-blue-50' : ''
                }`}
              >
                <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                <p className="text-xs text-gray-500">{p.sku}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded ${stockBadge(p.stockStatus)}`}>
                    {p.stock} in stock
                  </span>
                  {!p.active && (
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                      Inactive
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <form onSubmit={handleSave} className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#004B87]">Edit product</h2>
            {saved && (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
                Saved to localStorage
              </p>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              />
              <span className="text-sm font-medium">Active (visible on storefront)</span>
            </label>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  type="text"
                  required
                  value={form.sku ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (£)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={form.price ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={form.category ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <input
                  type="text"
                  value={form.subcategory ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, subcategory: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short description</label>
              <textarea
                rows={2}
                value={form.shortDescription ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Long description</label>
              <textarea
                rows={4}
                value={form.longDescription ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL or path</label>
              <input
                type="text"
                placeholder="https://… or /placeholders/product.svg"
                value={form.imageUrl ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="mt-3 max-h-40 rounded border object-contain bg-gray-50"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-[#00B3E3] text-white rounded-lg hover:bg-[#008BB1] font-medium"
            >
              Save changes
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Select a product to edit.</p>
        )}
      </div>
    </div>
  );
}
