import { describe, it, expect } from 'vitest';
import { getEnrichedProducts } from './product-catalog';
import { products } from './products';
import { deployments } from './deployments';

describe('getEnrichedProducts', () => {
  it('returns one enriched entry per catalog product, in catalog order', () => {
    const enriched = getEnrichedProducts();
    expect(enriched.map((p) => p.id)).toEqual(products.map((p) => p.id));
  });

  it('attaches the matching deployment by productId', () => {
    const enriched = getEnrichedProducts();
    const pulseguard = enriched.find((p) => p.id === 'pulseguard')!;
    expect(pulseguard.deployment).toEqual(deployments.find((d) => d.productId === 'pulseguard'));
  });

  it('sets deployment to null for a product with no deployment entry', () => {
    const enriched = getEnrichedProducts();
    const founderResearch = enriched.find((p) => p.id === 'founder-research')!;
    expect(founderResearch.deployment).toBeNull();
  });

  it('derives roadmapStatus consistently with roadmapStatusOf', () => {
    const enriched = getEnrichedProducts();
    const shipped = enriched.find((p) => p.id === 'call-intelligence')!;
    const planned = enriched.find((p) => p.id === 'cfpb')!;
    expect(shipped.roadmapStatus).toBe('shipped');
    expect(planned.roadmapStatus).toBe('planned');
  });
});
