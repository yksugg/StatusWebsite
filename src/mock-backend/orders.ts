import { dispatchMockEvent, MOCK_STORAGE_KEYS, readJson, writeJson } from './storage';
import type { MockOrder, MockOrderStatus } from './types';

function normalizeOrder(order: MockOrder): MockOrder {
  const legacy = order.status as string;
  const status: MockOrderStatus =
    legacy === 'confirmed' ? 'mock_received' : (order.status as MockOrderStatus);
  return { ...order, status };
}

export function getOrders(): MockOrder[] {
  return readJson<MockOrder[]>(MOCK_STORAGE_KEYS.orders, []).map(normalizeOrder);
}

export function saveOrder(order: MockOrder): void {
  const orders = getOrders();
  orders.unshift(normalizeOrder(order));
  writeJson(MOCK_STORAGE_KEYS.orders, orders);
  dispatchMockEvent('ordersUpdated');
}

export function updateOrderStatus(orderId: string, status: MockOrderStatus): void {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return;
  orders[index] = { ...orders[index], status };
  writeJson(MOCK_STORAGE_KEYS.orders, orders);
  dispatchMockEvent('ordersUpdated');
}

export function clearMockOrders(): void {
  writeJson(MOCK_STORAGE_KEYS.orders, []);
  dispatchMockEvent('ordersUpdated');
}

export function getOrderByNumber(orderNumber: string): MockOrder | undefined {
  return getOrders().find((o) => o.orderNumber === orderNumber);
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

export function createOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `STU-${y}${m}${d}-${randomSuffix()}`;
}

export const ORDER_STATUS_OPTIONS: MockOrderStatus[] = [
  'mock_received',
  'processing',
  'dispatched',
  'cancelled',
];

export const ORDER_STATUS_LABELS: Record<MockOrderStatus, string> = {
  mock_received: 'Mock received',
  processing: 'Processing',
  dispatched: 'Dispatched',
  cancelled: 'Cancelled',
};
