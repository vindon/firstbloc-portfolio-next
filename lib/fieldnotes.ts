export type FieldNote = {
  id: string;
  date: string;
  project: string;
  title: string;
  situation: string;
  why: string;
  fix: string;
  lesson: string;
};

export const fieldNotes: FieldNote[] = [
  {
    id: 'local-branch-drift',
    date: '2026-09-14',
    project: 'PulseGuard AI',
    title: 'A merge to origin/master is not a merge to your checkout',
    situation:
      'A full feature (drafts review queue, budget guard, eval CI gate, decision logger, X publisher) was built in a linked worktree and merged to origin/master — 36 commits, clean. My primary local checkout, on the same branch, never pulled. It sat 36 commits behind for four days. Status tracking said "done, merged" — true of the remote, silent about the directory I was about to open next.',
    why:
      'A worktree branch merging upstream doesn’t move any other checkout’s branch pointer. Nothing auto-syncs the primary directory once its own worktree’s work lands on the shared branch — and "merged" got recorded as a fact without re-checking git log against the actual folder that statement was about.',
    fix:
      'Stashed the one uncommitted local edit, git pull --ff-only’d cleanly across all 36 commits, then hit a real merge conflict reapplying the stash — upstream and the stash had both edited the same file. Resolved by keeping both sides’ content rather than picking one.',
    lesson:
      'Any system with more than one view of shared state — checkouts, replicas, cached dashboards, cloned configs — needs an explicit sync-and-verify step after a write. A write in one view is not a write everywhere. Treat "merged" or "done" as a remote-only claim until you’ve actually looked at the thing it’s describing.',
  },
];
