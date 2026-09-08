import Link from 'next/link';
import BrandBlockIcon from './BrandBlockIcon';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-name">firstbloc<BrandBlockIcon size={30} /></span>
            <p>AI strategy, agentic products, and CX automation.</p>
            <div className="social-icons">
              <a
                href="https://x.com/vinailead"
                className="social-icon"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.24 3H21l-6.6 7.54L22 21h-6.32l-4.95-6.47L4.98 21H2.2l7.06-8.07L2 3h6.48l4.48 5.92L18.24 3Zm-1.11 16.2h1.48L7.94 4.72H6.35L17.13 19.2Z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/vinothnataraj"
                className="social-icon"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a
                href="https://github.com/vindon"
                className="social-icon"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.696-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3>Navigate</h3>
            <ul className="flinks">
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#products">Products</Link></li>
              <li><Link href="/#solutions">Solutions</Link></li>
              <li><Link href="/mystack">My Stack</Link></li>
              <li><Link href="/myroadmap">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul className="flinks">
              <li><a href="mailto:vinoth.n@outlook.com">vinoth.n@outlook.com</a></li>
              <li>
                <a href="https://linkedin.com/in/vinothnataraj" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/vinothnataraj
                </a>
              </li>
              <li><span>Chennai, India</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Vinoth Nataraj.</span>
        </div>
      </div>
    </footer>
  );
}
