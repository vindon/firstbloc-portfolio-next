export type Solution = {
  id: string;
  iconClass: string;
  iconId: string;
  title: string;
  description: string;
  items: string[];
};

export const solutions: Solution[] = [
  {
    id: 'strategy',
    iconClass: '-orange -lg',
    iconId: 'strategy',
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
    iconId: 'product',
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
    iconId: 'contract',
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
