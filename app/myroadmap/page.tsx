import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Roadmap from '@/components/Roadmap';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ComingSoon from '@/components/ComingSoon';
import { isComingSoon, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Roadmap — firstbloc',
  description: 'What is shipped, what is being built, and what is planned next — across every firstbloc product.',
  alternates: { canonical: `${siteUrl}/myroadmap` },
};

export default function MyRoadmapPage() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Nav />
      <main>
        <Roadmap />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
