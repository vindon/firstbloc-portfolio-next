import { products, type Product } from './products';
import { roadmapStatusOf, type RoadmapStatus } from './roadmap';
import { deployments, type Deployment } from './deployments';

export type EnrichedProduct = Product & {
  roadmapStatus: RoadmapStatus;
  deployment: Deployment | null;
};

export function getEnrichedProducts(): EnrichedProduct[] {
  return products.map((product) => ({
    ...product,
    roadmapStatus: roadmapStatusOf(product),
    deployment: deployments.find((deployment) => deployment.productId === product.id) ?? null,
  }));
}
