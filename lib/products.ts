export type Product = {
  id: string;
  title: string;
  stageTag: string;
  isExploration?: boolean;
  problem: string;
  description: string;
  techTags: string[];
  iconId: string;
  demoUrl: string;
};

export const products: Product[] = [
  {
    id: 'pulseguard',
    title: 'PulseGuard AI',
    stageTag: 'Building',
    problem: 'Social complaints escalate into PR crises before anyone on the CX team sees them.',
    description:
      'A 4-agent triage system (Sentinel → Triage → Resolver → Escalation) that watches X, Reddit, Trustpilot, and app stores for telecom CX, sanitizes PII, and routes what actually matters to a human through a clear escalation gate, keeping alert volume manageable for the team.',
    techTags: ['LangGraph', 'FastMCP', 'Redis Streams', 'FastAPI'],
    demoUrl: 'https://pulseguard-console.vercel.app/',
    iconId: 'pulseguard',
  },
  {
    id: 'call-intelligence',
    title: 'Telecom Call Intelligence',
    stageTag: 'Production-grade build',
    problem: 'Thousands of support calls happen every day and almost none of them turn into structured, usable intelligence.',
    description:
      'A 7-node LangGraph pipeline that extracts 70+ structured fields per call using a six-phase call-anatomy framework, validated against 50,000+ real transcripts — giving CX leaders QA and insight data automatically, at full call volume.',
    techTags: ['Haiku 4.5', 'NVIDIA NIM Llama 3.3', 'Streamlit', '364 tests'],
    demoUrl: 'https://telecom-call-intelligence.streamlit.app/',
    iconId: 'call-intelligence',
  },
  {
    id: 'signalharvest',
    title: 'SignalHarvest AI',
    stageTag: 'Building',
    problem: "Early market and complaint signals sit scattered across free public sources, unread until they're expensive.",
    description:
      'A 5-agent pipeline (Sentinel, Classifier, Scorer, Curator, Publisher) that harvests, scores, and curates signals from Reddit, Google Trends, and CFPB filings into a digest — so individuals and small teams get an early-warning system without paid monitoring tools.',
    techTags: ['LangGraph', 'PRAW', 'pytrends', 'CFPB API'],
    demoUrl: 'https://signalharvest-console.vercel.app/',
    iconId: 'signalharvest',
  },
  {
    id: 'cfpb',
    title: 'CFPB Credit Agreement Intelligence',
    stageTag: 'Planned',
    isExploration: true,
    problem: 'Extracting terms from credit card agreements filed with regulators is still a manual, error-prone read-through.',
    description:
      'A Playwright-driven scraper feeding a two-pass extraction pipeline against a strict Pydantic schema, surfaced through a Streamlit UI — turning unstructured regulatory filings into clean, queryable data for compliance and fintech teams.',
    techTags: ['Playwright', 'Pydantic', 'Streamlit'],
    demoUrl: '#',
    iconId: 'cfpb',
  },
  {
    id: 'rag-portfolio',
    title: 'Enterprise RAG Portfolio',
    stageTag: 'Building',
    problem: 'Most RAG demos fall apart the moment real enterprise document mess shows up.',
    description:
      'Five production-grade RAG builds — HR Q&A, contract review, marketing content hub, hybrid-search tech docs, and a multi-agent IT helpdesk — run on Groq inference and local Ollama embeddings, proving the pattern across genuinely different document types.',
    techTags: ['Groq', 'Ollama', 'Hybrid Search'],
    demoUrl: '#',
    iconId: 'rag-portfolio',
  },
  {
    id: 'shanti-news',
    title: 'Shanti News',
    stageTag: 'Production-grade build',
    problem: 'Indian news feeds optimize for outrage and clickbait, burying calm, verified reporting under sensational noise.',
    description:
      'A deterministic ingest and moderation pipeline that pulls from 11 verified Indian desks (The Hindu, Indian Express, PTI, Reuters India, and more), rejects clickbait through regex and heuristic scoring, and enforces editorial quotas — at least 2 constructive stories, at most 3 sensitive ones, 4+ desks represented — in every published edition.',
    techTags: ['TypeScript', 'Node.js', 'Vitest', 'Tailwind CSS'],
    demoUrl: 'https://ais-pre-npg7tn7nbq2nu76vuwngb7-490054790045.asia-southeast1.run.app',
    iconId: 'shanti-news',
  },
  {
    id: 'founder-research',
    title: 'Founder Research Intelligence Engine',
    stageTag: 'Building',
    problem: "Founders and operators need deep, current research on people and markets, but good research doesn't scale on a human analyst's time.",
    description:
      'An agentic research pipeline being evaluated as a retainer or report-based product — currently being tested against real client use cases before I commit build time to it.',
    techTags: ['Agentic Research', 'Concept Stage'],
    demoUrl: '#',
    iconId: 'founder-research',
  },
  {
    id: 'clearspend',
    title: 'ClearSpend',
    stageTag: 'Planned',
    isExploration: true,
    problem: 'Tracking personal spending in India means either logging every purchase by hand or handing a banking app your login just so it can mine your data.',
    description:
      'A privacy-first Android expense tracker that reads bank SMS alerts from 30+ Indian banks with on-device regex (no bank login, no UPI credentials) and parses receipt photos through on-device OCR plus a lightweight Gemini Flash step — turning scattered spending signals into a categorized budget view without a login screen in sight.',
    techTags: ['Kotlin', 'Jetpack Compose', 'Gemini Flash', 'ML Kit OCR'],
    demoUrl: '#',
    iconId: 'clearspend',
  },
];
