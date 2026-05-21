/** UK-only shipping — edit these values when connecting a real carrier API. */
export const UK_SHIPPING_CONFIG = {
  countryCode: 'GB' as const,
  countryName: 'United Kingdom',
  methodId: 'uk-standard',
  methodLabel: 'UK Standard Delivery',
  /** Flat rate when subtotal is below freeShippingThreshold (GBP). */
  standardRate: 4.99,
  /** Orders at or above this subtotal get free shipping (GBP). */
  freeShippingThreshold: 50,
};

export function calculateUkShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= UK_SHIPPING_CONFIG.freeShippingThreshold
    ? 0
    : UK_SHIPPING_CONFIG.standardRate;
}
