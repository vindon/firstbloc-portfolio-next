import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import MyStack from '@/components/MyStack';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ComingSoon from '@/components/ComingSoon';
import { isComingSoon, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'My Stack — firstbloc',
  description: 'The technologies behind every firstbloc build, chosen for observability, cost control, and deterministic reliability in production — plus what is deployed where and why.',
  alternates: { canonical: `${siteUrl}/mystack` },
};

export default function MyStackPage() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Nav />
      <main>
        <MyStack />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
