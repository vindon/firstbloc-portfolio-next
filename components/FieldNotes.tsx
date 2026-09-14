import { fieldNotes } from '@/lib/fieldnotes';

export default function FieldNotes() {
  return (
    <section>
      <div className="wrap">
        <div className="page-head">
          <span className="kicker">/fieldnotes</span>
          <h1>Field Notes</h1>
          <p>
            System Incidents &amp; Architectural Notes — real incidents from real builds: what broke, why, the
            fix, and the lesson that outlives the project.
          </p>
        </div>

        <div className="note-list">
          {fieldNotes.map((note) => (
            <article className="note-card" key={note.id}>
              <div className="note-head">
                <span className="note-project">{note.project}</span>
                <span className="note-date">{note.date}</span>
              </div>
              <h2>{note.title}</h2>

              <div className="note-section">
                <span className="note-label">What happened</span>
                <p>{note.situation}</p>
              </div>
              <div className="note-section">
                <span className="note-label">Why</span>
                <p>{note.why}</p>
              </div>
              <div className="note-section">
                <span className="note-label">The fix</span>
                <p>{note.fix}</p>
              </div>
              <div className="note-section note-lesson">
                <span className="note-label">Lesson</span>
                <p>{note.lesson}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
