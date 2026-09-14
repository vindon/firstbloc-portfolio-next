import GrainOverlay from './GrainOverlay';

export default function About() {
  return (
    <section id="about" className="section-deco">
      <GrainOverlay />
      <div className="wrap">
        <div className="about-grid">
          <p className="kicker">About</p>
          <h2 style={{ margin: '14px auto 22px', fontSize: 'clamp(28px, 4vw, 42px)', maxWidth: '16ch' }}>
            Enterprise Rigor Meets Applied Agentic Engineering
          </h2>
          <div className="about-copy">
            <p>
              I help teams design and deploy AI systems that solve real operational bottlenecks, run reliably in
              production, and deliver measurable business value. My work combines close to a decade in consumer
              credit analytics and enterprise CX transformation at Verizon with hands-on multi-agent engineering.
            </p>
            <p>
              <strong>Regulated Scale &amp; Risk:</strong> A deep foundation in how telecom and financial services
              make decisions under regulatory scrutiny, strict data privacy, and cost pressure.
            </p>
            <p>
              <strong>Production Architecture:</strong> Designing and shipping observable, test-gated agentic
              pipelines with deterministic fallbacks, PII safeguards, and human-in-the-loop controls.
            </p>
            <p>
              <strong>Grounded Unit Economics:</strong> Prioritizing solutions that justify their compute spend,
              integrate cleanly with existing workflows, and deliver demonstrable ROI.
            </p>
            <p className="font-mono text-xs text-stone-500 pt-2">
              Based in Chennai, India · MBA, University of Sheffield · Available for Fractional Engagements &amp;
              Advisory
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
