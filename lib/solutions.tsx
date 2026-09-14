export type Solution = {
  id: string;
  iconClass: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
};

export const solutions: Solution[] = [
  {
    id: 'strategy',
    iconClass: '-orange -lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M14.8 9.2 13 13l-3.8 1.8L11 11z" />
      </svg>
    ),
    title: 'AI Strategy Consulting',
    description:
      'A clear, practical perspective on your AI roadmap — assessing where agentic systems and automation deliver genuine P&L leverage, and where simpler solutions work best.',
    items: [
      'CX automation & contact center strategy',
      'Build-vs-buy & technical roadmap reviews',
      'Workflow feasibility & unit economics assessments',
    ],
  },
  {
    id: 'product',
    iconClass: '-sage -lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.2" />
        <g>
          <line x1="12" y1="6.5" x2="12" y2="4.5" />
          <line x1="12" y1="19.5" x2="12" y2="17.5" />
          <line x1="6.5" y1="12" x2="4.5" y2="12" />
          <line x1="19.5" y1="12" x2="17.5" y2="12" />
          <line x1="8.4" y1="8.4" x2="7" y2="7" />
          <line x1="17" y1="17" x2="15.6" y2="15.6" />
          <line x1="15.6" y1="8.4" x2="17" y2="7" />
          <line x1="7" y1="17" x2="8.4" y2="15.6" />
        </g>
      </svg>
    ),
    title: 'Product Building',
    description:
      'Hands-on delivery of production-grade agentic AI systems — from working prototypes to complete pipelines with automated testing, tracing, and human-in-the-loop controls.',
    items: [
      'Multi-agent & LangGraph systems',
      'Document intelligence & unstructured data extraction',
      'CX automation pipelines with automated evals',
    ],
  },
  {
    id: 'contract',
    iconClass: '-blue -lg',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="11.5" rx="1.6" />
        <path d="M9 8V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V8" />
        <line x1="4" y1="13.5" x2="20" y2="13.5" />
      </svg>
    ),
    title: 'Fractional AI Leadership',
    description:
      'Senior Manager to Director-level fractional or embedded advisory — partnering with your team for defined scopes in AI strategy, analytics, or CX transformation.',
    items: [
      'Interim AI leadership & strategic roadmaps',
      'Bridging business objectives to engineering delivery',
      'Guiding high-impact sprints & evaluation criteria',
    ],
  },
];
