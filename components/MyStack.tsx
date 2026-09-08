import { products } from '@/lib/products';
import { deployments } from '@/lib/deployments';

const STACK_GROUPS = [
  {
    id: 'ai-agents',
    title: 'AI & Agents',
    note: 'Core layer',
    rows: [
      { name: 'LangGraph', desc: 'Orchestration across PulseGuard, Telecom Call Intelligence, and SignalHarvest', status: 'live' as const },
      { name: 'Claude / Haiku 4.5', desc: 'Anthropic models in production, Claude Agent SDK for the dev workflow', status: 'live' as const },
      { name: 'NVIDIA NIM (Llama 3.3)', desc: 'Secondary inference for the telecom call pipeline', status: 'live' as const },
      { name: 'FastMCP', desc: 'Agent tool layer for PulseGuard', status: 'live' as const },
    ],
  },
  {
    id: 'product-frontend',
    title: 'Product & Frontend',
    note: 'What ships',
    rows: [
      { name: 'Next.js + React', desc: 'This site and every product console — App Router, TypeScript', status: 'live' as const },
      { name: 'Streamlit', desc: 'Demo UIs for Telecom Call Intelligence and the CFPB tool', status: 'live' as const },
      { name: 'Hand-rolled CSS system', desc: 'Token-based design system, no component library', status: 'live' as const },
    ],
  },
  {
    id: 'infra-delivery',
    title: 'Infra & Delivery',
    note: 'Where it runs',
    rows: [
      { name: 'Vercel', desc: 'This site, plus the PulseGuard and SignalHarvest consoles', status: 'live' as const },
      { name: 'Render', desc: 'Backend agent workers for PulseGuard and SignalHarvest', status: 'live' as const },
      { name: 'GitHub + Actions', desc: 'Source control and CI across every repo', status: 'live' as const },
      { name: 'Claude Code', desc: 'Agentic dev workflow for building and shipping everything above', status: 'building' as const },
    ],
  },
];

const STATUS_LABEL: Record<'live' | 'building', string> = {
  live: 'In production',
  building: 'Daily driver',
};

const DEPLOY_STATUS_LABEL: Record<'live' | 'building', string> = {
  live: 'Live',
  building: 'Building',
};

export default function MyStack() {
  return (
    <section>
      <div className="wrap">
        <div className="page-head">
          <span className="kicker">/mystack</span>
          <h1>My Stack</h1>
          <p>What I actually build with — the models, frameworks, and infrastructure.</p>
        </div>

        {STACK_GROUPS.map((group) => (
          <div className="stack-group" key={group.id}>
            <div className="stack-group-head">
              <h2>{group.title}</h2>
              <span>{group.note}</span>
            </div>
            {group.rows.map((row) => (
              <div className="stack-row" key={row.name}>
                <span className="stack-name">{row.name}</span>
                <span className="stack-desc">{row.desc}</span>
                <span className={`stack-status ${row.status}`}>{STATUS_LABEL[row.status]}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="deploy-strip">
          <h2>Where it&apos;s deployed</h2>
          <p className="deploy-sub">What&apos;s live, where it runs, how it ships, and why that host.</p>

          {deployments.map((deployment) => {
            const product = products.find((p) => p.id === deployment.productId);
            if (!product) return null;
            return (
              <div className="deploy-item" key={deployment.productId}>
                <div className="deploy-item-head">
                  <h3>{product.title}</h3>
                  <span className={`stack-status ${deployment.status}`}>{DEPLOY_STATUS_LABEL[deployment.status]}</span>
                </div>
                <div className="deploy-fields">
                  <div className="deploy-field"><span>Where</span><p>{deployment.where}</p></div>
                  <div className="deploy-field"><span>How</span><p>{deployment.how}</p></div>
                  <div className="deploy-field"><span>Why</span><p>{deployment.why}</p></div>
                </div>
                <div className="evidence-tags">
                  {deployment.evidenceTags.map((tag) => (
                    <span className="evidence-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="console">
          <div className="console-head">
            <div className="console-dots"><span></span><span></span><span></span></div>
            <span className="console-title">deploy --status --all</span>
            <span className="console-note">Sample output</span>
          </div>
          <div className="console-line"><span className="ts">10:42:03</span><span className="tag ok">OK</span><span className="proj">firstbloc.in</span><span className="msg">deploy succeeded — Vercel · main</span></div>
          <div className="console-line"><span className="ts">09:15:47</span><span className="tag ok">OK</span><span className="proj">telecom-call-intelligence</span><span className="msg">364/364 tests passed — Streamlit Community Cloud</span></div>
          <div className="console-line"><span className="ts">08:03:12</span><span className="tag build">BUILD</span><span className="proj">signalharvest-ai</span><span className="msg">agent graph updated — Render redeploying</span></div>
          <div className="console-line"><span className="ts">Yesterday</span><span className="tag ok">OK</span><span className="proj">pulseguard-ai</span><span className="msg">CI green — GitHub Actions</span></div>
          <div className="console-line"><span className="ts">Yesterday</span><span className="tag warn">WARN</span><span className="proj">cfpb-credit-intel</span><span className="msg">not yet public — running locally</span></div>
        </div>
      </div>
    </section>
  );
}
