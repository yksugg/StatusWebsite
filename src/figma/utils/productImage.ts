import type { Product } from '../data/products';

const FALLBACK =
  'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400';

/** Placeholder map used when no admin image URL is set. */
const legacyPlaceholders: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=400',
  '2': 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=400',
  '3': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '4': 'https://images.unsplash.com/photo-1619641805634-b867f535071c?w=400',
  '5': 'https://images.unsplash.com/photo-1685342654383-584d56907425?w=400',
  '6': 'https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=400',
  '7': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '8': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '9': 'https://images.unsplash.com/photo-1511461744085-90a4d1c66be3?w=400',
  '10': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '11': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '12': 'https://images.unsplash.com/photo-1619641805634-b867f535071c?w=400',
  '13': 'https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?w=400',
  '14': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '15': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '16': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '17': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '18': 'https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?w=400',
  '19': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '20': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '21': 'https://images.unsplash.com/photo-1511461744085-90a4d1c66be3?w=400',
  '22': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '23': 'https://images.unsplash.com/photo-1685342654383-584d56907425?w=400',
  '24': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
};

function isResolvableImage(src: string | undefined): boolean {
  if (!src?.trim()) return false;
  return (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/') ||
    src.startsWith('data:')
  );
}

export function resolveProductImageUrl(
  product: Pick<Product, 'id' | 'images'>,
  size: 'thumb' | 'large' = 'thumb',
): string {
  const primary = product.images[0];
  if (isResolvableImage(primary)) {
    if (size === 'large' && primary!.includes('unsplash') && primary!.includes('w=400')) {
      return primary!.replace('w=400', 'w=800');
    }
    return primary!;
  }
  const legacy = legacyPlaceholders[product.id];
  if (legacy) {
    return size === 'large' ? legacy.replace('w=400', 'w=800') : legacy;
  }
  return size === 'large' ? FALLBACK.replace('w=400', 'w=800') : FALLBACK;
}
