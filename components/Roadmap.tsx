import { roadmapColumns } from '@/lib/roadmap';

export default function Roadmap() {
  return (
    <section>
      <div className="wrap">
        <div className="page-head">
          <span className="kicker">/myroadmap</span>
          <h1>Roadmap</h1>
          <p>
            What I build is driven by operational challenges in regulated industries: compliance overhead,
            unstructured customer contact logs, and signal intelligence.
          </p>
        </div>

        <div className="legend">
          <span><i style={{ background: 'var(--accent-secondary)' }} />Shipped</span>
          <span><i style={{ background: 'var(--accent)' }} />Building</span>
          <span><i style={{ background: 'var(--status-planned)' }} />Planned</span>
        </div>

        <div className="board">
          {roadmapColumns.map((column) => (
            <div className={`column col-${column.status}`} key={column.status}>
              <div className="column-head">
                <h2><span className="column-dot"></span>{column.label}</h2>
                <span className="column-count">{column.products.length}</span>
              </div>
              {column.products.length === 0 ? (
                <div className="kcard kcard-empty">
                  <p>Nothing here yet.</p>
                </div>
              ) : (
                column.products.map((product) => (
                  <div className="kcard" key={product.id}>
                    <span className="kcard-status">{column.label}</span>
                    <h3>{product.title}</h3>
                    <p>{product.problem}</p>
                    <div className="kcard-meta">
                      <span className="kcard-tag">{product.techTags[0]}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
