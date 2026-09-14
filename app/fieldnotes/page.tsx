import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import FieldNotes from '@/components/FieldNotes';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ComingSoon from '@/components/ComingSoon';
import { isComingSoon, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Field Notes — firstbloc',
  description: 'System incidents and architectural notes from every firstbloc build — what broke, why, the fix, and the lesson that outlives the project.',
  alternates: { canonical: `${siteUrl}/fieldnotes` },
};

export default function FieldNotesPage() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Nav />
      <main>
        <FieldNotes />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
