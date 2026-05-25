"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Normalize pathname to strip trailing slashes
  const normalizedPath = pathname.replace(/\/$/, "");
  const isCaseStudy = normalizedPath === '/appreciate' || normalizedPath === '/hamleys' || normalizedPath === '/contraband' || normalizedPath === '/aava';

  // On case study pages, the header background is transparent if we have not scrolled past the hero fold AND the menu is closed.
  const isTransparent = isCaseStudy && !isScrolledPast && !isOpen;

  useEffect(() => {
    // Always reset states when pathname changes
    setIsScrolledPast(false);

    if (!isCaseStudy) {
      return;
    }

    const handleScroll = () => {
      const cur = window.scrollY;
      const threshold = window.innerHeight * 0.9;
      // If we are at scroll 0 or very close to top, the header must be transparent
      if (cur <= 10) {
        setIsScrolledPast(false);
      } else {
        setIsScrolledPast(cur > threshold);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Staggered initial scroll checks to ensure we capture the scroll position after Next.js scroll restoration
    const t1 = setTimeout(handleScroll, 50);
    const t2 = setTimeout(handleScroll, 200);
    const t3 = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, isCaseStudy]);

  return (
    <header 
      className={`site-header ${isTransparent ? "header-transparent" : ""}`}
      style={isTransparent ? {
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none'
      } : undefined}
    >
      <Link href="/" className="logo" onClick={(e) => {
        if (typeof window !== 'undefined' && window.location.pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}>
        <img
          src={`/assets/Machinga logo with text.png`}
          alt="Machinga"
          width={206}
          height={44}
          className="header-logo-img"
        />
      </Link>

      <button
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav 
        className={`desktop-nav ${isOpen ? "open" : ""}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link href="/#work" onClick={() => setIsOpen(false)}>Work</Link>
        <Link href="/#statement" onClick={() => setIsOpen(false)}>How We Work</Link>
        <Link href="/#about" onClick={() => setIsOpen(false)}>About</Link>
        <Link href="/#contact" className="nav-contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
      </nav>
    </header>
  );
}
