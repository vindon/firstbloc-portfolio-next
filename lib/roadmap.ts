import { products, type Product } from './products';

export type RoadmapStatus = 'shipped' | 'building' | 'planned';

// Derived from the same stageTag copy already shown on the homepage
// carousel, so the roadmap can't drift out of sync with what the product
// cards say about themselves.
export function roadmapStatusOf(product: Product): RoadmapStatus {
  if (product.isExploration) return 'planned';
  return product.stageTag.startsWith('Production-grade') ? 'shipped' : 'building';
}

const COLUMN_LABELS: Record<RoadmapStatus, string> = {
  shipped: 'Shipped',
  building: 'Building',
  planned: 'Planned',
};

export const roadmapColumns: { status: RoadmapStatus; label: string; products: Product[] }[] = (
  ['shipped', 'building', 'planned'] as RoadmapStatus[]
).map((status) => ({
  status,
  label: COLUMN_LABELS[status],
  products: products.filter((product) => roadmapStatusOf(product) === status),
}));
