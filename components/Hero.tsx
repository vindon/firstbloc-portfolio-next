import GrainOverlay from './GrainOverlay';

export default function Hero() {
  return (
    <section className="hero section-deco">
      <GrainOverlay />
      <div className="wrap">
        <p className="kicker">Enterprise AI Strategy · Agentic Systems · CX Automation</p>
        <h1>Bridging Enterprise Reality with Production AI Systems.</h1>
        <p className="hero-lede">
          I design, architect, and deploy resilient multi-agent systems that solve real operational
          bottlenecks — built to withstand enterprise compliance, cost pressure, and production scale.
        </p>
        <div className="hero-ctas">
          <a href="#products" className="btn-primary">See what I&apos;ve built</a>
          <a href="#contact" className="btn-ghost">Work with me</a>
        </div>
        <div className="hero-proof">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          6 multi-agent, production-grade AI systems shipped · 10+ years enterprise analytics &amp; CX leadership
        </div>
      </div>
    </section>
  );
}
