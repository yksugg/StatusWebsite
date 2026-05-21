import { useCallback, useEffect, useState } from 'react';
import {
  getOrders,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_OPTIONS,
  updateOrderStatus,
} from '../../mock-backend/orders';
import type { MockOrder, MockOrderStatus } from '../../mock-backend/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<MockOrder[]>(() => getOrders());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refresh = useCallback(() => setOrders(getOrders()), []);

  useEffect(() => {
    window.addEventListener('ordersUpdated', refresh);
    return () => window.removeEventListener('ordersUpdated', refresh);
  }, [refresh]);

  if (orders.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-8 text-center text-gray-600">
        <h2 className="text-lg font-semibold text-[#004B87] mb-2">Orders</h2>
        <p>No mock orders yet. Place a guest checkout on the storefront to create one.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[#004B87]">Mock orders ({orders.length})</h2>
      {orders.map((order) => {
        const expanded = expandedId === order.id;
        return (
          <div key={order.id} className="bg-white border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setExpandedId(expanded ? null : order.id)}
              className="w-full text-left px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:bg-gray-50"
            >
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>{order.guest.fullName}</span>
                <span className="font-medium">£{order.total.toFixed(2)}</span>
                <span className="px-2 py-1 rounded bg-blue-50 text-[#004B87]">
                  {ORDER_STATUS_LABELS[order.status]}
                </span>
              </div>
            </button>

            {expanded && (
              <div className="px-4 pb-4 border-t bg-gray-50 space-y-4 text-sm">
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="font-medium text-gray-700">Customer</p>
                    <p>{order.guest.fullName}</p>
                    <p>{order.guest.email}</p>
                    {order.guest.phone && <p>{order.guest.phone}</p>}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Delivery (UK)</p>
                    <p>{order.guest.line1}</p>
                    {order.guest.line2 && <p>{order.guest.line2}</p>}
                    <p>
                      {order.guest.city}
                      {order.guest.county ? `, ${order.guest.county}` : ''}
                    </p>
                    <p>{order.guest.postcode}</p>
                    <p>{order.guest.country}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-2">Items</p>
                  <ul className="space-y-1">
                    {order.items.map((line, i) => (
                      <li key={i} className="flex justify-between gap-2">
                        <span>
                          {line.name} × {line.quantity} ({line.sku})
                        </span>
                        <span>£{line.lineTotal.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-6">
                  <p>
                    Subtotal: <strong>£{order.subtotal.toFixed(2)}</strong>
                  </p>
                  <p>
                    Shipping:{' '}
                    <strong>
                      {order.shipping === 0 ? 'FREE' : `£${order.shipping.toFixed(2)}`}
                    </strong>
                  </p>
                  <p>
                    Total: <strong>£{order.total.toFixed(2)}</strong>
                  </p>
                  <p className="text-gray-600">{order.shippingMethod}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="font-medium text-gray-700">Order status</label>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      updateOrderStatus(order.id, e.target.value as MockOrderStatus);
                      refresh();
                    }}
                    className="border rounded-lg px-3 py-2 bg-white"
                  >
                    {ORDER_STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {ORDER_STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
