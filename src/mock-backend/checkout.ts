import { clearCart, getCart, validateCartStock } from './cart';
import { createOrderNumber, saveOrder } from './orders';
import { getProductById, reduceStock } from './products';
import { calculateUkShipping, UK_SHIPPING_CONFIG } from './shipping';
import type { CheckoutResult, GuestCheckoutInput, MockOrder, OrderLine } from './types';

/** Simple UK postcode validation (outward + inward). */
export function isValidUkPostcode(postcode: string): boolean {
  const normalized = postcode.trim().toUpperCase().replace(/\s+/g, ' ');
  return /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/.test(normalized);
}

export function normalizeUkPostcode(postcode: string): string {
  const compact = postcode.trim().toUpperCase().replace(/\s+/g, '');
  if (compact.length < 5) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

function validateGuestDetails(guest: GuestCheckoutInput): string | null {
  if (!guest.fullName.trim()) return 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) return 'Valid email is required';
  if (!guest.line1.trim()) return 'Address line 1 is required';
  if (!guest.city.trim()) return 'Town or city is required';
  if (!isValidUkPostcode(guest.postcode)) return 'Enter a valid UK postcode';
  if (guest.country !== 'United Kingdom') return 'We only ship to the United Kingdom';
  return null;
}

export function buildOrderLines(): OrderLine[] {
  return getCart()
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      return {
        productId: product.id,
        sku: product.sku,
        name: product.name,
        quantity: line.quantity,
        unitPrice: product.price,
        lineTotal: product.price * line.quantity,
      };
    })
    .filter((line): line is OrderLine => Boolean(line));
}

export function calculateCartSubtotal(): number {
  return buildOrderLines().reduce((sum, line) => sum + line.lineTotal, 0);
}

export function submitGuestCheckout(guest: GuestCheckoutInput): CheckoutResult {
  const validationError = validateGuestDetails(guest);
  if (validationError) return { ok: false, error: validationError };

  const cart = getCart();
  if (cart.length === 0) return { ok: false, error: 'Your cart is empty' };

  const stockCheck = validateCartStock();
  if (!stockCheck.valid) {
    return { ok: false, error: stockCheck.errors[0] ?? 'Stock unavailable' };
  }

  const items = buildOrderLines();
  if (items.length === 0) return { ok: false, error: 'No valid items in cart' };

  for (const line of items) {
    if (!reduceStock(line.productId, line.quantity)) {
      return { ok: false, error: `${line.name} no longer has enough stock` };
    }
  }

  const subtotal = items.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = calculateUkShipping(subtotal);
  const order: MockOrder = {
    id: crypto.randomUUID(),
    orderNumber: createOrderNumber(),
    createdAt: new Date().toISOString(),
    guest: {
      ...guest,
      postcode: normalizeUkPostcode(guest.postcode),
      country: 'United Kingdom',
    },
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    shippingMethod: UK_SHIPPING_CONFIG.methodLabel,
    status: 'mock_received',
  };

  saveOrder(order);
  clearCart();

  return { ok: true, order };
}
