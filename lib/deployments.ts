export type Deployment = {
  productId: string;
  status: 'live' | 'building';
  where: string;
  how: string;
  why: string;
  evidenceTags: string[];
};

// Founder Research Intelligence Engine is deliberately excluded — nothing
// runs anywhere yet, so it has no place in a "where it's deployed" list.
export const deployments: Deployment[] = [
  {
    productId: 'pulseguard',
    status: 'live',
    where: 'Vercel (console) + Render (agent workers)',
    how: 'GitHub Actions CI, deploy on green',
    why: 'FastAPI/Redis Streams agents run continuously, polling social feeds',
    evidenceTags: ['Observability — per-agent-step trace', 'Control gates — escalation requires approval'],
  },
  {
    productId: 'call-intelligence',
    status: 'live',
    where: 'Streamlit Community Cloud',
    how: 'Deploy on tagged release, gated by the test suite',
    why: 'Fastest path to a public Streamlit UI demo',
    evidenceTags: ['Evals — 364/364 tests passed', 'Observability — structured output per call'],
  },
  {
    productId: 'signalharvest',
    status: 'live',
    where: 'Vercel (console) + Render (agent workers)',
    how: 'GitHub Actions CI, deploy on green',
    why: 'Scheduled polling (PRAW, pytrends, CFPB API) needs a persistent process',
    evidenceTags: ['Evals — regression suite gates changes', 'Input sanitization — scraped input treated as data'],
  },
  {
    productId: 'cfpb',
    status: 'building',
    where: 'Local — not yet public',
    how: 'Manual runs during active development',
    why: 'Extraction pipeline still being hardened before a public demo',
    evidenceTags: ['Input sanitization — scraped filings treated as data', 'Governance — schema-validated output only'],
  },
  {
    productId: 'rag-portfolio',
    status: 'building',
    where: 'Local — Ollama embeddings',
    how: 'Manual runs during active development',
    why: 'Local embeddings keep it running on-machine for now',
    evidenceTags: ['Inference — Groq for generation, local Ollama for embeddings', 'Security — no client documents leave the machine'],
  },
];
