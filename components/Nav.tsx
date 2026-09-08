'use client';

import { useState } from 'react';
import Link from 'next/link';
import BrandBlockIcon from './BrandBlockIcon';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" style={{ display: 'block' }}>
          <span className="brand-name">firstbloc<BrandBlockIcon size={30} /></span>
          <span className="brand-tag">AI Strategy &amp; Products</span>
        </Link>
        <nav className={`links${open ? ' open' : ''}`}>
          <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/#products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/#solutions" onClick={() => setOpen(false)}>Solutions</Link>
          <Link href="/#contact" className="nav-cta" onClick={() => setOpen(false)}>Let&apos;s talk</Link>
        </nav>
        <button className="nav-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
