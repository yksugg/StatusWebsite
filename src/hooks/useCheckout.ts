import { useCallback, useState } from 'react';
import { submitGuestCheckout } from '../mock-backend/checkout';
import type { GuestCheckoutInput, MockOrder } from '../mock-backend/types';

const emptyGuest: GuestCheckoutInput = {
  fullName: '',
  email: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  county: '',
  postcode: '',
  country: 'United Kingdom',
};

export function useCheckout() {
  const [guest, setGuest] = useState<GuestCheckoutInput>(emptyGuest);
  const [error, setError] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<MockOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const updateGuest = useCallback((patch: Partial<GuestCheckoutInput>) => {
    setGuest((current) => ({ ...current, ...patch, country: 'United Kingdom' }));
    setError(null);
  }, []);

  const placeOrderWithGuest = useCallback((checkoutGuest: GuestCheckoutInput) => {
    const normalizedGuest: GuestCheckoutInput = {
      ...checkoutGuest,
      country: 'United Kingdom',
    };
    setSubmitting(true);
    setError(null);
    const result = submitGuestCheckout(normalizedGuest);
    setSubmitting(false);
    if (!result.ok) {
      setGuest(normalizedGuest);
      setError(result.error);
      return null;
    }
    setLastOrder(result.order);
    setGuest(emptyGuest);
    return result.order;
  }, []);

  const placeOrder = useCallback(() => {
    return placeOrderWithGuest(guest);
  }, [guest, placeOrderWithGuest]);

  const reset = useCallback(() => {
    setGuest(emptyGuest);
    setError(null);
    setLastOrder(null);
  }, []);

  return {
    guest,
    updateGuest,
    error,
    lastOrder,
    submitting,
    placeOrder,
    placeOrderWithGuest,
    reset,
  };
}
