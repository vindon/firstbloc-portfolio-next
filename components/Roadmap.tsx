import { roadmapColumns } from '@/lib/roadmap';

export default function Roadmap() {
  return (
    <section>
      <div className="wrap">
        <div className="page-head">
          <span className="kicker">/myroadmap</span>
          <h1>Roadmap</h1>
          <p>What&apos;s shipped, what&apos;s in motion, and what&apos;s next — across every product I&apos;m building.</p>
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
                <h3><span className="column-dot"></span>{column.label}</h3>
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
                    <h4>{product.title}</h4>
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
